---
timestamp: 'Sat Oct 18 2025 13:13:32 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251018_131332.efe1683c.md]]'
content_id: 351b5a84a04e27712cb47b4c15895d8efcdbe49a6b207aaf2f5cc0213bb74a03
---

# response:

```typescript
import { Collection, Db, MongoClient } from "npm:mongodb";
import { Empty, ID } from "@utils/types.ts";
import { freshID } from "@utils/database.ts";

// Declare collection prefix, use concept name
const PREFIX = "MusicBrainzAPI" + ".";

// MusicBrainz API Configuration
const MUSICBRAINZ_API_BASE_URL = "https://musicbrainz.org/ws/2/";
const COVER_ART_API_BASE_URL = "https://coverartarchive.org/release/";
const RATE_LIMIT_DELAY_MS = 1100; // ~1 request per second + buffer
const USER_AGENT = "ListenBuddy/1.0.0 (contact@example.com)"; // Replace with actual email

// Generic types of this concept
type EntityMbid = ID;
type RelationshipType = string; // e.g., "artist-rels", "recording-rels"
type EntityType =
  | "artist"
  | "recording"
  | "release"
  | "release-group"
  | "work";

/**
 * A set of EntityCache with:
 *   an mbid of type String (MusicBrainz ID)
 *   an entityType of type String ("artist", "recording", "release", "release-group", "work")
 *   a metadata of type JSON
 *   a lastFetched of type Timestamp
 */
interface EntityCache {
  _id: ID; // Combined MBID and entityType for unique ID
  mbid: EntityMbid;
  entityType: EntityType;
  metadata: any;
  lastFetched: Date;
}

/**
 * A set of RelationshipCache with:
 *   an mbid of type String
 *   a relationshipType of type String ("artist-rels", "recording-rels", "work-rels", etc.)
 *   a relationships of type List<JSON>
 *   a lastFetched of type Timestamp
 */
interface RelationshipCache {
  _id: ID; // Combined MBID and relationshipType for unique ID
  mbid: EntityMbid;
  relationshipType: RelationshipType;
  relationships: any[];
  lastFetched: Date;
}

// In-memory rate limit state for simplicity, can be made persistent if needed for distributed instances
interface RateLimitState {
  lastRequestTime: Date;
}

export default class MusicBrainzAPIConcept {
  private entityCache: Collection<EntityCache>;
  private relationshipCache: Collection<RelationshipCache>;
  private rateLimitState: RateLimitState;

  // TTL for caches (can be adjusted)
  private static readonly ENTITY_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
  private static readonly RELATIONSHIP_CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

  constructor(private readonly db: Db) {
    this.entityCache = this.db.collection(PREFIX + "entityCache");
    this.relationshipCache = this.db.collection(PREFIX + "relationshipCache");
    this.rateLimitState = { lastRequestTime: new Date(0) }; // Initialize to a past date
  }

  /**
   * Internal helper to enforce MusicBrainz API rate limit (1 request/second).
   * Blocks until enough time has passed since the last request.
   */
  private async _waitForRateLimit(): Promise<void> {
    const now = new Date();
    const timeSinceLastRequest =
      now.getTime() - this.rateLimitState.lastRequestTime.getTime();

    if (timeSinceLastRequest < RATE_LIMIT_DELAY_MS) {
      const delay = RATE_LIMIT_DELAY_MS - timeSinceLastRequest;
      // console.warn(`MusicBrainzAPI: Rate limit hit. Waiting for ${delay}ms.`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    this.rateLimitState.lastRequestTime = new Date(); // Update last request time
  }

  /**
   * Internal helper to make a request to the MusicBrainz API, handling caching and rate limiting.
   * @param path The API endpoint path (e.g., "artist/{mbid}").
   * @param params URLSearchParams for query parameters.
   * @param cacheCollection The MongoDB collection to use for caching (entityCache or relationshipCache).
   * @param cacheKey The unique key to use for identifying this cached item (e.g., MBID or MBID+type).
   * @param cacheType A string to differentiate cache entries (e.g., "artist", "recording", "artist-rels").
   * @param ttlMs Time-to-live for the cache entry in milliseconds.
   * @returns The parsed JSON response or an error object.
   */
  private async _fetchAndCache<T>(
    entityType: EntityType | RelationshipType | "search" | "browse",
    mbid: EntityMbid | string | null, // Can be null for search/browse
    requestUrl: URL,
    cacheCollection: Collection<any>,
    ttlMs: number,
  ): Promise<T | { error: string }> {
    const cacheIdentifier = mbid
      ? (`${mbid}-${entityType}` as ID)
      : (`${requestUrl.toString()}` as ID); // Use URL for unique identifier for search/browse

    // 1. Check cache first
    const cachedData = await cacheCollection.findOne({ _id: cacheIdentifier });

    if (cachedData) {
      if (
        new Date().getTime() - cachedData.lastFetched.getTime() <
        ttlMs
      ) {
        // console.log(`MusicBrainzAPI: Cache hit for ${cacheIdentifier}`);
        return cachedData.metadata || cachedData.relationships;
      } else {
        // console.log(`MusicBrainzAPI: Cache expired for ${cacheIdentifier}`);
        // Optionally delete expired cache here to keep it clean, but usually just overwrite.
      }
    }

    // 2. Enforce rate limit
    await this._waitForRateLimit();

    // 3. Make the API call
    try {
      const response = await fetch(requestUrl.toString(), {
        headers: { "User-Agent": USER_AGENT },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return { error: `Entity not found: ${mbid}` };
        }
        throw new Error(
          `MusicBrainz API error: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();

      // 4. Cache the result
      const newCacheEntry: any = {
        _id: cacheIdentifier,
        lastFetched: new Date(),
      };

      if (
        entityType === "artist" ||
        entityType === "recording" ||
        entityType === "release" ||
        entityType === "release-group" ||
        entityType === "work"
      ) {
        Object.assign(newCacheEntry, {
          mbid: mbid,
          entityType: entityType,
          metadata: data,
        });
      } else { // This handles relationship types, search, and browse
        Object.assign(newCacheEntry, {
          mbid: mbid, // Can be null for search/browse but still useful
          relationshipType: entityType, // Reusing field for generic type
          metadata: data, // Store full response for search/browse
          relationships: data.relations || data.artists || data.recordings ||
            data.releases || data["release-groups"] || data.works, // Extract specific lists if available
        });
      }

      await cacheCollection.updateOne(
        { _id: cacheIdentifier },
        { $set: newCacheEntry },
        { upsert: true },
      );
      // console.log(`MusicBrainzAPI: Cached ${cacheIdentifier}`);

      // Return the actual data part for different request types
      if (entityType === "search" || entityType === "browse") {
        return newCacheEntry.metadata as T;
      }
      return newCacheEntry.metadata || newCacheEntry.relationships as T;
    } catch (error: any) {
      console.error(`MusicBrainzAPI: Error fetching ${requestUrl.toString()}:`,
        error);
      return { error: `Failed to fetch from MusicBrainz API: ${error.message}` };
    }
  }

  /**
   * lookupArtist(mbid: String, includes: List<String>): (artist: JSON)
   *
   * requires: mbid is valid MusicBrainz artist ID, includes contains valid subquery types
   * effect: fetches detailed artist information from MusicBrainz API including optional subqueries (recordings, releases, release-groups, works, artist-rels, etc.).
   * Returns artist name, aliases, area, type, and requested linked entities.
   */
  async lookupArtist(
    { mbid, includes = [] }: { mbid: EntityMbid; includes?: string[] },
  ): Promise<{ artist: any } | { error: string }> {
    if (!mbid) return { error: "MBID is required." };

    const url = new URL(`${MUSICBRAINZ_API_BASE_URL}artist/${mbid}`);
    url.searchParams.set("fmt", "json");
    if (includes.length > 0) {
      url.searchParams.set("inc", includes.join("+"));
    }

    const result = await this._fetchAndCache<any>(
      "artist",
      mbid,
      url,
      this.entityCache,
      MusicBrainzAPIConcept.ENTITY_CACHE_TTL_MS,
    );
    if ("error" in result) return result;
    return { artist: result };
  }

  /**
   * lookupRecording(mbid: String, includes: List<String>): (recording: JSON)
   *
   * requires: mbid is valid MusicBrainz recording ID, includes contains valid subquery types
   * effect: fetches recording (track/song) information including title, length, artists, and optionally releases, ISRCs, work relationships, and artist relationships.
   */
  async lookupRecording(
    { mbid, includes = [] }: { mbid: EntityMbid; includes?: string[] },
  ): Promise<{ recording: any } | { error: string }> {
    if (!mbid) return { error: "MBID is required." };

    const url = new URL(`${MUSICBRAINZ_API_BASE_URL}recording/${mbid}`);
    url.searchParams.set("fmt", "json");
    if (includes.length > 0) {
      url.searchParams.set("inc", includes.join("+"));
    }

    const result = await this._fetchAndCache<any>(
      "recording",
      mbid,
      url,
      this.entityCache,
      MusicBrainzAPIConcept.ENTITY_CACHE_TTL_MS,
    );
    if ("error" in result) return result;
    return { recording: result };
  }

  /**
   * lookupRelease(mbid: String, includes: List<String>): (release: JSON)
   *
   * requires: mbid is valid MusicBrainz release ID, includes contains valid subquery types
   * effect: fetches release (album) information including title, date, status, artists, labels, and optionally recordings, release-group, cover art, and relationships.
   */
  async lookupRelease(
    { mbid, includes = [] }: { mbid: EntityMbid; includes?: string[] },
  ): Promise<{ release: any } | { error: string }> {
    if (!mbid) return { error: "MBID is required." };

    const url = new URL(`${MUSICBRAINZ_API_BASE_URL}release/${mbid}`);
    url.searchParams.set("fmt", "json");
    if (includes.length > 0) {
      url.searchParams.set("inc", includes.join("+"));
    }

    const result = await this._fetchAndCache<any>(
      "release",
      mbid,
      url,
      this.entityCache,
      MusicBrainzAPIConcept.ENTITY_CACHE_TTL_MS,
    );
    if ("error" in result) return result;
    return { release: result };
  }

  /**
   * lookupReleaseGroup(mbid: String, includes: List<String>): (releaseGroup: JSON)
   *
   * requires: mbid is valid MusicBrainz release-group ID, includes contains valid subquery types
   * effect: fetches release group information including title, type, artists, and optionally individual releases and relationships.
   */
  async lookupReleaseGroup(
    { mbid, includes = [] }: { mbid: EntityMbid; includes?: string[] },
  ): Promise<{ releaseGroup: any } | { error: string }> {
    if (!mbid) return { error: "MBID is required." };

    const url = new URL(`${MUSICBRAINZ_API_BASE_URL}release-group/${mbid}`);
    url.searchParams.set("fmt", "json");
    if (includes.length > 0) {
      url.searchParams.set("inc", includes.join("+"));
    }

    const result = await this._fetchAndCache<any>(
      "release-group",
      mbid,
      url,
      this.entityCache,
      MusicBrainzAPIConcept.ENTITY_CACHE_TTL_MS,
    );
    if ("error" in result) return result;
    return { releaseGroup: result };
  }

  /**
   * lookupWork(mbid: String, includes: List<String>): (work: JSON)
   *
   * requires: mbid is valid MusicBrainz work ID, includes contains valid subquery types
   * effect: fetches work (composition) information including title, type, and relationships to artists (composers, lyricists), recordings, and other works.
   */
  async lookupWork(
    { mbid, includes = [] }: { mbid: EntityMbid; includes?: string[] },
  ): Promise<{ work: any } | { error: string }> {
    if (!mbid) return { error: "MBID is required." };

    const url = new URL(`${MUSICBRAINZ_API_BASE_URL}work/${mbid}`);
    url.searchParams.set("fmt", "json");
    if (includes.length > 0) {
      url.searchParams.set("inc", includes.join("+"));
    }

    const result = await this._fetchAndCache<any>(
      "work",
      mbid,
      url,
      this.entityCache,
      MusicBrainzAPIConcept.ENTITY_CACHE_TTL_MS,
    );
    if ("error" in result) return result;
    return { work: result };
  }

  /**
   * getEntityRelationships(mbid: String, entityType: String, relationshipTypes: List<String>): (relationships: List<Relationship>)
   *
   * requires: mbid is valid, entityType is one of the supported entity types, relationshipTypes contains valid relationship types
   * effect: fetches all relationships of specified types for an entity. Returns list of relationships with target entities, relationship type, and attributes.
   * Used to find similar artists, cover versions, samples, etc.
   */
  async getEntityRelationships(
    { mbid, entityType, relationshipTypes = [] }: {
      mbid: EntityMbid;
      entityType: EntityType;
      relationshipTypes?: string[];
    },
  ): Promise<{ relationships: any[] } | { error: string }> {
    if (!mbid) return { error: "MBID is required." };
    if (!["artist", "recording", "release", "release-group", "work"].includes(entityType)) {
      return { error: "Invalid entityType." };
    }
    // relationshipTypes are implicitly validated by what the MB API accepts in 'inc'

    const url = new URL(`${MUSICBRAINZ_API_BASE_URL}${entityType}/${mbid}`);
    url.searchParams.set("fmt", "json");
    if (relationshipTypes.length > 0) {
      url.searchParams.set("inc", relationshipTypes.join("+"));
    } else {
      // If no specific relationship types are requested, we might include a common one or rely on default
      // For general relationships, we might need to check if the entity itself already includes them.
      // This action is distinct from lookup, so it implies fetching specific relationship data.
      // For now, if no types are given, we'll try to get all relations, which means a separate call.
      // However, the MB API "relations" include parameter usually covers most generic relationships.
      url.searchParams.set("inc", "url-rels+artist-rels+recording-rels+work-rels+label-rels");
    }

    // The _fetchAndCache will handle parsing the 'relations' array from the result
    const result = await this._fetchAndCache<any>(
      `${entityType}-rels` as RelationshipType, // Use a specific cache key for relationships
      mbid,
      url,
      this.relationshipCache,
      MusicBrainzAPIConcept.RELATIONSHIP_CACHE_TTL_MS,
    );

    if ("error" in result) return result;
    // MusicBrainz API returns relationships under the 'relations' key in the entity object
    return { relationships: result.relations || [] };
  }

  /**
   * searchEntities(query: String, entityType: String, limit: Number): (results: List<JSON>)
   *
   * requires: query is non-empty, entityType is valid ("artist", "recording", "release", etc.), limit is positive
   * effect: searches MusicBrainz database for entities matching the query string. Returns ranked list of matching entities with scores.
   */
  async searchEntities(
    { query, entityType, limit = 25 }: {
      query: string;
      entityType: EntityType;
      limit?: number;
    },
  ): Promise<{ results: any[] } | { error: string }> {
    if (!query || query.trim() === "") return { error: "Query cannot be empty." };
    if (!["artist", "recording", "release", "release-group", "work"].includes(entityType)) {
      return { error: "Invalid entityType." };
    }
    if (limit <= 0) return { error: "Limit must be positive." };

    const url = new URL(`${MUSICBRAINZ_API_BASE_URL}${entityType}`);
    url.searchParams.set("fmt", "json");
    url.searchParams.set("query", query);
    url.searchParams.set("limit", limit.toString());

    const result = await this._fetchAndCache<any>(
      "search",
      null, // No specific MBID for search
      url,
      this.entityCache, // Using entityCache for search results as well
      MusicBrainzAPIConcept.ENTITY_CACHE_TTL_MS,
    );
    if ("error" in result) return result;

    // MusicBrainz search results are typically under an array key matching the entity type (e.g., 'artists', 'recordings')
    const entityKey = `${entityType}s`;
    return { results: result[entityKey] || [] };
  }

  /**
   * browseByEntity(entityType: String, linkedEntity: String, linkedMbid: String, limit: Number, offset: Number): (results: List<JSON>)
   *
   * requires: entityType and linkedEntity are valid types, linkedMbid exists, limit and offset are non-negative
   * effect: browses entities linked to a specific entity (e.g., all releases by an artist, all recordings of a work). Supports pagination.
   */
  async browseByEntity(
    { entityType, linkedEntity, linkedMbid, limit = 25, offset = 0 }: {
      entityType: EntityType;
      linkedEntity: EntityType;
      linkedMbid: EntityMbid;
      limit?: number;
      offset?: number;
    },
  ): Promise<{ results: any[] } | { error: string }> {
    if (!linkedMbid) return { error: "linkedMbid is required." };
    if (!["artist", "recording", "release", "release-group", "work"].includes(entityType)) {
      return { error: "Invalid entityType." };
    }
    if (!["artist", "recording", "release", "release-group", "work"].includes(linkedEntity)) {
      return { error: "Invalid linkedEntity type." };
    }
    if (limit < 0 || offset < 0) {
      return { error: "Limit and offset must be non-negative." };
    }

    const url = new URL(`${MUSICBRAINZ_API_BASE_URL}${entityType}`);
    url.searchParams.set("fmt", "json");
    url.searchParams.set(linkedEntity, linkedMbid); // e.g., ?artist={mbid}
    url.searchParams.set("limit", limit.toString());
    url.searchParams.set("offset", offset.toString());

    const result = await this._fetchAndCache<any>(
      "browse",
      linkedMbid, // Use linkedMbid as a context for caching
      url,
      this.entityCache,
      MusicBrainzAPIConcept.ENTITY_CACHE_TTL_MS,
    );
    if ("error" in result) return result;

    const entityKey = `${entityType}s`; // e.g., 'artists', 'recordings'
    return { results: result[entityKey] || [] };
  }

  /**
   * getArtistSimilarities(artistMbid: String): (similarArtists: List<Artist>)
   *
   * requires: artistMbid is valid
   * effect: fetches artists with relationships to the given artist (collaborations, member-of, similar-to)
   * and returns them as potential similar artists for recommendations.
   */
  async getArtistSimilarities(
    { artistMbid }: { artistMbid: EntityMbid },
  ): Promise<{ similarArtists: any[] } | { error: string }> {
    if (!artistMbid) return { error: "artistMbid is required." };

    // Fetch artist with relationships
    const artistResult = await this.lookupArtist({
      mbid: artistMbid,
      includes: ["artist-rels"],
    });

    if ("error" in artistResult) return artistResult;

    const artist = artistResult.artist;
    const similarArtists: any[] = [];

    // Filter relationships to find 'similar-to', 'collaborated-with', 'member-of', etc.
    if (artist.relations) {
      for (const rel of artist.relations) {
        // Example: filter for specific relationship types that imply similarity or connection
        if (
          ["member of", "collaboration", "similar to"].includes(
            rel.type.toLowerCase(),
          ) && rel.target_type === "artist"
        ) {
          similarArtists.push({
            mbid: rel.artist.id,
            name: rel.artist.name,
            type: rel.type,
            direction: rel.direction,
          });
        }
      }
    }

    return { similarArtists: similarArtists };
  }

  /**
   * getRecordingWorks(recordingMbid: String): (works: List<Work>)
   *
   * requires: recordingMbid is valid
   * effect: fetches the musical works (compositions) associated with a recording,
   * including composer and lyricist information.
   */
  async getRecordingWorks(
    { recordingMbid }: { recordingMbid: EntityMbid },
  ): Promise<{ works: any[] } | { error: string }> {
    if (!recordingMbid) return { error: "recordingMbid is required." };

    const recordingResult = await this.lookupRecording({
      mbid: recordingMbid,
      includes: ["work-rels", "artist-rels"],
    });

    if ("error" in recordingResult) return recordingResult;

    const recording = recordingResult.recording;
    const associatedWorks: any[] = [];

    if (recording.relations) {
      for (const rel of recording.relations) {
        if (rel.type === "performance" && rel.target_type === "work") {
          const work = {
            mbid: rel.work.id,
            title: rel.work.title,
            type: rel.work.type,
            // You can fetch work details separately if more info is needed
            // For now, extract direct artist relations from the work if available in the same call
            artists: rel.work.relations?.filter((wrel: any) =>
              wrel.target_type === "artist" &&
              ["composer", "lyricist"].includes(wrel.type)
            ).map((wrel: any) => ({
              mbid: wrel.artist.id,
              name: wrel.artist.name,
              type: wrel.type,
            })) || [],
          };
          associatedWorks.push(work);
        }
      }
    }

    return { works: associatedWorks };
  }

  /**
   * getCoverArt(releaseMbid: String): (coverArtUrl: String)
   *
   * requires: releaseMbid is valid
   * effect: retrieves the cover art URL for a release from Cover Art Archive (integrated with MusicBrainz).
   */
  async getCoverArt(
    { releaseMbid }: { releaseMbid: EntityMbid },
  ): Promise<{ coverArtUrl: string } | { error: string }> {
    if (!releaseMbid) return { error: "releaseMbid is required." };

    const url = new URL(`${COVER_ART_API_BASE_URL}${releaseMbid}/front`);
    // Cover Art Archive doesn't use the same JSON format or caching mechanism as MB API directly,
    // so we'll treat it as a direct fetch for the URL.
    // We could still cache the URL in entityCache if we wanted to avoid repeated HTTP HEAD requests.

    // A HEAD request is often sufficient to check for image existence without downloading
    await this._waitForRateLimit(); // Still apply rate limiting as it's an external API call
    try {
      const response = await fetch(url.toString(), { method: "HEAD" });

      if (response.ok) {
        // If a "front" image exists, return its URL.
        // The actual image is at the same URL if GET is used.
        return { coverArtUrl: url.toString() };
      } else if (response.status === 404) {
        return { error: "Cover art not found for this release." };
      } else {
        throw new Error(
          `Cover Art Archive error: ${response.status} ${response.statusText}`,
        );
      }
    } catch (error: any) {
      console.error(`MusicBrainzAPI: Error fetching cover art ${url.toString()}:`,
        error);
      return { error: `Failed to fetch cover art: ${error.message}` };
    }
  }

  /**
   * clearCache(mbid: String): ()
   *
   * requires: mbid exists in cache
   * effect: removes cached entity and relationship data for the specified MBID,
   * forcing fresh API calls on next request.
   */
  async clearCache({ mbid }: { mbid: EntityMbid }): Promise<Empty> {
    if (!mbid) return { error: "MBID is required." };

    // Delete entries from entity cache where mbid matches
    await this.entityCache.deleteMany({ mbid: mbid });
    // Delete entries from relationship cache where mbid matches
    await this.relationshipCache.deleteMany({ mbid: mbid });

    return {};
  }
}
```

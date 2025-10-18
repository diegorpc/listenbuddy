---
timestamp: 'Sat Oct 18 2025 15:54:30 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251018_155430.32a0de70.md]]'
content_id: 427bfc04e7204b0ce635f86ba5f51e801219c217f21cd7a4e1214021bf158b3a
---

# response:

Here's the implementation of the `ListenBrainzAPI` concept in TypeScript, following the provided concept design principles and implementation guidelines.

```typescript
// file: src/concepts/ListenBrainzAPI/ListenBrainzAPI.ts


import { Collection, Db } from "npm:mongodb";
import { Empty, ID } from "@utils/types.ts";
import { freshID } from "@utils/database.ts";

// Define ListenBrainz API base URL
const LISTENBRAINZ_API_BASE = "https://api.listenbrainz.org/1/";

// Declare collection prefix, use concept name
const PREFIX = "ListenBrainzAPI" + ".";

// Generic types of this concept
type User = ID;

// Define valid time ranges for API calls as per ListenBrainz documentation
const VALID_TIME_RANGES = [
  "all_time",
  "year",
  "half_year",
  "quarter_year",
  "month",
  "week",
];

// Define allowed ListenBrainz stat types for caching
type ListenBrainzStatType =
  | "artists"
  | "releases"
  | "release-groups"
  | "recordings"
  | "activity"; // Added for getListeningActivity

// --- State Interfaces ---

/**
 * @state StatisticsCache
 * A set of StatisticsCache with:
 *   a user of type User
 *   a statType of type String ("artists", "releases", "release-groups", "recordings", "activity")
 *   a timeRange of type String ("all_time", "week", "month", "quarter_year", "half_year", "year")
 *   a data of type JSON
 *   a lastUpdated of type Timestamp
 */
interface StatisticsCacheDoc {
  _id: ID; // Unique ID for the cache entry
  user: User;
  statType: ListenBrainzStatType;
  timeRange: typeof VALID_TIME_RANGES[number];
  data: Record<string, unknown>; // Stores the JSON response from ListenBrainz
  lastUpdated: Date;
}

/**
 * @state ListenHistory
 * A set of ListenHistory with:
 *   a user of type User
 *   a listens of type List<JSON>
 *   a lastFetched of type Timestamp
 *
 * Note: Caching entire history is not feasible. This cache will store the most recent segment fetched
 * or serve as an indicator for when the user's history was last accessed/updated.
 */
interface ListenHistoryDoc {
  _id: ID; // Unique ID for the history cache entry (per user)
  user: User;
  listens: Listen[]; // Stores a segment of listen objects
  lastFetched: Date;
}

// --- Action Return Types (from spec and ListenBrainz API) ---
// These interfaces represent the structure of data returned by the ListenBrainz API
// and are used as return types for the concept's actions.
interface Artist {
  artist_name: string;
  artist_mbid?: string; // MusicBrainz ID for the artist
  listen_count: number;
  // Other potential fields from ListenBrainz API, omitted for brevity
}

interface Release {
  release_name: string;
  artist_name: string;
  release_mbid?: string; // MusicBrainz ID for the release
  listen_count: number;
  // Other potential fields
}

interface ReleaseGroup {
  release_group_name: string;
  artist_name: string;
  release_group_mbid?: string; // MusicBrainz ID for the release group
  // cover_art_url is often derived via MusicBrainz, not directly from ListenBrainz top items.
  listen_count: number;
  // Other potential fields
}

interface Recording {
  track_name: string;
  artist_name: string;
  release_name?: string;
  recording_mbid?: string; // MusicBrainz ID for the recording
  listen_count: number;
  // Other potential fields
}

interface Listen {
  listened_at: number; // Unix timestamp
  track_metadata: {
    artist_name: string;
    track_name: string;
    release_name?: string;
    mbid_mapping?: {
      artist_mbids?: string[];
      release_mbids?: string[];
      recording_mbids?: string[];
    };
  };
  // Other potential fields
}

interface ListeningActivity {
  [timePeriod: string]: number; // e.g., "2023-01": 150, "2023-02": 160
}

/**
 * @concept ListenBrainzAPI[User]
 * @purpose retrieve user listening statistics and history from ListenBrainz to display top artists, albums, and tracks over various time periods
 * @principle after a user associates their ListenBrainz token, the API fetches their scrobble data to show top artists, releases, and songs over any time range, enabling the app to display personalized listening statistics.
 */
export default class ListenBrainzAPIConcept {
  private statsCache: Collection<StatisticsCacheDoc>;
  private listenHistoryCache: Collection<ListenHistoryDoc>;
  private readonly CACHE_TTL_MS = 3600 * 1000; // 1 hour for statistics cache

  constructor(private readonly db: Db) {
    this.statsCache = this.db.collection(PREFIX + "statisticsCache");
    this.listenHistoryCache = this.db.collection(PREFIX + "listenHistoryCache");

    // Ensure unique indexes for efficient lookup and preventing duplicate cache entries
    this.statsCache.createIndex({ user: 1, statType: 1, timeRange: 1 }, {
      unique: true,
    });
    this.listenHistoryCache.createIndex({ user: 1 }, { unique: true }); // One history cache entry per user
  }

  // --- Internal Helper for authenticated ListenBrainz API calls ---
  private async _callListenBrainzAPI<T>(
    scrobbleToken: string,
    endpoint: string,
    params: Record<string, unknown> = {},
    method: "GET" | "POST" = "GET",
    body: Record<string, unknown> | null = null,
  ): Promise<T | { error: string }> {
    const url = new URL(LISTENBRAINZ_API_BASE + endpoint);
    if (method === "GET") {
      for (const key in params) {
        if (params[key] !== undefined) {
          url.searchParams.append(key, String(params[key]));
        }
      }
    }

    try {
      const fetchOptions: RequestInit = {
        method: method,
        headers: {
          "Authorization": `Token ${scrobbleToken}`,
          "User-Agent": "ListenBuddy/1.0.0 ( contact@example.com )", // Required by ListenBrainz
        },
      };
      if (method === "POST" && body) {
        fetchOptions.headers = {
          ...fetchOptions.headers,
          "Content-Type": "application/json",
        };
        fetchOptions.body = JSON.stringify(body);
      }

      const response = await fetch(url.toString(), fetchOptions);

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          return { error: "Invalid ListenBrainz token or unauthorized." };
        }
        const errorText = await response.text();
        return {
          error: `ListenBrainz API error: ${response.status} - ${errorText}`,
        };
      }

      // Handle cases where API returns 204 No Content (e.g., successful listen submission)
      if (response.status === 204) {
        return {} as T; // Return an empty object for void operations
      }

      return (await response.json()) as T;
    } catch (e) {
      console.error(`Error calling ListenBrainz API: ${e}`);
      return { error: `Network or API call failed: ${(e as Error).message}` };
    }
  }

  // Internal helper to get username from token. This involves a call to the LB API.
  // It's used by other actions to construct API paths that require the username.
  private async _getUsernameFromToken(
    token: string,
  ): Promise<{ username?: string; error?: string }> {
    const validationResult = await this.validateToken({ token });
    if (!validationResult.valid || !validationResult.username) {
      return {
        error: validationResult.error ||
          "Failed to retrieve username for token.",
      };
    }
    return { username: validationResult.username };
  }

  // Internal helper for fetching and caching top items (artists, releases, etc.)
  private async _getOrFetchTopItems<T>(
    user: User,
    scrobbleToken: string,
    statType: ListenBrainzStatType,
    timeRange: typeof VALID_TIME_RANGES[number],
    count: number,
    endpoint: string, // e.g., `users/${username}/artists`
    apiResponseKey: string, // The key in the API response that holds the list of items (e.g., 'artists')
  ): Promise<T[] | { error: string }> {
    // 1. Validate inputs
    if (!VALID_TIME_RANGES.includes(timeRange)) {
      return { error: `Invalid timeRange: ${timeRange}` };
    }
    if (count <= 0) {
      return { error: `Count must be non-negative: ${count}` };
    }

    // 2. Check cache
    const cachedStats = await this.statsCache.findOne({
      user,
      statType,
      timeRange,
    });
    if (
      cachedStats &&
      (new Date().getTime() - cachedStats.lastUpdated.getTime()) <
        this.CACHE_TTL_MS
    ) {
      // Return cached data, potentially slicing to 'count' if cached data is richer
      return (cachedStats.data.items as T[] || []).slice(0, count);
    }

    // 3. Fetch from API
    const result = await this._callListenBrainzAPI<
      { payload: { [key: string]: T[] } }
    >(
      scrobbleToken,
      endpoint,
      { range: timeRange, count: count },
    );

    if ("error" in result) {
      return result;
    }

    const items = result.payload?.[apiResponseKey] as T[] || [];

    // 4. Update cache
    await this.statsCache.updateOne(
      { user, statType, timeRange },
      {
        $set: {
          data: { items }, // Store the fetched items
          lastUpdated: new Date(),
        },
        $setOnInsert: { _id: freshID(), user, statType, timeRange }, // Add _id on first insert
      },
      { upsert: true },
    );

    return items;
  }

  /**
   * @action getTopArtists
   * @requires user has valid scrobbleToken, timeRange is valid, count is non-negative
   * @effect fetches and returns top artists for the user from ListenBrainz API for the specified time range, with pagination support. Each artist includes name, MBIDs, and listen count.
   */
  async getTopArtists(
    { user, scrobbleToken, timeRange, count }: {
      user: User;
      scrobbleToken: string;
      timeRange: string;
      count: number;
    },
  ): Promise<{ artists?: Artist[]; error?: string }> {
    const usernameResult = await this._getUsernameFromToken(scrobbleToken);
    if ("error" in usernameResult) {
      return { error: usernameResult.error };
    }
    const username = usernameResult.username;

    const items = await this._getOrFetchTopItems<Artist>(
      user,
      scrobbleToken,
      "artists",
      timeRange,
      count,
      `stats/user/${username}/artists`,
      "artists",
    );

    if ("error" in items) {
      return { error: items.error };
    }
    return { artists: items };
  }

  /**
   * @action getTopReleases
   * @requires user has valid scrobbleToken, timeRange is valid, count is non-negative
   * @effect fetches and returns top releases (albums) for the user from ListenBrainz API for the specified time range, with pagination support. Each release includes name, artist, MBID, and listen count.
   */
  async getTopReleases(
    { user, scrobbleToken, timeRange, count }: {
      user: User;
      scrobbleToken: string;
      timeRange: string;
      count: number;
    },
  ): Promise<{ releases?: Release[]; error?: string }> {
    const usernameResult = await this._getUsernameFromToken(scrobbleToken);
    if ("error" in usernameResult) {
      return { error: usernameResult.error };
    }
    const username = usernameResult.username;

    const items = await this._getOrFetchTopItems<Release>(
      user,
      scrobbleToken,
      "releases",
      timeRange,
      count,
      `stats/user/${username}/releases`,
      "releases",
    );
    if ("error" in items) {
      return { error: items.error };
    }
    return { releases: items };
  }

  /**
   * @action getTopReleaseGroups
   * @requires user has valid scrobbleToken, timeRange is valid, count is non-negative
   * @effect fetches and returns top release groups (album versions) for the user from ListenBrainz API for the specified time range. Each release group includes name, artist, MBID, cover art, and listen count.
   */
  async getTopReleaseGroups(
    { user, scrobbleToken, timeRange, count }: {
      user: User;
      scrobbleToken: string;
      timeRange: string;
      count: number;
    },
  ): Promise<{ releaseGroups?: ReleaseGroup[]; error?: string }> {
    const usernameResult = await this._getUsernameFromToken(scrobbleToken);
    if ("error" in usernameResult) {
      return { error: usernameResult.error };
    }
    const username = usernameResult.username;

    const items = await this._getOrFetchTopItems<ReleaseGroup>(
      user,
      scrobbleToken,
      "release-groups",
      timeRange,
      count,
      `stats/user/${username}/release-groups`,
      "release_groups", // Note: API response uses 'release_groups' key
    );
    if ("error" in items) {
      return { error: items.error };
    }
    return { releaseGroups: items };
  }

  /**
   * @action getTopRecordings
   * @requires user has valid scrobbleToken, timeRange is valid, count is non-negative
   * @effect fetches and returns top recordings (tracks/songs) for the user from ListenBrainz API for the specified time range. Each recording includes track name, artist, release, MBID, and listen count.
   */
  async getTopRecordings(
    { user, scrobbleToken, timeRange, count }: {
      user: User;
      scrobbleToken: string;
      timeRange: string;
      count: number;
    },
  ): Promise<{ recordings?: Recording[]; error?: string }> {
    const usernameResult = await this._getUsernameFromToken(scrobbleToken);
    if ("error" in usernameResult) {
      return { error: usernameResult.error };
    }
    const username = usernameResult.username;

    const items = await this._getOrFetchTopItems<Recording>(
      user,
      scrobbleToken,
      "recordings",
      timeRange,
      count,
      `stats/user/${username}/recordings`,
      "recordings",
    );
    if ("error" in items) {
      return { error: items.error };
    }
    return { recordings: items };
  }

  /**
   * @action getListenHistory
   * @requires user has valid scrobbleToken, either minTimestamp or maxTimestamp is provided (not both), count is positive
   * @effect fetches the user's listen history from ListenBrainz API. Returns list of individual listens with track metadata and timestamps.
   *
   * Note on caching: Listen history can be very large. Caching the *entire* history is not feasible.
   * This implementation will cache the *most recent fetch* for a user to track `lastFetched`.
   * For retrieving specific ranges, it directly calls the API.
   */
  async getListenHistory(
    { user, scrobbleToken, minTimestamp, maxTimestamp, count }: {
      user: User;
      scrobbleToken: string;
      minTimestamp?: number; // Unix timestamp: fetches listens *after* this timestamp (ListenBrainz 'min_ts')
      maxTimestamp?: number; // Unix timestamp: fetches listens *before* this timestamp (ListenBrainz 'max_ts')
      count: number;
    },
  ): Promise<{ listens?: Listen[]; error?: string }> {
    // 1. Validate inputs
    if (minTimestamp && maxTimestamp) {
      return {
        error:
          "Cannot provide both minTimestamp and maxTimestamp. Use one for paginated fetches from ListenBrainz API.",
      };
    }
    if (count <= 0) {
      return { error: "Count must be positive." };
    }

    const usernameResult = await this._getUsernameFromToken(scrobbleToken);
    if ("error" in usernameResult) {
      return { error: usernameResult.error };
    }
    const username = usernameResult.username;

    // ListenBrainz API uses 'before' (max_ts) and 'after' (min_ts) for pagination, not to define a strict range.
    const apiParams: Record<string, unknown> = {
      count: count,
    };
    if (minTimestamp) {
      apiParams.min_ts = minTimestamp;
    }
    if (maxTimestamp) {
      apiParams.max_ts = maxTimestamp;
    }

    // 2. Fetch from API (no direct cache read for dynamic ranges)
    const result = await this._callListenBrainzAPI<
      { payload: { listens: Listen[] } }
    >(
      scrobbleToken,
      `user/${username}/listens`,
      apiParams,
    );

    if ("error" in result) {
      return result;
    }

    const listens = result.payload?.listens || [];

    // Update the lastFetched timestamp and store the fetched segment in cache (overwriting previous)
    await this.listenHistoryCache.updateOne(
      { user },
      {
        $set: { listens, lastFetched: new Date() },
        $setOnInsert: { _id: freshID(), user },
      },
      { upsert: true },
    );

    return { listens };
  }

  /**
   * @action getListeningActivity
   * @requires user has valid scrobbleToken, timeRange is valid
   * @effect fetches listening activity statistics showing number of listens over time periods.
   */
  async getListeningActivity(
    { user, scrobbleToken, timeRange }: {
      user: User;
      scrobbleToken: string;
      timeRange: string;
    },
  ): Promise<{ activity?: ListeningActivity; error?: string }> {
    // 1. Validate inputs
    if (!VALID_TIME_RANGES.includes(timeRange)) {
      return { error: `Invalid timeRange: ${timeRange}` };
    }

    const usernameResult = await this._getUsernameFromToken(scrobbleToken);
    if ("error" in usernameResult) {
      return { error: usernameResult.error };
    }
    const username = usernameResult.username;

    // This can be cached in StatisticsCache with statType "activity"
    const statType: ListenBrainzStatType = "activity";
    const cachedActivity = await this.statsCache.findOne({
      user,
      statType,
      timeRange,
    });
    if (
      cachedActivity &&
      (new Date().getTime() - cachedActivity.lastUpdated.getTime()) <
        this.CACHE_TTL_MS
    ) {
      return { activity: cachedActivity.data as ListeningActivity };
    }

    // 2. Fetch from API
    const result = await this._callListenBrainzAPI<
      { payload: { listening_activity: ListeningActivity } }
    >(
      scrobbleToken,
      `stats/user/${username}/listening-activity`,
      { range: timeRange },
    );

    if ("error" in result) {
      return result;
    }

    const activity = result.payload?.listening_activity || {};

    // 3. Update cache
    await this.statsCache.updateOne(
      { user, statType, timeRange },
      {
        $set: {
          data: activity,
          lastUpdated: new Date(),
        },
        $setOnInsert: { _id: freshID(), user, statType, timeRange },
      },
      { upsert: true },
    );

    return { activity };
  }

  /**
   * @action validateToken
   * @requires token is non-empty string
   * @effect validates a ListenBrainz token by attempting to fetch user info, returns validity status and associated username if valid.
   */
  async validateToken(
    { token }: { token: string },
  ): Promise<{ valid: boolean; username?: string; error?: string }> {
    if (!token) {
      return { valid: false, error: "Token cannot be empty." };
    }

    try {
      // The /validate-token endpoint validates the token and returns user info
      const response = await fetch(LISTENBRAINZ_API_BASE + "validate-token", {
        headers: {
          "Authorization": `Token ${token}`,
          "User-Agent": "ListenBuddy/1.0.0 ( contact@example.com )",
        },
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          return { valid: false, error: "Invalid ListenBrainz token." };
        }
        const errorText = await response.text();
        return {
          valid: false,
          error:
            `ListenBrainz API error validating token: ${response.status} - ${errorText}`,
        };
      }

      const result = await response.json();
      // Check if the token is actually valid according to the API response
      if (result.valid !== true) {
        return { valid: false, error: "Invalid ListenBrainz token." };
      }
      return { valid: true, username: result.user_name }; // validate-token endpoint returns user_name
    } catch (e) {
      console.error(`Error validating ListenBrainz token: ${e}`);
      return {
        valid: false,
        error: `Network or API call failed during token validation: ${
          (e as Error).message
        }`,
      };
    }
  }

  /**
   * @action clearCache
   * @requires user exists
   * @effect removes all cached statistics and listen history for the user, forcing fresh API calls on next request.
   */
  async clearCache(
    { user }: { user: User },
  ): Promise<Empty | { error?: string }> {
    try {
      await this.statsCache.deleteMany({ user });
      await this.listenHistoryCache.deleteMany({ user });
      return {};
    } catch (e) {
      console.error(`Error clearing cache for user ${user}: ${e}`);
      return { error: `Failed to clear cache: ${(e as Error).message}` };
    }
  }
}

```

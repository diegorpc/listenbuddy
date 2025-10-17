---
timestamp: 'Fri Oct 17 2025 00:24:41 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251017_002441.2780bbd4.md]]'
content_id: 434489a5e060e802dcf184cc20228514550a1a53159ed271e4bae44ec2678ab1
---

# concept: MusicBrainzAPI

* **concept**: MusicBrainzAPI

* **purpose**: retrieve detailed metadata and relationships between music entities to enable rich recommendations and comprehensive music information display

* **principle**: after identifying a music entity by its MBID, the API fetches detailed metadata and relationships (similar artists, related works, recordings on releases) which are used by the recommendation system to find musically connected items and provide context-rich information to users.

* **state**:

* A set of `EntityCache` with:
  * an `mbid` of type `String` (MusicBrainz ID)
  * an `entityType` of type `String` ("artist", "recording", "release", "release-group", "work")
  * a `metadata` of type `JSON`
  * a `lastFetched` of type `Timestamp`

* A set of `RelationshipCache` with:
  * an `mbid` of type `String`
  * a `relationshipType` of type `String` ("artist-rels", "recording-rels", "work-rels", etc.)
  * a `relationships` of type `List<JSON>`
  * a `lastFetched` of type `Timestamp`

* A configuration `rateLimitState` with:
  * a `lastRequestTime` of type `Timestamp`
  * a `requestCount` of type `Number`

* **actions**:

* `lookupArtist(mbid: String, includes: List<String>): (artist: JSON)`

* **requires**: mbid is valid MusicBrainz artist ID, includes contains valid subquery types

* **effect**: fetches detailed artist information from MusicBrainz API including optional subqueries (recordings, releases, release-groups, works, artist-rels, etc.). Returns artist name, aliases, area, type, and requested linked entities.

* `lookupRecording(mbid: String, includes: List<String>): (recording: JSON)`

* **requires**: mbid is valid MusicBrainz recording ID, includes contains valid subquery types

* **effect**: fetches recording (track/song) information including title, length, artists, and optionally releases, ISRCs, work relationships, and artist relationships.

* `lookupRelease(mbid: String, includes: List<String>): (release: JSON)`

* **requires**: mbid is valid MusicBrainz release ID, includes contains valid subquery types

* **effect**: fetches release (album) information including title, date, status, artists, labels, and optionally recordings, release-group, cover art, and relationships.

* `lookupReleaseGroup(mbid: String, includes: List<String>): (releaseGroup: JSON)`

* **requires**: mbid is valid MusicBrainz release-group ID, includes contains valid subquery types

* **effect**: fetches release group information including title, type, artists, and optionally individual releases and relationships.

* `lookupWork(mbid: String, includes: List<String>): (work: JSON)`

* **requires**: mbid is valid MusicBrainz work ID, includes contains valid subquery types

* **effect**: fetches work (composition) information including title, type, and relationships to artists (composers, lyricists), recordings, and other works.

* `getEntityRelationships(mbid: String, entityType: String, relationshipTypes: List<String>): (relationships: List<Relationship>)`

* **requires**: mbid is valid, entityType is one of the supported entity types, relationshipTypes contains valid relationship types

* **effect**: fetches all relationships of specified types for an entity. Returns list of relationships with target entities, relationship type, and attributes. Used to find similar artists, cover versions, samples, etc.

* `searchEntities(query: String, entityType: String, limit: Number): (results: List<JSON>)`

* **requires**: query is non-empty, entityType is valid ("artist", "recording", "release", etc.), limit is positive

* **effect**: searches MusicBrainz database for entities matching the query string. Returns ranked list of matching entities with scores.

* `browseByEntity(entityType: String, linkedEntity: String, linkedMbid: String, limit: Number, offset: Number): (results: List<JSON>)`

* **requires**: entityType and linkedEntity are valid types, linkedMbid exists, limit and offset are non-negative

* **effect**: browses entities linked to a specific entity (e.g., all releases by an artist, all recordings of a work). Supports pagination.

* `getArtistSimilarities(artistMbid: String): (similarArtists: List<Artist>)`

* **requires**: artistMbid is valid

* **effect**: fetches artists with relationships to the given artist (collaborations, member-of, similar-to) and returns them as potential similar artists for recommendations.

* `getRecordingWorks(recordingMbid: String): (works: List<Work>)`

* **requires**: recordingMbid is valid

* **effect**: fetches the musical works (compositions) associated with a recording, including composer and lyricist information.

* `getCoverArt(releaseMbid: String): (coverArtUrl: String)`

* **requires**: releaseMbid is valid

* **effect**: retrieves the cover art URL for a release from Cover Art Archive (integrated with MusicBrainz).

* `clearCache(mbid: String): ()`

* **requires**: mbid exists in cache

* **effect**: removes cached entity and relationship data for the specified MBID, forcing fresh API calls on next request.

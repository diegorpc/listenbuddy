---
timestamp: 'Sat Oct 18 2025 21:11:10 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251018_211110.d7a3d38a.md]]'
content_id: dffb26126c5bcb5674cde42192176ff4d1d27f49e8ad07635293fcc176e6c378
---

# concept: MusicBrainzAPI

* **concept**: MusicBrainzAPI

* **purpose**: retrieve detailed metadata and genre/tag information for music entities to enable rich recommendations and comprehensive music information display

* **principle**: after identifying a music entity by its MBID, the API fetches detailed metadata including genres and tags. These genres are used to find similar entities through tag-based matching, enabling the recommendation system to suggest musically related content based on genre overlap.

* **state**:

* A set of `EntityCache` with:
  * an `mbid` of type `String` (MusicBrainz ID)
  * an `entityType` of type `String` ("artist", "recording", "release", "release-group", "work")
  * a `metadata` of type `JSON` (includes genres, tags, and other entity data)
  * a `lastFetched` of type `Timestamp`

* A configuration `rateLimitState` with:
  * a `lastRequestTime` of type `Timestamp`

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

* `getEntityGenres(mbid: String, entityType: String): (genres: List<Genre>, tags: List<Tag>)`

* **requires**: mbid is valid, entityType is one of "artist", "recording", "release", or "release-group"

* **effect**: fetches genres (curated) and tags (user-submitted) for an entity, sorted by popularity count. Used to understand the musical style and find similar content.

* `searchEntities(query: String, entityType: String, limit: Number): (results: List<JSON>)`

* **requires**: query is non-empty, entityType is valid ("artist", "recording", "release", etc.), limit is positive

* **effect**: searches MusicBrainz database for entities matching the query string. Returns ranked list of matching entities with scores.

* `browseByEntity(entityType: String, linkedEntity: String, linkedMbid: String, limit: Number, offset: Number): (results: List<JSON>)`

* **requires**: entityType and linkedEntity are valid types, linkedMbid exists, limit and offset are non-negative

* **effect**: browses entities linked to a specific entity (e.g., all releases by an artist, all recordings of a work). Supports pagination.

* `getArtistSimilarities(artistMbid: String, limit: Number): (similarArtists: List<SimilarArtist>)`

* **requires**: artistMbid is valid

* **effect**: finds similar artists based on genre/tag overlap. Returns scored list of artists with shared genres, where score is weighted by genre popularity. More useful for recommendations than relationship-based approaches.

* `getSimilarRecordings(recordingMbid: String, limit: Number): (similarRecordings: List<SimilarRecording>)`

* **requires**: recordingMbid is valid

* **effect**: finds similar recordings (songs/tracks) based on genre/tag overlap. Returns scored list with shared genres.

* `getSimilarReleaseGroups(releaseGroupMbid: String, limit: Number): (similarReleaseGroups: List<SimilarReleaseGroup>)`

* **requires**: releaseGroupMbid is valid

* **effect**: finds similar release groups (albums) based on genre/tag overlap. Returns scored list with shared genres.

* `getRecordingWorks(recordingMbid: String): (works: List<Work>)`

* **requires**: recordingMbid is valid

* **effect**: fetches the musical works (compositions) associated with a recording, including composer and lyricist information.

* `getCoverArt(releaseMbid: String): (coverArtUrl: String)`

* **requires**: releaseMbid is valid

* **effect**: retrieves the cover art URL for a release from Cover Art Archive (integrated with MusicBrainz).

* `clearCache(mbid: String): ()`

* **requires**: mbid exists in cache

* **effect**: removes cached entity data for the specified MBID, forcing fresh API calls on next request.

**Note**: The similarity methods use genre-based matching rather than MusicBrainz relationships. Relationships in MusicBrainz are primarily metadata (e.g., "member of band", "collaborated with") and don't provide useful signals for music recommendations. Genre/tag overlap provides much better similarity detection for suggesting related content.

# concept: ListenBrainzAPI 

* **concept**: ListenBrainzAPI[User]

* **purpose**: retrieve user listening statistics and history from ListenBrainz to display top artists, albums, and tracks over various time periods

* **principle**: after a user associates their ListenBrainz token, the API fetches their scrobble data to show top artists, releases, and songs over any time range, enabling the app to display personalized listening statistics.

* **state**: 
 * A set of `StatisticsCache` with:
   * a `user` of type `User`
   * a `statType` of type `String` ("artists", "releases", "release-groups", "recordings")
   * a `timeRange` of type `String` ("all_time", "week", "month", "quarter_year", "half_year", "year")
   * a `data` of type `JSON`
   * a `lastUpdated` of type `Timestamp`
 * A set of `ListenHistory` with:
   * a `user` of type `User`
   * a `listens` of type `List<JSON>`
   * a `lastFetched` of type `Timestamp`

* **actions**:

 * `getTopArtists(user: User, timeRange: String, count: Number): (artists: List<Artist>)`
  * **requires**: user has valid scrobbleToken, timeRange is valid, count is non-negative
  * **effect**: fetches and returns top artists for the user from ListenBrainz API for the specified time range, with pagination support. Each artist includes name, MBIDs, and listen count.

 * `getTopReleases(user: User, timeRange: String, count: Number): (releases: List<Release>)`
  * **requires**: user has valid scrobbleToken, timeRange is valid, count is non-negative
  * **effect**: fetches and returns top releases (albums) for the user from ListenBrainz API for the specified time range, with pagination support. Each release includes name, artist, MBID, and listen count.

 * `getTopReleaseGroups(user: User, timeRange: String, count: Number): (releaseGroups: List<ReleaseGroup>)`
  * **requires**: user has valid scrobbleToken, timeRange is valid, count is non-negative
  * **effect**: fetches and returns top release groups (album versions) for the user from ListenBrainz API for the specified time range. Each release group includes name, artist, MBID, cover art, and listen count.

 * `getTopRecordings(user: User, timeRange: String, count: Number): (recordings: List<Recording>)`
  * **requires**: user has valid scrobbleToken, timeRange is valid, count is non-negative
  * **effect**: fetches and returns top recordings (tracks/songs) for the user from ListenBrainz API for the specified time range. Each recording includes track name, artist, release, MBID, and listen count.

 * `getListenHistory(user: User, minTimestamp: Number, maxTimestamp: Number, count: Number): (listens: List<Listen>)`
  * **requires**: user has valid scrobbleToken, either minTimestamp or maxTimestamp is provided (not both), count is positive
  * **effect**: fetches the user's listen history from ListenBrainz API. Returns list of individual listens with track metadata and timestamps.

 * `getListeningActivity(user: User, timeRange: String): (activity: JSON)`
  * **requires**: user has valid scrobbleToken, timeRange is valid
  * **effect**: fetches listening activity statistics showing number of listens over time periods.

 * `validateToken(token: String): (valid: Boolean, username: String)`
  * **requires**: token is non-empty string
  * **effect**: validates a ListenBrainz token by attempting to fetch user info, returns validity status and associated username if valid.

 * `clearCache(user: User): ()`
  * **requires**: user exists
  * **effect**: removes all cached statistics and listen history for the user, forcing fresh API calls on next request.

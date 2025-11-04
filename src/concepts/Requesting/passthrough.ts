/**
 * The Requesting concept exposes passthrough routes by default,
 * which allow POSTs to the route:
 *
 * /{REQUESTING_BASE_URL}/{Concept name}/{action or query}
 *
 * to passthrough directly to the concept action or query.
 * This is a convenient and natural way to expose concepts to
 * the world, but should only be done intentionally for public
 * actions and queries.
 *
 * This file allows you to explicitly set inclusions and exclusions
 * for passthrough routes:
 * - inclusions: those that you can justify their inclusion
 * - exclusions: those to exclude, using Requesting routes instead
 */

/**
 * INCLUSIONS
 *
 * Each inclusion must include a justification for why you think
 * the passthrough is appropriate (e.g. public query).
 *
 * inclusions = {"route": "justification"}
 */

export const inclusions: Record<string, string> = {
  // User - Public registration
  "/api/User/createUser": "public user registration",

  // MusicBrainzAPI - All public queries for MusicBrainz data
  "/api/MusicBrainzAPI/lookupArtist": "public MusicBrainz artist lookup",
  "/api/MusicBrainzAPI/lookupRecording": "public MusicBrainz recording lookup",
  "/api/MusicBrainzAPI/lookupRelease": "public MusicBrainz release lookup",
  "/api/MusicBrainzAPI/lookupReleaseGroup":
    "public MusicBrainz release group lookup",
  "/api/MusicBrainzAPI/lookupWork": "public MusicBrainz work lookup",
  "/api/MusicBrainzAPI/searchEntities": "public MusicBrainz search",
  "/api/MusicBrainzAPI/browseByEntity": "public MusicBrainz browse",
  "/api/MusicBrainzAPI/getEntityGenres": "public genre/tag lookup",
  "/api/MusicBrainzAPI/getArtistSimilarities":
    "public artist similarity lookup",
  "/api/MusicBrainzAPI/getSimilarRecordings":
    "public recording similarity lookup",
  "/api/MusicBrainzAPI/getSimilarReleaseGroups":
    "public release group similarity lookup",
  "/api/MusicBrainzAPI/getRecordingWorks": "public work relationship lookup",
  "/api/ListenBrainzAPI/getDailyActivity":
    "user daily activity statistics for home page",
};

/**
 * EXCLUSIONS
 *
 * Excluded routes fall back to the Requesting concept, and will
 * instead trigger the normal Requesting.request action. As this
 * is the intended behavior, no justification is necessary.
 *
 * exclusions = ["route"]
 */

export const exclusions: Array<string> = [
  // User - Authenticated actions
  "/api/User/startSession",
  "/api/User/endSession",
  "/api/User/associateToken",

  // ListenBrainzAPI - All require user's scrobble token
  "/api/ListenBrainzAPI/getTopArtists",
  "/api/ListenBrainzAPI/getTopReleases",
  "/api/ListenBrainzAPI/getTopReleaseGroups",
  "/api/ListenBrainzAPI/getTopRecordings",
  "/api/ListenBrainzAPI/getListenHistory",
  "/api/ListenBrainzAPI/getListeningActivity",
  "/api/ListenBrainzAPI/validateToken",
  "/api/ListenBrainzAPI/clearCache",

  // Recommendation - All require userId
  "/api/Recommendation/generate",
  "/api/Recommendation/getRecommendations",
  "/api/Recommendation/provideFeedback",
  "/api/Recommendation/deleteRecommendation",
  "/api/Recommendation/clearRecommendations",
  "/api/Recommendation/getFeedbackHistory",
];

/**
 * ListenBuddy synchronizations for authenticated and composite actions
 */

import {
  ListenBrainzAPI,
  Recommendation,
  Requesting,
  User,
} from "@concepts";
import { actions, Sync } from "@engine";

// ============================================================================
// USER AUTHENTICATION SYNCS
// ============================================================================

/**
 * Handle login requests - validates credentials and returns user session
 */
export const UserLoginRequest: Sync = ({ request, username, password }) => ({
  when: actions([
    Requesting.request,
    { path: "/User/startSession", username, password },
    { request },
  ]),
  then: actions([User.startSession, { username, password }]),
});

export const UserLoginResponse: Sync = ({
  request,
  user,
  username,
  scrobbleToken,
  listenBrainzName,
}) => ({
  when: actions(
    [Requesting.request, { path: "/User/startSession" }, { request }],
    [User.startSession, {}, { user, username, scrobbleToken, listenBrainzName }],
  ),
  then: actions([
    Requesting.respond,
    { request, user, username, scrobbleToken, listenBrainzName },
  ]),
});

/**
 * Handle logout requests
 */
export const UserLogoutRequest: Sync = ({ request, user }) => ({
  when: actions([
    Requesting.request,
    { path: "/User/endSession", user },
    { request },
  ]),
  then: actions([User.endSession, { user }]),
});

export const UserLogoutResponse: Sync = ({ request }) => ({
  when: actions(
    [Requesting.request, { path: "/User/endSession" }, { request }],
    [User.endSession, {}, {}],
  ),
  then: actions([Requesting.respond, { request }]),
});

/**
 * Handle token association requests
 */
export const UserAssociateTokenRequest: Sync = ({
  request,
  user,
  scrobbleToken,
}) => ({
  when: actions([
    Requesting.request,
    { path: "/User/associateToken", user, scrobbleToken },
    { request },
  ]),
  then: actions([User.associateToken, { user, scrobbleToken }]),
});

export const UserAssociateTokenResponse: Sync = ({
  request,
  listenBrainzName,
}) => ({
  when: actions(
    [Requesting.request, { path: "/User/associateToken" }, { request }],
    [User.associateToken, {}, { listenBrainzName }],
  ),
  then: actions([Requesting.respond, { request, listenBrainzName }]),
});

// ============================================================================
// LISTENBRAINZ API SYNCS
// ============================================================================

/**
 * Handle getTopArtists requests
 */
export const GetTopArtistsRequest: Sync = ({
  request,
  user,
  scrobbleToken,
  timeRange,
  count,
  offset,
}) => ({
  when: actions([
    Requesting.request,
    { path: "/ListenBrainzAPI/getTopArtists", user, scrobbleToken, timeRange, count, offset },
    { request },
  ]),
  then: actions([
    ListenBrainzAPI.getTopArtists,
    { user, scrobbleToken, timeRange, count, offset },
  ]),
});

export const GetTopArtistsResponse: Sync = ({ request, artists }) => ({
  when: actions(
    [Requesting.request, { path: "/ListenBrainzAPI/getTopArtists" }, { request }],
    [ListenBrainzAPI.getTopArtists, {}, { artists }],
  ),
  then: actions([Requesting.respond, { request, artists }]),
});

/**
 * Handle getTopReleases requests
 */
export const GetTopReleasesRequest: Sync = ({
  request,
  user,
  scrobbleToken,
  timeRange,
  count,
  offset,
}) => ({
  when: actions([
    Requesting.request,
    { path: "/ListenBrainzAPI/getTopReleases", user, scrobbleToken, timeRange, count, offset },
    { request },
  ]),
  then: actions([
    ListenBrainzAPI.getTopReleases,
    { user, scrobbleToken, timeRange, count, offset },
  ]),
});

export const GetTopReleasesResponse: Sync = ({ request, releases }) => ({
  when: actions(
    [Requesting.request, { path: "/ListenBrainzAPI/getTopReleases" }, { request }],
    [ListenBrainzAPI.getTopReleases, {}, { releases }],
  ),
  then: actions([Requesting.respond, { request, releases }]),
});

/**
 * Handle getTopReleaseGroups requests
 */
export const GetTopReleaseGroupsRequest: Sync = ({
  request,
  user,
  scrobbleToken,
  timeRange,
  count,
  offset,
}) => ({
  when: actions([
    Requesting.request,
    { path: "/ListenBrainzAPI/getTopReleaseGroups", user, scrobbleToken, timeRange, count, offset },
    { request },
  ]),
  then: actions([
    ListenBrainzAPI.getTopReleaseGroups,
    { user, scrobbleToken, timeRange, count, offset },
  ]),
});

export const GetTopReleaseGroupsResponse: Sync = ({
  request,
  releaseGroups,
}) => ({
  when: actions(
    [
      Requesting.request,
      { path: "/ListenBrainzAPI/getTopReleaseGroups" },
      { request },
    ],
    [ListenBrainzAPI.getTopReleaseGroups, {}, { releaseGroups }],
  ),
  then: actions([Requesting.respond, { request, releaseGroups }]),
});

/**
 * Handle getTopRecordings requests
 */
export const GetTopRecordingsRequest: Sync = ({
  request,
  user,
  scrobbleToken,
  timeRange,
  count,
  offset,
}) => ({
  when: actions([
    Requesting.request,
    { path: "/ListenBrainzAPI/getTopRecordings", user, scrobbleToken, timeRange, count, offset },
    { request },
  ]),
  then: actions([
    ListenBrainzAPI.getTopRecordings,
    { user, scrobbleToken, timeRange, count, offset },
  ]),
});

export const GetTopRecordingsResponse: Sync = ({ request, recordings }) => ({
  when: actions(
    [Requesting.request, { path: "/ListenBrainzAPI/getTopRecordings" }, { request }],
    [ListenBrainzAPI.getTopRecordings, {}, { recordings }],
  ),
  then: actions([Requesting.respond, { request, recordings }]),
});

/**
 * Handle getListenHistory requests
 */
export const GetListenHistoryRequest: Sync = ({
  request,
  user,
  scrobbleToken,
  minTimestamp,
  maxTimestamp,
  count,
}) => ({
  when: actions([
    Requesting.request,
    {
      path: "/ListenBrainzAPI/getListenHistory",
      user,
      scrobbleToken,
      minTimestamp,
      maxTimestamp,
      count,
    },
    { request },
  ]),
  then: actions([
    ListenBrainzAPI.getListenHistory,
    { user, scrobbleToken, minTimestamp, maxTimestamp, count },
  ]),
});

export const GetListenHistoryResponse: Sync = ({ request, listens }) => ({
  when: actions(
    [Requesting.request, { path: "/ListenBrainzAPI/getListenHistory" }, { request }],
    [ListenBrainzAPI.getListenHistory, {}, { listens }],
  ),
  then: actions([Requesting.respond, { request, listens }]),
});

/**
 * Handle getListeningActivity requests
 */
export const GetListeningActivityRequest: Sync = ({
  request,
  user,
  scrobbleToken,
  timeRange,
}) => ({
  when: actions([
    Requesting.request,
    { path: "/ListenBrainzAPI/getListeningActivity", user, scrobbleToken, timeRange },
    { request },
  ]),
  then: actions([
    ListenBrainzAPI.getListeningActivity,
    { user, scrobbleToken, timeRange },
  ]),
});

export const GetListeningActivityResponse: Sync = ({ request, activity }) => ({
  when: actions(
    [
      Requesting.request,
      { path: "/ListenBrainzAPI/getListeningActivity" },
      { request },
    ],
    [ListenBrainzAPI.getListeningActivity, {}, { activity }],
  ),
  then: actions([Requesting.respond, { request, activity }]),
});

/**
 * Handle getDailyActivity requests
 */
export const GetDailyActivityRequest: Sync = ({
  request,
  user,
  scrobbleToken,
  timeRange,
}) => ({
  when: actions([
    Requesting.request,
    { path: "/ListenBrainzAPI/getDailyActivity", user, scrobbleToken, timeRange },
    { request },
  ]),
  then: actions([
    ListenBrainzAPI.getDailyActivity,
    { user, scrobbleToken, timeRange },
  ]),
});

export const GetDailyActivityResponse: Sync = ({
  request,
  dailyActivity,
  from_ts,
  to_ts,
  last_updated,
  stats_range,
  user_id,
}) => ({
  when: actions(
    [Requesting.request, { path: "/ListenBrainzAPI/getDailyActivity" }, { request }],
    [
      ListenBrainzAPI.getDailyActivity,
      {},
      { dailyActivity, from_ts, to_ts, last_updated, stats_range, user_id },
    ],
  ),
  then: actions([
    Requesting.respond,
    { request, dailyActivity, from_ts, to_ts, last_updated, stats_range, user_id },
  ]),
});

/**
 * Handle validateToken requests
 */
export const ValidateTokenRequest: Sync = ({ request, token }) => ({
  when: actions([
    Requesting.request,
    { path: "/ListenBrainzAPI/validateToken", token },
    { request },
  ]),
  then: actions([ListenBrainzAPI.validateToken, { token }]),
});

export const ValidateTokenResponse: Sync = ({ request, valid, username }) => ({
  when: actions(
    [Requesting.request, { path: "/ListenBrainzAPI/validateToken" }, { request }],
    [ListenBrainzAPI.validateToken, {}, { valid, username }],
  ),
  then: actions([Requesting.respond, { request, valid, username }]),
});

/**
 * Handle clearCache requests
 */
export const ClearCacheRequest: Sync = ({ request, user }) => ({
  when: actions([
    Requesting.request,
    { path: "/ListenBrainzAPI/clearCache", user },
    { request },
  ]),
  then: actions([ListenBrainzAPI.clearCache, { user }]),
});

export const ClearCacheResponse: Sync = ({ request }) => ({
  when: actions(
    [Requesting.request, { path: "/ListenBrainzAPI/clearCache" }, { request }],
    [ListenBrainzAPI.clearCache, {}, {}],
  ),
  then: actions([Requesting.respond, { request }]),
});

// ============================================================================
// RECOMMENDATION SYNCS
// ============================================================================

/**
 * Handle generate recommendations requests
 */
export const GenerateRecommendationsRequest: Sync = ({
  request,
  userId,
  sourceItem,
  amount,
  sourceItemMetadata,
  similarArtists,
  similarRecordings,
  similarReleaseGroups,
}) => ({
  when: actions([
    Requesting.request,
    {
      path: "/Recommendation/generate",
      userId,
      sourceItem,
      amount,
      sourceItemMetadata,
      similarArtists,
      similarRecordings,
      similarReleaseGroups,
    },
    { request },
  ]),
  then: actions([
    Recommendation.generate,
    {
      userId,
      sourceItem,
      amount,
      sourceItemMetadata,
      similarArtists,
      similarRecordings,
      similarReleaseGroups,
    },
  ]),
});

export const GenerateRecommendationsResponse: Sync = ({
  request,
  recommendations,
}) => ({
  when: actions(
    [Requesting.request, { path: "/Recommendation/generate" }, { request }],
    [Recommendation.generate, {}, { recommendations }],
  ),
  then: actions([Requesting.respond, { request, recommendations }]),
});

/**
 * Handle getRecommendations requests
 */
export const GetRecommendationsRequest: Sync = ({
  request,
  userId,
  item,
  amount,
  feedbacked,
  ignore,
}) => ({
  when: actions([
    Requesting.request,
    { path: "/Recommendation/getRecommendations", userId, item, amount, feedbacked, ignore },
    { request },
  ]),
  then: actions([
    Recommendation.getRecommendations,
    { userId, item, amount, feedbacked, ignore },
  ]),
});

export const GetRecommendationsResponse: Sync = ({
  request,
  itemsWithReasoning,
}) => ({
  when: actions(
    [
      Requesting.request,
      { path: "/Recommendation/getRecommendations" },
      { request },
    ],
    [Recommendation.getRecommendations, {}, { itemsWithReasoning }],
  ),
  then: actions([Requesting.respond, { request, itemsWithReasoning }]),
});

/**
 * Handle provideFeedback requests
 */
export const ProvideFeedbackRequest: Sync = ({
  request,
  userId,
  recommendedItem,
  feedback,
}) => ({
  when: actions([
    Requesting.request,
    { path: "/Recommendation/provideFeedback", userId, recommendedItem, feedback },
    { request },
  ]),
  then: actions([
    Recommendation.provideFeedback,
    { userId, recommendedItem, feedback },
  ]),
});

export const ProvideFeedbackResponse: Sync = ({ request }) => ({
  when: actions(
    [Requesting.request, { path: "/Recommendation/provideFeedback" }, { request }],
    [Recommendation.provideFeedback, {}, {}],
  ),
  then: actions([Requesting.respond, { request }]),
});

/**
 * Handle deleteRecommendation requests
 */
export const DeleteRecommendationRequest: Sync = ({
  request,
  recommendationId,
}) => ({
  when: actions([
    Requesting.request,
    { path: "/Recommendation/deleteRecommendation", recommendationId },
    { request },
  ]),
  then: actions([Recommendation.deleteRecommendation, { recommendationId }]),
});

export const DeleteRecommendationResponse: Sync = ({ request }) => ({
  when: actions(
    [
      Requesting.request,
      { path: "/Recommendation/deleteRecommendation" },
      { request },
    ],
    [Recommendation.deleteRecommendation, {}, {}],
  ),
  then: actions([Requesting.respond, { request }]),
});

/**
 * Handle clearRecommendations requests
 */
export const ClearRecommendationsRequest: Sync = ({ request, userId }) => ({
  when: actions([
    Requesting.request,
    { path: "/Recommendation/clearRecommendations", userId },
    { request },
  ]),
  then: actions([Recommendation.clearRecommendations, { userId }]),
});

export const ClearRecommendationsResponse: Sync = ({ request }) => ({
  when: actions(
    [
      Requesting.request,
      { path: "/Recommendation/clearRecommendations" },
      { request },
    ],
    [Recommendation.clearRecommendations, {}, {}],
  ),
  then: actions([Requesting.respond, { request }]),
});

/**
 * Handle getFeedbackHistory requests
 */
export const GetFeedbackHistoryRequest: Sync = ({
  request,
  userId,
  sourceItem,
}) => ({
  when: actions([
    Requesting.request,
    { path: "/Recommendation/getFeedbackHistory", userId, sourceItem },
    { request },
  ]),
  then: actions([Recommendation.getFeedbackHistory, { userId, sourceItem }]),
});

export const GetFeedbackHistoryResponse: Sync = ({ request, history }) => ({
  when: actions(
    [
      Requesting.request,
      { path: "/Recommendation/getFeedbackHistory" },
      { request },
    ],
    [Recommendation.getFeedbackHistory, {}, { history }],
  ),
  then: actions([Requesting.respond, { request, history }]),
});

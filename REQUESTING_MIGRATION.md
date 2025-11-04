# ListenBuddy Requesting Concept Migration

## Overview

This document describes the migration from the old action server to the new Requesting concept-based architecture. The changes enable better control over request handling, authentication, and sync-based orchestration.

## Changes Made

### 1. Backend Configuration

#### Updated `src/concepts/Requesting/passthrough.ts`

**Included Routes (Public - Direct Passthrough):**
- `User.createUser` - Public user registration
- All `MusicBrainzAPI` routes - Public MusicBrainz data queries (no authentication required)

**Excluded Routes (Authenticated - Handled via Syncs):**
- `User.startSession`, `User.endSession`, `User.associateToken` - User authentication actions
- All `ListenBrainzAPI` routes - Require user's scrobble token
- All `Recommendation` routes - Require userId for personalization

### 2. Synchronizations

#### Created `src/syncs/listenbuddy.sync.ts`

This file contains synchronizations for all excluded routes, organized into three categories:

**User Authentication Syncs:**
- `UserLoginRequest/Response` - Handles `/User/startSession`
- `UserLogoutRequest/Response` - Handles `/User/endSession`
- `UserAssociateTokenRequest/Response` - Handles `/User/associateToken`

**ListenBrainzAPI Syncs:**
- `GetTopArtistsRequest/Response`
- `GetTopReleasesRequest/Response`
- `GetTopReleaseGroupsRequest/Response`
- `GetTopRecordingsRequest/Response`
- `GetListenHistoryRequest/Response`
- `GetListeningActivityRequest/Response`
- `GetDailyActivityRequest/Response`
- `ValidateTokenRequest/Response`
- `ClearCacheRequest/Response`

**Recommendation Syncs:**
- `GenerateRecommendationsRequest/Response`
- `GetRecommendationsRequest/Response`
- `ProvideFeedbackRequest/Response`
- `DeleteRecommendationRequest/Response`
- `ClearRecommendationsRequest/Response`
- `GetFeedbackHistoryRequest/Response`

Each sync pair follows the pattern:
1. **Request Sync** - Intercepts the incoming request and calls the concept action
2. **Response Sync** - Waits for the concept action result and sends the response

### 3. Frontend Updates

#### Updated `src/services/auth.ts`
- Fixed `logout()` to pass `user.userID` instead of the full user object

#### No Other Frontend Changes Required
The frontend was already structured to work with the new architecture:
- All services use proper endpoint paths
- Parameters are correctly formatted
- Error handling is in place

## Architecture Benefits

### 1. Authentication Control
Excluded routes can now be gated behind authentication checks in syncs. For example:
```typescript
when: actions([
  Requesting.request,
  { path: "/ListenBrainzAPI/getTopArtists", user, scrobbleToken, ... },
  { request },
]),
```

### 2. Request Orchestration
Syncs can orchestrate multiple concept actions in response to a single request. This enables:
- Validation before processing
- Multi-step workflows
- Conditional logic based on user state
- Audit logging

### 3. Clear Separation of Concerns
- **Public routes** (MusicBrainz queries, user registration) pass through directly
- **Authenticated routes** are handled by syncs with proper parameter validation
- The Requesting concept manages all HTTP concerns

## Frontend API Usage

### Example: Fetching Top Artists
```typescript
const response = await fetch(buildUrl('/api/ListenBrainzAPI/getTopArtists'), {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    user: userId,
    scrobbleToken: token,
    timeRange: 'this_month',
    count: 10,
    offset: 0
  })
});
```

The request flow:
1. POST to `/api/ListenBrainzAPI/getTopArtists`
2. Route is excluded → Triggers `Requesting.request` action
3. `GetTopArtistsRequest` sync intercepts → Calls `ListenBrainzAPI.getTopArtists`
4. `GetTopArtistsResponse` sync intercepts → Calls `Requesting.respond`
5. Response sent back to frontend

### Example: Public MusicBrainz Query
```typescript
const response = await fetch(buildUrl('/api/MusicBrainzAPI/searchEntities'), {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: 'Miles Davis',
    entityType: 'artist',
    limit: 10
  })
});
```

The request flow:
1. POST to `/api/MusicBrainzAPI/searchEntities`
2. Route is included → Directly calls `MusicBrainzAPI.searchEntities`
3. Response sent back immediately

## Testing

After migration:
1. Start the backend: `deno run start`
2. Verify all routes are registered (check console output)
3. Test authentication flows (login/logout)
4. Test ListenBrainz data fetching
5. Test recommendations generation
6. Test public MusicBrainz queries

## Future Enhancements

With this architecture in place, you can now:

1. **Add Authentication Middleware**
   - Validate tokens in syncs before processing
   - Check user permissions
   - Rate limit per user

2. **Add Request Logging**
   - Log all authenticated requests
   - Track API usage patterns

3. **Implement Caching**
   - Cache responses in syncs
   - Implement cache invalidation strategies

4. **Complex Workflows**
   - Chain multiple concept actions
   - Implement retry logic
   - Handle distributed transactions

## Migration Checklist

- [x] Configure passthrough routes (inclusions/exclusions)
- [x] Create syncs for all excluded routes
- [x] Update frontend auth service
- [x] Verify frontend API calls are compatible
- [ ] Run backend server and verify routes
- [ ] Test all authentication flows
- [ ] Test all data fetching endpoints
- [ ] Test recommendation generation
- [ ] Remove old action server code (if any)

## Notes

- The frontend was already well-structured and required minimal changes
- The sync pattern provides extensibility for future authentication/authorization logic
- MusicBrainz API calls remain public for optimal performance (no auth overhead)
- The architecture cleanly separates public vs authenticated routes

import {
  assertArrayIncludes,
  assertEquals,
  assertExists,
  assertNotEquals,
} from "jsr:@std/assert";
import { testDb } from "@utils/database.ts";
import ListenBrainzAPIConcept from "./ListenBrainzAPI.ts";
import { ID } from "@utils/types.ts";

// Load ListenBrainz token from environment variables
// This token should be a valid ListenBrainz User Token for testing purposes.
// Make sure you have a .env file in the project root with LISTENBRAINZ_TOKEN="your_token_here"
const LISTENBRAINZ_TOKEN = Deno.env.get("LISTENBRAINZ_TOKEN") as string;
const TEST_USER_ID = "test_user_lbapi" as ID; // A dummy user ID for caching purposes
const OUTPUT = false; //true for verbose debugging

// Constants for timestamp calculations
const ONE_DAY_IN_SECONDS = 24 * 3600;

Deno.test("ListenBrainzAPI Concept Tests", async (t) => {
  if (!LISTENBRAINZ_TOKEN) {
    console.warn(
      "LISTENBRAINZ_TOKEN not found in environment variables. Skipping ListenBrainzAPI tests.",
    );
    return; // Skip tests if token is not available
  }

  const [db, client] = await testDb();
  const lbApi = new ListenBrainzAPIConcept(db);

  // Before all tests, ensure a clean state
  await lbApi.clearCache({ user: TEST_USER_ID });

  await t.step("Action: validateToken - with a valid token", async () => {
    const result = await lbApi.validateToken({ token: LISTENBRAINZ_TOKEN });
    assertExists(result.valid);
    assertEquals(
      result.valid,
      true,
      `Expected token to be valid, but got: ${result.error}`,
    );
    assertExists(
      result.username,
      "Expected username to be returned for a valid token.",
    );
    assertNotEquals(result.username, "", "Expected username to not be empty.");
  });

  await t.step("Action: validateToken - with an invalid token", async () => {
    const result = await lbApi.validateToken({ token: "invalid-token-123" });
    assertExists(result.valid);
    assertEquals(result.valid, false, "Expected token to be invalid.");
    assertExists(
      result.error,
      "Expected an error message for an invalid token.",
    );
  });

  await t.step("Action: validateToken - with an empty token", async () => {
    const result = await lbApi.validateToken({ token: "" });
    assertExists(result.valid);
    assertEquals(
      result.valid,
      false,
      "Expected token to be invalid for empty string.",
    );
    assertExists(result.error, "Expected an error message for an empty token.");
    assertEquals(result.error, "Token cannot be empty.");
  });

  await t.step("Action: getTopArtists - with valid parameters", async () => {
    const result = await lbApi.getTopArtists({
      user: TEST_USER_ID,
      scrobbleToken: LISTENBRAINZ_TOKEN,
      timeRange: "week",
      count: 5,
    });
    if (OUTPUT) console.log(result);
    assertExists(
      result.artists,
      `Expected artists to be returned, but got error: ${result.error}`,
    );
    assertArrayIncludes(
      Object.keys(result),
      ["artists"],
      `Unexpected keys in result: ${Object.keys(result)}`,
    );
    assertExists(result.artists); // for type narrowing
    assertEquals(result.artists.length, 5, "Expected 5 top artists.");
    assertExists(result.artists[0].artist_name);
    assertExists(result.artists[0].listen_count);
  });

  await t.step("Action: getTopArtists - caching mechanism", async () => {
    // Clear cache first for a clean test run
    await lbApi.clearCache({ user: TEST_USER_ID });

    // First call, should fetch from API and populate cache
    const firstCallResult = await lbApi.getTopArtists({
      user: TEST_USER_ID,
      scrobbleToken: LISTENBRAINZ_TOKEN,
      timeRange: "month",
      count: 3,
    });
    if (OUTPUT) console.log(firstCallResult);
    assertExists(firstCallResult.artists);

    const initialCacheEntry = await db.collection(
      "ListenBrainzAPI.statisticsCache",
    ).findOne({ user: TEST_USER_ID, statType: "artists", timeRange: "month" });
    assertExists(
      initialCacheEntry,
      "Expected cache entry to be created after first call.",
    );
    const initialLastUpdated = initialCacheEntry.lastUpdated;

    // Second call immediately, should hit cache and NOT update lastUpdated
    const secondCallResult = await lbApi.getTopArtists({
      user: TEST_USER_ID,
      scrobbleToken: LISTENBRAINZ_TOKEN,
      timeRange: "month",
      count: 3,
    });
    if (OUTPUT) console.log(secondCallResult);
    assertExists(secondCallResult.artists);
    assertEquals(
      secondCallResult.artists.length,
      3,
      "Expected 3 top artists from cache.",
    );

    const subsequentCacheEntry = await db.collection(
      "ListenBrainzAPI.statisticsCache",
    ).findOne({ user: TEST_USER_ID, statType: "artists", timeRange: "month" });
    assertExists(subsequentCacheEntry);
    assertEquals(
      subsequentCacheEntry.lastUpdated.getTime(),
      initialLastUpdated.getTime(),
      "Expected lastUpdated to be the same due to cache hit.",
    );

    // Clear cache, then re-fetch: should create a new cache entry with updated timestamp
    await lbApi.clearCache({ user: TEST_USER_ID });
    const thirdCallResult = await lbApi.getTopArtists({
      user: TEST_USER_ID,
      scrobbleToken: LISTENBRAINZ_TOKEN,
      timeRange: "month",
      count: 3,
    });
    assertExists(thirdCallResult.artists);
    const afterClearCacheEntry = await db.collection(
      "ListenBrainzAPI.statisticsCache",
    ).findOne({ user: TEST_USER_ID, statType: "artists", timeRange: "month" });
    assertExists(afterClearCacheEntry);
    assertNotEquals(
      afterClearCacheEntry.lastUpdated.getTime(),
      initialLastUpdated.getTime(),
      "Expected lastUpdated to be different after clearCache and re-fetch.",
    );
  });

  await t.step("Action: getTopArtists - with invalid timeRange", async () => {
    const result = await lbApi.getTopArtists({
      user: TEST_USER_ID,
      scrobbleToken: LISTENBRAINZ_TOKEN,
      timeRange: "invalid_range",
      count: 5,
    });
    if (OUTPUT) console.log(result);
    assertExists(result.error);
    assertNotEquals(result.error, "");
    assertEquals(result.error, "Invalid timeRange: invalid_range");
  });

  await t.step("Action: getTopArtists - with negative count", async () => {
    const result = await lbApi.getTopArtists({
      user: TEST_USER_ID,
      scrobbleToken: LISTENBRAINZ_TOKEN,
      timeRange: "week",
      count: -1,
    });
    if (OUTPUT) console.log(result);
    assertExists(result.error);
    assertNotEquals(result.error, "");
    assertEquals(result.error, "Count must be non-negative: -1");
  });

  await t.step("Action: getTopArtists - with zero count", async () => {
    const result = await lbApi.getTopArtists({
      user: TEST_USER_ID,
      scrobbleToken: LISTENBRAINZ_TOKEN,
      timeRange: "week",
      count: 0,
    });
    if (OUTPUT) console.log(result);
    assertExists(result.error);
    assertEquals(result.error, "Count must be non-negative: 0");
  });

  await t.step("Action: getTopReleases - with valid parameters", async () => {
    const result = await lbApi.getTopReleases({
      user: TEST_USER_ID,
      scrobbleToken: LISTENBRAINZ_TOKEN,
      timeRange: "year",
      count: 2,
    });
    if (OUTPUT) console.log(result);
    assertExists(
      result.releases,
      `Expected releases to be returned, but got error: ${result.error}`,
    );
    assertExists(result.releases);
    assertEquals(result.releases.length, 2);
    assertExists(result.releases[0].release_name);
  });

  await t.step(
    "Action: getTopReleaseGroups - with valid parameters",
    async () => {
      const result = await lbApi.getTopReleaseGroups({
        user: TEST_USER_ID,
        scrobbleToken: LISTENBRAINZ_TOKEN,
        timeRange: "all_time",
        count: 1,
      });
      if (OUTPUT) console.log(result);
      assertExists(
        result.releaseGroups,
        `Expected release groups to be returned, but got error: ${result.error}`,
      );
      assertExists(result.releaseGroups);
      assertEquals(result.releaseGroups.length, 1);
      assertExists(result.releaseGroups[0].release_group_name);
    },
  );

  await t.step("Action: getTopRecordings - with valid parameters", async () => {
    const result = await lbApi.getTopRecordings({
      user: TEST_USER_ID,
      scrobbleToken: LISTENBRAINZ_TOKEN,
      timeRange: "week",
      count: 4,
    });
    if (OUTPUT) console.log(result);
    assertExists(
      result.recordings,
      `Expected recordings to be returned, but got error: ${result.error}`,
    );
    assertExists(result.recordings);
    assertEquals(result.recordings.length, 4);
    assertExists(result.recordings[0].track_name);
  });

  await t.step("Action: getListenHistory - with minTimestamp", async () => {
    const oneDayAgo = Math.floor(Date.now() / 1000) - ONE_DAY_IN_SECONDS;
    const result = await lbApi.getListenHistory({
      user: TEST_USER_ID,
      scrobbleToken: LISTENBRAINZ_TOKEN,
      minTimestamp: oneDayAgo,
      count: 5,
    });
    if (OUTPUT) console.log(result);
    assertExists(
      result.listens,
      `Expected listen history, but got error: ${result.error}`,
    );
    // Lenient check - allows empty results for accounts with no recent listens
    if (result.listens && result.listens.length > 0) {
      assertExists(result.listens[0].track_metadata);
      assertExists(result.listens[0].listened_at);
    }
  });

  await t.step("Action: getListenHistory - with maxTimestamp", async () => {
    const now = Math.floor(Date.now() / 1000);
    const result = await lbApi.getListenHistory({
      user: TEST_USER_ID,
      scrobbleToken: LISTENBRAINZ_TOKEN,
      maxTimestamp: now,
      count: 5,
    });
    if (OUTPUT) console.log(result);
    assertExists(
      result.listens,
      `Expected listen history, but got error: ${result.error}`,
    );
    if (result.listens && result.listens.length > 0) {
      assertExists(result.listens[0].track_metadata);
      assertExists(result.listens[0].listened_at);
    }
  });

  await t.step(
    "Action: getListenHistory - with both minTimestamp and maxTimestamp (invalid)",
    async () => {
      const result = await lbApi.getListenHistory({
        user: TEST_USER_ID,
        scrobbleToken: LISTENBRAINZ_TOKEN,
        minTimestamp: 1,
        maxTimestamp: 2,
        count: 5,
      });
      if (OUTPUT) console.log(result);
      assertExists(result.error);
      assertEquals(
        result.error,
        "Cannot provide both minTimestamp and maxTimestamp. Use one for paginated fetches from ListenBrainz API.",
      );
    },
  );

  await t.step(
    "Action: getListenHistory - with non-positive count",
    async () => {
      const result = await lbApi.getListenHistory({
        user: TEST_USER_ID,
        scrobbleToken: LISTENBRAINZ_TOKEN,
        minTimestamp: 1,
        count: 0,
      });
      if (OUTPUT) console.log(result);
      assertExists(result.error);
      assertEquals(result.error, "Count must be positive.");
    },
  );

  await t.step(
    "Action: getListeningActivity - with valid parameters",
    async () => {
      const result = await lbApi.getListeningActivity({
        user: TEST_USER_ID,
        scrobbleToken: LISTENBRAINZ_TOKEN,
        timeRange: "year",
      });
      if (OUTPUT) console.log(result);
      assertExists(
        result.activity,
        `Expected listening activity, but got error: ${result.error}`,
      );
      assertExists(result.activity); // for type narrowing
      // Activity can be empty if no listens, but should be an object
      assertEquals(typeof result.activity, "object");
    },
  );

  await t.step(
    "Action: getListeningActivity - with invalid timeRange",
    async () => {
      const result = await lbApi.getListeningActivity({
        user: TEST_USER_ID,
        scrobbleToken: LISTENBRAINZ_TOKEN,
        timeRange: "bad_range",
      });
      if (OUTPUT) console.log(result);
      assertExists(result.error);
      assertEquals(result.error, "Invalid timeRange: bad_range");
    },
  );

  await t.step(
    "Action: clearCache - removes all cached data for a user",
    async () => {
      // Populate cache first
      await lbApi.getTopArtists({
        user: TEST_USER_ID,
        scrobbleToken: LISTENBRAINZ_TOKEN,
        timeRange: "week",
        count: 1,
      });
      await lbApi.getListenHistory({
        user: TEST_USER_ID,
        scrobbleToken: LISTENBRAINZ_TOKEN,
        maxTimestamp: Math.floor(Date.now() / 1000),
        count: 1,
      });

      const statsCountBefore = await db.collection(
        "ListenBrainzAPI.statisticsCache",
      ).countDocuments({ user: TEST_USER_ID });
      const historyCountBefore = await db.collection(
        "ListenBrainzAPI.listenHistoryCache",
      ).countDocuments({ user: TEST_USER_ID });
      assertNotEquals(
        statsCountBefore,
        0,
        "Expected stats cache to be populated.",
      );
      assertNotEquals(
        historyCountBefore,
        0,
        "Expected history cache to be populated.",
      );

      // Clear cache
      const clearResult = await lbApi.clearCache({ user: TEST_USER_ID });
      assertEquals(
        Object.keys(clearResult).length,
        0,
        `Expected success, but got error: ${clearResult.error}`,
      );

      const statsCountAfter = await db.collection(
        "ListenBrainzAPI.statisticsCache",
      ).countDocuments({ user: TEST_USER_ID });
      const historyCountAfter = await db.collection(
        "ListenBrainzAPI.listenHistoryCache",
      ).countDocuments({ user: TEST_USER_ID });
      assertEquals(
        statsCountAfter,
        0,
        "Expected stats cache to be empty after clearing.",
      );
      assertEquals(
        historyCountAfter,
        0,
        "Expected history cache to be empty after clearing.",
      );
    },
  );

  await t.step(
    "Principle Trace: After a user associates their ListenBrainz token, the API fetches their scrobble data to show top artists, releases, and songs over any time range, enabling the app to display personalized listening statistics.",
    async () => {
      // 1. User associates their ListenBrainz token (simulated by having LISTENBRAINZ_TOKEN available).
      // In a real app, the User concept would manage this, and a sync would pass the token here.

      // 2. Validate the token to ensure it's functional and get the username.
      const validationResult = await lbApi.validateToken({
        token: LISTENBRAINZ_TOKEN,
      });
      assertEquals(
        validationResult.valid,
        true,
        `Principle failed at token validation: ${validationResult.error}`,
      );
      assertExists(
        validationResult.username,
        "Principle: Expected username from valid token.",
      );

      // 3. The API fetches their scrobble data to show top artists, releases, and songs.
      await lbApi.clearCache({ user: TEST_USER_ID });

      // Fetch top artists for a 'week'
      const topArtistsResult = await lbApi.getTopArtists({
        user: TEST_USER_ID,
        scrobbleToken: LISTENBRAINZ_TOKEN,
        timeRange: "week",
        count: 3,
      });
      assertExists(
        topArtistsResult.artists,
        `Principle failed: Could not fetch top artists. Error: ${topArtistsResult.error}`,
      );
      if (topArtistsResult.artists && topArtistsResult.artists.length > 0) {
        assertExists(topArtistsResult.artists[0].artist_name);
        console.log("Principle Trace: Top Artists fetched successfully.");
      }

      // Fetch top releases for a 'month'
      const topReleasesResult = await lbApi.getTopReleases({
        user: TEST_USER_ID,
        scrobbleToken: LISTENBRAINZ_TOKEN,
        timeRange: "month",
        count: 2,
      });
      assertExists(
        topReleasesResult.releases,
        `Principle failed: Could not fetch top releases. Error: ${topReleasesResult.error}`,
      );
      if (topReleasesResult.releases && topReleasesResult.releases.length > 0) {
        assertExists(topReleasesResult.releases[0].release_name);
        console.log("Principle Trace: Top Releases fetched successfully.");
      }

      // Fetch top recordings for 'all_time'
      const topRecordingsResult = await lbApi.getTopRecordings({
        user: TEST_USER_ID,
        scrobbleToken: LISTENBRAINZ_TOKEN,
        timeRange: "all_time",
        count: 1,
      });
      assertExists(
        topRecordingsResult.recordings,
        `Principle failed: Could not fetch top recordings. Error: ${topRecordingsResult.error}`,
      );
      if (
        topRecordingsResult.recordings &&
        topRecordingsResult.recordings.length > 0
      ) {
        assertExists(topRecordingsResult.recordings[0].track_name);
        console.log("Principle Trace: Top Recordings fetched successfully.");
      }
    },
  );

  await client.close();
});

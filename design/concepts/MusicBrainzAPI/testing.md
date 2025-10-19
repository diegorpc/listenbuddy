[@implementation](implementation.md)

[@testing-concepts](../../background/testing-concepts.md)

[@musicbrainz-test-data](../../background/musicbrainz-test-data.md)
# test: MusicBrainzAPI, using the provided test mbids
# response:

Here's the test file for the `MusicBrainzAPI`, adhering to the specified structure and testing guidelines.

```typescript
// file: src/concepts/MusicBrainzAPI/MusicBrainzAPI.test.ts

import {
  assertEquals,
  assertExists,
  assertFalse,
  assertObjectMatch,
  assertStringIncludes,
  assertThrows,
} from "jsr:@std/assert";
import { testDb } from "@utils/database.ts";
import { ID } from "@utils/types.ts";
import MusicBrainzAPI from "./MusicBrainzAPI.ts";

// Provided test MBIDs
const RADIOHEAD_MBID = "a74b1b7f-71a5-4011-9441-d0b5e4122711" as ID; // Artist: Radiohead
const OK_COMPUTER_RELEASE_MBID = "0b6b4ba0-d36f-47bd-b4ea-6a5b91842d29" as ID; // Release: OK Computer
const OK_COMPUTER_RELEASE_GROUP_MBID = "b1392450-e666-3926-a536-22c65f834433" as ID; // Release-Group: OK Computer
const NO_SURPRISES_RECORDING_MBID = "980a426e-623e-4ea5-98c7-008d037a0508" as ID; // Recording: No Surprises
const NO_SURPRISES_WORK_MBID = "15cd1194-5633-3b5b-a68b-f8fffc213915" as ID; // Work: No Surprises

// Helper to check for error objects from concept actions
const isError = (result: any): result is { error: string } => {
  return typeof result === "object" && result !== null && "error" in result;
};

Deno.test("MusicBrainzAPI Concept", async (t) => {
  const [db, client] = await testDb();
  const musicBrainzAPI = new MusicBrainzAPI(db);

  await t.step("should initialize collections", async () => {
    assertExists(musicBrainzAPI["entityCache"]);
    assertExists(musicBrainzAPI["relationshipCache"]);
    assertEquals(
      musicBrainzAPI["entityCache"].collectionName,
      "MusicBrainzAPI.entityCache",
    );
    assertEquals(
      musicBrainzAPI["relationshipCache"].collectionName,
      "MusicBrainzAPI.relationshipCache",
    );
  });

  await t.step("lookupArtist", async (ctx) => {
    await ctx.step("should fetch Radiohead artist data", async () => {
      const result = await musicBrainzAPI.lookupArtist({
        mbid: RADIOHEAD_MBID,
      });
      assertFalse(isError(result), `Expected no error, but got: ${result.error}`);
      assertExists(result.artist);
      assertEquals(result.artist.name, "Radiohead");
      assertEquals(result.artist.id, RADIOHEAD_MBID);
    });

    await ctx.step("should fetch artist data with 'releases' include", async () => {
      const result = await musicBrainzAPI.lookupArtist({
        mbid: RADIOHEAD_MBID,
        includes: ["releases"],
      });
      assertFalse(isError(result), `Expected no error, but got: ${result.error}`);
      assertExists(result.artist.releases);
      assertEquals(result.artist.releases.length > 0, true);
      assertExists(result.artist.releases[0].title);
    });

    await ctx.step("should return error for invalid artist MBID", async () => {
      const result = await musicBrainzAPI.lookupArtist({ mbid: "invalid-mbid" as ID });
      assertExists(result.error);
      assertStringIncludes(result.error, "Entity not found");
    });

    await ctx.step("should return error for missing artist MBID", async () => {
      const result = await musicBrainzAPI.lookupArtist({ mbid: "" as ID });
      assertExists(result.error);
      assertEquals(result.error, "MBID is required.");
    });
  });

  await t.step("lookupRecording", async (ctx) => {
    await ctx.step("should fetch No Surprises recording data", async () => {
      const result = await musicBrainzAPI.lookupRecording({
        mbid: NO_SURPRISES_RECORDING_MBID,
      });
      assertFalse(isError(result), `Expected no error, but got: ${result.error}`);
      assertExists(result.recording);
      assertEquals(result.recording.title, "No Surprises");
      assertEquals(result.recording.id, NO_SURPRISES_RECORDING_MBID);
      assertEquals(result.recording["artist-credit"][0].name, "Radiohead");
    });

    await ctx.step("should fetch recording data with 'releases' include", async () => {
      const result = await musicBrainzAPI.lookupRecording({
        mbid: NO_SURPRISES_RECORDING_MBID,
        includes: ["releases"],
      });
      assertFalse(isError(result), `Expected no error, but got: ${result.error}`);
      assertExists(result.recording.releases);
      assertEquals(result.recording.releases.length > 0, true);
      assertExists(result.recording.releases[0].title);
    });

    await ctx.step("should return error for invalid recording MBID", async () => {
      const result = await musicBrainzAPI.lookupRecording({
        mbid: "invalid-recording-mbid" as ID,
      });
      assertExists(result.error);
      assertStringIncludes(result.error, "Entity not found");
    });
  });

  await t.step("lookupRelease", async (ctx) => {
    await ctx.step("should fetch OK Computer release data", async () => {
      const result = await musicBrainzAPI.lookupRelease({
        mbid: OK_COMPUTER_RELEASE_MBID,
      });
      assertFalse(isError(result), `Expected no error, but got: ${result.error}`);
      assertExists(result.release);
      assertEquals(result.release.title, "OK Computer");
      assertEquals(result.release.id, OK_COMPUTER_RELEASE_MBID);
      assertEquals(result.release["artist-credit"][0].name, "Radiohead");
    });

    await ctx.step("should fetch release data with 'recordings' include", async () => {
      const result = await musicBrainzAPI.lookupRelease({
        mbid: OK_COMPUTER_RELEASE_MBID,
        includes: ["recordings"],
      });
      assertFalse(isError(result), `Expected no error, but got: ${result.error}`);
      assertExists(result.release.media);
      assertExists(result.release.media[0].tracks);
      assertEquals(result.release.media[0].tracks.length > 0, true);
      assertExists(result.release.media[0].tracks[0].title);
    });
  });

  await t.step("lookupReleaseGroup", async (ctx) => {
    await ctx.step("should fetch OK Computer release group data", async () => {
      const result = await musicBrainzAPI.lookupReleaseGroup({
        mbid: OK_COMPUTER_RELEASE_GROUP_MBID,
      });
      assertFalse(isError(result), `Expected no error, but got: ${result.error}`);
      assertExists(result.releaseGroup);
      assertEquals(result.releaseGroup.title, "OK Computer");
      assertEquals(result.releaseGroup.id, OK_COMPUTER_RELEASE_GROUP_MBID);
      assertEquals(result.releaseGroup["artist-credit"][0].name, "Radiohead");
    });
  });

  await t.step("lookupWork", async (ctx) => {
    await ctx.step("should fetch No Surprises work data", async () => {
      const result = await musicBrainzAPI.lookupWork({ mbid: NO_SURPRISES_WORK_MBID });
      assertFalse(isError(result), `Expected no error, but got: ${result.error}`);
      assertExists(result.work);
      assertEquals(result.work.title, "No Surprises");
      assertEquals(result.work.id, NO_SURPRISES_WORK_MBID);
    });

    await ctx.step("should fetch work data with 'artist-rels' include", async () => {
      const result = await musicBrainzAPI.lookupWork({
        mbid: NO_SURPRISES_WORK_MBID,
        includes: ["artist-rels"],
      });
      assertFalse(isError(result), `Expected no error, but got: ${result.error}`);
      assertExists(result.work.relations);
      assertEquals(result.work.relations.length > 0, true);
      assertEquals(result.work.relations[0].target_type, "artist");
      assertExists(result.work.relations[0].artist.name);
    });
  });

  await t.step("getEntityRelationships", async (ctx) => {
    await ctx.step("should fetch relationships for Radiohead (artist-rels)", async () => {
      const result = await musicBrainzAPI.getEntityRelationships({
        mbid: RADIOHEAD_MBID,
        entityType: "artist",
        relationshipTypes: ["artist-rels"],
      });
      assertFalse(isError(result), `Expected no error, but got: ${result.error}`);
      assertExists(result.relationships);
      assertEquals(result.relationships.length > 0, true);
      const firstRel = result.relationships[0];
      assertExists(firstRel.type);
      assertExists(firstRel.target_type);
    });

    await ctx.step("should return error for invalid entity type", async () => {
      const result = await musicBrainzAPI.getEntityRelationships({
        mbid: RADIOHEAD_MBID,
        entityType: "invalid-type" as any, // Cast to bypass TS for test
        relationshipTypes: ["artist-rels"],
      });
      assertExists(result.error);
      assertEquals(result.error, "Invalid entityType.");
    });

    await ctx.step("should return error for missing MBID", async () => {
      const result = await musicBrainzAPI.getEntityRelationships({
        mbid: "" as ID,
        entityType: "artist",
        relationshipTypes: ["artist-rels"],
      });
      assertExists(result.error);
      assertEquals(result.error, "MBID is required.");
    });
  });

  await t.step("searchEntities", async (ctx) => {
    await ctx.step("should search for 'Radiohead' artists", async () => {
      const result = await musicBrainzAPI.searchEntities({
        query: "Radiohead",
        entityType: "artist",
        limit: 5,
      });
      assertFalse(isError(result), `Expected no error, but got: ${result.error}`);
      assertExists(result.results);
      assertEquals(result.results.length > 0, true);
      assertStringIncludes(result.results[0].name, "Radiohead");
      assertEquals(result.results.length <= 5, true);
    });

    await ctx.step("should search for 'No Surprises' recordings", async () => {
      const result = await musicBrainzAPI.searchEntities({
        query: "No Surprises",
        entityType: "recording",
        limit: 3,
      });
      assertFalse(isError(result), `Expected no error, but got: ${result.error}`);
      assertExists(result.results);
      assertEquals(result.results.length > 0, true);
      assertStringIncludes(result.results[0].title, "No Surprises");
      assertEquals(result.results.length <= 3, true);
    });

    await ctx.step("should return error for empty query", async () => {
      const result = await musicBrainzAPI.searchEntities({ query: "", entityType: "artist" });
      assertExists(result.error);
      assertEquals(result.error, "Query cannot be empty.");
    });

    await ctx.step("should return error for invalid entity type", async () => {
      const result = await musicBrainzAPI.searchEntities({
        query: "test",
        entityType: "invalid-type" as any,
      });
      assertExists(result.error);
      assertEquals(result.error, "Invalid entityType.");
    });

    await ctx.step("should return error for non-positive limit", async () => {
      const result = await musicBrainzAPI.searchEntities({
        query: "test",
        entityType: "artist",
        limit: 0,
      });
      assertExists(result.error);
      assertEquals(result.error, "Limit must be positive.");
    });
  });

  await t.step("browseByEntity", async (ctx) => {
    await ctx.step("should browse releases by Radiohead (artist)", async () => {
      const result = await musicBrainzAPI.browseByEntity({
        entityType: "release",
        linkedEntity: "artist",
        linkedMbid: RADIOHEAD_MBID,
        limit: 5,
      });
      assertFalse(isError(result), `Expected no error, but got: ${result.error}`);
      assertExists(result.results);
      assertEquals(result.results.length > 0, true);
      assertStringIncludes(result.results[0]["artist-credit"][0].name, "Radiohead");
      assertEquals(result.results.length <= 5, true);
    });

    await ctx.step("should browse recordings for No Surprises work", async () => {
      const result = await musicBrainzAPI.browseByEntity({
        entityType: "recording",
        linkedEntity: "work",
        linkedMbid: NO_SURPRISES_WORK_MBID,
        limit: 2,
      });
      assertFalse(isError(result), `Expected no error, but got: ${result.error}`);
      assertExists(result.results);
      assertEquals(result.results.length > 0, true);
      assertStringIncludes(result.results[0].title, "No Surprises");
      assertEquals(result.results.length <= 2, true);
    });

    await ctx.step("should return error for missing linkedMbid", async () => {
      const result = await musicBrainzAPI.browseByEntity({
        entityType: "release",
        linkedEntity: "artist",
        linkedMbid: "" as ID,
      });
      assertExists(result.error);
      assertEquals(result.error, "linkedMbid is required.");
    });
  });

  await t.step("getArtistSimilarities", async (ctx) => {
    await ctx.step("should fetch similar artists for Radiohead", async () => {
      const result = await musicBrainzAPI.getArtistSimilarities({
        artistMbid: RADIOHEAD_MBID,
      });
      assertFalse(isError(result), `Expected no error, but got: ${result.error}`);
      assertExists(result.similarArtists);
      // Radiohead has many collaborations and other relationships that could be considered 'similar'
      // This test mainly ensures the mechanism works and returns some artists.
      assertEquals(result.similarArtists.length > 0, true);
      assertExists(result.similarArtists[0].name);
      assertExists(result.similarArtists[0].mbid);
      assertObjectMatch(result.similarArtists.find((a: any) => a.name === "Thom Yorke"), { type: "member of" });
    });

    await ctx.step("should return error for invalid artist MBID", async () => {
      const result = await musicBrainzAPI.getArtistSimilarities({
        artistMbid: "invalid-mbid" as ID,
      });
      assertExists(result.error);
      assertStringIncludes(result.error, "Entity not found");
    });
  });

  await t.step("getRecordingWorks", async (ctx) => {
    await ctx.step("should fetch works for No Surprises recording", async () => {
      const result = await musicBrainzAPI.getRecordingWorks({
        recordingMbid: NO_SURPRISES_RECORDING_MBID,
      });
      assertFalse(isError(result), `Expected no error, but got: ${result.error}`);
      assertExists(result.works);
      assertEquals(result.works.length > 0, true);
      assertStringIncludes(result.works[0].title, "No Surprises");
      assertExists(result.works[0].artists); // Check if composers/lyricists are attached
      assertObjectMatch(
        result.works[0].artists.find((a: any) => a.name === "Colin Greenwood"),
        { type: "composer" },
      );
    });

    await ctx.step("should return error for invalid recording MBID", async () => {
      const result = await musicBrainzAPI.getRecordingWorks({
        recordingMbid: "invalid-mbid" as ID,
      });
      assertExists(result.error);
      assertStringIncludes(result.error, "Entity not found");
    });
  });

  await t.step("getCoverArt", async (ctx) => {
    await ctx.step("should fetch cover art URL for OK Computer release", async () => {
      const result = await musicBrainzAPI.getCoverArt({
        releaseMbid: OK_COMPUTER_RELEASE_MBID,
      });
      assertFalse(isError(result), `Expected no error, but got: ${result.error}`);
      assertExists(result.coverArtUrl);
      assertStringIncludes(
        result.coverArtUrl,
        `coverartarchive.org/release/${OK_COMPUTER_RELEASE_MBID}/front`,
      );
    });

    await ctx.step("should return error for a release without cover art (non-existent MBID)", async () => {
      const result = await musicBrainzAPI.getCoverArt({
        releaseMbid: "f1a2b3c4-d5e6-7f89-a0b1-c2d3e4f5a6b7" as ID, // A random, likely non-existent MBID
      });
      assertExists(result.error);
      assertStringIncludes(result.error, "Cover art not found");
    });
  });

  await t.step("clearCache", async (ctx) => {
    await ctx.step("should clear cache for a specific MBID", async () => {
      // First, populate cache
      await musicBrainzAPI.lookupArtist({ mbid: RADIOHEAD_MBID });
      const cachedArtist = await db.collection("MusicBrainzAPI.entityCache")
        .findOne({ mbid: RADIOHEAD_MBID, entityType: "artist" });
      assertExists(cachedArtist);

      await musicBrainzAPI.clearCache({ mbid: RADIOHEAD_MBID });

      const clearedArtist = await db.collection("MusicBrainzAPI.entityCache")
        .findOne({ mbid: RADIOHEAD_MBID, entityType: "artist" });
      assertEquals(clearedArtist, null);

      const clearedRelationships = await db.collection(
        "MusicBrainzAPI.relationshipCache",
      ).findOne({ mbid: RADIOHEAD_MBID });
      assertEquals(clearedRelationships, null);
    });

    await ctx.step("should return error for missing MBID", async () => {
      const result = await musicBrainzAPI.clearCache({ mbid: "" as ID });
      assertExists(result.error);
      assertEquals(result.error, "MBID is required.");
    });
  });

  await t.step("Principle Fulfillment Trace", async (ctx) => {
    console.log("\n# trace: Principle Fulfillment for MusicBrainzAPI");

    await ctx.step("Step 1: Identify a music entity (Radiohead artist)", async () => {
      const artistResult = await musicBrainzAPI.lookupArtist({
        mbid: RADIOHEAD_MBID,
      });
      assertFalse(isError(artistResult), `Expected no error, but got: ${artistResult.error}`);
      assertExists(artistResult.artist);
      assertEquals(artistResult.artist.name, "Radiohead");
      console.log(`Trace: Successfully identified artist "${artistResult.artist.name}" (MBID: ${artistResult.artist.id})`);
    });

    await ctx.step("Step 2: Fetch detailed metadata and relationships (similar artists)", async () => {
      const similarArtistsResult = await musicBrainzAPI.getArtistSimilarities({
        artistMbid: RADIOHEAD_MBID,
      });
      assertFalse(isError(similarArtistsResult), `Expected no error, but got: ${similarArtistsResult.error}`);
      assertExists(similarArtistsResult.similarArtists);
      assertEquals(similarArtistsResult.similarArtists.length > 0, true);
      const thomYorke = similarArtistsResult.similarArtists.find((a: any) =>
        a.name === "Thom Yorke"
      );
      assertExists(thomYorke);
      console.log(
        `Trace: Found similar artists for Radiohead, including "${thomYorke.name}" (${thomYorke.type})`,
      );
    });

    await ctx.step("Step 3: Fetch related works for a recording", async () => {
      // First, lookup the recording to get its basic details (may be cached from previous tests)
      const recordingLookupResult = await musicBrainzAPI.lookupRecording({
        mbid: NO_SURPRISES_RECORDING_MBID,
      });
      assertFalse(isError(recordingLookupResult), `Expected no error, but got: ${recordingLookupResult.error}`);
      assertExists(recordingLookupResult.recording);
      console.log(
        `Trace: Retrieved recording "${recordingLookupResult.recording.title}"`,
      );

      const worksResult = await musicBrainzAPI.getRecordingWorks({
        recordingMbid: NO_SURPRISES_RECORDING_MBID,
      });
      assertFalse(isError(worksResult), `Expected no error, but got: ${worksResult.error}`);
      assertExists(worksResult.works);
      assertEquals(worksResult.works.length > 0, true);
      const noSurprisesWork = worksResult.works.find((w: any) =>
        w.title === "No Surprises"
      );
      assertExists(noSurprisesWork);
      console.log(`Trace: Associated work "${noSurprisesWork.title}" found for the recording.`);
      assertExists(noSurprisesWork.artists.find((a: any) => a.type === "composer"));
    });

    await ctx.step("Step 4: Fetch detailed release information and cover art", async () => {
      const releaseResult = await musicBrainzAPI.lookupRelease({
        mbid: OK_COMPUTER_RELEASE_MBID,
        includes: ["recordings"], // Including recordings to show rich data
      });
      assertFalse(isError(releaseResult), `Expected no error, but got: ${releaseResult.error}`);
      assertExists(releaseResult.release);
      assertEquals(releaseResult.release.title, "OK Computer");
      assertEquals(releaseResult.release.media[0].tracks.length > 0, true);
      console.log(
        `Trace: Retrieved detailed release "${releaseResult.release.title}" including its tracks.`,
      );

      const coverArtResult = await musicBrainzAPI.getCoverArt({
        releaseMbid: OK_COMPUTER_RELEASE_MBID,
      });
      assertFalse(isError(coverArtResult), `Expected no error, but got: ${coverArtResult.error}`);
      assertExists(coverArtResult.coverArtUrl);
      console.log(
        `Trace: Fetched cover art URL "${coverArtResult.coverArtUrl}" for the release.`,
      );
    });

    console.log(
      "\nPrinciple Fulfilled: The MusicBrainzAPI concept successfully fetched detailed metadata and relationships for various music entities, demonstrating its capability to provide rich data for recommendations and comprehensive information display.",
    );
  });

  // Ensure client is closed after all tests in this suite
  await client.close();
});
```
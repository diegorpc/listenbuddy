import { assert, assertEquals } from "jsr:@std/assert";
import { Collection } from "npm:mongodb";
import { testDb } from "@utils/database.ts";
import { ID } from "@utils/types.ts";
import { freshID } from "@utils/database.ts";
import RecommendationConcept from "./RecommendationConcept.ts";
import { GeminiLLM } from "@utils/geminiLLM.ts";

// --- Mocking GeminiLLM ---
// To make tests deterministic and avoid actual API calls, we'll mock the GeminiLLM.
// This approach overrides the prototype method for all instances of GeminiLLM
// within the test process, which is acceptable for Deno.test in a single-threaded
// environment, provided we reset it.
let originalGeminiExecuteLLM: typeof GeminiLLM.prototype.executeLLM;

const OUTPUT = true; // for verbose logging
// A default mock response for the LLM (no mbid required anymore)
const mockLLMSuccessResponse = JSON.stringify([
  {
    name: "Mocked Recommended Artist 1",
    reasoning: "Because of shared genre and user feedback patterns.",
    confidence: 0.95,
  },
  {
    name: "Mocked Recommended Artist 2",
    reasoning: "Has collaborations with source and positive user history.",
    confidence: 0.88,
  },
  {
    name: "Mocked Recommended Artist 3",
    reasoning: "Classic similar vibes.",
    confidence: 0.70,
  },
]);

Deno.test.beforeEach(() => {
  // Save original method
  originalGeminiExecuteLLM = GeminiLLM.prototype.executeLLM;

  // Set a dummy API key so the LLM instance is created in the concept constructor
  Deno.env.set("GEMINI_API_KEY", "dummy-gemini-api-key");

  // Override the executeLLM method with our mock
  GeminiLLM.prototype.executeLLM = (_prompt: string): Promise<string> => {
    // Optionally, you could inspect the prompt here for more advanced mocking
    // console.log("LLM Mock received prompt:", prompt);
    return Promise.resolve(mockLLMSuccessResponse);
  };
});

Deno.test.afterEach(() => {
  // Restore the original method after each test
  GeminiLLM.prototype.executeLLM = originalGeminiExecuteLLM;
  Deno.env.delete("GEMINI_API_KEY"); // Clean up environment variable
});

// --- Mock Data ---
const userAId: ID = "user:Alice" as ID;
const userBId: ID = "user:Bob" as ID;
const userCId: ID = "user:Charlie" as ID;
const sourceItemAId: ID = "mbid-artist-source-A" as ID;
const sourceItemBId: ID = "mbid-recording-source-B" as ID;
const sourceItemCId: ID = "mbid-source-C" as ID;
const recommendedItem1Id: ID = "rec-item-mbid-1" as ID; // Matches mock LLM output
const recommendedItem2Id: ID = "rec-item-mbid-2" as ID; // Matches mock LLM output
const recommendedItem3Id: ID = "rec-item-mbid-3" as ID; // Matches mock LLM output
const recommendedItem4Id: ID = "rec-item-mbid-4" as ID; // For fallback/manual testing
const recommendedItem5Id: ID = "rec-item-mbid-5" as ID; // For fallback/manual testing
// const recommendedItem6Id: ID = "rec-item-mbid-6" as ID; // Removed: no longer used

// Track generated IDs for LLM-created recommendations so we can provide feedback using actual IDs
let recA1GeneratedId: ID | null = null; // for "Mocked Recommended Artist 1"
// Removed: no longer used

const mockSourceItemMetadataA = {
  id: sourceItemAId,
  name: "The Beatles",
  type: "Artist",
  disambiguation: "legendary rock band",
  genres: [{ name: "Rock", count: 100 }, { name: "Pop", count: 80 }],
  tags: [{ name: "classic", count: 50 }, {
    name: "british invasion",
    count: 40,
  }],
};

const mockSimilarArtistsA = [
  {
    mbid: recommendedItem1Id,
    name: "The Rolling Stones",
    score: 90,
    sharedGenres: ["Rock", "Blues"],
  },
  {
    mbid: recommendedItem4Id,
    name: "Led Zeppelin",
    score: 85,
    sharedGenres: ["Hard Rock", "Blues Rock"],
  },
  {
    mbid: recommendedItem5Id,
    name: "Queen",
    score: 80,
    sharedGenres: ["Rock", "Glam Rock"],
  },
];

const mockSimilarRecordingsA = [
  {
    mbid: recommendedItem2Id,
    title: "Bohemian Rhapsody",
    score: 88,
    sharedGenres: ["Rock", "Opera"],
  },
  {
    mbid: "mbid-rec-song-x" as ID,
    title: "Stairway to Heaven",
    score: 82,
    sharedGenres: ["Hard Rock", "Folk Rock"],
  },
];

const mockSimilarReleaseGroupsA = [
  {
    mbid: recommendedItem3Id,
    title: "A Night at the Opera",
    score: 92,
    sharedGenres: ["Rock", "Opera"],
  },
  {
    mbid: "mbid-rec-album-y" as ID,
    title: "Led Zeppelin IV",
    score: 87,
    sharedGenres: ["Hard Rock", "Folk Rock"],
  },
];

Deno.test("Recommendation Concept", async (t) => {
  const [db, client] = await testDb();
  const recommendationConcept = new RecommendationConcept(db);
  try {
    await t.step("should create a Recommendation instance", () => {
      assert(recommendationConcept);
      assert(recommendationConcept.recommendations instanceof Collection);
    });

    await t.step("generate action: requires - invalid parameters", async () => {
      const result1 = await recommendationConcept.generate({
        userId: userAId,
        sourceItem: "" as ID, // Invalid
        amount: 5,
        sourceItemMetadata: mockSourceItemMetadataA,
        similarArtists: mockSimilarArtistsA,
        similarRecordings: mockSimilarRecordingsA,
        similarReleaseGroups: mockSimilarReleaseGroupsA,
      });
      if (OUTPUT) console.log(result1);
      assert(result1.error);
      assertEquals(
        result1.error,
        "Invalid user ID, source item or amount specified.",
      );

      const result2 = await recommendationConcept.generate({
        userId: "" as ID, // Invalid
        sourceItem: sourceItemAId,
        amount: 5,
        sourceItemMetadata: mockSourceItemMetadataA,
        similarArtists: mockSimilarArtistsA,
        similarRecordings: mockSimilarRecordingsA,
        similarReleaseGroups: mockSimilarReleaseGroupsA,
      });
      if (OUTPUT) console.log(result2);
      assert(result2.error);
      assertEquals(
        result2.error,
        "Invalid user ID, source item or amount specified.",
      );

      const result3 = await recommendationConcept.generate({
        userId: userAId,
        sourceItem: sourceItemAId,
        amount: 0, // Invalid
        sourceItemMetadata: mockSourceItemMetadataA,
        similarArtists: mockSimilarArtistsA,
        similarRecordings: mockSimilarRecordingsA,
        similarReleaseGroups: mockSimilarReleaseGroupsA,
      });
      if (OUTPUT) console.log(result3);
      assert(result3.error);
      assertEquals(
        result3.error,
        "Invalid user ID, source item or amount specified.",
      );
    });

    await t.step(
      "generate action: effects - successfully generate and store recommendations",
      async () => {
        const result = await recommendationConcept.generate({
          userId: userAId,
          sourceItem: sourceItemAId,
          amount: 2,
          sourceItemMetadata: mockSourceItemMetadataA,
          similarArtists: mockSimilarArtistsA,
          similarRecordings: mockSimilarRecordingsA,
          similarReleaseGroups: mockSimilarReleaseGroupsA,
        });
        if (OUTPUT) console.log(result);
        assert(!result.error, `Expected no error, but got: ${result.error}`);
        assert(result.recommendations);
        assertEquals(result.recommendations.length, 2); // Should generate 2 unique recommendations from LLM mock
        // itemName and reasoning should be present
        for (const r of result.recommendations!) {
          assert(typeof r.itemName === "string");
          assert(typeof r.reasoning === "string");
        }

        const storedRecommendations = await recommendationConcept
          .recommendations
          .find({ userId: userAId, item1: sourceItemAId }).toArray();
        assertEquals(storedRecommendations.length, 2);
        // item2 is now a generated ID based on name, not an MBID
        assert(
          storedRecommendations[0].item2.includes("mocked-recommended-artist"),
        );
        assertEquals(
          storedRecommendations[0].itemName,
          "Mocked Recommended Artist 1",
        );
        assertEquals(
          storedRecommendations[1].itemName,
          "Mocked Recommended Artist 2",
        );
        assertEquals(storedRecommendations[0].feedback, null); // No feedback initially
        assert(storedRecommendations[0].createdAt instanceof Date);

        // Store generated IDs for later feedback and queries
        const rec1 = storedRecommendations.find((r) =>
          r.itemName === "Mocked Recommended Artist 1"
        );
        // We only need the first item's generated ID for later feedback tests
        recA1GeneratedId = rec1 ? (rec1.item2 as ID) : null;
      },
    );

    await t.step(
      "generate action: effects - LLM fallback if API key is missing",
      async () => {
        Deno.env.delete("GEMINI_API_KEY"); // Unset for this specific test
        const fallbackConcept = new RecommendationConcept(db); // Re-instantiate to pick up env change

        // LLM should be undefined now
        assert(
          !fallbackConcept["geminiLLM"],
          "GeminiLLM instance should be undefined for fallback test.",
        );

        const result = await fallbackConcept.generate({
          userId: userBId,
          sourceItem: sourceItemBId,
          amount: 3,
          sourceItemMetadata: { name: "Mock Recording" },
          similarArtists: mockSimilarArtistsA, // Use some mock data
          similarRecordings: mockSimilarRecordingsA,
          similarReleaseGroups: mockSimilarReleaseGroupsA,
        });
        if (OUTPUT) console.log(result);
        assert(!result.error, `Expected no error, but got: ${result.error}`);
        assert(result.recommendations);
        assertEquals(result.recommendations.length, 3); // Should generate 3 from fallback logic
        for (const r of result.recommendations!) {
          assert(typeof r.itemName === "string");
          assert(typeof r.reasoning === "string");
        }

        const storedRecommendations = await fallbackConcept.recommendations
          .find({
            userId: userBId,
            item1: sourceItemBId,
          }).toArray();
        assertEquals(storedRecommendations.length, 3);
        // Verify items are from the `mockSimilar*A` data, sorted by score descending.
        // item2 is now a generated ID based on name, not an MBID
        assertEquals(storedRecommendations[0].itemName, "A Night at the Opera"); // release-group, score: 92
        assertEquals(storedRecommendations[1].itemName, "The Rolling Stones"); // artist, score: 90
        assertEquals(storedRecommendations[2].itemName, "Bohemian Rhapsody"); // recording, score: 88
        assert(
          storedRecommendations[0].reasoning.includes("LLM not available"),
        );
      },
    );

    await t.step(
      "generate action: should not recommend the source item or items with existing feedback",
      async () => {
        // First, provide negative feedback for the previously recommended "Mocked Recommended Artist 1" using its generated ID
        if (!recA1GeneratedId) {
          const rec = await recommendationConcept.recommendations.findOne({
            userId: userAId,
            item1: sourceItemAId,
            itemName: "Mocked Recommended Artist 1",
          });
          recA1GeneratedId = rec ? (rec.item2 as ID) : null;
        }
        if (recA1GeneratedId) {
          await recommendationConcept.provideFeedback({
            userId: userAId,
            recommendedItem: recA1GeneratedId,
            feedback: false,
          });
        }

        // Mock LLM to include source item name in output (should be filtered out)
        GeminiLLM.prototype.executeLLM = () =>
          Promise.resolve(JSON.stringify([
            {
              name: "The Beatles",
              reasoning: "It's the source!",
              confidence: 1.0,
            },
            {
              name: "Mocked Recommended Artist 1",
              reasoning: "Previously recommended.",
              confidence: 0.95,
            },
            {
              name: "New Recommended Artist X",
              reasoning: "Good one.",
              confidence: 0.90,
            },
            {
              name: "New Recommended Artist Y",
              reasoning: "Another good one.",
              confidence: 0.85,
            },
          ]));

        const result = await recommendationConcept.generate({
          userId: userAId,
          sourceItem: sourceItemAId,
          amount: 2,
          sourceItemMetadata: mockSourceItemMetadataA,
          similarArtists: mockSimilarArtistsA,
          similarRecordings: mockSimilarRecordingsA,
          similarReleaseGroups: mockSimilarReleaseGroupsA,
        });
        if (OUTPUT) console.log(result);
        assert(!result.error);
        assert(result.recommendations);
        assertEquals(result.recommendations.length, 2);
        // Should not recommend source item or items with existing feedback
        assertEquals(
          result.recommendations[0].itemName,
          "New Recommended Artist X",
        );
        assertEquals(
          result.recommendations[1].itemName,
          "New Recommended Artist Y",
        );
        assert(
          result.recommendations[0].item2.includes("new-recommended-artist-x"),
        );
        assert(
          result.recommendations[1].item2.includes("new-recommended-artist-y"),
        );

        // Restore original mock
        GeminiLLM.prototype.executeLLM = () =>
          Promise.resolve(mockLLMSuccessResponse);
      },
    );

    await t.step(
      "getRecommendations action: requires - invalid parameters",
      async () => {
        const result1 = await recommendationConcept.getRecommendations({
          userId: userAId,
          item: "" as ID,
          amount: 1,
        });
        if (OUTPUT) console.log(result1);
        assert(result1.error);
        assertEquals(
          result1.error,
          "Invalid user ID, item or amount specified.",
        );

        const result2 = await recommendationConcept.getRecommendations({
          userId: "" as ID,
          item: sourceItemAId,
          amount: 1,
        });
        if (OUTPUT) console.log(result2);
        assert(result2.error);
        assertEquals(
          result2.error,
          "Invalid user ID, item or amount specified.",
        );

        const result3 = await recommendationConcept.getRecommendations({
          userId: userAId,
          item: sourceItemAId,
          amount: 0,
        });
        if (OUTPUT) console.log(result3);
        assert(result3.error);
        assertEquals(
          result3.error,
          "Invalid user ID, item or amount specified.",
        );
      },
    );

    await t.step(
      "getRecommendations action: effects - retrieve and prioritize recommendations",
      async () => {
        // Use an isolated user and source item to avoid interference from previous steps
        await recommendationConcept.recommendations.deleteMany({
          userId: userCId,
        });

        // Insert controlled recommendations with known feedback and confidence
        await recommendationConcept.recommendations.insertMany([
          {
            _id: freshID(),
            userId: userCId,
            item1: sourceItemCId,
            item2: ("rec-c-pos-high" as ID),
            itemName: "C Item High Positive",
            reasoning: "rec2",
            confidence: 0.92,
            feedback: true,
            createdAt: new Date(Date.now() - 3000),
          },
          {
            _id: freshID(),
            userId: userCId,
            item1: sourceItemCId,
            item2: ("rec-c-pos-low" as ID),
            itemName: "C Item Low Positive",
            reasoning: "rec4",
            confidence: 0.7,
            feedback: true,
            createdAt: new Date(Date.now() - 2000),
          },
          {
            _id: freshID(),
            userId: userCId,
            item1: sourceItemCId,
            item2: ("rec-c-neutral" as ID),
            itemName: "C Item Neutral",
            reasoning: "rec5",
            confidence: 0.6,
            feedback: null,
            createdAt: new Date(Date.now() - 1000),
          },
          {
            _id: freshID(),
            userId: userCId,
            item1: sourceItemCId,
            item2: ("rec-c-negative" as ID),
            itemName: "C Item Negative",
            reasoning: "rec6",
            confidence: 0.95,
            feedback: false,
            createdAt: new Date(Date.now() - 500),
          },
        ]);

        const result = await recommendationConcept.getRecommendations({
          userId: userCId,
          item: sourceItemCId,
          amount: 3,
        });
        if (OUTPUT) console.log(result);
        assert(!result.error);
        assert(result.itemsWithReasoning);
        assertEquals(result.itemsWithReasoning!.length, 3);

        // Expect order: Positively feedbacked (rec2, rec4), then no feedback (rec5). rec6 (negative) should be excluded.
        const iw = result.itemsWithReasoning!;
        assertEquals(iw[0].reasoning, "rec2"); // Higher confidence positive
        assertEquals(iw[1].reasoning, "rec4"); // Lower confidence positive
        assertEquals(iw[2].reasoning, "rec5"); // No feedback

        // Verify structure: each entry has item, itemName, reasoning, and confidence
        for (const entry of iw) {
          assert(typeof entry.item === "string");
          assert(typeof entry.itemName === "string");
          assert(typeof entry.reasoning === "string");
          assert(typeof entry.confidence === "number");
          assert(entry.confidence >= 0 && entry.confidence <= 1);
        }

        // Verify rec6 (negative feedback) is not included by checking reasoning
        const reasonings = iw.map((e) => e.reasoning);
        assert(!reasonings.includes("rec6")); // Negatively feedbacked item is excluded
      },
    );

    await t.step(
      "getRecommendations action: effects - filter by feedbacked parameter",
      async () => {
        // Test with feedbacked=false: should only return items with NO feedback
        const resultNoFeedback = await recommendationConcept.getRecommendations(
          {
            userId: userCId,
            item: sourceItemCId,
            amount: 5,
            feedbacked: false,
          },
        );
        if (OUTPUT) console.log("No feedback result:", resultNoFeedback);
        assert(!resultNoFeedback.error);
        assert(resultNoFeedback.itemsWithReasoning);
        assertEquals(resultNoFeedback.itemsWithReasoning!.length, 1); // Only rec5 has no feedback
        assertEquals(resultNoFeedback.itemsWithReasoning![0].reasoning, "rec5");

        // Test with feedbacked=true (default): should return items with positive or no feedback
        const resultWithFeedback = await recommendationConcept
          .getRecommendations(
            {
              userId: userCId,
              item: sourceItemCId,
              amount: 5,
              feedbacked: true,
            },
          );
        if (OUTPUT) console.log("With feedback result:", resultWithFeedback);
        assert(!resultWithFeedback.error);
        assert(resultWithFeedback.itemsWithReasoning);
        assertEquals(resultWithFeedback.itemsWithReasoning!.length, 3); // rec2, rec4, rec5 (excludes negative)
        const reasonings = resultWithFeedback.itemsWithReasoning!.map((e) =>
          e.reasoning
        );
        assert(reasonings.includes("rec2"));
        assert(reasonings.includes("rec4"));
        assert(reasonings.includes("rec5"));
        assert(!reasonings.includes("rec6")); // Negative feedback excluded
      },
    );

    await t.step(
      "getRecommendations action: effects - filter by ignore parameter",
      async () => {
        // Test with ignore list: should exclude items in the ignore list
        const resultWithIgnore = await recommendationConcept.getRecommendations({
          userId: userCId,
          item: sourceItemCId,
          amount: 5,
          ignore: ["rec-c-pos-low" as ID, "rec-c-negative" as ID],
        });
        if (OUTPUT) console.log("With ignore result:", resultWithIgnore);
        assert(!resultWithIgnore.error);
        assert(resultWithIgnore.itemsWithReasoning);
        // Should return rec-c-pos-high and rec-c-neutral (rec-c-pos-low and rec-c-negative ignored)
        assertEquals(resultWithIgnore.itemsWithReasoning!.length, 2);
        const reasonings = resultWithIgnore.itemsWithReasoning!.map((e) =>
          e.reasoning
        );
        assert(reasonings.includes("rec2")); // rec-c-pos-high
        assert(reasonings.includes("rec5")); // rec-c-neutral
        assert(!reasonings.includes("rec4")); // rec-c-pos-low ignored
        assert(!reasonings.includes("rec6")); // rec-c-negative ignored

        // Test with ignore list combined with feedbacked=false
        const resultIgnoreNoFeedback = await recommendationConcept.getRecommendations(
          {
            userId: userCId,
            item: sourceItemCId,
            amount: 5,
            feedbacked: false,
            ignore: ["rec-c-neutral" as ID],
          },
        );
        if (OUTPUT) console.log("Ignore + no feedback result:", resultIgnoreNoFeedback);
        assert(!resultIgnoreNoFeedback.error);
        assert(resultIgnoreNoFeedback.itemsWithReasoning);
        assertEquals(resultIgnoreNoFeedback.itemsWithReasoning!.length, 0); // rec-c-neutral ignored, no other items have no feedback

        // Test with empty ignore list: should behave like normal
        const resultEmptyIgnore = await recommendationConcept.getRecommendations({
          userId: userCId,
          item: sourceItemCId,
          amount: 5,
          ignore: [],
        });
        if (OUTPUT) console.log("Empty ignore result:", resultEmptyIgnore);
        assert(!resultEmptyIgnore.error);
        assert(resultEmptyIgnore.itemsWithReasoning);
        assertEquals(resultEmptyIgnore.itemsWithReasoning!.length, 3); // Same as default behavior
      },
    );

    await t.step(
      "provideFeedback action: requires - invalid parameters",
      async () => {
        const result1 = await recommendationConcept.provideFeedback({
          userId: userAId,
          recommendedItem: "" as ID,
          feedback: true,
        });
        if (OUTPUT) console.log(result1);
        assert(result1.error);
        assertEquals(
          result1.error,
          "User ID or recommended item not specified.",
        );

        const result2 = await recommendationConcept.provideFeedback({
          userId: "" as ID,
          recommendedItem: recommendedItem1Id,
          feedback: true,
        });
        if (OUTPUT) console.log(result2);
        assert(result2.error);
        assertEquals(
          result2.error,
          "User ID or recommended item not specified.",
        );
      },
    );

    await t.step(
      "provideFeedback action: effects - update feedback and timestamp for existing recommendation",
      async () => {
        // Ensure recommendedItem1Id exists from a previous test and has negative feedback
        // First, let's make sure an instance of recommendedItem1Id exists for userAId
        // (It was generated and then given negative feedback in a prior test)
        if (!recA1GeneratedId) {
          const rec = await recommendationConcept.recommendations.findOne({
            userId: userAId,
            item1: sourceItemAId,
            itemName: "Mocked Recommended Artist 1",
          });
          recA1GeneratedId = rec ? (rec.item2 as ID) : null;
        }
        const preUpdate = recA1GeneratedId
          ? await recommendationConcept.recommendations.findOne({
            userId: userAId,
            item2: recA1GeneratedId,
          })
          : null;
        assert(
          preUpdate,
          "Recommendation for item1Id should exist before update.",
        );
        assertEquals(preUpdate.feedback, false);

        const feedbackTimestamp = new Date();
        await new Promise((resolve) => setTimeout(resolve, 10)); // Ensure timestamp difference

        const result = await recommendationConcept.provideFeedback({
          userId: userAId,
          recommendedItem: recA1GeneratedId as ID,
          feedback: true, // Change to positive
        });

        assert(
          !("error" in result),
          `Expected no error, but got: ${result.error}`,
        );

        const updatedRec = await recommendationConcept.recommendations.findOne({
          userId: userAId,
          item2: recA1GeneratedId as ID,
        });
        assert(updatedRec);
        assertEquals(updatedRec.feedback, true);
        assert(updatedRec.createdAt.getTime() >= feedbackTimestamp.getTime()); // Timestamp should be updated
      },
    );

    await t.step(
      "provideFeedback action: effects - handle non-existent recommendation gracefully",
      async () => {
        const nonExistentItem: ID = "non-existent-rec-item" as ID;
        const result = await recommendationConcept.provideFeedback({
          userId: userAId,
          recommendedItem: nonExistentItem,
          feedback: true,
        });
        if (OUTPUT) console.log(result);
        assert(result.error);
        assertEquals(
          result.error,
          "No existing recommendation found for the provided item and user.",
        );
      },
    );

    await t.step(
      "deleteRecommendation action: requires - invalid parameters",
      async () => {
        const result = await recommendationConcept.deleteRecommendation({
          recommendationId: "" as ID,
        });
        if (OUTPUT) console.log(result);
        assert(result.error);
        assertEquals(result.error, "Recommendation ID not specified.");
      },
    );

    await t.step(
      "deleteRecommendation action: effects - delete a specific recommendation",
      async () => {
        // Generate a recommendation first
        await recommendationConcept.recommendations.deleteMany({
          userId: userAId,
        });
        const genResult = await recommendationConcept.generate({
          userId: userAId,
          sourceItem: sourceItemAId,
          amount: 2,
          sourceItemMetadata: mockSourceItemMetadataA,
          similarArtists: mockSimilarArtistsA,
          similarRecordings: mockSimilarRecordingsA,
          similarReleaseGroups: mockSimilarReleaseGroupsA,
        });
        assert(
          genResult.recommendations && genResult.recommendations.length >= 1,
        );
        const recToDelete = genResult.recommendations[0];
        const recId = recToDelete._id;

        // Verify it exists
        const beforeCount = await recommendationConcept.recommendations
          .countDocuments({
            _id: recId,
          });
        assertEquals(beforeCount, 1);

        // Delete it
        const deleteResult = await recommendationConcept.deleteRecommendation({
          recommendationId: recId,
        });
        if (OUTPUT) console.log(deleteResult);
        assert(!("error" in deleteResult));

        // Verify it's gone
        const afterCount = await recommendationConcept.recommendations
          .countDocuments({
            _id: recId,
          });
        assertEquals(afterCount, 0);

        // Other recommendations should still exist
        const totalCount = await recommendationConcept.recommendations
          .countDocuments({
            userId: userAId,
          });
        assertEquals(totalCount, 1); // One remaining from the 2 generated
      },
    );

    await t.step(
      "deleteRecommendation action: effects - handle non-existent recommendation",
      async () => {
        const nonExistentId = freshID();
        const result = await recommendationConcept.deleteRecommendation({
          recommendationId: nonExistentId,
        });
        if (OUTPUT) console.log(result);
        assert(result.error);
        assertEquals(
          result.error,
          "No recommendation found with the provided ID.",
        );
      },
    );

    await t.step(
      "clearRecommendations action: effects - clear recommendations for a specific user",
      async () => {
        // User B has recommendations from the fallback test
        const userBRecsBefore = await recommendationConcept.recommendations
          .countDocuments({ userId: userBId });
        assert(userBRecsBefore > 0);

        const result = await recommendationConcept.clearRecommendations({
          userId: userBId,
        });
        if (OUTPUT) console.log(result);
        assert(!("error" in result));

        const userBRecsAfter = await recommendationConcept.recommendations
          .countDocuments({ userId: userBId });
        assertEquals(userBRecsAfter, 0);

        // User A's recommendations should still exist
        const userARecs = await recommendationConcept.recommendations
          .countDocuments({ userId: userAId });
        assert(userARecs > 0);
      },
    );

    await t.step(
      "clearRecommendations action: effects - clear all recommendations if no user ID is provided",
      async () => {
        const allRecsBefore = await recommendationConcept.recommendations
          .countDocuments({});
        assert(allRecsBefore > 0);

        const result = await recommendationConcept.clearRecommendations(); // No userId
        if (OUTPUT) console.log(result);
        assert(!("error" in result));

        const allRecsAfter = await recommendationConcept.recommendations
          .countDocuments({});
        assertEquals(allRecsAfter, 0);
      },
    );

    await t.step(
      "getFeedbackHistory query: effects - retrieve feedback history for a user",
      async () => {
        // Clean up database to ensure a fresh state
        await recommendationConcept.recommendations.deleteMany({});

        // Re-generate some recommendations and provide feedback for userAId
        const regen = await recommendationConcept.generate({
          userId: userAId,
          sourceItem: sourceItemAId,
          amount: 2, // Generate 2 recommendations so we can provide feedback on both
          sourceItemMetadata: mockSourceItemMetadataA,
          similarArtists: mockSimilarArtistsA,
          similarRecordings: mockSimilarRecordingsA,
          similarReleaseGroups: mockSimilarReleaseGroupsA,
        });
        assert(regen.recommendations && regen.recommendations.length >= 2);
        const r1 = regen.recommendations.find((r) =>
          r.itemName === "Mocked Recommended Artist 1"
        );
        const r2 = regen.recommendations.find((r) =>
          r.itemName === "Mocked Recommended Artist 2"
        );
        const r1Id = (r1?.item2 || regen.recommendations[0].item2) as ID;
        const r2Id = (r2?.item2 || regen.recommendations[1].item2) as ID;
        await recommendationConcept.provideFeedback({
          userId: userAId,
          recommendedItem: r1Id,
          feedback: true,
        });
        await recommendationConcept.provideFeedback({
          userId: userAId,
          recommendedItem: r2Id,
          feedback: false,
        });

        const result = await recommendationConcept.getFeedbackHistory({
          userId: userAId,
        });
        if (OUTPUT) console.log(result);
        assert(!result.error);
        assert(result.history);
        assertEquals(result.history.length, 2); // Only items with feedback

        const positiveFeedback = result.history.find((h) =>
          h.feedback === true
        );
        assert(positiveFeedback);
        assertEquals(positiveFeedback.feedback, true);

        const negativeFeedback = result.history.find((h) =>
          h.feedback === false
        );
        assert(negativeFeedback);
        assertEquals(negativeFeedback.feedback, false);

        assert(positiveFeedback.reasoning.length > 0);
        assertEquals(positiveFeedback.sourceItem, sourceItemAId);
      },
    );

    await t.step(
      "getFeedbackHistory query: effects - filter feedback by source item",
      async () => {
        // Clean up database to ensure a fresh state
        await recommendationConcept.recommendations.deleteMany({});

        // Generate recommendations for sourceItemAId and provide feedback
        const regenA = await recommendationConcept.generate({
          userId: userAId,
          sourceItem: sourceItemAId,
          amount: 2,
          sourceItemMetadata: mockSourceItemMetadataA,
          similarArtists: mockSimilarArtistsA,
          similarRecordings: mockSimilarRecordingsA,
          similarReleaseGroups: mockSimilarReleaseGroupsA,
        });
        assert(regenA.recommendations && regenA.recommendations.length >= 1);
        await recommendationConcept.provideFeedback({
          userId: userAId,
          recommendedItem: regenA.recommendations[0].item2,
          feedback: true,
        });

        // Generate recommendations for a different source item and provide feedback
        const regenB = await recommendationConcept.generate({
          userId: userAId,
          sourceItem: sourceItemBId,
          amount: 2,
          sourceItemMetadata: { id: sourceItemBId, name: "Different Source" },
          similarArtists: mockSimilarArtistsA,
          similarRecordings: mockSimilarRecordingsA,
          similarReleaseGroups: mockSimilarReleaseGroupsA,
        });
        assert(regenB.recommendations && regenB.recommendations.length >= 1);
        await recommendationConcept.provideFeedback({
          userId: userAId,
          recommendedItem: regenB.recommendations[0].item2,
          feedback: false,
        });

        // Get feedback for all source items - should return 2
        const allFeedback = await recommendationConcept.getFeedbackHistory({
          userId: userAId,
        });
        if (OUTPUT) console.log("All feedback:", allFeedback);
        assert(!allFeedback.error);
        assert(allFeedback.history);
        assertEquals(allFeedback.history.length, 2);

        // Get feedback for only sourceItemAId - should return 1
        const feedbackA = await recommendationConcept.getFeedbackHistory({
          userId: userAId,
          sourceItem: sourceItemAId,
        });
        if (OUTPUT) console.log("Feedback for sourceItemA:", feedbackA);
        assert(!feedbackA.error);
        assert(feedbackA.history);
        assertEquals(feedbackA.history.length, 1);
        assertEquals(feedbackA.history[0].sourceItem, sourceItemAId);
        assertEquals(feedbackA.history[0].feedback, true);

        // Get feedback for only sourceItemBId - should return 1
        const feedbackB = await recommendationConcept.getFeedbackHistory({
          userId: userAId,
          sourceItem: sourceItemBId,
        });
        if (OUTPUT) console.log("Feedback for sourceItemB:", feedbackB);
        assert(!feedbackB.error);
        assert(feedbackB.history);
        assertEquals(feedbackB.history.length, 1);
        assertEquals(feedbackB.history[0].sourceItem, sourceItemBId);
        assertEquals(feedbackB.history[0].feedback, false);
      },
    );
  } finally {
    await client.close();
  }
});

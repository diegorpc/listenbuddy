[@implementation](implementation.md)

[@testing-concepts](../../background/testing-concepts.md)

# test: Recommendation. 
# response:

# file: src/Recommendation/Recommendation.test.ts

```typescript
import { assert, assertEquals, assertNotEquals } from "jsr:@std/assert";
import { Collection, Db } from "npm:mongodb";
import { testDb } from "@utils/database.ts"; // Utility for test database
import { Empty, ID } from "@utils/types.ts"; // Assumed utility types
import { freshID } from "@utils/database.ts"; // Assumed utility for ID generation
import Recommendation from "./Recommendation.ts"; // The concept to be tested
import { GeminiLLM } from "@utils/geminiLLM.ts"; // Assumed GeminiLLM class

// --- Mocking GeminiLLM ---
// To make tests deterministic and avoid actual API calls, we'll mock the GeminiLLM.
// This approach overrides the prototype method for all instances of GeminiLLM
// within the test process, which is acceptable for Deno.test in a single-threaded
// environment, provided we reset it.
let originalGeminiExecuteLLM: typeof GeminiLLM.prototype.executeLLM;

const OUTPUT = true; // for verbose logging
// A default mock response for the LLM
const mockLLMSuccessResponse = JSON.stringify([
  {
    name: "Mocked Recommended Artist 1",
    mbid: "rec-item-mbid-1" as ID,
    reasoning: "Because of shared genre and user feedback patterns.",
    confidence: 0.95,
  },
  {
    name: "Mocked Recommended Artist 2",
    mbid: "rec-item-mbid-2" as ID,
    reasoning: "Has collaborations with source and positive user history.",
    confidence: 0.88,
  },
  {
    name: "Mocked Recommended Artist 3",
    mbid: "rec-item-mbid-3" as ID,
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
  GeminiLLM.prototype.executeLLM = async (prompt: string): Promise<string> => {
    // Optionally, you could inspect the prompt here for more advanced mocking
    // console.log("LLM Mock received prompt:", prompt);
    return mockLLMSuccessResponse;
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
const sourceItemAId: ID = "mbid-artist-source-A" as ID;
const sourceItemBId: ID = "mbid-recording-source-B" as ID;
const recommendedItem1Id: ID = "rec-item-mbid-1" as ID; // Matches mock LLM output
const recommendedItem2Id: ID = "rec-item-mbid-2" as ID; // Matches mock LLM output
const recommendedItem3Id: ID = "rec-item-mbid-3" as ID; // Matches mock LLM output
const recommendedItem4Id: ID = "rec-item-mbid-4" as ID; // For fallback/manual testing
const recommendedItem5Id: ID = "rec-item-mbid-5" as ID; // For fallback/manual testing
const recommendedItem6Id: ID = "rec-item-mbid-6" as ID; // For fallback/manual testing

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
    genres: ["Rock", "Blues"],
  },
  {
    mbid: recommendedItem4Id,
    name: "Led Zeppelin",
    score: 85,
    genres: ["Hard Rock", "Blues Rock"],
  },
  {
    mbid: recommendedItem5Id,
    name: "Queen",
    score: 80,
    genres: ["Rock", "Glam Rock"],
  },
];

const mockSimilarRecordingsA = [
  {
    mbid: recommendedItem2Id,
    name: "Bohemian Rhapsody",
    score: 88,
    genres: ["Rock", "Opera"],
  },
  {
    mbid: "mbid-rec-song-x" as ID,
    name: "Stairway to Heaven",
    score: 82,
    genres: ["Hard Rock", "Folk Rock"],
  },
];

const mockSimilarReleaseGroupsA = [
  {
    mbid: recommendedItem3Id,
    name: "A Night at the Opera",
    score: 92,
    genres: ["Rock", "Opera"],
  },
  {
    mbid: "mbid-rec-album-y" as ID,
    name: "Led Zeppelin IV",
    score: 87,
    genres: ["Hard Rock", "Folk Rock"],
  },
];

Deno.test("Recommendation Concept", async (t) => {
  const [db, client] = await testDb();
  const recommendationConcept = new Recommendation(db);

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

      const storedRecommendations = await recommendationConcept.recommendations
        .find({ userId: userAId, item1: sourceItemAId }).toArray();
      assertEquals(storedRecommendations.length, 2);
      assertEquals(storedRecommendations[0].item2, recommendedItem1Id);
      assertEquals(storedRecommendations[1].item2, recommendedItem2Id);
      assertEquals(storedRecommendations[0].feedback, null); // No feedback initially
      assert(storedRecommendations[0].createdAt instanceof Date);
    },
  );

  await t.step(
    "generate action: effects - LLM fallback if API key is missing",
    async () => {
      Deno.env.delete("GEMINI_API_KEY"); // Unset for this specific test
      const fallbackConcept = new Recommendation(db); // Re-instantiate to pick up env change

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

      const storedRecommendations = await fallbackConcept.recommendations.find({
        userId: userBId,
        item1: sourceItemBId,
      }).toArray();
      assertEquals(storedRecommendations.length, 3);
      // Verify items are from the `mockSimilar*A` data, sorted by score descending.
      assertEquals(storedRecommendations[0].item2, recommendedItem3Id); // A Night at the Opera (release-group, score: 92)
      assertEquals(storedRecommendations[1].item2, recommendedItem1Id); // The Rolling Stones (artist, score: 90)
      assertEquals(storedRecommendations[2].item2, recommendedItem2Id); // Bohemian Rhapsody (recording, score: 88)
      assert(storedRecommendations[0].reasoning.includes("LLM not available"));
    },
  );

  await t.step(
    "generate action: should not recommend the source item or items with existing feedback",
    async () => {
      // First, provide negative feedback for recommendedItem1Id for userAId
      await recommendationConcept.provideFeedback({
        userId: userAId,
        recommendedItem: recommendedItem1Id,
        feedback: false,
      });

      // Mock LLM to include sourceItemAId and recommendedItem1Id in its hypothetical output
      GeminiLLM.prototype.executeLLM = async () =>
        JSON.stringify([
          {
            name: "The Beatles (Source)",
            mbid: sourceItemAId,
            reasoning: "It's the source!",
            confidence: 1.0,
          },
          {
            name: "Mocked Recommended Artist 1",
            mbid: recommendedItem1Id,
            reasoning: "User disliked this one before.",
            confidence: 0.95,
          },
          {
            name: "New Recommended Artist X",
            mbid: "new-rec-x" as ID,
            reasoning: "Good one.",
            confidence: 0.90,
          },
          {
            name: "New Recommended Artist Y",
            mbid: "new-rec-y" as ID,
            reasoning: "Another good one.",
            confidence: 0.85,
          },
        ]);

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
      assertNotEquals(result.recommendations[0].item2, sourceItemAId);
      assertNotEquals(result.recommendations[0].item2, recommendedItem1Id);
      assertEquals(result.recommendations[0].item2, "new-rec-x" as ID);
      assertEquals(result.recommendations[1].item2, "new-rec-y" as ID);

      // Restore original mock
      GeminiLLM.prototype.executeLLM = async () => mockLLMSuccessResponse;
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
      assertEquals(result1.error, "Invalid user ID, item or amount specified.");

      const result2 = await recommendationConcept.getRecommendations({
        userId: "" as ID,
        item: sourceItemAId,
        amount: 1,
      });
      if (OUTPUT) console.log(result2);
      assert(result2.error);
      assertEquals(result2.error, "Invalid user ID, item or amount specified.");

      const result3 = await recommendationConcept.getRecommendations({
        userId: userAId,
        item: sourceItemAId,
        amount: 0,
      });
      if (OUTPUT) console.log(result3);
      assert(result3.error);
      assertEquals(result3.error, "Invalid user ID, item or amount specified.");
    },
  );

  await t.step(
    "getRecommendations action: effects - retrieve and prioritize recommendations",
    async () => {
      // Clean up any test data from previous tests that might interfere
      await recommendationConcept.recommendations.deleteMany({
        userId: userAId,
        item1: sourceItemAId,
        item2: { $in: ["new-rec-x" as ID, "new-rec-y" as ID] },
      });

      // Add more recommendations for userAId and sourceItemAId
      await recommendationConcept.recommendations.insertMany([
        {
          _id: freshID(),
          userId: userAId,
          item1: sourceItemAId,
          item2: recommendedItem4Id,
          reasoning: "rec4",
          confidence: 0.7,
          feedback: true,
          createdAt: new Date(Date.now() - 1000),
        }, // Positive
        {
          _id: freshID(),
          userId: userAId,
          item1: sourceItemAId,
          item2: recommendedItem5Id,
          reasoning: "rec5",
          confidence: 0.6,
          feedback: null,
          createdAt: new Date(Date.now() - 2000),
        }, // No feedback
        {
          _id: freshID(),
          userId: userAId,
          item1: sourceItemAId,
          item2: recommendedItem6Id,
          reasoning: "rec6",
          confidence: 0.9,
          feedback: false,
          createdAt: new Date(Date.now() - 3000),
        }, // Negative
      ]);

      // Update existing recommendation for recommendedItem2Id (initially from LLM) to positive
      await recommendationConcept.provideFeedback({
        userId: userAId,
        recommendedItem: recommendedItem2Id,
        feedback: true,
      });

      const result = await recommendationConcept.getRecommendations({
        userId: userAId,
        item: sourceItemAId,
        amount: 3,
      });
      if (OUTPUT) console.log(result);
      assert(!result.error);
      assert(result.items);
      assertEquals(result.items.length, 3);

      // Expect order: Positively feedbacked (rec2, rec4), then no feedback (rec5). rec6 (negative) should be excluded.
      assertEquals(result.items[0], recommendedItem2Id); // Higher confidence positive
      assertEquals(result.items[1], recommendedItem4Id); // Lower confidence positive
      assertEquals(result.items[2], recommendedItem5Id); // No feedback
      assert(!result.items.includes(recommendedItem6Id)); // Negatively feedbacked item is excluded
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
      assertEquals(result1.error, "User ID or recommended item not specified.");

      const result2 = await recommendationConcept.provideFeedback({
        userId: "" as ID,
        recommendedItem: recommendedItem1Id,
        feedback: true,
      });
      if (OUTPUT) console.log(result2);
      assert(result2.error);
      assertEquals(result2.error, "User ID or recommended item not specified.");
    },
  );

  await t.step(
    "provideFeedback action: effects - update feedback and timestamp for existing recommendation",
    async () => {
      // Ensure recommendedItem1Id exists from a previous test and has negative feedback
      // First, let's make sure an instance of recommendedItem1Id exists for userAId
      // (It was generated and then given negative feedback in a prior test)
      let preUpdate = await recommendationConcept.recommendations.findOne({
        userId: userAId,
        item2: recommendedItem1Id,
      });
      assert(
        preUpdate,
        "Recommendation for item1Id should exist before update.",
      );
      assertEquals(preUpdate.feedback, false);

      const feedbackTimestamp = new Date();
      await new Promise((resolve) => setTimeout(resolve, 10)); // Ensure timestamp difference

      const result = await recommendationConcept.provideFeedback({
        userId: userAId,
        recommendedItem: recommendedItem1Id,
        feedback: true, // Change to positive
      });

      assert(
        !("error" in result),
        `Expected no error, but got: ${result.error}`,
      );

      const updatedRec = await recommendationConcept.recommendations.findOne({
        userId: userAId,
        item2: recommendedItem1Id,
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
    "_getFeedbackHistory query: effects - retrieve feedback history for a user",
    async () => {
      // Clean up database to ensure a fresh state
      await recommendationConcept.recommendations.deleteMany({});

      // Re-generate some recommendations and provide feedback for userAId
      await recommendationConcept.generate({
        userId: userAId,
        sourceItem: sourceItemAId,
        amount: 2, // Generate 2 recommendations so we can provide feedback on both
        sourceItemMetadata: mockSourceItemMetadataA,
        similarArtists: mockSimilarArtistsA,
        similarRecordings: mockSimilarRecordingsA,
        similarReleaseGroups: mockSimilarReleaseGroupsA,
      });
      await recommendationConcept.provideFeedback({
        userId: userAId,
        recommendedItem: recommendedItem1Id,
        feedback: true,
      });
      await recommendationConcept.provideFeedback({
        userId: userAId,
        recommendedItem: recommendedItem2Id,
        feedback: false,
      });

      const result = await recommendationConcept._getFeedbackHistory({
        userId: userAId,
      });
      if (OUTPUT) console.log(result);
      assert(!result.error);
      assert(result.history);
      assertEquals(result.history.length, 2); // Only items with feedback

      const positiveFeedback = result.history.find((h) =>
        h.item === recommendedItem1Id
      );
      assert(positiveFeedback);
      assertEquals(positiveFeedback.feedback, true);

      const negativeFeedback = result.history.find((h) =>
        h.item === recommendedItem2Id
      );
      assert(negativeFeedback);
      assertEquals(negativeFeedback.feedback, false);

      assert(positiveFeedback.reasoning.length > 0);
      assertEquals(positiveFeedback.sourceItem, sourceItemAId);
    },
  );

  await client.close();
});
```
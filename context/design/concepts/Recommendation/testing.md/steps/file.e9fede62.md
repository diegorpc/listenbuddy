---
timestamp: 'Sat Oct 18 2025 22:43:52 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251018_224352.6bc25818.md]]'
content_id: e9fede62e36981ad76c879b7aafbd7658645b22afc04150f23a83bc12a50a467
---

# file: src/Recommendation/Recommendation.test.ts

```typescript
import { assertEquals, assertNotEquals, assert } from "jsr:@std/assert";
import { Collection, Db } from "npm:mongodb";
import { testDb } from "@utils/database.ts"; // Utility for test database
import { ID, Empty } from "@utils/types.ts"; // Assumed utility types
import { freshID } from "@utils/database.ts"; // Assumed utility for ID generation
import RecommendationConcept from "./Recommendation.ts"; // The concept to be tested
import { GeminiLLM } from "@utils/geminiLLM.ts"; // Assumed GeminiLLM class

// --- Mocking GeminiLLM ---
// To make tests deterministic and avoid actual API calls, we'll mock the GeminiLLM.
// This approach overrides the prototype method for all instances of GeminiLLM
// within the test process, which is acceptable for Deno.test in a single-threaded
// environment, provided we reset it.
let originalGeminiExecuteLLM: typeof GeminiLLM.prototype.executeLLM;

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
  tags: [{ name: "classic", count: 50 }, { name: "british invasion", count: 40 }],
};

const mockSimilarArtistsA = [
  { mbid: recommendedItem1Id, name: "The Rolling Stones", score: 90, genres: ["Rock", "Blues"] },
  { mbid: recommendedItem4Id, name: "Led Zeppelin", score: 85, genres: ["Hard Rock", "Blues Rock"] },
  { mbid: recommendedItem5Id, name: "Queen", score: 80, genres: ["Rock", "Glam Rock"] },
];

const mockSimilarRecordingsA = [
  { mbid: recommendedItem2Id, name: "Bohemian Rhapsody", score: 88, genres: ["Rock", "Opera"] },
  { mbid: "mbid-rec-song-x" as ID, name: "Stairway to Heaven", score: 82, genres: ["Hard Rock", "Folk Rock"] },
];

const mockSimilarReleaseGroupsA = [
  { mbid: recommendedItem3Id, name: "A Night at the Opera", score: 92, genres: ["Rock", "Opera"] },
  { mbid: "mbid-rec-album-y" as ID, name: "Led Zeppelin IV", score: 87, genres: ["Hard Rock", "Folk Rock"] },
];

Deno.test("Recommendation Concept", async (t) => {
  const [db, client] = await testDb();
  const recommendationConcept = new RecommendationConcept(db);

  await t.step("should create a RecommendationConcept instance", () => {
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
    assert(result1.error);
    assertEquals(result1.error, "Invalid user ID, source item or amount specified.");

    const result2 = await recommendationConcept.generate({
      userId: "" as ID, // Invalid
      sourceItem: sourceItemAId,
      amount: 5,
      sourceItemMetadata: mockSourceItemMetadataA,
      similarArtists: mockSimilarArtistsA,
      similarRecordings: mockSimilarRecordingsA,
      similarReleaseGroups: mockSimilarReleaseGroupsA,
    });
    assert(result2.error);
    assertEquals(result2.error, "Invalid user ID, source item or amount specified.");

    const result3 = await recommendationConcept.generate({
      userId: userAId,
      sourceItem: sourceItemAId,
      amount: 0, // Invalid
      sourceItemMetadata: mockSourceItemMetadataA,
      similarArtists: mockSimilarArtistsA,
      similarRecordings: mockSimilarRecordingsA,
      similarReleaseGroups: mockSimilarReleaseGroupsA,
    });
    assert(result3.error);
    assertEquals(result3.error, "Invalid user ID, source item or amount specified.");
  });

  await t.step("generate action: effects - successfully generate and store recommendations", async () => {
    const result = await recommendationConcept.generate({
      userId: userAId,
      sourceItem: sourceItemAId,
      amount: 2,
      sourceItemMetadata: mockSourceItemMetadataA,
      similarArtists: mockSimilarArtistsA,
      similarRecordings: mockSimilarRecordingsA,
      similarReleaseGroups: mockSimilarReleaseGroupsA,
    });

    assert(!result.error, `Expected no error, but got: ${result.error}`);
    assert(result.recommendations);
    assertEquals(result.recommendations.length, 2); // Should generate 2 unique recommendations from LLM mock

    const storedRecommendations = await recommendationConcept.recommendations.find({ userId: userAId, item1: sourceItemAId }).toArray();
    assertEquals(storedRecommendations.length, 2);
    assertEquals(storedRecommendations[0].item2, recommendedItem1Id);
    assertEquals(storedRecommendations[1].item2, recommendedItem2Id);
    assertEquals(storedRecommendations[0].feedback, null); // No feedback initially
    assert(storedRecommendations[0].createdAt instanceof Date);
  });

  await t.step("generate action: effects - LLM fallback if API key is missing", async () => {
    Deno.env.delete("GEMINI_API_KEY"); // Unset for this specific test
    const fallbackConcept = new RecommendationConcept(db); // Re-instantiate to pick up env change

    // LLM should be undefined now
    assert(!fallbackConcept["geminiLLM"], "GeminiLLM instance should be undefined for fallback test.");

    const result = await fallbackConcept.generate({
      userId: userBId,
      sourceItem: sourceItemBId,
      amount: 3,
      sourceItemMetadata: { name: "Mock Recording" },
      similarArtists: mockSimilarArtistsA, // Use some mock data
      similarRecordings: mockSimilarRecordingsA,
      similarReleaseGroups: mockSimilarSimilarReleaseGroupsA,
    });

    assert(!result.error, `Expected no error, but got: ${result.error}`);
    assert(result.recommendations);
    assertEquals(result.recommendations.length, 3); // Should generate 3 from fallback logic

    const storedRecommendations = await fallbackConcept.recommendations.find({ userId: userBId, item1: sourceItemBId }).toArray();
    assertEquals(storedRecommendations.length, 3);
    // Verify items are from the `mockSimilar*A` data, sorted by score.
    assertEquals(storedRecommendations[0].item2, recommendedItem1Id); // The Rolling Stones (artist)
    assertEquals(storedRecommendations[1].item2, recommendedItem3Id); // A Night at the Opera (release-group)
    assertEquals(storedRecommendations[2].item2, recommendedItem2Id); // Bohemian Rhapsody (recording)
    assert(storedRecommendations[0].reasoning.includes("LLM not available"));
  });

  await t.step("generate action: should not recommend the source item or items with existing feedback", async () => {
    // First, provide negative feedback for recommendedItem1Id for userAId
    await recommendationConcept.provideFeedback({
      userId: userAId,
      recommendedItem: recommendedItem1Id,
      feedback: false,
    });

    // Mock LLM to include sourceItemAId and recommendedItem1Id in its hypothetical output
    GeminiLLM.prototype.executeLLM = async () => JSON.stringify([
      { name: "The Beatles (Source)", mbid: sourceItemAId, reasoning: "It's the source!", confidence: 1.0 },
      { name: "Mocked Recommended Artist 1", mbid: recommendedItem1Id, reasoning: "User disliked this one before.", confidence: 0.95 },
      { name: "New Recommended Artist X", mbid: "new-rec-x" as ID, reasoning: "Good one.", confidence: 0.90 },
      { name: "New Recommended Artist Y", mbid: "new-rec-y" as ID, reasoning: "Another good one.", confidence: 0.85 },
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

    assert(!result.error);
    assert(result.recommendations);
    assertEquals(result.recommendations.length, 2);
    assertNotEquals(result.recommendations[0].item2, sourceItemAId);
    assertNotEquals(result.recommendations[0].item2, recommendedItem1Id);
    assertEquals(result.recommendations[0].item2, "new-rec-x" as ID);
    assertEquals(result.recommendations[1].item2, "new-rec-y" as ID);

    // Restore original mock
    GeminiLLM.prototype.executeLLM = async () => mockLLMSuccessResponse;
  });

  await t.step("getRecommendations action: requires - invalid parameters", async () => {
    const result1 = await recommendationConcept.getRecommendations({ userId: userAId, item: "" as ID, amount: 1 });
    assert(result1.error);
    assertEquals(result1.error, "Invalid user ID, item or amount specified.");

    const result2 = await recommendationConcept.getRecommendations({ userId: "" as ID, item: sourceItemAId, amount: 1 });
    assert(result2.error);
    assertEquals(result2.error, "Invalid user ID, item or amount specified.");

    const result3 = await recommendationConcept.getRecommendations({ userId: userAId, item: sourceItemAId, amount: 0 });
    assert(result3.error);
    assertEquals(result3.error, "Invalid user ID, item or amount specified.");
  });

  await t.step("getRecommendations action: effects - retrieve and prioritize recommendations", async () => {
    // Add more recommendations for userAId and sourceItemAId
    await recommendationConcept.recommendations.insertMany([
      { _id: freshID(), userId: userAId, item1: sourceItemAId, item2: recommendedItem4Id, reasoning: "rec4", confidence: 0.7, feedback: true, createdAt: new Date(Date.now() - 1000) }, // Positive
      { _id: freshID(), userId: userAId, item1: sourceItemAId, item2: recommendedItem5Id, reasoning: "rec5", confidence: 0.6, feedback: null, createdAt: new Date(Date.now() - 2000) }, // No feedback
      { _id: freshID(), userId: userAId, item1: sourceItemAId, item2: recommendedItem6Id, reasoning: "rec6", confidence: 0.9, feedback: false, createdAt: new Date(Date.now() - 3000) }, // Negative
    ]);

    // Update existing recommendation for recommendedItem2Id (initially from LLM) to positive
    await recommendationConcept.provideFeedback({ userId: userAId, recommendedItem: recommendedItem2Id, feedback: true });

    const result = await recommendationConcept.getRecommendations({ userId: userAId, item: sourceItemAId, amount: 3 });

    assert(!result.error);
    assert(result.items);
    assertEquals(result.items.length, 3);

    // Expect order: Positively feedbacked (rec2, rec4), then no feedback (rec5). rec6 (negative) should be excluded.
    assertEquals(result.items[0], recommendedItem2Id); // Higher confidence positive
    assertEquals(result.items[1], recommendedItem4Id); // Lower confidence positive
    assertEquals(result.items[2], recommendedItem5Id); // No feedback
    assert(!result.items.includes(recommendedItem6Id)); // Negatively feedbacked item is excluded
  });

  await t.step("provideFeedback action: requires - invalid parameters", async () => {
    const result1 = await recommendationConcept.provideFeedback({ userId: userAId, recommendedItem: "" as ID, feedback: true });
    assert(result1.error);
    assertEquals(result1.error, "User ID or recommended item not specified.");

    const result2 = await recommendationConcept.provideFeedback({ userId: "" as ID, recommendedItem: recommendedItem1Id, feedback: true });
    assert(result2.error);
    assertEquals(result2.error, "User ID or recommended item not specified.");
  });

  await t.step("provideFeedback action: effects - update feedback and timestamp for existing recommendation", async () => {
    // Ensure recommendedItem1Id exists from a previous test and has negative feedback
    // First, let's make sure an instance of recommendedItem1Id exists for userAId
    // (It was generated and then given negative feedback in a prior test)
    let preUpdate = await recommendationConcept.recommendations.findOne({ userId: userAId, item2: recommendedItem1Id });
    assert(preUpdate, "Recommendation for item1Id should exist before update.");
    assertEquals(preUpdate.feedback, false);

    const feedbackTimestamp = new Date();
    await new Promise(resolve => setTimeout(resolve, 10)); // Ensure timestamp difference

    const result = await recommendationConcept.provideFeedback({
      userId: userAId,
      recommendedItem: recommendedItem1Id,
      feedback: true, // Change to positive
    });

    assert(!("error" in result), `Expected no error, but got: ${result.error}`);

    const updatedRec = await recommendationConcept.recommendations.findOne({ userId: userAId, item2: recommendedItem1Id });
    assert(updatedRec);
    assertEquals(updatedRec.feedback, true);
    assert(updatedRec.createdAt.getTime() >= feedbackTimestamp.getTime()); // Timestamp should be updated
  });

  await t.step("provideFeedback action: effects - handle non-existent recommendation gracefully", async () => {
    const nonExistentItem: ID = "non-existent-rec-item" as ID;
    const result = await recommendationConcept.provideFeedback({
      userId: userAId,
      recommendedItem: nonExistentItem,
      feedback: true,
    });
    assert(result.error);
    assertEquals(result.error, "No existing recommendation found for the provided item and user.");
  });

  await t.step("clearRecommendations action: effects - clear recommendations for a specific user", async () => {
    // User B has recommendations from the fallback test
    const userBRecsBefore = await recommendationConcept.recommendations.countDocuments({ userId: userBId });
    assert(userBRecsBefore > 0);

    const result = await recommendationConcept.clearRecommendations({ userId: userBId });
    assert(!("error" in result));

    const userBRecsAfter = await recommendationConcept.recommendations.countDocuments({ userId: userBId });
    assertEquals(userBRecsAfter, 0);

    // User A's recommendations should still exist
    const userARecs = await recommendationConcept.recommendations.countDocuments({ userId: userAId });
    assert(userARecs > 0);
  });

  await t.step("clearRecommendations action: effects - clear all recommendations if no user ID is provided", async () => {
    const allRecsBefore = await recommendationConcept.recommendations.countDocuments({});
    assert(allRecsBefore > 0);

    const result = await recommendationConcept.clearRecommendations(); // No userId
    assert(!("error" in result));

    const allRecsAfter = await recommendationConcept.recommendations.countDocuments({});
    assertEquals(allRecsAfter, 0);
  });

  await t.step("_getFeedbackHistory query: effects - retrieve feedback history for a user", async () => {
    // Re-generate some recommendations and provide feedback for userAId
    await recommendationConcept.generate({
      userId: userAId,
      sourceItem: sourceItemAId,
      amount: 1,
      sourceItemMetadata: mockSourceItemMetadataA,
      similarArtists: mockSimilarArtistsA,
      similarRecordings: mockSimilarRecordingsA,
      similarReleaseGroups: mockSimilarReleaseGroupsA,
    });
    await recommendationConcept.provideFeedback({ userId: userAId, recommendedItem: recommendedItem1Id, feedback: true });
    await recommendationConcept.provideFeedback({ userId: userAId, recommendedItem: recommendedItem2Id, feedback: false });

    const result = await recommendationConcept._getFeedbackHistory({ userId: userAId });
    assert(!result.error);
    assert(result.history);
    assertEquals(result.history.length, 2); // Only items with feedback

    const positiveFeedback = result.history.find(h => h.item === recommendedItem1Id);
    assert(positiveFeedback);
    assertEquals(positiveFeedback.feedback, true);

    const negativeFeedback = result.history.find(h => h.item === recommendedItem2Id);
    assert(negativeFeedback);
    assertEquals(negativeFeedback.feedback, false);

    assert(positiveFeedback.reasoning.length > 0);
    assertEquals(positiveFeedback.sourceItem, sourceItemAId);
  });

  await client.close();
});

// --- Trace for Recommendation Concept ---
// This trace demonstrates how the principle ("after adding items to a user's library,
// generate personalized recommendations ... Users can provide feedback ... which is incorporated
// into future recommendations") is fulfilled.

/*
# trace: Recommendation Principle Fulfillment

1.  **Initial Setup**:
    *   A user `Alice` (`user:Alice`) is registered and has `The Beatles` (`mbid-artist-source-A`) in her "library" (represented by `sourceItemAId` in the `generate` call, implying the app has this context).
    *   MusicBrainzAPI provides initial `sourceItemMetadataA` for `The Beatles` and lists `The Rolling Stones` (`rec-item-mbid-1`), `Bohemian Rhapsody` (`rec-item-mbid-2`), `A Night at the Opera` (`rec-item-mbid-3`) as similar entities via its `getArtistSimilarities`, `getSimilarRecordings`, `getSimilarReleaseGroups` actions (these would come via synchronizations to the Recommendation concept).

2.  **Generate Initial Recommendations (via `generate` action)**:
    *   `Recommendation.generate(userId: "user:Alice", sourceItem: "mbid-artist-source-A", amount: 2, ...)`
    *   The `Recommendation` concept receives the external MusicBrainz similarity data and the source item's metadata.
    *   It checks its internal state for `user:Alice`'s feedback history (initially none).
    *   It constructs a prompt for the LLM (e.g., Gemini) including `The Beatles`' details, similar artists/recordings/albums, and no feedback history.
    *   The LLM (mocked here) returns `rec-item-mbid-1` ("Mocked Recommended Artist 1") and `rec-item-mbid-2` ("Mocked Recommended Artist 2") with reasoning and confidence.
    *   These recommendations are stored in the `Recommendation` concept's state.

3.  **User Provides Feedback (via `provideFeedback` action)**:
    *   `Recommendation.provideFeedback(userId: "user:Alice", recommendedItem: "rec-item-mbid-1", feedback: true)`
        *   User `Alice` sees "Mocked Recommended Artist 1" and likes it. The concept updates its state to mark `rec-item-mbid-1` as positively feedbacked for `user:Alice`.
    *   `Recommendation.provideFeedback(userId: "user:Alice", recommendedItem: "rec-item-mbid-2", feedback: false)`
        *   User `Alice` dislikes "Mocked Recommended Artist 2". The concept updates its state to mark `rec-item-mbid-2` as negatively feedbacked for `user:Alice`.

4.  **Generate Refined Recommendations (via `generate` action, again)**:
    *   `Recommendation.generate(userId: "user:Alice", sourceItem: "mbid-artist-source-A", amount: 2, ...)`
    *   The concept receives the same external MusicBrainz data.
    *   This time, `_getFeedbackHistory` retrieves `Alice`'s positive feedback for `rec-item-mbid-1` and negative feedback for `rec-item-mbid-2`.
    *   The LLM prompt *now includes this feedback history*.
    *   The LLM (mocked) generates new recommendations. Crucially, due to the prompt's instruction, it avoids `rec-item-mbid-2` because of negative feedback and might prioritize items similar to `rec-item-mbid-1`. It also avoids recommending `sourceItemAId` and `rec-item-mbid-1` if they were included in the LLM's raw output, as per the concept's internal filtering logic. Assuming our mock LLM *would* propose `rec-item-mbid-1`, the concept logic filters it out. It then might return `new-rec-x` and `new-rec-y`.
    *   These new recommendations (`new-rec-x`, `new-rec-y`) are stored, reflecting the refinement from user feedback.

5.  **Retrieve Recommendations (via `getRecommendations` action)**:
    *   `Recommendation.getRecommendations(userId: "user:Alice", item: "mbid-artist-source-A", amount: 3)`
    *   The concept retrieves stored recommendations for `user:Alice` related to `The Beatles`.
    *   It prioritizes `rec-item-mbid-1` (positive feedback) and includes `new-rec-x`, `new-rec-y` (no feedback), while strictly excluding `rec-item-mbid-2` (negative feedback). The ordered list is returned to the user.

This trace confirms that the concept's actions, working together, allow for generation of recommendations, collection of user feedback, and subsequent refinement of future recommendations based on that feedback, thereby fulfilling its stated purpose and principle.
*/
```

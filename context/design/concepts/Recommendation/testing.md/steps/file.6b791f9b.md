---
timestamp: 'Sat Oct 18 2025 22:36:20 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251018_223620.4150ca64.md]]'
content_id: 6b791f9beda5bfe2e0fff941e829570e03ed26576a7b378ff3539c555ee98528
---

# file: src/Recommendation/Recommendation.test.ts

```typescript
import { assertEquals, assertNotEquals, assertArrayIncludes } from "jsr:@std/assert";
import { testDb } from "@utils/database.ts";
import { ID, Empty } from "@utils/types.ts";
import Recommendation from "./Recommendation.ts";
import { GeminiLLM } from "@utils/geminiLLM.ts"; // The actual LLM class

// Mock the GeminiLLM to avoid actual API calls and manage token usage
class MockGeminiLLM extends GeminiLLM {
  private mockResponses: { [key: string]: string } = {};

  constructor() {
    super({ apiKey: "mock-api-key" }); // Call parent constructor with dummy key
  }

  setMockResponse(promptSubstring: string, response: string) {
    this.mockResponses[promptSubstring] = response;
  }

  async executeLLM(prompt: string): Promise<string> {
    console.log("Mock LLM called with prompt (truncated):", prompt.substring(0, 200) + "...");
    for (const key in this.mockResponses) {
      if (prompt.includes(key)) {
        return this.mockResponses[key];
      }
    }
    // Default mock response if no specific match
    return JSON.stringify([
      {
        name: "Default Mock Album",
        mbid: "mbid-mock-album-default" as ID,
        reasoning: "This is a default mock recommendation from the LLM.",
        confidence: 0.75,
      },
    ]);
  }
}

// Global mock instance for reuse across tests
const mockGeminiLLM = new MockGeminiLLM();

// Temporarily replace the GeminiLLM import in Recommendation for testing
let originalGeminiLLM: typeof GeminiLLM;
Deno.test.beforeAll(() => {
  // This is a hacky way to replace the imported class during tests.
  // In a real project with a proper DI framework, this would be cleaner.
  // @ts-ignore: We're knowingly manipulating imports for testing.
  originalGeminiLLM = Recommendation.__proto__.constructor.geminiLLMClass; // Assuming it's stored on prototype
  // @ts-ignore
  Recommendation.__proto__.constructor.geminiLLMClass = MockGeminiLLM;
});

Deno.test.afterAll(() => {
  // Restore original class after all tests
  // @ts-ignore
  Recommendation.__proto__.constructor.geminiLLMClass = originalGeminiLLM;
});


Deno.test("Recommendation Concept", async (t) => {
  const [db, client] = await testDb();
  const recommendationConcept = new Recommendation(db);

  const testUser1 = "user:Alice" as ID;
  const testUser2 = "user:Bob" as ID;
  const sourceArtistMBID_Radiohead = "artist:radiohead-mbid-1" as ID;
  const sourceAlbumMBID_OKComputer = "release-group:ok-computer-mbid-2" as ID;
  const recItemMBID_Muse = "artist:muse-mbid-3" as ID;
  const recItemMBID_Coldplay = "artist:coldplay-mbid-4" as ID;
  const recItemMBID_PinkFloyd = "artist:pink-floyd-mbid-5" as ID;
  const recItemMBID_Queen = "artist:queen-mbid-6" as ID;
  const recItemMBID_TheBeatles = "artist:the-beatles-mbid-7" as ID;
  const recItemMBID_OtherBand = "artist:other-band-mbid-8" as ID;

  const mockSourceItemMetadata = {
    id: sourceArtistMBID_Radiohead,
    name: "Radiohead",
    type: "Artist",
    disambiguation: "English rock band",
    genres: [{ name: "Art Rock", count: 100 }, { name: "Alternative Rock", count: 90 }],
    tags: [{ name: "british", count: 80 }, { name: "experimental", count: 70 }],
  };

  const mockSimilarArtists = [
    { mbid: recItemMBID_Muse, name: "Muse", score: 95, genres: ["Alternative Rock"] },
    { mbid: recItemMBID_Coldplay, name: "Coldplay", score: 80, genres: ["Pop Rock"] },
    { mbid: recItemMBID_PinkFloyd, name: "Pink Floyd", score: 70, genres: ["Progressive Rock"] },
  ];
  const mockSimilarRecordings: any[] = []; // Not used in this trace, keep empty for simplicity
  const mockSimilarReleaseGroups: any[] = []; // Not used in this trace, keep empty for simplicity

  // Set up mock LLM responses
  mockGeminiLLM.setMockResponse(
    "SOURCE ITEM: Radiohead",
    JSON.stringify([
      {
        name: "Muse",
        mbid: recItemMBID_Muse,
        reasoning: "Similar progressive and alternative rock tendencies to Radiohead.",
        confidence: 0.95,
      },
      {
        name: "Pink Floyd",
        mbid: recItemMBID_PinkFloyd,
        reasoning: "Both bands are known for their experimental and progressive soundscapes.",
        confidence: 0.88,
      },
      {
        name: "Queen",
        mbid: recItemMBID_Queen,
        reasoning: "While different in style, both have a theatricality and broad appeal.",
        confidence: 0.60,
      },
    ]),
  );

  // Another mock response for a different scenario if needed
  mockGeminiLLM.setMockResponse(
    "SOURCE ITEM: OK Computer",
    JSON.stringify([
      {
        name: "The Bends (Radiohead)",
        mbid: "release-group:the-bends-mbid-9" as ID,
        reasoning: "Another critically acclaimed album by Radiohead, offering a similar artistic depth.",
        confidence: 0.92,
      },
      {
        name: "Kid A (Radiohead)",
        mbid: "release-group:kid-a-mbid-10" as ID,
        reasoning: "While more electronic, Kid A shares Radiohead's experimental spirit.",
        confidence: 0.85,
      },
    ]),
  );

  await t.step("should initialize without error", () => {
    assertNotEquals(recommendationConcept, undefined);
  });

  await t.step("generate: should generate and store recommendations with LLM", async () => {
    const result = await recommendationConcept.generate({
      userId: testUser1,
      sourceItem: sourceArtistMBID_Radiohead,
      amount: 3,
      sourceItemMetadata: mockSourceItemMetadata,
      similarArtists: mockSimilarArtists,
      similarRecordings: mockSimilarRecordings,
      similarReleaseGroups: mockSimilarReleaseGroups,
    });

    assertEquals(result.error, undefined, `Expected no error, got: ${result.error}`);
    assertNotEquals(result.recommendations, undefined);
    assertEquals(result.recommendations?.length, 3);

    const recs = result.recommendations!;
    assertArrayIncludes(recs.map((r) => r.item2), [
      recItemMBID_Muse,
      recItemMBID_PinkFloyd,
      recItemMBID_Queen,
    ]);

    // Verify stored in DB
    const storedRecs = await db.collection("Recommendation.recommendations").find({ userId: testUser1, item1: sourceArtistMBID_Radiohead }).toArray();
    assertEquals(storedRecs.length, 3);
    assertEquals(storedRecs[0].feedback, null);
    assertNotEquals(storedRecs[0].createdAt, undefined);
  });

  await t.step("getRecommendations: should retrieve recommendations for a user/item", async () => {
    const result = await recommendationConcept.getRecommendations({
      userId: testUser1,
      item: sourceArtistMBID_Radiohead,
      amount: 2,
    });

    assertEquals(result.error, undefined);
    assertNotEquals(result.items, undefined);
    assertEquals(result.items?.length, 2);
    // Order might vary slightly depending on exact confidence, but Muse/PinkFloyd should be top
    assertArrayIncludes(result.items!, [recItemMBID_Muse, recItemMBID_PinkFloyd]);
  });

  await t.step("provideFeedback: should update feedback for a recommendation", async () => {
    const initialRecs = await db.collection("Recommendation.recommendations").find({ userId: testUser1, item2: recItemMBID_Muse }).toArray();
    assertEquals(initialRecs[0].feedback, null);

    const feedbackResult = await recommendationConcept.provideFeedback({
      userId: testUser1,
      recommendedItem: recItemMBID_Muse,
      feedback: true, // Positive feedback
    });

    assertEquals(feedbackResult, {}); // Empty object for success
    const updatedRecs = await db.collection("Recommendation.recommendations").find({ userId: testUser1, item2: recItemMBID_Muse }).toArray();
    assertEquals(updatedRecs[0].feedback, true);
    assertNotEquals(updatedRecs[0].createdAt, initialRecs[0].createdAt); // Timestamp should be updated
  });

  await t.step("provideFeedback: should handle non-existent recommendation gracefully", async () => {
    const feedbackResult = await recommendationConcept.provideFeedback({
      userId: testUser1,
      recommendedItem: "non-existent-mbid" as ID,
      feedback: false,
    });
    assertNotEquals(feedbackResult.error, undefined);
    assertEquals(feedbackResult.error, "No existing recommendation found for the provided item and user.");
  });

  await t.step("getRecommendations: should prioritize positive feedback and exclude negative", async () => {
    // Give negative feedback to Pink Floyd
    await recommendationConcept.provideFeedback({
      userId: testUser1,
      recommendedItem: recItemMBID_PinkFloyd,
      feedback: false, // Negative feedback
    });

    // Generate another recommendation (not used directly, but ensures state is there for getting)
    await recommendationConcept.generate({
      userId: testUser1,
      sourceItem: sourceArtistMBID_Radiohead,
      amount: 1, // Will try to recommend new unique items
      sourceItemMetadata: mockSourceItemMetadata,
      similarArtists: mockSimilarArtists,
      similarRecordings: mockSimilarRecordings,
      similarReleaseGroups: mockSimilarReleaseGroups,
    });

    // This recommendation should be Queen, as Muse is positive, Pink Floyd is negative.
    const result = await recommendationConcept.getRecommendations({
      userId: testUser1,
      item: sourceArtistMBID_Radiohead,
      amount: 2,
    });

    assertEquals(result.error, undefined);
    assertNotEquals(result.items, undefined);
    assertEquals(result.items?.length, 2);
    // Muse (positive) should be first, Queen (no feedback, lower confidence than Muse but higher than Pink Floyd) should be next. Pink Floyd (negative) should be excluded.
    assertEquals(result.items![0], recItemMBID_Muse);
    assertEquals(result.items![1], recItemMBID_Queen);
    assertNotEquals(result.items![1], recItemMBID_PinkFloyd); // Pink Floyd should be excluded
  });

  await t.step("_getFeedbackHistory: should return user's feedback history", async () => {
    const result = await recommendationConcept._getFeedbackHistory({ userId: testUser1 });

    assertEquals(result.error, undefined);
    assertNotEquals(result.history, undefined);
    assertEquals(result.history?.length, 2); // Muse (true), Pink Floyd (false)

    const museFeedback = result.history?.find((f) => f.item === recItemMBID_Muse);
    assertEquals(museFeedback?.feedback, true);
    assertEquals(museFeedback?.sourceItem, sourceArtistMBID_Radiohead);

    const pinkFloydFeedback = result.history?.find((f) => f.item === recItemMBID_PinkFloyd);
    assertEquals(pinkFloydFeedback?.feedback, false);
    assertEquals(pinkFloydFeedback?.sourceItem, sourceArtistMBID_Radiohead);
  });

  await t.step("generate (LLM disabled): should use fallback recommendations", async () => {
    // Unset GEMINI_API_KEY to simulate LLM being unavailable
    Deno.env.delete("GEMINI_API_KEY");
    // Re-instantiate the concept to pick up the env var change
    const fallbackRecommendationConcept = new Recommendation(db);

    const result = await fallbackRecommendationConcept.generate({
      userId: testUser2, // Use a different user to avoid existing feedback
      sourceItem: sourceArtistMBID_Radiohead,
      amount: 3,
      sourceItemMetadata: mockSourceItemMetadata,
      similarArtists: mockSimilarArtists, // These will be used for fallback
      similarRecordings: mockSimilarRecordings,
      similarReleaseGroups: mockSimilarReleaseGroups,
    });

    assertEquals(result.error, undefined);
    assertNotEquals(result.recommendations, undefined);
    assertEquals(result.recommendations?.length, 3);

    const recs = result.recommendations!;
    assertArrayIncludes(recs.map((r) => r.item2), [
      recItemMBID_Muse,
      recItemMBID_Coldplay,
      recItemMBID_PinkFloyd,
    ]);

    // Fallback reasoning should be used
    assertArrayIncludes(recs.map(r => r.reasoning), [
      "Based on its similarity as a artist and shared genres. (LLM not available)",
    ]);

    // Restore GEMINI_API_KEY for subsequent tests (if any)
    Deno.env.set("GEMINI_API_KEY", "mock-api-key");
  });

  await t.step("clearRecommendations: should clear recommendations for a specific user", async () => {
    const initialCount = await db.collection("Recommendation.recommendations").countDocuments({ userId: testUser1 });
    assertNotEquals(initialCount, 0);

    const clearResult = await recommendationConcept.clearRecommendations({ userId: testUser1 });
    assertEquals(clearResult, {});

    const finalCount = await db.collection("Recommendation.recommendations").countDocuments({ userId: testUser1 });
    assertEquals(finalCount, 0);

    // Ensure testUser2's recommendations are still there
    const user2Count = await db.collection("Recommendation.recommendations").countDocuments({ userId: testUser2 });
    assertNotEquals(user2Count, 0); // Should have 3 from the fallback test
  });

  await t.step("clearRecommendations: should clear all recommendations if no user ID is provided", async () => {
    const initialCount = await db.collection("Recommendation.recommendations").countDocuments();
    assertNotEquals(initialCount, 0); // Should still have testUser2's recommendations

    const clearAllResult = await recommendationConcept.clearRecommendations();
    assertEquals(clearAllResult, {});

    const finalCount = await db.collection("Recommendation.recommendations").countDocuments();
    assertEquals(finalCount, 0);
  });

  await client.close();
});

// Mock environment setup for LLM API key
Deno.test.beforeAll(() => {
  Deno.env.set("GEMINI_API_KEY", "mock-api-key");
  Deno.env.set("MONGO_URI", "mongodb://localhost:27017"); // Ensure Mongo URI is set
});

Deno.test.afterAll(() => {
  Deno.env.delete("GEMINI_API_KEY");
  Deno.env.delete("MONGO_URI");
});

```

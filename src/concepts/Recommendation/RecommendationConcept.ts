import { Collection, Db } from "npm:mongodb";
import { Empty, ID } from "@utils/types.ts";
import { freshID } from "@utils/database.ts";
import { GeminiLLM } from "@utils/geminiLLM.ts";

// Declare collection prefix, using the concept name
const PREFIX = "Recommendation" + ".";

// Generic types of this concept, as defined in the concept spec
type User = ID; // The user for whom recommendations are generated
type Item = ID; // Represents a MusicBrainz MBID (artist, recording, release-group, etc.)

/**
 * Interface for MusicBrainz entity metadata.
 * Based on the common structure from MusicBrainzAPI entities (Artist, Recording, Release, ReleaseGroup, Work).
 * This captures the fields used in recommendation generation.
 */
interface MusicBrainzEntity {
  id?: string;
  name?: string; // For artists, areas, labels
  title?: string; // For recordings, releases, release-groups, works
  type?: string; // Entity type (e.g., "Person", "Group", "Album", "Single")
  disambiguation?: string; // Disambiguation comment
  description?: string; // Additional description (not always present)
  genres?: MusicBrainzTag[]; // Genre tags with counts
  tags?: MusicBrainzTag[]; // User-contributed tags with counts
}

/**
 * Interface for MusicBrainz tags/genres.
 */
interface MusicBrainzTag {
  name: string;
  count: number;
}

/**
 * Interface representing a document in the 'Recommendation.recommendations' MongoDB collection.
 * This captures the state of the Recommendation concept.
 *
 * A set of `Recommendations` with:
 *   a userId of type ID (referencing the user who received/gave feedback on this recommendation)
 *   a item1 of type Item (MBID of the source item for the recommendation)
 *   a item2 of type Item (MBID of the recommended item)
 *   a itemName of type String (human-readable name for item2)
 *   a reasoning of type String
 *   a confidence of type Number (score from 0 to 1, indicating LLM confidence or similarity strength)
 *   an optional feedback of type Boolean (T = positive, F = negative)
 *   a createdAt of type Timestamp (when the recommendation was created or last updated with feedback)
 */
interface RecommendationDoc {
  _id: ID;
  userId: User;
  item1: Item; // MBID of the source item for the recommendation
  item2: Item; // MBID of the recommended item
  itemName: string; // Human-readable name/title for the recommended item (item2)
  reasoning: string;
  confidence: number;
  feedback: boolean | null; // true for positive, false for negative, null for no feedback
  createdAt: Date;
}

/**
 * Interface for the structured output expected from the LLM.
 */
interface LLMRecommendationOutput {
  name: string;
  reasoning: string;
  confidence: number;
}

/**
 * Type alias for user feedback (positive or negative).
 */
type FeedbackType = boolean; // True for positive, false for negative

export default class RecommendationConcept {
  // Purpose: suggest personalized music based on MusicBrainz queries, refining them with AI and iterating through user feedback to refine recommendations

  public recommendations: Collection<RecommendationDoc>;
  private geminiLLM: GeminiLLM | undefined;

  constructor(private readonly db: Db) {
    this.recommendations = this.db.collection(PREFIX + "recommendations");

    const geminiApiKey = Deno.env.get("GEMINI_API_KEY");

    if (geminiApiKey) {
      this.geminiLLM = new GeminiLLM({ apiKey: geminiApiKey });
    } else {
      console.warn(
        "GEMINI_API_KEY not found. LLM recommendations will not be available.",
      );
    }
  }

  /**
   * generate(userId: User, sourceItem: Item, amount: Number, sourceItemMetadata: JSON, similarArtists: List<JSON>, similarRecordings: List<JSON>, similarReleaseGroups: List<JSON>): Set<Recommendations>
   *
   * @concept Recommendation[User, Item]
   * @purpose suggest personalized music based on MusicBrainz queries, refining them with AI and iterating through user feedback to refine recommendations
   * @principle after adding items to a user's library, generate personalized recommendations either through MusicBrainz queries, using LLM analysis to refine these. Users can provide feedback on these suggestions, which is incorporated into future recommendations for that specific user.
   *
   * @requires `userId` is valid, `sourceItem` should be an MBID (falls back to sourceItemMetadata.id if not), `amount` of recommendations is positive. `sourceItemMetadata`, `similarArtists`, `similarRecordings`, `similarReleaseGroups` are provided (e.g., from MusicBrainzAPI via synchronization).
   * @effect Creates new `Recommendation` objects for the given `userId` and `sourceItem` based on provided external data and LLM refinement (incorporating `_getFeedbackHistory` from this concept's state). Returns the set of created recommendations. The sourceItemMetadata.id is used as the authoritative MBID for item1.
   *
   * This action generates new recommendations for a given source item and user. It receives external data
   * (metadata, similar items from MusicBrainzAPI via syncs), retrieves user-specific feedback from its
   * own state via `_getFeedbackHistory`, constructs an LLM prompt, calls the Gemini API to refine
   * recommendations, stores them, and returns the generated set.
   */
  async generate(params: {
    userId: User;
    sourceItem: Item; // Should be MBID; sourceItemMetadata.id is used as authoritative source
    amount: number;
    sourceItemMetadata: MusicBrainzEntity; // Metadata for the source item (artist, recording, release-group, etc.); id field must contain the MBID
    similarArtists: {
      mbid: string;
      name: string;
      score: number;
      sharedGenres: string[];
    }[];
    similarRecordings: {
      mbid: string;
      title: string;
      artist?: string;
      score: number;
      sharedGenres: string[];
    }[];
    similarReleaseGroups: {
      mbid: string;
      title: string;
      artist?: string;
      score: number;
      sharedGenres: string[];
    }[];
  }): Promise<{ recommendations?: RecommendationDoc[]; error?: string }> {
    const {
      userId,
      sourceItem,
      amount,
      sourceItemMetadata,
      similarArtists,
      similarRecordings,
      similarReleaseGroups,
    } = params;

    if (!userId || !sourceItem || amount <= 0) {
      return { error: "Invalid user ID, source item or amount specified." };
    }

    // Use the MBID from metadata as the authoritative source item ID
    const sourceItemMBID = (sourceItemMetadata?.id || sourceItem) as Item;

    // Fetch user-specific feedback history from this concept's state for the LLM prompt
    // Only include feedback for recommendations from this specific source item
    const feedbackHistoryResult = await this.getFeedbackHistory({
      userId: userId,
      sourceItem: sourceItemMBID,
    });
    const userFeedbackHistory = feedbackHistoryResult.history || [];
    // Build a set of names for which the user has already provided feedback FOR THIS SOURCE ITEM (case-insensitive)
    const feedbackNameDocs = await this.recommendations.find(
      { userId: userId, item1: sourceItemMBID, feedback: { $ne: null } },
      { projection: { itemName: 1 } },
    ).toArray();
    const existingFeedbackNames = new Set(
      feedbackNameDocs
        .map((d) => (d.itemName || "").toLowerCase())
        .filter((n) => n.length > 0),
    );

    // Collect ALL previously recommended item names for THIS SOURCE ITEM (regardless of feedback)
    const previouslyRecommendedDocs = await this.recommendations.find(
      { userId: userId, item1: sourceItemMBID },
      { projection: { itemName: 1 } },
    ).toArray();
    const existingRecommendedNames = new Set(
      previouslyRecommendedDocs
        .map((d) => (d.itemName || "").toLowerCase())
        .filter((n) => n.length > 0),
    );

    // Fallback if LLM is not configured
    if (!this.geminiLLM) {
      return this.generateFallbackRecommendations(
        userId,
        sourceItemMBID,
        amount,
        {
          similarArtists,
          similarRecordings,
          similarReleaseGroups,
        },
        userFeedbackHistory,
        existingFeedbackNames,
      );
    }

    // Format MusicBrainz relationships and attributes
    const mbRelationships = [];
    if (similarArtists && similarArtists.length > 0) {
      mbRelationships.push(
        `- Similar Artists (${similarArtists.length} total):\n${
          similarArtists.slice(0, 10).map((a: any) => {
            const genres = a.sharedGenres || a.genres || [];
            return `  • ${a.name} - Score: ${a.score.toFixed(2)}${
              genres.length ? `, Genres: [${genres.join(", ")}]` : ""
            }`;
          }).join("\n")
        }`,
      );
    }
    if (similarRecordings && similarRecordings.length > 0) {
      mbRelationships.push(
        `- Similar Recordings (${similarRecordings.length} total):\n${
          similarRecordings.slice(0, 10).map((r: any) => {
            const title = r.title || r.name || "Unknown";
            const genres = r.sharedGenres || r.genres || [];
            return `  • "${title}"${
              r.artist ? ` by ${r.artist}` : ""
            } - Score: ${r.score.toFixed(2)}${
              genres.length ? `, Genres: [${genres.join(", ")}]` : ""
            }`;
          }).join("\n")
        }`,
      );
    }
    if (similarReleaseGroups && similarReleaseGroups.length > 0) {
      mbRelationships.push(
        `- Similar Albums/Release Groups (${similarReleaseGroups.length} total):\n${
          similarReleaseGroups.slice(0, 10).map((rg: any) => {
            const title = rg.title || rg.name || "Unknown";
            const genres = rg.sharedGenres || rg.genres || [];
            return `  • "${title}"${
              rg.artist ? ` by ${rg.artist}` : ""
            } - Score: ${rg.score.toFixed(2)}${
              genres.length ? `, Genres: [${genres.join(", ")}]` : ""
            }`;
          }).join("\n")
        }`,
      );
    }
    // Extract genres/tags from sourceItemMetadata (e.g., from MusicBrainzAPI's getEntityGenres results)
    const sourceGenres =
      sourceItemMetadata?.genres?.map((g: MusicBrainzTag) => g.name).join(
        ", ",
      ) || "N/A";
    const sourceTags =
      sourceItemMetadata?.tags?.map((t: MusicBrainzTag) => t.name).join(", ") ||
      "N/A";

    // Format user feedback history
    const positiveFeedback = userFeedbackHistory
      .filter((f: { feedback: boolean }) => f.feedback === true)
      .map((f: { item: string; sourceItem: Item; reasoning: string }) =>
        `- Item: ${f.item} (Source: ${f.sourceItem}), Reasoning: ${f.reasoning}`
      )
      .join("\n");

    const negativeFeedback = userFeedbackHistory
      .filter((f: { feedback: boolean }) => f.feedback === false)
      .map((f: { item: string; sourceItem: Item; reasoning: string }) =>
        `- Item: ${f.item} (Source: ${f.sourceItem}), Reasoning: ${f.reasoning}`
      )
      .join("\n");

    const prompt = this._buildRecommendationPrompt({
      userId,
      sourceItem: sourceItemMBID,
      amount,
      sourceItemMetadata,
      sourceGenres,
      sourceTags,
      mbRelationships,
      positiveFeedback,
      negativeFeedback,
      previouslyRecommended: Array.from(existingRecommendedNames)
        .slice(0, 50)
        .map((n) => `- ${n}`)
        .join("\n"),
    });

    try {
      const text = await this.geminiLLM.executeLLM(prompt);

      // Attempt to parse JSON. LLMs sometimes include markdown formatting (```json ... ```)
      const parsedRecommendations = this._parseJSONFromLLMResponse(text);
      if (!parsedRecommendations) {
        console.error("Failed to parse LLM response as JSON:", text);
        return { error: "Failed to parse LLM recommendations." };
      }

      const newRecommendations: RecommendationDoc[] = [];

      for (const rec of parsedRecommendations) {
        // Stop if we've reached the requested amount
        if (newRecommendations.length >= amount) {
          break;
        }

        // Ensure valid name, not recommending the source itself, and not an item already in user's feedback history
        // Generate a unique item ID for this recommendation (using name-based approach)
        const itemId = `rec:${userId}:${
          rec.name.toLowerCase().replace(/[^a-z0-9]/g, "-")
        }:${Date.now()}` as Item;

        const normalizedName = rec.name?.toLowerCase();
        if (
          rec.name &&
          rec.name !==
            (sourceItemMetadata?.name || sourceItemMetadata?.title) &&
          !(normalizedName && existingFeedbackNames.has(normalizedName)) &&
          !(normalizedName && existingRecommendedNames.has(normalizedName)) &&
          !(normalizedName && existingFeedbackNames.has(normalizedName))
        ) {
          newRecommendations.push({
            _id: freshID(),
            userId: userId, // Associate with the user
            item1: sourceItemMBID,
            item2: itemId,
            itemName: rec.name,
            reasoning: rec.reasoning,
            confidence: Math.max(0, Math.min(1, rec.confidence)), // Clamp confidence
            feedback: null, // No feedback initially
            createdAt: new Date(),
          });
        }
      }

      if (newRecommendations.length > 0) {
        await this.recommendations.insertMany(newRecommendations);
      }

      return { recommendations: newRecommendations };
    } catch (e) {
      console.error("Error generating recommendations with LLM:", e);
      return {
        error: `Failed to generate recommendations: ${
          e instanceof Error ? e.message : String(e)
        }`,
      };
    }
  }

  /**
   * Private fallback method for generating recommendations if the LLM is not available or fails.
   * It relies solely on the provided MusicBrainz similarity data.
   */
  private async generateFallbackRecommendations(
    userId: User,
    sourceItemMBID: Item,
    amount: number,
    similarData: {
      similarArtists: {
        mbid: string;
        name: string;
        score: number;
        sharedGenres: string[];
      }[];
      similarRecordings: {
        mbid: string;
        title: string;
        artist?: string;
        score: number;
        sharedGenres: string[];
      }[];
      similarReleaseGroups: {
        mbid: string;
        title: string;
        artist?: string;
        score: number;
        sharedGenres: string[];
      }[];
    },
    userFeedbackHistory: {
      item: string; // use human-readable name
      feedback: boolean;
      reasoning: string;
      sourceItem: Item;
    }[],
    existingFeedbackNames: Set<string>,
  ): Promise<{ recommendations?: RecommendationDoc[]; error?: string }> {
    const { similarArtists, similarRecordings, similarReleaseGroups } =
      similarData;
    const allSimilarItems: {
      name: string;
      type: string;
      score: number;
    }[] = [];

    similarArtists.forEach((a) =>
      allSimilarItems.push({
        name: a.name,
        type: "artist",
        score: a.score,
      })
    );
    similarRecordings.forEach((r) =>
      allSimilarItems.push({
        name: r.title,
        type: "recording",
        score: r.score,
      })
    );
    similarReleaseGroups.forEach((rg) =>
      allSimilarItems.push({
        name: rg.title,
        type: "release-group",
        score: rg.score,
      })
    );

    // Filter out items already in user's feedback history (by name, case-insensitive)
    const existingFeedbackItems = new Set(
      userFeedbackHistory.map((f) => f.item.toLowerCase()),
    );

    const newRecommendations: RecommendationDoc[] = [];
    const uniqueRecommendedItems = new Set<Item>(); // To track uniqueness within this batch
    const seenNames = new Set<string>(); // Track names to avoid duplicates

    allSimilarItems
      .sort((a, b) => b.score - a.score)
      .slice(0, amount * 2) // Take a bit more to ensure we can pick 'amount' unique items
      .forEach((item) => {
        const itemId = `rec:${userId}:${
          item.name.toLowerCase().replace(/[^a-z0-9]/g, "-")
        }:${Date.now()}` as Item;
        const normalizedName = item.name.toLowerCase();

        if (
          uniqueRecommendedItems.size < amount &&
          !uniqueRecommendedItems.has(itemId) &&
          !seenNames.has(normalizedName) &&
          !existingFeedbackItems.has(normalizedName) &&
          !existingFeedbackNames.has(normalizedName)
        ) {
          uniqueRecommendedItems.add(itemId);
          seenNames.add(normalizedName);
          newRecommendations.push({
            _id: freshID(),
            userId: userId, // Associate with the user
            item1: sourceItemMBID,
            item2: itemId,
            itemName: item.name,
            reasoning:
              `Based on its similarity as a ${item.type} and shared genres. (LLM not available)`,
            confidence: item.score / 100, // Assuming score is out of 100, normalize
            feedback: null,
            createdAt: new Date(),
          });
        }
      });

    if (newRecommendations.length > 0) {
      await this.recommendations.insertMany(newRecommendations);
    }
    return { recommendations: newRecommendations };
  }

  /**
   * getRecommendations(userId: User, item: Item, amount: Number, feedbacked?: Boolean): Set<Item>
   *
   * @requires `userId` is valid, `item` exists, `amount` is positive.
   * @effect Returns `amount` of recommended item IDs for the specified `userId` similar to the given `item`,
   *         prioritizing positively-feedbacked items and strictly excluding negatively-feedbacked ones.
   *         If `feedbacked` is false, only returns recommendations that have NOT received any feedback yet.
   *
   * Retrieves a list of recommended items for a given item and user, prioritizing positively
   * feedbacked recommendations and strictly avoiding negatively feedbacked ones.
   */
  async getRecommendations(
    params: {
      userId: User;
      item: Item;
      amount: number;
      feedbacked?: boolean;
      ignore?: Item[];
    },
  ): Promise<
    {
      itemsWithReasoning?: {
        item: Item;
        itemName: string;
        reasoning: string;
        confidence: number;
      }[];
      error?: string;
    }
  > {
    const { userId, item, amount, feedbacked = true, ignore = [] } = params;
    if (!userId || !item || amount <= 0) {
      return { error: "Invalid user ID, item or amount specified." };
    }

    try {
      // Find all recommendations related to the user and item
      const allRelatedRecommendations = await this.recommendations.find({
        userId: userId,
        $or: [{ item1: item }, { item2: item }],
      }).toArray();

      const candidates: {
        recommendedItem: Item;
        feedback: boolean | null;
        confidence: number;
        createdAt: Date;
        reasoning: string;
        itemName: string;
      }[] = [];
      const seenItems = new Set<Item>();

      for (const rec of allRelatedRecommendations) {
        const recommendedId = rec.item1 === item ? rec.item2 : rec.item1;
        const recommendedName = rec.item1 === item ? rec.itemName : ""; // name may be unknown if 'item' equals item2

        if (recommendedId === item || seenItems.has(recommendedId)) {
          continue; // Skip the source item itself and duplicates
        }

        if (ignore.includes(recommendedId)) {
          continue; // Skip items in the ignore list
        }

        candidates.push({
          recommendedItem: recommendedId,
          feedback: rec.feedback,
          confidence: rec.confidence,
          createdAt: rec.createdAt,
          reasoning: rec.reasoning,
          itemName: recommendedName,
        });
        seenItems.add(recommendedId); // Mark as seen to avoid re-adding
      }

      // Sort candidates:
      // 1. Positive feedback first (true)
      // 2. No feedback next (null)
      // 3. Negative feedback last (false) - these will be excluded
      // Within each category: by confidence (desc), then createdAt (desc)
      candidates.sort((a, b) => {
        // Primary sort: Feedback priority
        if (a.feedback === true && b.feedback !== true) return -1;
        if (a.feedback !== true && b.feedback === true) return 1;
        if (a.feedback === null && b.feedback === false) return -1;
        if (a.feedback === false && b.feedback === null) return 1;

        // Secondary sort: Confidence (higher first)
        if (a.confidence !== b.confidence) return b.confidence - a.confidence;

        // Tertiary sort: Creation date (newer first)
        return b.createdAt.getTime() - a.createdAt.getTime();
      });

      const finalWithReasoning: {
        item: Item;
        itemName: string;
        reasoning: string;
        confidence: number;
      }[] = [];
      for (const candidate of candidates) {
        if (finalWithReasoning.length >= amount) break;

        // Apply feedback filtering based on 'feedbacked' parameter
        if (feedbacked) {
          // Default behavior: exclude items with negative feedback only
          if (candidate.feedback !== false) {
            finalWithReasoning.push({
              item: candidate.recommendedItem,
              itemName: candidate.itemName,
              reasoning: candidate.reasoning,
              confidence: candidate.confidence,
            });
          }
        } else {
          // feedbacked=false: only include items with NO feedback (null)
          if (candidate.feedback === null) {
            finalWithReasoning.push({
              item: candidate.recommendedItem,
              itemName: candidate.itemName,
              reasoning: candidate.reasoning,
              confidence: candidate.confidence,
            });
          }
        }
      }

      return { itemsWithReasoning: finalWithReasoning };
    } catch (e) {
      console.error("Error retrieving recommendations:", e);
      return {
        error: `Failed to retrieve recommendations: ${
          e instanceof Error ? e.message : String(e)
        }`,
      };
    }
  }

  /**
   * provideFeedback(userId: User, recommendedItem: Item, feedback: FeedbackType)
   *
   * @requires `userId` is valid, `recommendedItem` was previously recommended to this user.
   * @effect Stores user `feedback` (positive/negative) for the `recommendedItem` for the specific `userId` to inform future LLM recommendations. Updates the `createdAt` timestamp.
   *
   * Updates the feedback status for a previously recommended item for a specific user.
   */
  async provideFeedback(params: {
    userId: User;
    recommendedItem: Item;
    feedback: FeedbackType;
  }): Promise<Empty | { error: string }> {
    const { userId, recommendedItem, feedback } = params;
    if (!userId || !recommendedItem) {
      return { error: "User ID or recommended item not specified." };
    }

    try {
      const updateResult = await this.recommendations.updateMany(
        { userId: userId, item2: recommendedItem }, // Target specific user's recommendation instances
        { $set: { feedback: feedback, createdAt: new Date() } }, // Update feedback and refresh timestamp
      );

      if (updateResult.matchedCount === 0) {
        return {
          error:
            "No existing recommendation found for the provided item and user.",
        };
      }
      return {};
    } catch (e) {
      console.error("Error providing feedback:", e);
      return {
        error: `Failed to provide feedback: ${
          e instanceof Error ? e.message : String(e)
        }`,
      };
    }
  }

  /**
   * deleteRecommendation(recommendationId: ID)
   *
   * @requires `recommendationId` is valid and exists.
   * @effect Removes the specific recommendation with the given ID from the concept's state.
   *
   * Deletes a single recommendation by its ID.
   */
  async deleteRecommendation(
    params: { recommendationId: ID },
  ): Promise<Empty | { error: string }> {
    const { recommendationId } = params;
    if (!recommendationId) {
      return { error: "Recommendation ID not specified." };
    }
    try {
      const result = await this.recommendations.deleteOne({
        _id: recommendationId,
      });
      if (result.deletedCount === 0) {
        return { error: "No recommendation found with the provided ID." };
      }
      return {};
    } catch (e) {
      console.error("Error deleting recommendation:", e);
      return {
        error: `Failed to delete recommendation: ${
          e instanceof Error ? e.message : String(e)
        }`,
      };
    }
  }

  /**
   * clearRecommendations(userId?: User)
   *
   * @effect Removes all stored recommendations and feedback for the specified `userId`. If no `userId` is provided, all recommendations in the concept are cleared.
   *
   * Deletes all recommendation and feedback data for a user (or all users) from the concept's state.
   */
  async clearRecommendations(
    params: { userId?: User } = {},
  ): Promise<Empty | { error: string }> {
    const { userId } = params;
    try {
      const filter = userId ? { userId: userId } : {};
      await this.recommendations.deleteMany(filter);
      return {};
    } catch (e) {
      console.error("Error clearing recommendations:", e);
      return {
        error: `Failed to clear recommendations: ${
          e instanceof Error ? e.message : String(e)
        }`,
      };
    }
  }

  /**
   * getFeedbackHistory(userId: User, sourceItem?: Item): List<{ recommendationId: ID; item: String; feedback: Boolean; reasoning: String; sourceItem: Item }>
   *
   * @requires `userId` is valid.
   * @effect Returns a list of all feedback entries made by the specified `userId`, including the recommendation ID,
   *         the recommended item name, the feedback, the reasoning, and the source item that led to the recommendation.
   *         If `sourceItem` is provided, only returns feedback for recommendations from that specific source item.
   *
   * Retrieves feedback history for a user, optionally filtered by source item.
   */
  async getFeedbackHistory(
    params: { userId: User; sourceItem?: Item },
  ): Promise<
    {
      history?: {
        recommendationId: ID;
        item: string;
        feedback: boolean;
        reasoning: string;
        sourceItem: Item;
      }[];
      error?: string;
    }
  > {
    const { userId, sourceItem } = params;
    if (!userId) {
      return { error: "User ID not specified." };
    }
    try {
      const filter: any = {
        userId: userId,
        feedback: { $ne: null }, // Only retrieve items where feedback has been provided
      };

      // If sourceItem is provided, only get feedback for that specific source item
      if (sourceItem) {
        filter.item1 = sourceItem;
      }

      const feedbackDocs = await this.recommendations.find(filter).toArray();

      const history = feedbackDocs.map((doc) => ({
        recommendationId: doc._id,
        item: doc.itemName || String(doc.item2), // Prefer human-readable name for the item
        feedback: doc.feedback!, // Non-null asserted because of query
        reasoning: doc.reasoning,
        sourceItem: doc.item1,
      }));
      return { history: history };
    } catch (e) {
      console.error("Error retrieving feedback history:", e);
      return {
        error: `Failed to retrieve feedback history: ${
          e instanceof Error ? e.message : String(e)
        }`,
      };
    }
  }

  /**
   * Private helper to build the LLM prompt for music recommendations.
   * Extracts prompt construction logic to improve readability of the generate method.
   */
  private _buildRecommendationPrompt(params: {
    userId: User;
    sourceItem: Item;
    amount: number;
    sourceItemMetadata: MusicBrainzEntity;
    sourceGenres: string;
    sourceTags: string;
    mbRelationships: string[];
    positiveFeedback: string;
    negativeFeedback: string;
    previouslyRecommended: string;
  }): string {
    const {
      userId,
      sourceItem: _sourceItem,
      amount,
      sourceItemMetadata,
      sourceGenres,
      sourceTags,
      mbRelationships,
      positiveFeedback,
      negativeFeedback,
      previouslyRecommended,
    } = params;
    console.log("Building recommendation prompt for user", userId);
    console.log("Source item:", sourceItemMetadata);
    console.log("Amount:", amount);
    console.log("Source genres:", sourceGenres);
    console.log("Source tags:", sourceTags);
    console.log("MB relationships:", mbRelationships);
    console.log("Positive feedback:", positiveFeedback);
    console.log("Negative feedback:", negativeFeedback);

    return `You are a music recommendation assistant. Your task is to recommend music items similar to a source item based on MUSICAL CHARACTERISTICS from MusicBrainz data.

TASK: Generate exactly ${amount} unique music recommendations for user ${userId}.

OUTPUT FORMAT: JSON array of objects with these fields:
- "name": string - non-artist suggestions MUST be formatted as "Artist - Title" (e.g., "Miles Davis - Kind of Blue", "Bill Evans - Waltz for Debby"). Only use title alone if no artist info exists. If source item is an artist, only use the artist name.
- "reasoning": string (1-2 sentences) - Write naturally as if describing the music to a friend. Focus on shared genres and what makes it similar.
- "confidence": number (0.0 to 1.0, realistic similarity score based on genres and metadata)

EXAMPLES OF GOOD OUTPUT:

Song recommendation:
{
  "name": "Bill Evans - Waltz for Debby",
  "reasoning": "Shares the vocal jazz and jazz pop genres. Features piano-driven arrangements with intimate vocal performances.",
  "confidence": 0.85
}

Artist recommendation:
{
  "name": "Chet Baker",
  "reasoning": "Both feature soft, intimate vocal jazz with minimal instrumentation in the cool jazz tradition.",
  "confidence": 0.82
}

BAD OUTPUT (DO NOT WRITE LIKE THIS):
{
  "name": "Waltz for Debby",  ❌ Missing artist
  "reasoning": "This album likely features similar arrangements. It might appeal to listeners.",  ❌ Vague and hedging
  "confidence": 0.85
}

═══════════════════════════════════════════════════════════════════

SOURCE ITEM BEING ANALYZED:
Name: ${sourceItemMetadata?.name || sourceItemMetadata?.title || "Unknown"}
Type: ${sourceItemMetadata?.type || "Unknown"}
${
      sourceItemMetadata?.disambiguation
        ? `Context: ${sourceItemMetadata.disambiguation}`
        : ""
    }

MUSICAL CHARACTERISTICS:
• Genres: ${sourceGenres}
• User Tags: ${sourceTags}

SIMILAR ITEMS FROM MUSICBRAINZ DATABASE:
${
      mbRelationships.length > 0
        ? mbRelationships.join("\n")
        : "- Limited information available from MusicBrainz."
    }

⚠️ PRIORITIZE RECOMMENDATIONS FROM THE MUSICBRAINZ SIMILAR ITEMS ABOVE ⚠️
These items have been algorithmically matched based on genre/tag overlap and musical similarity.
If you know of entities that are more similar to the source item based on musical qualities, you may suggest them.

USER ${userId}'S PREFERENCE HISTORY FOR THIS SOURCE ITEM:
✓ Previously Liked: ${positiveFeedback || "None yet"}
✗ Previously Disliked: ${negativeFeedback || "None yet"}

PREVIOUSLY RECOMMENDED (DO NOT REPEAT):
${
      previouslyRecommended && previouslyRecommended.length > 0
        ? previouslyRecommended
        : "None yet"
    }

═══════════════════════════════════════════════════════════════════

RECOMMENDATION GUIDELINES:
1. Select recommendations from the MusicBrainz similar items listed above, choosing those with highest scores and most shared genres
2. Only if MusicBrainz data is insufficient, suggest well-known items in the SAME GENRES (${sourceGenres})
3. Generate recommendations that share MUSICAL attributes: genres, styles, instrumentation, mood
4. Consider the user's preference history for THIS source item only
5. Ensure all ${amount} recommendations are unique and different from the source item
6. Write reasoning in natural, conversational language:
   - Start directly with shared characteristics ("Shares the X and Y genres")
   - NO robotic phrases like "This album shares", "This release group is", "This recommendation falls within"
   - Use active, direct statements: "Features X", "Blends Y and Z", "Combines A with B"
   - Keep it concise and music-focused
7. Confidence scores should reflect actual genre/tag overlap from the MusicBrainz data

CRITICAL CONSTRAINTS:
⚠ NEVER recommend based on superficial title similarity (e.g., don't recommend "Dream On" for "Dreamer")
⚠ NEVER recommend the source item itself
⚠ NEVER recommend items the user has already provided feedback on for this source
⚠ Base confidence scores on actual genre/style similarity (don't give high scores unless truly similar)
⚠ If genres are empty but MusicBrainz similar items exist, use those items as your recommendations
⚠ Focus on MUSICAL SIMILARITY from the data, not name/title patterns or general knowledge
⚠ DO NOT use hedging language like "likely", "probably", "might", "could", "may", "potentially"
⚠ DO NOT start reasoning with "This album", "This release", "This recommendation", "This track"
⚠ Keep reasoning to 1-2 sentences that state concrete similarities
⚠ ALWAYS format names as "Artist - Title" for non-artist recommendations`;
  }

  /**
   * Private helper to parse JSON from LLM response.
   * Handles both raw JSON and markdown-wrapped JSON (```json ... ```).
   */
  private _parseJSONFromLLMResponse(
    text: string,
  ): LLMRecommendationOutput[] | null {
    console.log("LLM response:", text);
    try {
      // First, try to extract JSON from markdown code blocks
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch && jsonMatch[1]) {
        return JSON.parse(jsonMatch[1]);
      }
      // If no markdown wrapper, try direct parse
      return JSON.parse(text);
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      return null;
    }
  }
}

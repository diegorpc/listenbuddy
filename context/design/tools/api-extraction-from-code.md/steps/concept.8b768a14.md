---
timestamp: 'Tue Oct 21 2025 16:13:52 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251021_161352.5321a711.md]]'
content_id: 8b768a1491af757cbc5d976e690cb221a56490a9aafc03d056aa66feec169d36
---

# concept: Recommendation

* **concept**: Recommendation\[User, Item]

* **purpose**: suggest personalized music based on MusicBrainz queries, refining them with AI and iterating through user feedback to refine recommendations

* **principle**: after adding items to a user's library, generate personalized recommendations either through MusicBrainz queries, using LLM analysis to refine these. Users can provide feedback on these suggestions, which is incorporated into future recommendations for that specific user.

* **state**:

* A set of `Recommendations` with:

* a `userId` of type `User` (references the user for whom the recommendation was generated)

* a `item1` of type `Item` (the source item for the recommendation)

* a `item2` of type `Item` (the recommended item)

* a `reasoning` of type `String` (explanation provided by the LLM or fallback)

* a `confidence` of type `Number` (score from 0 to 1, indicating LLM confidence or similarity strength)

* an optional `feedback` of type `Boolean` (T = positive, F = negative)

* a `createdAt` of type `Timestamp` (when the recommendation was created or last updated with feedback)

* **actions**:
  * `generate(userId: User, sourceItem: Item, amount: Number, sourceItemMetadata: JSON, similarArtists: List<JSON>, similarRecordings: List<JSON>, similarReleaseGroups: List<JSON>): Set<Recommendations>`
    * **requires**: `userId` is valid, `sourceItem` exists in a valid format, `amount` of recommendations is positive. `sourceItemMetadata`, `similarArtists`, `similarRecordings`, `similarReleaseGroups` are provided (e.g., from MusicBrainzAPI via synchronization).
    * **effect**: Creates new `Recommendation` objects for the given `userId` and `sourceItem` based on provided external data and LLM refinement (incorporating `_getFeedbackHistory` from this concept's state). Returns the set of created recommendations.

  * `getRecommendations(userId: User, item: Item, amount: Number): Set<Item>`
    * **requires**: `userId` is valid, `item` exists, `amount` is positive.
    * **effect**: Returns `amount` of recommended item IDs for the specified `userId` similar to the given `item`, prioritizing positively-feedbacked items and strictly excluding negatively-feedbacked ones.

  * `provideFeedback(userId: User, recommendedItem: Item, feedback: FeedbackType)`
    * **requires**: `userId` is valid, `recommendedItem` was previously recommended to this user.
    * **effect**: Stores user `feedback` (positive/negative) for the `recommendedItem` for the specific `userId` to inform future LLM recommendations. Updates the `createdAt` timestamp.

  * `clearRecommendations(userId?: User)`
    * **effect**: Removes all stored recommendations and feedback for the specified `userId`. If no `userId` is provided, all recommendations in the concept are cleared.

---
timestamp: 'Sat Oct 18 2025 21:58:04 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251018_215804.771228b0.md]]'
content_id: 3bdf9f7e44e2d244687e26df5980e53bbb26f8fe9b1f64647ec5ee51b5dcb659
---

# concept: Recommendation

* **concept**: Recommendation\[Item]

* **purpose**: suggest personalized music based on MusicBrainz queries, refining them with AI and iterating through feedback to refine recommendations

* **principle**: after adding items to a user's library, generate recommendations either through MusicBrainz queries, using LLM analysis to refine these. Users can provide feedback to refine the recommendation loop, which is incorporated into future suggestions.

* **state**:

* A set of `Recommendations` with:
  * a `item1` of type `Item`
  * a `item2` of type `Item`
  * a `reasoning` of type `String`
  * an optional `feedback` of type `Boolean` (T = positive, F = negative)

* **actions**:
  * `generate(sourceItem: Item, amount: Number): Set<Recommendations>`
    * **requires**: item exists in a valid format, amount of recommendations is positive.
    * **effect**: creates Recommendation objects with the given sourceItem based on source Item relationships and llm refinement, returns the set of recommendations

  * `getRecommendations(item: Item, amount: Number): Set<Item>`
    * **requires**: amount of recommendations with `item1` or `item2` as item exists, amount is positive
    * **effect**: returns amount of recommended items similar to the given item

  * `provideFeedback(recommendedItem: Item, feedback: FeedbackType)`
    * **requires**: recommendedItem was previously recommended
    * **effect**: stores user feedback (positive/negative) for the recommended item to inform future LLM recommendations

  * `clearRecommendations()`
    * **effect**: removes all stored recommendations and feedback

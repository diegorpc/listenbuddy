# concept: LikertSurvey

* **concept**: LikertSurvey \[Author, Respondent]
* **purpose**: To measure attitudes or opinions by asking respondents to rate their level of agreement with a series of statements on a predefined scale.
* **principle**: If an author creates a survey with several questions on a 1-5 scale, and a respondent submits their answers to those questions, then the author can view the collected responses to analyze the respondent's opinions.
* **state**:
  * A set of `Surveys` with
    * an `author` of type `Author`
    * a `title` of type `String`
    * a `scaleMin` of type `Number`
    * a `scaleMax` of type `Number`
  * A set of `Questions` with
    * a `survey` of type `Survey`
    * a `text` of type `String`
  * A set of `Responses` with
    * a `respondent` of type `Respondent`
    * a `question` of type `Question`
    * a `value` of type `Number`
* **actions**:
  * `createSurvey (author: Author, title: String, scaleMin: Number, scaleMax: Number): (survey: Survey)`
    * **requires**: `scaleMin < scaleMax`
    * **effects**: Creates a new survey with the given author, title, and scale.
  * `addQuestion (survey: Survey, text: String): (question: Question)`
    * **requires**: The survey must exist.
    * **effects**: Adds a new question to the specified survey.
  * `submitResponse (respondent: Respondent, question: Question, value: Number)`
    * **requires**: The question must exist. The respondent must not have already submitted a response for this question. The value must be within the survey's scale.
    * **effects**: Records the respondent's answer for the given question.
  * `updateResponse (respondent: Respondent, question: Question, value: Number)`
    * **requires**: The question must exist. The respondent must have already submitted a response for this question. The value must be within the survey's scale.
    * **effects**: Updates the respondent's existing answer for the given question.

# concept: Recommendation 

* **concept**: Recommendation\[Item, MusicBrainzAPI]

* **purpose**: suggest personalized music based on MusicBrainz queries, refining them with AI and iterating through feedback to refine recommendations

* **principle**: after adding items to a user's library, generate recommendations either through MusicBrainz queries, using LLM analysis to refine these. Users can provide feedback to refine the recommendation loop, which is incorporated into future suggestions.

* **state**: 
 * A set of `Recommendations` with:
    * a `item1` of type `Item`
    * a `item2` of type `Item` 
    * a `reasoning` of type `String` 
    * a `source` of type `MusicBrainzAPI` (wrapper concept for MusicBrainz API)
    * an optional `feedback` of type `Boolean` (T = positive, F = negative)

actions
    generate(sourceItem: Item, amount: Number, source: MusicBrainzAPI): Set<Recommendations>
        requires: item exists in a valid format, amount of recommendations is positive.
        effect: creates Recommendation objects with the given sourceItem based on source Item relationships and llm refinement, returns the set of recommendations

    getRecommendations(item: Item, amount: Number): Set<Item>
        requires: amount of recommendations with `item1` or `item2` as item exists, amount is positive
        effect: returns amount of recommended items similar to the given item

    provideFeedback(recommendedItem: Item, feedback: FeedbackType)
        requires: recommendedItem was previously recommended
        effect: stores user feedback (positive/negative) for the recommended item to inform future LLM recommendations

    clearRecommendations()
        effect: removes all stored recommendations and feedback

</concept_spec>

notes
    The AI-augmented Recommendation concept enhances music discovery with LLM augmenting the original MusicBrainz functionality. With it, LLM can:
    1. Generate recommendations for individual items with contextual params
    2. Analyze libraries to find suggestions
    3. Learn from user feedback to refine suggestions
    4. Provide reasoning for each recommendation to build trust
    
    The concept maintains backward compatibility with the original, non-ai augmented version.
---
timestamp: 'Tue Oct 21 2025 16:14:19 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251021_161419.d7767fd8.md]]'
content_id: aeb0d01ee86fc08bc94b220fc4a703477d806451720368da0b3d73ef5370c308
---

# API Specification: Recommendation Concept

**Purpose:** suggest personalized music based on MusicBrainz queries, refining them with AI and iterating through user feedback to refine recommendations

***

## API Endpoints

### POST /api/Recommendation/generate

**Description:** Generates new personalized music recommendations for a user based on a source item, external MusicBrainz data, and LLM refinement.

**Requirements:**

* `userId` is valid.
* `sourceItem` exists in a valid format.
* `amount` of recommendations is positive.
* `sourceItemMetadata`, `similarArtists`, `similarRecordings`, `similarReleaseGroups` are provided (e.g., from MusicBrainzAPI via synchronization).

**Effects:**

* Creates new `Recommendation` objects for the given `userId` and `sourceItem` based on provided external data and LLM refinement (incorporating user's feedback history from this concept's state).
* Returns the set of created recommendations.

**Request Body:**

```json
{
  "userId": "string",
  "sourceItem": "string",
  "amount": "number",
  "sourceItemMetadata": {
    "id": "string",
    "name": "string",
    "title": "string",
    "type": "string",
    "disambiguation": "string",
    "description": "string",
    "genres": [
      { "name": "string", "count": "number" }
    ],
    "tags": [
      { "name": "string", "count": "number" }
    ]
  },
  "similarArtists": [
    {
      "mbid": "string",
      "name": "string",
      "score": "number",
      "genres": ["string"]
    }
  ],
  "similarRecordings": [
    {
      "mbid": "string",
      "name": "string",
      "score": "number",
      "genres": ["string"]
    }
  ],
  "similarReleaseGroups": [
    {
      "mbid": "string",
      "name": "string",
      "score": "number",
      "genres": ["string"]
    }
  ]
}
```

**Success Response Body (Action):**

```json
{
  "recommendations": [
    {
      "_id": "string",
      "userId": "string",
      "item1": "string",
      "item2": "string",
      "reasoning": "string",
      "confidence": "number",
      "feedback": "boolean | null",
      "createdAt": "string"
    }
  ]
}
```

**Error Response Body:**

```json
{
  "error": "string"
}
```

***

### POST /api/Recommendation/getRecommendations

**Description:** Retrieves a list of recommended items for a specified user and a given item, prioritizing positively feedbacked recommendations and strictly avoiding negatively feedbacked ones.

**Requirements:**

* `userId` is valid.
* `item` exists.
* `amount` is positive.

**Effects:**

* Returns `amount` of recommended item IDs for the specified `userId` similar to the given `item`, prioritizing positively-feedbacked items and strictly excluding negatively-feedbacked ones.

**Request Body:**

```json
{
  "userId": "string",
  "item": "string",
  "amount": "number"
}
```

**Success Response Body (Action):**

```json
{
  "items": [
    "string"
  ]
}
```

**Error Response Body:**

```json
{
  "error": "string"
}
```

***

### POST /api/Recommendation/provideFeedback

**Description:** Stores user feedback (positive/negative) for a previously recommended item for a specific user to inform future LLM recommendations.

**Requirements:**

* `userId` is valid.
* `recommendedItem` was previously recommended to this user.

**Effects:**

* Stores user `feedback` (positive/negative) for the `recommendedItem` for the specific `userId`.
* Updates the `createdAt` timestamp for the relevant recommendation record(s).

**Request Body:**

```json
{
  "userId": "string",
  "recommendedItem": "string",
  "feedback": "boolean"
}
```

**Success Response Body (Action):**

```json
{}
```

**Error Response Body:**

```json
{
  "error": "string"
}
```

***

### POST /api/Recommendation/clearRecommendations

**Description:** Removes all stored recommendations and feedback for the specified `userId`. If no `userId` is provided, all recommendations in the concept are cleared.

**Requirements:**

* (No explicit requirements, always executable)

**Effects:**

* Removes all stored recommendations and feedback for the specified `userId`.
* If no `userId` is provided, all recommendations in the concept are cleared.

**Request Body:**

```json
{
  "userId": "string"
}
```

*(Note: `userId` is optional. An empty object `{}` is also a valid request body to clear all recommendations.)*

**Success Response Body (Action):**

```json
{}
```

**Error Response Body:**

```json
{
  "error": "string"
}
```

***

### POST /api/Recommendation/\_getFeedbackHistory

**Description:** Returns a list of all feedback entries made by the specified `userId`, including the recommended item, the feedback, the reasoning, and the source item that led to the recommendation. This query is primarily for internal use by the `generate` action.

**Requirements:**

* `userId` is valid.

**Effects:**

* Returns a list of all feedback entries made by the specified `userId`, including the recommended item, the feedback, the reasoning, and the source item that led to the recommendation.

**Request Body:**

```json
{
  "userId": "string"
}
```

**Success Response Body (Query):**

```json
[
  {
    "item": "string",
    "feedback": "boolean",
    "reasoning": "string",
    "sourceItem": "string"
  }
]
```

**Error Response Body:**

```json
{
  "error": "string"
}
```

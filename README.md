# 6.104 Assignment 4a: Backend Concept Coding Deliverables

## Concept Specifications

[ListenBrainzAPI](design/concepts/ListenBrainzAPI/ListenBrainzAPI.md)

[MusicBrainzAPI](design/concepts/MusicBrainzAPI/MusicBrainzAPI.md)

[Recommendation](design/concepts/Recommendation/Recommendation.md)

[User](design/concepts/User/User.md)

## Concept Implementations 

[ListenBrainzAPI](src/concepts/ListenBrainzAPI/ListenBrainzAPI.ts)

[MusicBrainzAPI](src/concepts/MusicBrainzAPI/MusicBrainzAPI.ts)

[Recommendation](src/concepts/Recommendation/Recommendation.ts)

[User](src/concepts/User/User.ts)

## Concept Tests

[ListenBrainzAPI](src/concepts/ListenBrainzAPI/ListenBrainzAPI.test.ts)

[MusicBrainzAPI](src/concepts/MusicBrainzAPI/MusicBrainzAPI.test.ts)

[Recommendation](src/concepts/Recommendation/Recommendation.test.ts)

[User](src/concepts/User/User.test.ts)

## Test Results

image, tbd

## Design Notes

Many of the concepts underwent heavy changes or were reimagined, taking into account the feedback from Assignment 2. On a high level, all interactions with the ListenBrainz and MusicBrainz APIs were put in their own wrapper concepts. Recommendations were also changed to work off of MusicBrainz queries, and do the LLM refinement later with just natural language, basically.

### Development Insights

 * Insight 1
 * Insight 2
 * Insight 3
 * Insight 4
 * Insight 5


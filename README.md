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

Many of the concepts underwent heavy changes or were reimagined, taking into account the feedback from Assignment 2. On a high level, all interactions with the ListenBrainz and MusicBrainz APIs were put in their own wrapper concepts. Recommendations were also changed to work off of MusicBrainz queries, and do the LLM refinement later with just natural language, basically. I copied the geminiLLM service from the LLM prep assignment to be able to make the Recommendation more modular.

### Development Insights/Moments
  * I decided to include a [@backend-concept-development](design/background/backend-concept-development.md) as extra context included in the prompts, a document which gives a rundown on all the concepts so that the AI has some kind of idea of how these are gonna interact together (still recognizing the fact these are independent, just for ease of implementation). I also included information about the APIs we'd be using (ListenBrainzAPI and MusicBrainzAPI). I'm not sure if the relatively positive result I got out of its implementations for these were due to this, but I think it may have helped.
  * I was generally impressed with gemini's ability to nail most endpoints to the APIs, but starting from its implementation of the ListenBrainzAPI I quickly noticed it had formulated some requests and gotten some endpoints wrong. I refactored [@20251018_110233.f7d5bfd3](context/design/concepts/ListenBrainzAPI/implementation.md/20251018_110233.f7d5bfd3.md) to [@20251018_132449.066623c6](context/src/concepts/ListenBrainzAPI/ListenBrainzAPI.ts/20251018_132449.066623c6.md) after the AI implementation to fix these. I also fixed the handling for the response payloads, since the AI was expecting responses nested one layer too deep (or one too few).
  * As part of the many changes I made to the concepts during implementation, I adjusted the ListenBrainzAPI concept at [@20251018_155304.65018526](context/src/concepts/ListenBrainzAPI/ListenBrainzAPI.ts/20251018_155304.65018526.md) to remove the submitListens action previously included (since we're not working with scrobbling directly in this web app).
  * During testing I was also able to positively iterate on my concepts. Particularly in the change at [@20251018_203712.6228fa92](context/src/concepts/ListenBrainzAPI/ListenBrainzAPI.ts/20251018_203712.6228fa92.md), I was able to run each of these requests and strengthened the spec and interfaces to better reflect the payload received from the actual API. At this point, I wasn't using the context tool to develop these changes but rather refactoring them myself and doing context saves frequently.
  * During the implementation of MusicBrainzAPI's tests and getting to look at the API responses for the entity relationships, I noticed these were just metadata related and weren't at all indicative of something we could pull suggestions from, so I had to rework the way suggestions would be handled. I had to think hard about this as this would undoubtedly involve MusicBrainz fetches so it should probably be in the MusicBrainzAPI concept, although the methods for similarities would include some extra logic outside of just calling MusicBrainz API endpoints. Still, I decided on including it in the MusicBrainzAPI concept as I think it was most appropriate. As a result MusicBrainzAPI also went from [@20251018_132438.f4743ed2](context/src/concepts/MusicBrainzAPI/MusicBrainzAPI.ts/20251018_132438.f4743ed2.md) to [@20251018_214842.e5dcce49](context/src/concepts/MusicBrainzAPI/MusicBrainzAPI.ts/20251018_214842.e5dcce49.md). The refactoring for this concept also included fixing endpoints and API request functionality (including rate limiting), similarly to ListenBrainzAPI. 
  * The context tool responses 


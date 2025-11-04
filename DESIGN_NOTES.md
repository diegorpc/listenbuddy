## Visual Design Study

<img src="./visual_design_1.png" width="400px" />
<img src="./visual_design_2.png" width="400px" />

The visual design hasn't really evolved since the first implementation, largely because I made an effort on the stylings from the first iteration. I started developing with a clear idea of the greater throughlines for my design, primarily a beige + sage color palette, the font (Lexend), the .card style that most components used, and the general layout and look/feel of the web app. The largest change came in the recommendation screen, which I decided to make a modal and reworked the way the percentages were shown. 

The largest changes I made in following deliverables came in the card and item stylings. Specifically, I worked on the box shadow to get the intended glow effect in colors that worked for the color palette, and I modified the hover style to apply some offset to the position and change the box shadow color, which I feel is one of the more intentional design decisions that unify the color design. The other design change I made was to the header, which I've made sticky and have lower opacity so that it stays on top without obstructing visually.


## Assignment 4b Changes

One of the major changes during the frontend development was to the Recommendation concept's function signatures and structure. I initially wanted to keep all the recommendations 'native' to MusicBrainz primarily in order to be able to load cover images for recommendations and also guided by the expectation that the relationships for entities and the tagging would be a bit more elaborate. Unfortunately this was not the case (possibly due to the obscurity of the music I was testing for from my library) and I've decided to still pass MusicBrainzAPI info to Recommendation but just have this be extra context for the LLM to give recommendations, which were easily better than anything I could derive just from the MusicBrainz tags and limited querying features.

I modified the MusicBrainzAPI to fall back to retrieving tags from albums and then fall back to artists in the case that it didn't find tags, which was fairly frequent during testing with my own data. I also strengthened the rate limiting implementation according to the API documentation for the MusicBrainz API and the ListenBrainz API.

I also modified the UserConcept to store the ListenBrainz name of the user in the database as we use it in the UI.


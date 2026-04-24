**DRAUPADI ON THE DAIS**

Website Redesign Brief for Developer

Version 3.0  ·  April 2026  ·  dd-dias.vercel.app

*Design and layout changes only. Copy has been sent separately, except where new copy is introduced in this document for new elements.*

**Summary of All Changes**

| Element | Action | Summary |
| :---- | :---- | :---- |
| **For Organisers nav link** | **REMOVE** | Remove from navigation. No page needed at this stage. |
| **Hero image** | **REDESIGN** | Replace single static photo with an auto-advancing photo carousel. |
| **How It Works section** | **REDESIGN** | Replace stacked phase cards with a two-column layout: For Speakers left, For Organisers right. |
| **Speaker preview section** | **REDESIGN** | Hold the section structure in place. Display an intentional empty state until profiles are ready. |
| **Topic marquee bar** | **ADD** | Scrolling ticker of topic areas, placed just above the footer. |
| **Footer** | **REDESIGN** | Replace minimal footer with a full structured layout. |

**1\. What to Remove**

**For Organisers Navigation Link**

| ACTION: REMOVE   Remove the For Organisers link from the main navigation bar. The For Organisers and Media block on the homepage stays exactly as it is. Only the nav link is removed. *Note: If a standalone /for-organisers page exists, it can be unpublished rather than deleted.* |
| :---- |

**2\. Redesigns**

**2.1  Hero Image Carousel** 

| ACTION: REDESIGN Current state A single static photograph sits on the right side of the hero section. It does not change. Required change Replace it with an auto-advancing image carousel in the same position and at the same dimensions. |
| :---- |

 

| CAROUSEL BEHAVIOUR  →   Auto-advances every 3 to 4 seconds →   Smooth crossfade or slide transition between images →   No arrows or navigation dots visible. Clean and automatic. →   Loops continuously. Does not pause on hover. →   Minimum 4 images, maximum 6 in the rotation →   Images should be pre-loaded to avoid a blank frame on transition  IMAGE CONTENT GUIDANCE →   All photos should feature women in professional or public-speaking contexts →   Suggested themes across the set: woman at a podium, panel discussion in progress, woman being interviewed on stage, conference keynote, close-up of a woman mid-speech →   Consistent cropping: portrait orientation, same aspect ratio as the current static image →   Colour tone: warm or red-toned lighting works best with the existing brand palette. Avoid photos with a cold or blue tone. →   The current static image can remain as the first image in the carousel   RESPONSIVE →   On mobile: carousel maintains the stacked layout. The image sits below the headline text, same as the current static image. |
| :---- |

 

**2.2  How It Works: Two-Column Layout**

 

| ACTION: REDESIGN Current state Three full-width stacked phase cards (Phase 01, 02, 03\) sitting below the full-bleed crimson manifesto banner. Only the speaker journey is covered. The section is very long. Required change Replace the stacked cards with a two-column side-by-side layout. Left column is For Speakers. Right column is For Organisers. Both sit under a shared section header. Section header →   Section label (small caps, brand red): HOW IT WORKS →   Section headline (large, bold, black): Built for both sides of the stage |
| :---- |

 

| COPY FOR BOTH COLUMNS *Note: This is new copy. Use exactly as written. No em dashes anywhere.* |
| :---- |

 

| FOR SPEAKERS   01 Apply and be reviewed Tell us who you are and what you know. We review every application personally. Not everyone gets in. But if you have the expertise, you belong here. 02 Go live on the Dais If approved, your profile goes live. You get a link. You own your visibility. 03 Be the name they find When someone needs the right woman for the room, they find you here. | FOR ORGANISERS   01 Find her by what she knows Search by expertise, city, industry, and format. Not by name recognition. 02 Profiles built for decisions Structured information. Clear expertise. Past appearances. Enough to say yes. 03 Go direct Her contact is right there. Reach out. No intermediary, no friction. |
| :---- | :---- |

 

| Visual reference See the How It Works section of the Claude concept site linked at the bottom of this document. Step numbers are large, in brand red. Each column has a red underline beneath its heading. Two equal-width columns at the same vertical level.   Responsive behaviour →   Desktop: two columns side by side →   Mobile: For Speakers stacks above For Organisers, single column |
| :---- |

 

**2.3  Speaker Preview Section: Intentional Empty State**

 

| ACTION: REDESIGN Current state A dark red box with the text Voices launching soon. This is a dead end. It signals that the platform is not ready. Required change Keep the section structure intact. Keep the Who is on the Dais headline and the body copy. Replace the dark red placeholder box with a designed empty state that feels intentional, not under construction.   |
| :---- |

 

| EMPTY STATE SPEC   What to display →   A clean grid of 6 empty card outlines (ghost cards). Same dimensions as real speaker cards will be. →   Each ghost card is a light grey or off-white outlined rectangle with a subtle dashed or solid border →   Inside each card: a greyed-out circle in the avatar position, two greyed-out lines where the name and role would sit, and two small greyed-out pill shapes where the topic tags would go →   This is a skeleton/shimmer pattern. It communicates: this is what will be here. Not: we are not ready.   Text above the ghost cards →   Keep the existing section headline and body copy as is   Text below the ghost cards →   A single line in muted text: Verified profiles going live soon. →   Below that, the existing Enter the Dais CTA button stays in place   When profiles are ready →   Replace ghost cards one by one with real speaker cards as they are approved and added →   Real card structure: circular avatar or initial badge, name, role and organisation, 2 to 3 topic tags, city, format (e.g. KEYNOTE / PANEL)   *Note: Anshika will supply speaker data when profiles are ready. The ghost card structure should be built to match the real card dimensions so the swap requires no layout changes.* |
| :---- |

**3\. New Elements**

**3.1  Scrolling Topic Marquee Bar** 

| ACTION: ADD NEW Placement Full-width horizontal bar placed directly above the footer, below all other content sections. Acts as a visual separator between the page content and the footer. |
| :---- |

 

| MARQUEE SPEC  Visual styling →   Background: brand red (\#C0321E) →   Text: white, all caps, medium weight, letter-spaced →   Separator between topics: a centred dot, e.g. · →   Height: approximately 48 to 56px Topics to display in the loop LEADERSHIP & STRATEGY · VENTURE & FINANCE · MENTAL HEALTH AT WORK · TECHNOLOGY & AI · POLICY & GOVERNANCE · ENTREPRENEURSHIP · MEDIA & JOURNALISM · GENDER & IDENTITY · CULTURE & CREATIVITY · EDUCATION & RESEARCH *Note: Duplicate the text in the DOM so the loop is seamless with no visible gap between end and start.* Animation →   Direction: right to left →   Speed: steady medium pace. Readable but not static. →   No pause on hover. Infinite loop. Technical note →   Use CSS animation via transform: translateX. Do not use the deprecated HTML marquee element. |
| :---- |

**4\. Footer Redesign**

| ACTION: REDESIGN Current state The current footer has only the brand name, tagline, copyright line, and an ecosystem link. No navigation, no columns, no external links. Required change Rebuild as a full structured footer with a brand block, two navigation columns, and a bottom bar. |
| :---- |

 

| FOOTER STRUCTURE   Background →   Near-black, e.g. \#1A0A0A or \#111111. Consistent with the existing dark sections on the site.   Brand block →   Brand name: Draupadi on the Dais. Large, white, bold. →   Initiative tag: A Decoding Draupadi Initiative. Small, brand red, all caps. →   Tagline (new): Where India’s most credible women get found. Small, muted white or light grey, regular weight.   Column 1: For Speakers ·   List Your Profile → /join ·   Browse the Dais → directory page slug ·   About → /about   Column 2: Decoding Draupadi ·   The Talk → DD Substack link ·   Instagram → @decodingdraupadi ·   LinkedIn → Decoding Draupadi LinkedIn page ·   decodingdraupadi.com → main DD website   Column styling →   Column headings: white, bold, slightly larger than link text →   Links: muted white (\#CCCCCC). No underline by default. →   Links on hover: turn brand red, underline appears Bottom bar →   © 2026 Draupadi on the Dais. All rights reserved. Left-aligned. →   Part of the Decoding Draupadi ecosystem → decodingdraupadi.com. Right-aligned. →   Thin top border in dark grey (\#333333) separating bottom bar from the columns above   Responsive →   Desktop: brand block on the left, two columns on the right →   Mobile: brand block on top, columns stacked below, bottom bar last |
| :---- |

**5\. Implementation Order**

 

| \# | Task | Why this order |
| :---- | :---- | :---- |
| **1** | **Remove For Organisers nav link** | One-line change. Immediate fix. |
| **2** | **Hero image carousel** | Highest-visibility section. Most immediate visual upgrade. |
| **3** | **How It Works two-column layout** | Structural change. Do before footer so page length is settled. |
| **4** | **Speaker preview empty state (ghost cards)** | Keeps the section present and intentional without needing real data. |
| **5** | **Footer rebuild** | Independent of above. Can be done in parallel with items 3 and 4\. |
| **6** | **Topic marquee bar** | Visual only. No dependencies. Slot in last. |

 


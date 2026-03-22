# Mobile-First UI/UX Best Practices (Product Cards & Layout)

This document contains mandatory guidelines for designing mobile layouts, specifically targeting product cards, lists, and spacing, to ensure websites don't just "fit" on a mobile screen but provide a truly premium mobile experience.

## 1. Product Cards on Mobile (CRITICAL)
A common mistake is making cards 100% width on a mobile screen with an aspect ratio that causes the image to take up the entire vertical viewport. This looks clumsy and is universally considered bad UX.

- **Use Horizontal Cards for Single Columns:** Instead of stacked massive images, use a horizontal layout where the image is on the left (e.g., `width: 80px` or `100px`, `aspect-ratio: 1/1`) and the content/title/price is on the right.
- **Two-Column Grid (Masonry or Standard):** For visual products (like jewelry, clothing, or bakeries), use a 2-column grid (`grid-template-columns: repeat(2, 1fr)`) on mobile. The cards should have smaller, bite-sized imagery rather than spanning the full 375px width.
- **Horizontal Scroll (Carousel):** For featured products, place them in a horizontally scrolling container (`display: flex; overflow-x: auto; scroll-snap-type: x mandatory`). This hides the bulk of the content off-screen and invites the user to swipe, saving massive amounts of vertical space.

## 2. Touch-Friendly Design
- **Tap Targets:** All interactable elements (buttons, links, icon buttons) MUST have a minimum size of `44x44px`. If a button visually looks smaller, increase its padding or invisible hit area.
- **Card Clickability:** Make the entire product card clickable by expanding the `<a>` tag or using a `:after` pseudo-element over the card. Don't force users to tap a tiny "Read More" text link.

## 3. Visual Hierarchy & Clutter Reduction
- **Concise Content:** Mobile users scan. Hide heavy descriptions behind an accordion or truncate them to 2 lines (`display: -webkit-box; -webkit-line-clamp: 2; overflow: hidden;`).
- **Typography Sizing:** Use `16px` (or `1rem`) for base body fonts. Going smaller than `14px` impacts readability. Scale headings proportionally but do not let extremely large font sizes (e.g., `font-size: 4rem`) force word-breaks on a 320px screen.
- **Image Prominence:** Make the image the anchor of the card, but ensure it scales within a container of a maximum height (e.g., `height: 200px; max-height: 40vh`), never allowing a single image to occupy 100vh.

## 4. Spacing and Containers
- **Consistent Gaps:** Rely strictly on an 8pt or 4pt grid system (`gap: var(--space-sm)` for inner elements, `gap: var(--space-md)` between cards). 
- **Screen Padding:** The main container padding on mobile is typically `16px` to `24px` (`padding: 0 var(--space-md)`). Do not push elements all the way to the 0px edge unless it's a full-width image or scrolling carousel.

## 5. Modern Visual Aesthetics (Anti-90s Junk)
To ensure the website feels like a premium **2024+ product** and avoids the "cluttered 90s/Web 2.0" aesthetic, enforce the following visual patterns:
- **Clean Simplicity over Skeuomorphism:** NEVER use heavy, dark, hard drop shadows (e.g., `box-shadow: 5px 5px 0px black`), harsh bevels, or overly realistic 3D UI elements. Prefer modern softness (e.g., `box-shadow: 0 10px 30px rgba(0,0,0,0.05)`) or Glassmorphism (`backdrop-filter: blur(16px)` with a translucent overlay).
- **Asymmetric, Bold Typography:** Instead of centered, boring serif fonts everywhere, use stark, bold Sans-Serif headings with extreme contrast in size compared to the body text. 
- **Massive Whitespace:** If an element feels "too empty", let it breathe. 90s web design crammed every pixel. Modern design uses negative space as a primary layout tool to guide the eye.
- **Fluid Micro-interactions:** Use subtle scaling (`transform: scale(0.98)` or `scale(1.02)`) and color shifts on hover/active states with modern easing (`transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)`). Avoid instant harsh color jumping.
- **Subtle Gradients & Accents:** Flat UI can be boring, but rainbow gradients look cheap. Use monochromatic, ultra-subtle background gradients, or an ultra-minimal light/dark mode aesthetic relying entirely on ONE striking vibrant color reserved only for calls-to-action (CTAs).

## 6. File Architecture (Cleaner Structure)
To avoid bloated, massive HTML strings and maintain high quality, the web application must NOT be a monolithic `index.html`. It must follow a structured, standard architecture:
1. `index.html` - Only standard HTML5 semantic elements and links to assets.
2. `css/styles.css` - All custom properties, layouts, and mobile-first styles.
3. `js/main.js` - All logic, including cart handling, mobile menu toggling, and intersection observers.
4. `assets/` - A unified folder containing all user-supplied imagery, icons, and converted assets.

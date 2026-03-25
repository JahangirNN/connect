---
name: Tailored Instant Website Pipeline
description: A multi-step pipeline that creates a fully custom, premium single-page HTML website tailored from scratch for a specific business, saving it and its assets in a dedicated folder. Powered by ui-ux-pro-max design intelligence.
---
# Tailored Instant Website Pipeline

You are an expert Frontend Engineer and UI/UX Designer. Your task is to generate a highly premium, custom-designed single-page website strictly using standard HTML, CSS, and JS (no build tools) for a business. 

**CRITICAL:** Do NOT use any pre-existing templates. The entire layout, vibe, color scheme, and interaction design must be conceptualized and coded from scratch, perfectly tailored to the specific business. You MUST implement 2026 Awwwards-tier aesthetics using modern CSS features (OKLCH colors, `clamp()` fluid typography, `:has()`, native scroll-driven animations, layered diffused shadows, and `text-wrap: balance`). Do NOT output standard 2010s flat CSS.

## Inputs Provided by User:
1.  **Business Context:** Instagram Bio, description, industry, or vibe.
2.  **Contact Details:** Phone number, email, address, etc.
3.  **Logo Image:** File path or URL.

---

## ⚠️ Hard Rules (Learned From Past Mistakes)

These rules exist because of real failures. Violating them wastes time and produces broken output.

### DO NOT:
1. **DO NOT preview or QA in browser.** Never use browser subagent, never start HTTP servers (`python -m http.server`), never try to open `file://` URLs. The browser subagent cannot reliably preview local files. Just write correct code and deliver.
2. **DO NOT attempt image generation.** The `generate_image` tool has quota limits and frequently fails with 429 errors. Instead, design with **CSS-based visuals** (gradients, patterns, SVG shapes, backdrop-filter effects). Use CSS to create beautiful hero sections without relying on generated images.
3. **DO NOT use placeholder phone numbers.** If the user provides a phone number, use it exactly. If NO phone number is provided, use the default: `917778876166`. Never invent fake numbers like `6596709670`.
4. **DO NOT use emojis as icons.** Never use 📍 📞 📸 🎨 🚀 ⚙️ 💬 as UI elements. Use inline SVG icons only (Heroicons/Lucide style). Emojis are ONLY acceptable inside marketing copy text.
5. **DO NOT generate excessively long HTML.** Keep the code concise. Use short CSS class names, compress whitespace in non-critical areas. The HTML file should aim to be under 25KB. This avoids token limit issues during generation.
6. **DO NOT run supplementary design searches unless truly needed.** The `--design-system` command already returns everything needed (colors, fonts, style, pattern, effects). Only run `--domain` searches if the design system output is genuinely insufficient for a specific reason.

7. **DO NOT output purely basic 2010s CSS.** Do not rely solely on basic flexbox, single harsh `#000` box-shadows, and standard hex/rgba colors. You MUST use modern properties to create depth, rich interactions, and fluid layouts.

### ALWAYS:
1. **ALWAYS run the design system generator** before writing any code (Phase 1).
2. **ALWAYS use CSS custom properties** mapped from the design system output, but converted to OKLCH for vibrancy.
3. **ALWAYS use the exact hex values** from the design system, but translate them into vibrant `oklch()` CSS properties for the actual implementation.
4. **ALWAYS create the folder and copy the logo** before generating code (Phase 2).
5. **ALWAYS read `c:\Users\Administrator\WorkPlace\connect\.agent\skills\instant-website\resources\mobile-design-best-practices.md`** before planning the layout logic.
6. **ALWAYS deliver a clean file structure** — separating concerns into `index.html`, `css/styles.css`, and `js/main.js` instead of a monstrous monolithic file. No preview step needed.
7. **ALWAYS use modern CSS features:** use layered diffused shadows (multiple shadow declarations), `clamp()` for all responsive typography, `text-wrap: balance` for headings, native scroll-driven animations (`animation-timeline: view()`), and `:has()` for advanced conditional styling.

---

## Execution Pipeline (Mandatory 4-Phase Process):

### Phase 0: Planning & Task Checklist (MANDATORY ARTIFACT)
Before taking ANY actions or running searches, you MUST create an `implementation_plan` artifact. This plan must act as a rigid, step-by-step checklist of everything you are about to do—explicitly including the Mobile Design Guidelines, the multi-file architecture constraints, and the Self-Reflection UI checks. Do NOT proceed to Phase 1 until you have written this artifact.

### Phase 1: AI-Powered Design System Generation (via ui-ux-pro-max)

After your plan is written, generate a complete design system using the `ui-ux-pro-max` skill.

#### Step 1.1: Analyze User Inputs
Extract the following from the user's business context:
- **Industry** (e.g., Jewelry, Gym, Cafe, Dry Fruits, Tech Startup, Contractor)
- **Vibe/Style keywords** (e.g., luxurious, aggressive, modern, playful, artisan, professional)
- **Product type** (e.g., e-commerce, service, portfolio, food, retail, contractor)

#### Step 1.2: Run Design System Generator (MANDATORY — single command)
```bash
python .agent/skills/ui-ux-pro-max/scripts/search.py "<industry> <vibe> <product_type> <keywords>" --design-system -p "<Business Name>"
```

**Example queries by industry:**
| Industry | Query |
|----------|-------|
| Premium Dry Fruits | `"premium luxury dry fruits ecommerce food artisan"` |
| Cafe / Restaurant | `"cafe restaurant food cozy warm inviting service"` |
| Jewelry Store | `"luxury jewelry elegant premium ecommerce fashion"` |
| Fitness / Gym | `"fitness gym bold aggressive health service"` |
| Beauty / Spa | `"beauty spa wellness elegant soft service"` |
| Tech Startup | `"SaaS tech modern startup dashboard"` |
| Contractor / Trades | `"contractor construction professional trust service"` |
| Interior Design | `"interior design luxury home premium portfolio"` |

This returns a complete design system with **Pattern, Style, Colors, Typography, Key Effects, and Anti-Patterns**. This is sufficient — do NOT run additional searches unless genuinely needed.

#### Step 1.3: Finalize Design Decisions
Map the AI output directly to implementation decisions:
- **Color Palette:** Use the exact hex values → CSS custom properties.
- **Typography:** Use the recommended Google Fonts pair → `<link>` tag.
- **Layout:** Follow the recommended pattern.
- **Effects:** Implement the key effects listed.
- **Anti-patterns:** Actively avoid anything listed.

---

### Phase 2: Folder Initialization
1. **Create Business Workspace:** Determine a suitable short name (e.g., `apex_fitness`, `primecoat_sg`). Create directory: `c:\Users\Administrator\WorkPlace\connect\<business_name>`.
2. **Initialize Structure:** Create the internal folders `css/`, `js/`, and `assets/` immediately inside the workspace. Use `mkdir` or `New-Item -ItemType Directory` for each to ensure compatibility.

**Expected Folder Structure:**
```text
c:\Users\Administrator\WorkPlace\connect\
└── <business_name>\
    ├── index.html    (Main website file)
    ├── css/
    │   └── styles.css (All styling)
    ├── js/
    │   └── main.js   (All logic)
    └── assets/       (Contains logo and all other media)
```

---

### Phase 3: Bespoke Code Generation

Write the website from scratch utilizing a cleaner multi-file architecture: `index.html`, `css/styles.css`, and `js/main.js`. **CRITICAL: Before writing any code, you MUST run a `view_file` on `c:\Users\Administrator\WorkPlace\connect\.agent\skills\instant-website\resources\mobile-design-best-practices.md` to ensure your mobile layouts (especially product cards) are not massive and adhere strictly to UX standards.**

#### 3.1 Document Structure (`index.html`)
Create `index.html` with proper `<meta>` SEO tags (title, description, viewport), linking to external CSS and JS.

#### 3.2 Inject Tailored CSS (`css/styles.css`)

**CSS Custom Properties & 2026 Modern Reset (MANDATORY):**
```css
:root {
    /* Colors from ui-ux-pro-max - convert explicitly to vibrant oklch() space */
    --primary: <from design system>;
    --secondary: <from design system>;
    --cta: <from design system>;
    --background: <from design system>;
    --text: <from design system>;
    --accent-glow: oklch(75% 0.15 250 / 20%);
    
    /* Typography from ui-ux-pro-max */
    --heading-font: '<Heading Font>', serif;
    --body-font: '<Body Font>', sans-serif;
    
    /* Spacing tokens */
    --space-xs: 4px; --space-sm: 8px; --space-md: 16px;
    --space-lg: 24px; --space-xl: 32px; --space-2xl: 48px;
    
    /* 2026 Premium Shadows (Layered for smooth diffusion, NO harsh single shadows) */
    --shadow-sm: 0 1px 2px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.04);
    --shadow-md: 0 4px 6px rgba(0,0,0,0.03), 0 8px 12px rgba(0,0,0,0.03), 0 12px 20px rgba(0,0,0,0.03);
    --shadow-lg: 0 10px 15px rgba(0,0,0,0.03), 0 20px 25px rgba(0,0,0,0.04), 0 25px 50px rgba(0,0,0,0.02);
    --ease-spring: linear(0, 0.5 10%, 0.8 20%, 1.05 40%, 1 100%); /* Spring transition */
}

/* Base resets for modern typography and smooth scrolling */
html { scroll-behavior: smooth; }
h1, h2, h3, h4 { text-wrap: balance; font-family: var(--heading-font); }
p { text-wrap: pretty; }
```

**Mobile-First Design (MANDATORY & CRITICAL):**
- The design MUST be **mobile-first, always** (not just mobile-friendly). It often looks bad on mobile otherwise. Default CSS MUST strictly target mobile (375px+).
- Use `min-width` media queries to scale up layouts and spacing for: 768px → 1024px → 1440px.
- **Specific Mobile Precision Rules:**
  - **Headlines:** Set safe `clamp()` minimums to prevent overflow on 320px-375px screens (e.g., use `clamp(2rem, 8vw, 4.5rem)` rather than a `2.5rem` floor).
  - **Action Areas:** Always wrap and nicely format adjacent buttons. On mobile, use `display: flex; gap: var(--space-md); flex-wrap: wrap; justify-content: center;` to avoid awkward left-loading.
  - **Padding:** Rely on tighter paddings for base/mobile rules (e.g., `padding: var(--space-lg);`). Scale to spacious padding like `var(--space-3xl)` only within `@media (min-width: 768px)` breakpoints.
  - **Overlaps:** Dial down extreme overlaps (such as high negative `translateY` values) on mobile, preserving them solely for desktop screen widths.

**Mobile Navigation & Layout Safeties:**
- ALWAYS implement a hamburger menu for mobile. Smooth open/close transitions (300-400ms).
- **Cancel/Close Icon (CRITICAL):** ALWAYS provide a clear way to close the mobile menu. The hamburger toggle must remain visible on top (`z-index` higher than menu) and animate into a visible "X" (Close button), OR explicitly place an SVG "X" button inside the sidebar to close it. Never trap the user inside a sidebar.
- **Menu Background Bleed:** Make sure the mobile menu overlay has `opacity: 0`, `visibility: hidden`, and `pointer-events: none` when closed, so it never bleeds through the edges of the exact viewport height bounds.
- **Button Sizing Overflow:** Sidebar links often receive massive font sizing (`3rem`). If you nest a CTA button inside the sidebar, you MUST use CSS to strictly prevent it from inheriting massive font sizes that blow out its bounds (e.g. use `.mobile-menu > a:not(.btn-cta)` for the big links).
- **Wide Screen Clamp Error:** NEVER constrain `<nav>` or `<header>` container nodes directly using `max-width` or `.container` boundaries, which causes backgrounds and videos to get chopped off linearly on widescreens. Apply the container to an inner wrapper (`<div class="nav-wrapper container">`) so backgrounds organically span `100vw`.
- **Top Safe Area (Overlap Bug):** ALWAYS add `padding-top: calc(var(--nav-h) + var(--space-xl));` to your `header` or `hero` wrapper. Without this, extremely short mobile screens will squeeze your bottom-aligned hero text underneath the fixed glass navbar, hiding the text.
- **CRITICAL FIX:** The mobile navbar is extremely narrow. NEVER place a large primary action button (`.btn-cta`) next to the hamburger menu on mobile; hide navbar CTA buttons (`display: none` below `1024px`) and place the CTA inside the mobile menu dropdown instead.

**Responsive Grids:**
- CSS Grid / Flexbox that auto-stacks on mobile.
- NEVER `display: none` on primary content for mobile — refactor the layout instead.

**Hero Section — Native Scroll Animations & CSS Visuals (NO generated images):**
- Use CSS gradients, SVG patterns, and `backdrop-filter` effects to create visually rich hero sections.
- MANDATORY: Use native CSS scroll-driven animations (`animation-timeline: view()`) for fade-ins and parallax effects as the user scrolls away from the hero, instead of relying on JavaScript InterSection observers.
- Combine the logo image with CSS-created backgrounds.
- Example techniques:
  - `background: linear-gradient(135deg, in oklch, var(--primary), var(--secondary))` with SVG pattern overlay
  - `backdrop-filter: blur(20px) saturate(180%)` glass cards (Liquid Glass effect)
  - CSS-animated geometric shapes with `mix-blend-mode`
  - Textured backgrounds via embedded SVG noise data URIs

**Icons — SVG Only:**
- Use inline `<svg>` elements with `viewBox="0 0 24 24"`, consistent sizing.
- Source from Heroicons/Lucide style paths.
- NEVER use emojis (📍📞📸) as UI icons, even in contact sections.

**Interactive Elements:**
- `cursor: pointer` on ALL clickable elements.
- Hover transitions: 150-300ms (color, shadow, transform).
- `prefers-reduced-motion: reduce` media query to disable animations for accessibility.

#### 3.3 Draft Semantic Content
- Expand the bio into polished website copy (Hero, About, Services/Features, Contact).
- Use semantic HTML: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`.
- All `<img>` elements MUST have descriptive `alt` text.
- Use relative paths for images: `<img src="logo.png">`.

#### 3.4 Wire the CTA ("Book Now" / Contact / Cart)
- **CRITICAL:** Use the phone number provided by the user. If no phone number is provided, ALWAYS default to `917778876166`. **NEVER invent a placeholder number.**
- **If specific products are requested OR if multiple images are provided alongside a logo (assume they are products 99% of the time):** ALWAYS implement a lightweight JavaScript shopping cart. Add a sticky "Cart" icon to the header, and include "Add to Cart" / "Buy Now" buttons on every product card. The checkout action must open a cart modal summarizing items/total, and then redirect to a pre-filled WhatsApp message containing the order (`https://wa.me/<PhoneNumber>?text=<UrlEncodedOrder>`). 
- **Cart UX Requirements:** If generating a cart, you MUST include functional "Remove" (×) buttons next to each item inside the modal that successfully slice the item out of the array and re-render the view. Also, if all items are removed, explicitly render a "Your cart is empty." message natively.
- **For cafes and restaurants:** "Book Now" button opens a custom modal form (event type, date, time, guests). JS captures values and redirects to WhatsApp.
- **For other businesses without specific individual products:** Use direct WhatsApp links: `https://wa.me/<PhoneNumber>?text=Hello...`
- If an email is provided, include `mailto:<email>`.
- Include a floating WhatsApp button (bottom-right, `position: fixed`).

#### 3.5 Quality Built Into Code (No Separate QA Phase)
Apply these rules WHILE writing code — not as a separate check:

| Category | Rule |
|----------|------|
| **Icons** | Inline SVG only, no emojis, consistent `viewBox="0 0 24 24"` |
| **Cursor** | `cursor: pointer` on all buttons, links, cards, CTAs |
| **Transitions** | `transition: all 200ms ease` on hover states (150-300ms range) |
| **Contrast** | Body text ≥ 4.5:1 ratio, muted text ≥ 3:1 ratio |
| **Navbar** | First section gets `padding-top: calc(var(--nav-h) + extra)` |
| **Nav CTA** | Hide CTA buttons inside the navbar on mobile (`display: none`) to prevent overflow |
| **Max-width** | Same `max-width` across all sections (e.g., `1200px`) |
| **Mobile** | No horizontal scroll at 375px, `overflow-x: hidden` on body |
| **Touch targets** | Buttons/CTAs minimum 44×44px on mobile |
| **Alt text** | Every `<img>` has descriptive `alt` |
| **Reduced motion** | `@media(prefers-reduced-motion:reduce)` disables animations |
| **Semantic** | Use `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>` |

#### 3.5 AI Self-Reflection Checklist (MANDATORY MUST-PASS)
Before delivering the code, you **MUST** step-by-step self-verify the constraints below. If any are missed, the website is conceptually broken for mobile.
1. [ ] Check **Menu Close Mechanism**: Does the mobile sidebar actually have a clear close/cancel "X" mechanism (an animated toggle staying on top, or a dedicated explicit close button)?
2. [ ] Check **Sidebar Bleed**: Does `.mobile-menu` explicitly employ `visibility: hidden` and `opacity: 0` when in its closed state so no corners bleed out?
3. [ ] Check **Sidebar Text Scales**: Did I protect the `.btn-cta` inside the sidebar from inheriting the massive `3rem` font sizes applied to normal menu links using CSS exclusions like `:not(.btn-cta)`?
4. [ ] Check **Navbar UI Clamp**: Did I explicitly hide `.btn-cta` from the navbar on mobile via a `@media` query to prevent overflow? 
5. [ ] Check **Full-width Hero/Nav Backgrounds**: Did I incorrectly drop the `.container` class onto `<nav>` or `<header>`, breaking structural width? (Fix: wrap the inner content in a container instead).
6. [ ] Check **Hero Safe Area**: Did I inject `padding-top: calc(var(--nav-h) + extra)` into the hero section to prevent short mobile screens from shoving text underneath the fixed navbar?
7. [ ] Check **Product Card Orientation**: Are the product/image cards horizontally grouped or utilizing a scroll-snap carousel rather than stacking 100vh massive vertical blocks?
8. [ ] Check **Cart Removal UX**: If I implemented a cart, does it have functional 'Remove' buttons and handle the empty `cart.length === 0` UI state correctly without breaking?

#### 3.6 Save Code Files
Save code files (`index.html`, `css/styles.css`, `js/main.js`) securely in the business directory.

---

### Phase 4: Asset Management & Final Verification (THE LAST STEP)

This phase MUST be completed after the code is written but BEFORE notifying the user.

1. **Handle Assets (CRITICAL):**
    - **Logo:** Copy the primary logo image into the directory as `logo.png` using `Copy-Item -Path "..." -Destination "..." -Force`.
    - **All Other Assets:** Copy EVERY image and video provided by the user into the `assets/` subfolder.
    - **Robust Copy (Windows):** For every asset, use `Copy-Item -Path "<source>" -Destination "<business_name>/assets/<destination>" -Force` to ensure success on Windows.
    - **HEIC Conversion:** If user provides `.heic` files, ALWAYS convert them to `.jpg` using `ffmpeg -i input.heic output.jpg` before moving to assets.
2. **Verify Integrity:** Run `list_dir` on the workspace and the `assets/` folder to verify every file exists and has a non-zero size.

#### 4.1 Final Delivery
Inform the user the website is ready. No preview, no server, no browser check.

---

## Core Rules

1. **Design System First:** ALWAYS run `--design-system` before writing code.
2. **No Two Alike:** Every website must be structurally unique, driven by the business nature.
3. **No Emoji Icons:** SVGs only. Emojis acceptable ONLY in marketing copy text.
4. **No Browser Preview:** Never attempt to preview. Write correct code and deliver.
5. **No Image Generation:** Use CSS-based visuals. Never call `generate_image`.
6. **No Placeholder Numbers:** Use the user's number or default `917778876166`.
7. **Concise Output:** Keep HTML under 25KB. Use short class names, compress where possible.
8. **Mobile First, Always:** The design MUST be mobile-first, not just mobile-friendly. Default CSS MUST strictly target mobile. Responsive at 375/768/1024/1440px.
9. **Performance Aware:** Respect `prefers-reduced-motion`. Use effects sparingly when flagged.
11. **Asset Maximization:** ALWAYS use all provided assets. Integrate videos and multiple images into the UI. Convert `.heic` to `.jpg` proactively.
12. **Native 2026 CSS:** Rely on `:has()`, `clamp()`, `oklch()`, and `view-timeline` to minimize JavaScript and create fluid, hardware-accelerated experiences. No harsh single box-shadows.


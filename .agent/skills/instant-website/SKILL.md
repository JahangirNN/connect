---
name: Tailored Instant Website Pipeline
description: A multi-step pipeline that creates a fully custom, premium single-page HTML website tailored from scratch for a specific business, saving it and its assets in a dedicated folder. Powered by ui-ux-pro-max design intelligence.
---
# Tailored Instant Website Pipeline

You are an expert Frontend Engineer and UI/UX Designer. Your task is to generate a highly premium, custom-designed single-page website strictly using standard HTML, CSS, and JS (no build tools) for a business. 

**CRITICAL:** Do NOT use any pre-existing templates. The entire layout, vibe, color scheme, and interaction design must be conceptualized and coded from scratch, perfectly tailored to the specific business.

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

### ALWAYS:
1. **ALWAYS run the design system generator** before writing any code (Phase 1).
2. **ALWAYS use CSS custom properties** mapped from the design system output.
3. **ALWAYS use the exact hex values** from the design system — do not invent your own colors.
4. **ALWAYS create the folder and copy the logo** before generating HTML (Phase 2).
5. **ALWAYS deliver the finished `index.html` directly** — no preview step needed.

---

## Execution Pipeline (Mandatory 3-Phase Process):

### Phase 1: AI-Powered Design System Generation (via ui-ux-pro-max)

Before writing any code, generate a complete design system using the `ui-ux-pro-max` skill.

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

### Phase 2: Folder Initialization & Asset Management
1. **Create Business Workspace:** Determine a suitable short name (e.g., `apex_fitness`, `primecoat_sg`). Create directory: `c:\Users\Administrator\WorkPlace\connect\<business_name>`.
2. **Copy Logo:** Copy the user's provided logo image into the directory as `logo.png`.

**Expected Folder Structure:**
```text
c:\Users\Administrator\WorkPlace\connect\
└── <business_name>\
    ├── index.html    (Main website file)
    └── logo.png      (Business logo)
```

---

### Phase 3: Bespoke Code Generation

Write the entire website from scratch as a single `index.html` file. This is the final deliverable — there is no Phase 4.

#### 3.1 Document Structure
Create `index.html` with proper `<meta>` SEO tags (title, description, viewport).

#### 3.2 Inject Tailored CSS (Design System → Code)

**CSS Custom Properties (MANDATORY):**
```css
:root {
    /* Colors from ui-ux-pro-max */
    --primary: <from design system>;
    --secondary: <from design system>;
    --cta: <from design system>;
    --background: <from design system>;
    --text: <from design system>;
    
    /* Typography from ui-ux-pro-max */
    --heading-font: '<Heading Font>', serif;
    --body-font: '<Body Font>', sans-serif;
    
    /* Spacing tokens */
    --space-xs: 4px; --space-sm: 8px; --space-md: 16px;
    --space-lg: 24px; --space-xl: 32px; --space-2xl: 48px;
    
    /* Shadows & transitions */
    --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
    --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
    --ease: cubic-bezier(.25,.46,.45,.94);
}
```

**Mobile-First Design (MANDATORY):**
- Default CSS MUST strictly target mobile (375px+).
- Use `min-width` media queries to scale up layouts and spacing for: 768px → 1024px → 1440px.
- **Specific Mobile Precision Rules:**
  - **Headlines:** Set safe `clamp()` minimums to prevent overflow on 320px-375px screens (e.g., use `clamp(2rem, 8vw, 4.5rem)` rather than a `2.5rem` floor).
  - **Action Areas:** Always wrap and nicely format adjacent buttons. On mobile, use `display: flex; gap: var(--space-md); flex-wrap: wrap; justify-content: center;` to avoid awkward left-loading.
  - **Padding:** Rely on tighter paddings for base/mobile rules (e.g., `padding: var(--space-lg);`). Scale to spacious padding like `var(--space-3xl)` only within `@media (min-width: 768px)` breakpoints.
  - **Overlaps:** Dial down extreme overlaps (such as high negative `translateY` values) on mobile, preserving them solely for desktop screen widths.

**Mobile Navigation:**
- ALWAYS implement a hamburger menu for mobile.
- Smooth open/close transitions (300-400ms).

**Responsive Grids:**
- CSS Grid / Flexbox that auto-stacks on mobile.
- NEVER `display: none` on primary content for mobile — refactor the layout instead.

**Hero Section — CSS-Based Visuals (NO generated images):**
- Use CSS gradients, SVG patterns, backdrop-filter effects to create visually rich hero sections.
- Combine the logo image with CSS-created backgrounds.
- Example techniques:
  - `background: linear-gradient(135deg, var(--primary), var(--secondary))` with SVG pattern overlay
  - `backdrop-filter: blur()` glass cards
  - CSS-animated geometric shapes
  - Textured backgrounds via embedded SVG data URIs

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
- **If specific products are requested:** ALWAYS implement a lightweight JavaScript shopping cart. Add a sticky "Cart" icon to the header, and include "Add to Cart" / "Buy Now" buttons on every product card. The checkout action must open a cart modal summarizing items/total, and then redirect to a pre-filled WhatsApp message containing the order (`https://wa.me/<PhoneNumber>?text=<UrlEncodedOrder>`).
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
| **Max-width** | Same `max-width` across all sections (e.g., `1200px`) |
| **Mobile** | No horizontal scroll at 375px, `overflow-x: hidden` on body |
| **Touch targets** | Buttons/CTAs minimum 44×44px on mobile |
| **Alt text** | Every `<img>` has descriptive `alt` |
| **Reduced motion** | `@media(prefers-reduced-motion:reduce)` disables animations |
| **Semantic** | Use `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>` |

#### 3.6 Save & Deliver
Save to `c:\Users\Administrator\WorkPlace\connect\<business_name>\index.html` and inform the user the website is ready. No preview, no server, no browser check.

---

## Core Rules

1. **Design System First:** ALWAYS run `--design-system` before writing code.
2. **No Two Alike:** Every website must be structurally unique, driven by the business nature.
3. **No Emoji Icons:** SVGs only. Emojis acceptable ONLY in marketing copy text.
4. **No Browser Preview:** Never attempt to preview. Write correct code and deliver.
5. **No Image Generation:** Use CSS-based visuals. Never call `generate_image`.
6. **No Placeholder Numbers:** Use the user's number or default `917778876166`.
7. **Concise Output:** Keep HTML under 25KB. Use short class names, compress where possible.
8. **Mobile Perfect:** Default CSS is mobile-first. Responsive at 375/768/1024/1440px.
9. **Performance Aware:** Respect `prefers-reduced-motion`. Use effects sparingly when flagged.

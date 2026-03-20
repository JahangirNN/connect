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

## Execution Pipeline (Mandatory 4-Phase Process):

### Phase 1: AI-Powered Design System Generation (via ui-ux-pro-max)

Before writing any code, generate a complete design system using the `ui-ux-pro-max` skill.

#### Step 1.1: Analyze User Inputs
Extract the following from the user's business context:
- **Industry** (e.g., Jewelry, Gym, Cafe, Dry Fruits, Tech Startup)
- **Vibe/Style keywords** (e.g., luxurious, aggressive, modern, playful, artisan)
- **Product type** (e.g., e-commerce, service, portfolio, food, retail)

#### Step 1.2: Run Design System Generator (MANDATORY)
Use the search script to get a complete, AI-recommended design system:

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

This returns a complete design system with:
- **Pattern** — Recommended page structure and CTA placement
- **Style** — Visual style (e.g., Liquid Glass, Minimalism, Brutalism)
- **Colors** — Primary, Secondary, CTA, Background, Text hex values
- **Typography** — Heading + Body font pair with Google Fonts URL
- **Key Effects** — Recommended animations and micro-interactions
- **Anti-Patterns** — What to specifically avoid

#### Step 1.3: Supplement with Detailed Searches (as needed)
Get additional details for specific areas:

```bash
# Get UX best practices for the website
python .agent/skills/ui-ux-pro-max/scripts/search.py "animation accessibility" --domain ux

# Get alternative typography if the default doesn't fit
python .agent/skills/ui-ux-pro-max/scripts/search.py "elegant luxury serif" --domain typography

# Get landing page structure recommendations
python .agent/skills/ui-ux-pro-max/scripts/search.py "hero social-proof cta" --domain landing
```

#### Step 1.4: Finalize Design Decisions
Synthesize the AI output with your own analysis to finalize:
- **Color Palette:** Use the exact hex values from the design system output. Map them to CSS custom properties.
- **Typography:** Use the recommended Google Fonts pair. Load via `<link>` for performance.
- **Layout Paradigm:** Follow the recommended pattern (e.g., Feature-Rich Showcase, Hero-Centric, etc.)
- **Micro-interactions:** Implement the recommended key effects (e.g., fluid animations, morphing elements, dynamic blur).
- **Anti-patterns:** Actively avoid anything listed in the anti-patterns section.

---

### Phase 2: Folder Initialization & Asset Management
1. **Create Business Workspace:** Determine a suitable short name for the business (e.g., `apex_fitness`, `bapas_gems`). Create a dedicated directory: `c:\Users\Administrator\WorkPlace\connect\<business_name>`.
2. **Setup Assets:** Save or copy the user's provided Logo Image into this new directory (e.g., `c:\Users\Administrator\WorkPlace\connect\<business_name>\logo.png`). Document this relative path for the HTML generation.

**Expected Folder Structure:**
```text
c:\Users\Administrator\WorkPlace\connect\
└── <business_name>\
    ├── index.html    (Main website file)
    └── logo.png      (Business logo)
```

---

### Phase 3: Bespoke Code Generation
Write the entire website from scratch using a single file approach.

#### 3.1 Document Structure
Create `index.html` inside the business folder with proper SEO meta tags.

#### 3.2 Inject Tailored CSS (Design System ➜ Code)
Write high-quality, completely custom CSS that implements the design system from Phase 1.

**CSS Custom Properties (MANDATORY):** Always define your design system as CSS variables at the top:
```css
:root {
    /* Colors from ui-ux-pro-max design system */
    --primary: <from design system>;
    --secondary: <from design system>;
    --cta: <from design system>;
    --background: <from design system>;
    --text: <from design system>;
    
    /* Typography from ui-ux-pro-max design system */
    --heading-font: '<Heading Font>', serif;
    --body-font: '<Body Font>', sans-serif;
    
    /* Spacing tokens */
    --space-xs: 4px;
    --space-sm: 8px;
    --space-md: 16px;
    --space-lg: 24px;
    --space-xl: 32px;
    --space-2xl: 48px;
    --space-3xl: 64px;
    
    /* Shadow depths */
    --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
    --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
    --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
    --shadow-xl: 0 20px 25px rgba(0,0,0,0.15);
    
    /* Transition */
    --ease: cubic-bezier(.25, .46, .45, .94);
}
```

**Mobile-First Design is MANDATORY:**
- Structure the default CSS for mobile screens (375px+).
- Use `min-width` media queries (`@media (min-width: ...)`) to scale up for tablets and desktops.
- Test breakpoints: **375px** → **768px** → **1024px** → **1440px**.

**Mobile Navigation:**
- ALWAYS implement a functional hamburger menu for mobile devices.
- Use smooth transitions for open/close (300-400ms).

**Responsive Grids:**
- Use CSS Grid and Flexbox that automatically stack on mobile.
- NEVER use `display: none` to hide primary hero content or major sections on mobile; instead, refactor the layout to fit the screen.

**Hero Section:** Ensure the hero image and CTA are perfectly legible and impactful on small screens.

**Custom Components:** Design components tailored to the business (e.g., a jewelry carousel, a gym class timetable, a dry fruits product grid, etc.) based on what makes sense for the business.

#### 3.3 Draft Semantic Content
- Expand the provided bio/context into polished website copy (Hero section, About, Services/Features).
- Use the logo image (`<img src="logo.png">`) and any generated images appropriately. Ensure all image paths are relative to the business folder.

#### 3.4 Wire the CTA ("Book Now" / Contact)
- Implement a bold, accessible Call-To-Action button.
- **CRITICAL:** Use the phone number provided by the user. If no phone number is provided, always default to using `917778876166`.
- **For cafes and restaurants:** The "Book Now" button MUST open a custom modal/pop-up form. This form should collect details such as the event type (e.g., Birthday, Party), date, time, and number of people. Use JavaScript to capture the form values, construct a combined message, and redirect the user to a WhatsApp chat with the business owner: `https://wa.me/<PhoneNumberAsNumbersOnly>?text=<UrlEncodedMessage>`
- **For other businesses:** Format the link to instantly open a pre-filled WhatsApp chat: `https://wa.me/<PhoneNumberAsNumbersOnly>?text=Hello...`
- If an email is provided, use `mailto:<email>`.

#### 3.5 Final Output
Save the finalized code to `c:\Users\Administrator\WorkPlace\connect\<business_name>\index.html`.

---

### Phase 4: Quality Assurance (Pre-Delivery Checklist)

Before delivering the website, verify ALL items from the ui-ux-pro-max checklist:

#### Icons & Visual Elements
| Rule | ✅ Do | ❌ Don't |
|------|------|---------|
| **No emoji icons** | Use inline SVG icons (Heroicons, Lucide, or custom) | Use emojis like 🎨 🚀 ⚙️ 📍 📞 📸 as UI icons |
| **Stable hover states** | Use color/opacity/shadow transitions on hover | Use scale transforms that shift surrounding layout |
| **Consistent icon sizing** | Use fixed `viewBox="0 0 24 24"` with consistent width/height | Mix random icon sizes |

#### Interaction & Cursor
| Rule | ✅ Do | ❌ Don't |
|------|------|---------|
| **cursor: pointer** | Add `cursor: pointer` to ALL clickable elements (buttons, links, cards, CTAs) | Leave default cursor on interactive elements |
| **Hover feedback** | Provide visual feedback (color, shadow, border change) | No indication element is interactive |
| **Smooth transitions** | Use `transition: all 200ms ease` or similar (150-300ms) | Instant state changes or too slow (>500ms) |

#### Contrast & Readability
| Rule | ✅ Do | ❌ Don't |
|------|------|---------|
| **Text contrast** | Body text at minimum 4.5:1 contrast ratio (use dark text on light bg) | Use light gray text (#94A3B8) on white background |
| **Muted text** | For secondary text, minimum contrast of 3:1 | Use anything lighter than #6B7280 |
| **Glass/transparent elements** | Use `bg opacity >= 80%` for readability | Use `bg-white/10` where text needs to be read |

#### Layout & Spacing
| Rule | ✅ Do | ❌ Don't |
|------|------|---------|
| **Fixed navbar clearance** | Add `padding-top` to first section = navbar height | Let content hide behind fixed navbar |
| **Consistent max-width** | Use same `max-width` value across all sections | Mix different container widths randomly |
| **No horizontal scroll on mobile** | Test at 375px, ensure no overflow | Use fixed pixel widths that overflow on mobile |

#### Accessibility
| Rule | ✅ Do | ❌ Don't |
|------|------|---------|
| **Alt text** | All `<img>` elements must have descriptive `alt` text | Empty or missing alt attributes |
| **Form labels** | All form inputs must have visible `<label>` elements | Phantom inputs without labels |
| **Reduced motion** | Respect `prefers-reduced-motion: reduce` for animations | Force animations on users who disabled them |
| **Semantic HTML** | Use `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>` | Use only `<div>` for everything |

#### Final Responsive Check
- [ ] Tested at **375px** (mobile)
- [ ] Tested at **768px** (tablet)
- [ ] Tested at **1024px** (small desktop)
- [ ] Tested at **1440px** (large desktop)
- [ ] No horizontal scrollbar on any breakpoint
- [ ] Hamburger menu works correctly on mobile
- [ ] All images are properly sized and don't overflow
- [ ] CTAs are tapable on mobile (min 44x44px touch target)

---

## Core Rules

1. **Design System First:** ALWAYS run the ui-ux-pro-max design system generator before writing code. The generated palette, fonts, and style MUST be reflected in the final website.
2. **No Two Alike:** Ensure that no two websites generated by this pipeline look structurally identical. The design must be fundamentally driven by the nature of the business.
3. **No Emoji Icons:** Use inline SVGs for all icons. Emojis are acceptable ONLY in marketing copy text, never as UI elements.
4. **Mobile Perfect:** Every site MUST be verified for perfect mobile responsiveness at 375px minimum.
5. **Performance Aware:** If the design system flags performance warnings (e.g., heavy blur effects), use them sparingly and provide `prefers-reduced-motion` fallbacks.

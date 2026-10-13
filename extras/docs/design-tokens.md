# Design Tokens & Section Colour System

## 1. Final Palette Table & Semantic Tokens

The section palette uses clearly visible, solid, earthy colours that belong to the warm editorial identity (cream, ink, ochre) of *The Business Work*. Every token is configured in [`frontend/tailwind.config.ts`](../../frontend/tailwind.config.ts) and verified via automated WCAG contrast tests (`node frontend/scripts/contrast.mjs`).

| Token | Hex Value | Role & Description |
| :--- | :--- | :--- |
| `section-cream` | `#F7F4EE` | Light warm cream canvas (matches site `background`). Used for Hero, Why Us, Limits, and Service Hero. |
| `section-sand` | `#E8DDC8` | Deep warm sand tone. Used for Services, Capabilities, and Service FAQs. |
| `section-pine` | `#283730` | Deep dark pine green. Used for How We Work (Process), with crisp cream text and hairline dividers. |
| `section-clay` | `#EFD7C3` | Solid warm terracotta clay tone. Used for Industries and Service Use Cases. |
| `section-sage` | `#D9E3D6` | Muted natural sage green. Used for Demos (Work), Service How It Works, and Other Services. |
| `section-ochre` | `#A3512B` | Solid rich terracotta ochre. Used for the Final CTA (`#contact`) and Service CTA Banner. |
| `section-ink` | `#181716` | Deep neutral ink. Used exclusively for the site Footer (`footer`). |
| `on-pine` | `#F7F4EE` | Primary heading and step title text on `section-pine` (11.39:1 contrast). |
| `on-pine-muted` | `#C2CEC6` | Secondary body text and metadata labels on `section-pine` (7.70:1 contrast). |
| `on-ochre` | `#F7F4EE` | Primary text and button outline on `section-ochre` (5.08:1 contrast). |
| `on-ink` | `#F7F4EE` | Primary headers, logo, and copyright text on `section-ink` (16.31:1 contrast). |
| `on-ink-muted` | `#C7C2B8` | Navigation links and description copy on `section-ink` (10.09:1 contrast). |
| `ochre-on-dark` | `#E3A27E` | High-contrast light ochre accent for eyebrow labels and step numbers on dark sections (5.80:1 on pine, 8.30:1 on ink). |
| `accent-ochre` | `#A3512B` | Standard ochre accent for cards and cream backgrounds. |
| `accent-ochre-dark` | `#7A3A1C` | Deep calibrated ochre for small eyebrow labels and icons across light colored sections (sand, clay, sage, cream). |
| `surface-card` | `#FFFFFF` | Pure white card surface for cards placed on all section backgrounds. |
| `ink` | `#181716` | Primary body and heading ink colour. |
| `ink-muted` | `#646059` | Secondary editorial body copy colour. |
| `ink-faint` | `#6E6A62` | Footnotes and tertiary labels inside white cards. |
| `border-sand` | `#E4DFD5` | Section divider lines and card borders. |

---

## 2. Section Map

### Home Page (`/`)

| # | Section ID / Component | Background Token | Background Hex | Content & Foreground Styling |
| :-: | :--- | :--- | :--- | :--- |
| **0** | **Header** (`Header.tsx`) | `background/90` | `#F7F4EE` (90% blur) | Fixed translucent header; stays legible over every section while scrolling. |
| **1** | **Hero** (`Hero.tsx`) | `section-cream` | `#F7F4EE` | `ink` headlines, `ink-muted` subcopy, `surface-card` cards, `border-sand`. |
| **2** | **Services** (`Services.tsx`) | `section-sand` | `#E8DDC8` | `accent-ochre-dark` eyebrow & icons, `ink` titles, `surface-card` expanded panels. |
| **3** | **How We Work** (`Process.tsx`) | `section-pine` | `#283730` | DARK section: `on-pine` cream title, `ochre-on-dark` step tags, `on-pine-muted` body, hairline cream cell dividers (no white cards). |
| **4** | **Industries** (`Industries.tsx`) | `section-clay` | `#EFD7C3` | `accent-ochre-dark` eyebrow, `ink` titles, `surface-card` white cards with `border-sand` grid. |
| **5** | **Demos** (`Work.tsx`) | `section-sage` | `#D9E3D6` | `accent-ochre-dark` eyebrow, `surface-card` white cards, interactive flow/scope tabs. |
| **6** | **Why Us** (`Principles.tsx`) | `section-cream` | `#F7F4EE` | `surface-card` white cards, `accent-ochre` labels, `ink` titles. |
| **7** | **Final CTA** (`CTA.tsx`) | `section-ochre` | `#A3512B` | SOLID ochre: `section-cream` title & copy, cream primary button with ink hover, cream WhatsApp ghost button, underlined cream email. |
| **8** | **Footer** (`Footer.tsx`) | `section-ink` | `#181716` | DARK section: `section-cream` logo & titles, `on-ink-muted` links with cream hover, cream copyright. |

### Service Detail Pages (`/services/[slug]`)

| Area / Section | Background Token | Background Hex | Content Styling |
| :--- | :--- | :--- | :--- |
| **Hero Area** | `section-cream` | `#F7F4EE` | Breadcrumb, title, intro, problem card (`surface-card`). |
| **Capabilities** | `section-sand` | `#E8DDC8` | `accent-ochre-dark` eyebrow & checkmarks, white cards. |
| **Use Cases** | `section-clay` | `#EFD7C3` | `accent-ochre-dark` eyebrow, white scenario cards. |
| **How It Works** | `section-sage` | `#D9E3D6` | `accent-ochre-dark` eyebrow & step labels, white cards. |
| **Limits & What to Know** | `section-cream` | `#F7F4EE` | White card banner with warning icon. |
| **Frequently Asked Questions** | `section-sand` | `#E8DDC8` | `accent-ochre-dark` eyebrow, expandable white accordion cards. |
| **CTA Banner** | `section-ochre` (card) | Inner `#A3512B` | Cream heading, cream description, cream button with ink hover. |
| **Other Services** | `section-sage` | `#D9E3D6` | Links to other service pages in white cards. |
| **Footer** | `section-ink` | `#181716` | Dark ink footer with cream text and underlined links. |

### Legal & Utility Pages (`/privacy`, `/terms`, `/not-found`)
- Rendered on plain cream (`section-cream` / `#F7F4EE`) canvas with the same dark ink footer to preserve legal readability.

---

## 3. Contrast Verification Table

Verified via automated test runner `node frontend/scripts/contrast.mjs`:

| Foreground Token | Background Token | Context | Contrast Ratio | WCAG Normal (4.5:1) | Large / UI (3.0:1) |
| :--- | :--- | :--- | :---: | :---: | :---: |
| `ink` (`#181716`) | `background` (`#F7F4EE`) | Body text on background | 16.31:1 | PASS | PASS |
| `ink` (`#181716`) | `surface-card` (`#FFFFFF`) | Body text on card | 17.90:1 | PASS | PASS |
| `ink-muted` (`#646059`) | `background` (`#F7F4EE`) | Muted text on background | 5.69:1 | PASS | PASS |
| `ink-muted` (`#646059`) | `surface-card` (`#FFFFFF`) | Muted text on card | 6.25:1 | PASS | PASS |
| `ink-faint` (`#6E6A62`) | `surface-card` (`#FFFFFF`) | Faint text on card | 5.38:1 | PASS | PASS |
| `accent-ochre` (`#A3512B`) | `background` (`#F7F4EE`) | Ochre text on background | 5.08:1 | PASS | PASS |
| `accent-ochre` (`#A3512B`) | `surface-card` (`#FFFFFF`) | Ochre text on card | 5.57:1 | PASS | PASS |
| `accent-ochre-dark` (`#7A3A1C`) | `background` (`#F7F4EE`) | Dark ochre on background | 7.81:1 | PASS | PASS |
| `background` (`#F7F4EE`) | `ink` (`#181716`) | Light text on dark button | 16.31:1 | PASS | PASS |
| `white` (`#FFFFFF`) | `ink` (`#181716`) | White text on dark button | 17.90:1 | PASS | PASS |
| `ink` (`#181716`) | `section-cream` (`#F7F4EE`) | Headings & body on section-cream | 16.31:1 | PASS | PASS |
| `ink-muted` (`#646059`) | `section-cream` (`#F7F4EE`) | Muted text on section-cream | 5.69:1 | PASS | PASS |
| `accent-ochre` (`#A3512B`) | `section-cream` (`#F7F4EE`) | Eyebrow & icons on section-cream | 5.08:1 | PASS | PASS |
| `accent-ochre-dark` (`#7A3A1C`) | `section-cream` (`#F7F4EE`) | Dark ochre on section-cream | 7.81:1 | PASS | PASS |
| `ink` (`#181716`) | `section-sand` (`#E8DDC8`) | Headings & body on section-sand | 13.31:1 | PASS | PASS |
| `ink-muted` (`#646059`) | `section-sand` (`#E8DDC8`) | Muted text on section-sand | 4.65:1 | PASS | PASS |
| `accent-ochre-dark` (`#7A3A1C`) | `section-sand` (`#E8DDC8`) | Eyebrow label & icon on section-sand | 6.37:1 | PASS | PASS |
| `surface-card` (`#FFFFFF`) | `section-sand` (`#E8DDC8`) | White cards on section-sand | 1.35:1 | PASS | PASS |
| `ink` (`#181716`) | `surface-card` (`#FFFFFF`) | Body inside cards on section-sand | 17.90:1 | PASS | PASS |
| `ink-muted` (`#646059`) | `surface-card` (`#FFFFFF`) | Muted text inside cards on section-sand | 6.25:1 | PASS | PASS |
| `on-pine` (`#F7F4EE`) | `section-pine` (`#283730`) | Title & step heading on section-pine | 11.39:1 | PASS | PASS |
| `on-pine-muted` (`#C2CEC6`) | `section-pine` (`#283730`) | Body copy & output labels on section-pine | 7.70:1 | PASS | PASS |
| `ochre-on-dark` (`#E3A27E`) | `section-pine` (`#283730`) | Step number & eyebrow on section-pine | 5.80:1 | PASS | PASS |
| `on-pine` (`#F7F4EE`) | `section-pine` (`#283730`) | Hairline cell dividers on section-pine | 11.39:1 | PASS | PASS |
| `on-pine` (`#F7F4EE`) | `section-pine` (`#283730`) | Focus-visible ring on section-pine | 11.39:1 | PASS | PASS |
| `ink` (`#181716`) | `section-clay` (`#EFD7C3`) | Headings & body on section-clay | 12.94:1 | PASS | PASS |
| `ink-muted` (`#646059`) | `section-clay` (`#EFD7C3`) | Muted text on section-clay | 4.52:1 | PASS | PASS |
| `accent-ochre-dark` (`#7A3A1C`) | `section-clay` (`#EFD7C3`) | Eyebrow label on section-clay | 6.20:1 | PASS | PASS |
| `surface-card` (`#FFFFFF`) | `section-clay` (`#EFD7C3`) | White cards on section-clay | 1.38:1 | PASS | PASS |
| `ink` (`#181716`) | `surface-card` (`#FFFFFF`) | Body inside cards on section-clay | 17.90:1 | PASS | PASS |
| `ink-muted` (`#646059`) | `surface-card` (`#FFFFFF`) | Muted text inside cards on section-clay | 6.25:1 | PASS | PASS |
| `ink` (`#181716`) | `section-sage` (`#D9E3D6`) | Headings & body on section-sage | 13.56:1 | PASS | PASS |
| `ink-muted` (`#646059`) | `section-sage` (`#D9E3D6`) | Muted text on section-sage | 4.74:1 | PASS | PASS |
| `accent-ochre-dark` (`#7A3A1C`) | `section-sage` (`#D9E3D6`) | Eyebrow label on section-sage | 6.49:1 | PASS | PASS |
| `surface-card` (`#FFFFFF`) | `section-sage` (`#D9E3D6`) | White cards on section-sage | 1.32:1 | PASS | PASS |
| `ink` (`#181716`) | `surface-card` (`#FFFFFF`) | Body inside cards on section-sage | 17.90:1 | PASS | PASS |
| `ink-muted` (`#646059`) | `surface-card` (`#FFFFFF`) | Muted text inside cards on section-sage | 6.25:1 | PASS | PASS |
| `ink` (`#181716`) | `surface-card` (`#FFFFFF`) | Card title in Principles | 17.90:1 | PASS | PASS |
| `accent-ochre` (`#A3512B`) | `surface-card` (`#FFFFFF`) | Card eyebrow label in Principles | 5.57:1 | PASS | PASS |
| `ink-muted` (`#646059`) | `surface-card` (`#FFFFFF`) | Card body text in Principles | 6.25:1 | PASS | PASS |
| `on-ochre` (`#F7F4EE`) | `section-ochre` (`#A3512B`) | Heading & subcopy on section-ochre | 5.08:1 | PASS | PASS |
| `white` (`#FFFFFF`) | `section-ochre` (`#A3512B`) | White text & hover on section-ochre | 5.57:1 | PASS | PASS |
| `ink` (`#181716`) | `section-cream` (`#F7F4EE`) | Primary CTA button text on cream background | 16.31:1 | PASS | PASS |
| `section-cream` (`#F7F4EE`) | `ink` (`#181716`) | Primary CTA button text on hover ink background | 16.31:1 | PASS | PASS |
| `on-ochre` (`#F7F4EE`) | `section-ochre` (`#A3512B`) | WhatsApp ghost button outline & text | 5.08:1 | PASS | PASS |
| `on-ochre` (`#F7F4EE`) | `section-ochre` (`#A3512B`) | Underlined email link on section-ochre | 5.08:1 | PASS | PASS |
| `on-ochre` (`#F7F4EE`) | `section-ochre` (`#A3512B`) | Focus-visible ring on section-ochre | 5.08:1 | PASS | PASS |
| `on-ink` (`#F7F4EE`) | `section-ink` (`#181716`) | Logo, headers & copyright on section-ink | 16.31:1 | PASS | PASS |
| `on-ink-muted` (`#C7C2B8`) | `section-ink` (`#181716`) | Muted copy & nav links on section-ink | 10.09:1 | PASS | PASS |
| `ochre-on-dark` (`#E3A27E`) | `section-ink` (`#181716`) | Accent hover & highlights on section-ink | 8.30:1 | PASS | PASS |
| `on-ink` (`#F7F4EE`) | `section-ink` (`#181716`) | Focus-visible ring on section-ink | 16.31:1 | PASS | PASS |
| `section-cream` (`#F7F4EE`) | `section-pine` (`#283730`) | Assistant cream ring over pine | 11.39:1 | PASS | PASS |
| `section-cream` (`#F7F4EE`) | `section-ochre` (`#A3512B`) | Assistant cream ring over ochre | 5.08:1 | PASS | PASS |
| `section-cream` (`#F7F4EE`) | `section-ink` (`#181716`) | Assistant cream ring over ink | 16.31:1 | PASS | PASS |
| `ink` (`#181716`) | `section-sand` (`#E8DDC8`) | Assistant ink body over sand | 13.31:1 | PASS | PASS |
| `ink` (`#181716`) | `section-clay` (`#EFD7C3`) | Assistant ink body over clay | 12.94:1 | PASS | PASS |
| `ink` (`#181716`) | `section-sage` (`#D9E3D6`) | Assistant ink body over sage | 13.56:1 | PASS | PASS |
| `ink` (`#181716`) | `section-cream` (`#F7F4EE`) | Assistant ink body over cream | 16.31:1 | PASS | PASS |

---

## 4. How to Change a Section's Colour

To modify the background colour of any section:

1. **Locate the Component**: Find the section component in `frontend/src/components/` (e.g. `Principles.tsx`) or `frontend/src/app/services/[slug]/page.tsx`.
2. **Edit the Section Wrapper Class**: Replace the existing semantic background token on the `<section>` element:
   - `bg-section-cream` (Cream `#F7F4EE`)
   - `bg-section-sand` (Deep Sand `#E8DDC8`)
   - `bg-section-pine` (Dark Pine Green `#283730`)
   - `bg-section-clay` (Terracotta Clay `#EFD7C3`)
   - `bg-section-sage` (Sage `#D9E3D6`)
   - `bg-section-ochre` (Solid Ochre `#A3512B`)
   - `bg-section-ink` (Dark Ink `#181716`)
3. **Verify Contrast**: Run the automated contrast check:
   ```bash
   node frontend/scripts/contrast.mjs
   ```
   Ensure every pair prints `PASS`.
4. **Card & Text Guidelines**:
   - Cards placed inside light sections should continue using `bg-surface-card` (white) with `border-border-sand`.
   - On dark sections (`section-pine`, `section-ink`), use `text-section-cream` or `text-on-pine` / `text-on-ink` for headings, `text-on-pine-muted` / `text-on-ink-muted` for body, and `text-ochre-on-dark` for eyebrows.
   - Never use ad-hoc hex values; always reference Tailwind semantic tokens.

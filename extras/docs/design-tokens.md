# Design Tokens & Section Colour System

## 1. Palette & Semantic Tokens

The section palette builds upon the warm editorial identity (cream, ink, ochre) of *The Business Work*. Every token is configured in [`frontend/tailwind.config.ts`](../../frontend/tailwind.config.ts) and verified via automated WCAG contrast tests.

| Token | Hex Value | Role & Description |
| :--- | :--- | :--- |
| `section-cream` | `#F7F4EE` | Default warm editorial canvas (matches site `background`). Used for Hero, How We Work, Demos, and Service hero/content. |
| `section-sand` | `#EFEBE1` | Neutral warm tone (matches `surface-muted`). Used for Services, Footer, and Service capabilities/how-it-works/FAQ. |
| `section-ochre` | `#F5EBE1` | Very light ochre tint tuned for full WCAG AA normal text compliance (>= 4.5:1 with `ink-faint`). Used for Industries. |
| `section-sage` | `#E8EDE5` | Very light sage tint tuned for full WCAG AA normal text compliance (>= 4.5:1 with `ink-faint`). Used for Principles (Why Us). |
| `section-ink` | `#181716` | Deep neutral ink. Used exclusively for the single dark CTA section (`#contact`) and service CTA banner. |
| `ochre-on-dark` | `#E0A27F` | High-contrast lighter ochre accent for text, links, and hover states over `section-ink` (8.22:1 contrast ratio). |
| `surface-card` | `#FFFFFF` | Pure white card surface for cards placed on all section backgrounds. |
| `accent-ochre` | `#A3512B` | Primary warm ochre accent for eyebrows, step markers, and status indicators. |
| `accent-ochre-dark` | `#8F4524` | Darker ochre variant for small text where enhanced contrast is needed. |
| `ink` | `#181716` | Primary body and heading ink colour. |
| `ink-muted` | `#646059` | Secondary editorial body copy and description colour. |
| `ink-faint` | `#6E6A62` | Footnotes, tertiary labels, and quiet metadata. |
| `border-sand` | `#E4DFD5` | 1px section borders, table borders, and divider lines. |

---

## 2. Section Map

### Home Page (`/`)

| Section ID / Component | Background Token | Background Hex | Foreground Text & Cards |
| :--- | :--- | :--- | :--- |
| **Header** (`Header.tsx`) | `section-cream/90` | `#F7F4EE` (90% blur) | `ink`, `ink-muted`; remains clear over any section scroll. |
| **Hero** (`Hero.tsx`) | `section-cream` | `#F7F4EE` | `ink` headlines, `ink-muted` subcopy, `surface-card` cards. |
| **Services** (`Services.tsx`) | `section-sand` | `#EFEBE1` | `ink` headlines, `ink-muted` subcopy, `surface-card` cards. |
| **How We Work** (`Process.tsx`) | `section-cream` | `#F7F4EE` | `ink` step titles, `accent-ochre` eyebrow, `border-sand` borders. |
| **Industries** (`Industries.tsx`) | `section-ochre` | `#F5EBE1` | `ink` titles, `surface-card` cards with `border-sand` separation. |
| **Demos** (`Work.tsx`) | `section-cream` | `#F7F4EE` | `surface-card` white cards, `accent-ochre` tags, `ink` headlines. |
| **Why Us** (`Principles.tsx`) | `section-sage` | `#E8EDE5` | `surface-card` white cards, `accent-ochre` labels, `ink` titles. |
| **Final CTA** (`CTA.tsx`) | `section-ink` | `#181716` | `section-cream` text & buttons, `ochre-on-dark` hovers, cream focus ring. |
| **Footer** (`Footer.tsx`) | `section-sand` | `#EFEBE1` | `ink-muted` links, `border-sand` top border. |

### Service Detail Pages (`/services/[slug]`)

| Area / Section | Background Token | Background Hex | Content Styling |
| :--- | :--- | :--- | :--- |
| **Hero Area** | `section-cream` | `#F7F4EE` | Breadcrumb navigation, title, intro, and problem card. |
| **Capabilities** | `section-sand` | `#EFEBE1` | Checkmarks and white `surface-card` cards. |
| **Use Cases** | `section-cream` | `#F7F4EE` | Numbered scenario cards in `surface-card`. |
| **How It Works** | `section-sand` | `#EFEBE1` | 4-step implementation cards in `surface-card`. |
| **Limits & What to Know** | `section-cream` | `#F7F4EE` | Warning banner and list items. |
| **Frequently Asked Questions** | `section-sand` | `#EFEBE1` | Expandable accordion items in `surface-card`. |
| **CTA Banner** | `section-cream` (outer) / `section-ink` (card) | Outer `#F7F4EE`, Inner `#181716` | Cream heading, sand description, cream button with ochre hover. |
| **Other Services** | `section-sand` | `#EFEBE1` | Links to other service pages with white cards. |
| **Footer** | `section-sand` | `#EFEBE1` | Site navigation and legal links. |

### Legal & Utility Pages (`/privacy`, `/terms`, `/not-found`)
- Rendered on plain cream (`section-cream` / `#F7F4EE`) canvas with no alternating background colours to preserve editorial readability.

---

## 3. Contrast Verification Table

Verified via automated test runner `node frontend/scripts/contrast.mjs`:

| Foreground Token | Background Token | Contrast Ratio | WCAG Normal (4.5:1) | WCAG Large (3.0:1) |
| :--- | :--- | :---: | :---: | :---: |
| `ink` (`#181716`) | `section-cream` (`#F7F4EE`) | 16.31:1 | PASS | PASS |
| `ink-muted` (`#646059`) | `section-cream` (`#F7F4EE`) | 5.69:1 | PASS | PASS |
| `ink-faint` (`#6E6A62`) | `section-cream` (`#F7F4EE`) | 4.90:1 | PASS | PASS |
| `accent-ochre` (`#A3512B`) | `section-cream` (`#F7F4EE`) | 5.08:1 | PASS | PASS |
| `accent-ochre-dark` (`#8F4524`) | `section-cream` (`#F7F4EE`) | 6.28:1 | PASS | PASS |
| `ink` (`#181716`) | `section-sand` (`#EFEBE1`) | 15.04:1 | PASS | PASS |
| `ink-muted` (`#646059`) | `section-sand` (`#EFEBE1`) | 5.25:1 | PASS | PASS |
| `ink-faint` (`#6E6A62`) | `section-sand` (`#EFEBE1`) | 4.52:1 | PASS | PASS |
| `accent-ochre` (`#A3512B`) | `section-sand` (`#EFEBE1`) | 4.68:1 | PASS | PASS |
| `accent-ochre-dark` (`#8F4524`) | `section-sand` (`#EFEBE1`) | 5.79:1 | PASS | PASS |
| `ink` (`#181716`) | `section-ochre` (`#F5EBE1`) | 15.22:1 | PASS | PASS |
| `ink-muted` (`#646059`) | `section-ochre` (`#F5EBE1`) | 5.31:1 | PASS | PASS |
| `ink-faint` (`#6E6A62`) | `section-ochre` (`#F5EBE1`) | 4.58:1 | PASS | PASS |
| `accent-ochre` (`#A3512B`) | `section-ochre` (`#F5EBE1`) | 4.74:1 | PASS | PASS |
| `accent-ochre-dark` (`#8F4524`) | `section-ochre` (`#F5EBE1`) | 5.86:1 | PASS | PASS |
| `ink` (`#181716`) | `section-sage` (`#E8EDE5`) | 15.07:1 | PASS | PASS |
| `ink-muted` (`#646059`) | `section-sage` (`#E8EDE5`) | 5.26:1 | PASS | PASS |
| `ink-faint` (`#6E6A62`) | `section-sage` (`#E8EDE5`) | 4.53:1 | PASS | PASS |
| `accent-ochre` (`#A3512B`) | `section-sage` (`#E8EDE5`) | 4.69:1 | PASS | PASS |
| `accent-ochre-dark` (`#8F4524`) | `section-sage` (`#E8EDE5`) | 5.81:1 | PASS | PASS |
| `section-cream` (`#F7F4EE`) | `section-ink` (`#181716`) | 16.31:1 | PASS | PASS |
| `white` (`#FFFFFF`) | `section-ink` (`#181716`) | 17.90:1 | PASS | PASS |
| `ochre-on-dark` (`#E0A27F`) | `section-ink` (`#181716`) | 8.22:1 | PASS | PASS |
| `border-sand` (`#E4DFD5`) | `section-ink` (`#181716`) | 13.48:1 | PASS | PASS |
| `surface-muted` (`#EFEBE1`) | `section-ink` (`#181716`) | 15.04:1 | PASS | PASS |
| `ink` (`#181716`) | `section-cream` (`#F7F4EE`) | 16.31:1 | PASS | PASS |
| `ink` (`#181716`) | `ochre-on-dark` (`#E0A27F`) | 8.22:1 | PASS | PASS |

---

## 4. How to Change a Section Colour

To modify the background colour of any section:

1. **Locate the Component**: Find the section component in `frontend/src/components/` (e.g. `Principles.tsx`) or `frontend/src/app/services/[slug]/page.tsx`.
2. **Edit the Section Wrapper Class**: Replace the existing semantic class (e.g., `bg-section-sage`) with another token defined in `tailwind.config.ts`:
   - `bg-section-cream`
   - `bg-section-sand`
   - `bg-section-ochre`
   - `bg-section-sage`
   - `bg-section-ink`
3. **Verify Contrast**: If altering token hex definitions, run the automated contrast check:
   ```bash
   node frontend/scripts/contrast.mjs
   ```
   Ensure all pairs output `PASS`.
4. **Card & Text Guidelines**:
   - Cards placed inside sections should continue using `bg-surface-card` (white) with `border-border-sand`.
   - Never use ad-hoc hex values; always reference Tailwind semantic tokens.

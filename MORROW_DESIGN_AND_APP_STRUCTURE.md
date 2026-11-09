# Morrow — Design Direction & Application Structure

> **Document purpose:** This file explains the design intent, visual system, page composition, shared UI, and technical structure of the current Morrow frontend. It is intended to help a developer understand, maintain, present, and extend the application.

## 1. Product overview

**Morrow** is a fictional SaaS product: a calm, considered workspace for teams to plan priorities, coordinate work, and keep momentum visible. Its central promise is to help teams spend less time managing the work around work and more time doing meaningful work.

The product concept is expressed through two connected experiences:

1. **A multi-page marketing website** that explains the product, its workflow, audiences, pricing, and philosophy.
2. **An interactive product preview** that demonstrates how a team might use a Morrow workspace. The preview uses sample data and frontend state; it is not connected to a live service.

The website is an original interpretation of the assignment's design-study references. It does not reproduce Linear, Raycast, or Framer pixel-for-pixel.

---

## 2. Design direction

### Design objective

Create a premium, modern SaaS experience that feels focused and welcoming rather than loud or overly decorative. The visual system should communicate clarity, momentum, and trust. Each page has its own composition and personality, but all pages should still feel like parts of the same Morrow product.

### How the three references inform Morrow

| Reference | Principle studied | How it is translated into Morrow |
|---|---|---|
| **Linear** | Minimal UI, typography, smooth interactions, clean layouts | Restrained borders, clear hierarchy, compact metadata, a practical three-pane workspace preview, status labels, and contextual issue details. |
| **Raycast** | Creative visuals, animation, premium product experience | A keyboard-oriented search/command experience, strong headline treatment, dark product atmosphere, and interactions that are intended to feel immediate. |
| **Framer** | Creative layouts, micro-interactions, modern landing-page patterns | Varied page compositions, a monitor-style product presentation, floating visual elements, editorial typography, and deliberate section transitions. |

The references are used as **design principles**, not as templates to copy. Morrow keeps its own product concept, wording, brand mark, layouts, and interaction patterns.

### Core design principles

- **Clarity over noise:** Keep hierarchy obvious and remove decoration that does not help a user understand the page.
- **Product before ornament:** Product UI previews should explain the product, not merely act as decoration.
- **Purposeful motion:** Animation should communicate state, guide attention, or add feedback. It should not make the interface harder to use.
- **Distinct pages, shared system:** Pages should differ in composition and storytelling while reusing the same navigation, typography logic, buttons, spacing rules, and interaction conventions.
- **Responsive by design:** Layouts should adapt for smaller screens instead of shrinking desktop compositions until they become cramped.

---

## 3. Visual identity and design system

### Base color system

The implementation uses CSS custom properties in `app/globals.css`. The default theme is dark; a light theme is also available.

| Token | Dark theme | Light theme | Use |
|---|---|---|---|
| `--bg` | `#101210` | `#F4F5EF` | Main page background |
| `--bg-soft` | `#151815` | `#EBECE5` | Alternate section background |
| `--surface` | `#191D19` | `#FFFFFF` | Cards and primary surfaces |
| `--surface-raised` | `#20251F` | `#F6F7F1` | Raised/interactive surfaces |
| `--surface-soft` | `#1A1F1A` | `#EBEEE5` | Subtle surface variation |
| `--text` | `#F0F2E9` | `#1B2118` | Primary text |
| `--text-soft` | `#C0C5B9` | `#51594D` | Secondary text |
| `--muted` | `#858D7F` | `#71796C` | Supporting copy |
| `--line` | `rgba(221, 232, 207, 0.105)` | `rgba(37, 48, 30, 0.11)` | Subtle dividers |
| `--accent` | `#D3EE86` | `#B1D65D` | Primary accent and actions |
| `--violet` | `#A9A0EE` | `#766DBD` | Secondary accent |
| `--green` | `#A9D4A2` | `#548B58` | Positive/progress states |
| `--amber` | `#E8C78B` | `#AA7B32` | Secondary status accent |

The overall foundation is **deep charcoal with moss/lime accents**. Violet, lavender, sage, muted gold, and warm ivory appear as route-specific accents. The About page deliberately uses a warm ivory hero to create an editorial contrast with the darker product-led pages.

### Route-specific visual signatures

| Page | Visual character | Distinguishing elements |
|---|---|---|
| Home | Centered, minimal, product-led | Large headline, compact search launcher, workspace preview, manifesto, feature highlights, workflow tabs, pricing preview, closing CTA |
| Product | Technical/editorial split layout | Grid-line background, left-aligned message, lavender-accented momentum visualization, floating task cards, large workspace preview |
| How it works | Process-led editorial layout | Warm muted-gold accents, visible vertical three-step track, workflow switcher, rhythm cards, scrolling text ticker |
| For teams | Collaborative and people-oriented | Sage-green accents, orbit/constellation graphic, role-specific cards, shared-principles section |
| Pricing | Structured and conversion-focused | Dark olive/lime hero, plan-promise panel, pricing comparison, FAQ, reassurance strip |
| About | Warm editorial manifesto | Ivory hero, oversized type, orbit/asterisk graphic, manifesto statement, principles, dark closing CTA |

### Typography

- **Primary UI and body type:** system sans-serif stack beginning with `Segoe UI Variable`, then Aptos, Helvetica Neue, and system fallbacks.
- **Display accent:** Georgia/Times serif italic is used selectively for highlighted words and phrases.
- **Headings:** Large, tightly tracked display text establishes hierarchy. Responsive `clamp()` sizing is used for major headings.
- **Eyebrows and metadata:** Small uppercase labels with expanded letter spacing provide section numbering, context, and product metadata.
- **Body copy:** Muted text color and generous line-height keep supporting descriptions readable against dark surfaces.

No external font download is required by the current implementation.

### Layout and surface language

- Main content uses a centered container with a maximum width of approximately `1160px` and responsive side gutters.
- The navigation shell uses a wider container of approximately `1280px`.
- The shared header is `76px` high, sticky, and uses a translucent background with backdrop blur.
- Sections commonly use generous vertical spacing; the shared `.section-pad` utility starts at `132px` top and bottom on wide screens, with responsive overrides.
- Cards use restrained borders, dark/soft surfaces, moderate corner radii, and subtle shadows rather than heavy glass effects everywhere.
- The product preview uses denser information layout than the marketing pages, reflecting the practical workspace UI studied in Linear.

---

## 4. Page-by-page structure

### `/` — Home

**Purpose:** Introduce Morrow and give visitors a high-level understanding of the product.

**Structure:**
1. Hero with `HeroCommand`, headline, supporting copy, calls to action, and product preview.
2. Customer-style logo strip using illustrative names.
3. Manifesto section explaining the product philosophy.
4. Feature section with differentiated capability highlights.
5. Interactive workflow section using `WorkflowSwitcher`.
6. Quote/philosophy panel.
7. Pricing preview using `PricingCards`.
8. Closing signup call to action.

**Design role:** The broadest overview of the brand. It uses a centered composition and brings the product UI into the first screenful so visitors see the product early.

### `/product` — Product

**Purpose:** Explain what the Morrow workspace contains and let visitors explore its interface.

**Structure:**
1. Split hero with product introduction on the left and a momentum visualization on the right.
2. Product metadata/reassurance strip.
3. Large monitor-style product presentation using `ProductPreview`.
4. Capability section with four product benefits.
5. Closing product CTA.

**Design role:** The most product-focused page. It moves from a high-level product promise into the interactive workspace itself.

### `/how-it-works` — How it works

**Purpose:** Explain the workflow Morrow is designed to support.

**Structure:**
1. Editorial hero with a visible three-step track: Plan, Move, Learn.
2. Animated/scrolling rhythm ticker.
3. Interactive workflow tabs using `WorkflowSwitcher`.
4. Three explanatory rhythm cards.
5. Closing CTA linking visitors toward the product and pricing.

**Design role:** A process narrative rather than a feature catalogue. The vertical track and step cards make the methodology easy to scan.

### `/teams` — For teams

**Purpose:** Show how the same workspace can support different roles.

**Structure:**
1. Split hero with headline and role-constellation illustration.
2. Compact supporting strip.
3. Role-specific grid for four team audiences (as defined in the page data).
4. Shared-context principle section.
5. Closing CTA.

**Design role:** People-oriented and collaborative. Its sage-green accents and constellation graphic distinguish it from the product and pricing pages.

### `/pricing` — Pricing

**Purpose:** Present the illustrative plans and answer common pricing questions.

**Structure:**
1. Pricing hero with a clear headline and a Morrow promise panel.
2. Audience/plan reassurance strip.
3. Pricing cards using `PricingCards`.
4. FAQ list built with native disclosure elements.
5. Trust/reassurance strip with links to the product page.

**Design role:** Conversion-focused and information-forward. The billing control switches the displayed monthly/yearly prices. Pricing is demonstration content and is not connected to a payment provider.

### `/about` — Our approach

**Purpose:** Explain the beliefs behind Morrow and give the brand a point of view.

**Structure:**
1. Warm ivory editorial hero with oversized typography and orbital asterisk graphic.
2. Manifesto section.
3. Three brand-principle cards.
4. Dark closing CTA.

**Design role:** The most editorial page. The warm hero deliberately changes the visual temperature while remaining connected to Morrow's typography, motifs, and messaging.

---

## 5. Application architecture

### Routing model

The application uses the **Next.js App Router**. Each top-level route lives in its own `app/<route>/page.tsx` file. The root layout provides the document shell, global stylesheet, metadata, and route-scroll behavior.

```text
app/
├── layout.tsx                 Root layout, metadata, global CSS, route scroll reset
├── globals.css               Design tokens, component styles, page styles, responsive rules
├── page.tsx                  Home route: /
├── product/
│   └── page.tsx              /product
├── how-it-works/
│   └── page.tsx              /how-it-works
├── teams/
│   └── page.tsx              /teams
├── pricing/
│   └── page.tsx              /pricing
└── about/
    └── page.tsx              /about

components/
├── marketing-shell.tsx       Shared header, command launcher, scroll effects, and footer
├── site-header.tsx           Navigation, theme control, command palette and shortcut launcher
├── site-footer.tsx           Shared footer and route links
├── route-scroll-reset.tsx    Resets scroll position on route changes
├── scroll-effects.tsx        One-time scroll reveal effects
├── hero-command.tsx          Home hero's quick-search launcher
├── product-preview.tsx       Interactive product workspace preview
├── workflow-switcher.tsx     Interactive Plan / Move / Learn workflow tabs
├── pricing-cards.tsx         Pricing plans and billing toggle
├── signup-modal.tsx          Early-access dialog and client-side form feedback
├── signup-trigger.tsx        Reusable trigger for opening the signup dialog
└── page-intro.tsx            Reusable page-intro component
```

### Shared page shell

Every route is wrapped with `MarketingShell`. It keeps the common site chrome consistent:

- `SiteHeader` provides the brand link, route navigation, responsive menu, theme toggle, and signup entry point.
- `ShortcutLauncher` listens for the global keyboard shortcut and controls the command palette.
- `ScrollEffects` activates reveal effects for marked content as it enters the viewport.
- `SiteFooter` provides shared navigation and footer content.

The page body itself remains route-specific. This is intentional: shared chrome creates continuity, while distinct page compositions prevent the site from feeling like the same template repeated six times.

### Component responsibilities

| Component | Responsibility | Interaction/state |
|---|---|---|
| `SiteHeader` | Global navigation and header actions | Current route, responsive menu, theme, signup modal |
| `CommandPalette` (in `site-header.tsx`) | Searchable quick navigation | Search query, active command, keyboard selection, route navigation, theme and signup commands |
| `ProductPreview` | Simulated Morrow workspace | Selected issue, issue completion/status, list/board view, assignee filter, selected project, contextual details |
| `WorkflowSwitcher` | Demonstrates Plan / Move / Learn | Active tab and associated explanatory content |
| `PricingCards` | Renders plans and billing options | Monthly/yearly billing selection |
| `SignupModal` | Early-access signup interaction | Open/close state, form validation, success feedback, focus and Escape handling |
| `ScrollEffects` | Scroll-based reveal treatment | Intersection Observer and one-time reveal state |
| `RouteScrollReset` | Navigation scroll behavior | Watches pathname changes and resets scroll position while allowing hash navigation |

### Server and client boundaries

The route pages and root layout are primarily server-rendered React components. Browser-dependent behavior is isolated in client components where needed, such as the header, command palette, product preview, workflow switcher, pricing toggle, signup modal, and scroll utilities.

This keeps the page composition straightforward and avoids making every page a client component just to support a few interactive controls.

---

## 6. Global interactions and behavior

### Navigation

- Internal page links navigate between the six routes.
- The active route is reflected in the main navigation.
- The mobile navigation collapses into a responsive menu.
- Route changes reset the document scroll position to the top.
- In-page hash links remain available for section navigation.

### Command palette

- Open with `Ctrl + K` on Windows/Linux or `Cmd + K` on macOS.
- Search filters the available commands.
- `ArrowUp` and `ArrowDown` move through filtered commands.
- `Home` and `End` jump to the first and last command.
- `Enter` executes the active command.
- `Escape` closes the palette.
- Commands include route navigation and site actions such as theme switching and opening signup.

### Theme

- Dark mode is the default presentation.
- Light mode uses its own surface, text, border, and accent tokens rather than simply inverting colors.
- The selected theme is stored in `localStorage` under `morrow-theme`.

### Product preview

- Selecting an issue updates the contextual details panel.
- Completing an issue updates its status presentation.
- The preview supports List and Board modes.
- An assignee filter and project navigation update the displayed context.
- Search can call into the global command palette.

### Workflow, pricing, and signup

- Workflow tabs switch the active step/content.
- Pricing can switch between monthly and yearly billing display.
- Signup calls open a modal with client-side validation and a success state.
- These are frontend demonstration interactions; none submits to a production backend.

### Motion

- CSS transitions and keyframe animations handle most motion.
- `ScrollEffects` uses the Intersection Observer API for reveal-on-scroll behavior.
- Reveals are designed to happen once and remain visible when the visitor scrolls back upward.
- Reduced-motion preferences are respected by the styling/scroll effects.

---

## 7. Responsive strategy

The application is designed for desktop, tablet, and mobile layouts.

- **Desktop:** Full navigation, multi-column hero sections, detailed dashboard preview, and multi-column card layouts.
- **Tablet:** Grid columns and spacing compress; hero compositions and product artwork scale to preserve hierarchy.
- **Mobile:** Navigation becomes compact, split heroes stack vertically, card grids collapse, and the workspace preview prioritizes the primary task content over secondary panels.

The intent is to preserve the content hierarchy and primary actions on smaller screens, not to force every desktop detail into a narrow viewport.

Important QA widths to check before submission: **1440px, 1024px, 768px, and 390px**. Also verify at least one narrower mobile width and one large desktop width.

---

## 8. Accessibility and usability considerations

The implementation includes or is designed around:

- Semantic page sections and headings.
- Visible focus states for keyboard users.
- Keyboard operation for the command palette.
- Escape-to-close behavior for dialogs and overlays.
- Focus handling in the signup dialog.
- Reduced-motion support.
- Text and surface contrast tokens for both themes.
- Responsive navigation that remains operable on touch screens.

Accessibility should still be tested in the browser before final submission, particularly tab order, screen-reader labels, contrast, and focus behavior at mobile sizes.

---

## 9. Technology stack and project constraints

| Technology | Current use |
|---|---|
| Next.js App Router | Routing, layouts, page composition |
| React 19 | UI composition and interactive components |
| TypeScript | Typed components and application code |
| Tailwind CSS v4 | Styling toolchain is installed; much of the visual system is implemented through custom CSS in `globals.css` |
| Lucide React | Interface icons |
| CSS / Intersection Observer | Transitions, keyframe motion, and scroll reveals |

### Deliberate scope limits

- No backend, database, or real authentication is included.
- The workspace uses local sample data and client-side state.
- The signup dialog demonstrates a client-side form flow only.
- Pricing cards and the billing toggle are illustrative; no payment processor is connected.
- Customer names/logos and product metrics shown in the UI are sample content for the concept.

These limits are aligned with the assignment, which evaluates frontend fidelity, usability, responsiveness, code quality, and deployment rather than backend infrastructure.

---

## 10. Local development and handoff

### Requirements

- Node.js `20.9+` (Node.js 22 is recommended by the project README).
- npm.

### Commands

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Production build and start:

```bash
npm run build
npm start
```

Lint:

```bash
npm run lint
```

### Before presenting or submitting

1. Run the production build locally and resolve all errors.
2. Test every route directly as well as through the site navigation.
3. Verify the command palette, theme toggle, product interactions, workflow tabs, pricing toggle, and signup dialog.
4. Check the mobile menu and page layouts at the target viewport widths.
5. Check browser console and network errors.
6. Deploy the public site and verify the production URL in a fresh browser session.
7. Capture desktop and mobile screenshots for the assignment submission.

---

## 11. How to explain Morrow in a project review

A concise way to present the implementation:

> Morrow is a fictional team workspace presented through a six-route SaaS marketing site. The visual direction combines Linear's clarity and practical product UI, Raycast's keyboard-first interaction model, and Framer's varied layout and product-presentation techniques. Each route has its own composition, while a shared shell provides consistent navigation, theming, command access, scroll behavior, and footer. The workspace preview and other controls are implemented with local React state and sample data, so the project focuses on frontend experience rather than backend services.

The most useful parts of the code to explain in a technical review are:

- `app/layout.tsx` — root application setup.
- `components/marketing-shell.tsx` — how shared site chrome is applied to each route.
- `components/site-header.tsx` — navigation, theme, and command palette behavior.
- `components/product-preview.tsx` — interactive workspace state and UI composition.
- `components/workflow-switcher.tsx` — reusable tab-driven interaction.
- `components/pricing-cards.tsx` — billing selection and plan presentation.
- `app/globals.css` — design tokens, page-specific layouts, responsive rules, and motion.

---

**Document status:** Describes the current Morrow multi-page frontend represented by the `morrow-multipage-distinct-pages` project archive. Treat product content, sample metrics, and pricing as illustrative until a real service is connected.

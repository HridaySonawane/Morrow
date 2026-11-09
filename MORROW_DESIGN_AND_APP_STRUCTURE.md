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
| **Raycast** | Creative visuals, animation, premium product experience | A keyboard-first command experience and crisp interaction feedback. The current visual system avoids copying its dark glow treatment. |
| **Framer** | Creative layouts, micro-interactions, modern landing-page patterns | Varied page compositions, clear hierarchy, a product preview with enough scale to read, and deliberate transitions. Decorative floating visual elements have been reduced. |

The references are used as **design principles**, not as templates to copy. Morrow keeps its own product concept, wording, brand mark, layouts, and interaction patterns.

### Additional design research

The redesign also considered recent SaaS interface studies: [Screenrove's Attio design page](https://screenrove.com/attio), [regards.design's SaaS website collection](https://www.regards.design/websites/saas), and [BestSaaSWebDesigns' 2026 review](https://bestsaaswebdesigns.com/blog/best-saas-websites). The useful themes were a near-white/neutral canvas, a labelled product interface in or near the first viewport, clear primary/secondary actions, readable type hierarchy, and a page structure that explains the product before piling on feature claims. The research informed principles, not copied page designs or assets.

### Current professional visual direction

The latest design reduces reliance on familiar SaaS template cues such as large gradient glows, decorative ring graphics, floating metric widgets, repeated pill labels, faux customer proof, and card grids that do not add information. The marketing system keeps the professional editorial layout, restrained surfaces, thin structural dividers, deliberate spacing, and a real workspace preview presented early in the experience. Its established brand palette is restored: deep charcoal and plum surfaces, off-white text, lavender as the primary accent, and restrained violet, soft-pink, green, and amber status accents. The dashboard remains a distinct application interface, but shares the same palette and typography.

The visual goal is not to imitate a reference site. It is to make the hierarchy, product and information feel credible: show the software, explain the workflow in concrete terms, and use animation only for feedback or meaningful transitions. The shared styling is consolidated in `app/globals.css`, where named cascade layers separate tokens, foundation rules, professional layout, brand refinements, and reduced-motion behavior. Dashboard-only visualization rules remain in `app/dashboard-visuals.css`.

### Core design principles

- **Clarity over noise:** Keep hierarchy obvious and remove decoration that does not help a user understand the page.
- **Product before ornament:** Product UI previews should explain the product, not merely act as decoration.
- **Purposeful motion:** Animation should communicate state, guide attention, or add feedback. It should not make the interface harder to use.
- **Distinct pages, shared system:** Pages should differ in composition and storytelling while reusing the same navigation, typography logic, buttons, spacing rules, and interaction conventions.
- **Responsive by design:** Layouts should adapt for smaller screens instead of shrinking desktop compositions until they become cramped.

---

## 3. Visual identity and design system

### Base color system

The implementation uses shared CSS custom properties in the `morrow.tokens` layer at the top of `app/globals.css`. The default marketing theme is dark; a matching light theme is also available. The dashboard uses the same theme preference and brand tokens.

| Token | Dark theme | Light theme | Use |
|---|---|---|---|
| `--bg` | `#09090D` | `#F7F5FB` | Main page background |
| `--bg-soft` | `#101017` | `#EFEDF5` | Alternate section background |
| `--surface` | `#15151E` | `#FFFFFF` | Cards and primary surfaces |
| `--surface-raised` | `#1D1C28` | `#F4F1FA` | Raised/interactive surfaces |
| `--surface-soft` | `#191823` | `#EEEBF4` | Subtle surface variation |
| `--text` | `#F5F3FA` | `#191522` | Primary text |
| `--text-soft` | `#C8C4D2` | `#514A60` | Secondary text |
| `--muted` | `#9691A3` | `#777083` | Supporting copy |
| `--line` | `rgba(226, 218, 255, 0.09)` | `rgba(45, 32, 70, 0.10)` | Subtle dividers |
| `--accent` | `#B58AFF` | `#9564DF` | Primary accent and actions |
| `--violet` | `#C58CFF` | `#8154C5` | Secondary, restrained accent |
| `--green` | `#8ED6B1` | `#398B65` | Positive/progress states |
| `--amber` | `#E8BF85` | `#A76D25` | Secondary status accent |

The shared brand foundation is **deep charcoal, plum, lavender, and restrained soft-pink**. The light theme uses pale lavender surfaces and deep plum text rather than simply inverting the dark theme. Route pages keep distinct compositions and storytelling, while the shared accent system remains consistent; green and amber are reserved mainly for meaningful status and data visualizations.

### Route-specific visual signatures

| Page | Visual character | Distinguishing elements |
|---|---|---|
| Home | Product-led editorial landing page | Centered headline, concise value summary, large workspace preview in the first view, capability strip, manifesto, feature rows, workflow demo, pricing preview, direct CTA |
| Product | Practical product explanation | Split editorial hero, clear list of workspace capabilities, large real UI preview, flat capability grid |
| How it works | Process-led explanation | Three-step vertical sequence, interactive workflow demo, simple rhythm overview |
| For teams | Role-based use cases | Structured team coverage list, product/design/operations/leadership use cases, shared-principles band |
| Pricing | Decision-focused comparison | Simple plan promise, pricing cards, clear toggle, FAQ and reassurance strip |
| About | Editorial brand story | Pale lavender/charcoal opening, large typographic statement, manifesto, principle rows and restrained CTA |

### Typography

Morrow uses a four-family system across all marketing routes, the floating navigation, and the workspace dashboard:

- **Bricolage Grotesque — display:** major page headings, section headings, dashboard view headings, and the Morrow wordmark.
- **Switzer — interface and body:** paragraphs, navigation labels, buttons, form controls, dashboard content, and most UI text.
- **Sentient — editorial accent:** italic emphasis, selected headline phrases, pull quotes, and other restrained serif details.
- **Azeret Mono — technical metadata:** keyboard shortcuts, section indices, project IDs, report labels, and compact metadata.

Bricolage Grotesque and Azeret Mono load from Google Fonts. Switzer and Sentient load from Fontshare; the Sentient stylesheet requests its true italic face rather than relying on browser-synthesized italics. The root layout preconnects to the font providers. `font-display: swap` is used by the providers, and CSS font stacks include local fallbacks so content remains readable while the web fonts load or when a provider is unavailable.

### Layout and surface language

- Main content uses a centered container with a maximum width of approximately `1160px` and responsive side gutters.
- The shared header is a fixed, floating composition with responsive side gutters. The library-native `GlassNav` is the primary desktop navigation surface; the Morrow wordmark sits to its left and utility actions sit to its right. The `GlassNav` is not nested inside a `GlassCard` or another glass wrapper. Its native liquid-glass material is themed through the library's `--lg-*` tokens: translucent plum fill, a lavender active lens, subtle violet refraction edges, and matching off-white foreground colors in dark mode; the light theme uses pale-lavender glass and deep-plum foreground colors. The same scoped tokens theme the compact `GlassMenu` and `GlassButton` controls. `LiquidGlassFilter` registers shared refraction filters. Morrow styles control placement, sizing, typography, and brand-specific material tokens.
- Sections use generous but controlled vertical spacing; The `morrow.professional` layer in `app/globals.css` brings wide-screen section spacing into a responsive `76–116px` range.
- Surfaces favour square-to-subtle radii, fine rules and intentional grouping. Repeated rounded card grids, background glows, decorative circular graphics, invented customer-logo walls and decorative floating widgets have been removed or de-emphasized.
- Marketing typography uses larger headlines and legible body copy; technical labels are kept small and limited to navigation context, section indices and metadata.
- The dashboard retains denser application UI but follows the same charcoal/plum/lavender palette, readable labels and restrained borders.
- The product preview uses denser information layout than the marketing pages. Its sample customer workspace is labelled Juniper Studio and uses illustrative team members and task data.

---

## 4. Page-by-page structure

### `/` — Home

**Purpose:** Introduce Morrow and give visitors a high-level understanding of the product.

**Structure:**
1. Centered editorial hero with a direct product promise and two actions.
2. Large interactive workspace preview positioned near the top of the page.
3. Compact capability strip covering Plan, Do, and Learn.
4. Manifesto and feature rows.
5. Interactive workflow section using `WorkflowSwitcher`.
6. Principle band, pricing preview, and closing signup CTA.

**Design role:** The product-led entry point. The workspace itself is presented early so visitors can understand the thing being sold before reading long feature descriptions.

### `/product` — Product

**Purpose:** Explain what the Morrow workspace contains and let visitors explore its interface.

**Structure:**
1. Editorial split hero with product introduction and a factual summary of the workspace flow.
2. Product metadata strip.
3. Large product presentation using `ProductPreview`.
4. Flat capability grid with four product benefits.
5. Closing product CTA.

**Design role:** The most product-focused page. It moves from a high-level product promise into the interactive workspace itself.

### `/how-it-works` — How it works

**Purpose:** Explain the workflow Morrow is designed to support.

**Structure:**
1. Editorial hero with a visible three-step track: Plan, Move, Learn.
2. Interactive workflow tabs using `WorkflowSwitcher`.
3. Three explanatory rhythm summaries.
4. Closing CTA linking visitors toward the product and pricing.

**Design role:** A process narrative rather than a feature catalogue. The vertical track and step cards make the methodology easy to scan.

### `/teams` — For teams

**Purpose:** Show how the same workspace can support different roles.

**Structure:**
1. Split hero with headline and a structured team-coverage list.
2. Compact supporting statement.
3. Role-specific summaries for Product, Design, Operations, and Leadership.
4. Shared-context principle section.
5. Closing CTA.

**Design role:** Role-specific and practical. The coverage list and supporting summaries show how different teams share one operating context.

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
1. Charcoal/plum editorial hero with oversized but restrained typography.
2. Manifesto section with supporting explanation.
3. Three brand-principle summaries with restrained borders.
4. Dark closing CTA.

**Design role:** The most editorial page. The hero changes the page composition while remaining connected to Morrow's shared charcoal/plum/lavender palette, typography, and messaging.

---

## 5. Application architecture

### Routing model

The application uses the **Next.js App Router**. Each top-level route lives in its own `app/<route>/page.tsx` file. The root layout provides the document shell, global stylesheet, metadata, and route-scroll behavior.

```text
app/
├── layout.tsx                 Root layout, metadata, global CSS, route scroll reset
├── globals.css               Consolidated tokens, foundation, page styles, responsive rules, and motion layers
├── dashboard-visuals.css     Dashboard-only charts and analytics presentation
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

The page body itself remains route-specific. This is intentional: shared chrome creates continuity, while distinct page compositions prevent the site from feeling like the same template repeated six times. The shared stylesheet uses explicit cascade layers: tokens, foundation, professional layout, brand refinements, dashboard visuals, and reduced-motion behavior. The dashboard-specific chart stylesheet remains separate so the marketing and product surfaces can evolve without competing foundations.

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
- `app/globals.css` — consolidated design tokens, foundation styles, professional layout, brand refinements, and reduced-motion behavior.
- `app/dashboard-visuals.css` — dashboard chart and analytics styling.

---

**Document status:** Describes the current Morrow multi-page frontend represented by the `morrow-professional-redesign` project archive. Treat product content, sample metrics, and pricing as illustrative until a real service is connected.


## Navigation refinement

The shared header is a floating composition rather than one large glass capsule. On desktop, the library's native `GlassNav` is the primary navigation element and owns the liquid-glass tab surface and selection interaction. The Morrow wordmark sits alongside it on the left; theme, sign-in, and signup actions sit alongside it on the right. `GlassNav` is not placed inside `GlassCard` or any second glass navbar. The theme and primary CTA use the library's `GlassButton`, while the compact navigation uses the library's `GlassMenu`. Scoped `--lg-*` overrides map the library surface to translucent plum glass and lavender selection states in dark mode, with pale lavender glass and deep-plum text in light mode.

`LiquidGlassFilter` is mounted once near the app root to share the library's SVG refraction filters. The library stylesheet is imported once in `app/layout.tsx`. Morrow CSS handles only the overall positioning, responsive sizing, spacing, and brand-specific typography; it does not recreate the tab bar's lens or touch behavior.

The route selector keeps its selected index synchronized with the current pathname. Selecting or dragging to a tab routes to the corresponding page, and the mobile menu marks the current route. The theme and signup controls remain available across all six routes. The glass components use restrained intensity so the navigation remains legible over the site's varied page compositions.

The library documents browser-dependent rendering: Chromium applies SVG displacement to live backdrops, while Safari and Firefox use alternate lens rendering and translucent surfaces for bars, buttons, and cards. Effects therefore vary by browser, but the actual `GlassNav` component and its selected-tab interaction are retained across supported browsers.



## Workspace dashboard (/dashboard)

The dashboard is a separate product surface from the public marketing website. It deliberately does not reuse the floating marketing navbar. Instead, it uses an application shell with a persistent left workspace sidebar, a compact sticky top bar, and an adaptable content area. The side navigation switches between Overview, My tasks, Projects, Inbox, Calendar, and Reports.

The visual language continues Morrow's charcoal / plum / lavender palette, readable labels, restrained borders, and deliberate spacing. The dashboard remains denser than the marketing pages, but the component surfaces are low-radius and the typography is intentionally legible. The dashboard takes structural inspiration from Linear's dense but calm product UI, while retaining Morrow's own palette and component styling.

The Overview and Reports views were refined to be analytics-led rather than card-led. A compact KPI strip establishes context, then a large created-vs-completed time-series chart and a segmented issue-status visualization carry the main visual weight. Status segments are interactive: selecting a status filters the Overview focus list, while the Reports breakdown opens the matching issue list. The chart switches between six- and twelve-week windows and exposes point-level values on hover, keyboard focus, and selection. Project progress is presented as a compact table/list rather than another oversized card grid. This adapts Linear's documented dashboard model—metric blocks, charts, tables, independent filters, and drill-down into underlying issues—without copying Linear's UI or using its assets. Sources: [Linear Dashboards](https://linear.app/docs/dashboards), [Linear Insights](https://linear.app/docs/insights), and [Linear Insights overview](https://linear.app/insights).

`components/dashboard-app.tsx` owns the dashboard's client-side interaction state and UI composition. It includes local sample data for tasks, projects, and activity; task search and filters; task completion and status updates; a task details drawer; a create-task dialog; inbox read states; week navigation in Calendar; and interactive SVG-based created-versus-completed analytics, issue-status distribution, and project progress reporting. All data is illustrative and stored in component state. No authentication, API, database, or cross-session persistence is connected.

# Morrow — A thoughtful workspace for teams

Morrow is a multi-page SaaS marketing website and interactive product preview created for the Frontend Development Assignment. It translates the design lessons from Linear, Raycast, and Framer into an original product identity rather than copying any one reference.

See [`docs/architecture.md`](./docs/architecture.md) for the route and source layout.

## Product concept

Morrow is a fictional team workspace that helps people plan priorities, keep work moving, and understand team momentum. The site is designed as a polished, responsive marketing experience with an embedded product preview.

## What the supplied design references informed

The implementation uses the supplied screenshots as design-study material, not as assets to embed or copy pixel-for-pixel.

- **Linear screenshot:** the product preview uses a dense three-pane workspace with left navigation, a central issue list, status groupings, and a contextual issue-details panel. It uses restrained dividers, compact metadata, assignees, status indicators, and a progress visualization.
- **Raycast screenshot:** the command palette keeps a keyboard-first interaction pattern, but the current marketing hero no longer uses the reference's dramatic glow treatment.
- **Framer screenshot:** the page uses deliberate changes in composition and gives the product preview enough scale to be understood. Decorative perspective and ambient glow have been reduced in favour of a cleaner product presentation.

The Morrow brand, copy, product concept, and UI remain original. The current design uses a product-led editorial layout, clear hierarchy, restrained surfaces, thin structural rules, and a large workspace preview near the top of the home page. Morrow retains its established charcoal/plum palette with lavender as the primary accent; soft-pink, green, and amber are used sparingly for supporting states and data. Decorative effects are kept secondary to the product surfaces and the information they contain.

## Additional design research

The professional redesign also considered current SaaS examples beyond the three assignment references:

- [Attio page study — Screenrove](https://screenrove.com/attio): studied its near-white canvas, tight headline hierarchy, restrained near-black actions, fine borders, and product/workflow-focused page structure.
- [SaaS website design inspiration — regards.design](https://www.regards.design/websites/saas): reinforced the value of showing the real product early and at a useful scale rather than relying on decorative objects.
- [The 30 Best SaaS Websites in 2026 — BestSaaSWebDesigns](https://bestsaaswebdesigns.com/blog/best-saas-websites): reviewed its observations about labelled product interfaces appearing above or immediately below the fold and the value of a clear primary/secondary action hierarchy.

These sources informed general design decisions only. Morrow does not reproduce their pages or use their visual assets. Customer logos, metrics, and testimonials were not invented to create false proof; the interface itself is used to explain the product.

## Typography system

Morrow uses four typefaces with clearly separated roles across the marketing pages, shared navigation, and workspace dashboard:

- **Bricolage Grotesque** — display headings, page titles, and the Morrow wordmark.
- **Switzer** — primary UI and body type, including navigation, controls, paragraphs, and dashboard content.
- **Sentient** — restrained editorial accents, italic emphasis, selected pull quotes, and serif details.
- **Azeret Mono** — technical metadata, keyboard hints, IDs, section indices, and chart labels.

Bricolage Grotesque and Azeret Mono are served by Google Fonts. Switzer and Sentient are served by Fontshare. The root layout preconnects to both font providers and requests the weights/styles used by the interface. Local fallbacks are defined in the CSS custom properties so the layout remains usable while web fonts load or when an external font service is unavailable.

## Tech stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS v4 (custom CSS design tokens and layout styling)
- Lucide React icons
- `@zakisheriff/liquid-glass` (MIT) for the native `GlassNav`, `GlassMenu`, `GlassButton`, and shared `LiquidGlassFilter` components
- GSAP and ScrollTrigger for route entrances, scroll reveals, dashboard view changes, and interactive overlays
- CSS transitions for small control and hover feedback

No backend or database is required. The product preview uses local React state and sample data, as permitted by the assignment.

## Run locally

Use Node.js 20.9+ (Node.js 22 recommended).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Create a production build with:

```bash
npm run build
npm start
```

## Routes and pages

The website is a multi-page Next.js App Router application. The desktop header places the library's `GlassNav` directly as the primary floating navigation surface, with the Morrow wordmark to its left and utility actions to its right. `GlassNav` is not wrapped in or nested inside a second glass navbar. `GlassMenu` handles compact navigation, while `GlassButton` powers the theme and primary CTA controls. `LiquidGlassFilter` supplies shared SVG refraction definitions. The package stylesheet is imported once from `app/globals.css` in the `morrow.vendor` cascade layer; shared brand and component styles are layered after it. The package is independent of Apple and is licensed under MIT: [project repository](https://github.com/zakisheriff/Liquid-Glass).



- `/` — Home / brand introduction
- `/product` — Product overview and interactive workspace preview
- `/how-it-works` — Interactive workflow explainer
- `/teams` — Product, design, operations, and leadership use cases
- `/pricing` — Monthly/yearly plans and FAQ
- `/about` — Brand philosophy and principles
- `/dashboard` — Interactive Morrow workspace with overview, tasks, projects, inbox, calendar, and reports

The marketing routes share the floating GlassNav header, command palette, theme preference, signup dialog, and footer. The `/dashboard` route intentionally uses a separate application shell with a workspace sidebar and product toolbar, so the product feels like a real logged-in workspace rather than another marketing page. Main navigation and command-palette commands use route navigation instead of relying on homepage-only section anchors.

## Workspace dashboard

The `/dashboard` route is a front-end product dashboard and is intentionally separate from the marketing shell. It has a persistent workspace sidebar, a contextual top bar, responsive mobile navigation, and six in-app views: Overview, My tasks, Projects, Inbox, Calendar, and Reports. The Overview is analytics-first: a restrained KPI strip, an interactive created-vs-completed trend chart, issue-status distribution, a focused issue table, project progress, and a recent activity feed. The chart supports 6- and 12-week ranges, hover/focus inspection, and persistent point selection. Status segments can filter the Overview issue queue; the Reports status breakdown drills into the matching My tasks view. Reports combines trend analysis, status distribution, and a project progress table. These visualizations use illustrative workspace data, not live metrics.

The dashboard uses mock data and client-side state only. It does not currently include authentication, a database, persistent task storage, real collaboration, or server-backed reporting. Reloading the page restores the illustrative seed data. Its visual system shares Morrow's charcoal/plum/lavender palette, readable UI typography, restrained borders, and low-radius surfaces.

The information design takes inspiration from Linear's Insights and Dashboards patterns without copying its interface: modular metric blocks, clear time-series charts, status segmentation, chart legends, independently selectable time ranges, and drill-down from a chart segment into the underlying issue list. The dashboard uses original Morrow colours, typography, labels, and layout. Linear describes dashboards as combinations of charts, tables, and metric blocks, and Insights as interactive graphs that can highlight or filter the corresponding issue data: [Linear Dashboards documentation](https://linear.app/docs/dashboards) and [Linear Insights documentation](https://linear.app/docs/insights).

## Interactions

- Light/dark theme toggle, with the selected theme persisted in `localStorage`.
- Floating shared navigation with the native `GlassNav` as the primary desktop nav element and the native `GlassMenu` pull-down on compact screens. The brand sits beside the nav element; active route and menu actions are synchronized with Next.js App Router navigation. Scoped `--lg-*` material tokens align the native glass with Morrow's charcoal/plum surfaces and lavender selection states in dark mode, with pale lavender glass in light mode.
- Theme and primary CTA controls use the library's `GlassButton`; the shared `LiquidGlassFilter` and package stylesheet are registered at the app root. The main `GlassNav` stands on its own rather than being nested inside `GlassCard`.
- `Ctrl/Cmd + K` opens a searchable command palette. It supports filtering, arrow-key navigation, Home/End, Enter to execute, Escape to close, focus restoration, and commands for navigation, theme switching, and signup.
- Product preview issue rows select an issue and update the contextual details panel.
- Product preview issue completion toggles status and updates the status group.
- Product preview has List and Board views, an assignee filter, selectable project navigation, and contextual action feedback.
- Product preview search opens the global command palette.
- Workflow section has three interactive tabs.
- Pricing section toggles monthly and annual billing prices. The annual offer uses an accurate “Save up to 25%” claim based on the listed plan prices.
- Get-started actions open an early-access dialog with client-side validation, a success state, Escape handling, focus management, and a focus trap.
- GSAP animates route entrances, section and card reveals, dashboard view changes, workspace preview updates, pricing changes, and dialogs. Scroll reveals run once, and the system respects reduced-motion preferences.
- Hover, focus, keyboard, and reduced-motion states are included.

## Project structure

```text
app/             App Router pages and global stylesheet entry point
app/styles/      CSS tokens and styles grouped by responsibility
components/      Shared marketing UI and the interactive workspace
public/          Static assets
docs/            Project architecture notes
```

`docs/architecture.md` describes the route layout, shared shells, styling layers, and frontend-only scope.

## Design decisions

- The current marketing site is dark-first: deep charcoal (`#09090D`), plum surfaces (`#15151E`), off-white text (`#F5F3FA`), and lavender actions (`#B58AFF`). Light mode uses pale lavender surfaces, deep-plum text, and a darker violet action colour.
- The visual system reduces reliance on common template cues such as ambient gradients, decorative circular graphics, floating metric cards, invented social proof, repeated pill badges, and card grids without a clear information purpose.
- The home page introduces the product with a split editorial hero and a large, actual workspace preview near the top of the page. The interface is the evidence for the product promise.
- Features and team use cases are presented as structured rows and grouped information, rather than every content item being placed in a rounded card. A small number of surfaces remain where they clarify interaction or comparison.
- Bricolage Grotesque gives major headings a distinctive display voice; Switzer keeps body copy and UI controls readable; Sentient supplies restrained editorial emphasis; Azeret Mono is reserved for technical metadata and keyboard hints.
- The six marketing pages have deliberately different compositions: a product-led home page, a product explainer, a process sequence, role-based team use cases, a pricing comparison, and an editorial about page.
- The command palette preserves a Raycast-inspired keyboard-first interaction, but visual storytelling is restrained and centred on the product itself.
- Server-rendered page content is kept in route components; client components are isolated to interactions that need browser state.
- Responsive layouts are tuned for desktop, tablet, and mobile; at narrow widths the product preview prioritizes the issue list and hides secondary navigation/details panels rather than squeezing the three-pane interface into unreadable columns.

## Before submission

1. Run `npm install` and `npm run build` locally.
2. Test the page at desktop, tablet, and mobile widths.
3. Verify keyboard navigation, theme switching, modal behavior, command palette, and product preview interactions.
4. Deploy the project to Vercel and confirm the live URL is public.
5. Capture at least one desktop and one mobile screenshot for submission.

### Route scroll behavior

Internal page navigation starts at the top of the destination route. A small client component (`components/route-scroll-reset.tsx`) resets scroll position when the pathname changes. Same-page hash links (for example, `/#manifesto`) remain available and retain their target scrolling behavior.


## Page design direction

The marketing routes use distinct compositions rather than repeating one shared hero template:

- **Home** — centered product-led hero, concise value summary, large workspace preview, capability strip, manifesto, feature rows, workflow demo, and clear CTA.
- **Product** — editorial split hero, factual capability list, prominent workspace preview, and a restrained capability grid.
- **How it works** — a readable three-step process track, interactive workflow tabs, and a short explanation of the repeatable team rhythm.
- **For teams** — a structured overview of how Product, Design, Operations, and Leadership use the same shared context, followed by four role-specific summaries.
- **Pricing** — simple value proposition, a concise plan-promise panel, plan comparison, and native disclosure-based FAQs.
- **About** — pale-lavender editorial opening, manifesto, principle list, and restrained closing CTA.

The shared navigation, footer, theme toggle, command palette, signup modal, and reusable interactive product/workflow components remain shared across routes.


## Dashboard readability

The workspace dashboard uses a larger typography scale than the initial compact preview. Navigation labels, task titles, metadata, metric captions, chart labels, dialogs, and mobile dashboard text have been increased for comfortable reading while bringing the dashboard into the shared charcoal/plum/lavender visual system and responsive layouts.

## Marketing-page readability

A follow-up typography pass increases the size and line-height of supporting copy, labels, navigation, pricing details, feature descriptions, workflow text, FAQs, dialogs, and footer links across the marketing routes. The dashboard keeps its separate dashboard-specific typography rules. The adjustments include smaller-screen overrides so the larger text remains readable without forcing horizontal overflow.

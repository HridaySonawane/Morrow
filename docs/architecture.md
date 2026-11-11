# Morrow architecture

Morrow is a frontend prototype for a shared team workspace. It presents a public product site alongside an interactive dashboard demo. The product idea is to keep projects, tasks, decisions, and progress connected, giving teams shared context about what matters and what happens next.

There is no backend service in this project. Product previews and dashboard data are illustrative, and dashboard edits live in React state for the current session. The theme preference and collapsed-sidebar preference are saved in `localStorage`; workspace records are not.

## Application shape

The app uses the Next.js App Router. Route files provide page content and metadata; shared navigation, dialogs, product previews, and dashboard interactions live in `components/`.

| Route | Responsibility |
| --- | --- |
| `/` | Introduces Morrow and shows the workspace preview |
| `/product` | Explains product capabilities and includes an interactive preview |
| `/how-it-works` | Demonstrates a team workflow |
| `/teams` | Describes how Product, Design, Operations, and Leadership use shared context |
| `/pricing` | Presents plans and FAQs |
| `/about` | Explains Morrow’s product approach |
| `/dashboard` | Hosts the interactive workspace demo |

Marketing routes use `MarketingShell`, which composes the shared `SiteHeader`, command launcher, page content, and `SiteFooter`. The dashboard has a separate shell and navigation so it behaves like a workspace rather than another marketing page.

## UI and interaction ownership

- `components/site-header.tsx` owns marketing navigation, theme switching, and the command palette launcher.
- `components/marketing-shell.tsx` composes the shared marketing header and footer around public pages.
- `components/signup-trigger.tsx` and `components/signup-modal.tsx` implement the client-side early-access dialog. It does not submit registrations to a service.
- `components/product-preview.tsx` contains the sample project/issues interface, including list and board views, status changes, filtering, and issue details.
- `components/workflow-switcher.tsx` and `components/pricing-cards.tsx` own the interactive workflow and billing-period controls.
- `components/dashboard-app.tsx` owns the dashboard shell, local workspace state, and Overview, My tasks, Projects, Inbox, Calendar, and Reports views. Its calendar and task creation controls update the demo state.
- `components/page-motion.tsx` applies GSAP and ScrollTrigger entrance and scroll animations. Motion is disabled when the user requests reduced motion.
- `components/route-scroll-reset.tsx` resets scroll position after route changes while preserving same-page anchor navigation.

Most route pages are server components. Client components are used where an interaction needs browser state, event handlers, or animation.

## Styling system

`app/globals.css` is the stylesheet entry point. It imports Tailwind CSS, the Liquid Glass component stylesheet, declares the cascade-layer order, and then loads the project styles.

```text
app/styles/tokens.css                Theme and typography variables
app/styles/site-base.css             Shared base styles and controls
app/styles/home.css                  Home-page layout
app/styles/marketing-pages.css       Public route layouts
app/styles/dashboard-base.css        Dashboard foundation and base views
app/styles/marketing-refinements.css Marketing presentation and refinements
app/styles/brand.css                 Brand and theme-specific treatments
app/styles/dashboard.css             Dashboard-specific presentation
app/styles/motion.css                Motion and reduced-motion rules
```

The declared layer order is `morrow.vendor`, `morrow.tokens`, `morrow.foundation`, `morrow.professional`, `morrow.brand`, `morrow.dashboard`, and `morrow.motion`, after Tailwind’s layers. Keep new rules in the layer that owns the component or visual concern so theme and dashboard overrides stay predictable.

## Data and integration boundary

The current app is a visual and interaction prototype, not a connected project-management service:

- Workspace projects, issues, activity, chart values, and calendar events are sample data in the client.
- Dashboard interactions update component state; reloading restores the seed workspace data.
- Theme and sidebar-collapse preferences are stored locally in the browser.
- There is no sign-in, API, database, real-time collaboration, or server-backed reporting.
- The signup dialog validates and presents a local success state only.

When connecting a backend, replace the sample data at the component/data boundary and define persistence and authentication separately; the present UI does not imply those services exist.

## Local development

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use `npm run build` for a production build and `npm run lint` to run ESLint.

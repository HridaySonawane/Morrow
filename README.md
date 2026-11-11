# Morrow

Morrow is a frontend prototype for a shared team workspace. It brings projects, tasks, decisions, and progress into one place so teams can see what matters, why work is moving, and what needs attention next.

The project includes a public product site and an interactive workspace demo. The public pages explain the product and its workflows; the dashboard shows how a team might plan and track work across Product, Design, Operations, and Leadership.

## What you can explore

- Marketing pages for the product, workflow, team use cases, pricing, and Morrow’s approach.
- A product preview with sample issues, list and board views, filtering, search, and an issue details panel.
- A dashboard with overview metrics, tasks, projects, inbox, calendar, and reports.
- Shared interactions including light and dark themes, a keyboard-accessible command palette, pricing period controls, and a signup dialog.

## Prototype scope

This is a frontend-only demo. The workspace uses illustrative sample data and client-side state. There is no backend, authentication, shared collaboration, or database persistence, so dashboard changes are not saved between sessions. The signup dialog demonstrates a client-side flow and does not register users with a service.

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To create and run a production build:

```bash
npm run build
npm start
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Introduces Morrow and previews the workspace |
| `/product` | Product capabilities and interactive preview |
| `/how-it-works` | Explains the team workflow |
| `/teams` | Shows how different roles share context |
| `/pricing` | Displays plans and FAQs |
| `/about` | Explains Morrow’s product approach |
| `/dashboard` | Interactive workspace demo |

## Built with

- Next.js App Router, React, and TypeScript
- Tailwind CSS v4 and project-specific CSS design tokens
- GSAP and ScrollTrigger for interface motion
- Lucide React for icons
- `@zakisheriff/liquid-glass` for shared navigation and glass controls

## Project layout

```text
app/             Routes, root layout, and global styles
app/styles/      Design tokens and page/component styles
components/      Shared navigation, dialogs, previews, and dashboard UI
public/          Static assets
docs/            Architecture notes
```

See [`docs/architecture.md`](./docs/architecture.md) for more detail about the routes, shared components, and frontend-only scope.

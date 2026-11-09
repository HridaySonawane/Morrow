# Project structure

Morrow is a small Next.js app with two sides: the public product site and a client-side workspace demo. The App Router owns URLs and page metadata; shared UI lives in `components/`.

## Where things live

- `app/` — routes, root layout, and the global stylesheet entry point.
- `app/styles/` — CSS grouped by purpose and cascade layer: design tokens, shared site styles, home and route layouts, dashboard styling, brand refinements, and motion preferences.
- `components/` — shared site UI and the interactive workspace preview. `page-motion.tsx` coordinates route and scroll animation; interactive components use GSAP for state changes. `dashboard-app.tsx` owns the dashboard's local interactions and sample data.
- `public/` — static assets such as the app icon.

The stylesheet entry point is `app/globals.css`. It loads Tailwind and the liquid-glass library, declares the layer order, then imports the files in `app/styles/`. Keep route-specific styling with its existing layer so the dashboard and marketing pages remain predictable.

## Routes

| Route | Page |
| --- | --- |
| `/` | Product introduction and workspace preview |
| `/product` | Product overview |
| `/how-it-works` | Workflow explainer |
| `/teams` | Team use cases |
| `/pricing` | Plans and FAQs |
| `/about` | Brand story |
| `/dashboard` | Interactive workspace demo |

Marketing pages share `MarketingShell`; the dashboard uses its own app shell. Most pages are server rendered. Browser state is kept in the small client components that need it.

## Scope

This is a frontend demo. The product preview and dashboard use sample data and local React state; there is no authentication, backend, or persistent workspace data.

## Development

```bash
npm install
npm run dev
```

Use `npm run build` for a production build and `npm run lint` for ESLint.

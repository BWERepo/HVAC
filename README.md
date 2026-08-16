# Precision Comfort — HVAC Website Demonstration

A sales-demonstration prototype built by **Business Web Express** to show HVAC
company owners what a modern, conversion-focused website can look like.

Live: <https://hvac.businesswebexpress.com>

> **Everything about the business on this site is fictional.** "Precision Comfort
> Heating & Air" does not exist. The phone number uses the reserved 555-01xx
> fiction range, the email uses the reserved `.example` TLD, and the reviews,
> statistics, staff, licence number and service areas are invented. The footer
> says so plainly, and the page is served `noindex, nofollow`.

## Stack

- React 19 + Vite 7
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- No animation library — all motion is CSS transitions/keyframes driven by React
  state, IntersectionObserver, and a small `useMountTransition` hook
- Deployed as a static-asset Cloudflare Worker

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview  # serve the production build
```

## Rebuilding this for a real customer

Nearly all customer-specific content lives in one file:

**`src/data/site.js`** — company name, phone, email, licence, service areas,
service pillars, diagnostic options, estimate wizard questions, stats,
testimonials, team, membership benefits, footer links and the demo disclaimer.

Beyond that:

| What | Where |
| --- | --- |
| Logo | `src/components/ui/Logo.jsx` (placeholder SVG mark — replace wholesale) |
| Brand colours / type | `@theme` block at the top of `src/index.css` |
| Photography | `src/components/ui/Scene.jsx` — pass `src` + `alt` to `<Scene>` and it renders a lazy-loaded `<img>` instead of the drawn artwork |
| Page/section order | `src/App.jsx` |
| SEO + `noindex` | `index.html` (remove the robots tag for a real site, add real `LocalBusiness` JSON-LD) |
| Service-area pin positions | `pins` array in `src/components/ServiceArea.jsx` |

### Imagery

No photography ships with this prototype. Imagery is drawn procedurally as
abstract architectural/mechanical SVG compositions, which keeps the page weight
near zero and — importantly for an honest demo — never implies "this is a
photograph of our actual work". Swapping in real photos is a data change:

```jsx
<Scene src="/img/install.webp" alt="Technician completing a furnace install" />
```

## Forms

Both lead surfaces (the main form and the mobile schedule sheet) validate on
blur, focus the first invalid field on submit, and show a polished success
state — but **nothing is transmitted**. There is no backend configured; entered
details never leave the browser. Wiring these to a real CRM or email endpoint is
a deliberate, separate step for a live build.

## Deploying

```bash
npm run build
npx wrangler@4.121.0 deploy
```

`wrangler.jsonc` serves `./dist` as a static-asset Worker (`hvac-demo`) bound to
the custom domain `hvac.businesswebexpress.com`.

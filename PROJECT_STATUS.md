# Precision Comfort HVAC Demo — Project Status

Last updated: 2026-08-16 (end of session, latest).

**This session built the entire project from an empty folder and shipped it twice.** The
repo contained nothing but `Claude.md` at the start. It now holds a complete HVAC sales-
demonstration website — live at **<https://hvac.businesswebexpress.com>**, repo
**<https://github.com/BWERepo/HVAC>** (`main`), currently **v0.2.0** at commit `ecbfdf1`.

The site's purpose is commercial, not informational: Business Web Express shows it to HVAC
company owners whose own sites look dated, so **every section is meant to demonstrate
something BWE could customise for that owner's real business.** The closing section drops
the HVAC brand entirely and speaks to the owner directly.

Two deliveries happened this session. First the full dark-navy/electric-cyan build the
original brief asked for. Then the user asked for **"more cheerful"**, chose a light warm
palette from the options offered, and the whole thing was converted to a sunlit-home
scheme — plus a top bar of ten social icons added on request. Both are deployed; the
live site reflects the light palette.

---

## What it is

A single-page React site for **"Precision Comfort Heating & Air"**, a **fictional** HVAC
company. Interactive pieces, in page order: cinematic hero with a settling thermostat, a
draggable 65–80°F thermostat that shifts the section's colour temperature and reveals a
CTA in the 71–73° "perfect" band, three immersive service sections (cooling / heating /
air quality, the last with a particle-filtration animation), an 8-option symptom
diagnostic that routes true emergencies to the phone instead of a form, a 4-step estimate
wizard, animated trust stats, a testimonial carousel, a drag/keyboard before-after slider,
illustrative efficiency meters, a stylised service-area map, team, membership, emergency
CTA, lead form, and a mobile action bar feeding a 3-step schedule sheet.

### Everything about the business is fictional — and must stay clearly so

The phone uses the reserved **555-01xx** fiction range, email uses the reserved
**`.example`** TLD, and the licence number, reviews, statistics, staff and service areas
are invented. The footer says so in plain language, "Sample demonstration content" labels
sit under the stats/testimonials/team, and the page ships **`noindex, nofollow`** because
indexing a fictional local business would pollute search results. Both forms validate
fully but **transmit nothing** — there is no backend, and the success states say so.

---

## Stack and layout

React 19 + Vite 7 + Tailwind CSS v4 (`@tailwindcss/vite`). Plain `.jsx`, no TypeScript —
this is a marketing prototype with no data layer, and the lower friction was the point.
Deployed as a **static-asset Cloudflare Worker** named `hvac-demo`.

**There is no animation library, deliberately — see "Load-bearing decisions" below.**

```
src/
  data/site.js          <- ALL customer-specific content, single file
  index.css             <- @theme tokens + base + .glass/.eyebrow/.u-container
  lib/hooks.js          <- useInView, useCountUp, useScrolled, useMountTransition,
                           useScrollLock, useScrollTo, usePrefersReducedMotion
  lib/validation.js     <- shared by both lead surfaces so they cannot drift
  components/           <- one file per page section
  components/ui/        <- Button, Field, Icon, Logo, Reveal, Scene, Section, Collapse
```

### Rebuilding this for a real customer

Nearly everything lives in **`src/data/site.js`**. Beyond that: logo in
`ui/Logo.jsx` (placeholder SVG mark, replace wholesale), brand colours/type in the
`@theme` block of `index.css`, photography via `<Scene src alt>` (see below), section
order in `App.jsx`, SEO + the `noindex` tag in `index.html`, map pin positions in
`ServiceArea.jsx`. `README.md` carries the same table.

### Imagery

No photography ships. `ui/Scene.jsx` draws abstract daylit architectural/mechanical
compositions in SVG — near-zero page weight, themed from the palette, and it never
implies "this is a photo of our actual work". **Passing `src` and `alt` renders a real
lazy-loaded `<img>` instead and skips the drawing**, so adopting a photo set is a data
change, not a code change. Every call site already passes a meaningful `alt`.

---

## Palette (current — light/warm, v0.2.0)

Warm-white ground `#FDFBF7`, **sunny amber `#F59E0B` as brand and primary action**, with
sky blue (cooling), orange (heating), teal (air quality) and rose (emergency).

**The one rule to not break:** bright hues are **fills, icons and large graphics only**.
They do not carry text on a light ground — amber as text is 2.1:1. Every text use goes
through the verified `-deep` variant (`--color-sun-deep`, `--color-cool-deep`, etc.).
This is documented at the top of `index.css`; keep it there.

The Business Web Express closing section and the demo disclaimer run **inverted** (dark
ink ground, cream text, clay accent, Fraunces serif) using BWE's real brand tokens, so
the brand break still lands now that the HVAC site itself is light.

Measured live, not estimated: body text 15.1:1, secondary 6.2:1, tertiary 4.9:1, eyebrow
4.9:1, primary button 7.8:1, every filled button ≥4.7:1.

---

## Load-bearing decisions (do not casually undo these)

1. **`motion` was removed entirely.** Every `AnimatePresence` exit failed to unmount —
   verified in the production build, not just dev. That stranded the mobile menu, the
   thermostat reveal, and the schedule sheet as a full-screen `z-50` overlay swallowing
   every click on the page. Replaced with `useMountTransition` + CSS transitions. Bundle
   went **132 kB → 89 kB gzip**. If motion is ever reintroduced, re-test that overlays
   actually leave the DOM.
2. **Never name a theme token `--color-base`.** As a colour token it makes Tailwind emit a
   `text-base` *colour* utility that shadows the built-in `text-base` *font size*, which
   silently overrode button text to near-white (2.08:1). The token is `--color-canvas`
   for exactly this reason.
3. **`.glass` gets its blur from Tailwind utilities via `@apply`, not a raw
   `backdrop-filter` declaration.** The build's CSS minifier (Lightning CSS) rewrote the
   raw property to `-webkit-` only, leaving the standard property unset and the blur not
   rendering at all.
4. **`useScrolled` is deliberately not rAF-throttled.** An rAF-gated version latches its
   pending flag before scheduling, and rAF does not run in hidden documents — so a scroll
   while hidden left the sticky header and mobile bar permanently stuck.
5. **`ui/Collapse.jsx` measures content and applies inline heights.** The pure-CSS
   `grid-template-rows: 0fr → 1fr` technique did not apply here (the `[data-open]` rule
   never took effect despite matching); inline styles are immune to cascade/layer
   surprises. Collapsed content stays mounted so it can be measured, and is made
   genuinely unreachable with `inert` + `aria-hidden`.

---

## Verified — and the gap that matters

Verified by instrumenting the **live deployment**, not by assumption: thermostat drag
maths and full keyboard support with the reveal opening and closing on both sides of the
band; diagnostic under rapid clicking including the emergency `tel:` route; wizard through
all four steps with correct recap and no invented pricing; before/after slider; both
forms' validation, focus-first-invalid, phone formatting and success states with **zero
network calls**; sheet open/unmount via Escape, backdrop and close button with progress
retained across dismissals; no horizontal overflow at 375px or desktop; one `h1` with no
heading skips; all inputs labelled, all images with alt, no unnamed controls; zero console
errors on production.

**The gap: nobody has ever seen this site.** The Browser pane never composited frames for
the entire session, so every screenshot attempt failed and all verification above is
instrumented measurement. Consequently `visibilityState` stayed `hidden`, `requestAnimation
Frame` never fired and scroll events were never dispatched, which means **scroll- and
rAF-driven behaviour is unverified in motion**: header shrink-on-scroll, mobile action bar
reveal, count-up animations, hero parallax, and all scroll reveals. The code paths are
straightforward and their logic was checked, but they have not been watched running.

---

## Known follow-ups

- **A human should look at the site.** Especially the redrawn daylit `Scene.jsx` artwork,
  which has only been verified structurally, and the overall feel of the light palette.
- **Social links are all `#top`.** Ten platforms sit in the top bar as placeholders
  (`socials` in `site.js`). For a real customer, swap in profile URLs and **delete
  platforms the business does not actually use** rather than leaving dead links.
- **`noindex, nofollow` must be removed for a real customer build**, and real
  `LocalBusiness` JSON-LD added. `index.html` explains why it is there.
- **Forms are not wired to anything.** Connecting a CRM or email endpoint is a deliberate
  separate step.
- **No test suite and no `*Begin` / `*Checkpoint` / `*End` skills exist for this project**
  (unlike BWE, CarShow, SAM, DeepSprings). This file was written by hand at the user's
  "wrap up". Worth creating a `/BWEHVAC*` skill set if the project keeps moving.
- Footer phone/email links are ~20px tall; the column links were padded to comfortable
  touch targets but those two were not.

## Commands

```bash
npm install
npm run dev              # http://localhost:5173
npm run build            # -> dist/
npx wrangler@4.121.0 deploy
```

Wrangler is pinned by convention (an unpinned `npx wrangler` broke a BWE deploy once when
a bad version was published as latest). `wrangler.jsonc` serves `./dist` and binds the
custom domain.

## Commit history

- `951aea2` — initial full build (dark navy / electric cyan), deployed, Version ID
  `77cd605c-c535-4b51-a6f3-2a9245625347`
- `ecbfdf1` — light/cheerful palette + social top bar, v0.2.0, deployed, Version ID
  `328fb9bf-a4d4-4d7a-81eb-ebd99762bc59` ← **live**

# Precision Comfort HVAC Demo — Project Status

Last updated: 2026-08-16 (end of session).

**This session took the site from a good HVAC template to a premium, high-conversion
showcase** — real stock photography, a rebuilt 4-step conversion flow, a new type
system, and a full page-length trim, driven by a long back-and-forth design review.
Live at **<https://hvac.businesswebexpress.com>**, repo
**<https://github.com/BWERepo/HVAC>** (`main`) at commit `45afde6`, currently **v1.0.0**
(Version ID `8c110b26-4001-4fc4-b3b0-47e2af719441`) — the version number was bumped
straight to 1.0.0 to mark this session's redesign as the milestone release, skipping the
usual patch increment. 16 commits landed this session (`bb4d162` → `45afde6`), each one
built → deployed → committed → pushed in sequence per the user's standing "always
deploy after changes" preference — the live site should always match `main`.

The site's purpose is commercial, not informational: Business Web Express shows it to
HVAC company owners whose own sites look dated, so **every section is meant to
demonstrate something BWE could customise for that owner's real business.**

---

## What it is

A single-page React site for **"Precision Comfort Heating & Air"**, a **fictional** HVAC
company. Interactive pieces, in current page order: a full-bleed photographic hero, a
draggable 65–80°F thermostat further down the page, animated trust stats with a Google
reviews badge, a **4-step signature conversion flow** (problem → urgency → ZIP →
contact), a 7-item service catalog grid, a 3-photo "In the field" technician gallery, a
4-step estimate wizard, a testimonial carousel, a merged before/after + efficiency
section, a stylised service-area map, a large-portrait team grid, membership, financing,
an online-booking lead form (real date/time-window picker), footer, and a mobile action
bar feeding a schedule sheet. A fixed social/contact icon rail and a scroll-to-top/bottom
jump control sit on the right edge of the viewport (desktop only for the rail).

**Removed this session** (see "Page-length trim" below): the three immersive
COOL-IT/WARM-IT/CLEAN-IT pillar sections (`ServiceExperience.jsx`, deleted),
`EquipmentExplorer.jsx` (deleted), `EmergencyCTA.jsx` (deleted), `FinalCTA.jsx`
(deleted), `EfficiencySection.jsx` (deleted, merged into `ComfortTransformation.jsx`),
and the static "Living Room 72°" thermostat card that used to sit in the hero.

### Everything about the business is fictional — and must stay clearly so

The phone uses the reserved **555-01xx** fiction range, email uses the reserved
**`.example`** TLD, and the licence number, reviews, statistics, staff and team photos
are invented. The footer-wide demo disclaimer and **`noindex, nofollow`** stay in place
as the substantive fictional-content disclosure. Per explicit user request this session,
the smaller **per-section "Sample demonstration content" captions were removed** from
Trust Stats, Testimonials and Team — those were redundant with the footer disclaimer,
which remains intact. Both forms validate fully but **transmit nothing** — there is no
backend, and the success states say so.

---

## Stack and layout

React 19 + Vite 7 + Tailwind CSS v4 (`@tailwindcss/vite`). Plain `.jsx`, no TypeScript.
Deployed as a **static-asset Cloudflare Worker** named `hvac-demo`.

```
src/
  assets/
    hero-family.jpg      <- real hero photo (Unsplash, free license)
    team/*.jpg            <- 4 real team headshots (Unsplash, free license)
    crew/*.jpg             <- 3 real "in the field" technician photos (Unsplash)
  data/site.js           <- ALL customer-specific content, single file
  index.css              <- @theme tokens + base + .glass/.eyebrow/.u-container
  lib/hooks.js           <- useInView, useCountUp, useScrolled, useMountTransition,
                            useScrollLock, useScrollTo, usePrefersReducedMotion
  lib/validation.js      <- shared by all lead-capture surfaces (name/phone/email/zip/date/…)
  components/            <- one file per page section
  components/ui/         <- Button, Field, Icon, Logo, Reveal, Scene, Section, Collapse
```

### Real photography now ships (a reversal from the original "no photography" decision)

The original build shipped **zero photography** — `ui/Scene.jsx` drew everything as
abstract SVG art, deliberately, to keep page weight near zero and avoid implying "this
is a photo of our actual work." **This session reversed that** at the user's explicit
request. `Scene.jsx`'s `src`/`alt` prop pattern (already built for this eventuality) is
now in active use for the hero background. Team and "in the field" photos import
directly as `<img>` (see `TeamSection.jsx` and `FieldPhotos.jsx`).

**Sourcing process used this session** (repeat this pattern for any future photo adds):
browse Unsplash for free-license (non-Unsplash+) candidates, present 3–6 photo-page
links to the user for approval *before* downloading anything, then `curl` the approved
`https://unsplash.com/photos/<id>/download?force=true` URLs and immediately compress
with `npx --yes sharp-cli -i <in> -o <outdir> -q <65-70> resize <W> <H> --fit cover`
(raw Unsplash downloads are 1–7 MB; compressed output lands 30–200 KB). All photo `alt`
text explicitly says "sample demonstration photography, not the actual business."

### Rebuilding this for a real customer

Nearly everything lives in **`src/data/site.js`**. Beyond that: logo in `ui/Logo.jsx`,
brand colours/type in the `@theme` block of `index.css`, section order in `App.jsx`, SEO
+ the `noindex` tag in `index.html`, map pin positions in `ServiceArea.jsx`, and now the
photo files themselves in `src/assets/` (swap files, update the `import` paths in
`Hero.jsx`/`TeamSection.jsx`/`FieldPhotos.jsx`).

---

## Typography (new this session — three-tier system)

- **`--font-sans` (Geist)** — body copy. Replaced Inter early this session.
- **`--font-display` (Bricolage Grotesque)** — sitewide headings/UI, replacing Outfit.
  User feedback: Outfit read "boxy and plain"; Bricolage Grotesque is a more distinctive,
  editorial variable sans without crossing into serif territory (which would blur the
  brand-break rule below).
- **`--font-hero` (Bodoni Moda)** — reserved *only* for the hero `<h1>` ("COMFORT
  RESTORED. FAST."). A high-contrast display serif applied via inline
  `style={{ fontFamily: 'var(--font-hero)' }}` in `Hero.jsx`, deliberately not a
  sitewide token — it's a one-off "expensive" focal moment, not a system swap.
- **`--font-serif` (Fraunces)** — unchanged, still reserved for the inverted BWE
  brand-break section (`BusinessWebExpressCTA.jsx` / `DemoDisclaimer`). **Do not** reuse
  Fraunces elsewhere; it's businesswebexpress.com's own real headline font (confirmed by
  inspecting the live site's computed styles this session), and its exclusivity here is
  what makes the BWE section read as a different brand stepping in.

All four families load via one Google Fonts link in `index.html`.

---

## Palette (unchanged this session — light/warm, first set in v0.2.0)

Warm-white ground `#FDFBF7`, **sunny amber `#F59E0B` as brand and primary action**, with
sky blue (cooling), orange (heating), teal (air quality) and rose (emergency/alert).

**The one rule to not break:** bright hues are **fills, icons and large graphics only**.
Every text use goes through the verified `-deep` variant. Documented at the top of
`index.css`.

The BWE closing section and demo disclaimer run **inverted** (dark ink ground, cream
text, clay accent, Fraunces serif) using BWE's real brand tokens.

---

## This session's work (2026-08-16, continuing from v0.2.0)

Session arc: a long client-style design critique (delivered as detailed written
feedback, sometimes with annotated screenshots) drove iterative rounds of premium
redesign, photography, typography, and page-trimming. Commits, in order:

1. **`bb4d162` v0.3.0 — Premium redesign pass.** Two background agents ran a full
   art-direction pass: hero overhaul (oversized type, editorial asymmetry), rebuilt
   emergency CTA as a full-bleed color block, new `ServiceGrid.jsx` (bento-style service
   catalog), `EquipmentExplorer.jsx`, `FinalCTA.jsx`, `FinancingSection.jsx`. Also added
   WhatsApp/SMS icons and 6 payment-method icons (Visa/Mastercard/Amex/Discover/
   PayPal/Apple Pay) to `ui/Icon.jsx`.
2. **`4b101d1` v0.3.1 — Polish pass.** Consolidated the header's duplicate emergency
   elements into one phone-number display, tightened hero vertical whitespace, made the
   (now-removed) service pillar lists interactive on hover/focus, added CTA sub-labels,
   renamed "BREATHE BETTER." → "CLEAN IT." for pattern consistency.
3. **`c35f0c5` v0.3.2 — Real photography lands.** Sourced and wired in the hero family
   photo and 4 team headshots (see sourcing process above). Switched body font
   Inter → Geist. Added `SocialRail.jsx` (later moved off `TopBar.jsx`, see below). Added
   the Google reviews badge to `TrustStats.jsx` (`GoogleGIcon` in `ui/Icon.jsx`). First
   page-length trim: deleted `EquipmentExplorer.jsx`, merged `EfficiencySection.jsx`
   into `ComfortTransformation.jsx`, shortened `TeamSection.jsx`, trimmed shared
   `Section.jsx` padding.
4. **`7fa4c7c` v0.3.3 — Social icon placement.** Removed the icon row from `TopBar.jsx`
   (kept only the BWE demo banner there) since `SocialRail.jsx` already covers the same
   12 links more prominently on the right edge. Added per-platform brand-approximate
   colors to the rail icons.
5. **`0acf88d`→`a1615c5`→`c6621c0` (v0.3.4, v0.3.5, v0.3.6) — Hero scrim tuning, round
   1.** Three back-to-back adjustments chasing "picture too transparent" → "picture
   almost missing" → "show more of the photo" feedback. Ultimately narrowed the solid
   scrim zone and raised photo opacity.
6. **`42237f7` v0.4.0 — New hero copy + first quick-help rebuild.** Headline → "COMFORT
   RESTORED. / FAST.", new sub, added a checkmarked proof line (Same-Day Service /
   Upfront Pricing / Licensed & Insured) replacing the old service-tag list.
   `ProblemSelector.jsx` rebuilt from an 8-option diagnostic into a 3-choice (AC Not
   Cooling / Heat Not Working / Other) inline lead-capture form — **this was later
   superseded** by the 4-step flow in commit `f4c5e7d` (see below), so treat this
   commit's exact shape as historical only.
7. **`24bd790` v0.4.1 — Big structural cut + real locations.** Removed the hero's static
   "Living Room 72°" thermostat card entirely (freed the whole hero to photo + copy).
   **Deleted `ServiceExperience.jsx`** (the three COOL-IT/WARM-IT/CLEAN-IT pillar
   sections) and **deleted `FinalCTA.jsx`** ("Your Home Should Feel Comfortable Again.")
   as redundant with `ServiceGrid.jsx` and `LeadForm.jsx`/`EmergencyCTA.jsx`. Repointed
   every `#cooling`/`#heating`/`#air-quality`/`#emergency` anchor that those deletions
   orphaned. **Service areas swapped from invented neighborhoods to real Knoxville-area
   cities**: Knoxville, Maryville, Sevierville, Oak Ridge — `company.region` and
   testimonial location tags updated to match. Team photos enlarged.
8. **`26eb41e` v0.4.2 — Deleted `EmergencyCTA.jsx` and the merged
   `ComfortTransformation.jsx`** (before/after + efficiency section) entirely, per
   direct user instruction. Re-repointed the resulting dangling `#emergency` anchors to
   `#lead-form`. Team photos rebuilt as large portrait cards (photo on top, name/role
   below) instead of a small circular thumbnail row.
9. **`e8b72aa` v0.4.3 — Online appointment booking + more content trims.** `LeadForm.jsx`
   gained a real `<input type="date">` picker (min = today) plus a time-window select
   (Morning/Afternoon/Evening) — "Request Service" now books an actual slot, not just a
   vague callback request; added a `date` rule to `lib/validation.js`. Dropped the hero's
   "Knoxville area · Since day one" eyebrow line. Removed the small "Sample demonstration
   content" captions under Trust Stats/Testimonials/Team (footer disclaimer + `noindex`
   remain as the real disclosure).
10. **`f2a7d4e` v0.4.4 — Hero scrim tuning, round 2.** User flagged the headline/body
    copy as clashing with busy photo detail behind it. Widened the solid scrim zone to
    ~42% (from ~18%) and extended the fade to 78% (from 52%), while *raising* photo
    opacity in exchange — the wider solid zone covers the text either way, so the
    visible photo on the right reads more vividly, not less.
11. **`5e021fa` v0.5.0 — New `FieldPhotos.jsx` section.** 3 real "technician at work"
    photos (sourced via the same Unsplash approval flow) in a clean 3-up grid, placed
    right after `ServiceGrid.jsx`.
12. **`0ec5892` v0.5.2** (v0.5.1 was deployed but not separately committed — both are
    captured in this commit) **— Scroll-jump buttons + type system overhaul.** New
    `ScrollJump.jsx`: fixed back-to-top/jump-to-bottom buttons, positioned clear of
    `SocialRail.jsx` and the mobile action bar, respects reduced motion. Typography
    overhaul described in the dedicated section above (Bricolage Grotesque sitewide,
    Bodoni Moda for the hero headline only).
13. **`f4c5e7d` v0.6.0 — Signature feature rebuilt as a proper 4-step flow.** Per a
    detailed user spec, `ProblemSelector.jsx` (`#diagnostic` section) is now: **(1)**
    "What Can We Help You With?" — 4 large choices (AC Isn't Cooling / Heat Isn't
    Working / Air Quality-Airflow Problem / Something Else; added a new `flame` icon to
    `ui/Icon.jsx` for the heating option) → **(2)** "How soon do you need service?" —
    Today / Tomorrow / This Week / Just Getting an Estimate → **(3)** ZIP code with a
    Continue button → **(4)** Name + Phone + "Request Service" submit. Each step
    replaces in place with a 4-dot progress indicator and a Back link. Picking "Today"
    at step 2 (not problem type, as in the old version) now drives the urgent/red
    treatment and a persistent "Call Now instead" line. **Deviation from the user's
    literal spec worth knowing about:** the spec's sketch ended at "ZIP Code → Request
    Service" with no explicit name/phone capture; step 4 (name + phone) was added
    because without contact info the flow can't actually generate a lead — this was
    flagged to the user inline and not pushed back on.
14. **v0.6.1 — `ScrollJump.jsx` simplified.** The back-to-top button used to only
    appear after scrolling 600px down; changed to always-visible (matching the
    bottom-jump button) per direct user request ("add way to quickly to goto top and
    goto end") — they hadn't noticed the conditional version already existed further
    down the flow of the session.
15. **v1.0.0 — Milestone bump + version footer.** User explicitly requested the jump to
    1.0.0 to mark this session's work as the release milestone (not tied to any single
    feature). Also added a small `v{version} · {date}` line to the very bottom of the
    page (inside `DemoDisclaimer` in `Footer.jsx`), importing `version.json` directly
    (Vite supports JSON imports) plus a hardcoded `BUILD_DATE` constant in that same
    file — **there's no build-time date injection in this project, so `BUILD_DATE` must
    be updated by hand on future sessions** if the visible date should track the actual
    last-deploy date.

### Skills renamed this session

The project's `/HVACBegin`, `/HVACCheckpoint`, `/HVACEnd` skills (created just before
this session, per the previous session's own "known follow-up" note asking for exactly
this) were renamed to **`/BWEHVACBegin`, `/BWEHVACCheckpoint`, `/BWEHVACEnd`** to match
the `BWE`-prefixed naming convention used by every sibling project (BWESHS, BWEHDBS,
BWEDeepSprings, etc.). Same content/behavior, just correctly namespaced. Old
non-prefixed skill folders were deleted.

---

## Load-bearing decisions (do not casually undo these)

Carried over from earlier sessions, still true:

1. **`motion` was removed entirely** — replaced with `useMountTransition` + CSS
   transitions. Re-verify overlay unmounting if it's ever reintroduced.
2. **Never name a theme token `--color-base`** — collides with Tailwind's `text-base`
   font-size utility. The token is `--color-canvas`.
3. **`.glass` gets its blur from Tailwind utilities via `@apply`, not a raw
   `backdrop-filter` declaration** — Lightning CSS strips the unprefixed property
   otherwise.
4. **`useScrolled` is deliberately not rAF-throttled** — rAF doesn't run in hidden
   documents, which can permanently stick the sticky header/mobile bar.
5. **`ui/Collapse.jsx` measures content and applies inline heights** — the pure-CSS
   `grid-template-rows` technique didn't work here.

New this session:

6. **Unsplash photo IDs used are recorded in commit messages/this doc for traceability**
   — if a photo ever needs replacing, the sourcing process above (browse → present
   links for approval → download → `sharp-cli` compress) is the pattern to repeat, not
   an ad-hoc one-off.
7. **Fraunces is exclusively BWE's font, confirmed live** — don't extend it to HVAC-side
   headings even under "make it more premium" pressure; that's what `--font-hero`
   (Bodoni Moda) exists for instead.

---

## Known follow-ups

- **A human should look at the live site start to finish.** The Browser pane's
  screenshot tool was unreliable all session (stale-frame/"not displayed" errors even
  after successful navigation); per explicit user instruction ("skip all browser
  verification, I can do that"), visual QA this session was done by the user reviewing
  the live deploy directly rather than by in-agent screenshots. Everything shipped is
  build-clean and logically reviewed, but a fresh top-to-bottom look is still worthwhile.
- **Photo licensing note for a real customer build:** the current hero/team/field photos
  are free-license Unsplash stock (not the actual business, clearly labeled in `alt`
  text). Swap for the real business's own photography before going live for an actual
  customer — the `Scene.jsx`/`TeamSection.jsx`/`FieldPhotos.jsx` import pattern makes
  that a data change, not a code change.
- **Social links are still all `#top`/placeholder** except SMS (`sms:`) and WhatsApp
  (`wa.me/…`), which are functional using the fictional demo number. Swap in real
  profile URLs for a live customer build, and delete unused platforms.
- **`noindex, nofollow` must be removed for a real customer build**, with real
  `LocalBusiness` JSON-LD added.
- **Forms are not wired to anything** — the appointment date/time booking flow, the
  4-step quick-help flow, and the main lead form all validate fully but transmit
  nothing. Wiring to a real CRM/dispatch/email endpoint is a deliberate separate step.
- **No automated test suite** — this is a static marketing prototype; `/BWEHVACCheckpoint`
  deliberately has no test-gate step.

## Commands

```bash
npm install
npm run dev              # http://localhost:5173 (or next free port)
npm run build             # -> dist/
npx wrangler@4.121.0 deploy
```

Wrangler is pinned by convention (an unpinned `npx wrangler` broke a BWE deploy once
when a bad version was published as latest). `wrangler.jsonc` serves `./dist` and binds
the custom domain `hvac.businesswebexpress.com`.

## Deploy history (most recent first)

- `45afde6` — v1.0.0 / v0.6.1 (both bumps landed in this one commit), deployed twice,
  Version IDs `8c110b26-4001-4fc4-b3b0-47e2af719441` (v1.0.0, live) and
  `9748917d-a1f3-4196-82ba-3e24bf922367` (v0.6.1, superseded) ← **live**
- `f4c5e7d` — v0.6.0, deployed, Version ID `370aa8a2-bfdd-4428-a24e-8809bd6808fd`
- `0ec5892` — v0.5.2, deployed, Version ID `61f6a7b7-a7cd-4afc-bd16-b9721c98b7f4`
  (v0.5.1 deployed under Version ID `c17bf6c2-1a0e-471b-be6d-0495db14f0e5`, not
  separately committed)
- `5e021fa` — v0.5.0, deployed, Version ID `e6e1dd8e-ea6c-4198-af46-944567ee2760`
- `f2a7d4e` — v0.4.4, deployed, Version ID `8cd8964a-747c-46de-bbd5-9a36fab13d57`
- `e8b72aa` — v0.4.3, deployed, Version ID `66e583be-bd77-441e-8f73-3a15990082d2`
- `26eb41e` — v0.4.2, deployed, Version ID `6039e2aa-3fdf-4038-9b89-d0a4df66c6b1`
- `24bd790` — v0.4.1, deployed, Version ID `0aaeb0a1-d107-4df8-a4fb-d847e1c5ac46`
- `42237f7` — v0.4.0, deployed, Version ID `5d6879b1-084b-43f1-bc93-6e494d2bb6a8`
- `c6621c0` — v0.3.6, deployed, Version ID `9651c401-3f8b-44f6-8329-b0ae9d9047ca`
- `a1615c5` — v0.3.5, deployed, Version ID `c42c3bac-9c09-462c-9e21-86b24e2933d5`
- `0acf88d` — v0.3.4, deployed, Version ID `1bb4832c-310f-4f53-a55d-522165210e3f`
- `7fa4c7c` — v0.3.3, deployed, Version ID `d872b2a0-a90f-48e5-ac5c-734528c5eaae`
- `c35f0c5` — v0.3.2, deployed, Version ID `6cb48505-8e4d-4dd3-90c0-1ba3b81d72cb`
- `4b101d1` — v0.3.1, deployed, Version ID `b11474ee-a72e-4553-b778-fe583724fff6`
- `bb4d162` — v0.3.0, deployed, Version ID `64d94872-9d5a-4891-b585-6763b24f8e7d`
- `ecbfdf1` — v0.2.0, light/cheerful palette + social top bar (prior session)
- `951aea2` — initial full build (prior session)

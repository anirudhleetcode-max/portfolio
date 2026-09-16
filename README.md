# Anirudh — portfolio

The portfolio site for the five applications in `portfolio-suite/`. Dark,
technical and motion-led: a WebGL hero, scroll-driven reveals, a desktop cursor,
per-project case studies, and a contact form that is actually wired to a
database rather than to nothing.

**Status: local demo. This site is not deployed** — there is no hosted URL, and
none is claimed anywhere in the UI. Every project card and case study shows
*"Local demo · deployment pending"* instead of a link, because inventing one
would be a lie the visitor cannot check.

---

## Running it

```bash
pnpm install
cp .env.example .env.local   # optional — every value has a working default
pnpm dev                     # http://localhost:3000
```

Production:

```bash
pnpm build
pnpm start
```

### Environment

Everything is optional. See `.env.example`.

| Variable | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Origin for `metadataBase`, Open Graph, robots and sitemap | `http://localhost:3000` |
| `MONGODB_URI` | Switches persistence from the JSON file store to MongoDB | unset → JSON file store in `./.data` |
| `MONGODB_DB` | Database name when `MONGODB_URI` is set | driver default |

No secrets are required to run this site, and none are committed. `.env.local`
and `.data/` are both git-ignored.

---

## What is here

| Route | What it is |
| --- | --- |
| `/` | The single-page portfolio: hero, about, capabilities, work, case-study strip, services, process, contact |
| `/work/[slug]` | A case study per project — brief, approach, what was verified in a browser, and what it deliberately does not do |
| `/api/contact` | `POST` — validates with Zod and stores the message |
| `/robots.txt`, `/sitemap.xml` | Generated from the project list |

Five case studies are statically generated (`dynamicParams = false`), so an
unknown slug is a real 404 rather than a soft one.

---

## Technology

| Area | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router), React 19, TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens, no config file) |
| Animation | Framer Motion |
| 3D | three.js, @react-three/fiber |
| Icons | lucide-react |
| Forms | react-hook-form + `@hookform/resolvers` |
| Validation | Zod — the same schema on the client and in the route handler |
| Database | JSON file store by default; MongoDB/Mongoose when `MONGODB_URI` is set |
| Imagery | Original procedurally-generated SVG art (`scripts/generate-art.mjs`) |

| Command | Does |
| --- | --- |
| `pnpm dev` / `build` / `start` | Development · production build · serve |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` | ESLint |
| `pnpm art` | Regenerate the SVG artwork in `public/art` |

---

## Design and motion notes

- **One hero object, everywhere else restraint.** The 3D scene is an icosahedral
  lattice with a glowing core and a particle shell. It is code-split, mounted
  only while the hero is on screen, quality-tiered by screen size and core
  count, and skipped entirely for `prefers-reduced-motion` or a browser without
  WebGL. An error boundary around the canvas falls back to a static composition
  rather than taking the page down.
- **Reduced motion never changes the DOM.** `useReducedMotion()` returns `null`
  during SSR and the real value after mount, so branching markup or `initial`
  state on it causes a hydration mismatch (React error #418). Every motion
  primitive here renders identical elements either way and expresses reduced
  motion purely through the transition.
- **The custom cursor is opt-in per device.** The native cursor is only hidden
  after a `(pointer: fine)` match is confirmed in an effect, so a touch user
  never loses their pointer.
- **Interactions**: page transitions, scroll progress bar, nav that hides on
  scroll-down and returns on scroll-up, magnetic CTAs, word-by-word text
  reveals, clip-path image reveals, staggered section entrances, and subtle
  parallax on the case-study artwork.

---

## Honesty rules this site follows

- No live URLs are invented. `liveUrl` is `null` for all five projects, and the
  UI renders a disabled "Local demo · deployment pending" control.
- No client work is claimed. The five businesses are fictional briefs.
- No fabricated metrics, testimonials, star counts or download numbers appear
  anywhere.
- Each case study's *"Verified in a browser"* list describes checks that were
  actually run against a production build of that project, and each carries a
  *"What this does not do"* list.
- The only external link on the site is the repository it lives in.

---

## Known limitations

- **Not deployed.** Local only.
- **No email delivery.** A contact submission is validated and stored; no SMTP
  or transactional-email provider is connected, and the UI says so on the form.
- **No admin view for messages.** Submissions land in `./.data/messages.json`
  (or MongoDB) and are read from there.
- **No rate limiting or CAPTCHA** on `/api/contact`, and no CSRF token beyond
  same-origin defaults. Fine for a local demo; add both before exposing it.
- **No automated test suite.** Verification was done by driving a production
  build with Playwright plus direct API calls — see below.

---

## Verification performed

Run against `pnpm build && pnpm start`, driven with Playwright (Chromium) and
`curl`. This section records what was actually executed.

| Check | Result |
| --- | --- |
| Routes | `/`, five `/work/[slug]` pages, `/robots.txt`, `/sitemap.xml` → 200; `/nope` and `/work/nope` → real 404 |
| Responsive sweep | 7 routes × 7 widths (360 → 1920), in both `prefers-reduced-motion` states |
| Horizontal overflow | `scrollWidth − clientWidth` measured at every width |
| Console | Page errors, console errors and ≥400 responses collected on every load |
| Hero copy | Rendered headline checked against the intended text |
| Live-link honesty | Every project card shows the local-demo state; every external link asserted against an allow-list of one (the repository) |
| Artwork | All images resolve — no broken `naturalWidth === 0` |
| Navigation | Header link, project-card link, case-study "next project" link |
| Mobile | Menu opens at 390px, navigates, closes afterwards; the native cursor is **not** hidden on a touch device |
| Contact form | Empty submit blocked; bad email and short message surface field errors; a valid submission returns a `MSG-…` reference |
| Contact API | Malformed JSON → 400; invalid payload → 422; unknown enum value → 422; valid → 201 and persisted |
| Reduced motion | Home renders with the hero visible and **zero** hydration or console errors |

Results are recorded in the pull request for this branch rather than copied here
as prose, so this table stays a description of the checks and not a claim about
a run you cannot see.

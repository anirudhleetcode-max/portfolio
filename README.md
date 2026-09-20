# Anirudh — portfolio

A personal portfolio for four deployed machine-learning systems: **ScamShield**,
**SpendLens**, **FormFit** and **NutriSnap**. Light and editorial rather than
dark and motion-led — the work is the subject, and the interface tries to stay
out of its way.

**Status: deployed** at <https://portfolio-anirudh-ed2c.vercel.app> on Vercel.
The four projects it links to *are* live, and every one of those URLs was
fetched and verified rather than assumed.

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
| `NEXT_PUBLIC_LIVE_URL_*` | Overrides a project's live URL (`SCAMSHIELD`, `SPENDLENS`, `FORMFIT`, `NUTRISNAP`) | the verified production alias |

No secrets are required to run this site, and none are committed. `.env*` and
`.data/` are git-ignored.

---

## What is here

| Route | What it is |
| --- | --- |
| `/` | The single page: hero, about, work, skills, contact |
| `/work/[slug]` | A case study per project — brief, approach, what was verified, and what it deliberately does not do |
| `/api/contact` | `POST` — validates with Zod and stores the message |
| `/robots.txt`, `/sitemap.xml` | Generated from the project list |

Four case studies are statically generated (`dynamicParams = false`), so an
unknown slug is a real 404 rather than a soft one.

---

## Technology

| Area | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router), React 19, TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens, no config file) |
| Type | Inter (structure), Cormorant Garamond (two personal lines), IBM Plex Mono (metadata) |
| Animation | Framer Motion — a short hero entrance and in-view reveals, nothing more |
| Icons | lucide-react |
| Forms | react-hook-form + `@hookform/resolvers` |
| Validation | Zod — the same schema on the client and in the route handler |
| Database | JSON file store by default; MongoDB/Mongoose when `MONGODB_URI` is set |
| Imagery | Screenshots captured from the four deployed applications |

| Command | Does |
| --- | --- |
| `pnpm dev` / `build` / `start` | Development · production build · serve |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` | ESLint |

---

## Design notes

- **The person comes before the technology.** The first screen is a name, a
  photograph and one plain sentence. Machine learning is described where it is
  relevant, not used as the opening statement.
- **Restraint over effects.** There is no WebGL, no custom cursor, no scroll
  progress bar and no parallax. What remains is a sub-second hero entrance,
  in-view text reveals and hover underlines.
- **Essential content never waits on an observer.** Project screenshots render
  unconditionally. An earlier clip-path reveal left all four images clipped to
  zero height when its IntersectionObserver did not fire, which is exactly the
  failure mode worth avoiding on the part of the page that matters most.
- **Reduced motion never changes the DOM.** `useReducedMotion()` returns `null`
  during SSR and the real value after mount, so branching markup on it causes a
  hydration mismatch. Motion primitives render identical elements either way and
  express reduced motion through the transition only.

---

## Honesty rules this site follows

- **No URL is invented.** Each project's `liveUrl` falls back to the production
  alias reported by Vercel for that project, and each was fetched and confirmed
  to serve the application rather than a sign-in page. If a value cannot be
  verified it is `null` and the UI says so instead of linking nowhere.
- **No fabricated metrics.** Every figure shown came from that project's own
  evaluation scripts or was observed against the live deployment.
- **The unflattering results are shown too** — the synthetic-to-real transfer
  gap, the line items that do not extract, the dish the model gets wrong, and
  the classifier trained on simulated data.
- **No employers, clients, years of experience or awards are claimed**, because
  none exist yet.

---

## Known limitations

- **This site is not deployed.** Local only. The four projects it links to are.
- **No email delivery.** A contact submission is validated and stored; no SMTP
  or transactional-email provider is connected.
- **No admin view for messages.** Submissions land in `./.data/messages.json`
  (or MongoDB) and are read from there.
- **No rate limiting or CAPTCHA** on `/api/contact`, and no CSRF token beyond
  same-origin defaults. Add both before exposing it publicly.
- **No automated test suite.** Verification is `pnpm typecheck`, `pnpm lint`,
  `pnpm build`, and driving a production build in a browser.

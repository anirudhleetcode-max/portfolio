/**
 * The five applications in this portfolio suite.
 *
 * Every business named here is FICTIONAL and was invented for the demo — the
 * work is real, the clients are not. Nothing below claims a paying client, a
 * deployment that does not exist, or a metric that was not measured.
 *
 * `liveUrl` is deliberately `null` for every project: none of them is deployed,
 * and the UI renders "Local demo" rather than inventing a link.
 */

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  role: string;
  year: string;
  /** null until an actual deployment exists. Never invent a URL. */
  liveUrl: string | null;
  repoPath: string;
  stack: string[];
  features: string[];
  /** Something concrete and specific that was actually built and verified. */
  highlight: string;
  accent: "electric" | "cyan" | "amber";
  image: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "crumb-and-cream",
    name: "Crumb & Cream",
    tagline: "Artisan bakery with online ordering",
    summary:
      "A full ordering journey for a small-batch bakery: an 18-item catalogue, a persisted cart, a validated checkout with delivery or collection slots, and custom-cake commissions.",
    role: "Design, front-end, API, data layer",
    year: "2026",
    liveUrl: null,
    repoPath: "portfolio-suite/premium-bakery-ordering",
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind v4", "Framer Motion", "React Three Fiber", "Zod"],
    features: [
      "18-item catalogue with category tabs and four sort orders",
      "localStorage cart with free-delivery progress",
      "Delivery or collection with date and time-slot selection",
      "Custom cake brief and contact enquiry, both persisted",
      "3D hero: layered cake under a glass cloche",
    ],
    highlight:
      "The order API re-prices every line from the server catalogue. A request that claimed a ₹1 cake was charged the correct ₹2,900.",
    accent: "amber",
    image: "/art/project-bakery.svg",
  },
  {
    slug: "noir-and-bean",
    name: "NOIR & BEAN",
    tagline: "Café with live table reservations",
    summary:
      "A dark, cinematic café site with a working reservation system: live seat availability as you pick a slot, server-side capacity enforcement, and a password-protected staff dashboard.",
    role: "Design, front-end, API, auth, data layer",
    year: "2026",
    liveUrl: null,
    repoPath: "portfolio-suite/noir-bean-cafe",
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind v4", "Framer Motion", "React Three Fiber", "Zod"],
    features: [
      "Reservations with date, time slot, party size and seating area",
      "Live remaining-seat lookup, debounced as the form changes",
      "Staff dashboard with search, status filters and inline updates",
      "Scroll-driven horizontal gallery that degrades on touch",
      "3D hero: coffee still-life with an orbiting brass ring",
    ],
    highlight:
      "Capacity is enforced on the server. Filling a 40-cover slot with three 12-person bookings made the next request fail with a real remaining count, not a client-side check.",
    accent: "amber",
    image: "/art/project-cafe.svg",
  },
  {
    slug: "vanta-events",
    name: "VANTA EVENTS",
    tagline: "Event studio with a managed portfolio",
    summary:
      "A light editorial site for an event design studio, backed by a database rather than static content: the studio dashboard can create, edit, publish and delete the work shown on the public site.",
    role: "Design, front-end, API, auth, data layer",
    year: "2026",
    liveUrl: null,
    repoPath: "portfolio-suite/vanta-events-platform",
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind v4", "Framer Motion", "React Three Fiber", "Zod"],
    features: [
      "Database-backed portfolio with category filtering",
      "Full admin CRUD with unique slug derivation",
      "Three-step enquiry form with per-step validation",
      "Enquiry desk with search, filters and status changes",
      "3D hero: nested orbital rings around a faceted form",
    ],
    highlight:
      "Unpublishing an event from the dashboard takes its public page offline immediately — verified as a 200 becoming a real 404, not a soft one.",
    accent: "electric",
    image: "/art/project-events.svg",
  },
  {
    slug: "form-x",
    name: "FORM//X",
    tagline: "Fitness studio with accounts and class booking",
    summary:
      "A barbell studio platform with real user accounts: registration, roles, a 14-day timetable derived from a weekly template, class booking with server-enforced limits, and separate member and admin dashboards.",
    role: "Design, front-end, API, auth, data layer",
    year: "2026",
    liveUrl: null,
    repoPath: "portfolio-suite/formx-fitness-platform",
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind v4", "Framer Motion", "React Three Fiber", "Recharts", "Zod"],
    features: [
      "Accounts with scrypt-hashed passwords and per-user salts",
      "Role-aware sessions; the database is authoritative, not the cookie",
      "Timetable projected 14 days from a single weekly template",
      "Member dashboard: upcoming, history, plan, cancellation",
      "Admin dashboard with a bookings-per-programme chart",
    ],
    highlight:
      "Every booking constraint is server-side. A 12-capacity class accepted exactly twelve bookings and refused the thirteenth, and one member cannot cancel another's booking.",
    accent: "cyan",
    image: "/art/project-fitness.svg",
  },
  {
    slug: "arc-and-form",
    name: "ARC & FORM",
    tagline: "E-commerce with Razorpay test-mode payments",
    summary:
      "A lifestyle store built around a payment integration: catalogue, search and filtering, bag, checkout, and Razorpay in test mode with server-side signature verification — plus success, failure and cancellation handled as first-class outcomes.",
    role: "Design, front-end, API, payments, auth, data layer",
    year: "2026",
    liveUrl: null,
    repoPath: "portfolio-suite/arc-form-ecommerce",
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind v4", "Razorpay (test)", "Framer Motion", "Recharts", "Zod"],
    features: [
      "Razorpay test-mode checkout with HMAC signature verification",
      "Live keys refused at every layer — test keys only",
      "Distinct handling for paid, failed, cancelled and awaiting",
      "Signature-verified webhook over the raw request body",
      "Store admin: order status, stock edits, units-sold chart",
      "19 unit tests covering the payment-security logic",
    ],
    highlight:
      "An order can only become paid through server-side signature verification — not from the client, not from the failure endpoint, and not even from the admin dashboard.",
    accent: "cyan",
    image: "/art/project-store.svg",
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug) ?? null;

/* -------------------------------------------------------------------------- */
/* Skills                                                                      */
/* -------------------------------------------------------------------------- */

export const SKILL_GROUPS = [
  {
    title: "Front-end",
    items: ["React 19", "Next.js 15 (App Router)", "TypeScript", "Tailwind CSS", "Framer Motion", "Accessibility"],
  },
  {
    title: "3D & motion",
    items: ["three.js", "React Three Fiber", "drei", "Scroll-driven animation", "Performance budgeting"],
  },
  {
    title: "Back-end",
    items: ["Next.js route handlers", "Node.js", "REST design", "Zod validation", "Session auth", "Payment integration"],
  },
  {
    title: "Data",
    items: ["MongoDB / Mongoose", "Schema design", "Adapter patterns", "Query modelling"],
  },
  {
    title: "AI / ML",
    items: ["Python", "PyTorch", "scikit-learn", "Embeddings & retrieval", "Model evaluation"],
  },
  {
    title: "Practice",
    items: ["Playwright QA", "Git", "Code review", "Technical writing", "Debugging"],
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Services                                                                    */
/* -------------------------------------------------------------------------- */

export const SERVICES = [
  {
    title: "Business websites",
    body: "Marketing sites for small businesses that need to look considered and load quickly — built to be edited, not admired once and abandoned.",
    points: ["Design and build", "CMS or admin dashboard", "SEO groundwork", "Analytics setup"],
  },
  {
    title: "Web applications",
    body: "Booking, ordering, enquiry and account systems. The parts that decide whether a site is useful: validation, state, permissions and edge cases.",
    points: ["Auth and roles", "API and data modelling", "Payments", "Admin tooling"],
  },
  {
    title: "Interface & motion",
    body: "Interaction design with a performance budget — 3D and motion used where it earns its place, and switched off where it does not.",
    points: ["Design systems", "3D scenes", "Scroll interaction", "Reduced-motion support"],
  },
  {
    title: "AI/ML features",
    body: "Retrieval, search and classification features integrated into real products, with evaluation rather than vibes.",
    points: ["Embeddings & retrieval", "Evaluation harnesses", "Model integration", "Data pipelines"],
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Process                                                                     */
/* -------------------------------------------------------------------------- */

export const PROCESS = [
  {
    step: "01",
    title: "Understand",
    body: "What the business actually needs the site to do, and what it currently costs when it does not. Usually a conversation, not a brief.",
  },
  {
    step: "02",
    title: "Shape",
    body: "Scope, structure and a flat quote before any design work. If something on the list will not pay for itself, I say so here.",
  },
  {
    step: "03",
    title: "Design",
    body: "Layouts, type and interaction in the browser rather than a static mockup, so decisions are made against real content.",
  },
  {
    step: "04",
    title: "Build",
    body: "Typed end to end, validated on both sides of the wire, with the edge cases handled rather than deferred.",
  },
  {
    step: "05",
    title: "Verify",
    body: "Driven in a real browser: responsive widths, forms, permissions and failure paths. Bugs get fixed at the source, not papered over.",
  },
  {
    step: "06",
    title: "Hand over",
    body: "Documentation, environment setup and a walkthrough — including an honest list of what is not built yet.",
  },
] as const;

/**
 * The repository these projects live in. Only the repository root is linked:
 * the per-project folders sit on a feature branch, and a deep link built from a
 * branch name that may be renamed or merged away would rot into a 404. The
 * folder path is shown as text next to the link instead.
 */
export const REPO_URL = "https://github.com/anirudhleetcode-max/paperlens-retriever";

/* -------------------------------------------------------------------------- */
/* Case studies                                                                */
/* -------------------------------------------------------------------------- */

export type CaseStudy = {
  /** The brief the project was built against. */
  brief: string;
  /** How it was approached. */
  approach: string[];
  /** Things that were actually exercised against a running build. */
  verified: string[];
  /** What is deliberately not built. Stated because leaving it out would mislead. */
  limits: string[];
};

/**
 * Every line under `verified` describes something that was run against a
 * production build of that project — a request made, a boundary pushed, a
 * response read. Nothing here is inferred from source code, and `limits` is not
 * decoration: it is the part of the picture a portfolio usually omits.
 */
export const CASE_STUDIES: Record<string, CaseStudy> = {
  "crumb-and-cream": {
    brief:
      "A small-batch bakery needs to take orders online without a phone call: browse the counter, build a box, choose delivery or collection, and commission a custom cake.",
    approach: [
      "An 18-item catalogue with category tabs, four sort orders and a persisted cart.",
      "Checkout collects delivery or collection details with date and time-slot selection, validated by one Zod schema on both sides of the request.",
      "A 3D hero — a layered cake under a glass cloche — that is code-split, viewport-gated and skipped entirely for reduced motion or missing WebGL.",
    ],
    verified: [
      "Add to cart → checkout → confirmation driven end to end in a real browser.",
      "A tampered order request claiming a ₹1 cake was re-priced by the server to ₹2,900.",
      "Zero horizontal overflow from 360px to large desktop, measured at each width.",
      "Empty-form submission blocked, and the mobile menu opens and navigates at 390px.",
    ],
    limits: [
      "No automated test suite — verification was Playwright plus direct API calls.",
      "The catalogue is static application data, so there is no product CRUD.",
      "No payment step: this project takes orders, it does not charge for them.",
    ],
  },
  "noir-and-bean": {
    brief:
      "A late-night café loses covers to the phone. It needs table reservations that reflect real availability and a dashboard the staff can actually run a service from.",
    approach: [
      "Reservations take a date, time slot, party size and seating area, with remaining seats looked up live and debounced as the form changes.",
      "Capacity is enforced on the server; the browser's count is a convenience, never the decision.",
      "A password-protected staff dashboard with search, status filters and inline updates, behind an HMAC-signed cookie built on Node crypto.",
    ],
    verified: [
      "Filling a 40-cover slot with three 12-person bookings made the next request fail with a real remaining count.",
      "Dashboard exercised in-browser: login, status change, a no-match empty state and tab switching.",
      "Zero horizontal overflow from 360px to 1920px.",
      "Constant-time password and signature comparison on every admin request.",
    ],
    limits: [
      "No automated test suite — Playwright and direct API calls only.",
      "Menu and events are static application data; there is no CRUD for them.",
      "No email confirmations — a reservation is recorded, not sent anywhere.",
    ],
  },
  "vanta-events": {
    brief:
      "An event design studio wants its portfolio to be editable by the studio rather than by a developer, and enquiries to arrive with enough detail to quote from.",
    approach: [
      "The public portfolio reads from the database, not from a content file, with category filtering.",
      "Full admin CRUD with unique slug derivation, so a duplicate title cannot collide.",
      "A three-step enquiry form that validates per step, feeding an enquiry desk with search, filters and status changes.",
    ],
    verified: [
      "Create → appears publicly; duplicate title → suffixed unique slug; invalid patch → 422; delete → gone; delete unknown id → 404.",
      "Unpublishing an event turned its public page from 200 into a real 404 — not a soft one that returns 200 with an error page.",
      "Zero horizontal overflow from 360px to 1920px.",
      "Mobile menu opens and navigates at 390px.",
    ],
    limits: [
      "No automated test suite — Playwright and direct API calls only.",
      "A single shared admin credential rather than per-user studio accounts.",
      "No image uploads: artwork is generated vector art referenced by path.",
    ],
  },
  "form-x": {
    brief:
      "A barbell studio needs members to book classes themselves, within real capacity limits, and needs a coach-facing view of what is filling up.",
    approach: [
      "Real accounts: scrypt-hashed passwords with per-user salts and role-aware sessions where the database is authoritative, not the cookie.",
      "A 14-day timetable projected from one weekly template, so the schedule is data rather than 300 hand-written rows.",
      "Separate member and admin dashboards, the latter with a bookings-per-programme chart.",
    ],
    verified: [
      "A 12-capacity class accepted exactly 12 bookings and refused the 13th with a 409.",
      "No session cookie → 401; fabricated session id → 404; duplicate booking → 409; past-dated session → 409.",
      "One member cannot cancel another member's booking.",
      "Admin is granted only to the configured ADMIN_EMAIL — the first account to register does not inherit the studio.",
    ],
    limits: [
      "No automated test suite — Playwright and direct API calls only.",
      "Plans are recorded on the member, not billed; there is no payment step here.",
      "No rate limiting on sign-in, and no CSRF tokens beyond SameSite=Lax.",
    ],
  },
  "arc-and-form": {
    brief:
      "A lifestyle store that has to take money. The interesting part is not the catalogue — it is what the server will and will not believe about a payment.",
    approach: [
      "Razorpay in test mode: the key secret stays server-side, and only the public key id reaches the browser.",
      "An order becomes paid through one route only — server-side HMAC verification over `${razorpay_order_id}|${razorpay_payment_id}`, compared in constant time.",
      "Failure, cancellation and awaiting-payment are first-class outcomes with their own screens, not an error toast.",
    ],
    verified: [
      "19 unit tests over the real signature and key-guard logic, importing the same module the app uses.",
      "A client sending its own `price: 1` was ignored — the server re-priced the order to ₹7,050.",
      "A `rzp_live_` key is refused at every layer: checkout returns 503 and the simulator returns 403.",
      "The webhook rejects a body altered by a single space, a missing header, and an unset secret.",
      "Neither the outcome endpoint nor the admin dashboard can mark an unverified order paid (409).",
    ],
    limits: [
      "**No real payment has been executed.** The flow was exercised in simulation and the signature logic unit-tested; firing a genuine Razorpay test card needs test keys and outbound access to Razorpay, which this build environment did not have.",
      "No email: no order confirmation, verification or password reset.",
      "Stock decrement has a theoretical race between check and write on MongoDB.",
    ],
  },
};

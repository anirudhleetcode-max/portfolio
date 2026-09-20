/**
 * The four machine-learning systems in this portfolio.
 *
 * Every figure below was produced by an evaluation script committed in that
 * project's repository, or observed against the live deployment. Nothing is
 * rounded up, inferred from source, or invented — and each project carries the
 * result that does not flatter it, because leaving those out would mislead.
 *
 * `liveUrl` comes from the environment, falling back to the production alias
 * each project is actually deployed at. Every fallback was fetched and returns
 * the application itself, not a sign-in page. Where no URL can be verified the
 * value is `null` and the UI says so rather than inventing a link.
 */

/**
 * Only an absolute https:// URL is accepted. Anything else — a placeholder, a
 * blank value, an http:// address — is treated as "not deployed", so a typo or
 * a half-filled variable can never become a link that claims to be live.
 */
function liveUrl(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(trimmed);
    return url.protocol === "https:" ? url.toString().replace(/\/$/, "") : null;
  } catch {
    return null;
  }
}

/**
 * Next.js only inlines `process.env.NEXT_PUBLIC_*` for literal member access,
 * so each variable is named explicitly rather than looked up by slug.
 */
const LIVE = {
  scamshield:
    liveUrl(process.env.NEXT_PUBLIC_LIVE_URL_SCAMSHIELD) ??
    liveUrl("https://scamshield-anirudh-ed2c.vercel.app"),
  spendlens:
    liveUrl(process.env.NEXT_PUBLIC_LIVE_URL_SPENDLENS) ??
    liveUrl("https://spendlens-anirudh-ed2c.vercel.app"),
  formfit:
    liveUrl(process.env.NEXT_PUBLIC_LIVE_URL_FORMFIT) ??
    liveUrl("https://formfit-anirudh-ed2c.vercel.app"),
  nutrisnap:
    liveUrl(process.env.NEXT_PUBLIC_LIVE_URL_NUTRISNAP) ??
    liveUrl("https://nutrisnap-anirudh-ed2c.vercel.app"),
} as const;

/** Every app ships the same read-only demo account, so nobody has to sign up. */
export const DEMO_PASSWORD = "demo1234";

export type Metric = { k: string; v: string };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  /**
   * The card version of `summary`: two or three single-line statements — what
   * it does, the technical idea behind it, and one capability that is actually
   * built. Each one restates something already verified elsewhere in this file;
   * none introduces a claim of its own. `summary` is kept for the case-study
   * page and for page metadata, where a prose sentence still reads better.
   */
  points: string[];
  role: string;
  year: string;
  /** null until an actual deployment exists. Never invent a URL. */
  liveUrl: string | null;
  /** The project's own public repository. */
  repoUrl: string;
  /** Read-only demo account, so an interviewer never has to sign up. */
  demoEmail: string;
  /** The deployed API's health endpoint — checkable, not decorative. */
  apiUrl: string;
  stack: string[];
  features: string[];
  /** Something concrete and specific that was actually built and verified. */
  highlight: string;
  /** Figures produced by this project's own evaluation, not estimates. */
  metrics: Metric[];
  /** The result that does not flatter the project. Never omitted. */
  caveat: string;
  accent: "electric" | "cyan" | "amber";
  image: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "scamshield",
    name: "ScamShield",
    tagline: "Fraud checker for Indian SMS, UPI IDs and payment links",
    summary:
      "Paste a suspicious message and it returns a 0-100 risk score, the phrases that drove it, a red-flag checklist, and — when the evidence is thin — an explicit refusal to decide.",
    points: [
      "Checks Indian SMS, UPI IDs and payment links for fraud and returns a 0–100 risk score.",
      "TF-IDF word and character n-grams into a calibrated logistic regression, fused with a red-flag rule engine by noisy-OR.",
      "Abstains outright when the message is too short or falls inside the uncertain band, instead of guessing.",
    ],
    role: "Research, model, API, interface",
    year: "2026",
    liveUrl: LIVE.scamshield,
    repoUrl: "https://github.com/anirudhleetcode-max/scamshield",
    demoEmail: "demo@scamshield.app",
    apiUrl: "https://scamshield-api-qtja.onrender.com/api/health",
    stack: ["Python", "scikit-learn", "FastAPI", "MongoDB", "React", "TypeScript"],
    features: [
      "TF-IDF word and character n-grams into a class-weighted logistic regression",
      "Sigmoid calibration over GroupKFold folds grouped by message template",
      "Noisy-OR fusion of the model, a red-flag rule engine and community reports",
      "Explicit abstention when input is too short, mostly a link, or in the uncertain band",
      "Per-phrase attribution, computed exactly from the linear model",
    ],
    highlight:
      "Calibrating with random folds made the error worse than not calibrating at all — ECE 0.148 against 0.025 — because the same template landed on both sides of a fold. Grouping by template brought it to 0.011.",
    metrics: [
      { k: "F1, real SMS test", v: "0.973" },
      { k: "Precision", v: "1.000" },
      { k: "Calibration error", v: "0.011 ECE" },
      { k: "Inference", v: "~5 ms" },
    ],
    caveat:
      "The thirteen scam-pattern labels and the Indian scam examples are synthetic. Trained on synthetic data alone the model scores F1 0.25 on real SMS — that transfer gap is measured and published, not hidden.",
    accent: "electric",
    image: "/img/work/scamshield.jpg",
  },
  {
    slug: "spendlens",
    name: "SpendLens",
    tagline: "Receipt photographs into categorised expenses",
    summary:
      "Photograph a bill and it deskews the paper, reads it twice, parses each field with its own confidence, then checks the totals against their own arithmetic before anything is saved.",
    points: [
      "Turns a photograph of a paper receipt into a categorised expense.",
      "OpenCV deskewing, then two parallel Tesseract passes, keeping the read with the higher mean word confidence.",
      "Every field carries its own confidence, and totals are re-checked against their line items before anything is saved.",
    ],
    role: "Pipeline, model, API, interface",
    year: "2026",
    liveUrl: LIVE.spendlens,
    repoUrl: "https://github.com/anirudhleetcode-max/spendlens",
    demoEmail: "demo@spendlens.app",
    apiUrl: "https://spendlens-api-kcqz.onrender.com/api/health",
    stack: ["Python", "OpenCV", "Tesseract", "scikit-learn", "FastAPI", "MongoDB", "React"],
    features: [
      "Deskew and edge-finding with Hough lines and contour detection",
      "Tesseract run twice in parallel, keeping the higher mean word confidence",
      "Per-field confidence and provenance, not a single opaque result",
      "Arithmetic validation that re-checks totals against line items",
      "A category classifier that learns from the corrections users make",
    ],
    highlight:
      "Rather than trusting one OCR pass, it runs Tesseract on the thresholded and the denoised image at once and keeps whichever read has the higher mean word confidence.",
    metrics: [
      { k: "Merchant", v: "0.96" },
      { k: "Total", v: "0.95" },
      { k: "Date", v: "0.91" },
      { k: "Tax", v: "0.83" },
    ],
    caveat:
      "Measured against a real bill in production: those four header fields came back exact, but line items did not extract at all. A full-size photograph also takes about 123 seconds on a free shared CPU, so scanning works but is not interactive at this tier.",
    accent: "amber",
    image: "/img/work/spendlens.jpg",
  },
  {
    slug: "formfit",
    name: "FormFit",
    tagline: "A webcam coach that counts reps and reads form",
    summary:
      "Pose estimation runs entirely in the browser, so no video is ever uploaded. Joint angles drive a state machine that counts repetitions, scores form, and declines to score the ones it could not track.",
    points: [
      "A webcam coach that counts repetitions and scores exercise form.",
      "MediaPipe Pose runs in WebAssembly on-device, so no video frame is ever uploaded.",
      "Joint angles drive a state machine that counts reps and leaves badly tracked ones deliberately unscored.",
    ],
    role: "Pose pipeline, model, API, interface",
    year: "2026",
    liveUrl: LIVE.formfit,
    repoUrl: "https://github.com/anirudhleetcode-max/formfit",
    demoEmail: "demo@formfit.app",
    apiUrl: "https://formfit-api-te4h.onrender.com/api/health",
    stack: ["MediaPipe", "WebAssembly", "TypeScript", "React", "Python", "scikit-learn", "FastAPI"],
    features: [
      "MediaPipe Pose in WebAssembly — 33 landmarks, entirely on-device",
      "Joint-angle geometry driving a finite state machine with hysteresis",
      "Eccentric and concentric phases separated, so jitter cannot double-count",
      "Fatigue detected as a least-squares slope across repetitions",
      "Low-confidence reps counted but deliberately left unscored",
    ],
    highlight:
      "A repetition tracked at 0.31 confidence is still counted, but stored unscored rather than guessed at — the same abstention principle as the other three, applied to a noisy sensor instead of a noisy input.",
    metrics: [
      { k: "Landmarks", v: "33" },
      { k: "Exercises", v: "5" },
      { k: "Form checks", v: "17" },
      { k: "Frames uploaded", v: "0" },
    ],
    caveat:
      "The form-quality classifier is trained on simulated repetition data, so its scores are indicative rather than clinically meaningful. It is not medical advice.",
    accent: "cyan",
    image: "/img/work/formfit.jpg",
  },
  {
    slug: "nutrisnap",
    name: "NutriSnap",
    tagline: "Food photographs into calories and macros",
    summary:
      "Zero-shot CLIP recognises the dish against 188 food classes with no training examples, then every nutrition figure is labelled with where it came from — a USDA record or an author estimate.",
    points: [
      "Turns a photograph of a meal into calories and macros.",
      "Zero-shot CLIP ViT-B/32 on ONNX matches the dish against 188 food classes with no training examples.",
      "Every nutrition figure is labelled with its source — a USDA record or an author estimate.",
    ],
    role: "Model, evaluation, API, interface",
    year: "2026",
    liveUrl: LIVE.nutrisnap,
    repoUrl: "https://github.com/anirudhleetcode-max/nutrisnap",
    demoEmail: "demo@nutrisnap.app",
    apiUrl: "https://nutrisnap-api-o5pk.onrender.com/api/health",
    stack: ["CLIP", "ONNX Runtime", "Python", "FastAPI", "MongoDB", "React", "TypeScript"],
    features: [
      "CLIP ViT-B/32 quantised to ONNX, running on CPU",
      "Prompt ensembling across templates to cut prompt sensitivity",
      "Temperature scaling over the similarity logits",
      "Label embeddings cached at startup rather than recomputed per request",
      "Per-user k-nearest-neighbour memory built from corrections",
    ],
    highlight:
      "Every nutrition row states its own provenance. A USDA FoodData Central record and a recipe estimate written by me are never presented as the same kind of number.",
    metrics: [
      { k: "Food classes", v: "188" },
      { k: "CPU inference", v: "~4.5 s" },
      { k: "Top-1, pizza", v: "0.992" },
      { k: "Model weights", v: "155 MB" },
    ],
    caveat:
      "Zero-shot recognition confuses visually similar Indian dishes. On a dosa photograph it ranked aloo paratha at 0.315 above masala dosa at 0.251 — shown as measured, not quietly dropped.",
    accent: "cyan",
    image: "/img/work/nutrisnap.jpg",
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug) ?? null;

/* -------------------------------------------------------------------------- */
/* Skills                                                                      */
/* -------------------------------------------------------------------------- */

export const SKILL_GROUPS = [
  {
    title: "Development",
    items: [
      "Data Structures & Algorithms",
      "TypeScript",
      "JavaScript",
      "React 19",
      "Next.js 15 (App Router)",
      "HTML & CSS",
      "Tailwind CSS",
    ],
  },
  {
    title: "Back-end",
    items: ["Node.js", "Route handlers", "REST design", "Zod validation", "Session auth", "Payment integration"],
  },
  {
    title: "Data",
    items: ["MongoDB", "Mongoose", "Schema design", "Query modelling", "Adapter patterns"],
  },
  {
    title: "Machine learning",
    items: ["Python", "scikit-learn", "Model evaluation", "Calibration & abstention", "OpenCV & OCR", "ONNX Runtime"],
  },
  {
    title: "Interface & motion",
    items: ["Framer Motion", "three.js", "React Three Fiber", "Accessibility", "Responsive layout"],
  },
  {
    title: "Tools & practice",
    items: ["Git & GitHub", "Playwright QA", "Docker", "Vercel", "Technical writing", "Debugging"],
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Services                                                                    */
/**
 * Each project now has its own public repository, so `repoUrl` on a project is
 * the link to use. `REPO_URL` remains the profile-level fallback for anything
 * that has no repository of its own.
 */
export const REPO_URL = "https://github.com/anirudhleetcode-max";

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
  scamshield: {
    brief:
      "Indian phone users lose money to fraud within minutes of reading a message — a fake KYC block, a UPI collect request dressed up as a refund, an OTP request. The useful product is not a verdict, it is a second opinion that explains itself and knows when it should not answer.",
    approach: [
      "TF-IDF over word and character n-grams into a class-weighted logistic regression, kept linear so every prediction can be attributed exactly rather than approximated with SHAP.",
      "Probabilities calibrated with sigmoid scaling over GroupKFold folds grouped by message template, so the same wording never appears on both sides of a fold.",
      "The model, a red-flag rule engine and community reports fuse into one score through noisy-OR, with operating points chosen on validation and the test split scored once.",
      "Abstention is a first-class outcome: too short, mostly a link, mostly non-Latin, or inside a validation-chosen uncertain band returns no verdict at all.",
    ],
    verified: [
      "F1 0.973 with precision 1.000 on the real SMS test split, 774 messages.",
      "Calibration error 0.011 ECE — against 0.025 uncalibrated and 0.148 with random folds.",
      "In production: a KYC scam scored 96 with calibrated probability 0.998, a genuine bank OTP notice scored 17, and a two-character fragment returned insufficient confidence.",
      "56 backend and 14 frontend tests green in CI on every push.",
    ],
    limits: [
      "The thirteen scam-pattern labels and the Indian examples are synthetic, generated from templates in the repository.",
      "The only real labelled data is English SMS spam from the UK and Singapore, which counts marketing as spam — a different notion of scam.",
      "Trained on synthetic data alone the model scores F1 0.25 on real SMS. The transfer gap is published in the repository.",
      "On email-style text it performs no better than chance, and the app says so.",
    ],
  },
  spendlens: {
    brief:
      "Tracking spending fails at data entry. A receipt is a photograph of thermal paper — skewed, creased, badly lit — and the interesting problem is not reading it but knowing how much to trust what was read.",
    approach: [
      "An OpenCV pass deskews the bill and finds its edges with Hough lines and contour detection before any text is read.",
      "Tesseract runs twice in parallel, on the thresholded image and the denoised one, and the read with the higher mean word confidence wins.",
      "Every extracted field carries its own confidence and provenance — a lexicon hit, a labelled field, a keyword match — instead of one opaque result.",
      "Validation rules re-check the totals arithmetically, and a category classifier retrains from the corrections users make.",
    ],
    verified: [
      "Against a real bill in production: merchant 0.96, date 0.91, total 0.95 and tax 0.83, all matching ground truth exactly.",
      "Tesseract 5.5.0 confirmed running in the deployed container, not mocked.",
      "82 backend and 16 frontend tests green in CI, including the OCR pipeline tests.",
      "Oversized, empty, decompression-bomb and non-image uploads all rejected with the correct status.",
    ],
    limits: [
      "Line items did not extract from that real photograph — three expected, none found. Header fields work; the item table does not.",
      "A full-size photograph takes about 123 seconds on Render's free shared CPU, against a few seconds locally. Scanning works but is not interactive at this tier.",
      "The category classifier is trained on synthetic merchants and item words.",
    ],
  },
  formfit: {
    brief:
      "Form feedback from a webcam is easy to fake and hard to do honestly. Counting a repetition is simple; knowing whether you actually saw it clearly enough to judge is the real problem.",
    approach: [
      "MediaPipe Pose runs in WebAssembly in the browser, so frames are never uploaded and the privacy claim is structural rather than a promise.",
      "Joint angles drive a finite state machine with hysteresis that separates the eccentric phase from the concentric one, so jitter cannot double-count.",
      "Fatigue is a least-squares slope across repetitions, gated behind a minimum count so a trend is never fitted to noise.",
      "When tracking confidence drops the repetition is still counted but stored unscored — the model declines rather than guessing.",
    ],
    verified: [
      "In production: a session of three repetitions where one at 0.31 tracking confidence was stored with score null and scored false.",
      "Fatigue detection correctly reported none, because it requires at least six repetitions.",
      "The seeded demo account renders 17 sessions and 550 repetitions with an average form score of 77.",
      "44 backend and 54 frontend tests green in CI.",
    ],
    limits: [
      "The form-quality classifier is trained on simulated repetition data, so its scores are indicative rather than clinically meaningful.",
      "It is not medical advice and cannot assess injury risk.",
      "Only five exercises are supported, and the camera has to see you side-on or at 45 degrees.",
    ],
  },
  nutrisnap: {
    brief:
      "Calorie apps ask you to find your food in a database. A photograph is faster, but only if the app is honest about two things: what it thinks the food is, and where the nutrition number came from.",
    approach: [
      "Zero-shot CLIP — ViT-B/32 quantised to ONNX for CPU — embeds the photograph and 188 food classes into one shared space, so new foods need no training examples.",
      "Prompt ensembling averages several templates per class to reduce prompt sensitivity, with temperature scaling over the similarity logits.",
      "Label embeddings are computed once at startup and cached, rather than recomputed per request.",
      "A per-user k-nearest-neighbour memory built from corrections re-ranks candidates, and every nutrition row is tagged USDA-sourced or author estimate.",
    ],
    verified: [
      "In production: the CLIP model loads in the container with 188 classes and runs real inference on CPU in about 4.5 seconds.",
      "A pizza photograph returned Margherita Pizza at 0.992 confidence, with nutrition attributed to USDA FoodData Central FNDDS 2021-2023.",
      "A non-image upload was rejected with 415, and the seeded demo account renders a diary with 188 foods.",
      "50 backend and 21 frontend tests green in CI, including tests that exercise the real ONNX model.",
    ],
    limits: [
      "Zero-shot recognition confuses visually similar Indian dishes. On a dosa photograph it ranked aloo paratha at 0.315 above masala dosa at 0.251.",
      "Some nutrition rows are estimates written by me from typical recipes, not database records. Those are labelled as estimates everywhere they appear.",
      "Portion size is chosen by the user — the model recognises the dish, it does not measure how much is on the plate.",
    ],
  },
};

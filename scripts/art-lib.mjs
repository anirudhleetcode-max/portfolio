/**
 * Tiny procedural SVG art generator.
 *
 * Every project in this portfolio ships original, generated vector artwork
 * instead of bundling licensed photography. Art is deterministic: the same
 * seed always produces the same composition, so builds are reproducible.
 */

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function rng() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashSeed(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const round = (n) => Math.round(n * 100) / 100;

/**
 * @param {object} o
 * @param {string} o.seed          deterministic seed
 * @param {number} [o.w]           viewbox width
 * @param {number} [o.h]           viewbox height
 * @param {string[]} o.palette     [base, mid, accent, highlight]
 * @param {(c: {w:number,h:number,rng:()=>number,palette:string[]}) => string} [o.motif]
 * @param {number} [o.grain]       grain opacity 0..1
 * @param {boolean} [o.vignette]
 */
export function composition({
  seed,
  w = 1200,
  h = 1500,
  palette,
  motif,
  grain = 0.14,
  vignette = true,
  blobs = 4,
}) {
  const rng = mulberry32(hashSeed(seed));
  const [base, mid, accent, highlight] = palette;
  const id = `a${hashSeed(seed).toString(36)}`;

  const blobShapes = Array.from({ length: blobs }, (_, i) => {
    const cx = round(rng() * w);
    const cy = round(rng() * h);
    const r = round((0.22 + rng() * 0.3) * Math.min(w, h));
    const fill = [mid, accent, highlight, mid][i % 4];
    const op = round(0.35 + rng() * 0.4);
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" opacity="${op}"/>`;
  }).join("");

  const angle = round(rng() * 60 + 15);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
<defs>
<linearGradient id="${id}bg" gradientTransform="rotate(${angle} .5 .5)">
<stop offset="0%" stop-color="${base}"/>
<stop offset="55%" stop-color="${mid}"/>
<stop offset="100%" stop-color="${accent}"/>
</linearGradient>
<radialGradient id="${id}vig" cx="50%" cy="42%" r="78%">
<stop offset="55%" stop-color="#000" stop-opacity="0"/>
<stop offset="100%" stop-color="#000" stop-opacity="0.38"/>
</radialGradient>
<filter id="${id}soft" x="-40%" y="-40%" width="180%" height="180%">
<feGaussianBlur stdDeviation="${round(Math.min(w, h) * 0.11)}"/>
</filter>
<filter id="${id}grain" x="0" y="0" width="100%" height="100%">
<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/>
<feColorMatrix type="saturate" values="0"/>
</filter>
</defs>
<rect width="${w}" height="${h}" fill="url(#${id}bg)"/>
<g filter="url(#${id}soft)">${blobShapes}</g>
${
  motif
    ? `<g transform="translate(0,${round(Math.min(w, h) * 0.008)})" opacity="0.55" style="color:${highlight}">${motif(
        { w, h, rng, palette: [base, mid, highlight, highlight] },
      )}</g>${motif({ w, h, rng, palette })}`
    : ""
}
${vignette ? `<rect width="${w}" height="${h}" fill="url(#${id}vig)"/>` : ""}
<rect width="${w}" height="${h}" filter="url(#${id}grain)" opacity="${grain}" style="mix-blend-mode:overlay"/>
</svg>`;
}

/** Shared motif helpers — simple, elegant line silhouettes. */
export const strokeStyle = (color, width = 10, opacity = 0.9) =>
  `fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity}"`;

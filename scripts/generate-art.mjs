/**
 * Generates the portfolio's preview artwork into `public/art`.
 *
 * These are original, deterministic vector compositions — not screenshots and
 * not stock photography. Each one is tuned to the accent colour of the project
 * it represents so the case-study cards read as a set without looking identical.
 *
 * Run with: `node scripts/generate-art.mjs`
 */
import fs from "node:fs/promises";
import path from "node:path";
import { composition, strokeStyle } from "./art-lib.mjs";

const OUT = path.join(process.cwd(), "public", "art");

/**
 * [base, mid, accent, highlight] — deliberately near-black. These sit on the
 * site's #07070a ground, so the composition is carried by the line motif in
 * the highlight colour rather than by a bright field behind it.
 */
const P = {
  amber: ["#0A0910", "#15111C", "#241A10", "#FFB547"],
  electric: ["#08080F", "#101028", "#171436", "#6C5CFF"],
  cyan: ["#070B0D", "#0C181B", "#0E2328", "#3DDBD9"],
  mixed: ["#07070A", "#0E0F20", "#16162C", "#8E86FF"],
};

/* Motifs: single line-drawn silhouettes, one per project. -------------------- */
const motifs = {
  /** Crumb & Cream — a tiered cake under a cloche. */
  cake: ({ w, h, palette }) => {
    const c = palette[3];
    const cx = w / 2;
    const base = h * 0.74;
    return `<g ${strokeStyle(c, 7, 0.75)}>
<path d="M${cx - 240} ${base} h480"/>
<path d="M${cx - 210} ${base} v-52 h420 v52"/>
<ellipse cx="${cx}" cy="${base - 52}" rx="210" ry="30"/>
<path d="M${cx - 150} ${base - 66} v-92 h300 v92"/>
<ellipse cx="${cx}" cy="${base - 158}" rx="150" ry="24"/>
<path d="M${cx - 92} ${base - 170} v-78 h184 v78"/>
<ellipse cx="${cx}" cy="${base - 248}" rx="92" ry="17"/>
<path d="M${cx} ${base - 262} v-34"/>
<circle cx="${cx}" cy="${base - 308}" r="14"/>
<path d="M${cx - 300} ${base - 14} v-236 a300 236 0 0 1 600 0 v236" opacity="0.4"/>
</g>`;
  },

  /** NOIR & BEAN — a cup and saucer with an orbiting ring. */
  cup: ({ w, h, palette }) => {
    const c = palette[3];
    const cx = w / 2;
    const top = h * 0.44;
    return `<g ${strokeStyle(c, 7, 0.75)}>
<ellipse cx="${cx}" cy="${top}" rx="168" ry="44"/>
<ellipse cx="${cx}" cy="${top}" rx="126" ry="32" opacity="0.5"/>
<path d="M${cx - 168} ${top} c 10 170 44 236 168 236 c 124 0 158 -66 168 -236"/>
<path d="M${cx + 172} ${top + 46} c 96 -26 128 92 40 130 c -22 10 -44 14 -62 14" opacity="0.7"/>
<ellipse cx="${cx}" cy="${h * 0.79}" rx="268" ry="54" opacity="0.45"/>
<path d="M${cx - 60} ${top - 96} c -40 -44 22 -78 -8 -128" opacity="0.5"/>
<path d="M${cx + 46} ${top - 104} c -40 -44 22 -78 -8 -128" opacity="0.35"/>
</g>`;
  },

  /** VANTA EVENTS — nested orbital rings around a faceted core. */
  orbit: ({ w, h, palette }) => {
    const c = palette[3];
    const cx = w / 2;
    const cy = h * 0.5;
    return `<g ${strokeStyle(c, 6, 0.7)}>
<ellipse cx="${cx}" cy="${cy}" rx="300" ry="106" transform="rotate(-18 ${cx} ${cy})"/>
<ellipse cx="${cx}" cy="${cy}" rx="244" ry="244" opacity="0.35"/>
<ellipse cx="${cx}" cy="${cy}" rx="112" ry="286" transform="rotate(24 ${cx} ${cy})" opacity="0.5"/>
<path d="M${cx} ${cy - 118} l102 68 l-38 122 h-128 l-38 -122 z"/>
<path d="M${cx} ${cy - 118} v240" opacity="0.4"/>
<path d="M${cx - 102} ${cy - 50} h204" opacity="0.4"/>
<circle cx="${cx + 286}" cy="${cy - 92}" r="13" opacity="0.8"/>
<circle cx="${cx - 250}" cy="${cy + 130}" r="9" opacity="0.6"/>
</g>`;
  },

  /** FORM//X — a loaded barbell with a motion trace. */
  barbell: ({ w, h, palette }) => {
    const c = palette[3];
    const cx = w / 2;
    const cy = h * 0.52;
    const plate = (x, ry, o) =>
      `<rect x="${x - 17}" y="${cy - ry}" width="34" height="${ry * 2}" rx="12" opacity="${o}"/>`;
    return `<g ${strokeStyle(c, 7, 0.75)}>
<path d="M${cx - 300} ${cy} h600"/>
${plate(cx - 236, 128, 0.9)}${plate(cx - 190, 96, 0.72)}${plate(cx - 150, 64, 0.55)}
${plate(cx + 236, 128, 0.9)}${plate(cx + 190, 96, 0.72)}${plate(cx + 150, 64, 0.55)}
<path d="M${cx - 96} ${cy - 26} h192 v52 h-192 z" opacity="0.5"/>
<path d="M${cx - 300} ${cy + 214} c 120 -74 480 -74 600 0" opacity="0.32"/>
<path d="M${cx - 300} ${cy - 214} c 120 74 480 74 600 0" opacity="0.32"/>
</g>`;
  },

  /** ARC & FORM — an arch, a vessel and a price-tag mark. */
  arch: ({ w, h, palette }) => {
    const c = palette[3];
    const cx = w / 2;
    const base = h * 0.76;
    return `<g ${strokeStyle(c, 7, 0.72)}>
<path d="M${cx - 230} ${base} v-200 a230 230 0 0 1 460 0 v200"/>
<path d="M${cx - 150} ${base} v-176 a150 150 0 0 1 300 0 v176" opacity="0.45"/>
<path d="M${cx - 296} ${base} h592" opacity="0.7"/>
<path d="M${cx - 74} ${base} v-118 c -26 -66 26 -122 74 -122 c 48 0 100 56 74 122 v118" opacity="0.65"/>
<ellipse cx="${cx}" cy="${base - 236}" rx="74" ry="18" opacity="0.5"/>
<circle cx="${cx}" cy="${base - 128}" r="16" opacity="0.6"/>
</g>`;
  },

  /** Abstract mark for the open-graph / about imagery. */
  signal: ({ w, h, palette, rng }) => {
    const c = palette[3];
    const cy = h * 0.5;
    const bars = Array.from({ length: 26 }, (_, i) => {
      const x = w * 0.16 + (i * (w * 0.68)) / 25;
      const amp = (0.06 + rng() * 0.3) * h;
      return `<path d="M${Math.round(x)} ${Math.round(cy - amp / 2)} v${Math.round(amp)}" opacity="${
        Math.round((0.28 + rng() * 0.6) * 100) / 100
      }"/>`;
    }).join("");
    return `<g ${strokeStyle(c, 8, 0.8)}>${bars}<path d="M${w * 0.1} ${cy} h${w * 0.8}" opacity="0.22"/></g>`;
  },
};

/** [file, palette, motif, width, height] */
const pieces = [
  ["project-bakery", P.amber, "cake", 1600, 1100],
  ["project-cafe", P.amber, "cup", 1600, 1100],
  ["project-events", P.electric, "orbit", 1600, 1100],
  ["project-fitness", P.cyan, "barbell", 1600, 1100],
  ["project-store", P.cyan, "arch", 1600, 1100],
  ["og-cover", P.mixed, "signal", 1200, 630],
];

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  for (const [slug, palette, motif, w, h] of pieces) {
    await fs.writeFile(
      path.join(OUT, `${slug}.svg`),
      composition({ seed: `anirudh-${slug}`, w, h, palette, motif: motifs[motif], grain: 0.1, blobs: 2 }),
      "utf8",
    );
  }
  console.log(`Generated ${pieces.length} artwork files into public/art`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

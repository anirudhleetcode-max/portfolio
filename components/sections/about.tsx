import { Section } from "@/components/ui/primitives";

/**
 * Short on purpose. An interviewer scans this in a few seconds before moving on
 * to the work, so it carries three things and nothing else: what he does, where
 * he studies, and enough context to judge the projects below.
 *
 * Only facts verifiable from the work itself — nothing about employers,
 * clients, years of experience or awards, because none of that exists yet.
 */
const FACTS = [
  { k: "Studying", v: "B.Tech, Computer Science and Engineering" },
  { k: "Institute", v: "Vishnu Institute of Technology, Bhimavaram" },
  { k: "Years", v: "2024 – 2028" },
  { k: "Class 12", v: "981 / 1000 · 2024" },
  { k: "Class 10", v: "517 / 600 · 2022" },
  { k: "Based in", v: "Andhra Pradesh, India" },
] as const;

export function About() {
  return (
    <Section id="about" eyebrow="About" index="01">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
        <div>
          <h2 className="display-xl max-w-[20ch] text-balance text-ink">
            I build machine-learning systems end to end.
          </h2>
          <p className="mt-7 max-w-[56ch] text-[1.0625rem] leading-relaxed text-muted">
            Not notebooks &mdash; complete applications. A trained model, an API in front of it, a
            database, an interface, and a Docker image running in production. The four below are
            deployed, open-source, and tested on every push.
          </p>

          {/* One current role, kept to a label and a single line. It sits in
              the prose column rather than the facts list because it is the one
              thing here that is ongoing rather than a fixed figure. */}
          <div className="mt-9 border-t border-rule pt-5">
            <p className="mono text-[0.75rem] text-accent">Currently</p>
            <p className="mt-2 text-[0.9375rem] text-ink">E-Cell &mdash; Content &amp; Media Co-Lead</p>
            <p className="mt-1 max-w-[46ch] text-[0.875rem] leading-relaxed text-muted">
              Content and media initiatives for the campus entrepreneurship cell.
            </p>
          </div>
        </div>

        <dl className="border-t border-rule">
          {FACTS.map((fact) => (
            <div
              key={fact.k}
              className="flex flex-col gap-1 border-b border-rule py-4 sm:flex-row sm:items-baseline sm:gap-6"
            >
              <dt className="mono w-28 shrink-0 text-[0.75rem] text-muted">{fact.k}</dt>
              <dd className="text-[0.9375rem] text-ink">{fact.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

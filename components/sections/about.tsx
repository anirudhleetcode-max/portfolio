import { Section } from "@/components/ui/primitives";

/**
 * Short on purpose. An interviewer scans this in a few seconds before moving on
 * to the work, so it carries what he does, where he studies, and enough context
 * to judge the projects below.
 *
 * Only facts that are verifiable — nothing about employers, clients or years of
 * experience, because none of that exists yet.
 */
const FACTS = [
  { k: "Studying", v: "B.Tech, Computer Science and Engineering" },
  { k: "Institute", v: "Vishnu Institute of Technology, Bhimavaram" },
  { k: "Years", v: "2024 – 2028" },
  { k: "Based in", v: "Andhra Pradesh, India" },
] as const;

/**
 * The two completed qualifications, given the same bordered-cell treatment as
 * the measured figures on a project card: the mark is the thing worth reading,
 * so it is set in the mono face at display size with the label and the year
 * kept small around it. Marks exactly as awarded — no percentage, no CGPA, and
 * nothing derived from them.
 */
const EDUCATION = [
  { qualification: "Class 10 / SSC", marks: "517 / 600", year: "2022" },
  { qualification: "Intermediate / Class 12", marks: "981 / 1000", year: "2024" },
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

          {/* The one competitive result so far, given the same label-and-line
              treatment as the role above it. Stated as a win, because that is
              what it was — no ranking or field size is claimed, since neither
              was recorded. */}
          <div className="mt-7 border-t border-rule pt-5">
            <p className="mono text-[0.75rem] text-accent">Achievement</p>
            <p className="mt-2 text-[0.9375rem] text-ink">Failathon &mdash; Hackathon Winner</p>
            <p className="mt-1 text-[0.875rem] text-muted">
              Vishnu Institute of Technology &middot; 1st year, B.Tech
            </p>
            <p className="mt-1 max-w-[46ch] text-[0.875rem] leading-relaxed text-muted">
              Won the college hackathon and received a &#8377;3,000 prize.
            </p>
          </div>
        </div>

        <div>
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

          <p className="mono mt-9 text-[0.75rem] text-accent">Education</p>
          <dl className="mt-4 grid grid-cols-2 border-t border-l border-rule">
            {EDUCATION.map((entry) => (
              <div key={entry.qualification} className="border-r border-b border-rule p-4">
                {/* A fixed two-line label box: "Intermediate / Class 12" wraps
                    on a phone and "Class 10 / SSC" does not, and without this
                    the two marks stop sharing a baseline. */}
                <dt className="mono min-h-[2.75em] text-[0.6875rem] leading-snug text-muted">
                  {entry.qualification}
                </dt>
                <dd className="mono mt-2 text-[1.125rem] leading-none text-ink">{entry.marks}</dd>
                <dd className="mono mt-2 text-[0.6875rem] text-muted">{entry.year}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}

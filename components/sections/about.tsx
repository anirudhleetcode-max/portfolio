import { Reveal, SplitText } from "@/components/motion/reveal";
import { Section } from "@/components/ui/primitives";

const FACTS = [
  { k: "Based in", v: "India · working remotely" },
  { k: "Focus", v: "Full-stack web apps, interface & motion, AI/ML features" },
  { k: "Stack", v: "TypeScript, React, Next.js, Node, MongoDB, Python" },
  { k: "Availability", v: "Open to freelance and full-time work" },
] as const;

export function About() {
  return (
    <Section id="about" eyebrow="About">
      <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <div>
          <SplitText
            inView
            as="h2"
            text="I build the parts of a product that decide whether it works."
            className="display-xl max-w-[18ch] text-balance"
          />

          <div className="mt-8 space-y-5 text-base leading-relaxed text-fog">
            <Reveal delay={0.05}>
              <p>
                Most of what makes software feel trustworthy is invisible: validation that runs on
                both sides of the wire, permissions the client cannot talk its way past, prices the
                server recalculates instead of believing, and failure paths that were designed
                rather than discovered.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                That is the work I like. The five applications in this portfolio were built to prove
                it — each one is a complete product with a real data layer, not a landing page with
                a form that goes nowhere. Each has its own visual identity too, because a bakery and
                a payment-heavy store should not feel like the same template with the colours
                swapped.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                Alongside that I work with AI/ML: embeddings, retrieval and evaluation — the kind of
                feature that has to be measured to be worth shipping.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1}>
          <dl className="panel divide-y divide-white-warm/8 rounded-xl">
            {FACTS.map((fact) => (
              <div key={fact.k} className="flex flex-col gap-1 p-6 sm:flex-row sm:items-baseline sm:gap-6">
                <dt className="eyebrow w-32 shrink-0 text-fog">{fact.k}</dt>
                <dd className="text-sm text-white-warm">{fact.v}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-xs leading-relaxed text-fog">
            Everything described on this site was built by me in this repository. The businesses are
            fictional and used as realistic briefs — no client work is claimed.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

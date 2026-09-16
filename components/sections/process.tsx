import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/primitives";
import { PROCESS } from "@/lib/projects";

export function Process() {
  return (
    <Section id="process" eyebrow="How a project runs" className="border-t border-white-warm/8 bg-deep">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.3fr] lg:gap-20">
        <div className="lg:sticky lg:top-[calc(var(--nav-h)+40px)] lg:self-start">
          <h2 className="display-xl max-w-[12ch] text-balance">Six steps, no surprises</h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-fog">
            The same sequence every time. You always know which step we are on and what happens
            next.
          </p>
        </div>

        <ol className="relative border-l border-white-warm/12 pl-8 sm:pl-10">
          {PROCESS.map((item, index) => (
            <li key={item.step} className="relative pb-12 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute top-1.5 -left-[41px] grid h-5 w-5 place-items-center rounded-full border border-white-warm/25 bg-void sm:-left-[49px]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
              </span>
              <Reveal delay={index * 0.04}>
                <p className="mono text-xs text-fog">{item.step}</p>
                <h3 className="display-md mt-2">{item.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-fog">{item.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

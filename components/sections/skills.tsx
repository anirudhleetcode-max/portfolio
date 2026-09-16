import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { SKILL_GROUPS } from "@/lib/projects";
import { Section } from "@/components/ui/primitives";

export function Skills() {
  return (
    <Section id="skills" eyebrow="Capabilities" className="border-y border-white-warm/8 bg-deep">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="display-xl max-w-[14ch] text-balance">Tools I actually reach for</h2>
        <p className="max-w-sm text-sm leading-relaxed text-fog">
          Listed because they were used to build the work below — not because they look good on a
          grid.
        </p>
      </div>

      <Stagger className="mt-14 grid gap-px overflow-hidden rounded-xl border border-white-warm/10 bg-white-warm/10 sm:grid-cols-2 lg:grid-cols-3">
        {SKILL_GROUPS.map((group) => (
          <StaggerItem key={group.title} className="bg-void">
            <div className="h-full p-7">
              <h3 className="font-display text-lg">{group.title}</h3>
              <ul className="mt-5 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-fog">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-cyan" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

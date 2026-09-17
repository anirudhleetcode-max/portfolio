import { SKILL_GROUPS } from "@/lib/projects";
import { Section } from "@/components/ui/primitives";

/**
 * Skills sit after the work, not before it: the projects are the evidence and
 * this is the index. Set as plain lists on hairline rules rather than as cards
 * or progress bars — nobody can honestly put a percentage on "TypeScript".
 */
export function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" index="03">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="display-xl max-w-[16ch] text-balance text-ink">Tools I actually reach for</h2>
        <p className="max-w-sm text-[0.9375rem] leading-relaxed text-muted">
          Listed because they were used to build the work above, not because they fill out a grid.
        </p>
      </div>

      <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {SKILL_GROUPS.map((group) => (
          <div key={group.title}>
            <h3 className="mono border-b border-rule pb-3 text-[0.75rem] text-accent">
              {group.title}
            </h3>
            <ul className="mt-4 space-y-2">
              {group.items.map((item) => (
                <li key={item} className="text-[0.9375rem] text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

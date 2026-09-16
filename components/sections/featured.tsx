import { SplitText } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/work/project-card";
import { Section } from "@/components/ui/primitives";
import { PROJECTS } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function Featured() {
  return (
    <Section id="work" eyebrow="Selected work">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SplitText
          inView
          as="h2"
          text="Five applications, five identities."
          className="display-xl max-w-[16ch] text-balance"
        />
        <p className="max-w-sm text-sm leading-relaxed text-fog">
          Every one is a complete product — catalogue or timetable, validated forms, a real data
          layer, and an admin surface where the business needs one. The businesses themselves are
          fictional briefs.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {PROJECTS.map((project, index) => (
          <div
            key={project.slug}
            className={cn(index === PROJECTS.length - 1 && "md:col-span-2")}
          >
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </div>
    </Section>
  );
}

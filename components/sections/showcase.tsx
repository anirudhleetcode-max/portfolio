import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ImageReveal, Parallax } from "@/components/motion/parallax";
import { Pill, Section, accentText } from "@/components/ui/primitives";
import { PROJECTS } from "@/lib/projects";
import { cn } from "@/lib/utils";

/**
 * The deep-dive strip. Each row leads with something specific that was built
 * and checked in a browser, rather than an adjective about the project.
 */
export function Showcase() {
  return (
    <Section id="showcase" eyebrow="Under the surface" className="border-y border-white-warm/8 bg-deep">
      <h2 className="display-xl max-w-[20ch] text-balance">
        The part that is hard to see from a screenshot
      </h2>
      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-fog">
        One verified behaviour from each project. Each was exercised against a running build — a
        real request, a real boundary, a real response — not asserted from the code.
      </p>

      <div className="mt-16 space-y-20 sm:space-y-28">
        {PROJECTS.map((project, index) => (
          <article
            key={project.slug}
            className={cn(
              "grid items-center gap-8 lg:grid-cols-2 lg:gap-16",
              index % 2 === 1 && "lg:[&>figure]:order-2",
            )}
          >
            <figure className="relative">
              <Parallax distance={26}>
                <ImageReveal className="overflow-hidden rounded-xl border border-white-warm/10">
                  {/* Generated SVG: resolution-independent and a few KB, so it is served
                      directly. next/image would not optimise it without `dangerouslyAllowSVG`. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={`Generated cover artwork for ${project.name}`}
                    loading="lazy"
                    decoding="async"
                    width={1600}
                    height={1100}
                    className="aspect-[16/10] w-full object-cover"
                  />
                </ImageReveal>
              </Parallax>
            </figure>

            <div>
              <Reveal>
                <p className={cn("eyebrow", accentText(project.accent))}>
                  {String(index + 1).padStart(2, "0")} · {project.name}
                </p>
                <h3 className="display-md mt-4 text-balance">{project.tagline}</h3>
                <blockquote className="mt-6 border-l-2 border-white-warm/20 pl-5 text-base leading-relaxed text-white-warm/90">
                  {project.highlight}
                </blockquote>
                <dl className="mt-7 grid gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="eyebrow text-fog">Role</dt>
                    <dd className="mt-1.5 text-sm text-white-warm">{project.role}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-fog">Status</dt>
                    <dd className="mt-1.5 text-sm text-white-warm">Local demo · deployment pending</dd>
                  </div>
                </dl>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <Pill key={tech}>{tech}</Pill>
                  ))}
                </div>
                <Link
                  href={`/work/${project.slug}`}
                  className="mt-7 inline-flex items-center gap-2 text-sm text-white-warm underline decoration-white-warm/30 underline-offset-4 transition-colors hover:decoration-white-warm"
                >
                  Read the case study
                  <ArrowUpRight size={15} />
                </Link>
              </Reveal>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

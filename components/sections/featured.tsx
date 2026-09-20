import Image from "next/image";
import Link from "next/link";
import { LiveDemoButton, Section } from "@/components/ui/primitives";
import { DEMO_PASSWORD, PROJECTS } from "@/lib/projects";
import { cn } from "@/lib/utils";

/**
 * Selected work. Each entry is an editorial spread rather than a card: a real
 * screenshot given proper width, the measured figures set as data, and the
 * result that does not flatter the project printed underneath rather than left
 * out. The compositions alternate so the page has a rhythm instead of a grid.
 */
export function Featured() {
  return (
    <Section id="work" eyebrow="Selected work" index="02">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="display-xl max-w-[18ch] text-balance text-ink">
          Four systems that know when not to answer.
        </h2>
        <p className="max-w-sm text-[0.9375rem] leading-relaxed text-muted">
          Each one is deployed, open-source and covered by tests that run on every push. Every
          number below came out of that project&rsquo;s own evaluation &mdash; including the ones
          that are not flattering.
        </p>
      </div>

      {/* The scope of the four projects, stated once: when they were built and
          that one person built them. Set in the same mono meta type as the hero
          strip, so it reads as a caption on the work rather than a claim. */}
      <ul className="mono mt-9 flex flex-wrap gap-x-7 gap-y-2 border-t border-rule pt-5 text-[0.75rem] text-muted">
        {/* items-start, not items-center: this line wraps on a phone, and a
            centred dot drifts to the line break. */}
        <li className="flex items-start gap-2">
          <span
            aria-hidden="true"
            className="mt-[0.45em] inline-block h-[5px] w-[5px] shrink-0 rounded-full bg-accent"
          />
          Independent project development &middot; May 2026 &mdash; September 2026
        </li>
        <li>Solo developer &middot; end-to-end</li>
      </ul>

      <div className="mt-16 space-y-20 sm:space-y-28">
        {PROJECTS.map((project, index) => {
          const flipped = index % 2 === 1;
          return (
            <article key={project.slug}>
              <div
                className={cn(
                  "grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14",
                  flipped && "lg:[&>figure]:order-2",
                )}
              >
                <figure className="m-0">
                  <div className="overflow-hidden border border-rule bg-surface">
                    <Image
                      src={project.image}
                      alt={`${project.name} running in the browser`}
                      width={1440}
                      height={900}
                      sizes="(max-width: 1023px) 100vw, 55vw"
                      className="block aspect-[16/10] w-full object-cover object-top"
                    />
                  </div>
                  <figcaption className="mono mt-3 text-[0.6875rem] text-muted">
                    Screenshot from the deployed application
                  </figcaption>
                </figure>

                <div>
                  <div className="flex items-baseline gap-4">
                    <span className="mono text-[0.75rem] text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mono text-[0.75rem] text-muted">{project.year}</span>
                  </div>

                  <h3 className="display-md mt-3 text-balance text-ink">{project.name}</h3>
                  <p className="mt-2 text-[1.0625rem] text-muted">{project.tagline}</p>

                  {/* Two or three single lines rather than a paragraph: the
                      hierarchy is name, what it is, how it works, then the
                      links — readable in the seconds an interviewer gives it. */}
                  <ul className="mt-5 max-w-[56ch] space-y-2">
                    {project.points.map((point) => (
                      <li
                        key={point}
                        className="relative pl-5 text-[0.9375rem] leading-relaxed text-muted before:absolute before:left-0 before:top-[0.6875em] before:h-px before:w-2.5 before:bg-rule before:content-['']"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* Measured figures, set as data rather than as badges. */}
                  <dl className="mt-7 grid grid-cols-2 border-t border-l border-rule sm:grid-cols-4">
                    {project.metrics.map((m) => (
                      <div key={m.k} className="border-r border-b border-rule p-3">
                        <dt className="mono text-[0.6875rem] leading-snug text-muted">{m.k}</dt>
                        <dd className="mono mt-1.5 text-[0.9375rem] text-ink">{m.v}</dd>
                      </div>
                    ))}
                  </dl>

                  <blockquote className="mt-6 border-l-2 border-accent/40 pl-5 text-[0.9375rem] leading-relaxed text-ink">
                    {project.highlight}
                  </blockquote>

                  <p className="mt-5 max-w-[58ch] text-[0.8125rem] leading-relaxed text-muted">
                    <span className="text-ink">Honest note.</span> {project.caveat}
                  </p>

                  <p className="mono mt-6 text-[0.75rem] text-muted">
                    Stack &middot; {project.stack.join(" · ")}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <LiveDemoButton href={project.liveUrl} />
                    <Link
                      href={`/work/${project.slug}`}
                      className="link-underline text-[0.9375rem] text-ink"
                    >
                      Read the case study
                    </Link>
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="link-underline mono text-[0.8125rem] text-muted"
                    >
                      Source
                    </a>
                  </div>

                  <p className="mono mt-4 text-[0.6875rem] text-muted">
                    Demo account &middot; {project.demoEmail} / {DEMO_PASSWORD}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

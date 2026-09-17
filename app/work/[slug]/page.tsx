import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Github } from "lucide-react";
import Image from "next/image";
import { LiveDemoButton, Pill, accentDot, accentText, statusLabel } from "@/components/ui/primitives";
import { CASE_STUDIES, PROJECTS, getProject } from "@/lib/projects";
import { cn } from "@/lib/utils";

/** The four case studies are known at build time, and nothing else is valid. */
export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Case study not found" };
  return {
    title: `${project.name} — ${project.tagline}`,
    description: project.summary,
    openGraph: {
      title: `${project.name} — ${project.tagline}`,
      description: project.summary,
      images: [{ url: project.image, width: 1600, height: 1100, alt: `${project.name} cover artwork` }],
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const study = CASE_STUDIES[project.slug];
  const index = PROJECTS.findIndex((p) => p.slug === project.slug);
  const next = PROJECTS[(index + 1) % PROJECTS.length]!;

  return (
    <article className="pt-[var(--nav-h)]">
      <header className="relative overflow-hidden border-b border-rule">
        <div aria-hidden="true" className="absolute inset-0 opacity-40" />
        <div className="relative mx-auto w-full max-w-[1320px] px-5 py-20 sm:px-8 sm:py-28">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft size={15} />
            All work
          </Link>

          <p className={cn("eyebrow mt-10", accentText(project.accent))}>
            {project.tagline} · {project.year}
          </p>
          <h1 className="display-hero mt-4 text-ink">{project.name}</h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {project.summary}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-2.5">
            <LiveDemoButton href={project.liveUrl} />
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-rule px-4 py-2 text-sm text-ink transition-colors hover:border-ink"
            >
              <Github size={15} />
              Source
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8">
        <div className="overflow-hidden border border-rule bg-surface">
          <Image
            src={project.image}
            alt={`${project.name} running in the browser`}
            width={1440}
            height={900}
            priority
            sizes="100vw"
            className="aspect-[16/10] w-full object-cover object-top"
          />
        </div>

        <div className="grid gap-14 py-20 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20 lg:py-28">
          <div className="min-w-0 space-y-14">
              <h2 className="eyebrow text-muted">The brief</h2>
              <p className="mt-5 text-lg leading-relaxed [overflow-wrap:anywhere] text-ink">{study?.brief}</p>

              <h2 className="eyebrow text-muted">Approach</h2>
              <ul className="mt-5 space-y-4">
                {study?.approach.map((item) => (
                  <li key={item} className="flex gap-4 text-base leading-relaxed text-muted">
                    <span className={cn("mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full", accentDot(project.accent))} />
                    {/* A verbatim token like an HMAC payload has no spaces to break at. */}
                    <span className="min-w-0 [overflow-wrap:anywhere]">{item}</span>
                  </li>
                ))}
              </ul>

              <h2 className="eyebrow text-muted">Verified in a browser</h2>
              <p className="mt-3 text-sm text-muted">
                Each line below was exercised against a production build of this project.
              </p>
              <ul className="mt-5 divide-y divide-rule rounded-xl border border-rule">
                {study?.verified.map((item) => (
                  <li key={item} className="p-5 text-sm leading-relaxed [overflow-wrap:anywhere] text-ink">
                    {item}
                  </li>
                ))}
              </ul>

              <h2 className="eyebrow text-muted">What this does not do</h2>
              <ul className="mt-5 space-y-3">
                {study?.limits.map((item) => (
                  <li key={item} className="flex gap-4 text-sm leading-relaxed text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span className="min-w-0 [overflow-wrap:anywhere]">{item}</span>
                  </li>
                ))}
              </ul>
          </div>

          <aside className="min-w-0 space-y-8 lg:sticky lg:top-[calc(var(--nav-h)+40px)] lg:self-start">
            <div className="border border-rule bg-surface rounded-xl p-6">
              <h2 className="eyebrow text-muted">Role</h2>
              <p className="mt-3 text-sm text-ink">{project.role}</p>
            </div>

            <div className="border border-rule bg-surface rounded-xl p-6">
              <h2 className="eyebrow text-muted">Stack</h2>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <Pill key={tech}>{tech}</Pill>
                ))}
              </div>
            </div>

            <div className="border border-rule bg-surface rounded-xl p-6">
              <h2 className="eyebrow text-muted">Features</h2>
              <ul className="mt-4 space-y-3">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-surface" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-rule bg-surface rounded-xl p-6">
              <h2 className="eyebrow text-muted">Status</h2>
              <p className="mt-3 text-sm text-ink">{statusLabel(project.liveUrl)}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {project.liveUrl
                  ? "Deployed and reachable at the link above."
                  : "Runs locally from the repository. No hosted instance exists, so no link is given."}
              </p>
            </div>
          </aside>
        </div>
      </div>

      <nav aria-label="Next project" className="border-t border-rule bg-surface">
        <Link
          href={`/work/${next.slug}`}
          className="group mx-auto flex w-full max-w-[1320px] items-center justify-between gap-6 px-5 py-14 sm:px-8"
        >
          <span>
            <span className="eyebrow text-muted">Next project</span>
            <span className="display-md mt-3 block transition-colors group-hover:text-white">
              {next.name}
            </span>
            <span className="mt-1 block text-sm text-muted">{next.tagline}</span>
          </span>
          <ArrowRight
            size={24}
            className="shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink"
          />
        </Link>
      </nav>
    </article>
  );
}

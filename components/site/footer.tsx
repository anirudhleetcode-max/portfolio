import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";

const YEAR = "2026";

export function SiteFooter() {
  return (
    <footer className="border-t border-white-warm/10 bg-deep">
      <div className="mx-auto w-full max-w-[1320px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="eyebrow text-fog">Anirudh</p>
            <p className="display-md mt-4 max-w-sm text-balance">
              Full-stack developer building web applications that hold up in production.
            </p>
            <a
              href="mailto:anirudhleetcode@gmail.com"
              className="mt-6 inline-flex items-center gap-2 text-sm text-fog transition-colors hover:text-white-warm"
            >
              <Mail size={15} />
              anirudhleetcode@gmail.com
            </a>
          </div>

          <div>
            <p className="eyebrow text-fog">Work</p>
            <ul className="mt-4 space-y-2.5">
              {PROJECTS.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/work/${project.slug}`}
                    className="text-sm text-fog transition-colors hover:text-white-warm"
                  >
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-fog">Elsewhere</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href="https://github.com/anirudhleetcode-max/paperlens-retriever"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-fog transition-colors hover:text-white-warm"
                >
                  <Github size={15} /> GitHub <ArrowUpRight size={13} />
                </a>
              </li>
              <li>
                <span className="inline-flex items-center gap-2 text-sm text-fog/60">
                  <Linkedin size={15} /> LinkedIn — not linked yet
                </span>
              </li>
              <li>
                <Link href="/#contact" className="text-sm text-fog transition-colors hover:text-white-warm">
                  Contact form
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white-warm/10 pt-6 text-xs text-fog sm:flex-row sm:items-center sm:justify-between">
          <p className="mono">© {YEAR} Anirudh. Built with Next.js, TypeScript and Tailwind.</p>
          <p className="mono max-w-xl sm:text-right">
            The five businesses in this portfolio are fictional demos. No live deployments, no real
            clients and no real transactions are claimed anywhere on this site.
          </p>
        </div>
      </div>
    </footer>
  );
}

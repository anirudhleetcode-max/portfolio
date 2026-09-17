import Link from "next/link";
import { PROJECTS } from "@/lib/projects";

const YEAR = "2026";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-display text-[1.125rem] text-ink">Anirudh</p>
            <p className="serif mt-3 max-w-xs text-[1.125rem] text-muted">
              Built with curiosity and care.
            </p>
            <a
              href="mailto:anirudhmalladi2007@gmail.com"
              className="prose-link mt-6 inline-block text-[0.9375rem]"
            >
              anirudhmalladi2007@gmail.com
            </a>
          </div>

          <div>
            <p className="mono text-[0.75rem] text-muted">Work</p>
            <ul className="mt-4 space-y-2.5">
              {PROJECTS.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/work/${project.slug}`}
                    className="link-underline text-[0.9375rem] text-muted transition-colors hover:text-ink"
                  >
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mono text-[0.75rem] text-muted">Elsewhere</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href="https://github.com/anirudhleetcode-max"
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline text-[0.9375rem] text-muted transition-colors hover:text-ink"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/anirudh-malladi-928651319"
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline text-[0.9375rem] text-muted transition-colors hover:text-ink"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="link-underline text-[0.9375rem] text-muted transition-colors hover:text-ink"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mono mt-14 flex flex-col gap-3 border-t border-rule pt-6 text-[0.75rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {YEAR} Anirudh Malladi</p>
          <p className="max-w-xl sm:text-right">
            Every figure on this site came from the project&rsquo;s own evaluation. No client work is
            claimed, and results that are unflattering are shown alongside the rest.
          </p>
        </div>
      </div>
    </footer>
  );
}

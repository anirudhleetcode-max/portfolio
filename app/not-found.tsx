import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[72svh] items-center overflow-hidden pt-[var(--nav-h)]">
      <div className="relative mx-auto w-full max-w-[1200px] px-5 py-24 sm:px-8">
        <p className="mono text-sm text-accent">404</p>
        <h1 className="display-xl mt-4 max-w-[16ch] text-balance text-ink">
          That page does not exist.
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
          The link may be out of date, or the address may have a typo in it. The work and the contact
          form are both on the home page.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 bg-ink px-6 py-3 text-[0.9375rem] font-medium text-paper transition-colors hover:bg-accent"
        >
          <ArrowLeft size={16} />
          Back home
        </Link>
      </div>
    </div>
  );
}

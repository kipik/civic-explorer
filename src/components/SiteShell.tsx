import Link from "next/link";
import type { ReactNode } from "react";

interface SiteShellProps {
  children: ReactNode;
  badgeText?: string;
  showHomeLink?: boolean;
}

export function SiteShell({
  children,
  badgeText = "Prototype — Lot P0.2",
  showHomeLink = false,
}: SiteShellProps) {
  return (
    <>
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-md py-1 pr-2 text-stone-900 no-underline hover:text-slate-800"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-800 bg-slate-900 text-xs font-semibold tracking-wider text-white"
              >
                CE
              </span>
              <span className="text-base font-semibold tracking-tight text-stone-900">
                Civic Explorer
              </span>
            </Link>
            {showHomeLink ? (
              <Link
                href="/"
                className="inline-flex min-h-[36px] items-center rounded-md px-2.5 py-1 text-sm font-medium text-stone-700 underline-offset-4 hover:text-stone-950 hover:underline"
              >
                Accueil
              </Link>
            ) : null}
          </div>
          <span className="inline-flex items-center rounded-full border border-stone-300 bg-stone-100 px-3 py-1 text-xs font-medium text-stone-800">
            {badgeText}
          </span>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>

      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-6 text-sm text-stone-700 sm:px-6">
          <p>
            Civic Explorer — Prototype d&apos;exploration civique. Outil d&apos;information et de
            clarification, sans conseil électoral ni transmission serveur des réponses.
          </p>
        </div>
      </footer>
    </>
  );
}

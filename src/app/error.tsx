"use client";

import Link from "next/link";

// Shown if a page throws while rendering in the browser. No error details
// are shown to visitors.
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="main" className="flex min-h-[80vh] items-center">
      <div className="mx-auto w-full max-w-5xl px-4 py-32 sm:px-6">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">Something went wrong</p>
        <h1 className="text-4xl font-semibold tracking-tight text-fg md:text-5xl">This page hit an error.</h1>
        <p className="mt-4 max-w-md text-lg text-fg-muted">Try again, or head back to the home page.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-11 items-center rounded-md bg-accent-solid px-5 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent-solid-hover"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-md border border-line-strong px-5 text-sm font-medium text-fg transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            Home page
          </Link>
        </div>
      </div>
    </main>
  );
}

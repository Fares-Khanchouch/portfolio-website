import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
  alternates: { canonical: null },
  openGraph: null,
};

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar home={false} />
      <main id="main" className="relative flex flex-1 items-center overflow-hidden">
        <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0" />
        <div className="relative mx-auto w-full max-w-5xl px-4 py-32 sm:px-6">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">Error 404</p>
          <h1 className="text-4xl font-semibold tracking-tight text-fg md:text-5xl">This page doesn&apos;t exist.</h1>
          <p className="mt-4 max-w-md text-lg text-pretty text-fg-muted">
            The link may be old, or the address has a typo.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex h-11 items-center rounded-md bg-accent-solid px-5 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent-solid-hover"
            >
              Back to the home page
            </Link>
            <Link
              href="/#contact"
              className="inline-flex h-11 items-center rounded-md border border-input-border px-5 text-sm font-medium text-fg transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              Contact me
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, FolderGit2, Mail, User } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Page not found",
  // Overrides the layout's "index, follow" so it can't contradict the
  // noindex Next adds to not-found pages.
  robots: { index: false, follow: true },
  alternates: { canonical: null },
  openGraph: null,
  twitter: null,
};

// The site's pages as a small graph; the requested page is the broken node.
// The section nodes are real links back into the home page.
function SiteMap() {
  const nodes: [string, string, number, number, typeof Briefcase][] = [
    ["Experience", "work", 70, 60, Briefcase],
    ["Projects", "projects", 330, 60, FolderGit2],
    ["About", "about", 70, 250, User],
    ["Contact", "contact", 330, 250, Mail],
  ];
  return (
    <nav aria-label="Site sections">
      <svg viewBox="0 0 420 320" className="mx-auto h-auto w-full max-w-md" style={{ fontFamily: "var(--font-mono)" }}>
        {nodes.map(([label, , x, y]) => (
          <line key={label} x1={200} y1={155} x2={x} y2={y} stroke="var(--line-strong)" strokeWidth={1.4} />
        ))}
        {/* the broken link: two segments that no longer meet */}
        <path d="M234 155 H268 l6 -5" fill="none" stroke="var(--line-strong)" strokeWidth={1.4} strokeLinecap="round" />
        <path d="M286 161 l4 -6 H340" fill="none" stroke="var(--danger)" strokeOpacity={0.6} strokeWidth={1.4} strokeDasharray="3 4" strokeLinecap="round" />
        <circle cx={200} cy={155} r={34} fill="var(--bg-raised)" />
        <circle cx={200} cy={155} r={34} fill="var(--accent-soft)" stroke="var(--accent)" strokeOpacity={0.7} />
        <text x={200} y={159} textAnchor="middle" fontSize={12} fill="var(--fg)">
          home
        </text>
        {nodes.map(([label, id, x, y, Icon]) => (
          <a key={label} href={`/#${id}`} className="sitemap-node">
            <circle cx={x} cy={y} r={26} fill="var(--bg-raised)" stroke="var(--line-strong)" />
            <Icon x={x - 10} y={y - 10} width={20} height={20} color="var(--accent)" aria-hidden="true" />
            <text x={x} y={y + 44} textAnchor="middle" fontSize={11.5} fill="var(--fg-muted)">
              {label}
            </text>
          </a>
        ))}
        <circle className="broken-ring" cx={372} cy={155} r={30} fill="none" stroke="var(--danger)" strokeOpacity={0.7} strokeDasharray="5 5" />
        <text x={372} y={159} textAnchor="middle" fontSize={12} fill="var(--danger)">
          404
        </text>
      </svg>
    </nav>
  );
}

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar home={false} />
      <main id="main" className="relative flex flex-1 items-center overflow-hidden">
        <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid w-full max-w-5xl items-center gap-12 px-4 pt-32 pb-12 sm:px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:pb-32">
          <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">Error 404</p>
          <h1 className="text-4xl font-semibold tracking-tight text-fg md:text-5xl">This page doesn&rsquo;t exist.</h1>
          <p className="mt-4 max-w-md text-lg text-pretty text-fg-muted">
            The link may be old, or the address has a typo.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex h-11 items-center rounded-full bg-accent-solid px-5 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent-solid-hover"
            >
              Back to the home page
            </Link>
            <Link
              href="/#contact"
              className="inline-flex h-11 items-center rounded-full border border-input-border px-5 text-sm font-medium text-fg transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              Contact me
            </Link>
          </div>
          </div>
          <SiteMap />
        </div>
      </main>
      <Footer backToTop={false} />
    </div>
  );
}

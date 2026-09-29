import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import FlowDiagram from "@/components/FlowDiagram";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { site, writeup } from "@/data";

const path = `/writing/${writeup.slug}`;

export const metadata: Metadata = {
  title: writeup.title,
  description: writeup.description,
  alternates: { canonical: path },
  openGraph: {
    type: "article",
    url: `${site.url}${path}`,
    title: writeup.title,
    description: writeup.description,
    publishedTime: writeup.date,
    authors: [site.name],
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: writeup.title,
    description: writeup.description,
    images: ["/opengraph-image"],
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: writeup.title,
  description: writeup.description,
  datePublished: writeup.date,
  author: { "@type": "Person", name: site.name, url: site.url },
  mainEntityOfPage: `${site.url}${path}`,
};

const RESULTS: [string, string, string][] = [
  ["Postings' hard requirements addressed", "54% of runs", "100% of runs"],
  ["Résumé score, recruiter + hiring-manager panel", "5.1 / 10", "6.3 / 10"],
  ["Cover-letter score, same panel", "4.6 / 10", "6.7 / 10"],
  ["Bullets judged overclaimed", "6%", "0%"],
  ["Senior-FDE panel: “yes” to an interview loop", "33%", "100%"],
];

export default function Writeup() {
  const date = new Date(writeup.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <>
      <Navbar home={false} />
      <main id="main" className="pt-28 pb-24 md:pt-36">
        <article className="mx-auto max-w-2xl px-4 sm:px-6">
          <Link
            href="/#projects"
            className="group mb-10 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors duration-200 hover:text-fg"
          >
            <ArrowLeft size={15} aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-x-0.5" />
            Back to projects
          </Link>

          <header className="mb-10">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">
              Write-up · <time dateTime={writeup.date}>{date}</time>
            </p>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-fg md:text-4xl">{writeup.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-fg-muted">{writeup.description}</p>
          </header>

          <div className="prose-body">
            <h2>The problem</h2>
            <p>
              Ask a language model to tailor a résumé to a job posting and it will happily do it. It
              will also, sooner or later, round a number up, add a tool the posting asks for, or claim
              a result nobody measured. Each of those reads well and is false, and a reviewer who
              catches one stops trusting the rest.
            </p>
            <p>
              I wanted generation that is tailored per posting but <strong>cannot state anything that
              isn&apos;t on file</strong>, and a way to measure whether the output is actually good,
              not just whether it looks good to the person who built it.
            </p>

            <h2>Facts in, slots out</h2>
            <p>
              Everything the documents may say lives in a <strong>versioned fact vault</strong>: every
              role, bullet, project and skill, in English and French, with a full snapshot kept on
              every change. The model never writes a document from scratch. It reads a short brief
              (the posting&apos;s key terms and a menu of vault items) and returns a payload: which
              items to use, in what order, and optional rewrites of their wording.
            </p>
          </div>

          <div className="my-8 rounded-xl border border-line bg-surface p-4 md:p-5">
            <FlowDiagram
              label="Generation pipeline"
              steps={["Posting", "Brief", "Fact vault", "LLM payload", "Guards", "Fit to page", "PDF"]}
            />
          </div>

          <div className="prose-body">
            <p>Deterministic code then checks the payload and renders it:</p>
            <ul>
              <li>
                <strong>Numbers:</strong> a rewrite may not contain a number that isn&apos;t in the
                original fact, so &ldquo;cut costs by 30%&rdquo; can&apos;t appear from nowhere.
              </li>
              <li>
                <strong>Technologies:</strong> a rewrite may not name a tool or technology that
                appears nowhere in the vault.
              </li>
              <li>
                <strong>Cross-document consistency:</strong> a cover letter that cites a fact the
                paired résumé left out gets flagged before it goes anywhere.
              </li>
              <li>
                <strong>Fit:</strong> the renderer measures the real PDF and trims the lowest-priority
                content until it fits the page limit, never dropping a whole role.
              </li>
            </ul>
            <p>
              A document is a pure function of the template version, the vault version and the
              payload, so any document can be re-rendered byte-for-byte later, which is how I know
              what was actually sent.
            </p>

            <h2>Where the postings come from</h2>
            <p>
              The same system is a Python MCP server that crawls 63,000+ company job boards through 24
              applicant-tracking-system adapters into a local database of 1.1M+ postings, normalised
              into one record shape. Matching and ranking are deterministic keyword scoring plus a
              small local embedding model; the model supplies judgment, the server supplies memory and
              hands.
            </p>

            <h2>Measuring it: agents in the loop</h2>
            <p>
              Unit tests can prove a guard works. They can&apos;t tell you whether a recruiter would
              call. So the evaluation harness runs the real pipeline end to end: AI agents act as the
              user on a fixed benchmark of 12 real postings, calling the same tools a person would,
              24 runs per round. Blind reviewer panels (recruiter and hiring manager, plus a
              senior forward-deployed-engineer panel for the six FDE postings) then score every
              document against a written brief, without knowing which version they are reading.
            </p>
            <p>
              Each round&apos;s findings became fixes: a clearer brief for the model, stricter guards,
              a better page order. Then the same benchmark ran again against the documents produced
              before the work started.
            </p>
          </div>

          <div className="my-8 overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[480px] text-left text-sm">
              <caption className="sr-only">Results before and after, same benchmark and reviewer briefs</caption>
              <thead className="bg-surface font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Measure</th>
                  <th scope="col" className="px-4 py-3 font-medium">Before</th>
                  <th scope="col" className="px-4 py-3 font-medium">After</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {RESULTS.map(([m, a, b]) => (
                  <tr key={m}>
                    <th scope="row" className="px-4 py-3 font-normal text-fg-muted">{m}</th>
                    <td className="px-4 py-3 whitespace-nowrap text-fg-subtle">{a}</td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-fg">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="prose-body">
            <p>
              The panels score strictly: 5 is a typical application and 7 is one that gets
              shortlisted. The remaining gap is mostly not wording. Reviewers asked for outcomes the
              fact vault doesn&apos;t hold yet, which is exactly the point: the system won&apos;t
              invent them.
            </p>

            <h2>What I took from it</h2>
            <ul>
              <li>
                Put the model where judgment is needed (what to emphasise, how to phrase it) and keep
                everything checkable in code.
              </li>
              <li>
                A guard you can&apos;t measure is a guess. The agent-in-the-loop harness turned
                &ldquo;this looks better&rdquo; into numbers I could compare across rounds.
              </li>
              <li>
                Most quality gains came from better inputs and clearer instructions, not a bigger
                model.
              </li>
            </ul>
            <p>
              Stack: Python, MCP, SQLite, an ONNX embedding model, HTML-to-PDF rendering, and a lot of
              tests. The code is private; I&apos;m happy to walk through it. <Link href="/#contact">Get in touch</Link>.
            </p>
          </div>
        </article>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}

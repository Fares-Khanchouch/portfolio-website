import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import GroundedDiagram from "@/components/diagrams/GroundedDiagram";
import GuardExample from "@/components/writing/GuardExample";
import ResultsChart from "@/components/writing/ResultsChart";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ReadingProgress from "@/components/ReadingProgress";
import { InlineToc, SideToc } from "@/components/writing/Toc";
import { site, writeup } from "@/data";

const path = `/writing/${writeup.slug}`;

export const metadata: Metadata = {
  title: writeup.title,
  description: writeup.description,
  alternates: { canonical: path },
  openGraph: {
    type: "article",
    siteName: site.name,
    locale: site.locale,
    url: `${site.url}${path}`,
    title: writeup.title,
    description: writeup.description,
    publishedTime: writeup.date,
    authors: [site.name],
  },
  twitter: {
    card: "summary_large_image",
    title: writeup.title,
    description: writeup.description,
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: writeup.title,
  description: writeup.description,
  datePublished: writeup.date,
  author: { "@type": "Person", "@id": `${site.url}/#person`, name: site.name, url: site.url },
  image: `${site.url}${path}/opengraph-image`,
  inLanguage: "en",
  isPartOf: { "@id": `${site.url}/#website` },
  mainEntityOfPage: `${site.url}${path}`,
};


const TOC = [
  { id: "problem", title: "The problem" },
  { id: "facts", title: "Facts in, slots out" },
  { id: "postings", title: "Where the postings come from" },
  { id: "measuring", title: "Measuring it: agents in the loop" },
  { id: "takeaways", title: "What I took from it" },
];

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="group scroll-mt-28">
      {children}
      {/* A mouse convenience; the contents list is the keyboard route. */}
      <a href={`#${id}`} aria-hidden="true" tabIndex={-1} className="ml-2 text-fg-subtle no-underline opacity-0 transition-opacity group-hover:opacity-100">
        #
      </a>
    </h2>
  );
}

export default function Writeup() {
  const date = new Date(writeup.date).toLocaleDateString("en-US", {
    timeZone: "UTC",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <>
      <Navbar home={false} />
      <ReadingProgress />
      <main id="main" className="overflow-x-clip pt-28 pb-24 md:pt-36">
        <article className="relative mx-auto max-w-2xl px-4 sm:px-6">
          <SideToc items={TOC} />
          <Link
            href="/#projects"
            className="group mb-8 inline-flex min-h-11 items-center gap-2 text-sm text-fg-muted transition-colors duration-200 hover:text-fg"
          >
            <ArrowLeft size={15} aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-x-0.5" />
            Back to projects
          </Link>

          <header className="mb-10">
            <p className="mb-4 flex flex-wrap gap-x-2 gap-y-1 font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {/* Each separator stays at the end of its segment, so a wrapped
                  line never starts with one. */}
              <span>Write-up ·</span>
              <span>
                <Link href="/" rel="author" className="underline-offset-4 hover:underline">
                  {site.name}
                </Link>
                <span className="max-sm:hidden"> ·</span>
              </span>
              <span className="max-sm:basis-full">
                <time dateTime={writeup.date}>{date}</time> · {writeup.readingMinutes} min read
              </span>
            </p>
            <h1 className="break-words text-3xl font-semibold leading-tight tracking-tight text-fg md:text-4xl">{writeup.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-fg-muted">{writeup.description}</p>
          </header>

          <InlineToc items={TOC} />

          <div className="prose-body">
            <H2 id="problem">The problem</H2>
            <p>
              Ask a language model to tailor a document to a specific reader (I used résumés against
              real job postings, because the facts are easy to check) and it will happily do it. It
              will also, sooner or later, round a number up, add a tool the posting asks for, or claim
              a result nobody measured. Each of those reads well and is false, and a reviewer who
              catches one stops trusting the rest.
            </p>
            <p>
              I wanted generation that is tailored per posting but <strong>can only draw on what&rsquo;s on
              file</strong>, with the checkable parts enforced in code, and a way to measure whether the output is actually good,
              not just whether it looks good to the person who built it.
            </p>

            <H2 id="facts">Facts in, slots out</H2>
            <p>
              Everything the documents may say lives in a <strong>versioned fact vault</strong>: every
              role, bullet, project and skill, in English and French, with a full snapshot kept on
              every change. The model never writes a document from scratch. It reads a short brief
              (the posting&rsquo;s key terms and a menu of vault items) and returns a payload: which
              items to use, in what order, and optional rewrites of their wording.
            </p>
          </div>

          {/* Breaks out of the text column from lg up to show the wide layout. */}
          <figure data-toc-avoid className="my-8 rounded-xl border border-line bg-surface p-4 shadow-card md:p-6 lg:-mx-44 lg:px-6">
            <GroundedDiagram />
            <figcaption className="mt-4 px-4 text-center text-xs text-balance text-fg-subtle">
              The whole system: ingest, grounded generation, and the evaluation harness that measures it.
            </figcaption>
          </figure>

          <div className="prose-body">
            <p>Deterministic code then checks the payload and renders it:</p>
            <ul>
              <li>
                <strong>Numbers:</strong> a rewrite may not contain a number that isn&rsquo;t in the
                original fact, so &ldquo;cut costs by 30%&rdquo; can&rsquo;t appear from nowhere.
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
          </div>

          <GuardExample />

          <div className="prose-body">
            <p>
              A document is a pure function of the template version, the vault version and the
              payload, so any document can be rebuilt later and checked against a stored hash.
            </p>

            <H2 id="postings">Where the postings come from</H2>
            <p>
              The same system is a Python MCP server that crawls 63,000+ company job boards through 24
              applicant-tracking-system adapters into a local database of 1.1M+ postings, normalized
              into one record shape. Matching and ranking are deterministic keyword scoring plus a
              small local embedding model. The model makes the judgment calls; the code does everything
              that can be checked.
            </p>

            <H2 id="measuring">Measuring it: agents in the loop</H2>
            <p>
              Unit tests can prove a guard works. They can&rsquo;t tell you whether a reader finds the output convincing. So the evaluation harness runs the real pipeline end to end: AI agents act as the
              user on a fixed benchmark of 12 real postings, calling the same tools a person would,
              24 runs per round. Blind LLM reviewer panels, briefed as a recruiter, a hiring manager
              and, for some postings, a senior engineer from the role&rsquo;s own field, then score the
              documents against a written rubric, without knowing which version they are reading.
            </p>
            <p>
              Each round&rsquo;s findings became fixes: a clearer brief for the model, stricter guards,
              a better page order. Then the same 12 postings ran again, compared with the documents
              produced before the work started (panel scores) and the pre-fix pipeline
              (requirements coverage).
            </p>
          </div>

          <ResultsChart />

          <div className="prose-body">
            <p>
              The panels score strictly: on their scale 5 is typical and 7 is shortlisted. The remaining gap is mostly not wording: reviewers asked for outcomes that aren&rsquo;t on file, and the system won&rsquo;t invent them.
            </p>

            <H2 id="takeaways">What I took from it</H2>
            <ul>
              <li>
                Put the model where judgment is needed (what to emphasize, how to phrase it) and keep
                everything checkable in code.
              </li>
              <li>
                A guard you can&rsquo;t measure is a guess. The agent-in-the-loop harness turned
                &ldquo;this looks better&rdquo; into numbers I could compare across rounds.
              </li>
              <li>
                Most quality gains came from better inputs (a rebuilt fact vault) and clearer
                instructions to the model.
              </li>
            </ul>
            <p>
              Stack: Python, MCP, SQLite, a small local embedding model, HTML-to-PDF rendering, and 1,200+
              automated tests. The code is private; I&rsquo;m happy to walk through it. <Link href="/#contact">Get in touch</Link>.
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

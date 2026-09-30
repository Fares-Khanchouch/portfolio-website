// ================================================================
//  PORTFOLIO CONTENT: edit this file to update the entire site.
//  Components only read from here.
//
//  Rules (docs/PLAN_2026-10.md): every fact matches the résumé; no
//  job-search signals (no "open to opportunities", relocation or
//  availability); no client names or client-internal figures on this
//  public page.
// ================================================================

export const site = {
  url: "https://fareskhanchouch.com",
  name: "Fares Khanchouch",
  title: "Fares Khanchouch · Forward Deployed Engineer",
  description:
    "Fares Khanchouch, Integration Consultant in Tunis doing forward-deployed work: credit-platform delivery and core-banking integrations for banks, and grounded LLM tooling.",
  locale: "en_US",
  // Bump when the content changes (sitemap lastmod, structured data).
  updated: "2026-09-30",
};

export const social = {
  email: "fares.khanchouch@gmail.com",
  github: "https://github.com/Fares-Khanchouch",
  linkedin: "https://www.linkedin.com/in/fares-khanchouch/",
  resume: "/resume.pdf",
};

// EmailJS keys are public by design (they can only trigger this template).
// Restrict allowed origins in the EmailJS dashboard.
export const emailjs = {
  serviceId: "service_1jmn1ld",
  templateId: "template_ty6k1xs",
  publicKey: "A1yyyeM4xJuzcDdAA",
};

export const nav = [
  { name: "Experience", id: "work" },
  { name: "Projects", id: "projects" },
  { name: "About", id: "about" },
  { name: "Contact", id: "contact" },
];

export const hero = {
  firstName: "Fares",
  lastName: "Khanchouch",
  eyebrow: "Integrations & LLM agent tooling",
  headline: "Forward Deployed Engineer",
  tagline:
    "I take bank credit platforms from scoping to go-live, connect them to the systems banks already run, and build LLM tooling that sticks to the facts.",
  // Background-removed portrait (hero); the square avatar feeds the share
  // card and structured data.
  cutout: "/portrait-cutout.webp",
  avatar: "/avatar-512.jpg",
  photoAlt: "Portrait of Fares Khanchouch",
  // Proof strip under the hero buttons (all from the fact vault).
  proof: [
    { value: "2", label: "bank production releases" },
    { value: "6+", label: "automation clients" },
    { value: "1.1M+", label: "job postings indexed" },
    { value: "1,200+", label: "automated tests" },
  ],
};

export const about = {
  heading: "About",
  // Shown large above the paragraphs.
  lede: { text: "I work with client teams from the first scoping conversation", accent: "to go-live support." },
  paragraphs: [
    "Hi, I’m Fares. The client teams are usually bank IT, credit and business people. I’ve also run a paid n8n training that took a client from zero to building their own workflows.",
    "Outside work I build LLM tooling and a Kubernetes operator for n8n.",
  ],
  facts: [
    { label: "Based in", value: "Tunis, Tunisia" },
    {
      label: "Education",
      value:
        "Engineering degree in Computer Science · ISTY, Université Paris-Saclay · 2021 – 2024",
    },
    { label: "Languages", value: "Arabic (native) · French (C1) · English (C1, TOEIC 985/990)" },
  ],
  // Grouped the way the fact vault groups them (skills.*).
  skillGroups: [
    { name: "AI & agents", items: ["MCP servers", "Claude agent skills", "LLM APIs", "LLM evals"] },
    { name: "Integration", items: ["REST APIs", "Webhooks", "OAuth / API keys", "n8n", "Make"] },
    { name: "Languages", items: ["Python", "TypeScript", "C#", "Go", "T-SQL"] },
    { name: "Platform", items: ["Docker", "Kubernetes", "Terraform", "AWS", "PostgreSQL"] },
  ],
  get skills() {
    return this.skillGroups.flatMap((g) => g.items);
  },
};

export type Highlight = {
  title: string;
  text: string;
  details?: string[];
  icon: "delivery" | "integration" | "agent";
};

export const now = {
  heading: "Delivery and integration for banks",
  role: "Integration Consultant",
  company: "Axe Finance",
  dates: "Dec 2025 – Present",
  location: "Tunis, Tunisia",
  highlights: [
    {
      icon: "delivery",
      title: "Delivery, end to end",
      text: "Credit-platform changes for banks in Qatar and Saudi Arabia, from scoping through UAT to go-live and support, including two production releases.",
    },
    {
      icon: "integration",
      title: "Core-banking integration",
      text: "REST services in C# that feed customers, limits and outstandings into credit workflows, plus SMS alerts secured with OAuth, API keys and IP whitelisting.",
    },
    {
      icon: "agent",
      title: "Agent tooling, alongside delivery",
      text: "Internal Python tooling (MCP servers and Claude skills) so an agent can explain a live deployment and cite its sources.",
    },
  ] as Highlight[],
};

// Career timeline (months are 1-12; a null end means "present").
export type Span = {
  label: string;
  detail: string;
  start: [number, number];
  end: [number, number] | null;
  kind: "work" | "study";
};

export const timeline: Span[] = [
  { label: "ISTY, Université Paris-Saclay", detail: "Engineering degree", start: [2021, 9], end: [2024, 8], kind: "study" },
  { label: "WAY2CLOUD", detail: "DevOps Intern", start: [2022, 6], end: [2022, 7], kind: "work" },
  { label: "WAY2CLOUD", detail: "Full-Stack Intern", start: [2023, 5], end: [2023, 8], kind: "work" },
  { label: "Nuage Up", detail: "Cloud & DevSecOps Intern", start: [2024, 5], end: [2024, 8], kind: "work" },
  { label: "Independent", detail: "Freelance Automation Engineer", start: [2024, 9], end: [2025, 11], kind: "work" },
  { label: "Axe Finance", detail: "Integration Consultant", start: [2025, 12], end: null, kind: "work" },
];

export type Role = {
  role: string;
  company: string;
  dates: string;
  summary: string;
  tags: string[];
};

export const before: Role[] = [
  {
    role: "Freelance Automation Engineer",
    company: "Independent",
    dates: "Sep 2024 – Nov 2025",
    summary:
      "Automation projects for 6+ clients, mostly in n8n and Make: an AI content pipeline (LLM scripts, ElevenLabs voice-overs, Whisper captions), KYC document pipelines with LLM/OCR extraction, and a 100,000+ row Excel-to-Airtable migration via API scripts.",
    tags: ["n8n", "Make", "Airtable", "LLM APIs"],
  },
  {
    role: "Cloud & DevSecOps Intern",
    company: "Nuage Up",
    dates: "May – Aug 2024",
    summary:
      "AWS in Terraform, CI/CD with security scanning, Kubernetes deployments with network policies and RBAC.",
    tags: ["AWS", "Terraform", "Kubernetes", "CI/CD"],
  },
  {
    role: "Full-Stack Web Development Intern",
    company: "WAY2CLOUD",
    dates: "May – Aug 2023",
    summary: "An e-commerce platform in React, Node.js and MongoDB, built solo.",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    role: "DevOps Intern",
    company: "WAY2CLOUD",
    dates: "Jun – Jul 2022",
    summary:
      "A Python REST API automating Kubernetes cluster operations, containerized and deployed with Helm.",
    tags: ["Python", "Kubernetes", "Helm"],
  },
];

// A project's `flow` is drawn as an animated diagram: a highlight walks the
// steps in order (static when the visitor prefers reduced motion).
export type Project = {
  id: string;
  title: string;
  kind: string;
  summary: string;
  points: string[];
  flow: string[];
  tags: string[];
  /** `scale` (the value that fills the bar) turns a metric into a before/after bar. */
  metrics?: { label: string; before: string; after: string; scale?: number; unit?: string }[];
  conditions?: string[];
  link?: { label: string; href: string; external?: boolean };
};

export const projects: Project[] = [
  {
    id: "job-platform",
    title: "Grounded LLM generation & a 1.1M-posting data platform",
    kind: "Personal project",
    summary:
      "A Python MCP server that crawls 63,000+ company job boards through 24 ATS adapters into 1.1M+ postings, plus an LLM document generator whose every claim must come from a versioned fact store.",
    points: [
      "Every generated claim traces to a versioned fact store; invented numbers and technologies are rejected.",
      "An agent-in-the-loop evaluation harness: AI agents run the real pipeline and blind LLM reviewer panels score the output.",
    ],
    metrics: [
      { label: "Runs covering every hard requirement", before: "54%", after: "100%", scale: 100 },
      { label: "Bullets judged overclaimed", before: "6%", after: "0%", scale: 100 },
      { label: "Blind LLM-reviewer score", before: "5.1", after: "6.3", scale: 10, unit: "/10" },
    ],
    flow: ["Postings", "Brief", "Fact vault", "LLM payload", "Guards", "PDF"],
    tags: ["Python", "MCP", "SQLite", "Embeddings", "LLM evals"],
    link: { label: "Read the write-up", href: "/writing/grounded-llm-generation" },
  },
  {
    id: "n8n-operator",
    title: "n8n Kubernetes Operator",
    kind: "Open source",
    summary:
      "Runs a complete n8n instance on Kubernetes from one declarative YAML file instead of 8+ hand-written manifests.",
    points: [
      "A custom resource provisions PostgreSQL, n8n, secrets and networking, with isolated multi-instance setups.",
      "A reconciliation loop keeps each instance healthy and reports its status.",
    ],
    metrics: [{ label: "To run n8n with PostgreSQL", before: "8+ manifests", after: "1 resource" }],
    conditions: ["Ready", "N8nReady", "PostgresReady"],
    flow: ["YAML", "CRD", "Reconcile", "Postgres", "n8n"],
    tags: ["Go", "Kubernetes", "Operators", "n8n", "PostgreSQL"],
    link: {
      label: "View on GitHub",
      href: "https://github.com/Fares-Khanchouch/n8n-operator",
      external: true,
    },
  },
];

export const contact = {
  heading: "Say hello",
  text: "Email is the quickest way to reach me. The form works too.",
};

export const writeup = {
  slug: "grounded-llm-generation",
  title: "Grounded LLM generation: keeping the model to the facts",
  description:
    "How I built LLM generation where every claim traces to a versioned fact store, and an agent-in-the-loop harness with blind LLM reviewers to measure it.",
  date: "2026-09-29",
  // ~660 words at 230 a minute, plus time on the figures.
  readingMinutes: 4,
};

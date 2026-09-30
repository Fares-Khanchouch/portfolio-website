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
    "Fares Khanchouch, Forward Deployed Engineer in Tunis. Enterprise integrations for banks, MCP servers, Claude skills and LLM agent tooling.",
  locale: "en_US",
  // Bump when the content changes (sitemap lastmod, structured data).
  updated: "2026-09-29",
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
    "I ship the integrations and AI-agent tooling that connect enterprise systems to the people who run them.",
  photo: "/portrait.jpg",
  avatar: "/avatar-512.jpg",
  photoAlt: "Portrait of Fares Khanchouch",
};

export const about = {
  heading: "About",
  paragraphs: [
    "Hi, I’m Fares. Most of my work happens with client teams (bank IT, credit and business people), from the first scoping conversation to go-live support. I’ve also trained clients to build and run their own n8n workflows.",
    "Outside work I build LLM tooling and a Kubernetes operator for n8n.",
  ],
  facts: [
    { label: "Based in", value: "Tunis, Tunisia" },
    {
      label: "Education",
      value:
        "Engineering degree in Computer Science · ISTY, Université Paris-Saclay · 2021 – 2024",
    },
    { label: "Languages", value: "Arabic (native) · French · English" },
  ],
  skills: [
    "Python", "TypeScript", "C#", "Go", "T-SQL",
    "MCP / Claude agent skills", "REST APIs", "n8n",
    "Docker", "Kubernetes", "Terraform", "AWS",
  ],
};

export type Highlight = {
  title: string;
  text: string;
  icon: "delivery" | "integration" | "agent";
};

export const now = {
  heading: "Where I work",
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
      title: "Agent tooling",
      text: "Python MCP servers exposing 50 typed tools and 11 Claude skills, so an agent can explain a live deployment and cite its sources.",
    },
  ] as Highlight[],
};

export type Role = {
  role: string;
  company: string;
  dates: string;
  summary: string;
};

export const before: Role[] = [
  {
    role: "Freelance Automation Engineer",
    company: "Independent",
    dates: "Sep 2024 – Nov 2025",
    summary:
      "Automation projects for 6+ clients with n8n and Make, an AI content pipeline (LLM scripts, ElevenLabs voice-overs, Whisper captions) and KYC document pipelines with LLM/OCR extraction.",
  },
  {
    role: "Cloud & DevSecOps Intern",
    company: "Nuage Up",
    dates: "May – Aug 2024",
    summary:
      "AWS in Terraform, CI/CD with security scanning, Kubernetes deployments with network policies and RBAC.",
  },
  {
    role: "Full-Stack Web Development Intern",
    company: "WAY2CLOUD",
    dates: "May – Aug 2023",
    summary: "An e-commerce platform in React, Node.js and MongoDB, built solo.",
  },
  {
    role: "DevOps Intern",
    company: "WAY2CLOUD",
    dates: "Jun – Jul 2022",
    summary:
      "A Python REST API automating Kubernetes cluster operations, containerized and deployed with Helm.",
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
      "Measured end to end: coverage of postings’ hard requirements rose from 54% to 100% of runs, and overclaimed bullets fell from 6% to 0%.",
    ],
    flow: ["Postings", "Brief", "Fact vault", "LLM payload", "Guards", "PDF"],
    tags: ["Python", "MCP", "SQLite", "ONNX", "LLM evals"],
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
    flow: ["YAML", "CRD", "Reconcile", "Postgres", "n8n"],
    tags: ["Go", "Kubernetes", "Operators"],
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
};

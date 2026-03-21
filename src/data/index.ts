// ================================================================
//  PORTFOLIO CONTENT — edit this file to update your entire site
//  No component files need to be touched.
// ================================================================


// ─── SITE META ──────────────────────────────────────────────────

export const meta = {
  title: "Fares Khanchouch — Infrastructure & Automation Engineer",
  description:
    "Cloud & DevOps engineer specialising in scalable infrastructure, CI/CD automation, and Kubernetes. Based in Tunisia, open to remote.",
  url: "https://fareskhanchouch.com",
};


// ─── HERO ───────────────────────────────────────────────────────

export const hero = {
  name: "Fares Khanchouch",
  title: "Infrastructure & Automation Engineer",
  eyebrow: "Infrastructure & Automation Engineer",
  tagline: "I build scalable systems and automate modern infrastructure.",
  photo: "/fares-cutout.png",
  cta: {
    primary:   { label: "Contact Me",      href: "#contact"     },
    secondary: { label: "Download Resume", href: "/resume.pdf"  },
  },
};


// ─── ABOUT ──────────────────────────────────────────────────────

export const about = {
  heading: "About Me",
  bio: "I build the infrastructure layer that lets engineering teams move fast and sleep well. Cloud environments defined as code, CI/CD pipelines that ship reliably, and security baked in from the start — not bolted on at the end. I care about systems that are transparent, resilient, and easy for any engineer to operate.",
  location: {
    heading: "Location",
    city: "Tunisia",
    description: "Open to on-site and remote collaborations worldwide.",
  },
  education: {
    heading: "Education",
    degree: "Engineering in Information & Communication Technology Architectures",
    school: "ISTY Vélizy — Université de Versailles Saint-Quentin",
    years: "2020 – 2023",
  },
  languages: {
    heading: "Languages",
    items: [
      { name: "English", level: "Fluent"  },
      { name: "French",  level: "Fluent"  },
      { name: "Arabic",  level: "Fluent"  },
      { name: "German",  level: "Basic"   },
    ],
  },
};

export const sectionTitles = {
  about:   "About Me",
  work:    "Work Experience",
  projects:"Projects",
  contact: "Get in Touch",
};


// ─── WORK HISTORY ───────────────────────────────────────────────

export type Experience = {
  date: string;
  title: string;
  company: string;
  location: string;
  bullets: string[];
};

export const experiences: Experience[] = [
  {
    date: "May 2024 – August 2024",
    title: "Cloud & DevSecOps Intern",
    company: "Nuage Up",
    location: "Paris",
    bullets: [
      "Deployed AWS infrastructure using Terraform and AWS Lambda, ensuring scalable and resilient architecture.",
      "Implemented CI/CD pipelines with GitHub Actions integrating security scans via Trivy, OWASP ZAP, and Docker Bench.",
      "Orchestrated containerised workloads on Kubernetes (EC2) with fine-grained security policies.",
      "Improved code quality and consistency using ESLint (JavaScript) and Staticcheck (Go).",
    ],
  },
  {
    date: "May 2023 – August 2023",
    title: "Web Development Intern",
    company: "WAY2CLOUD",
    location: "Paris",
    bullets: [
      "Built a full-stack e-commerce platform using React.js, Node.js, and MongoDB, enhancing the online shopping experience.",
      "Integrated secure authentication, product management, and shopping cart features.",
      "Automated database backups to AWS S3 with custom Node.js scripts.",
      "Optimised frontend performance and wrote unit tests for critical components.",
    ],
  },
  {
    date: "June 2022 – July 2022",
    title: "DevOps Intern",
    company: "WAY2CLOUD",
    location: "Paris",
    bullets: [
      "Developed a Python-based REST API to automate cluster provisioning and management.",
      "Containerised services with Docker and deployed to Kubernetes using Helm charts.",
      "Established CI/CD workflows with GitHub Actions for seamless testing and deployments.",
    ],
  },
];


// ─── PROJECTS ───────────────────────────────────────────────────

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  detail: {
    overview: string;
    architectureImage?: string;
    features: { title: string; description: string }[];
    achievements: string[];
    roadmap?: { area: string; items: string[] }[];
  };
};

export const projects: Project[] = [
  {
    id: "save-and-tailor",
    title: "Save & Tailor",
    description:
      "One-click job capture and instant, tailored résumé & cover-letter generation.",
    image: "/projects/1/workflow.png",
    tags: ["Chrome Extension", "n8n Workflows", "Airtable", "Puppeteer"],
    github: "https://github.com/Fares-Khanchouch/Saveandtailor-n8n",
    detail: {
      overview:
        "Save & Tailor is a browser extension that captures job listings with a single click and automatically generates a tailored résumé and cover letter using n8n automation workflows, Airtable for storage, and Puppeteer for document rendering.",
      features: [
        {
          title: "One-Click Job Capture",
          description:
            "Chrome extension detects job postings and extracts structured data with a single click.",
        },
        {
          title: "Automated Tailoring",
          description:
            "n8n workflows analyse the job description and personalise the résumé and cover letter accordingly.",
        },
        {
          title: "Airtable Storage",
          description:
            "All captured jobs and generated documents are stored and organised in Airtable.",
        },
        {
          title: "PDF Generation",
          description: "Puppeteer renders polished PDF documents ready to send.",
        },
      ],
      achievements: [
        "Reduced job application preparation time from hours to minutes.",
        "Fully automated end-to-end pipeline with no manual steps after the initial click.",
      ],
    },
  },
  {
    id: "n8n-operator",
    title: "n8n Kubernetes Operator",
    description:
      "Automated deployment and management of n8n instances on Kubernetes with a single declarative YAML file.",
    image: "/projects/2/Operator_diagram.jpg",
    tags: ["Kubernetes", "Go", "Operator Pattern", "CRDs", "PostgreSQL"],
    github: "https://github.com/Fares-Khanchouch/n8n-operator",
    detail: {
      overview:
        "Deploying n8n typically requires manually creating and configuring over eight distinct Kubernetes resources. The n8n Kubernetes Operator abstracts away this complexity, enabling a complete production-ready n8n instance with a single declarative YAML file via a Custom Resource Definition (CRD).",
      architectureImage: "/projects/2/Operator_diagram.jpg",
      features: [
        {
          title: "Automated Resource Provisioning",
          description:
            "Creates and configures a complete isolated environment including PostgreSQL, n8n, secrets management, and networking.",
        },
        {
          title: "Dynamic Configuration & Self-Healing",
          description:
            "Actively manages deployed resources throughout their lifecycle with self-healing capabilities and automatic configuration updates.",
        },
        {
          title: "Health Monitoring & Status Reporting",
          description:
            "Provides real-time visibility into the health and status of each n8n instance.",
        },
        {
          title: "Multi-Instance Isolation",
          description:
            "Manages multiple n8n instances within the same cluster, each isolated in its own namespace.",
        },
      ],
      achievements: [
        "Mastered the Operator Pattern — reconciliation loops, self-healing, and extending the Kubernetes API with CRDs.",
        "Simplified a multi-component infrastructure setup into a single easy-to-use custom resource.",
        "Implemented robust health checks and status reporting for multi-resource deployments.",
        "End-to-end automation handling the complete n8n lifecycle from provisioning to updates.",
      ],
      roadmap: [
        {
          area: "Monitoring & Observability",
          items: [
            "Prometheus integration for custom metrics",
            "Grafana dashboards",
            "Alerting for failed workflows",
          ],
        },
        {
          area: "GitOps & CI/CD",
          items: [
            "ArgoCD integration",
            "Helm chart distribution",
            "Automated pipelines with GitHub Actions",
          ],
        },
        {
          area: "Advanced Features",
          items: [
            "Backup & restore capabilities",
            "Auto-scaling based on workflow load",
            "Multi-tenancy with enhanced isolation",
          ],
        },
      ],
    },
  },
];


// ─── SKILLS / TECH STACK ────────────────────────────────────────

export type SkillGroup = {
  category: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    category: "Cloud & Infrastructure",
    items: ["AWS", "GCP", "Terraform", "Ansible", "Kubernetes", "Docker", "Helm"],
  },
  {
    category: "CI/CD & Automation",
    items: ["GitHub Actions", "Jenkins", "n8n", "Zapier", "Make"],
  },
  {
    category: "Languages",
    items: ["Go", "Python", "JavaScript", "TypeScript", "C", "C++", "Java"],
  },
  {
    category: "Web & Frameworks",
    items: ["Next.js", "React", "Node.js", "Tailwind CSS"],
  },
  {
    category: "Observability & Security",
    items: ["Prometheus", "Grafana", "Trivy", "OWASP ZAP", "Docker Bench"],
  },
];


// ─── SOCIAL & CONTACT ───────────────────────────────────────────

export const social = {
  github:   "https://github.com/Fares-Khanchouch",
  linkedin: "https://www.linkedin.com/in/fares-khanchouch/",
  email:    "fares.khanchouch@gmail.com",
  resume:   "/resume.pdf",
};

export const emailjs = {
  serviceId:  "service_1jmn1ld",
  templateId: "template_ty6k1xs",
  publicKey:  "A1yyyeM4xJuzcDdAA",
};

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
          description:
            "Puppeteer renders polished PDF documents ready to send.",
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

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

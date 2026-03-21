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

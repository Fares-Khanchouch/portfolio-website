"use client";

import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks/useSectionInView";
import { useSectionBackground } from "./BackgroundLayout";
import React from "react";
import { Experience } from "@/types/work";

// Internships only
const experiences: Experience[] = [
  {
    date: "May 2024 – August 2024",
    title: "Cloud & DevSecOps Intern",
    job: "Nuage Up, Paris",
    contents: [
      "✅ Deployed AWS infrastructure using Terraform and AWS Lambda, ensuring scalable and resilient architecture.",
      "✅ Implemented CI/CD pipelines with GitHub Actions integrating security scans via Trivy, OWASP ZAP, and Docker Bench.",
      "✅ Orchestrated containerized workloads on Kubernetes (EC2) with fine‑grained security policies.",
      "✅ Improved code quality and consistency using ESLint (JavaScript) and Staticcheck (Go).",
    ],
  },
  {
    date: "May 2023 – August 2023",
    title: "Web Development Intern",
    job: "WAY2CLOUD, Paris",
    contents: [
      "✅ Built a full‑stack e-commerce platform using React.js, Node.js, and MongoDB, enhancing the online shopping experience.",
      "✅ Integrated secure authentication, product management, and shopping cart features.",
      "✅ Automated database backups to AWS S3 with custom Node.js scripts.",
      "✅ Optimized frontend performance and wrote unit tests for critical components.",
    ],
  },
  {
    date: "June 2022 – July 2022",
    title: "DevOps Intern",
    job: "WAY2CLOUD, Paris",
    contents: [
      "✅ Developed a Python-based REST API to automate cluster provisioning and management.",
      "✅ Containerized services with Docker and deployed to Kubernetes using Helm charts.",
      "✅ Established CI/CD workflows with GitHub Actions for seamless testing and deployments.",
    ],
  },
];

export default function WorkHistory() {
  const { ref, inView } = useSectionInView("Work History");
  const { setSection } = useSectionBackground();

  React.useEffect(() => {
    if (inView) {
      console.log('Section in view: work', { inView });
      setSection("work");
    }
  }, [inView, setSection]);

  return (
    <section
      ref={ref}
      id="work"
      className="min-h-screen text-gray-300 py-24 px-6"
    >
      <motion.h2
        className="max-w-5xl mx-auto text-3xl md:text-4xl font-bold text-white mb-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Work Experience
      </motion.h2>
      <div className="relative max-w-5xl mx-auto pl-4 md:pl-0">
        {/* Vertical timeline line: only on desktop */}
        <span className="hidden md:block absolute top-0 left-1/3 bottom-0 w-px bg-gray-700" />

        {experiences.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row items-start mb-20 relative"
          >
            {/* Mobile horizontal timeline: dot and bar */}
            <div className="flex items-center mb-4 md:hidden">
              <span className="w-4 h-4 bg-black/60 border-2 border-purple-500 rounded-full mr-2" />
              <span className="h-1 w-8 bg-gray-700 rounded mr-2" />
              <span className="uppercase text-sm text-gray-500">{item.date}</span>
            </div>
            {/* Left column: marker & heading */}
            <div className="pl-0 md:pl-0 md:w-1/3 flex flex-col items-start md:items-end pr-8 relative text-left md:text-right">
              {/* Timeline point: desktop version, in left column */}
              <span className="hidden md:block absolute left-full translate-x-0 -translate-x-1/2 -ml-2 w-4 h-4 bg-black/60 border-2 border-purple-500 rounded-full" />
              <p className="uppercase text-sm text-gray-500 mb-2 md:mt-1 hidden md:block">
                {item.date}
              </p>
              <h3 className="text-2xl font-semibold text-white leading-snug mb-2 md:mb-0">
                {item.title}
              </h3>
              <p className="text-md text-gray-400 mb-4 md:mb-0">{item.job}</p>
            </div>

            {/* Right column: details */}
            <div className="pl-0 md:pl-8 md:w-2/3 space-y-3">
              {item.contents.map((line, i) => (
                <p key={i} className="leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

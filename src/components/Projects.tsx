"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSectionBackground } from "./BackgroundLayout";
import { useSectionInView } from "@/lib/hooks/useSectionInView";
import Image from "next/image";

const Projects = () => {
  const { setSection } = useSectionBackground();
  const { ref, inView } = useSectionInView("Projects", 0.5);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    if (inView) {
      console.log('Section in view: projects', { inView });
      setSection("projects");
    }
  }, [inView, setSection]);

  return (
    <section ref={ref} id="projects" className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white">
          Recent Projects
        </h2>

        <div className="flex flex-col items-center gap-16">
          {/* Project Card 1 */}
          <motion.div
            className="relative rounded-xl shadow-lg overflow-hidden bg-black/60 w-full max-w-5xl mx-auto"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/projects/1/workflow.png"
              alt="Workflow Overview"
              width={800}
              height={176}
              className="w-full object-cover h-44 object-top"
            />
            <div className="p-6 text-left">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Save & Tailor
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                One-click job capture and instant, tailored résumé &amp; cover-letter generation.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Chrome Extension", "n8n Workflows", "Airtable", "Puppeteer"].map((tag) => (
                  <span
                    key={tag}
                    className="bg-purple-700 text-white px-3 py-1 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={openModal}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View More
                </button>
                <a
                  href="https://github.com/Fares-Khanchouch/Saveandtailor-n8n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:underline"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </motion.div>

          {/* Project Card 2 - n8n Kubernetes Operator */}
          <motion.div
            className="relative rounded-xl shadow-lg overflow-hidden bg-black/60 w-full max-w-5xl mx-auto"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/projects/2/Operator_diagram.jpg"
              alt="n8n Kubernetes Operator Architecture"
              width={800}
              height={176}
              className="w-full object-cover h-44 object-top"
            />
            <div className="p-6 text-left">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                n8n Kubernetes Operator
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Automated deployment and management of n8n instances on Kubernetes with a single declarative YAML file.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Kubernetes", "Go", "Operator Pattern", "CRDs", "PostgreSQL"].map((tag) => (
                  <span
                    key={tag}
                    className="bg-purple-700 text-white px-3 py-1 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={openModal}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View More
                </button>
                <a
                  href="https://github.com/Fares-Khanchouch/n8n-operator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:underline"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </motion.div>
        </div>


        {/* Modal Popup */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-black/80 backdrop-blur-md rounded-xl p-8 max-w-4xl w-full shadow-lg relative overflow-y-auto max-h-[90vh] text-left"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white text-xl"
                >
                  ✕
                </button>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                  n8n Kubernetes Operator
                </h3>

                <div className="space-y-10">
                  <section>
                    <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Overview</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Deploying the n8n workflow automation platform typically requires manually creating and configuring over eight distinct Kubernetes resources, including deployments, services, persistent volumes, and secrets for both n8n and its PostgreSQL database. This process is not only tedious but also prone to configuration errors.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mt-4">
                      The <b>n8n Kubernetes Operator</b> was built to solve this problem. It abstracts away the complexity, enabling the deployment of a complete, production-ready n8n instance with a single, declarative YAML file. What once was a multi-step, manual task is now as simple as:
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mt-2 font-mono bg-gray-100 dark:bg-zinc-800 p-2 rounded">
                      kubectl apply -f example/development-n8n.yaml
                    </p>
                  </section>
                  
                  <section>
                    <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Architecture at a Glance</h4>
                    <Image src="/projects/2/Operator_diagram.jpg" alt="n8n Kubernetes Operator Architecture" width={800} height={400} className="rounded-md w-full mb-2" />
                    <p className="text-gray-700 dark:text-gray-300">
                      The operator extends the Kubernetes API by introducing a Custom Resource Definition (CRD), <code>N8nInstance</code>. When a user creates an <code>N8nInstance</code> resource, the operator&apos;s control loop is triggered. It continuously monitors the state of the cluster and works to reconcile the current state with the desired state defined in the custom resource.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Core Features & Functionality</h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-gray-800 dark:text-white">Automated Resource Provisioning</h5>
                        <p className="text-gray-700 dark:text-gray-300">
                          When an <code>N8nInstance</code> resource is created, the operator automatically provisions and configures a complete, isolated environment including PostgreSQL Database, n8n Application, Secrets Management, and Networking.
                        </p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 dark:text-white">Dynamic Configuration & Self-Healing</h5>
                        <p className="text-gray-700 dark:text-gray-300">
                          The operator actively manages deployed resources throughout their lifecycle with self-healing capabilities and automatic configuration updates.
                        </p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 dark:text-white">Health Monitoring & Status Reporting</h5>
                        <p className="text-gray-700 dark:text-gray-300">
                          Provides real-time visibility into the health and status of each n8n instance with health conditions and access information.
                        </p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 dark:text-white">Multi-Instance Isolation</h5>
                        <p className="text-gray-700 dark:text-gray-300">
                          Manages multiple n8n instances within the same cluster, with each instance being completely isolated in its own namespace.
                        </p>
                      </div>
                    </div>
                  </section>
                  
                  <section>
                    <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Key Achievements</h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                      <li><b>Mastered the Operator Pattern:</b> Gained a deep understanding of how Kubernetes operators work, including reconciliation loops, self-healing capabilities, and extending the Kubernetes API with CRDs.</li>
                      <li><b>Simplified Complex Deployments:</b> Successfully abstracted a multi-component infrastructure setup into a single, easy-to-use custom resource, drastically reducing deployment time and the potential for human error.</li>
                      <li><b>Built-in Status & Health Monitoring:</b> Implemented robust health checks and status reporting, providing crucial visibility into the state of complex, multi-resource deployments.</li>
                      <li><b>End-to-End Automation:</b> Developed a system that handles the complete lifecycle of n8n, from initial provisioning and configuration to updates and healing.</li>
                    </ul>
                  </section>
                  
                  <section>
                    <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Future Roadmap</h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-gray-800 dark:text-white">Monitoring & Observability</h5>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                          <li>Prometheus Integration for custom metrics</li>
                          <li>Grafana Dashboards for monitoring</li>
                          <li>Alerting for failed workflows</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 dark:text-white">GitOps & CI/CD</h5>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                          <li>ArgoCD Integration for GitOps-driven management</li>
                          <li>Helm Charts for easy distribution</li>
                          <li>Automated Pipelines with GitHub Actions</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 dark:text-white">Advanced Features</h5>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                          <li>Backup & Restore capabilities</li>
                          <li>Auto-scaling based on workflow execution load</li>
                          <li>Multi-tenancy with enhanced isolation</li>
                        </ul>
                      </div>
                    </div>
                  </section>
                </div>
                
                <div className="mt-8 pt-4 border-t border-gray-200 dark:border-zinc-800 flex justify-end">
                   <a
                    href="https://github.com/Fares-Khanchouch/n8n-operator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-500 hover:underline"
                  >
                    View on GitHub ↗
                  </a>
                </div>
                
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
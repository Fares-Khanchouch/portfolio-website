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

        {/* Project Card */}
        <motion.div
          className="relative rounded-xl shadow-lg overflow-hidden bg-black/60 max-w-4xl mx-auto"
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
                  Save & Tailor
                </h3>

                <div className="space-y-10">
                  <section>
                    <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Overview</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Save & Tailor is a powerful, automated assistant that transforms the tedious task of job applications into a streamlined, efficient process. It intelligently captures job details from LinkedIn, parses and stores the key fields, and generates fully-tailored résumé and cover letter PDFs on demand.
                    </p>
                  </section>
                  
                  <section>
                    <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Architecture at a Glance</h4>
                    <Image src="/projects/1/workflow.png" alt="Workflow Architecture" width={800} height={400} className="rounded-md w-full mb-2" />
                    <p className="text-gray-700 dark:text-gray-300">
                      Data flows from a custom Chrome extension to an n8n &quot;Job Parser&quot; workflow, is stored in Airtable, and then used by an n8n &quot;Document Generator&quot; workflow to create and upload the final PDFs.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Chrome Extension</h4>
                    <Image src="/projects/1/extension.png" alt="Chrome Extension Interface" width={800} height={400} className="rounded-md w-full mb-2 max-h-80 object-contain bg-gray-100 dark:bg-zinc-800 p-2" />
                    <p className="text-gray-700 dark:text-gray-300">
                      The custom extension automatically detects and scrapes the full text and URL of LinkedIn job listings as you browse. The popup allows you to see a live count of captured jobs and send them to the n8n webhook for processing.
                    </p>
                  </section>
                  
                  <section>
                    <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Automation & Document Generation</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Once the job data is captured, n8n workflows orchestrate the entire backend process. The data is parsed by an LLM, stored in an Airtable base, and used to generate tailored documents on-demand with a single click.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Image src="/projects/1/Resume_sample.png" alt="Tailored Résumé PDF Sample" width={400} height={500} className="rounded-md w-full mb-2" />
                            <p className="text-center text-sm text-gray-600 dark:text-gray-400">Tailored Résumé PDF</p>
                        </div>
                        <div>
                            <Image src="/projects/1/Cover_letter_sample.png" alt="Tailored Cover Letter PDF Sample" width={400} height={500} className="rounded-md w-full mb-2" />
                            <p className="text-center text-sm text-gray-600 dark:text-gray-400">Tailored Cover Letter PDF</p>
                        </div>
                    </div>
                     <p className="text-gray-700 dark:text-gray-300 mt-4">
                      The generated JSON and text are injected into pre-made HTML templates. A Puppeteer node then renders these populated HTML files into polished PDFs, which are uploaded back to Airtable.
                    </p>
                  </section>
                  
                  <section>
                    <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Key Achievements</h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                      <li><b>End-to-End Automation:</b> A fully automated pipeline from data capture to document storage.</li>
                      <li><b>Robust Scraping:</b> Reliably captures data from LinkedIn&apos;s dynamic single-page application structure.</li>
                      <li><b>Modular Architecture:</b> Decoupled components (extension, parser, generator) make the system resilient and easy to maintain.</li>
                      <li><b>On-Demand Personalization:</b> Leverages LLMs to transform a generic master résumé into a highly specific document for each job.</li>
                    </ul>
                  </section>
                  
                  <section>
                    <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Future Roadmap</h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                      <li><b>Multi-Platform Support:</b> Expand the scraper to work on other job boards like Indeed and Glassdoor.</li>
                      <li><b>Expanded Template Library:</b> Introduce multiple visual templates for résumés and add new document types like &quot;Thank You&quot; notes.</li>
                      <li><b>Advanced AI Features:</b> Implement a &quot;match score&quot; to analyze job descriptions against the master résumé and suggest keywords.</li>
                      <li><b>Deeper ATS Functionality:</b> Evolve the Airtable base to track interview stages, contacts, and follow-up dates.</li>
                    </ul>
                  </section>
                </div>
                
                <div className="mt-8 pt-4 border-t border-gray-200 dark:border-zinc-800 flex justify-end">
                   <a
                    href="https://github.com/Fares-Khanchouch/Saveandtailor-n8n"
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
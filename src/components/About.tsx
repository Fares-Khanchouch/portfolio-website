"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSectionBackground } from "./BackgroundLayout";
import { useSectionInView } from "@/lib/hooks/useSectionInView";

import {
  FaPython,
  FaJava,
  FaJsSquare,
  FaDocker,
  FaAws,
  FaJenkins,
} from "react-icons/fa";

const globeUrl = "/globe.png";

const cards = [
  {
    title: "Programming & Languages",
    technologies: [
      // Hexagonal/circular, more center-filled
      { name: "C", icon: <img src="/icon/C.svg" alt="C logo" className="w-16 h-16" draggable={false} onDragStart={e => e.preventDefault()} />, position: "top-[18%] left-[50%] -translate-x-1/2", rotation: "rotate-6" },
      { name: "C++", icon: <img src="/icon/C++.svg" alt="C++ logo" className="w-16 h-16" draggable={false} onDragStart={e => e.preventDefault()} />, position: "top-[35%] left-[78%] -translate-x-1/2", rotation: "-rotate-6" },
      { name: "Go", icon: <img src="/icon/go.svg" alt="Go logo" className="w-20 h-20" draggable={false} onDragStart={e => e.preventDefault()} />, position: "top-[68%] left-[70%] -translate-x-1/2", rotation: "rotate-12" },
      { name: "Python", icon: <FaPython size={64} className="text-yellow-400" />, position: "top-[78%] left-[50%] -translate-x-1/2", rotation: "-rotate-12" },
      { name: "Java", icon: <FaJava size={68} className="text-orange-500" />, position: "top-[68%] left-[30%] -translate-x-1/2", rotation: "rotate-3" },
      { name: "JavaScript", icon: <FaJsSquare size={64} className="text-yellow-300" />, position: "top-[35%] left-[22%] -translate-x-1/2", rotation: "-rotate-3" },
    ],
  },
  {
    title: "DevOps & Cloud",
    technologies: [
      // Arranged in a hexagonal/circular layout
      { name: "Docker", icon: <FaDocker size={60} className="text-blue-400" />, position: "top-[10%] left-[50%] -translate-x-1/2", rotation: "rotate-6" },
      { name: "Kubernetes", icon: <img src="/icon/kubernetes.svg" alt="Kubernetes logo" className="w-14 h-14" draggable={false} onDragStart={e => e.preventDefault()} />, position: "top-[28%] left-[85%] -translate-x-1/2", rotation: "rotate-12" },
      { name: "Terraform", icon: <img src="/icon/terraform.svg" alt="Terraform logo" className="w-14 h-14" draggable={false} onDragStart={e => e.preventDefault()} />, position: "top-[65%] left-[80%] -translate-x-1/2", rotation: "-rotate-12" },
      { name: "AWS", icon: <FaAws size={58} className="text-orange-400" />, position: "top-[80%] left-[50%] -translate-x-1/2", rotation: "-rotate-6" },
      { name: "Ansible", icon: <img src="/icon/ansible.svg" alt="Ansible logo" className="w-14 h-14" draggable={false} onDragStart={e => e.preventDefault()} />, position: "top-[65%] left-[20%] -translate-x-1/2", rotation: "rotate-6" },
      { name: "Google Cloud", icon: <img src="/icon/gcp.svg" alt="Google Cloud logo" className="w-14 h-14" draggable={false} onDragStart={e => e.preventDefault()} />, position: "top-[28%] left-[15%] -translate-x-1/2", rotation: "-rotate-12" },
      { name: "Jenkins", icon: <FaJenkins size={56} className="text-gray-400" />, position: "top-[45%] left-[50%] -translate-x-1/2", rotation: "rotate-12" },
    ],
  },
  {
    title: "Automation & Integration",
    technologies: [
      // Triangle layout
      { name: "n8n", icon: <img src="/icon/n8n.svg" alt="n8n logo" className="w-24 h-24" draggable={false} onDragStart={e => e.preventDefault()} />, position: "top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2", rotation: "rotate-6" },
      { name: "Zapier", icon: <img src="/icon/zapier.svg" alt="Zapier logo" className="w-24 h-24" draggable={false} onDragStart={e => e.preventDefault()} />, position: "top-[70%] left-[25%] -translate-x-1/2 -translate-y-1/2", rotation: "-rotate-12" },
      { name: "Make", icon: <img src="/icon/make.svg" alt="Make.com logo" className="w-24 h-24" draggable={false} onDragStart={e => e.preventDefault()} />, position: "top-[70%] left-[75%] -translate-x-1/2 -translate-y-1/2", rotation: "rotate-12" },
    ],
  },
];


const About = () => {
  const { setSection } = useSectionBackground();
  const { ref, inView } = useSectionInView("About", 0.5);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % cards.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    if (inView) {
      console.log('Section in view: about', { inView });
      setSection("about");
    }
  }, [inView, setSection]);

  const activeCard = cards[activeCardIndex];

  return (
    <section id="about" ref={ref} className="min-h-[70vh] flex items-center justify-center py-16 text-white mb-60">
      <div className="max-w-5xl mx-auto px-2 sm:px-4 lg:px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">About Me</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 grid-flow-row-dense">
          {/* Main Paragraph */}
          <div className="bg-black/60 rounded-2xl shadow-xl p-6 transform hover:scale-105 transition lg:col-span-2 lg:row-span-2 flex flex-col justify-center min-h-[10rem]">
            <h3 className="text-xl lg:text-2xl font-semibold mb-3">Hi, I'm Fares Khanchouch</h3>
            <p className="leading-relaxed opacity-90 text-base">
              I love turning tricky problems into smooth, reliable systems. Whether I'm writing infrastructure-as-code to spin up cloud environments, setting up seamless CI/CD pipelines, or baking security checks right into the build process, I aim to bring clarity and confidence to every project. I'm passionate about crafting clean, maintainable architectures and delivering solutions that not only work today but keep running strong as you grow.
            </p>
          </div>

          {/* Location Card */}
          <div className="relative bg-black/40 rounded-2xl p-6 shadow-xl overflow-hidden min-h-[10rem] transform hover:scale-105 transition">
            <div className="relative z-10">
              <h3 className="text-xl lg:text-2xl font-semibold mb-3">Location</h3>
              <p className="opacity-80">
                Based in France and ready for both on-site and remote collaborations anywhere in the world.
              </p>
            </div>
            <img src={globeUrl} alt="Globe" className="absolute right-0 bottom-0 w-48 h-48 object-cover opacity-30 z-0" style={{ transform: 'translate(25%, 25%)' }}/>
          </div>

          {/* Languages Card */}
          <div className="bg-black/40 rounded-2xl shadow-xl p-6 flex flex-col justify-center min-h-[10rem] transform hover:scale-105 transition">
            <h3 className="text-xl lg:text-2xl font-semibold mb-3">Languages</h3>
            <p className="leading-relaxed opacity-90">
              I am fluent in <span className="font-medium">English</span>, <span className="font-medium">Arabic</span>, and <span className="font-medium">French</span>, with a foundational knowledge of <span className="font-medium">German</span>.
            </p>
          </div>

          {/* Skills Carousel */}
          <div className="lg:col-span-3 bg-black/40 rounded-2xl shadow-xl p-6 flex flex-col md:flex-row min-h-[18rem] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCardIndex}
                className="w-full h-full flex flex-col md:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Title Container */}
                <div className="w-full md:w-1/3 flex items-center justify-center">
                  <h3 className="text-2xl lg:text-3xl font-bold text-center leading-tight">
                    {(() => {
                      const titleParts = activeCard.title.split(' & ');
                      if (titleParts.length === 2) {
                        return (
                          <>
                            <span>{titleParts[0]}</span><br />
                            <span className="text-purple-400">&amp;</span><br />
                            <span>{titleParts[1]}</span>
                          </>
                        );
                      }
                      return activeCard.title;
                    })()}
                  </h3>
                </div>
                {/* Icons container with absolute positioning */}
                <motion.div className="relative flex-1 w-full h-80 md:h-auto mt-8 md:mt-0" id="drag-container">
                  {activeCard.technologies.map((tech) => (
                    <motion.div
                      key={tech.name}
                      title={tech.name}
                      className={`absolute p-3 bg-gray-700/50 backdrop-blur-sm rounded-xl cursor-grab active:cursor-grabbing ${tech.position} ${tech.rotation}`}
                      drag
                      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                      dragElastic={0.2}
                    >
                      {tech.icon}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
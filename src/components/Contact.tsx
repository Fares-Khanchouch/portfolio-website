"use client";

import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";
import { useSectionBackground } from "./BackgroundLayout";
import React from "react";
import { useSectionInView } from "@/lib/hooks/useSectionInView";

export default function Contact() {
  const { setSection } = useSectionBackground();
  const { ref, inView } = useSectionInView("Contact", 0.5);
  React.useEffect(() => {
    if (inView) {
      console.log('Section in view: contact', { inView });
      setSection("contact");
    }
  }, [inView, setSection]);

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="min-h-screen w-full py-20 px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Let&apos;s Get in Touch
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12">
          Have a question or want to work together? Fill out the form below or send me an email.
        </p>

        {/* Contact Form */}
        <div className="bg-black/60 rounded-2xl shadow-2xl p-8 mb-12">
          <form 
            className="space-y-6 text-left"
            method="POST" 
            action="https://formsubmit.co/fares.khanchouch@gmail.com" 
            encType="multipart/form-data"
          >
            {/* FormSubmit Hidden Fields */}
            <input type="hidden" name="_next" value="https://yourdomain.com/thanks" />
            <input type="hidden" name="_subject" value="New Contact Submission" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                className="w-full px-4 py-2 bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-2 bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-2 bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 bg-purple-700 text-white font-semibold rounded-lg shadow-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-zinc-900 transition-all duration-300"
              >
                <FaEnvelope className="mr-2" />
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* OR Divider */}
        <div className="flex items-center my-10">
          <hr className="flex-grow border-t border-gray-300 dark:border-zinc-700" />
          <span className="mx-4 text-gray-500 dark:text-gray-400">or</span>
          <hr className="flex-grow border-t border-gray-300 dark:border-zinc-700" />
        </div>

        {/* Direct Email Option */}
        <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
                Prefer direct contact? Just send me an email:
            </p>
             <a
                href="mailto:fares.khanchouch@gmail.com"
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-transparent border-2 border-purple-700 text-purple-700 dark:text-purple-400 dark:border-purple-400 font-semibold rounded-lg shadow-sm hover:bg-purple-700 hover:text-white dark:hover:bg-purple-400 dark:hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-zinc-900 transition-all duration-300"
            >
                <FaEnvelope className="mr-3" />
                Send me an Email
            </a>
        </div>
      </div>
    </motion.section>
  );
}

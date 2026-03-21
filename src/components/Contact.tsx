"use client";

import { motion } from "framer-motion";
import { useSectionBackground } from "./BackgroundLayout";
import React, { useState } from "react";
import { useSectionInView } from "@/lib/hooks/useSectionInView";
import emailjs from "@emailjs/browser";
import { ArrowUpRight, Send, CheckCircle2 } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { sectionTitles } from "@/data/content";
import { social, emailjs as ejsConfig } from "@/data/social";

const FIELDS = [
  { id: "name",    label: "Full Name",     type: "text",  rows: undefined },
  { id: "email",   label: "Email Address", type: "email", rows: undefined },
  { id: "subject", label: "Subject",       type: "text",  rows: undefined },
] as const;

type FieldId = typeof FIELDS[number]["id"] | "message";

export default function Contact() {
  const { setSection } = useSectionBackground();
  const { ref, inView } = useSectionInView("Contact", 0.3);
  const [formData, setFormData] = useState<Record<FieldId, string>>({
    name: "", email: "", subject: "", message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (inView) setSection("contact");
  }, [inView, setSection]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await emailjs.send(
        ejsConfig.serviceId,
        ejsConfig.templateId,
        { name: formData.name, email: formData.email, subject: formData.subject, message: formData.message },
        ejsConfig.publicKey
      );
      if (result.status === 200) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch (err) {
      console.error("EmailJS error:", err);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} id="contact" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <BlurFade inView delay={0.05}>
          <div className="mb-16 text-center">
            <p className="font-[family-name:var(--font-geist-mono)] text-xs uppercase tracking-[0.22em] text-[#4a7fa5] mb-3">
              04 / Contact
            </p>
            <h2 className="font-[family-name:var(--font-geist)] text-4xl font-extrabold text-[#f8fafc] md:text-5xl">
              {sectionTitles.contact}
            </h2>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10">

          {/* Left: info */}
          <BlurFade inView delay={0.1}>
            <div className="flex flex-col gap-8">
              <div>
                <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] text-[#4a7fa5] mb-3">
                  Say hello
                </p>
                <p className="text-sm text-[#94a3b8] leading-relaxed">
                  Have a project in mind, a question, or just want to connect? I&apos;m always open to interesting conversations.
                </p>
              </div>

              {/* Direct email */}
              <div>
                <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] text-[#4a7fa5] mb-3">
                  Direct email
                </p>
                <a
                  href={`mailto:${social.email}`}
                  className="flex items-center gap-2 text-sm text-[#f8fafc] hover:text-[#4a7fa5] transition-colors group"
                >
                  {social.email}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200" />
                </a>
              </div>

              {/* Links */}
              <div>
                <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] text-[#4a7fa5] mb-3">
                  Elsewhere
                </p>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "GitHub", href: social.github },
                    { label: "LinkedIn", href: social.linkedin },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-[#64748b] hover:text-[#f8fafc] transition-colors group w-fit"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </BlurFade>

          {/* Right: form */}
          <BlurFade inView delay={0.15}>
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-7 md:p-8 backdrop-blur-sm">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 gap-4"
                >
                  <CheckCircle2 className="h-10 w-10 text-[#4a7fa5]" />
                  <h3 className="font-[family-name:var(--font-geist)] text-xl font-bold text-[#f8fafc]">
                    Message sent.
                  </h3>
                  <p className="text-sm text-[#64748b]">I&apos;ll get back to you shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {FIELDS.map((field) => (
                    <div key={field.id} className="group flex flex-col gap-1.5">
                      <label
                        htmlFor={field.id}
                        className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.18em] text-[#64748b] transition-colors group-focus-within:text-[#4a7fa5]"
                      >
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        id={field.id}
                        name={field.id}
                        value={formData[field.id]}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-white/10 py-2.5 text-sm text-[#f8fafc] placeholder-[#4a5568] outline-none transition-all duration-200 focus:border-[#4a7fa5]"
                        placeholder={`Your ${field.label.toLowerCase()}`}
                      />
                    </div>
                  ))}

                  {/* Message */}
                  <div className="group flex flex-col gap-1.5">
                    <label
                      htmlFor="message"
                      className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.18em] text-[#64748b] transition-colors group-focus-within:text-[#4a7fa5]"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      className="w-full bg-transparent border-b border-white/10 py-2.5 text-sm text-[#f8fafc] placeholder-[#4a5568] outline-none resize-none transition-all duration-200 focus:border-[#4a7fa5]"
                      placeholder="Tell me about your project or question..."
                    />
                  </div>

                  {/* Submit */}
                  <div className="mt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative flex items-center justify-center gap-2.5 overflow-hidden rounded bg-[#4a7fa5] px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#5a8fb5] disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                    >
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                      <Send className="h-3.5 w-3.5" />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}

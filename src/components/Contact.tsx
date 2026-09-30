"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Github, Linkedin, Mail, Send } from "lucide-react";
import { contact, emailjs as ejs, social } from "@/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const LIMITS = { name: 100, email: 200, message: 4000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    // Honeypot: real visitors never see or fill this field.
    if (String(data.get("website") ?? "") !== "") {
      setStatus("sent");
      return;
    }
    if (!name || !EMAIL_RE.test(email) || message.length < 10) {
      setError("Please add your name, a valid email and a message of at least 10 characters.");
      return;
    }

    setError(null);
    setStatus("sending");
    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        ejs.serviceId,
        ejs.templateId,
        {
          name: name.slice(0, LIMITS.name),
          email: email.slice(0, LIMITS.email),
          subject: `Website message from ${name.slice(0, LIMITS.name)}`,
          message: message.slice(0, LIMITS.message),
        },
        { publicKey: ejs.publicKey, limitRate: { id: "contact", throttle: 30000 } },
      );
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
      setError(`That didn't go through. Email me directly at ${social.email}.`);
    }
  }

  const field =
    "w-full rounded-md border border-input-border bg-bg/40 px-3.5 py-2.5 text-base text-fg placeholder:text-fg-subtle transition-[border-color] duration-200 focus:border-accent focus:outline-none focus-visible:outline-none sm:text-sm";
  const labelCls = "mb-1.5 block text-sm font-medium text-fg";

  return (
    <section id="contact" className="py-14 md:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading index="04" label="Contact" title={contact.heading} />

        <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-14">
          <Reveal className="space-y-6">
            <p className="text-lg leading-relaxed text-fg-muted">{contact.text}</p>
            <a
              href={`mailto:${social.email}`}
              className="group inline-flex items-center gap-2 break-all text-fg transition-colors duration-200 hover:text-accent"
            >
              <Mail size={18} aria-hidden="true" className="shrink-0 text-accent" />
              {social.email}
            </a>
            <ul className="flex gap-2">
              {[
                { label: "GitHub", href: social.github, Icon: Github },
                { label: "LinkedIn", href: social.linkedin, Icon: Linkedin },
              ].map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="group inline-flex h-11 items-center gap-2 rounded-md border border-line px-4 text-sm text-fg-muted transition-colors duration-200 hover:border-line-strong hover:text-fg"
                  >
                    <Icon size={16} aria-hidden="true" />
                    {label}
                    <ArrowUpRight size={14} aria-hidden="true" className="opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80}>
            <div className="rounded-2xl border border-line bg-surface p-6 shadow-card md:p-8">
              {status === "sent" ? (
                <div role="status" className="flex flex-col items-center gap-3 py-10 text-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Check size={22} aria-hidden="true" />
                  </span>
                  <p className="text-lg font-medium text-fg">Message sent.</p>
                  <p className="text-sm text-fg-muted">Thanks, I&apos;ll reply by email.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-5">
                  <div>
                    <label htmlFor="name" className={labelCls}>Name</label>
                    <input id="name" name="name" type="text" autoComplete="name" required maxLength={LIMITS.name} className={field} />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelCls}>Email</label>
                    <input id="email" name="email" type="email" autoComplete="email" inputMode="email" required maxLength={LIMITS.email} className={field} />
                  </div>
                  <div>
                    <label htmlFor="message" className={labelCls}>Message</label>
                    <textarea id="message" name="message" rows={4} required minLength={10} maxLength={LIMITS.message} className={`${field} resize-y`} />
                  </div>
                  {/* Honeypot, hidden from people and assistive tech. */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                    <label htmlFor="website">Leave this empty</label>
                    <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>

                  {error && (
                    <p role="alert" className="text-sm text-[var(--danger)]">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-accent-solid px-6 text-sm font-medium text-white transition-[background-color] duration-200 hover:bg-accent-solid-hover disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    <Send size={15} aria-hidden="true" />
                    {status === "sending" ? "Sending…" : "Send message"}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

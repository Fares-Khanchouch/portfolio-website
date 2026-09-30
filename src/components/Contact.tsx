"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Github, Linkedin, Mail, Send } from "lucide-react";
import { contact, emailjs as ejs, social } from "@/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import CopyEmail from "./CopyEmail";

const LIMITS = { name: 100, email: 200, message: 4000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const COOLDOWN_MS = 30_000;

type Status = "idle" | "sending" | "sent" | "error";
type Field = "name" | "email" | "message";
type FieldErrors = Partial<Record<Field, string>>;

function validate(name: string, email: string, message: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!name) errors.name = "Please add your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please add a valid email address.";
  if (message.length < 10) errors.message = "Please write at least 10 characters.";
  return errors;
}

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const sending = useRef(false); // synchronous double-submit guard
  const lastSent = useRef(0); // only successful sends start the cooldown
  const sentRef = useRef<HTMLParagraphElement | null>(null);
  const errorRef = useRef<HTMLParagraphElement | null>(null);

  // Move focus to the confirmation so keyboard and screen-reader users hear it.
  useEffect(() => {
    if (status === "sent") sentRef.current?.focus();
    // The submit button is disabled while sending, so focus would fall to
    // <body> when a send fails; keep it on the error message instead.
    if (status === "error") errorRef.current?.focus();
  }, [status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending.current) return;
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
    const errors = validate(name, email, message);
    setFieldErrors(errors);
    const firstInvalid = (["name", "email", "message"] as const).find((f) => errors[f]);
    if (firstInvalid) {
      setError(null);
      form.querySelector<HTMLElement>(`#${firstInvalid}`)?.focus();
      return;
    }
    if (Date.now() - lastSent.current < COOLDOWN_MS) {
      setError("Thanks, your last message was just sent. Please wait a few seconds before sending another.");
      return;
    }

    sending.current = true;
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
        { publicKey: ejs.publicKey },
      );
      lastSent.current = Date.now();
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
      setError(`That didn't go through. Please try again, or email me at ${social.email}.`);
    } finally {
      sending.current = false;
    }
  }

  const describedBy = (f: Field) => (fieldErrors[f] ? `${f}-error` : undefined);
  const fieldError = (f: Field) =>
    fieldErrors[f] ? (
      <p id={`${f}-error`} className="mt-1.5 text-sm text-[var(--danger)]">
        {fieldErrors[f]}
      </p>
    ) : null;

  const field =
    "w-full rounded-md border border-input-border bg-bg/40 px-3.5 py-2.5 text-base text-fg placeholder:text-fg-subtle transition-[border-color] duration-200 focus:border-accent focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-[var(--danger)] sm:text-sm";
  const labelCls = "mb-1.5 block text-sm font-medium text-fg";

  return (
    <section id="contact" className="py-14 md:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading index="04" label="Contact" title={contact.heading} />

        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 md:grid-cols-2 md:items-start md:gap-14">
          <Reveal className="space-y-6">
            <p className="text-lg leading-relaxed text-pretty text-fg-muted">{contact.text}</p>
            <div className="rounded-2xl border border-line bg-surface p-5 shadow-card">
              <p className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
                <Mail size={14} aria-hidden="true" className="text-accent" />
                Email
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <a
                  href={`mailto:${social.email}`}
                  className="link-underline text-lg font-medium break-all text-fg transition-colors duration-200 hover:text-accent md:text-xl"
                >
                  {social.email}
                </a>
                <CopyEmail email={social.email} />
              </div>
            </div>
            <ul className="flex flex-wrap gap-2">
              {[
                { label: "GitHub", href: social.github, Icon: Github },
                { label: "LinkedIn", href: social.linkedin, Icon: Linkedin },
              ].map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="group inline-flex h-11 items-center gap-2 rounded-md border border-input-border px-4 text-sm text-fg-muted transition-colors duration-200 hover:border-accent hover:text-fg"
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
                <div className="flex flex-col items-center gap-3 py-10 text-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Check size={22} aria-hidden="true" />
                  </span>
                  <p ref={sentRef} tabIndex={-1} role="status" className="text-lg font-medium text-fg focus:outline-none">
                    Message sent.
                  </p>
                  <p className="text-sm text-fg-muted">Thanks, I&rsquo;ll reply by email.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-5">
                  <div>
                    <label htmlFor="name" className={labelCls}>Name</label>
                    <input id="name" name="name" type="text" autoComplete="name" required maxLength={LIMITS.name} aria-invalid={!!fieldErrors.name} aria-describedby={describedBy("name")} className={field} />
                    {fieldError("name")}
                  </div>
                  <div>
                    <label htmlFor="email" className={labelCls}>Email</label>
                    <input id="email" name="email" type="email" autoComplete="email" inputMode="email" required maxLength={LIMITS.email} aria-invalid={!!fieldErrors.email} aria-describedby={describedBy("email")} className={field} />
                    {fieldError("email")}
                  </div>
                  <div>
                    <label htmlFor="message" className={labelCls}>Message</label>
                    <textarea id="message" name="message" rows={4} required minLength={10} maxLength={LIMITS.message} aria-invalid={!!fieldErrors.message} aria-describedby={describedBy("message")} className={`${field} resize-y`} />
                    {fieldError("message")}
                  </div>
                  {/* Honeypot, hidden from people and assistive tech. */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                    <label htmlFor="website">Leave this empty</label>
                    <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>

                  {error && (
                    <p ref={errorRef} tabIndex={-1} role="alert" className="text-sm text-[var(--danger)] focus:outline-none">
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

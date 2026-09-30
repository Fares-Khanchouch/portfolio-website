import { ArrowUp } from "lucide-react";
import { social, site } from "@/data";

export default function Footer() {
  const links = [
    { label: "Email", href: `mailto:${social.email}` },
    { label: "GitHub", href: social.github },
    { label: "LinkedIn", href: social.linkedin },
    { label: "Résumé", href: social.resume },
  ];
  const updated = new Date(site.updated).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="mx-auto max-w-5xl px-4 pt-10 pb-6 sm:px-6">
        <div className="flex flex-col gap-6 text-sm text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.href.startsWith("http") ? { target: "_blank", rel: "me noopener noreferrer" } : {})}
                  className="link-underline transition-colors duration-200 hover:text-fg"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-line px-3 py-1.5 transition-colors duration-200 hover:border-line-strong hover:text-fg sm:self-auto"
          >
            Back to top
            <ArrowUp size={14} aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-y-0.5" />
          </a>
        </div>
        <p
          aria-hidden="true"
          className="mt-10 text-[clamp(2.5rem,10.5vw,6.9rem)] leading-[0.85] font-semibold tracking-tighter whitespace-nowrap text-fg/[0.06] select-none"
        >
          {site.name}
        </p>
        <p className="mt-6 flex flex-col gap-1 font-mono text-xs text-fg-subtle sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>Last updated {updated}</span>
        </p>
      </div>
    </footer>
  );
}

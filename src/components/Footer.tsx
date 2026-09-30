import { ArrowUp, FileText, Github, Linkedin, Mail } from "lucide-react";
import { hero, social, site } from "@/data";

export default function Footer({ backToTop = true }: { backToTop?: boolean }) {
  const links = [
    { label: "Email", href: `mailto:${social.email}`, icon: Mail },
    { label: "GitHub", href: social.github, icon: Github },
    { label: "LinkedIn", href: social.linkedin, icon: Linkedin },
    { label: "Résumé", href: social.resume, icon: FileText },
  ];
  const updated = new Date(site.updated).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="mx-auto max-w-5xl px-4 pt-10 pb-6 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-soft font-mono text-[13px] font-bold text-accent ring-1 ring-accent/30"
            >
              fk
            </span>
            <p className="text-sm text-fg-muted">
              <span className="font-medium text-fg">{site.name}</span>
              <span className="block text-fg-subtle">{hero.eyebrow}, from Tunis</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-1 gap-y-2 text-sm text-fg-subtle">
            <ul className="-ml-3 grid grid-cols-[repeat(2,minmax(0,1fr))] sm:ml-0 sm:flex sm:flex-wrap">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.href.startsWith("http") ? { target: "_blank", rel: "me noopener noreferrer" } : {})}
                    className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-full px-3 [overflow-wrap:anywhere] transition-colors duration-200 hover:bg-surface-hover hover:text-fg"
                  >
                    <l.icon size={15} aria-hidden="true" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            {backToTop && (
              <a
                href="#top"
                className="group inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 transition-colors duration-200 hover:border-line-strong hover:text-fg sm:ml-2"
              >
                Back to top
                <ArrowUp size={14} aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-y-0.5" />
              </a>
            )}
          </div>
        </div>
        <p className="mt-8 flex flex-col gap-1 border-t border-line pt-6 font-mono text-xs text-fg-subtle sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>Last updated {updated}</span>
        </p>
      </div>
    </footer>
  );
}

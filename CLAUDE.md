# Fares Khanchouch — personal site

## Who I Am (updated 2026-09-29)
Forward Deployed Engineer · Integrations & LLM Agent Tooling, based in Tunis.
Integration Consultant at Axe Finance (credit-platform delivery for banks in
Qatar and Saudi Arabia, Python MCP servers + Claude skills); before that a
freelance automation engineer (n8n, Make, LLM pipelines). Stack worth showing:
Python, TypeScript, C#, Go, T-SQL, MCP / Claude agent skills, REST APIs, n8n,
Docker, Kubernetes, Terraform, AWS. Arabic (native), French, English.
Content rules and the current plan: docs/PLAN_2026-10.md (public page: no
job-search signals, no client names or client-internal figures).

## Architecture (2026-10 rebuild)
- Next.js 15 App Router, fully static; TypeScript strict; Tailwind CSS 4.
- All content in `src/data/index.ts`; components never hardcode text.
- Sections: `Hero`, `Work` (now + before), `Projects` (cards with
  `FlowDiagram`), `About`, `Contact`; `Navbar`/`Footer` per page.
- Design tokens are CSS variables in `src/app/globals.css` (dark default,
  light from the system setting). Use the Tailwind names `bg-bg`, `text-fg`,
  `text-fg-muted`, `text-fg-subtle`, `text-accent`, `bg-accent-solid`,
  `border-line`, `border-line-strong`, `bg-surface`. Every text colour pair
  is >= 4.5:1; keep it that way.
- Motion is CSS only; no animation library. `Reveal` only hides content that
  starts below the fold, after hydration, so crawlers, no-JS visitors and
  reduced-motion users always see everything. Never ship an animation whose
  initial state is invisible content.
- Security headers + CSP in `next.config.ts`. A new third-party script,
  font, image host or API must be added to the CSP explicitly.
- SEO: `layout.tsx` metadata + JSON-LD, `robots.ts`, `sitemap.ts`,
  `opengraph-image.tsx`. A new page gets its own `metadata` (title,
  description, canonical) and a sitemap entry.

## Rules
- Never break the EmailJS contact form integration.
- Keep TypeScript strict, no `any` types.
- Preview every change at 1440px and 375px (and with reduced motion) before
  committing; no console errors, no horizontal scroll.
- Mobile-first; touch targets >= 44px; visible keyboard focus.
- Commit working changes frequently with clear messages.

## What NOT to Do
- No purple accent colors; one accent only.
- No circle-cropped avatar with glow rings.
- No emoji in professional content.
- No generic gradient backgrounds; no cramped layouts.
- Don't hardcode personal content in components.
- Don't add dependencies without a clear need (the site runs on next,
  react, lucide-react, @emailjs/browser, clsx, tailwind-merge).
- No job-search signals, client names or client-internal figures on the
  public site.

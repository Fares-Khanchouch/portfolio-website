# Fares Khanchouch — Portfolio Redesign

## Who I Am
Cloud & DevOps / Infrastructure & Automation Engineer based in France.
Stack: AWS, GCP, Terraform, Ansible, Kubernetes, Docker, Helm, GitHub Actions,
Jenkins, n8n, Python, Go, JavaScript, Next.js, React, Tailwind CSS.
Fluent in English, French, Arabic, basic German.

## The Goal
Full visual redesign of this Next.js 15 portfolio. Make it feel premium,
elegant, and distinctive — the kind of site that makes engineers and hiring
managers stop and think "this person is serious." Not flashy, not generic AI
slop. Think Linear.app meets a DevOps engineer's personal brand.

## Aesthetic Direction
- Dark, minimal, premium — deep navy/slate background (#0a0f1e range)
- Single accent color: steel blue (#4a7fa5 range) pulled from the pro photo bg
- No purple, no random color mixing — one accent, used sparingly
- Clean geometric sans-serif typography — Inter or Geist, strong hierarchy
- Lots of whitespace — breathe, don't cram
- Subtle animations only — no attention-grabbing bounces, smooth Framer Motion
  transitions that feel engineered not designed
- Remove circle crop photo — use the professional photo (DSC06493.jpg) in a
  clean rectangular or slightly rounded format
- No emoji in content (especially no ✅ in work history)

## Stack
- Next.js 15, TypeScript, Tailwind CSS 4, Framer Motion 12
- App Router, components in src/components/
- shadcn/ui for any new UI components (use shadcn MCP for correct APIs)
- Use context7 for all Next.js/Tailwind/Framer Motion code

## Content Architecture (no-code updates)
This is critical. Refactor ALL hardcoded content into data files so Fares can
update the site by editing simple files, never touching components.

Data files to create in src/data/:
- content.ts     → hero text, about bio, section titles, meta
- projects.ts    → project list with title, description, tags, image, links
- work.ts        → already exists in src/types/work.ts, clean it up
- skills.ts      → tech stack grouped by category
- social.ts      → links (GitHub, LinkedIn, email, resume path)

Components must read from these files. Layout must stay clean regardless of
content length — design for overflow, not fixed strings.

## Sections (all 5 required)
1. Hero — name, title, one-line description, CTA buttons (Contact + Resume)
   Use professional photo (DSC06493.jpg), not the circle-cropped one
   Title: "Infrastructure & Automation Engineer" or similar (not "Junior")
2. About — bio text, location (France, open to remote), languages
3. Work History — timeline, clean, no emojis, dates + company + bullet points
4. Projects — card grid, each with image/screenshot, title, description,
   tech tags, GitHub link
5. Contact — clean form, EmailJS already configured, keep it

## Rules
- Always create a git branch called redesign before making any changes
- Never break the EmailJS contact form integration
- Keep TypeScript strict, no any types
- Use Playwright MCP to preview localhost:3000 after each major change
- Use frontend-design skill for all visual decisions
- Use ui-ux-pro-max skill for color palette and typography choices
- Use web-design-guidelines skill to audit before finishing any section
- Mobile-first — every section must look great on iPhone screen width
- Commit working changes frequently with clear messages

## What NOT to Do
- No purple accent colors
- No circle-cropped avatar with glow rings
- No emoji in professional content
- No generic gradient backgrounds
- No cramped layouts — whitespace is intentional
- Don't hardcode any personal content in components
- Don't add unnecessary dependencies

## MCP Usage Instructions

### Playwright MCP — use this constantly
- Before starting any work: open localhost:3000 and review the current state
- After every single component change: open localhost:3000 and verify it looks right
- Check both desktop (full width) and mobile (375px viewport) after every change
- If something looks broken, fix it before moving to the next component
- Don't ask me to check — do it yourself automatically

### Context7 MCP — use for all code
- Every time you write Next.js, Tailwind CSS 4, or Framer Motion code
- Look up the correct APIs before writing — don't rely on training data
- Tailwind 4 has breaking changes from v3, always verify class names
- Framer Motion 12 has updated animation APIs, always verify

### shadcn MCP — use when adding components
- Before adding any shadcn/ui component, look up its current API
- Check available variants, props, and correct import paths
- Don't generate shadcn component code from memory

### Magic UI MCP — use for animations and special effects
- Hero section entrance animations
- Scroll-triggered reveals on sections
- Any marquee, fade, or motion component
- Check what's available before building custom animations

### Context7 + shadcn together
- When building a new UI component that uses shadcn, use both
- Context7 for the framework patterns, shadcn MCP for component APIs
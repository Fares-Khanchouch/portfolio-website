# Portfolio Redesign Plan

## Status: Awaiting approval to start

---

## Audit Summary — Current Site Issues

### Hero
- Circle-cropped avatar with purple glow ring — must be replaced with DSC06493.jpg
- Accent color is `#3b82f6` — should be `#4a7fa5` (steel blue from photo bg)
- Title is "Cloud & DevOps Engineer" — should be "Infrastructure & Automation Engineer"
- Content hardcoded in component

### About
- Purple `&` in skills carousel (`text-purple-400`) — violates no-purple rule
- Draggable floating icons feel like a toy, not premium — replacing with clean skill grid
- Excessive `mb-60` bottom margin
- Content hardcoded in component

### Work History
- ✅ emoji on every bullet — explicitly forbidden in CLAUDE.md
- Purple timeline dots (`border-purple-500`) — change to steel blue
- `console.log` statements throughout — remove
- Content hardcoded in component

### Projects
- Purple tag pills (`bg-purple-700`) — change to steel blue
- Modal is hardcoded to only show n8n Operator regardless of which card you click
- `console.log` throughout — remove
- Content hardcoded in component

### Contact
- Purple send button (`bg-purple-700`) — change to steel blue
- Purple focus rings — change
- EmailJS integration works — **keep all credentials intact**
- Content hardcoded in component

### Navbar
- Purple-to-blue gradient on "Khanchouch" — must become steel blue only
- Hover underline uses purple — change
- No mobile hamburger menu

---

## Implementation Plan

### Phase 0 — Branch + Data Files
- [ ] Create `redesign` git branch
- [ ] `src/data/content.ts` — hero text, about bio, section titles, meta
- [ ] `src/data/projects.ts` — project list (title, description, tags, image, github link)
- [ ] `src/data/work.ts` — clean experiences, no emoji
- [ ] `src/data/skills.ts` — tech stack grouped by category
- [ ] `src/data/social.ts` — GitHub, LinkedIn, email, resume path

### Phase 1 — Global Design Tokens
- [ ] Unify section background colors (no jarring black vs blue alternation)
- [ ] Remove all `console.log` statements across all components
- [ ] Remove all purple from Navbar — solid steel blue only

### Phase 2 — Hero
- [ ] Replace circle `/avatar.png` with `/DSC06493.jpg` in a clean rectangular frame
- [ ] Update title to "Infrastructure & Automation Engineer"
- [ ] Change accent from `#3b82f6` → `#4a7fa5`
- [ ] Wire content from `src/data/content.ts`

### Phase 3 — About
- [ ] Replace draggable floating icons with clean grouped skill grid
- [ ] Remove `purple-400`, use `#4a7fa5`
- [ ] Remove excessive bottom margin
- [ ] Wire from `src/data/content.ts` and `src/data/skills.ts`

### Phase 4 — Work History
- [ ] Remove all ✅ emoji
- [ ] Replace purple timeline dots with steel blue
- [ ] Add scroll-triggered Framer Motion reveals
- [ ] Wire from `src/data/work.ts`

### Phase 5 — Projects
- [ ] Replace purple tags with steel blue pills
- [ ] Fix modal to be data-driven (correct content per card)
- [ ] Wire from `src/data/projects.ts`

### Phase 6 — Contact
- [ ] Replace all purple with `#4a7fa5`
- [ ] Keep EmailJS intact: service `service_1jmn1ld`, template `template_ty6k1xs`, key `A1yyyeM4xJuzcDdAA`

### Phase 7 — Navbar + Footer
- [ ] Remove purple gradient from name
- [ ] Add mobile hamburger menu
- [ ] Update footer copyright year to 2026

### Phase 8 — Final Audit
- [ ] Run `web-design-guidelines` skill audit
- [ ] Test at 375px (mobile) and 1280px (desktop)
- [ ] Remove all remaining `console.log` calls

---

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#0a0f1e` | Page background |
| Accent | `#4a7fa5` | Buttons, highlights, timeline dots, tags |
| Text primary | `#f8fafc` | Headings |
| Text secondary | `#94a3b8` | Body, labels |
| Card surface | `rgba(255,255,255,0.04)` | Card backgrounds |
| Border | `rgba(255,255,255,0.08)` | Subtle dividers |

---

## What to Keep (Do Not Touch)
- EmailJS credentials and submit logic in `Contact.tsx`
- `useSectionInView` hook
- `BackgroundLayout` section-tracking architecture
- Framer Motion animation patterns (refine, don't replace)
- 5-section single-page structure
- Footer: GitHub + LinkedIn links

---

## Stack
Next.js 15, TypeScript strict, Tailwind CSS 4, Framer Motion 12, App Router

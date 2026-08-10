# Project Context

## Purpose

This repository is a personal portfolio site for Than Quoc Thinh, focused on software engineering, backend development, business analysis, and selected academic or personal projects.

## Tech Stack

- Next.js 16 with the App Router.
- React 19 and TypeScript.
- Tailwind CSS 4 for styling.
- Framer Motion for motion.
- Lucide React for icons.
- `canvas-confetti` for celebratory effects.

## Main Structure

- `app/page.tsx`: assembles the home page sections.
- `app/layout.tsx`: metadata, global layout, fonts, and schema script.
- `app/globals.css`: global styling and Tailwind entry.
- `components/`: section components and shared UI components.
- `components/I18nProvider.tsx`: client-side language provider.
- `lib/data.ts`: portfolio data such as personal info, skills, experience, and projects.
- `lib/i18n.ts`: translation dictionaries and i18n types.
- `public/`: static assets such as CV, avatars, favicon, sitemap, and robots files.

## Commands

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build production bundle: `npm run build`
- Run lint: `npm run lint`

## Working Guidelines For Agents

- Preserve the existing section-based component structure.
- Prefer editing shared portfolio content in `lib/data.ts` and translations in `lib/i18n.ts`.
- Keep UI changes consistent with the existing Tailwind and component style.
- Keep SEO metadata in `app/layout.tsx` and hidden crawlable content in `app/page.tsx` aligned with visible portfolio content.
- Use `lucide-react` icons when adding new interface icons.
- Avoid unrelated refactors when making focused portfolio updates.
- Verify meaningful changes with `npm run lint` or `npm run build` when feasible.

## Project Skills

Project-local skills should live in `.agents/skills/`.

Recommended skill layout:

```text
.agents/skills/<skill-name>/
  SKILL.md
  agents/openai.yaml
  scripts/
  references/
  assets/
```

Only add folders that the skill actually needs.

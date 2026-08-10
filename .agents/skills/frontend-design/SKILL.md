---
name: frontend-design
description: Project-local guidance for frontend design in this Next.js portfolio. Use when changing visual UI, layout, sections, interactions, responsive polish, or copy presentation; preserve the existing dark terminal-inspired identity unless the user explicitly asks for a larger redesign.
---

# Frontend Design

Approach this as a careful design pass for an existing personal portfolio, not a blank-canvas rebrand. Make deliberate choices about spacing, hierarchy, motion, and component composition, but keep them compatible with the current identity: dark slate surfaces, sky/cyan accents, terminal and backend engineering cues, glassy cards, and restrained motion.

## Ground it in the subject

Read `.agents/PROJECT_CONTEXT.md` before making design changes. Treat this as a Vietnamese/English personal site for a backend-oriented software engineering student. Prefer visual metaphors that fit engineering work: terminal prompts, system status, APIs, services, data flow, deployments, diagrams, and project artifacts.

If the request is vague, infer the smallest useful design goal from the current section. For example, improve scanability, make a project card clearer, make a mobile layout calmer, or make a call to action easier to notice.

## Project fit

Work with the existing structure first:

- Keep section components in `components/` unless a shared UI primitive is clearly useful.
- Keep portfolio content in `lib/data.ts` and translations in `lib/i18n.ts`.
- Use `lucide-react`, `framer-motion`, Tailwind classes, and existing color variables before adding dependencies.
- Preserve the dark `#020617` base and `#38bdf8` primary accent unless the task is explicitly a redesign.
- Add one small signature detail at a time, such as a terminal label, progress line, glow, hover state, or scroll interaction.

## Design principles

For web designs, the hero is a thesis. In this project, the hero should quickly communicate the person, role, and engineering direction. Strengthen that message with specific portfolio details rather than generic SaaS landing-page patterns.

Typography carries the personality of the page. This portfolio currently uses Inter with strong weights and mono accents. Improve hierarchy through size, weight, line-height, tracking, and short mono labels before introducing new font families.

Structure is information. Section labels, dividers, badges, timelines, and cards should encode something true about the content. Use numbering only when order matters, such as a timeline, process, or ordered project flow.

Leverage motion deliberately. The project already uses Framer Motion, parallax, glows, hover states, and typewriter effects. Add motion only when it clarifies focus, state, or progression; respect responsive layout and keep mobile interactions calm.

Match complexity to the existing page. The current style can support rich visuals, but a portfolio should still feel readable, credible, and fast to scan.

## Process

Work in two light passes.

First, identify the section or interaction being changed, the user-facing goal, and the smallest visual move that improves it. For larger edits, sketch a compact plan with color, type treatment, layout, and one signature detail.

Then review the plan against the existing UI. If the change would make one section feel like it belongs to a different website, reduce the contrast or move the idea into a smaller detail. After that, implement directly in the existing component style.

When writing code, prefer Tailwind utility classes and local component changes. Be careful with CSS selector specificity in `app/globals.css`; global styles should support shared behavior, not patch one component from far away.

## Restraint and self-critique

Spend boldness in one place. Let the signature detail be memorable, and keep the surrounding layout disciplined. Cut decoration that does not improve comprehension, hierarchy, or the portfolio's engineering identity.

Build to a quality floor without making it a separate project: responsive down to mobile, visible keyboard focus, readable contrast, sensible hover and focus states, and no obvious layout shift.

If screenshots or browser inspection are available, inspect the changed view after implementation. Look especially for clipped text, crowded cards, excessive glow, awkward mobile spacing, and motion that distracts from content.

## Writing in design

Words appear in a design for one reason: to make it easier to understand and use. They are design material, not decoration. Bring the same intentionality to copy that you bring to spacing and color.

Write from the visitor's side of the screen. Name things by what they recognize: projects, experience, skills, CV, contact, source code, demo. Describe what something does in plain terms rather than selling it.

Use active voice as default. A control should say exactly what happens when it is used: "View projects," "Download CV," "Contact me," or "View source." Keep vocabulary consistent across buttons, labels, and feedback.

For Vietnamese and English content, keep the meaning aligned between `lib/i18n.ts` entries. Avoid making one language more polished or more complete than the other.

Treat empty, loading, and error states as moments for direction. Explain what happened and what the user can do next, in the same restrained voice as the rest of the portfolio.

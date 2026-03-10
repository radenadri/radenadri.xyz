# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development commands

This repository uses `pnpm` (`pnpm-lock.yaml` is present).

- `pnpm dev` — start the Next.js dev server with Turbopack
- `pnpm build` — create a production build with Turbopack
- `pnpm start` — run the production server
- `pnpm lint` — run Biome checks
- `pnpm format` — format the codebase with Biome

## Architecture overview

This is a personal portfolio site built with Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Biome, and MDX.

The app is mostly content-driven:
- `src/app` contains the App Router entrypoints, global layout, error boundaries, and route segments.
- `src/app/work/*/page.mdx` contains long-form project pages written in MDX.
- `src/data/*` contains structured portfolio content used by the UI, including work items, experience, and tech stack data.
- `src/components/*` contains reusable UI pieces, animation helpers, and custom presentation components.
- `src/components/ui/*` contains lower-level UI primitives and reusable widgets.
- `src/components/ds.tsx` defines the small in-house layout/design-system primitives used across the site (`Layout`, `Container`, `Section`, `Prose`, etc.).

## Content and routing model

The homepage in `src/app/page.tsx` assembles most of the site by importing structured data from `src/data/works.ts`, `src/data/experiences.ts`, and `src/data/tech-stack.ts` and rendering it through custom components.

The `/work/*` section mixes structured metadata with MDX pages:
- `src/data/works.ts` is the source of truth for work/project listings, link behavior, and slugs.
- Individual detailed case-study pages live at `src/app/work/<slug>/page.mdx`.
- If you add or rename a work item, keep `src/data/works.ts` and the matching MDX route in sync.

## Next.js and MDX setup

MDX support is enabled in `next.config.ts` via `@next/mdx`, and `pageExtensions` includes `md` and `mdx`.

Remote images are currently allowed only for `https://placehold.co/**` in `next.config.ts`.

## Project conventions

Important repo-specific guidance is defined in `.github/instructions/nextjs-developer.instructions.md` and `.github/instructions/web-interface-guidelines.instructions.md`.

Follow these conventions when editing code here:
- Use concise, technical TypeScript with functional and declarative patterns.
- Avoid classes; prefer functions and modular helpers.
- Favor named exports for components when practical.
- Use lowercase-with-dashes for directory names.
- Prefer interfaces over types when defining object shapes.
- Avoid enums; use maps or unions instead.
- Prefer React Server Components and limit `"use client"` to places that truly need browser APIs or client-side interactivity.
- Use Tailwind CSS, Radix UI, and shadcn-style component patterns for UI work.
- Keep responsive behavior mobile-first.

## UI and accessibility expectations

The repository includes explicit web interface rules. Preserve them when making UI changes:
- Full keyboard accessibility and visible focus states are required.
- Prefer native semantic elements before ARIA.
- Interactive elements should have generous hit targets.
- Loading, empty, error, and dense-content states should be considered part of the UI, not edge cases.
- Respect `prefers-reduced-motion` for animations.
- Avoid layout shift and unintended overflow.
- Use descriptive labels for icon-only controls.

## Formatting and linting

Biome is the formatter and linter for this repository (`biome.json`). Do not assume ESLint or Prettier are configured.

Run `pnpm lint` after substantive code changes and `pnpm format` if formatting needs to be normalized.

## Notable implementation details

- `src/app/layout.tsx` sets global metadata, initializes the theme/preloader providers, and injects Microsoft Clarity.
- `src/app/page.tsx` is a large client component that drives the portfolio landing page, including analytics event tracking.
- The design language relies on custom animated/presentation components rather than a large external component framework.
- There is currently no dedicated test script in `package.json`, so do not invent test commands in this repository guidance unless test tooling is added later.

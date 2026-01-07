# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Pluto** — an Angular Moonrepo Template powered by moonrepo for task orchestration. Built with a space-themed identity, it's designed for creating customized multi-tenant applications with shared core structure. The name celebrates the cosmic connection between Pluto and moonrepo!

## Commands

```bash
# Development
just dev                    # Start dev server (moon pluto:dev)

# Build
moon pluto:build            # Build production bundle

# Formatting & Linting
just format                 # Format all files (biome + prettier + moon :format)
just lint                   # Lint all files (biome + prettier + moon :lint)
moon :lint                  # Lint apps and libs only
moon :format                # Format apps and libs only

# Testing
just test                   # Run all tests (moon :test)
moon pluto:test             # Run tests for pluto app only

# Maintenance
just clean                  # Clean caches and build artifacts
just sync                   # Sync dependencies (moon sync + pnpm install)
just upgrade                # Safe dependency upgrades
```

Task execution format: `moon <app|lib>:<command>` (e.g., `moon pluto:dev`, `moon app-http:lint`)

## Architecture

**Monorepo Structure:**

- `apps/pluto/` - Main Angular application
- `libs/` - Shared libraries (app-_, feature-_, ui-\*, types, plugin-eslint, moon-project)

**Lib Categories:**

- `app-*` - Core application libraries (config, environment, http, layout, theme, build, assets)
- `feature-*` - Feature modules (example, not-found)
- `ui-*` - UI component libraries (icons)
- `types` - Global TypeScript types
- `plugin-eslint` - ESLint configuration
- `moon-project` - Access moon.yml config in code

**Import Aliases:**

- `@pluto/*` - Core libraries
- `@pluto-feature/*` - Feature libraries

## Angular Conventions

- **Standalone components only** - Do NOT use NgModules. Do NOT set `standalone: true` (it's the default)
- **Signals for state** - Use signals, `computed()`, `input()`, `output()` instead of decorators
- **Native control flow** - Use `@if`, `@for`, `@switch` instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- **OnPush change detection** - Always set `changeDetection: ChangeDetectionStrategy.OnPush`
- **inject() function** - Use `inject()` instead of constructor injection
- **Reactive Forms** - Preferred over template-driven forms
- **NgOptimizedImage** - Required for all static images
- **No ngClass/ngStyle** - Use `class` and `style` bindings instead

**Component Host Styling:**

- **host property** - Preferred for `@HostBinding`/`@HostListener` alternatives
- **Feature components** - Do NOT use `host.class` for styling. Feature components are transparent wrappers
- **Layout styling** - Use inner wrapper `<div>` elements with class attributes instead of host classes

## Styling (Tailwind CSS v4)

- **Utility-first** - Use Tailwind utility classes directly in templates
- **No component SCSS** - Avoid creating `.scss` files for components; use Tailwind classes instead
- **Inner wrappers** - For complex layouts, wrap content in a `<div>` with Tailwind classes
- **Semantic elements** - Use `<header>`, `<section>`, `<main>`, etc. as natural wrappers when appropriate
- **Global styles** - Located in `libs/app-theme/main.scss`

## Code Style

- **Line width:** 94 characters
- **Quotes:** Single quotes for JS/TS
- **Semicolons:** As needed (not required)
- **Max function lines:** 70
- **Type definitions:** Use `type` instead of `interface`
- **Import organization:** External packages → @pluto/_ → @pluto-feature/_ → aliases → relative paths

**Domain-Driven Structure:**

- **No inline types** - Never define types/interfaces directly in components or features
- **Model files** - Place types in dedicated model files (e.g., `models/post.ts`)
- **Feature structure** - Use `src/models/` directory within features for domain types

**Global variables available:** `BUILD_ENV`, `BUILD_DATE`, `APP_VERSION`, `APP_HASH`, `NONCE`

## Tooling

- **Package Manager:** pnpm
- **Task Runner:** moon (with just as convenience wrapper)
- **Linting:** Biome (JS/TS), ESLint (Angular-specific), Stylelint (CSS/SCSS), Prettier (JSON/YAML/HTML/MD)
- **Testing:** Vitest (unit), Playwright (E2E)
- **TypeScript:** Very strict settings enabled

**Dependencies:**

- Add dependencies to **workspace root** `package.json` unless only needed by a specific lib
- Use `ng add <package>` for Angular-related packages when available
- Use `pnpm add <package>` for general packages

## Environment Files

Do NOT read, modify, or create:

- `.env` files
- `environment`-named files
- `generated`-named files
- `.npmrc`

## Final Checks

After changes, always run:

1. `moon :lint` - Verify code quality
2. `moon :test` - Verify functionality
3. `moon pluto:build` - Confirm it compiles

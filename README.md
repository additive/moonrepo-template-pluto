<br>
<h1 align="center">
  <img src="assets/pluto.png" alt="Pluto" width="200" />
  <br>
  <br>
  Pluto — Angular Moonrepo Template
</h1>

<p align="center">
  <strong>Launch your Angular projects into orbit with the power of moonrepo!</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#ai-assisted">AI Assisted</a>
</p>

<br>

**Pluto** is a production-ready Angular monorepo template powered by [moonrepo](https://moonrepo.dev) — because every great Angular project deserves a moon!

Born from real-world enterprise applications, this template provides a battle-tested foundation for building scalable, multi-tenant Angular applications. Whether you're launching a single app or an entire constellation of customized solutions, Pluto has you covered.

> **Note:** The `angular.json` lives in the workspace root to enable `ng update` for workspace-wide Angular dependencies. Individual apps can have their own `angular.json` as needed.

## Features

| Category                 | Tools                                          |
| ------------------------ | ---------------------------------------------- |
| **Task Orchestration**   | moonrepo, moonrepo templates, prototools       |
| **Code Quality**         | Biome, ESLint, Stylelint, Prettier             |
| **Styling**              | Tailwind CSS v4, SCSS                          |
| **Package Management**   | pnpm, Node.js                                  |
| **Developer Experience** | justfile, editorconfig, VS Code & Zed settings |
| **TypeScript**           | Very strict tsconfig — we don't mess around!   |
| **AI Ready**             | Claude Code instructions (`CLAUDE.md`)         |

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
just dev

# Build for production
moon pluto:build

# Run all linters
just lint

# Run tests
just test
```

## Architecture

```
pluto/
├── apps/
│   └── pluto/          # Main Angular application
└── libs/
    ├── app-*           # Core application libraries
    ├── feature-*       # Feature modules
    ├── ui-*            # UI component libraries
    └── types/          # Shared TypeScript types
```

### Core Libraries (`app-*`)

| Library           | Purpose                           |
| ----------------- | --------------------------------- |
| `app-assets`      | Shared assets across applications |
| `app-build`       | Build plugins and transformers    |
| `app-config`      | Application configuration         |
| `app-environment` | Environment variables             |
| `app-http`        | HTTP client and interceptors      |
| `app-layout`      | Main layout components            |
| `app-theme`       | Global theme and Tailwind setup   |

### Feature Libraries (`feature-*`)

| Library             | Purpose                          |
| ------------------- | -------------------------------- |
| `feature-welcome`   | Welcome landing page             |
| `feature-example`   | HTTP client usage demonstration  |
| `feature-not-found` | 404 page                         |

### Utilities

| Library         | Purpose                            |
| --------------- | ---------------------------------- |
| `moon-project`  | Access `moon.yml` config in code   |
| `plugin-eslint` | Shared ESLint configuration        |
| `types`         | Global TypeScript types and resets |

## AI Assisted

This template is developed by our engineers by hand with care. We use local LLMs with [opencode](https://github.com/opencode-ai/opencode) as an assistant for enhancements — not as a replacement for thoughtful development.

Claude is only used in this public repository to also benefit from it while having everything reviewed by hand when we sync back improvements and changes to our interal project.

## About

Pluto is developed and maintained by [ADDITIVE GmbH](https://www.additive-net.de), a certified technology company specializing in high-end engineering solutions. We build web-based applications, quality management systems, and digital laboratory solutions for enterprises across various industries.

This template powers our internal multi-tenant applications, allowing us to deliver customized solutions to our customers while maintaining a shared, well-tested core architecture.

Learn more about our [solutions and services](https://www.additive-net.de/de/solutions).

<br>

<p align="center">
  Made with care by <a href="https://www.additive-net.de">ADDITIVE GmbH</a>
  <br>
  <sub>To the moon!</sub>
</p>

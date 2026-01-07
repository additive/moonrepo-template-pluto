# Development Guidelines

This document defines the standard practices for developing applications and libraries within the Pluto monorepo.

## Project Structure

The monorepo follows a structured layout to ensure consistency and scalability.

- TODO -

## Development Workflow

All development tasks are managed through the `moon` task runner.

### Common Commands

```shell
# Lint code
moon :lint

# Format code
moon :format

# Run tests
moon :test

# Build the "pluto" application
moon pluto:build
```

### Task Execution

Use the format `moon <app|lib>:<command>` to run tasks.

- `moon pluto:dev` – Start the development server for the "pluto" app
- `moon user-interface:build` – Build the "user-interface" app
- `moon libs:build` – Build all libraries

## Tech Stack

The project uses modern, standardized tooling to ensure consistency and performance.

- **Framework**: Angular v20+ with Signals, Standalone Components, and Control Flow
- **State Management**: Signals (preferred over RxJS for local state)
- **Forms**: Reactive Forms (preferred over Template-driven)
- **Styling**: SCSS, with `NgOptimizedImage` for all static images
- **Package Manager**: `pnpm`
- **Task Runner**: `moon`
- **Linting & Formatting**:
  - Biome (lint, check, format)
  - ESLint (Angular-specific linting)
  - Prettier (JSON, HTML, YAML)
  - Stylelint (CSS/SCSS)
- **Git Hooks**: Lefthook
- **Version Control**: GitHub

## Environment and Security

- Do not read, modify, or create files containing:
  - `.env` or similar environment files
  - `environment`-named files
  - `generated`-named files
  - `.npmrc`
- Do not add or share sensitive secrets.

## Final Checks

After any changes:

- Run `moon :lint` to ensure code quality.
- Run `moon :test` to verify functionality.
- Build the "pluto" app with `moon pluto:build` to confirm it compiles and runs.

This document is the authoritative source for all development in the Pluto monorepo.

---
name: create-library
description: >-
  Creates a shared library in libs/ (core app-*, ui-*, or a plain utility), wires it into
  moon, pnpm and TypeScript, and makes it importable as @pluto/<name>. Use when code is
  shared by several features or apps, or when asked to add a library, package or module.
  For a routed page use the create-feature skill instead.
---

# Create a library

## Pick the kind

| Prefix      | For                                                   | Alias                   | moon `layer`                 |
| ----------- | ----------------------------------------------------- | ----------------------- | ---------------------------- |
| `app-*`     | app infrastructure: config, http, i18n, layout, theme | `@pluto/<name>`         | `library`                    |
| `feature-*` | a routed page, use `create-feature`                   | `@pluto-feature/<name>` | `library`                    |
| `ui-*`      | presentational components and directives              | `@pluto/ui-<name>`      | `library`                    |
| none        | utilities, models, types                              | `@pluto/<name>`         | `library` or `configuration` |

Check first whether an existing library already fits. A new library pays off when two
features need the same code, not before.

## 1. Create the files

Copy the shape of an existing library, `libs/app-i18n` is a small one:

```
libs/app-billing/
├── moon.yml
├── package.json
├── src/
│   └── index.ts
├── tsconfig.json
├── tsconfig.editor.json
├── tsconfig.lib.json
└── tsconfig.spec.json
```

`moon.yml`:

```yaml
id: app-billing
layer: library
language: typescript
stack: frontend
tags:
  - core
project:
  title: App Billing
  description: Prices, taxes and invoice totals
dependsOn:
  - types
```

`package.json`:

```json
{
  "name": "@pluto/billing",
  "version": "0.1.0",
  "private": true,
  "exports": {
    "./package.json": "./package.json",
    ".": "./src/index.js",
    "./*": "./src/*.js"
  },
  "dependencies": {}
}
```

The `exports` point at `.js` files that never exist. That is on purpose: resolution falls
back to the TypeScript `paths` moon writes, which point at the `.ts` sources. An entry
that resolves to a real file makes the dev server load it directly and break.

`tsconfig.json`:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": { "outDir": "../../.moon/cache/types/libs/app-billing" },
  "files": [],
  "include": [],
  "references": [
    { "path": "tsconfig.editor.json" },
    { "path": "tsconfig.lib.json" },
    { "path": "tsconfig.spec.json" }
  ]
}
```

Copy the three `tsconfig.{editor,lib,spec}.json` from `libs/app-i18n` unchanged.

## 2. Wire it up

Add `app-billing` to `dependsOn` in every `moon.yml` that imports it, then:

```shell
just sync
```

moon writes the dependency into each consumer's `package.json` and the alias into its
`tsconfig.json`. Never edit those generated `paths` or `workspace:*` entries by hand.
`dependsOn` is the source of truth.

## 3. Write the code

- Every export gets a doc comment saying what it is and who uses it.
- Keep it generic: a shared library never mentions a specific app or customer.
- Group domain code in folders named after the domain (`src/tax/rates.ts`), not in
  `utils.ts` or `models.ts` catch-alls.
- Use `type`, `as const` objects instead of `enum`, and `satisfies` instead of `as`.
- An `inject()`-based helper calls `assertInInjectionContext(fn)` first.
- Tests sit next to the code as `*.spec.ts`. To run them, add the `tests` tag to the
  library's `moon.yml`.

## 4. Check

```shell
just format
just lint
just test
moon run pluto:build
```

# AGENTS.md

Guidance for AI agents and humans working in this repository.

## Project

**Pluto** is an Angular monorepo template on [moonrepo](https://moonrepo.dev). Apps in
`apps/` share a core of libraries in `libs/`, so several customized apps can grow from one
codebase.

## Toolchain

Versions are pinned in `.prototools` (installed with `proto`) and `.moon/toolchains.yml`.

- **Angular** 22 · **TypeScript** 6 · **Node** 24 · **pnpm** 11 · **moon** 2
- **Lint / format**: oxlint and oxfmt, for every file, Angular templates included
- **UI**: Tailwind CSS v4 and spartan/ui (Brain from npm, Helm vendored in `libs/ui-helm`)
- **i18n**: transloco, English and German
- **Icons**: ng-icons with Lucide

Install packages through Socket Firewall: `sfw pnpm install`. A pnpm `minimumReleaseAge`
gate (3 days) holds back fresh releases. Angular packages and oxc are exempt, see
`pnpm-workspace.yaml`.

## Commands

moon 2 needs the `run` subcommand (`moon run pluto:build`, not `moon pluto:build`).

```shell
just setup        # proto use and install
just dev          # dev server (moon run pluto:dev), needs mkcert for the certificates
just lint         # oxlint, oxfmt --check, moon run :lint
just format       # oxlint --fix and oxfmt
just test         # moon run :test
just sync         # after editing a moon.yml: moon sync, install, reorder
just upgrade      # in-range dependency updates

moon run pluto:build                     # production build
moon generate feature                    # scaffold a feature library
```

## Structure

- `apps/pluto`: the app. `src/app` holds the root component, config and routes.
- `libs/app-*`: core (build, config, environment, http, i18n, layout, theme, assets)
- `libs/feature-*`: routed features, each mounted by an app's routes
- `libs/ui-helm`: vendored spartan/ui Helm components
- `libs/moon-project`: an app's `moon.yml` `project` block, typed, in app code
- `libs/types`: global types and build-time constants
- `templates/libs`: moon generator templates

Libraries are imported as `@pluto/*` and `@pluto-feature/*`. A project's dependencies
are declared in its `moon.yml` `dependsOn`, the source of truth. moon writes them into
`package.json` and every `tsconfig.json`. After editing `dependsOn`, run `just sync`.

## Skills

Step-by-step guides for recurring work live in `.agents/skills/<name>/SKILL.md`
(`.claude/skills` links there). Read the matching one before you start:

- `rename-template`: turn Pluto into the user's product
- `create-feature`: a routed page with menu entry and translations
- `add-ui-component`: a spartan/ui Helm component, generated and used
- `add-translation`: text in every language
- `create-library`: a shared library wired into moon, pnpm and TypeScript
- `fetch-data`: `httpResource` reads, service writes, loading and error states

When a convention changes, update the skill that teaches it in the same change.

## Conventions

- **Angular**: standalone components, zoneless, signal inputs and outputs, `inject()`,
  `@if`/`@for`/`@switch`. OnPush is the default, so do not set `changeDetection`.
  See `docs/angular.md`.
- **Files**: components and features are `<name>.component.{ts,html}`, the feature class
  keeps the `Feature` suffix. oxfmt formats a template with the Angular parser only when
  it is named `*.component.html`. Other files get kebab-case names without dotted
  suffixes (`welcome-routes.ts`).
- **Types**: `type` over `interface`, `as const` objects over `enum`, `satisfies` over
  `as`, never `any`. Domain types live in their own files (`models/post.ts`).
- **Styling**: Tailwind utilities in the template, semantic tokens only (`bg-primary`,
  `text-muted-foreground`), no SCSS. A component that needs a stylesheet uses plain CSS
  starting with `@reference '@pluto/theme/tailwind.css';`.
- **spartan/ui**: list Helm classes one by one in `imports` (`HlmCard, HlmCardTitle`),
  never spread `HlmCardImports`. Keep `libs/ui-helm` equal to the generator's output.
  The one deliberate change is cnfast in `utils/src/lib/hlm.ts`; re-add it after
  regenerating `utils`. Add a component with `pnpm ng g @spartan-ng/cli:ui <name>`, then
  add a root barrel `src/<name>/index.ts` (`export * from './src'`) and run `just format`.
- **i18n**: every user-facing string is a transloco key in `libs/app-i18n/locales`, kept
  alphabetically sorted with the same keys in every language (`just lint` checks).
  Templates use the `transloco` pipe. A route `title` is a key, translated by
  `TranslatedTitleStrategy`. Menu labels are piped through `transloco` where rendered.
- **Docs**: every exported component, service, function and type gets a doc comment
  saying what it is and who uses it. Comments explain only what the code cannot.

## Git

Conventional Commits with a capitalized subject (`feat: Add …`), at most 72 characters,
enforced by commitlint. The moon-generated hooks run oxlint, oxfmt, the affected
`:lint` tasks and gitleaks before a commit.

## Do not touch

`.env` files, `environment`-named files, `generated`-named files, `.npmrc`.

## Before you finish

`just lint`, `just test` and `moon run pluto:build` must pass.

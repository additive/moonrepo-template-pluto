---
name: rename-template
description: >-
  Renames the Pluto template to the user's own product: the app folder, the @pluto/* and
  @pluto-feature/* import aliases, the moon project, certificates, page titles and texts.
  Use right after cloning the template, or when asked to rename the app or the workspace
  scope.
---

# Rename the template

Pluto is a template. The first thing a new project does is give it its own name.

## 1. Ask for the names

Ask the user for, and confirm before changing anything:

- **App name**, kebab-case (`acme`). Becomes the app folder, the moon id and the route.
- **Display name** (`Acme`). Shown in the header, the page titles and the manifest.
- **Import scope** (`@acme`). Replaces `@pluto` and, with `-feature`, `@pluto-feature`.

Also ask whether to keep the demo pages (`feature-welcome`, `feature-example`). Keeping
them as a reference is fine. To drop one, see "Remove a demo feature" below.

## 2. See what will change

```shell
rg -il pluto --hidden -g '!node_modules' -g '!.git' -g '!pnpm-lock.yaml'
```

The name shows up in these kinds of places:

| Where                                                                      | What                                                                                  |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `apps/pluto/`                                                              | the app folder, its `moon.yml` id, `manifest.webmanifest`, `Caddyfile`, `compose.yml` |
| `angular.json`                                                             | project name, every `./apps/pluto/` path, `pluto:build:*` targets                     |
| `package.json` files, `tsconfig*.json`, `components.json`, `.oxfmtrc.json` | the `@pluto` scope                                                                    |
| `.moon/tasks/*.yml`, `justfile`                                            | `pluto:dev`, the `pluto.local` / `pluto-host.local` certificate hosts                 |
| `libs/app-http/src/provide-http.ts`                                        | the XSRF cookie and header names                                                      |
| `libs/app-i18n/src/title-strategy.ts`, `libs/app-i18n/locales/*.json`      | the display name in titles and texts                                                  |
| `libs/app-layout/src/main/main.component.html`, `app.routes.ts`            | the brand and the `/pluto` route                                                      |
| `README.md`, `AGENTS.md`, `.github/workflows/`, `templates/`               | docs, CI and the generator                                                            |

`apps/pluto/src/environments/` contains the name too. Environment files are off limits
for agents (see `AGENTS.md`): list what needs changing there and let the user do it.

## 3. Rename

Move the folder first, then replace text. Replace the scoped forms before the bare word,
so `@pluto-feature` does not turn into `@acme-feature` by accident of order:

```shell
git mv apps/pluto apps/acme
files=$(rg -l pluto --hidden -g '!node_modules' -g '!.git' -g '!pnpm-lock.yaml' -g '!**/environments/**')
echo "$files" | xargs sd '@pluto-feature/' '@acme-feature/'
echo "$files" | xargs sd '@pluto/' '@acme/'
echo "$files" | xargs sd 'XSRF-PLUTO' 'XSRF-ACME'
echo "$files" | xargs sd 'Pluto' 'Acme'
echo "$files" | xargs sd 'pluto' 'acme'
```

Read through the result before moving on. Prose in `README.md` and `AGENTS.md` usually
needs rewriting by hand rather than a word swap, and `assets/pluto.png` plus
`libs/app-assets/assets/brand/pluto.png` need the user's own logo.

## 4. Reconcile and check

```shell
just sync      # moon sync, pnpm install, sorted paths
just format
just lint
just test
moon run acme:build
```

`rg -i pluto` should now only list what was left on purpose (environment files, history
in the changelog). Start `just dev` and open https://localhost:4200 to see the new name.

## Remove a demo feature

1. Delete its route from `apps/<app>/src/app/app.routes.ts`.
2. Remove `feature-<name>` from `dependsOn` in `apps/<app>/moon.yml`.
3. Delete `libs/feature-<name>`.
4. Delete its keys (`feature.<name>.*`, `route.<name>`) from every locale file.
5. `just sync`, then the checks above.

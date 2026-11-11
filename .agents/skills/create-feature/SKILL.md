---
name: create-feature
description: >-
  Creates a new routed feature (a page or section) as a feature library: generates it,
  mounts it in the app's routes and main menu, and adds its translations. Use when asked
  to add a page, screen, view, section or feature.
---

# Create a feature

A feature is a library under `libs/feature-<name>` with its own routes. An app mounts it
with `loadChildren`, so it loads lazily.

## 1. Generate it

The name is kebab-case and becomes the folder, the moon id and the import alias.

```shell
moon generate feature -- --name invoices --desc "Lists and filters invoices"
```

This creates `libs/feature-invoices` with:

- `src/invoices-routes.ts`: one route, `title: 'route.invoices'`, `menu: {}`
- `src/invoices.component.{ts,html}`: the page, class `InvoicesFeature`
- `moon.yml` depending on `types` and `ui-helm`, `package.json` as `@pluto-feature/invoices`

## 2. Mount it

Add it to the app's `dependsOn` in `apps/pluto/moon.yml`:

```yaml
dependsOn:
  - feature-invoices
```

Add the route as a child of the layout route in `apps/pluto/src/app/app.routes.ts`:

```ts
{
	path: 'invoices',
	loadChildren: () => import('@pluto-feature/invoices/invoices-routes'),
},
```

`menu: {}` in the feature's routes puts it into the main menu. Set `menu: { priority: n }`
to order it, or remove `menu` to keep it out.

## 3. Translate the title

The route title and the menu label are the key `route.invoices`. Add it to every file in
`libs/app-i18n/locales/`, keeping keys sorted (see the `add-translation` skill):

```json
"route": { "invoices": "Invoices" }
```

## 4. Sync and check

```shell
just sync
just format
just lint
moon run pluto:build
```

The build lists an `invoices-component` chunk. Open https://localhost:4200/pluto/invoices
with `just dev` to see it.

## Building the page

- UI comes from spartan/ui Helm (`add-ui-component` skill), texts from transloco keys
  under `feature.invoices.*`, data through `httpResource` (`fetch-data` skill).
- Types go in `src/models/<thing>.ts`, helpers in a domain file next to the feature
  (`src/invoices/filter.ts`), never inside the component file.
- Child components live in `src/components/<name>/<name>.component.{ts,html}`.
- A feature component injects what it needs itself. Presentational children take
  signal inputs.
- Do not set `changeDetection`, OnPush is the default.

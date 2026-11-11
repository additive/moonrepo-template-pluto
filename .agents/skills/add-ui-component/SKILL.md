---
name: add-ui-component
description: >-
  Adds a spartan/ui Helm component (dialog, select, table, tooltip, …) to the vendored
  libs/ui-helm library and uses it in a page. Use when a UI needs a component that is not
  in libs/ui-helm yet, or when asked how to use buttons, cards, badges or other UI
  building blocks.
---

# Add a UI component

UI building blocks come from [spartan/ui](https://spartan.ng): headless Brain primitives
from npm (`@spartan-ng/brain`) and styled Helm components, generated into `libs/ui-helm`
and imported as `@pluto/helm/<name>`.

## 1. Check what exists

```shell
ls libs/ui-helm/src
```

If the component is there, skip to step 4. Before generating, read the component's page
on https://spartan.ng/components to see its parts and examples.

## 2. Generate it

```shell
pnpm ng g @spartan-ng/cli:ui dialog
```

The generator writes `libs/ui-helm/src/dialog/` and adds `@pluto/helm/dialog` to the
`paths` in `tsconfig.base.json`. It also installs what the component needs.

Then check `git status`:

- **Root barrel.** Create `libs/ui-helm/src/dialog/index.ts` with
  `export * from './src'`. The `@pluto/helm/*` alias resolves to the folder, and this file
  makes the folder importable.
- **package.json.** If the generator added `tailwind-merge` again, remove it. Class merging
  goes through `cnfast` (see the comment in `utils/src/lib/hlm.ts`).
- **Icons.** Helm components import Lucide icons from `@ng-icons/lucide`, which is
  installed, so nothing to do.

## 3. Format

```shell
just format
```

The generator writes semicolons and its own wrapping. oxfmt brings it in line.

Do not edit the generated files to restyle them. Customize in the consumer with classes.
When an edit is unavoidable, leave a comment saying why it differs from upstream, so it
survives the next regeneration.

## 4. Use it

Make sure the consuming project has `ui-helm` in its `moon.yml` `dependsOn` (run
`just sync` after adding it). Import each class by name, never the `Hlm*Imports` array, so
the imports show what the template uses:

```ts
import { HlmButton } from '@pluto/helm/button'
import { HlmCard, HlmCardContent, HlmCardHeader, HlmCardTitle } from '@pluto/helm/card'

@Component({
	imports: [HlmButton, HlmCard, HlmCardHeader, HlmCardTitle, HlmCardContent],
})
```

```html
<section hlmCard>
  <div hlmCardHeader>
    <h2 hlmCardTitle>{{ "feature.invoices.title" | transloco }}</h2>
  </div>
  <div hlmCardContent>
    <button hlmBtn variant="outline">{{ "feature.invoices.save" | transloco }}</button>
  </div>
</section>
```

## Styling rules

- Semantic tokens only: `bg-primary`, `text-muted-foreground`, `border-border`,
  `text-destructive`. Never raw palette colors like `bg-slate-800`. The tokens follow the
  light and dark theme in `libs/app-theme/tailwind.css`.
- Use the component's `variant` and `size` inputs before adding classes.
- No margin on a reusable component's host. The parent places it.
- Icons: `<ng-icon name="lucideX" />` with `NgIcon` in `imports` and
  `provideIcons({ lucideX })` in the component's `providers`.

## Check

```shell
just lint
moon run pluto:build
```

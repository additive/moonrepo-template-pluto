---
name: add-translation
description: >-
  Adds or changes user-facing text with transloco: where a key goes, how it is named, how
  templates and TypeScript read it, and how to add a language. Use whenever a component
  shows text, a route gets a title, or a string needs translating.
---

# Add a translation

Every string a user sees is a transloco key. English is the fallback, German ships
alongside it.

## Where keys live

`libs/app-i18n/locales/<lang>.json`, one file per language, nested and sorted
alphabetically at every level. Every file has exactly the same keys.

| Source                       | Key                                      |
| ---------------------------- | ---------------------------------------- |
| `libs/feature-<x>`           | `feature.<x>.<slug>`                     |
| `libs/app-layout`            | `layout.<component>.<slug>`              |
| `libs/app-<x>` (other)       | `app.<x>.<slug>`                         |
| `libs/ui-<x>`                | `ui.<x>.<component>.<slug>`              |
| route `title` and menu label | `route.<path>`                           |
| words used everywhere        | root level: `cancel`, `close`, `save`, … |

Slugs are kebab-case. Group by section when a page has several (`feature.example.posts.title`).
Check for an existing root-level word before adding `feature.x.cancel`.

## Add the key

Add it to **every** locale file, at the same path, in sorted position:

```json
// en.json
"feature": { "invoices": { "empty": "No invoices yet." } }
// de.json
"feature": { "invoices": { "empty": "Noch keine Rechnungen." } }
```

## Use it

**Template.** Add `TranslocoPipe` to the component's `imports`:

```html
<p>{{ "feature.invoices.empty" | transloco }}</p>
<p>{{ "feature.invoices.count" | transloco: { count: total() } }}</p>
<button [attr.aria-label]="'feature.invoices.delete' | transloco">…</button>
```

A static attribute becomes a binding, as with `aria-label` above.

**TypeScript in a class.** `translateSignal('key')` from `@jsverse/transloco` stays
reactive when the language changes.

**TypeScript elsewhere** (a function called per user action): `translate('key')`.

**Never at module scope.** A top-level `const LABELS = { a: translate('…') }` runs before
the locale file is loaded. Keep the key in the constant and translate where it renders.

**Route titles** are keys: `title: 'route.invoices'`. `TranslatedTitleStrategy` turns them
into the document title. Menu labels are the same key, piped through `transloco` where the
menu renders.

## Rules

- Placeholders are `{{name}}`. There are no ICU plurals: phrase around them or use two keys.
- Never pipe backend or user data through `transloco`. A value that happens to match a key
  would be replaced.
- An input that takes a key is named for it (`labelKey`, not `label`) and says so in its
  doc comment.
- Do not translate log messages, thrown developer errors, code identifiers or mock data.
- Brand names keep the same value in every language but still get a key.

## Add a language

1. Add it to `Language` and `languageNames` in `libs/app-i18n/src/language.ts`.
2. Copy `en.json` to `<lang>.json` and translate every value.
3. The layout's language switch toggles between two languages. With a third, replace it
   with a select over `languageNames`.

## Check

```shell
moon run app-i18n:lint   # valid JSON, no duplicates, same keys in every file
```

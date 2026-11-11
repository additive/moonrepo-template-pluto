---
name: fetch-data
description: >-
  Loads and sends data over HTTP in a feature: httpResource for reads, a service for
  writes, typed models, and loading, empty and error states in the template. Use when a
  page shows data from an API, submits a form, or when asked about HTTP, REST or
  fetching.
---

# Fetch data

`libs/feature-example` is the working reference for everything below.

## 1. Type the data

Put the API's shape in `src/models/<thing>.ts` of the feature (or a shared library when
several features use it):

```ts
/** An invoice as the billing API returns it. */
export type Invoice = {
  id: number
  number: string
  total: number
  paidAt: string | null
}
```

## 2. Read with httpResource

`httpResource` fetches when the component is created and again whenever a signal it reads
changes. Returning `undefined` skips the request.

```ts
import { httpResource } from '@angular/common/http'

export class InvoicesFeature {
  protected readonly page = signal(1)

  protected readonly invoices = httpResource<Invoice[]>(() => ({
    url: '/api/invoices',
    params: { page: this.page() },
  }))

  protected readonly selectedId = signal<number | undefined>(undefined)

  protected readonly selected = httpResource<Invoice>(() => {
    const id = this.selectedId()
    return id ? `/api/invoices/${id}` : undefined
  })
}
```

Use `invoices.reload()` to refetch, for example after a write.

## 3. Show every state

```html
@if (invoices.isLoading()) {
<hlm-skeleton class="h-16 w-full" />
} @else if (invoices.error()) {
<p class="text-destructive">{{ "feature.invoices.error" | transloco }}</p>
} @else if (invoices.value()?.length === 0) {
<p class="text-muted-foreground">{{ "feature.invoices.empty" | transloco }}</p>
} @else if (invoices.hasValue()) { @for (invoice of invoices.value(); track invoice.id) { … }
}
```

Hoist conditions that grow beyond one call into a `computed()` instead of nesting
ternaries in the template.

## 4. Write through a service

Writes (create, update, delete) are actions, not resources. Put them in a service next to
the feature, `src/invoices.service.ts`:

```ts
/** Saves and deletes invoices for the invoices feature. */
@Injectable({ providedIn: 'root' })
export class InvoicesService {
  private readonly http = inject(HttpClient)

  save(invoice: Invoice): Observable<Invoice> {
    return this.http.put<Invoice>(`/api/invoices/${invoice.id}`, invoice)
  }
}
```

Call it from the component, then `reload()` the resource that shows the data.

## What is already set up

`provideHttp()` in `libs/app-http` applies to every request:

- **Log interceptor:** logs each request to the console, outside production.
- **Error interceptor:** logs failed responses and rethrows them as an `Error` with the
  URL in its message, the original in `cause`.
- **Timeout interceptor:** cancels a request after 20 seconds. Override it per request
  with the `HTTP_TIMEOUT` context token from `@pluto/http/timeout`.
- **XSRF:** sends the cookie back as a header for state-changing requests.

Add cross-cutting behavior (auth headers, retries) as an interceptor in `libs/app-http`,
not in a feature.

## Mocking an API that does not exist yet

Keep the shape the real API will have. Serve mock data from the service as an Observable
(`of(MOCK_INVOICES)`), with the data in `src/data/`, so the feature keeps the same service
once the API exists.

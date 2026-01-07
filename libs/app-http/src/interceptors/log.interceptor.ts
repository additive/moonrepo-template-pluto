import type { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http'
import { inject } from '@angular/core'
import { tap } from 'rxjs'

import { APP_ENVIRONMENT } from '@pluto/environment'

import { REQUEST_ID } from '../request-id'

export const logInterceptor: HttpInterceptorFn = (
	request: HttpRequest<unknown>,
	next: HttpHandlerFn,
) => {
	const environment = inject(APP_ENVIRONMENT)

	if (environment.production) {
		return next(request)
	}

	const id = request.context.get(REQUEST_ID)
	const name = `[${request.method}] (${id})`

	console.debug('[HTTP]', `${name} Start`, request.url)

	return next(request).pipe(
		tap({
			next: (event) => {
				console.debug('[HTTP]', `${name} Event`, event)
			},
			complete: () => {
				console.debug('[HTTP]', `${name} Done 🏁`)
			},
		}),
	)
}

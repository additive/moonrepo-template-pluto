import type { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http'

import { HTTP_TIMEOUT } from '../timeout'

export const timeoutInterceptor: HttpInterceptorFn = (
	request: HttpRequest<unknown>,
	next: HttpHandlerFn,
) => {
	const timeout = request.context.get(HTTP_TIMEOUT)

	const clone = request.clone({ timeout })

	return next(clone)
}

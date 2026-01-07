import type {
	HttpErrorResponse,
	HttpHandlerFn,
	HttpInterceptorFn,
	HttpRequest,
} from '@angular/common/http'
import { catchError, TimeoutError, throwError } from 'rxjs'

export const errorInterceptor: HttpInterceptorFn = (
	request: HttpRequest<unknown>,
	next: HttpHandlerFn,
) => {
	return next(request).pipe(
		catchError((response: HttpErrorResponse) => {
			if (response instanceof TimeoutError) {
				console.error('[HTTP]', response.message, response)
				return throwError(() => response)
			}

			/**
			 * Basic errors are just wrapped for better understanding.
			 */

			const url = response.url ?? request.urlWithParams
			let errorMessage: string = response.message
			let errorObject: Error = new Error(errorMessage)

			if (response.error instanceof Error) {
				errorMessage = `${response.error.message} - ${url}`
				errorObject = response.error
			}

			console.error('[HTTP]', errorMessage, errorObject)

			return throwError(() => new Error(errorMessage, { cause: errorObject }))
		}),
	)
}

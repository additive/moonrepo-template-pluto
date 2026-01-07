import type { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http'

export type HttpOptions = {
	headers?: HttpHeaders | Record<string, string | string[]>
	context?: HttpContext
	params?:
		| HttpParams
		| Record<string, string | number | boolean | readonly (string | number | boolean)[]>
	withCredentials?: boolean
	credentials?: RequestCredentials
	keepalive?: boolean
	priority?: RequestPriority
	cache?: RequestCache
	mode?: RequestMode
	timeout?: number
}

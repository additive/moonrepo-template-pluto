import {
	provideHttpClient,
	withFetch,
	withInterceptors,
	withXsrfConfiguration,
} from '@angular/common/http'
import type { EnvironmentProviders } from '@angular/core'

import { errorInterceptor } from './interceptors/error.interceptor'
import { logInterceptor } from './interceptors/log.interceptor'
import { timeoutInterceptor } from './interceptors/timeout.interceptor'

export function provideHttp(): EnvironmentProviders {
	return provideHttpClient(
		withFetch(),
		withXsrfConfiguration({
			cookieName: 'XSRF-PLUTO',
			headerName: 'X-XSRF-PLUTO',
		}),
		withInterceptors([logInterceptor, errorInterceptor, timeoutInterceptor]),
	)
}

import { HttpContextToken } from '@angular/common/http'

/**
 * Http request timeout.
 */
export const HTTP_TIMEOUT = new HttpContextToken<number>(() => 20_000)

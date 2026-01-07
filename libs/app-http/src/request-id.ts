import { HttpContextToken } from '@angular/common/http'
import { nanoid } from 'nanoid'

/**
 * Unique request ID of a request.
 */
export const REQUEST_ID = new HttpContextToken<string>(() => nanoid(6))

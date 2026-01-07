import { InjectionToken } from '@angular/core'

import type { BaseEnvironment } from './interface'

export const APP_ENVIRONMENT = new InjectionToken<BaseEnvironment>('Application environment')

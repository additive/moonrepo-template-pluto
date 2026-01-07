import { InjectionToken } from '@angular/core'
import type { IconLookup } from '@fortawesome/angular-fontawesome'
import { BehaviorSubject } from 'rxjs'

export const ICONS = new InjectionToken<BehaviorSubject<IconLookup[]>>('All icons', {
	providedIn: 'root',
	factory: () => new BehaviorSubject<IconLookup[]>([]),
})

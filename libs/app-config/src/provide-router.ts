import type { EnvironmentProviders, Provider } from '@angular/core'
import {
	provideRouter,
	type Routes,
	withComponentInputBinding,
	withRouterConfig,
} from '@angular/router'
import { provideRouterMenus } from 'angular-router-menus'

export const provideAppRouter = (routes: Routes): (EnvironmentProviders | Provider)[] => {
	return [
		provideRouter(
			routes,
			withComponentInputBinding(),
			withRouterConfig({
				paramsInheritanceStrategy: 'always',
			}),
		),
		provideRouterMenus(routes, ['main'], {
			defaultMenu: 'main',
		}),
	]
}

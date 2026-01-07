import type { EnvironmentProviders, Provider } from '@angular/core'
import {
	NoPreloading,
	provideRouter,
	type Routes,
	withComponentInputBinding,
	withPreloading,
	withRouterConfig,
} from '@angular/router'
import { provideRouterMenus } from 'angular-router-menus'

export const provideAppRouter = (routes: Routes): (EnvironmentProviders | Provider)[] => {
	return [
		provideRouter(
			routes,
			withComponentInputBinding(),
			withPreloading(NoPreloading),
			withRouterConfig({
				paramsInheritanceStrategy: 'always',
			}),
		),
		provideRouterMenus(routes, ['main'], {
			defaultMenu: 'main',
		}),
	]
}

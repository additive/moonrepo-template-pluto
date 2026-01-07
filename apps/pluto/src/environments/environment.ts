import type { BaseEnvironment } from '@pluto/environment/interface'

import { environment as productionEnvironment } from './environment.prod'

export const environment: BaseEnvironment = {
	...productionEnvironment,
	production: false,
}

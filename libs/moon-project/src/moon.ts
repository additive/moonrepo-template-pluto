import { type } from 'arktype'
import fs from 'node:fs'
import path from 'node:path'
import { parse as yamlParse } from 'yaml'

import { MoonConfig } from './schemas'

export function getMoonConfig(projectRoot: string) {
	const contents = fs.readFileSync(path.resolve(projectRoot, 'moon.yml'), 'utf8')
	const moonObject = yamlParse(contents) as unknown
	const config = MoonConfig(moonObject)
	if (config instanceof type.errors) {
		throw new TypeError(config.summary)
	}
	return config
}

/**
 * Fails when the locale files in a directory do not share the same keys, so no language
 * silently falls back for a string another one translates.
 *
 * Usage: `node scripts/locale-parity-check.mts <dir>`
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

type Tree = { [key: string]: string | Tree }

function flatten(tree: Tree, prefix = ''): string[] {
	return Object.entries(tree).flatMap(([key, value]) => {
		const path = prefix ? `${prefix}.${key}` : key
		return typeof value === 'string' ? [path] : flatten(value, path)
	})
}

const dir = process.argv[2]
if (!dir) {
	throw new Error('Usage: locale-parity-check.mts <dir>')
}

const files = readdirSync(dir).filter((file) => file.endsWith('.json'))
const keys = new Map(
	files.map((file) => {
		// oxlint-disable-next-line typescript/no-unsafe-type-assertion -- a locale file is a nested string map
		const tree = JSON.parse(readFileSync(join(dir, file), 'utf8')) as Tree
		return [file, new Set(flatten(tree))]
	}),
)
const all = new Set([...keys.values()].flatMap((set) => Array.from(set)))

let failed = false
for (const [file, set] of keys) {
	const missing = [...all].filter((key) => !set.has(key))
	if (missing.length > 0) {
		failed = true
		process.stderr.write(`${join(dir, file)} is missing:\n  ${missing.join('\n  ')}\n`)
	}
}
process.exitCode = failed ? 1 : 0

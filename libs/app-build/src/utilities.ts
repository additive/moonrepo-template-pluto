import { execSync } from 'node:child_process'
import fs from 'node:fs'
import process from 'node:process'
import type { PackageJson } from 'type-fest'

/**
 * Get environment name.
 */
export function getEnvironment(): BUILD_ENV {
	if (!process.env.NODE_ENV) {
		console.warn('[WARN] No environment defined, falling back to development!')
		return 'development'
	}
	return process.env.NODE_ENV
}

/**
 * Get project version.
 */
export function getVersion(): string {
	const fileContents = fs.readFileSync('package.json').toString('utf8')
	const package_ = JSON.parse(fileContents) as PackageJson
	return package_.version ?? '0.0.0'
}

/**
 * Get project git commit hash.
 */
export function getHash(): string {
	try {
		return execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim()
	} catch {
		if (!process.env.CI_COMMIT_SHORT_SHA) {
			throw new Error('Could not select commit sha')
		}
		return process.env.CI_COMMIT_SHORT_SHA
	}
}

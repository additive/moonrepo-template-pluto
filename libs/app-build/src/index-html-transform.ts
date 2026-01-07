/** biome-ignore-all lint/complexity/noExcessiveLinesPerFunction: purpose */

import process from 'node:process'
import { minify } from 'html-minifier-terser'

import { getMoonConfig } from '@pluto/moon-project/moon'

export default function indexTransformer(compiledHtml = '') {
	let html = compiledHtml

	const { NODE_ENV, NONCE } = process.env
	const isProduction = NODE_ENV === 'production'
	const moonProject = getMoonConfig('./').project

	if (!NONCE) {
		throw new Error('Nonce not defined!')
	}

	html = html.replaceAll('{nonce}', NONCE)
	html = html.replaceAll('{name}', moonProject.name)
	html = html.replaceAll('{description}', moonProject.description)

	// CSP configuration - kept loose for this example repository
	// Tighten these directives for production applications
	const csp = [
		"default-src 'self'",
		"connect-src 'self' blob: data: https:",
		"frame-src 'self' data:",
		"style-src 'self' 'unsafe-inline'",
		"style-src-elem 'self' 'unsafe-inline'",
		"script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval'",
		"script-src-elem 'self' 'unsafe-inline'",
		"img-src 'self' data: blob: https:",
		"font-src 'self' data:",
		"worker-src 'self' blob:",
	]
	if (isProduction) {
		csp.push('upgrade-insecure-requests')
	}
	html = html.replaceAll('{csp}', csp.join(';'))

	return minify(html, {
		removeComments: true,
		collapseWhitespace: true,
		collapseInlineTagWhitespace: true,
		collapseBooleanAttributes: true,
		decodeEntities: true,
		minifyCSS: true,
		minifyJS: true,
	})
}

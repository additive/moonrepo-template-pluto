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

	const csp = [
		"default-src 'self'",
		`connect-src 'self' blob: data:`,
		"frame-src 'self' * data:",
		"style-src 'self' 'unsafe-inline'",
		"style-src-elem 'self' 'unsafe-inline'",
		"script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval'",
		"script-src-elem 'self'",
		`img-src 'self' data: blob: *`,
		"font-src 'self' data:",
		"worker-src 'self' blob:",
	]
	if (isProduction) {
		csp.push(
			// 'trusted-types angular angular#bundler angular#unsafe-bypass',
			// "require-trusted-types-for 'script'",
			'upgrade-insecure-requests',
			'block-all-mixed-content',
		)
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

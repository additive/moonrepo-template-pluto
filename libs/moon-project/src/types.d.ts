/** biome-ignore-all lint/style/useConsistentTypeDefinitions: only interfaces can extend each other */

/**
 * Do not use directly, use `MOON_PROJECT` injection
 * token instead!
 */
declare const MOON_PROJECT_JSON: unknown

declare interface Window {
	/**
	 * Used for testing esbuild defined property.
	 *
	 * Do not use directly, use `MOON_PROJECT` injection
	 * token instead!
	 *
	 * @see {@link MOON_PROJECT_JSON}
	 */
	MOON_PROJECT_JSON: unknown
}

/** biome-ignore-all lint/style/useConsistentTypeDefinitions: only interfaces can extend each other */

declare global {
	// biome-ignore lint/style/noNamespace: no other way
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV?: NODE_ENV
			BUILD_ENV: typeof BUILD_ENV
			BUILD_DATE: typeof BUILD_DATE
			APP_VERSION: typeof APP_VERSION
			APP_HASH: typeof APP_HASH
			NONCE: typeof NONCE
		}
	}
}

export {}

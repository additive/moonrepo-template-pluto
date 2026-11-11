/** Every language the app ships. English is the fallback. */
export const Language = { English: 'en', German: 'de' } as const
export type Language = (typeof Language)[keyof typeof Language]

/** Each language's name in that language, so it reads right whatever the active one. */
export const languageNames = {
	[Language.English]: 'English',
	[Language.German]: 'Deutsch',
} as const satisfies Record<Language, string>

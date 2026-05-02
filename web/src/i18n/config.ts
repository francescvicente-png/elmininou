export const languages = {
	ca: 'Català',
	es: 'Castellano',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'ca';

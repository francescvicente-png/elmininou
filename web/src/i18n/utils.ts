import { ui, type UIKey } from './ui';
import { defaultLang, type Lang } from './config';

/**
 * Read the active language from a URL like /ca/serveis/ or /es/.
 * Falls back to the default language if no recognised prefix is present.
 */
export function getLangFromUrl(url: URL): Lang {
	const [, segment] = url.pathname.split('/');
	if (segment && segment in ui) {
		return segment as Lang;
	}
	return defaultLang;
}

/**
 * Curried translator. Looks up a UI string for the active language and
 * falls back to the default language entry if the key is missing.
 */
export function useTranslations(lang: Lang) {
	return function t(key: UIKey): string {
		return ui[lang][key] || ui[defaultLang][key];
	};
}

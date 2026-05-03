/**
 * Declarative mapping of every route to its sibling in the other language.
 *
 * - All entries use trailing slashes so they match Astro's static output
 *   (build.format: 'directory') and the URLs produced by the router.
 * - The mapping is the single source of truth for the language switcher
 *   and for any `siblingPath` prop passed to the BaseLayout.
 */
export const routeMap = {
	home: { ca: '/ca/', es: '/es/' },
	menu: { ca: '/ca/menu/', es: '/es/menu/' },
	gallery: { ca: '/ca/galeria/', es: '/es/galeria/' },
	contact: { ca: '/ca/contacte/', es: '/es/contacto/' },
	directions: { ca: '/ca/com-arribar/', es: '/es/como-llegar/' },
	faq: { ca: '/ca/faq/', es: '/es/faq/' },
	legalNotice: { ca: '/ca/avis-legal/', es: '/es/aviso-legal/' },
	privacyPolicy: {
		ca: '/ca/politica-privacitat/',
		es: '/es/politica-privacidad/',
	},
	cookiesPolicy: {
		ca: '/ca/politica-cookies/',
		es: '/es/politica-cookies/',
	},
	minigolf: { ca: '/ca/minigolf/', es: '/es/minigolf/' },
} as const;

export type RouteKey = keyof typeof routeMap;
export type RoutePair = (typeof routeMap)[RouteKey];

export function getRoutePair(key: RouteKey): RoutePair {
	return routeMap[key];
}

export function getSiblingRoute(currentPath: string): string | null {
	for (const pair of Object.values(routeMap)) {
		if (pair.ca === currentPath) return pair.es;
		if (pair.es === currentPath) return pair.ca;
	}
	return null;
}

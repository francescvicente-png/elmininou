/**
 * Minigolf data — single source of truth for highlights and pricing.
 *
 * Used by MinigolfSection (home) and /ca/minigolf/ + /es/minigolf/ pages.
 * The minigolf is the main commercial differentiator of El mini nou:
 * 18-hole course, free with a meal, €5/person walk-in.
 */

export interface MinigolfHighlight {
	id: string;
	/** Tabler icon name (without the tabler: prefix). */
	icon: string;
	title: { ca: string; es: string };
	description: { ca: string; es: string };
}

export interface MinigolfPricing {
	context: 'with-meal' | 'walk-in';
	label: { ca: string; es: string };
	/** 0 = free. */
	price: number;
	unit: { ca: string; es: string };
	note?: { ca: string; es: string };
}

export const minigolfHighlights: ReadonlyArray<MinigolfHighlight> = [
	{
		id: 'eighteen-holes',
		icon: 'flag',
		title: { ca: '18 forats', es: '18 hoyos' },
		description: {
			ca: 'Recorregut complet pensat per a tots els nivells, des de novells fins a jugadors amb experiència.',
			es: 'Recorrido completo pensado para todos los niveles, desde principiantes hasta jugadores con experiencia.',
		},
	},
	{
		id: 'family-friendly',
		icon: 'mood-kid',
		title: { ca: 'Per a tota la família', es: 'Para toda la familia' },
		description: {
			ca: 'Ambient distès, ideal per a venir amb nens i passar la tarda en grup sense pressa.',
			es: 'Ambiente relajado, ideal para venir con niños y pasar la tarde en grupo sin prisas.',
		},
	},
	{
		id: 'free-with-meal',
		icon: 'gift',
		title: { ca: 'Gratis si dines aquí', es: 'Gratis si comes aquí' },
		description: {
			ca: "Si menges al restaurant, el lloguer del material i l'accés al camp són completament gratuïts per a tot el grup.",
			es: 'Si comes en el restaurante, el alquiler del material y el acceso al campo son completamente gratuitos para todo el grupo.',
		},
	},
];

export const minigolfPricing: ReadonlyArray<MinigolfPricing> = [
	{
		context: 'with-meal',
		label: {
			ca: 'Si dines o sopes al restaurant',
			es: 'Si comes o cenas en el restaurante',
		},
		price: 0,
		unit: {
			ca: 'gratuït per a tot el grup',
			es: 'gratuito para todo el grupo',
		},
	},
	{
		context: 'walk-in',
		label: { ca: 'Si només jugues', es: 'Si solo juegas' },
		price: 5,
		unit: { ca: '€ per persona', es: '€ por persona' },
		note: {
			ca: 'Lloguer de pal i pilota inclòs.',
			es: 'Alquiler de palo y bola incluido.',
		},
	},
];

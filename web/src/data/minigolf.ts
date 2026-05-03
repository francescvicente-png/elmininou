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

/**
 * A headline number for the hero stat band (18 holes, 45-60 min, etc.).
 * Used by the redesigned minigolf page hero.
 */
export interface MinigolfStat {
	id: string;
	icon: string;
	value: string;
	label: { ca: string; es: string };
	sublabel?: { ca: string; es: string };
}

/**
 * A featured hole with placeholder image. Images live in /public/minigolf/.
 *
 * NOTE: hole images are AI-generated placeholders (nano-banana / Gemini)
 * meant to be replaced with real photos after the on-site session.
 * Difficulty is on a 1-3 scale (1 = easy / family, 3 = expert).
 */
export interface MinigolfHole {
	id: string;
	number: number;
	name: { ca: string; es: string };
	tagline: { ca: string; es: string };
	difficulty: 1 | 2 | 3;
	image: { src: string; alt: { ca: string; es: string } };
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

export const minigolfStats: ReadonlyArray<MinigolfStat> = [
	{
		id: 'holes',
		icon: 'flag',
		value: '18',
		label: { ca: 'forats', es: 'hoyos' },
		sublabel: { ca: 'recorregut complet', es: 'recorrido completo' },
	},
	{
		id: 'duration',
		icon: 'clock',
		value: '45–60',
		label: { ca: 'minuts', es: 'minutos' },
		sublabel: { ca: 'una partida sencera', es: 'una partida entera' },
	},
	{
		id: 'ages',
		icon: 'mood-kid',
		value: '2–99',
		label: { ca: 'anys', es: 'años' },
		sublabel: { ca: 'per a tota la família', es: 'para toda la familia' },
	},
	{
		id: 'free',
		icon: 'gift',
		value: '0 €',
		label: { ca: 'si dines aquí', es: 'si comes aquí' },
		sublabel: { ca: 'pal i pilota inclosos', es: 'palo y bola incluidos' },
	},
];

export const minigolfHoles: ReadonlyArray<MinigolfHole> = [
	{
		id: 'molino',
		number: 4,
		name: { ca: 'El molí', es: 'El molino' },
		tagline: {
			ca: 'Encerta el ritme de les pales i la pilota passa neta.',
			es: 'Acierta el ritmo de las aspas y la bola pasa limpia.',
		},
		difficulty: 1,
		image: {
			src: '/minigolf/hole-1.webp',
			alt: {
				ca: 'Forat amb un molí de fusta blanc i pales que giren a llum daurada.',
				es: 'Hoyo con un molino de madera blanco y aspas girando a luz dorada.',
			},
		},
	},
	{
		id: 'pont',
		number: 9,
		name: { ca: 'El pont', es: 'El puente' },
		tagline: {
			ca: 'Equilibri i punteria: la vora se la queda la pilota.',
			es: 'Equilibrio y puntería: el borde se queda la bola.',
		},
		difficulty: 2,
		image: {
			src: '/minigolf/hole-2.webp',
			alt: {
				ca: 'Forat amb una rampa corba i un pont de fusta sobre un riu pintat.',
				es: 'Hoyo con una rampa curva y un puente de madera sobre un río pintado.',
			},
		},
	},
	{
		id: 'cop',
		number: 14,
		name: { ca: 'El cop net', es: 'El golpe limpio' },
		tagline: {
			ca: 'Recta llarga: la fusta és teva, només cal fermesa.',
			es: 'Recta larga: la madera es tuya, solo hace falta firmeza.',
		},
		difficulty: 2,
		image: {
			src: '/minigolf/hole-3.webp',
			alt: {
				ca: 'Mà sostenint un pal de minigolf taronja a punt de copejar la pilota.',
				es: 'Mano sosteniendo un palo de minigolf naranja a punto de golpear la bola.',
			},
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

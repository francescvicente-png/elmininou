/**
 * Restaurant menu — source aligned with ../../docs/MENU_CA_SOURCE.md in the parent repo.
 * Prices in EUR where known; allergens called out textually per handoff accessibility rules.
 */
import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/config';
import { MENU_DISH_ILLUSTRATIONS } from './menu-illustrations';

export type ServiceCategoryKey =
	| 'starters'
	| 'grills'
	| 'pasta'
	| 'combos'
	| 'sandwiches-hot'
	| 'sandwiches-cold'
	| 'tapas'
	| 'drinks';

export const SERVICE_CATEGORY_ORDER: ReadonlyArray<ServiceCategoryKey> = [
	'starters',
	'grills',
	'pasta',
	'combos',
	'sandwiches-hot',
	'sandwiches-cold',
	'tapas',
	'drinks',
];

export interface Service {
	id: string;
	icon: string;
	duration: number;
	price: number | null;
	category: ServiceCategoryKey;
	featured?: boolean;
	pendingConfirmation?: boolean;
	/** Optional thumbnail for menu cards (featured dishes). */
	illustration?: ImageMetadata;
	name: Record<Lang, string>;
	description: Record<Lang, string>;
}

export const services: ReadonlyArray<Service> = [
	// --- Per començar ---
	{
		id: 'amanida-el-mini',
		icon: 'leaf',
		duration: 0,
		price: 11,
		category: 'starters',
		featured: true,
		name: { ca: 'Amanida «El mini»', es: 'Ensalada «El mini»' },
		description: {
			ca: 'Mesclum, poma, nous, gall d’indi, ceba, pastanaga, blat de moro, salsa rosa. Al·lèrgens (text): nous, ou.',
			es: 'Mezclum, manzana, nueces, pavo, cebolla, zanahoria, maíz, salsa rosa. Alérgenos (texto): nueces, huevo.',
		},
	},
	{
		id: 'amanida-codony',
		icon: 'leaf',
		duration: 0,
		price: 8.75,
		category: 'starters',
		name: { ca: 'Amanida de codony', es: 'Ensalada de membrillo' },
		description: {
			ca: 'Mesclum, avellanes, formatge fresc, codony, crostonets de pa. Al·lègens: llet; fruita seca/gluten segons impressió del local.',
			es: 'Mezclum, avellanas, queso fresco, membrillo, picatostes. Alérgenos: leche; frutos secos/gluten según carta impresa del local.',
		},
	},
	{
		id: 'amanida-tonyina',
		icon: 'fish',
		duration: 0,
		price: 9.5,
		category: 'starters',
		name: { ca: 'Amanida de tonyina', es: 'Ensalada de atún' },
		description: {
			ca: 'Tomaquet, ceba, olives negres, tonyina, orenga. Al·lègen: peix.',
			es: 'Tomate, cebolla, aceitunas negras, atún, orégano. Alérgeno: pescado.',
		},
	},
	{
		id: 'amanida-mixta',
		icon: 'leaf',
		duration: 0,
		price: 6.5,
		category: 'starters',
		name: { ca: 'Amanida mixta', es: 'Ensalada mixta' },
		description: {
			ca: 'Mesclum, ceba, tomàquet, pastanaga, blat de moro i olives negres.',
			es: 'Mezclum, cebolla, tomate, zanahoria, maíz y aceitunas negras.',
		},
	},
	{
		id: 'provolone-calent',
		icon: 'cup',
		duration: 0,
		price: 9.5,
		category: 'starters',
		name: { ca: 'Provolone calent', es: 'Provolone caliente' },
		description: {
			ca: 'Formatge provolone calent amb torradetes. Al·lègens: llet, gluten.',
			es: 'Queso provolone caliente con tostadas. Alérgenos: leche, gluten.',
		},
	},
	{
		id: 'tequenos',
		icon: 'meat',
		duration: 0,
		price: 6.5,
		category: 'starters',
		name: { ca: 'Tequeños', es: 'Tequeños' },
		description: {
			ca: 'Bastons de formatge amb massa de blat fregits (5 u.). Al·lègens: gluten, llet.',
			es: 'Palitos de queso con masa de trigo fritos (5 u.). Alérgenos: gluten, leche.',
		},
	},
	{
		id: 'empanades',
		icon: 'meat',
		duration: 0,
		price: 3.5,
		category: 'starters',
		name: { ca: 'Empanades', es: 'Empanadas' },
		description: {
			ca: 'Farcides de pollastre o vedella (1 u.; confirmar text amb el negoci). Al·lègen: gluten.',
			es: 'Rellenas de pollo o ternera (1 u.; confirming wording with venue). Alérgeno: gluten.',
		},
	},
	{
		id: 'matrimoni',
		icon: 'meat',
		duration: 0,
		price: 7.5,
		category: 'starters',
		name: { ca: 'Matrimoni', es: 'Matrimonio (embutidos)' },
		description: {
			ca: 'Xoriço crioll i botifarró.',
			es: 'Chorizo criollo y morcón / butifarra según elaboración.',
		},
	},
	{
		id: 'croquetes',
		icon: 'meat',
		duration: 0,
		price: 8.5,
		category: 'starters',
		name: { ca: 'Croquetes', es: 'Croquetas' },
		description: {
			ca: 'Pollastre o carn d’olla (variants). Al·lègens: llet, gluten.',
			es: 'Pollo o carnes de cocido (variantes). Alérgenos: leche, gluten.',
		},
	},
	{
		id: 'escalivada',
		icon: 'carrot',
		duration: 0,
		price: 7.5,
		category: 'starters',
		name: { ca: 'Escalivada', es: 'Escalivada' },
		description: {
			ca: 'Verdura escalivada típica.',
			es: 'Verduras asadas típicas.',
		},
	},
	{
		id: 'patates-fregides',
		icon: 'bowl',
		duration: 0,
		price: 7.5,
		category: 'starters',
		name: { ca: 'Patates fregides', es: 'Patatas fritas' },
		description: {
			ca: 'Porció de patates.',
			es: 'Ración de patatas.',
		},
	},
	{
		id: 'patates-braves',
		icon: 'flame',
		duration: 0,
		price: 7.5,
		category: 'starters',
		name: { ca: 'Patates braves', es: 'Patatas bravas' },
		description: {
			ca: 'Patates amb salsa brava.',
			es: 'Patatas con salsa brava.',
		},
	},
	{
		id: 'fingers-pollastre',
		icon: 'meat',
		duration: 0,
		price: 7,
		category: 'starters',
		name: { ca: 'Fingers de pollastre', es: 'Fingers de pollo' },
		description: {
			ca: 'Tires de pollastre arrebossades.',
			es: 'Tiras de pollo empanadas.',
		},
	},
	{
		id: 'pa-torrat',
		icon: 'bowl',
		duration: 0,
		price: 1.7,
		category: 'starters',
		name: { ca: 'Pa torrat', es: 'Pan tostado' },
		description: {
			ca: 'Rodanxes de pa torrat.',
			es: 'Rebanadas de pan tostado.',
		},
	},
	// --- Les brases (amb patates fregides) ---
	{
		id: 'entranya',
		icon: 'meat',
		duration: 0,
		price: 20.5,
		category: 'grills',
		featured: true,
		name: { ca: 'Entranya', es: 'Entraña' },
		description: {
			ca: 'A la brasa, acompanyat de patates fregides (text carta).',
			es: 'A la brasa, acompañado de patatas fritas (según carta).',
		},
	},
	{
		id: 'pollastre-quarter',
		icon: 'meat',
		duration: 0,
		price: 11,
		category: 'grills',
		name: { ca: 'Pollastre (1/4)', es: 'Pollo (1/4)' },
		description: {
			ca: 'Quarter de pollastre a la brasa amb patates fregides.',
			es: 'Cuarto de pollo a la brasa con patatas fritas.',
		},
	},
	{
		id: 'xai',
		icon: 'meat',
		duration: 0,
		price: 19,
		category: 'grills',
		name: { ca: 'Xai', es: 'Cordero' },
		description: {
			ca: 'Carn de xai a la brasa amb patates.',
			es: 'Cordero a la brasa con patatas.',
		},
	},
	{
		id: 'pop-pure',
		icon: 'fish',
		duration: 0,
		price: 21,
		category: 'grills',
		name: { ca: 'Pop amb puré', es: 'Pulpo con puré' },
		description: {
			ca: 'Pop amb puré de patates.',
			es: 'Pulpo con puré de patata.',
		},
	},
	{
		id: 'xurrasc',
		icon: 'meat',
		duration: 0,
		price: 17.5,
		category: 'grills',
		name: { ca: 'Xurrasco', es: 'Churrasco' },
		description: {
			ca: 'Costella / xurrasco a la brasa amb patates.',
			es: 'Churrasco / costilla a la brasa con patatas.',
		},
	},
	{
		id: 'cansalada',
		icon: 'meat',
		duration: 0,
		price: 9,
		category: 'grills',
		name: { ca: 'Cansalada', es: 'Panceta' },
		description: {
			ca: 'Cansalada a la brasa amb patates.',
			es: 'Panceta a la brasa con patatas.',
		},
	},
	// --- Les pastes ---
	{
		id: 'espaguetis',
		icon: 'bowl',
		duration: 0,
		price: 9.5,
		category: 'pasta',
		featured: true,
		name: { ca: 'Espaguetis', es: 'Espaguetis' },
		description: {
			ca: 'Salsa bolonyesa o pesto.',
			es: 'Salsa boloñesa o pesto.',
		},
	},
	{
		id: 'canelons',
		icon: 'bowl',
		duration: 0,
		price: null,
		category: 'pasta',
		pendingConfirmation: true,
		name: { ca: 'Canelons (carn d’olla)', es: 'Canelones (carnes)' },
		description: {
			ca: 'Preu pendent de confirmació amb el local (no llegible a la captura de la carta).',
			es: 'Precio pendiente de confirmar con el local (no legible en la captura de carta).',
		},
	},
	// --- Plats combinats ---
	{
		id: 'bogey',
		icon: 'receipt-euro',
		duration: 0,
		price: 11.5,
		category: 'combos',
		name: { ca: 'Bogey', es: 'Bogey' },
		description: {
			ca: 'Botifarra, ou ferrat i patates fregides. Al·lègen: ou.',
			es: 'Butifarra, huevo frito y patatas fritas. Alérgeno: huevo.',
		},
	},
	{
		id: 'bola-embocada',
		icon: 'receipt-euro',
		duration: 0,
		price: 10.5,
		category: 'combos',
		name: { ca: 'Bola embocada', es: 'Bola embocada' },
		description: {
			ca: 'Llom a la planxa, ou ferrat i patates.',
			es: 'Lomo a la plancha, huevo frito y patatas.',
		},
	},
	{
		id: 'chip',
		icon: 'receipt-euro',
		duration: 0,
		price: 10.5,
		category: 'combos',
		name: { ca: 'Chip', es: 'Chip' },
		description: {
			ca: 'Croquetes, ou ferrat i patates. Al·lègens: llet, gluten, ou.',
			es: 'Croquetas, huevo frito y patatas. Alérgenos: leche, gluten, huevo.',
		},
	},
	{
		id: 'milanga',
		icon: 'receipt-euro',
		duration: 0,
		price: 15.5,
		category: 'combos',
		name: { ca: 'Milanga', es: 'Milanesa' },
		description: {
			ca: 'Carn arrebossada (pollastre o vedella) i patates. Al·lègens: gluten, ou.',
			es: 'Carne empanada (pollo o ternera) y patatas. Alérgenos: gluten, huevo.',
		},
	},
	{
		id: 'napo',
		icon: 'receipt-euro',
		duration: 0,
		price: 17.5,
		category: 'combos',
		name: { ca: 'Napo', es: 'Napo' },
		description: {
			ca: 'Com la milanga + sofregit de tomàquet, ceba, pernil dolç, formatge i orenga. Al·lègens: ou, gluten, llet.',
			es: 'Como milanesa + tomate, cebolla, jamón york, queso y orégano. Alérgenos: huevo, gluten, leche.',
		},
	},
	{
		id: 'a-cavall',
		icon: 'receipt-euro',
		duration: 0,
		price: 17.9,
		category: 'combos',
		name: { ca: 'A cavall', es: 'A caballo' },
		description: {
			ca: 'Com la variant anterior + ou ferrat. Al·lègens: ou, gluten.',
			es: 'Como la variante anterior + huevo frito. Alérgenos: huevo, gluten.',
		},
	},
	{
		id: 'grand-slam',
		icon: 'receipt-euro',
		duration: 0,
		price: 13.5,
		category: 'combos',
		featured: true,
		name: { ca: 'Grand Slam', es: 'Grand Slam' },
		description: {
			ca: 'Hamburguesa de vedella, formatge, enciam, tomàquet i patates. Al·lègens: llet, gluten.',
			es: 'Hamburguesa de ternera, queso, lechuga, tomate y patatas. Alérgenos: leche, gluten.',
		},
	},
	{
		id: 'green',
		icon: 'receipt-euro',
		duration: 0,
		price: 13.5,
		category: 'combos',
		name: { ca: 'Green', es: 'Green' },
		description: {
			ca: 'Hamburguesa vegetal, escalivada i patates. Al·lègen: gluten.',
			es: 'Hamburguesa vegetal, escalivada y patatas. Alérgeno: gluten.',
		},
	},
	// --- Entrepans calents ---
	{
		id: 'sandwich-botifarra',
		icon: 'meat',
		duration: 0,
		price: 6.5,
		category: 'sandwiches-hot',
		featured: true,
		name: { ca: 'Entrepà de botifarra', es: 'Bocadillo de butifarra' },
		description: {
			ca: 'Servit amb pa torrat en pa de coca (cartell del local). Pot demanar canvi de guarnició (+1,50 €).',
			es: 'Servido con pan de coca tostado. Posible cambio de guarnición (+1,50 €).',
		},
	},
	{
		id: 'sandwich-llom',
		icon: 'meat',
		duration: 0,
		price: 6.5,
		category: 'sandwiches-hot',
		name: { ca: 'Entrepà de llom', es: 'Bocadillo de lomo' },
		description: {
			ca: 'Pa torrat en pa de coca; guarnició alternativa +1,50 €.',
			es: 'Pan tostado en coca; guarnición alternativa +1,50 €.',
		},
	},
	{
		id: 'sandwich-cansalada-hot',
		icon: 'meat',
		duration: 0,
		price: 5.5,
		category: 'sandwiches-hot',
		name: { ca: 'Entrepà de cansalada', es: 'Bocadillo de panceta' },
		description: {
			ca: 'Pa de coca torrat.',
			es: 'Coca tostada.',
		},
	},
	{
		id: 'sandwich-truita',
		icon: 'meat',
		duration: 0,
		price: 4.5,
		category: 'sandwiches-hot',
		name: { ca: 'Entrepà de truita', es: 'Bocadillo de tortilla' },
		description: {
			ca: 'Truita en pa de coca.',
			es: 'Tortilla en pan de coca.',
		},
	},
	{
		id: 'sandwich-bikini',
		icon: 'meat',
		duration: 0,
		price: 4.5,
		category: 'sandwiches-hot',
		name: { ca: 'Bikini', es: 'Bikini mixto' },
		description: {
			ca: 'Formatge i pernil dolç.', // typical bikini — adjust if venue differs
			es: 'Queso y jamón.',
		},
	},
	{
		id: 'sandwich-frankfurt',
		icon: 'meat',
		duration: 0,
		price: 4.5,
		category: 'sandwiches-hot',
		name: { ca: 'Frankfurt', es: 'Frankfurt' },
		description: {
			ca: 'Salsitxa típia en pa.',
			es: 'Salchicha típica en pan.',
		},
	},
	// --- Entrepans freds ---
	{
		id: 'sandwich-tonyina-fred',
		icon: 'meat',
		duration: 0,
		price: 7,
		category: 'sandwiches-cold',
		name: { ca: 'Entrepà de tonyina', es: 'Bocadillo de atún' },
		description: {
			ca: 'Tonyina.', // minimalist from source
			es: 'Atún.',
		},
	},
	{
		id: 'sandwich-formatge',
		icon: 'meat',
		duration: 0,
		price: 7,
		category: 'sandwiches-cold',
		name: { ca: 'Entrepà de formatge', es: 'Bocadillo de queso' },
		description: {
			ca: 'Formatges variats.', // vague - client can tighten
			es: 'Quesos.',
		},
	},
	{
		id: 'sandwich-fuet',
		icon: 'meat',
		duration: 0,
		price: 6,
		category: 'sandwiches-cold',
		name: { ca: 'Entrepà de fuet', es: 'Bocadillo de fuet' },
		description: {
			ca: 'Fuet sobre pa.',
			es: 'Fuet en pan.',
		},
	},
	{
		id: 'sandwich-pernil-dolç',
		icon: 'meat',
		duration: 0,
		price: 4.5,
		category: 'sandwiches-cold',
		name: { ca: 'Entrepà de pernil dolç', es: 'Bocadillo de jamón dulce' },
		description: {
			ca: 'Pernil dolç.',
			es: 'Jamón dulce/york.',
		},
	},
	// --- Tapeta / bar ---
	{
		id: 'tapas-olives',
		icon: 'bowl',
		duration: 0,
		price: 3.5,
		category: 'tapas',
		featured: true,
		name: { ca: 'Olives', es: 'Aceitunas' },
		description: {
			ca: 'Ració d’olives.',
			es: 'Ración de aceitunas.',
		},
	},
	{
		id: 'tapas-escopinyes',
		icon: 'fish',
		duration: 0,
		price: 7.8,
		category: 'tapas',
		name: { ca: 'Escopinyes', es: 'Berberechos' },
		description: {
			ca: 'Marisc rápid.',
			es: 'Ración rápida de mar.',
		},
	},
	{
		id: 'tapas-musclos',
		icon: 'fish',
		duration: 0,
		price: 4.5,
		category: 'tapas',
		name: { ca: 'Musclos escabetx', es: 'Mejillones en escabeche' },
		description: {
			ca: 'Musclos en vinagreta.', // simplifying
			es: 'Mejillones escabechados.',
		},
	},
	{
		id: 'tapas-braves',
		icon: 'flame',
		duration: 0,
		price: 7.5,
		category: 'tapas',
		name: { ca: 'Patates braves (tapeta)', es: 'Patatas bravas (tapa)' },
		description: {
			ca: 'Mateixa referència repetida a tapa ràpida — confirmar al local.', // QA note from source
			es: 'Misma referencia en carta rápida — confirmar.',
		},
	},
	{
		id: 'tapas-potato-chip',
		icon: 'bowl',
		duration: 0,
		price: 2,
		category: 'tapas',
		name: { ca: 'Patates chip', es: 'Patatas chip' },
		description: {
			ca: 'Bossa / porció de patates chip.',
			es: 'Patatas chip.',
		},
	},
	{
		id: 'tapas-tequenos',
		icon: 'meat',
		duration: 0,
		price: 6.5,
		category: 'tapas',
		name: { ca: 'Tequeños (5 u.)', es: 'Tequeños (5 u.)' },
		description: {
			ca: 'Com a carta principal.',
			es: 'Como en carta principal.',
		},
	},
	{
		id: 'tapas-empanades',
		icon: 'meat',
		duration: 0,
		price: 3.5,
		category: 'tapas',
		name: { ca: 'Empanades (1 u.)', es: 'Empanadas (1 u.)' },
		description: {
			ca: 'Com a carta principal.',
			es: 'Como en carta principal.',
		},
	},
	{
		id: 'tapas-croquetes-5',
		icon: 'meat',
		duration: 0,
		price: 8.5,
		category: 'tapas',
		name: { ca: 'Croquetes (5 u.)', es: 'Croquetas (5 u.)' },
		description: {
			ca: 'Porció de 5 croquetes.',
			es: 'Ración de 5 croquetas.',
		},
	},
	{
		id: 'tapas-fingers',
		icon: 'meat',
		duration: 0,
		price: 7,
		category: 'tapas',
		name: { ca: 'Fingers de pollastre', es: 'Fingers de pollo' },
		description: {
			ca: 'Com a carta principal.',
			es: 'Como en carta principal.',
		},
	},
	// --- Begudes ---
	{
		id: 'drink-aigua',
		icon: 'bottle',
		duration: 0,
		price: 2.5,
		category: 'drinks',
		name: { ca: 'Aigua', es: 'Agua' },
		description: {
			ca: 'Ampolla / servei segons carta.',
			es: 'Botella / servicio según carta.',
		},
	},
	{
		id: 'drink-aigua-gas',
		icon: 'bottle',
		duration: 0,
		price: 2.5,
		category: 'drinks',
		name: { ca: 'Aigua amb gas', es: 'Agua con gas' },
		description: {
			ca: 'Marca segons barra.',
			es: 'Marca según barra.',
		},
	},
	{
		id: 'drink-refresc',
		icon: 'bottle',
		duration: 0,
		price: 2.8,
		category: 'drinks',
		name: { ca: 'Refresc', es: 'Refresco' },
		description: {
			ca: 'Beguda gasosa.',
			es: 'Refresco.',
		},
	},
	{
		id: 'drink-copa-cervesa',
		icon: 'beer',
		duration: 0,
		price: 2.5,
		category: 'drinks',
		name: { ca: 'Copa cervesa', es: 'Copa cerveza' },
		description: {
			ca: 'Estrella / Túria segons disponibilitat del local.',
			es: 'Estrella / Turia según disponibilidad.',
		},
	},
	{
		id: 'drink-canya',
		icon: 'beer',
		duration: 0,
		price: 2.1,
		category: 'drinks',
		name: { ca: 'Canxa de cervesa', es: 'Caña de cerveza' },
		description: {
			ca: 'Marca segons barra.',
			es: 'Marca según barra.',
		},
	},
	{
		id: 'drink-freedamm-tostada',
		icon: 'beer',
		duration: 0,
		price: 2.8,
		category: 'drinks',
		name: { ca: 'Free Damm tostada', es: 'Free Damm tostada' },
		description: { ca: 'Cervesa sense alcohol.', es: 'Cerveza sin alcohol.' },
	},
	{
		id: 'drink-freedamm-lemon',
		icon: 'beer',
		duration: 0,
		price: 2.8,
		category: 'drinks',
		name: { ca: 'Free Damm lemon', es: 'Free Damm lemon' },
		description: { ca: 'Sense alcohol.', es: 'Sin alcohol.' },
	},
	{
		id: 'drink-damm-lemon',
		icon: 'beer',
		duration: 0,
		price: 2.8,
		category: 'drinks',
		name: { ca: 'Damm lemon', es: 'Damm lemon' },
		description: { ca: 'Beguda amb gas.', es: 'Bebida con gas.' },
	},
	{
		id: 'drink-freegluten',
		icon: 'beer',
		duration: 0,
		price: 2.8,
		category: 'drinks',
		name: { ca: 'Free gluten', es: 'Sin gluten' },
		description: {
			ca: 'Opció sense gluten (verificar etiqueta al local).',
			es: 'Opción sin gluten (verificar en local).',
		},
	},
	{
		id: 'drink-combinats',
		icon: 'cup',
		duration: 0,
		price: 8,
		category: 'drinks',
		name: { ca: 'Combinats', es: 'Combinados' },
		description: {
			ca: 'Còctels segons cartell de barra.',
			es: 'Cócteles según carta de barra.',
		},
	},
	{
		id: 'drink-vermut',
		icon: 'cup',
		duration: 0,
		price: 4.5,
		category: 'drinks',
		name: { ca: 'Vermut', es: 'Vermut' },
		description: {
			ca: 'Servei de vermut.',
			es: 'Copa de vermut.',
		},
	},
];

export function getServiceName(service: Service, lang: Lang): string {
	return service.name[lang];
}

export function getServiceDescription(service: Service, lang: Lang): string {
	return service.description[lang];
}

/**
 * Splits a dish description into ingredients + allergens parts.
 * Source descriptions follow the convention "<ingredients>. Al·lèrgens (text): <allergens>"
 * (CA) or "<ingredients>. Alérgenos (texto): <allergens>" (ES). Tolerates real-world
 * source typos: "Al·lègens", "Alèrgens", "Alérgeno", optional parenthetical, optional
 * trailing period.
 */
export interface SplitDescription {
	ingredients: string;
	allergens: string | null;
}
export function splitDishDescription(text: string): SplitDescription {
	// Match: "Al·lèrgens", "Al·lègens", "Alèrgens", "Al·lergens", "Alérgenos",
	// "Alérgeno", followed by optional "(text)"/"(texto)" and the colon.
	const re =
		/(?:Al[·.]?l?[èé]r?ge?n?s?|Al[èé]rgenos?)\s*(?:\([^)]*\))?\s*:\s*/i;
	const match = re.exec(text);
	if (!match) return { ingredients: text.trim(), allergens: null };
	const before = text.slice(0, match.index).trim().replace(/[.,;]+$/, '').trim();
	const after = text.slice(match.index + match[0].length).trim().replace(/\.$/, '').trim();
	return { ingredients: before, allergens: after.length ? after : null };
}

export function getFeaturedServices(): ReadonlyArray<Service> {
	return services.filter((s) => s.featured);
}

export interface ServiceGroup {
	category: ServiceCategoryKey;
	items: ReadonlyArray<Service>;
}

export function getServicesGrouped(): ReadonlyArray<ServiceGroup> {
	const byCategory = new Map<ServiceCategoryKey, Service[]>();
	for (const key of SERVICE_CATEGORY_ORDER) {
		byCategory.set(key, []);
	}
	for (const s of services) {
		byCategory.get(s.category)?.push(s);
	}
	const result: ServiceGroup[] = [];
	for (const category of SERVICE_CATEGORY_ORDER) {
		const items = byCategory.get(category);
		if (!items?.length) continue;
		const sorted = [...items]
			.sort((a, b) => {
				const af = a.featured ? 1 : 0;
				const bf = b.featured ? 1 : 0;
				if (af !== bf) return bf - af;
				return services.indexOf(a) - services.indexOf(b);
			})
			.map((service) => {
				const generated = MENU_DISH_ILLUSTRATIONS[service.id];
				return generated === undefined
					? service
					: { ...service, illustration: generated };
			});
		result.push({ category, items: sorted });
	}
	return result;
}

export function serviceCategoryAnchorId(category: ServiceCategoryKey): string {
	return `menu-cat-${category}`;
}

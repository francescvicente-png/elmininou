import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/config';
import { HOME_PAGE_CANVAS_COLOR } from '../config/home-page-canvas';
import type { PhotoLicense } from '../types/photo-license';

import homeHeroRestaurantBrasa from '../assets/images/generated/home-hero-restaurant-brasa.jpg';
import homeHeroRestaurantDiningWide from '../assets/images/generated/home-hero-restaurant-dining-wide.jpg';
import homeRestaurantHeroCard from '../assets/images/generated/home-restaurant-hero-card.jpg';
import galleryDishTapasBoard from '../assets/images/generated/gallery-dish-tapas-board.jpg';
import galleryDishBrasaMeat from '../assets/images/generated/gallery-dish-brasa-meat.jpg';
import galleryDishBocadillo from '../assets/images/generated/gallery-dish-bocadillo.jpg';
import galleryBarVertical from '../assets/images/generated/gallery-bar-vertical.jpg';
import previewRestaurantInterior from '../assets/images/generated/home-preview-restaurant-interior.jpg';
import previewDiningTable from '../assets/images/generated/home-preview-dining-table.jpg';
import previewGrillDetail from '../assets/images/generated/home-preview-grill-detail.jpg';

/**
 * Gallery + hero assets. AI-generated illustrative scenes (Gemini) for
 * El mini nou; replace with venue photography when available.
 */
export type GalleryCategoryId =
	| 'all'
	| 'space'
	| 'tools'
	| 'cuts'
	| 'color'
	| 'care';

export interface GalleryCategory {
	id: GalleryCategoryId;
	label: { ca: string; es: string };
}

export const galleryCategories: ReadonlyArray<GalleryCategory> = [
	{ id: 'all', label: { ca: 'Tot', es: 'Todo' } },
	{ id: 'space', label: { ca: 'El local', es: 'El local' } },
	{
		id: 'tools',
		label: { ca: 'Cuina i barra', es: 'Cocina y barra' },
	},
	{ id: 'cuts', label: { ca: 'Plats', es: 'Platos' } },
	{ id: 'color', label: { ca: 'Brasa', es: 'Brasa' } },
	{ id: 'care', label: { ca: 'Taules', es: 'Mesas' } },
];

export interface GalleryImage {
	id: string;
	src: ImageMetadata;
	photographer: string;
	unsplashUrl: string;
	alt: Record<Lang, string>;
	categories: ReadonlyArray<Exclude<GalleryCategoryId, 'all'>>;
	photoLicense: PhotoLicense;
}

export interface HeroImage extends GalleryImage {
	id: 'hero';
	credit?: Record<Lang, string>;
	objectPosition?: string;
	pageCanvasColor?: string;
}

export const heroImage: HeroImage = {
	id: 'hero',
	src: homeHeroRestaurantBrasa,
	photographer: '',
	unsplashUrl: '',
	photoLicense: 'ai-demo',
	alt: {
		ca: "Interior amb brasa i llum càlida — imatge il·lustrativa generada amb IA (Gemini), no és fotografia del local.",
		es: 'Interior con brasa y luz cálida — imagen ilustrativa generada con IA (Gemini), no es fotografía del local.',
	},
	categories: ['cuts', 'care'],
	objectPosition: '52% center',
	pageCanvasColor: HOME_PAGE_CANVAS_COLOR,
};

/**
 * Before/after comparators on the gallery page. Add or remove entries here.
 *
 * - **Demo row** (`beforeSrc` omitted): same photo twice with the slider’s
 *   CSS “before” treatment — no fake second file.
 * - **Real row**: set `beforeSrc` + `altBefore` (both languages) with the
 *   client’s actual pair.
 */
export interface GalleryBeforeAfterEntry {
	id: string;
	afterSrc: ImageMetadata;
	beforeSrc?: ImageMetadata;
	altAfter: Record<Lang, string>;
	altBefore?: Record<Lang, string>;
	aspectRatio?: string;
	title: Record<Lang, string>;
}

export const galleryBeforeAfterEntries: ReadonlyArray<GalleryBeforeAfterEntry> = [
	{
		id: 'dining-ambience',
		afterSrc: homeRestaurantHeroCard,
		altAfter: {
			ca: 'Ambient de menjador amb reflexos de brasa — il·lustració IA',
			es: 'Ambiente de comedor con reflejos de brasa — ilustración IA',
		},
		aspectRatio: '16/9',
		title: {
			ca: 'Ambient · taula',
			es: 'Ambiente · mesa',
		},
	},
	{
		id: 'tapas-board',
		afterSrc: galleryDishTapasBoard,
		altAfter: {
			ca: 'Taula de tapes sobre fusta — detall gastronòmic il·lustratiu (IA)',
			es: 'Tabla de tapas sobre madera — detalle gastronómico ilustrativo (IA)',
		},
		aspectRatio: '4/3',
		title: {
			ca: 'Tapes · composició',
			es: 'Tapas · composición',
		},
	},
	{
		id: 'brasa-plate',
		afterSrc: galleryDishBrasaMeat,
		altAfter: {
			ca: 'Plat de brasa amb carbó actiu — fum i llum lateral (IA)',
			es: 'Plato de brasa con carbón activo — humo y luz lateral (IA)',
		},
		aspectRatio: '4/3',
		title: {
			ca: 'Brasa · detall',
			es: 'Brasa · detalle',
		},
	},
	{
		id: 'bocadillo',
		afterSrc: galleryDishBocadillo,
		altAfter: {
			ca: 'Entrepà artesà sobre taulell — exemple de carta il·lustratiu (IA)',
			es: 'Bocadillo artesanal sobre barra — ejemplo de carta ilustrativo (IA)',
		},
		aspectRatio: '4/3',
		title: {
			ca: 'Entrepà · encaix',
			es: 'Bocadillo · encuadre',
		},
	},
];

export const postGalleryHeroImage: Pick<
	HeroImage,
	'src' | 'alt' | 'objectPosition' | 'photoLicense'
> = {
	src: homeHeroRestaurantDiningWide,
	photoLicense: 'ai-demo',
	alt: {
		ca: 'Sala de restaurant amb barra il·luminada — pla general il·lustratiu (IA, Gemini)',
		es: 'Sala de restaurante con barra iluminada — plano general ilustrativo (IA, Gemini)',
	},
	objectPosition: '48% center',
};

export const galleryImages: ReadonlyArray<GalleryImage> = [
	{
		id: 'gallery-dish-tapas',
		src: galleryDishTapasBoard,
		photographer: '',
		unsplashUrl: '',
		photoLicense: 'ai-demo',
		alt: {
			ca: "Selecció de tapes sobre fusta — imatge IA; no és el plat servit al local.",
			es: 'Selección de tapas sobre madera — imagen IA; no es el plato servido en el local.',
		},
		categories: ['color', 'cuts'],
	},
	{
		id: 'gallery-dish-brasa',
		src: galleryDishBrasaMeat,
		photographer: '',
		unsplashUrl: '',
		photoLicense: 'ai-demo',
		alt: {
			ca: 'Detall de brasa amb verdures rostides — imatge IA il·lustrativa.',
			es: 'Detalle de brasa con verduras asadas — imagen IA ilustrativa.',
		},
		categories: ['color', 'care'],
	},
	{
		id: 'gallery-dish-bocadillo',
		src: galleryDishBocadillo,
		photographer: '',
		unsplashUrl: '',
		photoLicense: 'ai-demo',
		alt: {
			ca: 'Entrepà i beguda en ambient de bar — demostració visual IA.',
			es: 'Bocadillo y bebida en ambiente de bar — demostración visual IA.',
		},
		categories: ['cuts', 'color'],
	},
	{
		id: 'preview-restaurant-interior',
		src: previewRestaurantInterior,
		photographer: '',
		unsplashUrl: '',
		photoLicense: 'ai-demo',
		alt: {
			ca: "Menjador il·lustratiu en estil mediterrani — IA (Gemini), no és El mini nou.",
			es: 'Comedor ilustrativo de estilo mediterráneo — IA (Gemini), no es El mini nou.',
		},
		categories: ['space'],
	},
	{
		id: 'preview-dining-table',
		src: previewDiningTable,
		photographer: '',
		unsplashUrl: '',
		photoLicense: 'ai-demo',
		alt: {
			ca: 'Mesa parada amb coberts i pa — ambient il·lustratiu IA.',
			es: 'Mesa puesta con cubiertos y pan — ambiente ilustrativo IA.',
		},
		categories: ['space', 'care'],
	},
	{
		id: 'preview-grill-detail',
		src: previewGrillDetail,
		photographer: '',
		unsplashUrl: '',
		photoLicense: 'ai-demo',
		alt: {
			ca: 'Graella amb brasa viva i fum suau — detall de cuina IA.',
			es: 'Parrilla con brasa viva y humo suave — detalle de cocina IA.',
		},
		categories: ['tools', 'color'],
	},
	{
		id: 'gallery-hero-card',
		src: homeRestaurantHeroCard,
		photographer: '',
		unsplashUrl: '',
		photoLicense: 'ai-demo',
		alt: {
			ca: 'Detall íntim de taula amb olis i reflexos de foc — IA.',
			es: 'Detalle íntimo de mesa con aceites y reflejos de fuego — IA.',
		},
		categories: ['space', 'cuts'],
	},
	{
		id: 'gallery-bar-vertical',
		src: galleryBarVertical,
		photographer: '',
		unsplashUrl: '',
		photoLicense: 'ai-demo',
		alt: {
			ca: 'Fons de barra amb ampollers i llum àmbar — fotografia vertical IA.',
			es: 'Fondo de barra con botelleros y luz ámbar — fotografía vertical IA.',
		},
		categories: ['care', 'color'],
	},
	{
		id: 'gallery-brasa-hero',
		src: homeHeroRestaurantBrasa,
		photographer: '',
		unsplashUrl: '',
		photoLicense: 'ai-demo',
		alt: {
			ca: 'Vista amplia de cuina oberta amb brasa — mateixa sessió IA que el hero.',
			es: 'Vista amplia de cocina abierta con brasa — misma sesión IA que el hero.',
		},
		categories: ['color', 'care'],
	},
	{
		id: 'gallery-dining-wide',
		src: homeHeroRestaurantDiningWide,
		photographer: '',
		unsplashUrl: '',
		photoLicense: 'ai-demo',
		alt: {
			ca: 'Pla general del menjador — continuació del relat visual IA.',
			es: 'Plano general del comedor — continuación del relato visual IA.',
		},
		categories: ['space'],
	},
	{
		id: 'gallery-dish-tapas-alt',
		src: galleryDishTapasBoard,
		photographer: '',
		unsplashUrl: '',
		photoLicense: 'ai-demo',
		alt: {
			ca: 'Encaix alternatiu: colors càlids de la mateixa sessió de tapes.',
			es: 'Encuadre alternativo: colores cálidos de la misma sesión de tapas.',
		},
		categories: ['cuts', 'care'],
	},
	{
		id: 'gallery-bar-vertical-alt',
		src: galleryBarVertical,
		photographer: '',
		unsplashUrl: '',
		photoLicense: 'ai-demo',
		alt: {
			ca: 'Vertical de barra: profunditat i glow sobre coure.',
			es: 'Vertical de barra: profundidad y brillo sobre cobre.',
		},
		categories: ['tools', 'care'],
	},
];

import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/config';
import { HOME_PAGE_CANVAS_COLOR } from '../config/home-page-canvas';
import type { PhotoLicense } from '../types/photo-license';

import heroModel from '../assets/images/demo/Modelo para web.png';
import heroModel2 from '../assets/images/demo/Modelo para web 2.png';
import postGalleryHeroAsset from '../assets/images/demo/modelo-para-web-hero-2.png';
import ejemploPelo1 from '../assets/images/demo/ejemplo-pelo-1.jpg';
import ejemploPelo2 from '../assets/images/demo/ejemplo-pelo-2.jpg';
import ejemploPelo3 from '../assets/images/demo/ejemplo-pelo-3.jpg';
import aiSalonInterior from '../assets/images/generated/home-preview-salon-interior.jpg';
import aiSalonChair from '../assets/images/generated/home-preview-salon-chair.png';
import aiSalonTools from '../assets/images/generated/home-preview-salon-tools.jpg';

/**
 * Gallery + hero assets. Demonstration images (some AI illustration) for
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
	src: heroModel,
	photographer: '',
	unsplashUrl: '',
	photoLicense: 'own',
	alt: {
		ca: "Imatge editorial de mostra per al web d'El mini nou (no fotografia final del local)",
		es: 'Imagen editorial de muestra para la web de El mini nou (no es la fotografía definitiva del local)',
	},
	categories: ['cuts', 'care'],
	objectPosition: '68% center',
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
		id: 'session-portrait',
		afterSrc: heroModel,
		altAfter: {
			ca: "Retrat editorial de la sessió fotogràfica per al web — resultat final",
			es: 'Retrato editorial de la sesión fotográfica para la web — resultado final',
		},
		aspectRatio: '16/9',
		title: {
			ca: 'Retrat · sessió',
			es: 'Retrato · sesión',
		},
	},
	{
		id: 'color-sample-1',
		afterSrc: ejemploPelo1,
		altAfter: {
			ca: 'Mostra de color i acabat en cabell — resultat',
			es: 'Muestra de color y acabado en pelo — resultado',
		},
		aspectRatio: '4/3',
		title: {
			ca: 'Color i acabat · mostra 1',
			es: 'Color y acabado · muestra 1',
		},
	},
	{
		id: 'color-sample-2',
		afterSrc: ejemploPelo2,
		altAfter: {
			ca: 'Detall de coloració i textura — resultat',
			es: 'Detalle de coloración y textura — resultado',
		},
		aspectRatio: '4/3',
		title: {
			ca: 'Detall · mostra 2',
			es: 'Detalle · muestra 2',
		},
	},
	{
		id: 'styling-sample-3',
		afterSrc: ejemploPelo3,
		altAfter: {
			ca: "Resultat d'estilisme i cura del cabell — final",
			es: 'Resultado de estilismo y cuidado del pelo — final',
		},
		aspectRatio: '4/3',
		title: {
			ca: 'Estilisme · mostra 3',
			es: 'Estilismo · muestra 3',
		},
	},
];

export const postGalleryHeroImage: Pick<
	HeroImage,
	'src' | 'alt' | 'objectPosition' | 'photoLicense'
> = {
	src: postGalleryHeroAsset,
	photoLicense: 'own',
	alt: {
		ca: 'Segona imatge de la sessió — pla amb més ambient i profunditat',
		es: 'Segunda imagen de la sesión — plano con más ambiente y profundidad',
	},
	objectPosition: '52% center',
};

export const galleryImages: ReadonlyArray<GalleryImage> = [
	{
		id: 'ejemplo-pelo-1',
		src: ejemploPelo1,
		photographer: '',
		unsplashUrl: '',
		photoLicense: 'own',
		alt: {
			ca: 'Imatge demostrativa (mostra) — substituïr per plat real de la carta.',
			es: 'Imagen demostrativa — sustituir por plato real de la carta.',
		},
		categories: ['color', 'cuts'],
	},
	{
		id: 'ejemplo-pelo-2',
		src: ejemploPelo2,
		photographer: '',
		unsplashUrl: '',
		photoLicense: 'own',
		alt: {
			ca: 'Detall de coloració i textura',
			es: 'Detalle de coloración y textura',
		},
		categories: ['color', 'care'],
	},
	{
		id: 'ejemplo-pelo-3',
		src: ejemploPelo3,
		photographer: '',
		unsplashUrl: '',
		photoLicense: 'own',
		alt: {
			ca: 'Imatge demostrativa editorial — reemplaçar per contingut real del local.',
			es: 'Imagen demostrativa editorial — reemplazar por contenido real del local.',
		},
		categories: ['cuts', 'color'],
	},
	{
		id: 'preview-salon-interior',
		src: aiSalonInterior,
		photographer: '',
		unsplashUrl: '',
		photoLicense: 'ai-demo',
		alt: {
			ca: "Interior de restaurant il·lustratiu — generat amb IA (Gemini), no és encara el local d'El mini nou.",
			es: "Interior de restaurante ilustrativo — imagen IA (Gemini), aún no es el local de El mini nou.",
		},
		categories: ['space'],
	},
	{
		id: 'preview-salon-station',
		src: aiSalonChair,
		photographer: '',
		unsplashUrl: '',
		photoLicense: 'ai-demo',
		alt: {
			ca: "Taula i servei en ambient de mostra — IA (Gemini), no és El mini nou.",
			es: "Mesa y servicio en ambiente de muestra — IA (Gemini), no es El mini nou.",
		},
		categories: ['space', 'care'],
	},
	{
		id: 'preview-salon-color-tools',
		src: aiSalonTools,
		photographer: '',
		unsplashUrl: '',
		photoLicense: 'ai-demo',
		alt: {
			ca: 'Detall gastronòmic il·lustratiu sobre fusta — IA (Gemini), no és el local real.',
			es: 'Detalle gastronómico ilustrativo sobre madera — IA (Gemini), no es el local real.',
		},
		categories: ['tools', 'color'],
	},
	{
		id: 'gallery-1',
		src: heroModel,
		photographer: '',
		unsplashUrl: '',
		photoLicense: 'own',
		alt: {
			ca: 'Pla general del retrat; contrast suau sobre fons neutre',
			es: 'Plano general del retrato; contraste suave sobre fondo neutro',
		},
		categories: ['space', 'cuts'],
	},
	{
		id: 'gallery-3',
		src: heroModel2,
		photographer: '',
		unsplashUrl: '',
		photoLicense: 'own',
		alt: {
			ca: 'Pla mig — detall de clàssic blanc i negre editorial',
			es: 'Plano medio — detalle en blanco y negro editorial',
		},
		categories: ['care', 'color'],
	},
	{
		id: 'gallery-4',
		src: heroModel,
		photographer: '',
		unsplashUrl: '',
		photoLicense: 'own',
		alt: {
			ca: 'Èmfasi en la llum sobre el cabell i el contorn del rostre',
			es: 'Énfasis en la luz sobre el pelo y el contorno del rostro',
		},
		categories: ['color', 'care'],
	},
	{
		id: 'gallery-5',
		src: heroModel2,
		photographer: '',
		unsplashUrl: '',
		photoLicense: 'own',
		alt: {
			ca: 'Composició vertical; espai negatiu per respirar el retrat',
			es: 'Composición vertical; espacio negativo que respira en el retrato',
		},
		categories: ['space', 'care'],
	},
	{
		id: 'gallery-6',
		src: heroModel,
		photographer: '',
		unsplashUrl: '',
		photoLicense: 'own',
		alt: {
			ca: 'Detall de volum i textura en escala de grisos',
			es: 'Detalle de volumen y textura en escala de grises',
		},
		categories: ['tools', 'care'],
	},
	{
		id: 'gallery-7',
		src: heroModel2,
		photographer: '',
		unsplashUrl: '',
		photoLicense: 'own',
		alt: {
			ca: 'Tancament de la seqüència — mateixa sessió, to editorial',
			es: 'Cierre de la secuencia — misma sesión, tono editorial',
		},
		categories: ['space', 'color'],
	},
];

/**
 * Home GalleryPreview tiles — illustrative dining-room ambience (AI-generated demo assets),
 * not photographs of El mini nou. See `src/assets/images/demo/attributions.json`.
 */
import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/config';
import type { PhotoLicense } from '../types/photo-license';

import previewSalonInterior from '../assets/images/generated/home-preview-salon-interior.jpg';
import previewSalonChair from '../assets/images/generated/home-preview-salon-chair.png';
import previewSalonTools from '../assets/images/generated/home-preview-salon-tools.jpg';

export interface HomeGalleryPreviewTile {
	id: string;
	src: ImageMetadata;
	photographer: string;
	unsplashUrl: string;
	photoLicense: PhotoLicense;
	alt: Record<Lang, string>;
}

/** Order: hero (large tile) → first satellite → second satellite. */
export const homeGalleryPreviewTiles: ReadonlyArray<HomeGalleryPreviewTile> = [
	{
		id: 'preview-salon-interior',
		src: previewSalonInterior,
		photographer: '',
		unsplashUrl: '',
		photoLicense: 'ai-demo',
		alt: {
			ca: "Ambient de menjador il·lustratiu (IA, Gemini): no fotografia del restaurant El mini nou.",
			es: "Ambiente de comedor ilustrativo (IA, Gemini): no es fotografía del restaurante El mini nou.",
		},
	},
	{
		id: 'preview-salon-station',
		src: previewSalonChair,
		photographer: '',
		unsplashUrl: '',
		photoLicense: 'ai-demo',
		alt: {
			ca: "Detall il·lustratiu de seient i zona de coberts (IA, Gemini); no és la sala real d’El mini nou.",
			es: "Detalle ilustrativo de asiento y mesa (IA, Gemini); no es la sala real de El mini nou.",
		},
	},
	{
		id: 'preview-salon-color-tools',
		src: previewSalonTools,
		photographer: '',
		unsplashUrl: '',
		photoLicense: 'ai-demo',
		alt: {
			ca: "Detall gastronòmic il·lustratiu sobre fusta — imatge IA (Gemini); no fotografia dels plats reals d’El mini nou.",
			es: "Detalle gastronómico ilustrativo sobre madera — imagen IA (Gemini); no fotografía de los platos reales de El mini nou.",
		},
	},
];

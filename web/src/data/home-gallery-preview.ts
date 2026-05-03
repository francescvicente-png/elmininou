/**
 * Home GalleryPreview tiles — AI-generated restaurant ambience (Gemini demo assets),
 * not photographs of El mini nou. See `src/assets/images/demo/attributions.json`.
 */
import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/config';
import type { PhotoLicense } from '../types/photo-license';

import previewRestaurantInterior from '../assets/images/generated/home-preview-restaurant-interior.jpg';
import previewDiningTable from '../assets/images/generated/home-preview-dining-table.jpg';
import previewGrillDetail from '../assets/images/generated/home-preview-grill-detail.jpg';

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
		id: 'preview-restaurant-interior',
		src: previewRestaurantInterior,
		photographer: '',
		unsplashUrl: '',
		photoLicense: 'ai-demo',
		alt: {
			ca: "Menjador il·lustratiu (IA, Gemini): no fotografia del restaurant El mini nou.",
			es: 'Comedor ilustrativo (IA, Gemini): no es fotografía del restaurante El mini nou.',
		},
	},
	{
		id: 'preview-dining-table',
		src: previewDiningTable,
		photographer: '',
		unsplashUrl: '',
		photoLicense: 'ai-demo',
		alt: {
			ca: "Taula parada il·lustrativa (IA, Gemini); no és la sala real d'El mini nou.",
			es: 'Mesa puesta ilustrativa (IA, Gemini); no es la sala real de El mini nou.',
		},
	},
	{
		id: 'preview-grill-detail',
		src: previewGrillDetail,
		photographer: '',
		unsplashUrl: '',
		photoLicense: 'ai-demo',
		alt: {
			ca: "Detall de graella amb brasa — imatge IA (Gemini); no fotografia dels fogons reals d’El mini nou.",
			es: 'Detalle de parrilla con brasa — imagen IA (Gemini); no fotografía de los fogones reales de El mini nou.',
		},
	},
];

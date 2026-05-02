/**
 * Three editorial differentiators on the home (Highlights section).
 */
import { googleReviews } from './business';

export type HighlightIcon =
	| 'star'
	| 'globe'
	| 'scissors'
	| 'award'
	| 'users'
	| 'heart'
	| 'baby'
	| 'sparkles';

export interface HighlightCounter {
	target: number;
	decimals: number;
}

export interface Highlight {
	iconKey: HighlightIcon;
	titleCa: string;
	titleEs: string;
	descriptionCa: string;
	descriptionEs: string;
	pendingConfirmation?: boolean;
	counter?: HighlightCounter;
}

const reviewCount = googleReviews.count;

export const highlights: ReadonlyArray<Highlight> = [
	{
		iconKey: 'sparkles',
		titleCa: 'Brases, carta i bar',
		titleEs: 'Brasas, carta y barra',
		descriptionCa:
			'De l’esmorzar al vespre: entrepans, tapes ràpides i plats de brasa amb patates (sempre segons carta del local).',
		descriptionEs:
			'Desayunos, tapas rápidas y platos de brasa con patatas (siempre según carta del local).',
	},
	{
		iconKey: 'users',
		titleCa: 'A L’Ametlla del Vallès',
		titleEs: 'En La Ametlla del Vallès',
		descriptionCa:
			'Local a peu de carrer a Jeroni de Moragas: truqueu o escriviu per dubtes d’horari o grups.',
		descriptionEs:
			'Local en calle Jeroni de Moragas: llamad o escribid para horarios o grupos.',
	},
	{
		iconKey: 'star',
		titleCa: '★ a Google',
		titleEs: '★ en Google',
		descriptionCa: `Mitjana amb ${reviewCount} ressenyes públiques (dada orientativa de la fitxa).`,
		descriptionEs: `Media con ${reviewCount} reseñas públicas (dato orientativo de la ficha).`,
		counter: {
			target: googleReviews.rating,
			decimals: 1,
		},
	},
];

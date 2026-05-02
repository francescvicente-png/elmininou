/**
 * Editorial facts for optional FactsBoard (home section; currently disabled).
 *
 * Numbers anchored on `business.ts` (`googleReviews`) where applicable.
 */

import type { Lang } from '../i18n/config';
import { googleReviews } from './business';

export interface Fact {
	id: string;
	value: string;
	unit?: Record<Lang, string>;
	label: Record<Lang, string>;
	note?: Record<Lang, string>;
	pendingConfirmation?: boolean;
}

export const facts: ReadonlyArray<Fact> = [
	{
		id: 'rating',
		value: googleReviews.rating.toFixed(1),
		unit: { ca: '/ 5', es: '/ 5' },
		label: {
			ca: `Mitjana orientativa · ${googleReviews.count} ressenyes (Google)`,
			es: `Media orientativa · ${googleReviews.count} reseñas (Google)`,
		},
		note: {
			ca: 'Valors dels propers scrape manuals o fitxa.',
			es: 'Valores de scraping manual / ficha pública.',
		},
		pendingConfirmation: true,
	},
	{
		id: 'languages',
		value: '2',
		unit: { ca: 'idiomes', es: 'idiomas' },
		label: {
			ca: 'Català · Castellà',
			es: 'Catalán · Castellano',
		},
		note: {
			ca: 'Atenció al local en les dues llengües cooficials.',
			es: 'Atención en las dos lenguas cooficiales.',
		},
	},
	{
		id: 'cuisineFocus',
		value: '01',
		unit: { ca: 'brasa', es: 'brasa' },
		label: {
			ca: 'Cuina tranquila sobre foc',
			es: 'Cocina tranquila sobre fuego',
		},
		note: {
			ca: 'Entrants, brases combinades, tapes i entrepans — sense cursa.',
			es: 'Entrantes, brasa combinados, tapas y bocadillos — sin prisa.',
		},
		pendingConfirmation: true,
	},
	{
		id: 'neighbourhood',
		value: '13',
		unit: { ca: 'Jeroni de Moragas', es: 'Jeroni de Moragas' },
		label: {
			ca: "L'Ametlla del Vallès",
			es: 'La Ametlla del Vallès',
		},
		note: {
			ca: 'Codi postal 08480 · Vallès Oriental.',
			es: 'Código postal 08480 · Vallès Oriental.',
		},
	},
];

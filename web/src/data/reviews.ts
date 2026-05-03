/**
 * Google Maps reviews — verbatim authorised public texts only.
 *
 * El mini nou: populate from the live Google listing when the venue
 * approves excerpts; leaving an empty array avoids shipping placeholder salon-template review copy.
 */

export type ReviewLanguage = 'ca' | 'es' | 'de';

export interface Review {
	authorName: string;
	authorInitial: string;
	rating: number;
	dateCa: string;
	dateEs: string;
	textCa: string | null;
	textEs: string;
	isLocalGuide?: boolean;
	reviewCountByAuthor?: number;
	language: ReviewLanguage;
	featured?: boolean;
	pendingGoogleTranscript?: boolean;
}

export const reviews: ReadonlyArray<Review> = [
	{
		authorName: 'Pol Dansa Casalprim',
		authorInitial: 'P',
		rating: 5,
		dateCa: 'Març 2026',
		dateEs: 'Marzo 2026',
		textCa:
			'Gran descobriment! Ens van agafar per dinar a les 14:45 cosa que agraïm molt, tot fenomenal. Servei, qualitat del menjar i quantitat, el local sembla nou i té un camp de minigolf de 18 forats amb un nivell de dificultat ben pensat per a tots els públics.',
		textEs:
			'Gran descubrimiento! Nos cogieron para comer a las 14:45 cosa que agradecemos mucho, todo fenomenal. Servicio, calidad de la comida y cantidad, el local parece nuevo y cuenta con un campo de minigolf de 18 hoyos con un nivel de dificultad bien pensado para todos los públicos.',
		isLocalGuide: true,
		reviewCountByAuthor: 19,
		language: 'es',
		featured: true,
	},
	{
		authorName: 'Olga Closa Izquierdo',
		authorInitial: 'O',
		rating: 5,
		dateCa: 'Gener 2026',
		dateEs: 'Enero 2026',
		textCa:
			"Fantàstic! Hem anat amb un grup gran d'amics. Els nens han estat súper entretinguts jugant a golf i els plats combinats han triomfat. Tot boníssim; la carn, espectacular! El minigolf ha recuperat l'ambient familiar i distés de fa anys.",
		textEs:
			"Fantástico! Hemos ido con un grupo grande de amigos. Los niños han estado súper entretenidos jugando a golf y los platos combinados han triunfado. Todo buenísimo; la carne, espectacular! El minigolf ha recuperado el ambiente familiar y distendido de hace años.",
		isLocalGuide: false,
		reviewCountByAuthor: 5,
		language: 'ca',
		featured: true,
	},
	{
		authorName: 'Tony Vicente Maestro',
		authorInitial: 'T',
		rating: 5,
		dateCa: 'Abril 2026',
		dateEs: 'Abril 2026',
		textCa:
			"Restaurant genial per a àpats una mica més informals. Brasa, plats combinats, tapes, hamburgueses i fins i tot entrepans. El xurrasco estava genial i l'ambient molt bo.",
		textEs:
			'Restaurante genial para comidas algo más informales. Brasa, platos combinados, tapas, hamburguesas y hasta bocatas. El churrasco estaba genial y el ambiente muy bueno.',
		isLocalGuide: true,
		reviewCountByAuthor: 307,
		language: 'es',
		featured: true,
	},
];

export const googleReviewsPublicUrl =
	'https://www.google.com/maps/search/?api=1&query=El+mini+nou+L%27Ametlla+del+Vallès';

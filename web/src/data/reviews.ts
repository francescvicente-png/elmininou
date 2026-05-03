/**
 * Google Maps reviews — verbatim authorised public texts only.
 *
 * Source of truth for the cards and pull-quote rendered by
 * `ReviewsBentoSection`. Every entry below is a reseña real currently
 * visible on the venue's Google profile (snapshot 03/05/2026, 11
 * reviews / 5,0 ★). Rule: do not edit the author's words. If a future
 * review needs trimming for layout, use ellipsis (…) and keep the rest
 * literal — never paraphrase, never tone things down.
 *
 * 8 of the 11 published reviews carry text and live here. The other 3
 * (Oriol Toll Roca, Adrià, Guillem Molist) only left a star rating with
 * no comment, so they are aggregated in the section UI as
 * `+N valoracions de 5 ★` rather than being given a card with no quote.
 */

export type ReviewLanguage = 'ca' | 'es' | 'de';

export interface Review {
	authorName: string;
	authorInitial: string;
	rating: number;
	/** ISO date (YYYY-MM-DD) — used by Schema.org Review JSON-LD. Approximated
	 *  to the 1st-15th of the published month when Google only shows
	 *  relative ages ("hace 3 semanas" → mid-April). */
	datePublished: string;
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
		authorName: 'Olga Closa Izquierdo',
		authorInitial: 'O',
		rating: 5,
		datePublished: '2026-01-15',
		dateCa: 'Gener 2026',
		dateEs: 'Enero 2026',
		textCa:
			"Fantàstic! Hem anat amb un grup gran d'amics. Els nens han estat súper entretinguts jugant a golf i els plats combinats han triomfat. Tot boníssim; la carn, espectacular! El Mini Golf ha recuperat l'ambient familiar i distés de fa anys.",
		textEs:
			'¡Fantástico! Hemos ido con un grupo grande de amigos. Los niños han estado súper entretenidos jugando a golf y los platos combinados han triunfado. ¡Todo buenísimo; la carne, espectacular! El Mini Golf ha recuperado el ambiente familiar y distendido de hace años.',
		isLocalGuide: false,
		reviewCountByAuthor: 5,
		language: 'ca',
		featured: true,
	},
	{
		authorName: 'Pol Dansa Casalprim',
		authorInitial: 'P',
		rating: 5,
		datePublished: '2026-03-15',
		dateCa: 'Març 2026',
		dateEs: 'Marzo 2026',
		textCa:
			'Gran descobriment!! Ens van agafar per dinar a les 14:45 cosa que agraïm molt, tot fenomenal. Servei, qualitat del menjar i quantitat, el local sembla nou i té un camp de mini golf de 18 forats amb un nivell de dificultat molt elevat 😅 que vam poder gaudir després de dinar. Vam menjar 3 persones, vam compartir 3 primers i després costella de porc x2 i una entranya, beguda i cafè 90 euros. Tot boníssim i plats contundents.',
		textEs:
			'Gran descubrimiento!! Nos cogieron para comer a las 14:45 cosa que agradecemos mucho, todo fenomenal. Servicio, calidad de la comida y cantidad, el local parece nuevo y cuenta con un campo de mini golf de 18 hoyos con un nivel de dificultad muy elevado 😅 que pudimos disfrutar después de comer. Comimos 3 personas, compartimos 3 primeros y después costilla de cerdo x2 y una entraña, bebida y café 90 euros. Todo buenísimo y platos contundentes.',
		isLocalGuide: true,
		reviewCountByAuthor: 19,
		language: 'es',
	},
	{
		authorName: 'Tony Vicente Maestro',
		authorInitial: 'T',
		rating: 5,
		datePublished: '2026-04-05',
		dateCa: 'Abril 2026',
		dateEs: 'Abril 2026',
		textCa:
			"Restaurant genial per a àpats una mica més informals. Brasa, plats combinats, tapes, hamburgueses i fins i tot entrepans. El xurrasco estava genial i l'ambient molt bo. El preu súper raonable. Tornarem segur.",
		textEs:
			'Restaurante genial para comidas algo más informales. Brasa, platos combinados, tapas, hamburguesas y hasta bocatas. El churrasco estaba genial y el ambiente muy bueno. El precio super razonable. Volveremos seguro.',
		isLocalGuide: true,
		reviewCountByAuthor: 307,
		language: 'es',
	},
	{
		authorName: 'Nuria Fernandez Moraza',
		authorInitial: 'N',
		rating: 5,
		datePublished: '2026-04-12',
		dateCa: 'Abril 2026',
		dateEs: 'Abril 2026',
		textCa:
			"Vam anar a dinar 3 persones i vam sortir molt contents. Les flors de carxofa, el xurrasco i el xai estaven al seu punt, carn molt tendra i plats molt complets. El lloc disposa d'un camp de mini golf per si vols passar una estona divertida. El personal molt atent.",
		textEs:
			'Fuimos a comer 3 personas y salimos muy contentos. Las flores de alcachofa, el churrasco y el cordero estaban en su punto, carne muy tierna y platos muy completos. El sitio dispone de un campo de mini golf por si quieres pasar un rato divertido. El personal muy atento.',
		isLocalGuide: false,
		reviewCountByAuthor: 1,
		language: 'es',
	},
	{
		authorName: 'Jamil Mosquera',
		authorInitial: 'J',
		rating: 5,
		datePublished: '2026-04-12',
		dateCa: 'Abril 2026',
		dateEs: 'Abril 2026',
		textCa:
			'Menjar molt top amb bons preus! Perfecte per portar els menuts ja que té un minigolf molt divertit!! Amb ambient familiar i bon servei.',
		textEs:
			'Comida muy top con buenos precios! Perfecto para llevar a los peques ya que contiene un minigolf muy divertido!! Con ambiente familiar y buen servicio.',
		isLocalGuide: false,
		reviewCountByAuthor: 4,
		language: 'es',
	},
	{
		authorName: 'Santi Izquierdo',
		authorInitial: 'S',
		rating: 5,
		datePublished: '2026-03-15',
		dateCa: 'Març 2026',
		dateEs: 'Marzo 2026',
		textCa:
			'Tot i estar amagat, el menjar genial i un gran descobriment en tots els sentits.',
		textEs:
			'Aunque escondido, la comida genial y un gran descubrimiento en todos sentidos.',
		isLocalGuide: false,
		reviewCountByAuthor: 9,
		language: 'es',
	},
	{
		authorName: 'Angels Mora Font',
		authorInitial: 'A',
		rating: 5,
		datePublished: '2026-03-15',
		dateCa: 'Març 2026',
		dateEs: 'Marzo 2026',
		textCa: 'Es menja super i el tracta molt bo',
		textEs: 'Se come súper y el trato muy bueno',
		isLocalGuide: false,
		reviewCountByAuthor: 7,
		language: 'ca',
	},
	{
		authorName: 'Pepi Roca',
		authorInitial: 'P',
		rating: 5,
		datePublished: '2026-03-15',
		dateCa: 'Març 2026',
		dateEs: 'Marzo 2026',
		textCa: 'Tot molt bo!!',
		textEs: '¡Todo muy bueno!',
		isLocalGuide: false,
		reviewCountByAuthor: 2,
		language: 'ca',
	},
];

export const googleReviewsPublicUrl =
	'https://www.google.com/maps/search/?api=1&query=El+mini+nou+L%27Ametlla+del+Vallès';

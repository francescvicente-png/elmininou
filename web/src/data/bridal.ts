/**
 * Bridal landing data — single source of truth for the rebuilt
 * /ca/nuvies and /es/novias pages.
 *
 * Editorial direction (May 2026 redesign on branch `nuvies-redesign`):
 *   - Aubergine + champagne over the shared dark editorial canvas.
 *   - Spotlight package layout (one anchor, two supporting), not the
 *     generic 3-column AI grid.
 *   - Editorial timeline (4 steps) instead of an FAQ-sized prose block.
 *   - Bento gapless gallery with five custom AI photographs that share
 *     the same visual world (palette, light, composition).
 *
 * All `pendingConfirmation` flags should flip to `false` once the
 * venue confirms names, prices and policy with the maintainer.
 *
 * Image policy: every illustration / photograph in this file is
 * AI-generated (Gemini "nano-banana", model 2). Each image must have
 * a matching entry in `src/assets/images/demo/attributions.json`. The
 * dark `aiDemoImageSuffix` is appended to the visible alt/caption
 * surface in the components, so patrons are never misled about authenticated
 * photography versus illustrative AI visuals for El mini nou.
 */
import type { ImageMetadata } from 'astro';
import type { FaqItemData } from './faq';
import type { Lang } from '../i18n/config';

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

import bridalHeroPortrait from '../assets/images/generated/bridal/bridal-hero-portrait.jpg';

export const bridalHero = {
	image: bridalHeroPortrait,
	alt: {
		ca: "Editorial: núvia de perfil amb recollit baix i vestit ivori al saló — exemple visual.",
		es: 'Editorial: novia de perfil con recogido bajo y vestido marfil en el salón — ejemplo visual.',
	} as Record<Lang, string>,
	/** AI provenance flag — the on-screen caption must declare it. */
	aiGenerated: true as const,
};

/* -------------------------------------------------------------------------- */
/* Editorial detail strip (intro composition)                                 */
/* -------------------------------------------------------------------------- */

import bridalDetailVeil from '../assets/images/generated/bridal/bridal-detail-veil.jpg';
import bridalDetailFlatlay from '../assets/images/generated/bridal/bridal-detail-flatlay.jpg';

export interface BridalEditorialImage {
	src: ImageMetadata;
	alt: Record<Lang, string>;
	aiGenerated: true;
}

export const bridalEditorialDetails: ReadonlyArray<BridalEditorialImage> = [
	{
		src: bridalDetailVeil,
		alt: {
			ca: "Editorial: mans col·locant un vel ivori sobre un recollit baix — detall macro.",
			es: 'Editorial: manos colocando un velo marfil sobre un recogido bajo — detalle macro.',
		},
		aiGenerated: true,
	},
	{
		src: bridalDetailFlatlay,
		alt: {
			ca: "Editorial: bodegó amb pintes, agulles i flors seques en to ivori i xampany.",
			es: 'Editorial: bodegón con peines, horquillas y flores secas en tono marfil y champán.',
		},
		aiGenerated: true,
	},
];

/* -------------------------------------------------------------------------- */
/* Process — editorial timeline                                               */
/* -------------------------------------------------------------------------- */

export interface BridalProcessStep {
	id: string;
	/** Short scheduling marker, e.g. "8–12 setm. abans". Not formal copy. */
	timing: Record<Lang, string>;
	/** Step title (display serif). */
	title: Record<Lang, string>;
	/** Body paragraph (max ~280 chars when rendered). */
	body: Record<Lang, string>;
}

export const bridalProcess: ReadonlyArray<BridalProcessStep> = [
	{
		id: 'first-call',
		timing: { ca: '8–12 setmanes abans', es: '8–12 semanas antes' },
		title: { ca: 'Primera trobada', es: 'Primera reunión' },
		body: {
			ca: "Conversem sobre la data, l'estil del vestit, el lloc, el pla A i el pla B. Tanquem la franja del dia B i les proves necessàries.",
			es: 'Hablamos de la fecha, el estilo del vestido, el lugar, el plan A y el plan B. Cerramos la franja del día B y las pruebas necesarias.',
		},
	},
	{
		id: 'colour-window',
		timing: { ca: '4–6 setmanes abans', es: '4–6 semanas antes' },
		title: { ca: 'Finestra de color', es: 'Ventana de color' },
		body: {
			ca: 'Si toca color, balayage o tractament de fibra, planifiquem amb marge per ajustar tons o textures abans del dia B.',
			es: 'Si toca color, balayage o tratamiento de fibra, planificamos con margen para ajustar tonos o texturas antes del día B.',
		},
	},
	{
		id: 'trial',
		timing: { ca: '1–2 setmanes abans', es: '1–2 semanas antes' },
		title: { ca: 'Prova de pentinat', es: 'Prueba de peinado' },
		body: {
			ca: 'Provem el recollit o semirrecollit amb les referències, accessoris i el coll del vestit. Sortim amb les pautes de rentat i preparació.',
			es: 'Probamos el recogido o semirrecogido con las referencias, accesorios y escote del vestido. Salimos con las pautas de lavado y preparación.',
		},
	},
	{
		id: 'day-b',
		timing: { ca: 'Dia B', es: 'Día B' },
		title: { ca: "El matí del 'sí'", es: "La mañana del 'sí'" },
		body: {
			ca: "T'esperem amb la franja reservada, marge per imprevistos i una atenció pensada perquè arribis a la cerimònia tranquil·la.",
			es: 'Te esperamos con la franja reservada, margen para imprevistos y una atención pensada para que llegues a la ceremonia tranquila.',
		},
	},
];

/* -------------------------------------------------------------------------- */
/* Packages — spotlight + supporting                                          */
/* -------------------------------------------------------------------------- */

import bridalPackTrialIllustration from '../assets/images/generated/bridal-pack-trial-event.png';
import bridalPackBridesmaidsIllustration from '../assets/images/generated/bridal-pack-bridesmaids.png';
import bridalPackDeluxeIllustration from '../assets/images/generated/bridal-pack-deluxe.png';

export interface BridalPackage {
	id: string;
	name: Record<Lang, string>;
	tagline: Record<Lang, string>;
	description: Record<Lang, string>;
	priceFromEur: number;
	pendingConfirmation: boolean;
	/** When true the package leads the spotlight column (one per page). */
	featured?: boolean;
	/** 3–5 bullets that read as inclusions, not marketing fluff. */
	included: Record<Lang, ReadonlyArray<string>>;
	/**
	 * Extra paragraph shown only in the expanded pack dialog (desktop-first
	 * detail). Confirmed with the salon before removing pending badges.
	 */
	expandedNote: Record<Lang, string>;
	/** Editorial illustration used in the spotlight tile. */
	illustration: ImageMetadata;
	illustrationAlt: Record<Lang, string>;
}

export const bridalPackages: ReadonlyArray<BridalPackage> = [
	{
		id: 'with-bridesmaids',
		name: { ca: 'Amb damades', es: 'Con damas' },
		tagline: {
			ca: 'El més demanat: núvia + acompanyament',
			es: 'El más pedido: novia + acompañamiento',
		},
		description: {
			ca: "Núvia i damades o convidades clau, amb torn coordinat al saló i una sola estilista responsable. Pensat perquè tota la fotografia del matí mantingui un mateix estil.",
			es: 'Novia y damas o invitadas clave, con turno coordinado en el salón y una única estilista responsable. Pensado para que toda la fotografía de la mañana mantenga un mismo estilo.',
		},
		priceFromEur: 320,
		pendingConfirmation: true,
		featured: true,
		included: {
			ca: [
				'1 prova de pentinat per a la núvia',
				'Pentinat al saló el dia B',
				'Fins a 3 acompanyants amb pentinat sobri',
				'Coordinació horària amb maquillatge',
			],
			es: [
				'1 prueba de peinado para la novia',
				'Peinado en el salón el día B',
				'Hasta 3 acompañantes con peinado sobrio',
				'Coordinación horaria con maquillaje',
			],
		},
		expandedNote: {
			ca: "Pensat per a núvies que volen una mateixa línia estètica entre tu i les convidades clau del matí. Encaixem torns al saló amb maquillatge i fotografia; si el nombre de persones canvia, ho rebatem a la prereserva.",
			es: 'Pensado para novias que quieren una misma línea estética entre tú y las invitadas clave de la mañana. Encajamos turnos en el salón con maquillaje y fotografía; si cambia el número de personas, lo reajustamos en la prerreserva.',
		},
		illustration: bridalPackBridesmaidsIllustration,
		illustrationAlt: {
			ca: "Il·lustració editorial: núvia amb damades a l'espai del saló — exemple visual.",
			es: 'Ilustración editorial: novia con damas en el espacio del salón — ejemplo visual.',
		},
	},
	{
		id: 'trial-event',
		name: { ca: 'Prova + dia B', es: 'Prueba + día B' },
		tagline: {
			ca: 'Ideal si vas sola',
			es: 'Ideal si vas sola',
		},
		description: {
			ca: 'Sessió de prova i pentinat el dia del casament. Format compacte: una núvia, una estilista, una franja exclusiva el matí del dia B.',
			es: 'Sesión de prueba y peinado el día de la boda. Formato compacto: una novia, una estilista, una franja exclusiva la mañana del día B.',
		},
		priceFromEur: 180,
		pendingConfirmation: true,
		included: {
			ca: [
				'1 prova de pentinat (amb referències)',
				'Pentinat al saló el dia B',
				'Pautes de rentat i preparació',
			],
			es: [
				'1 prueba de peinado (con referencias)',
				'Peinado en el salón el día B',
				'Pautas de lavado y preparación',
			],
		},
		expandedNote: {
			ca: "El format més net si el matí del dia B és només per a tu: una estilista, una franja reservada i el temps de la prova ja comptabilitzat. Si més endavant s'afegeix companyia al saló, podem passar a un pack superior.",
			es: 'El formato más claro si la mañana del día B es solo para ti: una estilista, una franja reservada y el tiempo de la prueba ya contabilizado. Si más adelante añades compañía en el salón, podemos pasar a un pack superior.',
		},
		illustration: bridalPackTrialIllustration,
		illustrationAlt: {
			ca: 'Il·lustració editorial: núvia amb recollit nupcial davant el mirall del saló — exemple visual.',
			es: 'Ilustración editorial: novia con recogido nupcial ante el espejo del salón — ejemplo visual.',
		},
	},
	{
		id: 'deluxe',
		name: { ca: 'Deluxe', es: 'Deluxe' },
		tagline: {
			ca: 'Acompanyament ampli',
			es: 'Acompañamiento amplio',
		},
		description: {
			ca: "Per casaments amb molt acompanyament, proves addicionals o necessitat d'un disseny capil·lar més elaborat (color + tractament + recollit). Tanquem detalls cara a cara.",
			es: 'Para bodas con mucho acompañamiento, pruebas adicionales o necesidad de un diseño capilar más elaborado (color + tratamiento + recogido). Cerramos detalles cara a cara.',
		},
		priceFromEur: 480,
		pendingConfirmation: true,
		included: {
			ca: [
				'2 proves (color + recollit)',
				'Pentinat al saló el dia B',
				'Acompanyament estès (5+ persones)',
				'Coordinació amb fotògraf i maquillatge',
			],
			es: [
				'2 pruebas (color + recogido)',
				'Peinado en el salón el día B',
				'Acompañamiento extendido (5+ personas)',
				'Coordinación con fotógrafo y maquillaje',
			],
		},
		expandedNote: {
			ca: "Per a casaments amb molta gent al voltant, canvis d'ubicació o dissenys que exigeixen proves separades de color i acabat. L'import final depèn de persones ateses i hores bloquejades; ho concretem escrit o al telèfon.",
			es: 'Para bodas con mucha gente alrededor, cambios de ubicación o diseños que requieren pruebas separadas de color y acabado. El importe final depende de personas atendidas y horas bloqueadas; lo concretamos por escrito o por teléfono.',
		},
		illustration: bridalPackDeluxeIllustration,
		illustrationAlt: {
			ca: 'Il·lustració editorial: ambient nupcial premium al saló — exemple visual.',
			es: 'Ilustración editorial: ambiente nupcial premium en el salón — ejemplo visual.',
		},
	},
];

/* -------------------------------------------------------------------------- */
/* Editorial gallery — bento gapless layout                                   */
/* -------------------------------------------------------------------------- */

import bridalGalleryBraided from '../assets/images/generated/bridal/bridal-gallery-1-braided-chignon.jpg';
import bridalGalleryHollywood from '../assets/images/generated/bridal/bridal-gallery-2-hollywood-wave.jpg';
import bridalGalleryHalfUp from '../assets/images/generated/bridal/bridal-gallery-3-half-up.jpg';
import bridalGalleryFlowers from '../assets/images/generated/bridal/bridal-gallery-4-flowers.jpg';
import bridalGalleryHighBun from '../assets/images/generated/bridal/bridal-gallery-5-high-bun.jpg';

export interface BridalGalleryImage {
	id: string;
	src: ImageMetadata;
	alt: Record<Lang, string>;
	caption: Record<Lang, string>;
	aiGenerated: true;
	/**
	 * CSS `object-position` for `object-fit: cover` in bento tiles.
	 * Tunes the visible crop so the hairstyle (not neck/shoulders) stays
	 * centered in frame; adjust after client feedback or new photography.
	 */
	coverFocus: string;
	/**
	 * Layout slot in the editorial bento (md+ viewport):
	 *   - 'anchor'  → tall left column (col-span-7, row-span-2)
	 *   - 'top'     → top-right square (col-span-5)
	 *   - 'middle'  → middle band, two squares side-by-side
	 *   - 'wide'    → full-width strip below
	 */
	slot: 'anchor' | 'top' | 'middle-left' | 'middle-right' | 'wide';
}

export const bridalGallery: ReadonlyArray<BridalGalleryImage> = [
	{
		id: 'gallery-anchor',
		src: bridalGalleryBraided,
		alt: {
			ca: 'Editorial: recollit baix trenat amb llums balayage — perfil — exemple visual.',
			es: 'Editorial: recogido bajo trenzado con luces balayage — perfil — ejemplo visual.',
		},
		caption: {
			ca: 'Recollit baix trenat',
			es: 'Recogido bajo trenzado',
		},
		coverFocus: '56% 38%',
		aiGenerated: true,
		slot: 'anchor',
	},
	{
		id: 'gallery-top',
		src: bridalGalleryHollywood,
		alt: {
			ca: 'Editorial: ona Hollywood polida — exemple visual.',
			es: 'Editorial: onda Hollywood pulida — ejemplo visual.',
		},
		caption: { ca: 'Ona Hollywood', es: 'Onda Hollywood' },
		coverFocus: '30% 48%',
		aiGenerated: true,
		slot: 'top',
	},
	{
		id: 'gallery-middle-left',
		src: bridalGalleryHalfUp,
		alt: {
			ca: 'Editorial: semirrecollit natural amb ones suaus — exemple visual.',
			es: 'Editorial: semirrecogido natural con ondas suaves — ejemplo visual.',
		},
		caption: { ca: 'Semirrecollit natural', es: 'Semirrecogido natural' },
		coverFocus: '50% 32%',
		aiGenerated: true,
		slot: 'middle-left',
	},
	{
		id: 'gallery-middle-right',
		src: bridalGalleryFlowers,
		alt: {
			ca: 'Editorial: detall macro de flors blanques i xampany sobre el cabell — exemple visual.',
			es: 'Editorial: detalle macro de flores blancas y champán sobre el cabello — ejemplo visual.',
		},
		caption: { ca: 'Flors integrades', es: 'Flores integradas' },
		coverFocus: '50% 45%',
		aiGenerated: true,
		slot: 'middle-right',
	},
	{
		id: 'gallery-wide',
		src: bridalGalleryHighBun,
		alt: {
			ca: 'Editorial: moño alt sleek amb aplic perlat — exemple visual.',
			es: 'Editorial: moño alto sleek con aplique perlado — ejemplo visual.',
		},
		caption: { ca: 'Moño alt sleek', es: 'Moño alto sleek' },
		/* Hair mass (high bun) was reading too high in crop — bias slightly below top third. */
		coverFocus: '50% 40%',
		aiGenerated: true,
		slot: 'wide',
	},
];

/* -------------------------------------------------------------------------- */
/* Testimonial — pulled from real Google review                               */
/* -------------------------------------------------------------------------- */

/**
 * The bridal page surfaces ONE pull-quote, taken verbatim from the
 * salon's public Google reviews. Source of truth is `data/reviews.ts`.
 * We deliberately reuse a real customer voice (transformation-themed)
 * instead of fabricating a fake bride testimonial.
 */
export const bridalTestimonialAuthor = 'Isabel Romero' as const;

/* -------------------------------------------------------------------------- */
/* FAQ — kept verbatim from previous version                                  */
/* -------------------------------------------------------------------------- */

export const bridalFaqs: ReadonlyArray<FaqItemData> = [
	{
		id: 'bridal-when-book',
		questionCa: 'Amb quanta antelació haig de reservar?',
		questionEs: '¿Con cuánta antelación debo reservar?',
		answerCa:
			'Recomanem contactar com a mínim 8–12 setmanes abans del casament per encaixar prova i dia B.',
		answerEs:
			'Recomendamos contactar al menos 8–12 semanas antes de la boda para encajar prueba y día B.',
		pendingConfirmation: true,
	},
	{
		id: 'bridal-trial',
		questionCa: 'La prova està inclosa?',
		questionEs: '¿La prueba está incluida?',
		answerCa:
			'Cada pack inclou almenys una prova; proves addicionals i preus finals es concreten amb l\'equip del saló.',
		answerEs:
			'Cada pack incluye al menos una prueba; pruebas adicionales y precios finales se concretan con el equipo del salón.',
		pendingConfirmation: true,
	},
	{
		id: 'bridal-travel',
		questionCa: 'Us desplaceu al lloc de la cerimònia?',
		questionEs: '¿Os desplazáis al lugar de la ceremonia?',
		answerCa:
			'Depèn de calendari i distància — ho tractem en la prereserva. Els packs aquí mostrats són treball al saló.',
		answerEs:
			'Depende de calendario y distancia — lo tratamos en la prerreserva. Los packs aquí mostrados son trabajo en el salón.',
		pendingConfirmation: true,
	},
	{
		id: 'bridal-color-timing',
		questionCa:
			'Quan és el millor moment per fer color o balayage abans del casament?',
		questionEs:
			'¿Cuál es el mejor momento para hacer color o balayage antes de la boda?',
		answerCa:
			"Depèn del tractament i de l'estat del cabell; com a pauta general es planifica amb setmanes de marge per tenir temps d'ajustos si cal. El calendari el tanquem amb tu al saló.",
		answerEs:
			'Depende del tratamiento y del estado del cabello; como pauta general se planifica con semanas de margen para permitir retoques si hace falta. El calendario lo cerramos contigo en salón.',
		pendingConfirmation: true,
	},
	{
		id: 'bridal-trial-what-bring',
		questionCa: 'Què he de portar a la prova del pentinat?',
		questionEs: '¿Qué debo llevar a la prueba del peinado?',
		answerCa:
			"Porta referències que t'agradin (fotos o àlbums), accessoris que vulguis incorporar (vel, diadema, etc.) i explica'ns el coll o l'esquena del vestit si el tens. No cal portar el vestit sencer si no et resulta còmode; sí que ajuda valorar proporcions i recolliment.",
		answerEs:
			'Trae referencias que te gusten (fotos o álbumes), accesorios que quieras incorporar (velo, diadema, etc.) y cuéntanos el escote o la espalda del vestido si ya lo tienes. No hace falta traer el vestido entero si no te resulta cómodo; sí ayuda valorar proporciones y recogido.',
		pendingConfirmation: true,
	},
	{
		id: 'bridal-day-b-schedule',
		questionCa:
			'A quina hora convé reservar el pentinat el dia del casament?',
		questionEs:
			'¿A qué hora conviene reservar el peinado el día de la boda?',
		answerCa:
			"Ho coordenem amb el teu maquillatge, el trajecte i la cerimònia: en la prereserva proposem una franja amb un petit marge per imprevistos. Porta els horaris clau del teu cronograma.",
		answerEs:
			'Lo coordinamos con tu maquillaje, trayecto y ceremonia: en la prerreserva proponemos una franja con un pequeño margen para imprevistos. Trae los horarios clave de tu cronograma.',
		pendingConfirmation: true,
	},
	{
		id: 'bridal-extensions-volume',
		questionCa:
			'Puc fer servir extensions o més volum si el meu cabell és fi?',
		questionEs:
			'¿Puedo usar extensiones o más volumen si mi cabello es fino?',
		answerCa:
			"S'avalua segons textura, color i estil desitjat; si cal peces d'afegit o extensions, convé planificar-ho amb antelació per provar-ho abans del dia B. Comenta-ho a la primera reserva.",
		answerEs:
			'Se valora según textura, color y estilo deseado; si hacen falta piezas añadidas o extensiones, conviene planificarlo con tiempo para probarlo antes del día B. Coméntalo en la primera reserva.',
		pendingConfirmation: true,
	},
	{
		id: 'bridal-deposit-hold',
		questionCa: 'Cal cap bestreta per reservar data i pack?',
		questionEs: '¿Hay señal o pago inicial para reservar fecha y pack?',
		answerCa:
			'La reserva de data i contingut del pack es pot vincular a condicions econòmiques de bestreta o cancel·lació; el detall el dóna l\'equip quan tanqueu calendari (telèfon o WhatsApp).',
		answerEs:
			'La reserva de fecha y contenido del pack puede ir ligada a condiciones de señal o cancelación; el detalle lo da el equipo al cerrar calendario (teléfono o WhatsApp).',
		pendingConfirmation: true,
	},
	{
		id: 'bridal-extra-guests',
		questionCa:
			'Podeu atendre mare de la núvia o més convidades el mateix matí?',
		questionEs:
			'¿Podéis atender a madre de la novia o más invitadas la misma mañana?',
		answerCa:
			"El pack «amb damades» cobreix núvia i companyia; persones addicionals o torns paral·lels es pressuposten segons nombre i temps. Envia'ns la llista orientativa en la prereserva.",
		answerEs:
			'El pack «con damas» cubre novia y compañía; personas adicionales o turnos paralelos se presupuestan según número y tiempo. Envíanos la lista orientativa en la prerreserva.',
		pendingConfirmation: true,
	},
	{
		id: 'bridal-hair-prep-day-b',
		questionCa: "Com he de portar el cabell el dia del casament?",
		questionEs: '¿Cómo debo llevar el cabello el día de la boda?',
		answerCa:
			"A la prova et donarem pautes clares (rentat, sense productes pesats si cal, etc.) perquè el resultat sigui estable. Respecta aquestes indicacions el dia B o consulta si hi ha algun canvi d'última hora.",
		answerEs:
			'En la prueba te daremos pautas claras (lavado, sin productos pesados si aplica, etc.) para que el resultado sea estable. Respétalas el día B o consulta si hay algún cambio de última hora.',
		pendingConfirmation: true,
	},
	{
		id: 'bridal-rain-plan',
		questionCa: "I si plou o fa vent el dia del casament?",
		questionEs: '¿Y si llueve o hace viento el día de la boda?',
		answerCa:
			"A la prova valorem també com reacciona el teu pentinat amb humitat o amb canvis d'ambient; reservem opcions pràctiques (recollits més segurs, producte de fixació) segons el teu pla A i pla B.",
		answerEs:
			'En la prueba valoramos también cómo responde tu peinado a la humedad o a cambios de entorno; reservamos opciones prácticas (recogidos más seguros, fijación) según tu plan A y plan B.',
		pendingConfirmation: true,
	},
];


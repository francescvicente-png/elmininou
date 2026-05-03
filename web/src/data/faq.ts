/**
 * Frequently Asked Questions.
 *
 * Bilingual FAQ for El mini nou (restaurant · L'Ametlla del Vallès).
 * Answers align with `business.ts` / `openingHours`; open items carry
 * `pendingConfirmation` until the owner validates.
 */

export interface FaqItemData {
	id: string;
	questionCa: string;
	questionEs: string;
	answerCa: string;
	answerEs: string;
	pendingConfirmation?: boolean;
	/** Differentiates general restaurant FAQs from section-specific ones. */
	scope?: 'restaurant' | 'minigolf';
}

export const faqs: ReadonlyArray<FaqItemData> = [
	{
		id: 'reserva-taula',
		questionCa: 'Cal reservar taula?',
		questionEs: '¿Hay que reservar mesa?',
		answerCa:
			"Sí, recomanem trucar o escriure per WhatsApp amb antelació, sobretot vespre i cap de setmana. Ens ajuda a organitzar la cuina i el servei.",
		answerEs:
			'Sí, recomendamos llamar o escribir por WhatsApp con antelación, sobre todo viernes/noche y fin de semana. Nos ayuda a organizar cocina y servicio.',
		pendingConfirmation: true,
	},
	{
		id: 'metodes-pagament',
		questionCa: 'Quins mètodes de pagament accepteu?',
		questionEs: '¿Qué métodos de pago aceptáis?',
		answerCa: 'Acceptem efectiu, targeta (crèdit/dèbit) i Bizum.',
		answerEs: 'Aceptamos efectivo, tarjeta (crédito/débito) y Bizum.',
	},
	{
		id: 'aparcament',
		questionCa: 'Hi ha aparcament a prop?',
		questionEs: '¿Hay aparcamiento cerca?',
		answerCa:
			"Som al Carrer Jeroni de Moragas, 13 — L'Ametlla del Vallès. Sol haver-hi places a la via pública i zones regulades; confirma sempre la senyalització i el color de línia.",
		answerEs:
			'Estamos en Carrer Jeroni de Moragas, 13 — La Ametlla del Vallès. Suele haber plazas en vía pública y zonas reguladas; revisa siempre la señalización y el color del cordón.',
	},
	{
		id: 'horari-esmorzar-dinar-sopar',
		questionCa: 'Quin horari feu?',
		questionEs: '¿Cuál es el horario?',
		answerCa:
			'Dijous i divendres vespre · dissabte jornada completa · diumenge esmorzar-dinar segons quadranti del web i del local. Dilluns i dimarts tanquem; sempre que hi hagi canvis de temporada els publicarem o els confirmarem per telèfon.',
		answerEs:
			'Jueves y viernes cena · sábado jornada completa · domingo desayuno-comida según el cuadrante web y local. Lunes y martes cerrado; ante cambios de temporada lo publicamos o lo confirmamos por teléfono.',
	},
	{
		id: 'al-lergens',
		questionCa: 'On puc revisar els al·lèrgens?',
		questionEs: '¿Dónde reviso los alérgenos?',
		answerCa:
			"La carta en paper del local és la referència: hi ha allergens en text als plats combinats i secció de begudes tal com els menús impresos. Si tens intolerància greu, comuniqui-ho a la reserva i un altre cop al servei.",
		answerEs:
			'La carta en papel del local es la referencia: lleva alérgenes en texto en combinados y bebidas como los menús impresos. Si tienes una intolerancia importante, dímelo al reservar y otra vez en sala.',
		pendingConfirmation: true,
	},
	{
		id: 'idiomes',
		questionCa: 'En quins idiomes ens atenen?',
		questionEs: '¿En qué idiomas nos atendéis?',
		answerCa:
			"L'equip habitualment parla català i castellà; si necessites clarir un dubte idioma, ho comenteu al moment de reservar.",
		answerEs:
			'Habitualmente en catalán y castellano; si prefieres otro idioma, coméntalo y lo intentamos.',
	},
	{
		id: 'reserva-sense-app',
		questionCa: "Es pot reservar només amb una aplicació o web de tercers?",
		questionEs: '¿Solo puedo reservar con una aplicación de terceros?',
		answerCa:
			"No tenim aplicació pròpia ni botó de reserva enllestit: sempre confirma per telèfon o WhatsApp. Si apareix El mini nou en una plataforma externa i no ho reconeixes, ves en compte — parla sempre amb el restaurant.",
		answerEs:
			"No tenemos app propia ni botón de reserva integrado siempre llama o escribe por WhatsApp. Si ves El mini nou en una plataforma ajena que no conoces sé prudente: confirma con el restaurante.",
	},
	{
		id: 'grups-esdeveniments',
		questionCa: 'Podeu atendre grups grans?',
		questionEs: '¿Podéis atender grupos grandes?',
		answerCa:
			"Depèn del dia i l'aforament. Escriviu-nos amb data orientativa i nombre de persones — us proposem opció sobre la carta o menú agrupat segons disponibilitat.",
		answerEs:
			'Depende del día y aforo. Escríbenos fecha orientativa y número de personas: proponemos sobre carta o menú cerrado si la cocina puede asumirlo.',
		pendingConfirmation: true,
	},
	{
		id: 'modificar-cancelar-reserva',
		questionCa: 'He de canviar l’hora o cancel·lar — què faig?',
		questionEs: 'Tengo que cambiar hora o cancelar ¿qué hago?',
		answerCa:
			"Truqueu o WhatsApp tan aviat com pogueu respecte a la vostra reserva: reorganitzarem o alliberarem taula segons vulgueu.",
		answerEs:
			'Llama o escribe por WhatsApp cuanto antes respecto a tu reserva: reorganizamos o liberamos mesa.',
	},
	{
		id: 'emportar',
		questionCa: 'Feu menjars per emportar?',
		questionEs: '¿Hacéis comida para llevar?',
		answerCa:
			"Ho podeu preguntar al moment de reservar o al servei: depèn del plat i de la ocupació de la cuina aquell dia.",
		answerEs:
			'Consúltalo al reservar o en sala: depende del plato y la carga de cocina ese día.',
		pendingConfirmation: true,
	},
];

/** Minigolf-specific FAQ items — used by /ca/minigolf/ and /es/minigolf/ pages. */
export const minigolfFaqs: ReadonlyArray<FaqItemData> = [
	{
		id: 'minigolf-reserva-camp',
		scope: 'minigolf',
		questionCa: 'Cal reservar el camp?',
		questionEs: '¿Hay que reservar el campo?',
		answerCa:
			"No cal, però recomanem trucar si veniu en grup gran per assegurar-vos que el camp estigui disponible.",
		answerEs:
			'No es necesario, pero recomendamos llamar si venís en grupo grande para aseguraros de que el campo esté disponible.',
	},
	{
		id: 'minigolf-edat-minima',
		scope: 'minigolf',
		questionCa: 'Hi ha edat mínima per jugar?',
		questionEs: '¿Hay edad mínima para jugar?',
		answerCa:
			"No, és apte per a tota la família. Tenim pals adaptats per a nens de totes les edats.",
		answerEs:
			'No, es apto para toda la familia. Tenemos palos adaptados para niños de todas las edades.',
	},
	{
		id: 'minigolf-durada-partida',
		scope: 'minigolf',
		questionCa: 'Quant dura una partida?',
		questionEs: '¿Cuánto dura una partida?',
		answerCa:
			"Aproximadament 45-60 minuts per als 18 forats, depenent del nombre de jugadors i del ritme del grup.",
		answerEs:
			'Aproximadamente 45-60 minutos para los 18 hoyos, dependiendo del número de jugadores y el ritmo del grupo.',
	},
	{
		id: 'minigolf-pluja',
		scope: 'minigolf',
		questionCa: 'Què passa si plou?',
		questionEs: '¿Qué pasa si llueve?',
		answerCa:
			"El camp es tanca temporalment si plou intensament. Truqueu abans de venir per confirmar-ne la disponibilitat.",
		answerEs:
			'El campo cierra temporalmente si llueve intensamente. Llamad antes de venir para confirmar la disponibilidad.',
	},
];

/**
 * Helper used by SchemaFaqPage to build the JSON-LD payload. The
 * Schema.org FAQPage answer must be a single plain string per
 * question — picks the active language and strips any markdown.
 */
export function getFaqAnswerForSchema(
	item: FaqItemData,
	lang: 'ca' | 'es',
): string {
	return lang === 'ca' ? item.answerCa : item.answerEs;
}

export function getFaqQuestionForSchema(
	item: FaqItemData,
	lang: 'ca' | 'es',
): string {
	return lang === 'ca' ? item.questionCa : item.questionEs;
}

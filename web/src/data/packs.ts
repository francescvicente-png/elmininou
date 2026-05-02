/**
 * Packs and gift cards data — bilingual.
 *
 * All entries are flagged `pendingConfirmation: true` until the salon
 * validates final prices and validity. The page renders a visible
 * "pendent de confirmar" badge for any pack with this flag.
 *
 * The CTA points to WhatsApp so the visitor can ask in-store. NEVER
 * ship a price the business has not agreed to.
 */

export type PackId = 'pack-5-cuts' | 'gift-card';

export interface Pack {
	id: PackId;
	/** Iconify name (Tabler set) for the card header. */
	iconKey: string;
	/** When true, render with a "pending confirmation" badge. */
	pendingConfirmation: boolean;
	/** Recommended retail price in EUR. Display only — payment is
	 *  off-site (WhatsApp / in-store / Stripe Payment Link). */
	price: number;
	/** Optional original price to show as struck-through (only used
	 *  for "saving X%" packs). */
	originalPrice?: number;
	/** Validity in human-readable form (e.g. "6 mesos"). */
	validity: { ca: string; es: string };
	/** Card title. */
	title: { ca: string; es: string };
	/** Short subtitle / tagline shown under the title. */
	tagline: { ca: string; es: string };
	/** Bullet list of features / what's included. */
	bullets: { ca: string[]; es: string[] };
	/** Long description below the bullets. */
	description: { ca: string; es: string };
	/** Optional override for the CTA label. Defaults to a generic
	 *  "Vull aquest pack" / "Quiero este pack" if absent. */
	ctaLabel?: { ca: string; es: string };
}

export const packs: ReadonlyArray<Pack> = [
	{
		id: 'pack-5-cuts',
		iconKey: 'tabler:scissors',
		pendingConfirmation: true,
		price: 81, // 5 cortes a 18€ con 10% de descuento
		originalPrice: 90,
		validity: { ca: '6 mesos', es: '6 meses' },
		title: { ca: 'Pack 5 talls', es: 'Pack 5 cortes' },
		tagline: {
			ca: 'Cinc cites de tall clàssic amb un 10 % de descompte',
			es: 'Cinco citas de corte clásico con un 10 % de descuento',
		},
		bullets: {
			ca: [
				'5 talls clàssics',
				'10 % de descompte sobre el preu unitari',
				'Vàlid 6 mesos des de la compra',
				"Transferible a un familiar o amic",
			],
			es: [
				'5 cortes clásicos',
				'10 % de descuento sobre el precio unitario',
				'Válido 6 meses desde la compra',
				'Transferible a un familiar o amigo',
			],
		},
		description: {
			ca: "Si véns regularment, el pack et surt més a compte i fixa la teva cita cada 4–5 setmanes sense haver de pensar-hi cada vegada. Pots regalar talls del pack a qui vulguis.",
			es: 'Si vienes regularmente, el pack te sale más a cuenta y fija tu cita cada 4-5 semanas sin tener que pensarlo cada vez. Puedes regalar cortes del pack a quien quieras.',
		},
	},
	{
		id: 'gift-card',
		iconKey: 'tabler:gift',
		pendingConfirmation: true,
		// Display price = "from 20 €" handled in the template; the
		// numeric value below is just the entry-level option.
		price: 20,
		validity: { ca: '12 mesos', es: '12 meses' },
		title: { ca: 'Targeta regal', es: 'Tarjeta regalo' },
		tagline: {
			ca: 'Un detall per regalar temps al saló — familiar, parella o amistat',
			es: 'Un detalle para regalar tiempo en el salón — familia, pareja o amistad',
		},
		bullets: {
			ca: [
				'Disponible des de 20 €, 30 €, 50 € o l\'import que vulguis',
				'Vàlida 12 mesos des de la compra',
				'Apta per a qualsevol servei de la carta',
				'Targeta digital + targeta física al local si vols',
			],
			es: [
				'Disponible desde 20 €, 30 €, 50 € o el importe que quieras',
				'Válida 12 meses desde la compra',
				'Apta para cualquier servicio de la carta',
				'Tarjeta digital + tarjeta física en el local si quieres',
			],
		},
		description: {
			ca: "Una idea ràpida per aniversaris, Nadal, Sant Jordi o com a detall d'agraïment. Pots fer-la per qualsevol import. La rebreu en PDF imprimible amb el nom del destinatari i, si ho vols, també una targeta física al local.",
			es: 'Una idea rápida para cumpleaños, Navidad, Sant Jordi o como detalle de agradecimiento. Puedes hacerla por cualquier importe. La recibirás en PDF imprimible con el nombre del destinatario y, si quieres, también una tarjeta física en el local.',
		},
		ctaLabel: {
			ca: 'Vull regalar una targeta',
			es: 'Quiero regalar una tarjeta',
		},
	},
] as const;

/**
 * Legal / LSSI / RGPD single source of truth.
 *
 * - `serviceProvider`: natural person who publishes the website (LSSI art. 10).
 * - `legalEntity`: salon business identity (customer-facing NAP + fiscal titular of the salon).
 *
 * Contact email for the site operator: also kept on `websiteOwner` for templates
 * that reference “developer” / technical contact.
 */
import { business } from './business';

/** Natural person identified as the LSSI service provider for this site. */
export const serviceProvider = {
	fullName: 'Francesc Josep Vicente Blanco',
	taxId: '48167829X',
	/** Postal address for LSSI identification (distinct from the salon premises). */
	addressLine: 'Carrer Nou, 82, 08492 Sant Martí de Centelles (Barcelona)',
	/** Email address supplied by the service provider in chat (confirm active inbox). */
	email: 'francescvicente@gmail.com',
} as const;

export const legalEntity = {
	tradeName: business.name,
	legalName: business.legalName,
	address: `${business.address.street}, ${business.address.postalCode} ${business.address.city}`,
	/**
	 * NIF/CIF del titular fiscal del restaurant (no el prestador LSSI).
	 * Reemplaçar quan el client el faciliti per escrit (handoff §5).
	 */
	taxId: 'TODO_NIF_TITULAR',
	/** Bústia de contacte RGPD del negoci quan existixi; provisionalment el prestador. */
	email: serviceProvider.email,
	phone: business.phone,
	registryInfo: null,
} as const;

export const websiteOwner = {
	isFinalOwner: true,
	developerName: 'Francesc Josep Vicente Blanco',
	developerEmail: serviceProvider.email,
	note:
		'El prestador del lloc web és la persona física indicada com a prestador legal. Les dades del restaurant «El mini nou» (nom comercial, titular fiscal pendent i adreça del local) figuren a l’avís legal corresponent.',
} as const;

export const legalLastUpdated = '2026-05-02';

/**
 * Business data — single source of truth.
 *
 * El mini nou restaurant — L'Ametlla del Vallès.
 */
import type { Lang } from '../i18n/config';

export type Slot = readonly [string, string];
export type DayHours = readonly Slot[] | null;

export type DayKey =
	| 'monday'
	| 'tuesday'
	| 'wednesday'
	| 'thursday'
	| 'friday'
	| 'saturday'
	| 'sunday';

export interface BusinessAddress {
	street: string;
	postalCode: string;
	city: string;
	region: string;
	country: string;
}

export interface BusinessGeo {
	lat: number;
	lon: number;
}

export interface BusinessSocialLinks {
	instagram?: string;
	facebook?: string;
	tiktok?: string;
	x?: string;
}

export interface BusinessReviewsSnapshot {
	rating: number;
	count: number;
	url: string;
	lastUpdated: string;
}

export interface Business {
	name: string;
	legalName: string;
	languages: ReadonlyArray<Lang>;
	defaultLang: Lang;
	address: BusinessAddress;
	geo: BusinessGeo;
	phone: string;
	phoneTel: string;
	freshaUrl: string;
	googleMapsUrl: string;
	googlePlaceId: string;
	socialLinks: BusinessSocialLinks;
}

export const business: Business = {
	name: 'El mini nou',
	/** Titular fiscal del restaurant: actualitzar quan es confirmi per escrit (handoff §5). */
	legalName: 'Titular fiscal pendent',
	languages: ['ca', 'es'],
	defaultLang: 'ca',
	address: {
		street: 'Carrer Jeroni de Moragas, 13',
		postalCode: '08480',
		city: "L'Ametlla del Vallès",
		region: 'Barcelona',
		country: 'ES',
	},
	geo: {
		lat: 41.67069170689928,
		lon: 2.254346301702218,
	},
	phone: '604 92 79 03',
	phoneTel: '+34604927903',
	freshaUrl: '',
	googleMapsUrl:
		'https://www.google.com/maps/search/?api=1&query=Carrer+Jeroni+de+Moragas+13,+08480+L%27Ametlla+del+Vallès',
	googlePlaceId: '',
	socialLinks: {
		instagram: 'https://www.instagram.com/elmininou/',
	},
};

/** Handoff HANDOFF_EL_MINI_NOU.md §3.3 — validar temporada amb el negoci. */
export const openingHours: Record<DayKey, DayHours> = {
	monday: null,
	tuesday: null,
	wednesday: null,
	thursday: [['20:00', '23:00']],
	friday: [['20:00', '23:00']],
	saturday: [['09:00', '23:00']],
	sunday: [['09:00', '16:00']],
};

export const googleReviews: BusinessReviewsSnapshot = {
	rating: 5,
	count: 11,
	url: business.googleMapsUrl,
	lastUpdated: '2026-05-03',
};

export function getInstagramDisplayHandle(): string {
	const url = business.socialLinks.instagram;
	if (!url) return '';
	try {
		const path = new URL(url).pathname.replace(/^\/+|\/+$/g, '');
		return path ? `@${path}` : '';
	} catch {
		return '';
	}
}

export type { Lang } from '../i18n/config';

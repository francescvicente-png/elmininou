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

export const reviews: ReadonlyArray<Review> = [];

export const googleReviewsPublicUrl =
	'https://www.google.com/maps/search/?api=1&query=El+mini+nou+L%27Ametlla+del+Vallès';

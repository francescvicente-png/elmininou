/**
 * Site configuration — NOT business data.
 *
 * Holds settings about *the website itself*: canonical URL, business
 * type (used to pick the right Schema.org @type and default icon set),
 * which optional sections are enabled, and which external services
 * are wired in.
 *
 * For a new template instance: edit a few fields here and a lot of
 * fields in src/data/business.ts. This file should change LITTLE
 * between deployments — most retheming happens in business.ts and
 * src/config/theme.ts.
 */

import { business } from './business';

/**
 * Coarse business categories supported by the template. The value
 * affects:
 *   - Schema.org @type used by SchemaLocalBusiness (e.g. HairSalon vs
 *     Bakery vs Restaurant) — see TODO below for the mapping work.
 *   - Default icon set for ServiceCard / ServiceIcon (planned).
 *   - Suggested sections in TEMPLATE_USAGE.md per business type.
 */
export type BusinessType =
	| 'barbershop'
	| 'hair-salon'
	| 'beauty-salon'
	| 'bakery'
	| 'restaurant'
	| 'pizzeria'
	| 'cafe'
	| 'dentist'
	| 'pharmacy'
	| 'other';

/**
 * Toggles for optional features. Set to `false` to disable a section
 * across the template — pages and components that drive these
 * features should consult this object before rendering.
 *
 * Sprint 2 will introduce `products`, `faq` and (probably) `awards`.
 * Those flags are documented now so they're stable when the
 * components arrive.
 */
export interface SiteFeatures {
	/** Services page with prices (currently always on). */
	services: boolean;
	/** Photo gallery page. */
	gallery: boolean;
	/** Google Reviews aggregate block on home/contact. */
	reviews: boolean;
	/** Products section (sprint 2). */
	products: boolean;
	/** FAQ section (sprint 2). */
	faq: boolean;
	/** Editorial blog / news. */
	blog: boolean;
	/** Awards / press mentions (sprint 2). */
	awards: boolean;
	/** External booking button in the header / hero. */
	onlineBooking: boolean;
	/** Careers / "work with us" page (sprint 3). */
	careers: boolean;
	/** Floating WhatsApp contact button (sprint 4). Renders on commercial
	 *  pages only — legal pages are excluded server-side from BaseLayout. */
	whatsappFloat: boolean;
}

export type BookingProvider =
	| 'fresha'
	| 'treatwell'
	| 'booksy'
	| 'phone'
	| 'custom';

export interface SiteBooking {
	provider: BookingProvider;
	url: string;
}

/**
 * Analytics / observability hooks.
 *
 * Microsoft Clarity is cookieless when configured with no IP storage
 * (the recommended preset). Heatmaps + session recordings, free.
 * Leave `clarityProjectId` empty to skip emitting the script entirely.
 *
 * Plausible / Cloudflare Web Analytics could live here too in the
 * future — see the TODO note in `BaseLayout.astro`.
 */
export interface SiteAnalytics {
	/** Microsoft Clarity project ID (10-character base32). Empty = disabled. */
	clarityProjectId: string;
}

export interface SiteConfig {
	/** Public canonical URL. Update when a custom domain is connected. */
	canonicalUrl: string;
	/**
	 * Query param for `/og/default.jpg` so WhatsApp / Facebook refetch after we
	 * regenerate the social preview image. Bump when `generate-og-image.mjs` output changes.
	 */
	ogImageCacheBust: string;
	/** What kind of local business this site represents. */
	businessType: BusinessType;
	features: SiteFeatures;
	booking: SiteBooking;
	analytics: SiteAnalytics;
}

export const site: SiteConfig = {
	canonicalUrl: 'https://elmininou.pages.dev',
	ogImageCacheBust: '3',
	businessType: 'restaurant',
	features: {
		services: true,
		gallery: true,
		reviews: false,
		products: false,
		faq: true,
		blog: false,
		awards: false,
		onlineBooking: false,
		careers: false,
		whatsappFloat: true,
	},
	booking: {
		provider: 'phone',
		url: '',
	},
	analytics: {
		// Afegiu un ID de Microsoft Clarity quan vulgueu analítiques; buit desactiva l'script.
		clarityProjectId: '',
	},
};

/**
 * Primary booking action for header, hero, and end-of-page banners.
 * When `onlineBooking` is false, the CTA is a `tel:` deep link (no Fresha).
 */
export function getBookingCta(): { href: string; external: boolean } {
	if (site.features.onlineBooking) {
		const href = site.booking.url.trim() || business.freshaUrl;
		return { href, external: true };
	}
	return { href: `tel:${business.phoneTel}`, external: false };
}

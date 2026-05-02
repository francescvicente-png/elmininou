/**
 * Home page section ordering and toggles.
 *
 * The home page (CA + ES) renders these sections in array order.
 * Switching `enabled` to `false` removes the section from the build
 * — pages compile without it, sitemap is unaffected (the home URL
 * is the same), and other pages don't reference these sections.
 *
 * For a new template instance: reorder this array (e.g. swap
 * `gallery-preview` before `services-preview` for a portfolio-led
 * business) or disable sections that don't apply (e.g. set
 * `services-preview.enabled = false` for a business that doesn't
 * have a price list page yet).
 *
 * The `hero` section is special: by convention it must be the first
 * entry. The script that consumes this list trusts that and renders
 * it outside the FadeInOnScroll wrapper (Hero is above the fold; we
 * never want it to start invisible).
 */

export type HomeSectionId =
	| 'hero'
	| 'highlights'
	| 'bridal-teaser'
	| 'marquee'
	| 'facts'
	| 'services-preview'
	| 'gallery-preview'
	| 'post-gallery-hero'
	| 'manifesto'
	| 'interlude-aiguafreda'
	| 'interlude-ofici'
	| 'about'
	| 'storytelling'
	| 'equip'
	| 'reviews'
	| 'location'
	| 'cta-banner'
	| 'logo-video';

export interface HomeSectionConfig {
	id: HomeSectionId;
	enabled: boolean;
}

export const homeSections: ReadonlyArray<HomeSectionConfig> = [
	{ id: 'hero', enabled: true },
	{ id: 'highlights', enabled: true },
	{ id: 'services-preview', enabled: true },
	{ id: 'equip', enabled: false },
	{ id: 'bridal-teaser', enabled: false },
	{ id: 'gallery-preview', enabled: true },
	{ id: 'post-gallery-hero', enabled: false },
	// All curated verbatim reviews render on post-gallery hero; keep this off
	// to avoid duplicating the same cards in a second cream section.
	{ id: 'reviews', enabled: false },
	{ id: 'marquee', enabled: false },
	{ id: 'facts', enabled: false },
	{ id: 'manifesto', enabled: false },
	{ id: 'storytelling', enabled: false },
	{ id: 'interlude-aiguafreda', enabled: false },
	{ id: 'about', enabled: true },
	{ id: 'interlude-ofici', enabled: false },
	{ id: 'location', enabled: true },
	{ id: 'cta-banner', enabled: true },
	{ id: 'logo-video', enabled: false },
];

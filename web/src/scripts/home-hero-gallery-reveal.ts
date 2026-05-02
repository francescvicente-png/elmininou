/**
 * Home — stacked fixed hero backgrounds:
 *
 * Two full-viewport `<picture>` layers live behind every section: the primary
 * hero (`[data-home-hero-image-layer]`) and the second hero
 * (`[data-home-post-gallery-hero-layer]`). We crossfade them as the user
 * scrolls nearly past the team grid (`#home-section-equip`): hero2 fades in along
 * the upper viewport strip only while hero1 carries teaser + gallery; after the swap,
 * hero2 stays on for post-gallery hero, marquee, about, and the sections below.
 *
 * Anchor reasoning:
 *   Crossfade completes while the visitor is still exiting the equip band:
 *   the second photo reaches full opacity only once the team's bottom edge
 *   reaches the upper viewport (not midway through teaser / espacio sections).
 *
 * Math:
 *   `p = clamp((startPx - equip.bottom) / (startPx - endPx), 0, 1)`
 *   with a **late** band: swap begins once equip's bottom enters the upper ~9%
 *   of the viewport so hero1 stays solid through teaser + gallery; the blend spans
 *   the last strokes of scroll before post-gallery hero.
 *
 * Fallback (no `#home-section-equip` in the DOM, e.g. equip section
 * disabled): we use the post-gallery section's top edge as a fallback so
 * the page never gets stuck mid-blend.
 *
 * `prefers-reduced-motion`: same scroll-mapped opacity (no animation, just
 * static positional math).
 *
 * Re-binds on `astro:page-load`; aborts listeners on `astro:before-preparation`.
 */

let abortController: AbortController | null = null;

function clamp(n: number, min: number, max: number): number {
	return Math.max(min, Math.min(max, n));
}

/**
 * Crossfade progress (0–1) tied to the team section's bottom edge.
 * - p = 0 while equip.bottom > startPx (crossfade not started yet).
 * - p ramps to 1 as the bottom edge travels through the narrow upper band.
 * - p = 1 once past `endPx` (second portrait stable for post-gallery onward).
 */
function equipCrossfadeProgress(
	rect: DOMRect | undefined,
	vh: number,
): number {
	if (!rect || vh <= 0) return 0;
	// Hero2 ramps in only when the team strip is almost gone: narrower window
	// near the top (9%→2.2%). Smaller percentages = later latch than 13%.
	const startPx = Math.max(vh * 0.09, 56);
	const endPx = Math.max(vh * 0.022, 14);
	const span = startPx - endPx;
	if (span <= 0) return rect.bottom <= endPx ? 1 : 0;
	return clamp((startPx - rect.bottom) / span, 0, 1);
}

/**
 * Fallback when there's no equip section: progress derived from the
 * post-gallery hero's own top edge (clip-style upward reveal).
 */
function postSectionFallbackProgress(
	rect: DOMRect | undefined,
	vh: number,
): number {
	if (!rect || vh <= 0) return 0;
	const start = vh * 0.96;
	const end = vh * 0.06;
	const span = start - end;
	if (span <= 0) return 0;
	return clamp((start - rect.top) / span, 0, 1);
}

function setupHomeHeroGalleryReveal(): void {
	abortController?.abort();
	abortController = new AbortController();
	const { signal } = abortController;

	if (typeof window === 'undefined') return;

	const heroLayer = document.querySelector<HTMLElement>(
		'[data-home-hero-image-layer]',
	);
	const postLayer = document.querySelector<HTMLElement>(
		'[data-home-post-gallery-hero-layer]',
	);
	if (!heroLayer || !postLayer) return;

	const equipSection = document.getElementById('home-section-equip');
	const postSection = document.getElementById(
		'home-section-post-gallery-hero',
	);

	const tick = (): void => {
		const vh = window.innerHeight || 1;
		let p: number;

		if (equipSection) {
			p = equipCrossfadeProgress(equipSection.getBoundingClientRect(), vh);
		} else if (postSection) {
			p = postSectionFallbackProgress(postSection.getBoundingClientRect(), vh);
		} else {
			p = 0;
		}

		// Always opacity-based (no clip-path). Removing clip-path makes the
		// swap behind any subsequent section deterministic: the second image
		// is either fading in or fully on, never a horizontally clipped slab.
		postLayer.style.removeProperty('clip-path');
		postLayer.style.opacity = String(p);
		heroLayer.style.opacity = String(1 - p);
	};

	let raf: number | null = null;
	const onScrollOrResize = (): void => {
		if (raf != null) return;
		raf = requestAnimationFrame(() => {
			raf = null;
			tick();
		});
	};

	window.addEventListener('scroll', onScrollOrResize, {
		passive: true,
		signal,
	});
	window.addEventListener('resize', onScrollOrResize, {
		passive: true,
		signal,
	});
	tick();
}

if (typeof document !== 'undefined') {
	document.addEventListener('astro:before-preparation', () => {
		abortController?.abort();
		abortController = null;
		const post = document.querySelector<HTMLElement>(
			'[data-home-post-gallery-hero-layer]',
		);
		const hero = document.querySelector<HTMLElement>(
			'[data-home-hero-image-layer]',
		);
		post?.style.removeProperty('clip-path');
		post?.style.removeProperty('opacity');
		hero?.style.removeProperty('opacity');
	});
	document.addEventListener('astro:page-load', setupHomeHeroGalleryReveal);
	setupHomeHeroGalleryReveal();
}

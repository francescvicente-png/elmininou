/**
 * header-shyness.ts
 *
 * Reveals the header when the user scrolls UP (any non-trivial
 * amount), hides it when they scroll DOWN past the first viewport.
 * Adds a `is-pinned` flag when the page is past the very top so the
 * header can intensify its background blur (no blur at scrollY=0
 * since the top of the page is the hero — we want the cream
 * background to read clean).
 *
 * **Home full-bleed hero:** toggles `header-hero-overlay` on `<html>`
 * while the scroll position is still within the first ~88% of the
 * viewport so the bar can sit transparently over the photo
 * (Alma-style). `data-home-hero` on `<html>` comes from the layout on
 * the home route and is re-synced on SPA navigations by
 * header-state.ts.
 *
 * Mirrors the pattern used by Linear, Vercel and many editorial
 * sites: the chrome stays out of the way while you read, comes back
 * the moment you reach for the nav.
 *
 * Implementation notes:
 *   - We translate the header up via `--header-translate` rather
 *     than toggling `display: none` so the transition is smooth and
 *     the header never causes layout shift.
 *   - Trigger threshold = 1 viewport: above the fold the header is
 *     always visible, so it doesn't disappear during the cinematic
 *     intro / first interaction.
 *   - Reduced-motion: shy translate is skipped; hero overlay class
 *     still updates so the home chrome stays correct.
 *   - Re-runs on `astro:page-load` so internal navigations reset
 *     the state correctly.
 */

const HIDE_THRESHOLD_PX = 16;

let lastY = 0;
let bound = false;

function updateHeroOverlay(scrollY: number) {
	const root = document.documentElement;
	if (!root.hasAttribute('data-home-hero')) {
		root.classList.remove('header-hero-overlay');
		return;
	}
	const atHeroTop = scrollY < window.innerHeight * 0.88;
	root.classList.toggle('header-hero-overlay', atHeroTop);
}

function setup() {
	const root = document.documentElement;
	const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const update = () => {
		const y = window.scrollY;
		const dy = y - lastY;

		updateHeroOverlay(y);

		if (reduce) {
			root.classList.remove('header-hidden', 'header-pinned');
			lastY = y;
			return;
		}

		root.classList.toggle('header-pinned', y > 4);

		const overViewport = y > window.innerHeight * 0.6;

		if (overViewport && dy > HIDE_THRESHOLD_PX) {
			root.classList.add('header-hidden');
			lastY = y;
		} else if (dy < -HIDE_THRESHOLD_PX || y < 80) {
			root.classList.remove('header-hidden');
			lastY = y;
		}
	};

	if (!bound) {
		window.addEventListener('scroll', update, { passive: true });
		window.addEventListener(
			'resize',
			() => updateHeroOverlay(window.scrollY),
			{ passive: true },
		);
		bound = true;
	}
	update();
}

if (typeof document !== 'undefined') {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', setup, { once: true });
	} else {
		setup();
	}
	document.addEventListener('astro:page-load', setup);
}

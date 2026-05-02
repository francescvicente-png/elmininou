import Lenis from 'lenis';

// Smooth scroll on desktop only.
//
// - `prefers-reduced-motion: reduce` → bail out, native scroll only.
// - Touch is intentionally NOT synced (`syncTouch` default = false in Lenis
//   v1.x): native mobile scroll is faster, more accurate, and avoids the
//   "rubber-band" feeling that Lenis introduces on iOS/Android.
//
// Reset to top on Astro view-transition page load — without this, navigating
// to a new page would keep the previous scroll offset (the body persists).
// EXCEPT: if the destination URL has a hash, we honour it and scroll to the
// matching element instead of to the top.
//
// Internal anchor clicks (e.g. the "Qui som" link in the header that points
// to `/ca/#qui-som` while the user is already on /ca/) are intercepted and
// routed through `lenis.scrollTo()` so they animate smoothly. Same-document
// anchors that don't match a real element fall back to the browser default.
if (
	typeof window !== 'undefined' &&
	!window.matchMedia('(prefers-reduced-motion: reduce)').matches
) {
	const lenis = new Lenis({
		duration: 1.2,
		easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		smoothWheel: true,
		wheelMultiplier: 1,
		touchMultiplier: 1.5,
	});

	function raf(time: number) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}

	requestAnimationFrame(raf);

	function scrollToHashOrTop() {
		const hash = window.location.hash;
		if (hash && hash.length > 1) {
			const target = document.querySelector(hash);
			if (target) {
				// `immediate: false` on hash so the user sees the scroll
				// after the View Transition completes — same feel as
				// clicking an anchor link directly.
				lenis.scrollTo(target as HTMLElement);
				return;
			}
		}
		lenis.scrollTo(0, { immediate: true });
	}

	document.addEventListener('astro:page-load', scrollToHashOrTop);

	// Same-document anchor clicks — e.g. the "Qui som" link in the header
	// or the hero "Veure serveis" CTA pointing at `#serveis-destacats`.
	// We intercept and route through lenis so the scroll animates instead
	// of jumping. Cross-page anchor clicks (where pathname differs) are
	// left to the browser + the `astro:page-load` handler above.
	//
	// Listener registered in CAPTURE phase so we run BEFORE Astro's
	// ClientRouter handler (which is registered later in bubble phase
	// and may preventDefault on internal links). Without this, our own
	// `event.defaultPrevented` guard would short-circuit and the scroll
	// would jump instantly.
	document.addEventListener(
		'click',
		(event) => {
			const target = (event.target as HTMLElement | null)?.closest('a');
			if (!target) return;
			const href = target.getAttribute('href');
			if (!href || !href.includes('#')) return;
			// External or `data-astro-reload` links use full navigation; skip.
			if (target.target === '_blank') return;
			if (target.hasAttribute('data-astro-reload')) return;

			let url: URL;
			try {
				url = new URL(href, window.location.href);
			} catch {
				return;
			}
			if (url.origin !== window.location.origin) return;
			if (url.pathname !== window.location.pathname) return;
			if (!url.hash || url.hash.length < 2) return;

			const element = document.querySelector(url.hash);
			if (!element) return;

			event.preventDefault();
			event.stopPropagation();
			lenis.scrollTo(element as HTMLElement);
			// Reflect the new hash in the address bar without triggering the
			// browser's own scroll handling.
			history.pushState(null, '', url.hash);
		},
		true,
	);
}

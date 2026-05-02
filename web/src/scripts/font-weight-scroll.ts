// Font-weight scroll — "breathing" weight on the hero H1 driven by
// the page scroll position.
//
// Mapping: scrollY ∈ [0, SCROLL_RANGE] → font-weight ∈ [400, 700].
// Beyond SCROLL_RANGE the weight clamps at 700 — once the user is
// past the hero there's no more "breathing" to do.
//
// Why a passive scroll listener instead of a constant RAF loop:
//   The weight only needs to update when scrollY changes, and the
//   browser fires `scroll` only when there's something to report.
//   A passive listener doesn't block the main thread; combined with
//   an `if (pending) return` rAF gate, the work coalesces to one
//   write per displayed frame even on high-rate trackpads.
//
// Bail-out under prefers-reduced-motion: weight stays at the CSS
// default (400 from the Tailwind utility on the H1), no listener.
// The font is still variable but the `font-weight` property is never
// touched, so users with the OS preference get a perfectly normal
// heading.
//
// Why opt-in via `data-scroll-weight` instead of targeting any
// magnetic heading: only the hero H1 is meant to breathe. Other H1s
// in the future (about page, single service page) would inherit the
// effect inappropriately if we keyed off `[data-magnetic-heading]`.

const MIN_W = 400;
const MAX_W = 700;
/** Pixels of scroll over which the weight ramps from MIN to MAX. */
const SCROLL_RANGE = 500;

let elements: HTMLElement[] = [];
let pending = false;

function applyWeight() {
	pending = false;
	const t = Math.min(Math.max(window.scrollY / SCROLL_RANGE, 0), 1);
	const weight = Math.round(MIN_W + (MAX_W - MIN_W) * t);
	const value = String(weight);
	for (const el of elements) {
		el.style.fontWeight = value;
	}
}

function onScroll() {
	if (pending) return;
	pending = true;
	requestAnimationFrame(applyWeight);
}

function setupFontWeightScroll() {
	if (typeof window === 'undefined') return;
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	elements = Array.from(
		document.querySelectorAll<HTMLElement>('[data-scroll-weight]'),
	);
	if (elements.length === 0) return;

	applyWeight();
}

if (typeof document !== 'undefined') {
	setupFontWeightScroll();
	window.addEventListener('scroll', onScroll, { passive: true });
	document.addEventListener('astro:page-load', setupFontWeightScroll);
}

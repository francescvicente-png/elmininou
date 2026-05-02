/**
 * cinematic-intro.ts
 *
 * Lifts the CinematicIntro curtain after the wordmark + tagline have
 * finished revealing, then removes the element from the DOM.
 *
 * Gating: shown only on the very first paint of the home page within
 * a session. We persist a flag in `sessionStorage` so a SPA-style
 * navigation away and back to the home doesn't replay the curtain.
 *
 * Reduced-motion: the CSS already hides the curtain via `display:
 * none` under `prefers-reduced-motion: reduce`, so this script can
 * still attempt to "lift" it without effect — but to keep the DOM
 * tidy we also remove the element directly when the user has the
 * preference set.
 */

const SESSION_KEY = 'el-mini-nou-cinematic-intro-played';
// Total visible duration ≈ 1.7 s end-to-end (curtain mounts → fully
// gone). LIFT_DELAY_MS controls how long the wordmark + tagline
// remain on screen before the lift; the CSS lift transition adds
// ~450 ms more.
const LIFT_DELAY_MS = 1250;
const REMOVE_DELAY_MS = LIFT_DELAY_MS + 600; // give the lift transition time

function shouldSkip(): boolean {
	try {
		if (sessionStorage.getItem(SESSION_KEY) === '1') return true;
	} catch {
		// storage unavailable (privacy mode) — skip gating, always show
	}
	if (
		window.matchMedia('(prefers-reduced-motion: reduce)').matches
	)
		return true;
	return false;
}

function markPlayed() {
	try {
		sessionStorage.setItem(SESSION_KEY, '1');
	} catch {
		// no-op — the curtain has shown anyway, the next visit will replay
	}
}

function liftCurtain(curtain: HTMLElement) {
	curtain.classList.add('is-lifting');
	window.setTimeout(() => {
		curtain.classList.add('is-finished');
		curtain.remove();
	}, 500);
}

function init() {
	const curtain = document.querySelector<HTMLElement>(
		'[data-cinematic-intro]'
	);
	if (!curtain) return;

	// Re-entrancy guard at the ELEMENT level. Both `DOMContentLoaded`
	// and `astro:page-load` fire on the very first page load (Astro 6
	// dispatches `astro:page-load` for the initial paint as well as
	// for SPA navigations). Without this guard the second call would
	// see the sessionStorage flag we just set during the first call,
	// classify the visit as "already played", and call
	// `curtain.remove()` mid-animation — which is exactly the
	// random 0.5 s / 5 s curtain duration the user reported.
	//
	// Using a data attribute on the curtain itself (instead of a
	// module-scoped boolean) also covers the SPA case correctly: a
	// fresh curtain element returning via View Transitions has no
	// flag, so the script can decide to either play or skip based
	// on sessionStorage alone.
	if (curtain.dataset.cinematicBooted === 'true') return;

	if (shouldSkip()) {
		// Curtain shouldn't be visible — either we already played in
		// this session, or the user has prefers-reduced-motion. Remove
		// the element so its CSS animations don't run and trap the
		// user behind a black overlay.
		curtain.remove();
		return;
	}

	curtain.dataset.cinematicBooted = 'true';
	markPlayed();
	window.setTimeout(() => liftCurtain(curtain), LIFT_DELAY_MS);

	// Safety net: if anything goes wrong with the timer, the curtain
	// is removed after a generous delay so the user is never trapped.
	window.setTimeout(() => {
		if (document.contains(curtain)) curtain.remove();
	}, REMOVE_DELAY_MS + 2000);
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
	init();
}

// Also re-run on Astro view transitions so subsequent SPA navigations
// back to the home (which mount a fresh curtain element with no
// `data-cinematic-booted` flag) get evaluated and removed
// immediately — `shouldSkip()` will return true thanks to the
// sessionStorage flag set during the first visit. On the initial
// page load this same listener runs after `DOMContentLoaded`, but
// the element-level flag (set during the first call) makes this
// second call a no-op; the original timers are left untouched.
document.addEventListener('astro:page-load', init);

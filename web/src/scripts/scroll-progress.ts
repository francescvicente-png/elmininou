/**
 * scroll-progress.ts
 *
 * Sets a CSS custom property `--scroll-progress` (0 → 1) on the
 * <html> element so other components can derive UI from page scroll
 * without each running their own listener. Used by:
 *   - the thin progress hairline at the top of the viewport
 *     (defined in global.css under `.scroll-progress-bar`)
 *   - the editorial section dividers that fade their hairline rule
 *     in as you scroll past them
 *
 * Throttled with rAF so it never runs more than once per frame.
 * Reduced-motion: still runs (it's not an animation, it's a value)
 * but consumers should respect the preference if their visual
 * reaction would feel motion-y.
 */

let ticking = false;

function update() {
	const doc = document.documentElement;
	const max = doc.scrollHeight - window.innerHeight;
	const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
	doc.style.setProperty('--scroll-progress', progress.toFixed(4));
	ticking = false;
}

function onScroll() {
	if (ticking) return;
	ticking = true;
	requestAnimationFrame(update);
}

function init() {
	update();
	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll, { passive: true });
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
	init();
}

// Re-run on Astro view transitions so the value resets after a swap
// (a fresh page starts at scrollY=0 with a different scrollHeight).
document.addEventListener('astro:after-swap', () => {
	ticking = false;
	update();
});

// Page loading bar — drives the .page-loading-bar element through the
// Astro View Transition lifecycle.
//
// Hidden under reduced motion (the CSS already sets `display: none` for
// that case; the script bails out early too).
//
// The bar lives inside <body transition:persist>, so the listeners
// registered here outlive every navigation. We only ever need to bind
// once, on first load.

function setupPageLoadingBar() {
	if (typeof window === 'undefined') return;
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	const bar = document.querySelector<HTMLElement>('.page-loading-bar');
	if (!bar) return;
	if (bar.dataset.bound === 'true') return;
	bar.dataset.bound = 'true';

	document.addEventListener('astro:before-preparation', () => {
		bar.classList.remove('is-complete');
		bar.classList.add('is-loading');
		bar.style.width = '20%';
		// Two RAFs so the 20% width is committed before we ramp to 80% —
		// otherwise the browser may collapse them into a single transition
		// and the bar jumps straight to 80% without intermediate state.
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				bar.style.width = '80%';
			});
		});
	});

	document.addEventListener('astro:after-swap', () => {
		bar.style.width = '100%';
	});

	document.addEventListener('astro:page-load', () => {
		// Hold the 100% state for a moment so the eye can register a
		// "complete" state before the bar fades out. With a too-short
		// hold (the original 100 ms) the bar would leave the screen
		// before the user even saw it on a fast View Transition.
		window.setTimeout(() => {
			bar.classList.remove('is-loading');
			bar.classList.add('is-complete');
			window.setTimeout(() => {
				bar.style.width = '0';
				bar.classList.remove('is-complete');
			}, 700);
		}, 300);
	});
}

if (typeof document !== 'undefined') {
	setupPageLoadingBar();
}

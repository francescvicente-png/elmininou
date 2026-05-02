// IntersectionObserver-based scroll reveal.
//
// Observes any element marked with `.fade-in-on-scroll` OR
// `.clip-reveal` and flips `.is-visible` on it when 15% of the
// element enters the viewport (with a small bottom rootMargin so
// triggers a touch before the element is fully in view). The actual
// CSS transition lives next to each pattern (`global.css` + the
// matching wrapper component); this script is just the trigger.
//
// - Reduced-motion: every target is marked visible immediately so
//   content appears with no animation.
// - Re-runs on `astro:page-load` so View Transitions navigations pick
//   up newly-rendered targets on the next page.

const REVEAL_SELECTOR =
	'.fade-in-on-scroll, .clip-reveal, .drawn-border-host, .ed-rule, .editorial-pull-quote';

function setupScrollReveal() {
	const targets = document.querySelectorAll(REVEAL_SELECTOR);
	if (targets.length === 0) return;

	const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (reduce) {
		targets.forEach((el) => el.classList.add('is-visible'));
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					observer.unobserve(entry.target);
				}
			});
		},
		{
			threshold: 0.15,
			rootMargin: '0px 0px -10% 0px',
		},
	);

	targets.forEach((el) => {
		// Skip elements that were already revealed (e.g. by a previous run).
		if (el.classList.contains('is-visible')) return;
		observer.observe(el);
	});
}

if (typeof window !== 'undefined') {
	setupScrollReveal();
	document.addEventListener('astro:page-load', setupScrollReveal);
}

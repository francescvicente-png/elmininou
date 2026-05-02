// Number counter — animates `[data-counter]` elements from 0 to
// `data-counter-target` when they enter the viewport.
//
// - Honours `data-counter-decimals="N"` for fractional targets
//   (e.g. "4.9" → 1 decimal). Default 0.
// - Reduced motion: jumps straight to the target on first render.
// - One-shot: each element is unobserved after its first reveal.
// - Re-runs on `astro:page-load` so a counter that lives only on
//   the home (e.g. the highlights "4.9 de 5") still animates on the
//   next visit after a View Transition.
//
// HTML contract:
//
//   <span
//     data-counter
//     data-counter-target="4.9"
//     data-counter-decimals="1"
//     data-counter-duration="1500"
//   >0.0</span>

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

function formatValue(value: number, decimals: number, locale: string): string {
	return value.toLocaleString(locale, {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	});
}

function animateCounter(el: HTMLElement, locale: string) {
	const target = Number.parseFloat(el.dataset.counterTarget ?? '0');
	const decimals = Number.parseInt(el.dataset.counterDecimals ?? '0', 10);
	const duration = Number.parseInt(el.dataset.counterDuration ?? '1500', 10);

	if (Number.isNaN(target)) return;

	const start = performance.now();
	const initialValue = 0;

	const tick = (now: number) => {
		const elapsed = now - start;
		const progress = Math.min(1, elapsed / duration);
		const eased = easeOutQuart(progress);
		const value = initialValue + (target - initialValue) * eased;
		el.textContent = formatValue(value, decimals, locale);
		if (progress < 1) {
			requestAnimationFrame(tick);
		} else {
			// Snap to the exact target so floating-point drift doesn't
			// leave us at 4.8999… instead of 4.9.
			el.textContent = formatValue(target, decimals, locale);
		}
	};

	requestAnimationFrame(tick);
}

function setupNumberCounters() {
	if (typeof window === 'undefined') return;

	const elements = document.querySelectorAll<HTMLElement>(
		'[data-counter]:not([data-counter-done])',
	);
	if (elements.length === 0) return;

	const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const locale = document.documentElement.lang === 'es' ? 'es-ES' : 'ca-ES';

	if (reduce) {
		elements.forEach((el) => {
			const target = Number.parseFloat(el.dataset.counterTarget ?? '0');
			const decimals = Number.parseInt(el.dataset.counterDecimals ?? '0', 10);
			el.textContent = formatValue(target, decimals, locale);
			el.dataset.counterDone = 'true';
		});
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				const el = entry.target as HTMLElement;
				el.dataset.counterDone = 'true';
				animateCounter(el, locale);
				observer.unobserve(el);
			});
		},
		{ threshold: 0.4 },
	);

	elements.forEach((el) => observer.observe(el));
}

if (typeof document !== 'undefined') {
	setupNumberCounters();
	document.addEventListener('astro:page-load', setupNumberCounters);
}

// Before/After slider drag handler.
//
// One pointer-* listener handles mouse and touch alike. We use
// `setPointerCapture` so the drag continues even if the cursor
// leaves the slider rectangle — without it the user has to keep
// the cursor inside the box for the whole gesture.
//
// `touch-action: none` lives in the CSS so the browser never
// hijacks the gesture as a page scroll on touch devices.
//
// Keyboard: arrow keys nudge by 5%, Home/End jump to the extremes.
// Aria-valuenow updates so a screen-reader user knows where the
// divider sits.

const NUDGE = 5; // % per arrow press

function setupBeforeAfter() {
	if (typeof window === 'undefined') return;

	const sliders = document.querySelectorAll<HTMLElement>('[data-ba-slider]');

	sliders.forEach((slider) => {
		if (slider.dataset.bound === 'true') return;
		slider.dataset.bound = 'true';

		let dragging = false;

		function setPosition(percent: number) {
			const clamped = Math.max(0, Math.min(100, percent));
			slider.style.setProperty('--ba-x', `${clamped}%`);
			slider.setAttribute('aria-valuenow', String(Math.round(clamped)));
		}

		function setFromClientX(clientX: number) {
			const rect = slider.getBoundingClientRect();
			if (rect.width === 0) return;
			const percent = ((clientX - rect.left) / rect.width) * 100;
			setPosition(percent);
		}

		slider.addEventListener('pointerdown', (event) => {
			dragging = true;
			slider.setPointerCapture(event.pointerId);
			setFromClientX(event.clientX);
		});

		slider.addEventListener('pointermove', (event) => {
			if (!dragging) return;
			setFromClientX(event.clientX);
		});

		const stop = (event: PointerEvent) => {
			dragging = false;
			if (slider.hasPointerCapture(event.pointerId)) {
				slider.releasePointerCapture(event.pointerId);
			}
		};
		slider.addEventListener('pointerup', stop);
		slider.addEventListener('pointercancel', stop);

		slider.addEventListener('keydown', (event) => {
			const current = Number(slider.getAttribute('aria-valuenow') ?? '50');
			switch (event.key) {
				case 'ArrowLeft':
					event.preventDefault();
					setPosition(current - NUDGE);
					break;
				case 'ArrowRight':
					event.preventDefault();
					setPosition(current + NUDGE);
					break;
				case 'Home':
					event.preventDefault();
					setPosition(0);
					break;
				case 'End':
					event.preventDefault();
					setPosition(100);
					break;
			}
		});
	});
}

if (typeof document !== 'undefined') {
	setupBeforeAfter();
	document.addEventListener('astro:page-load', setupBeforeAfter);
}

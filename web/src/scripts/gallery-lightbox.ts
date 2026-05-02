// Gallery lightbox — opens a fullscreen <dialog> when the user clicks
// a thumbnail tagged with `data-lightbox-trigger`. Uses the View
// Transitions API on browsers that support it so the thumbnail
// morphs into the fullscreen image instead of popping in.
//
// Architecture:
//   - Triggers (thumbnails) carry `data-lightbox-trigger` and
//     `data-lightbox-index="N"`. They also have an inline
//     `view-transition-name: gallery-trigger-N` set by the markup so
//     the browser knows which element on the source page corresponds
//     to which on the destination.
//   - Slides (full images inside the dialog) start without a
//     `view-transition-name`. When opening, we set the active slide's
//     view-transition-name to `gallery-trigger-N` (matching the
//     thumbnail) inside the `startViewTransition` callback. The
//     browser's compositor interpolates between the two.
//   - On close, we keep the names set on the active slide and the
//     active thumbnail so the reverse morph plays. We clear them
//     after the transition finishes so future opens are clean.
//
// View Transitions are progressive: when not supported (Firefox today,
// older Safari), the dialog still opens as a normal modal. No JS
// animation fallback needed — `<dialog>` showModal already gives us a
// crisp open.
//
// Mobile (`pointer: coarse` or narrow viewport) is handled by CSS:
//   - The track is `overflow-x: auto` with `scroll-snap-type: x
//     mandatory`, so the user swipes between slides natively.
//   - The arrow buttons hide via media query.
//
// The script keeps state in `window.location.hash` lightly: open
// state is NOT pushed to history (the dialog is not a route, and
// stacking a hash for every lightbox open would litter the back
// stack). ESC and the close button do the work.

import { mouse } from './mouse-tracker';

interface LightboxState {
	dialog: HTMLDialogElement;
	track: HTMLElement;
	slides: HTMLElement[];
	dots: HTMLElement[];
	activeIndex: number;
	currentTriggerName: string | null;
}

let state: LightboxState | null = null;

function setActiveSlide(index: number) {
	if (!state) return;
	const clamped = Math.max(0, Math.min(state.slides.length - 1, index));
	state.activeIndex = clamped;
	state.dialog.style.setProperty('--lightbox-index', String(clamped));

	state.dots.forEach((dot, idx) => {
		if (idx === clamped) dot.dataset.active = 'true';
		else delete dot.dataset.active;
	});

	// Mobile mode: scroll the slide into view (the desktop transform
	// is overridden by media query, so we have to trigger a real
	// scroll). The browser's smooth scroll honours reduced-motion.
	const isCoarse = window.matchMedia('(pointer: coarse)').matches;
	if (isCoarse) {
		state.slides[clamped]?.scrollIntoView({
			behavior: 'smooth',
			inline: 'start',
			block: 'nearest',
		});
	}
}

function clearViewTransitionNames() {
	if (!state) return;
	state.slides.forEach((slide) => {
		const img = slide.querySelector<HTMLElement>('.lightbox-img');
		if (img) img.style.viewTransitionName = '';
	});
	if (state.currentTriggerName) {
		document
			.querySelectorAll<HTMLElement>(
				`[data-lightbox-trigger][data-lightbox-vtn='${state.currentTriggerName}']`,
			)
			.forEach((trigger) => {
				trigger.style.viewTransitionName = '';
			});
		state.currentTriggerName = null;
	}
}

function setViewTransitionNamesFor(index: number, name: string) {
	if (!state) return;
	const slideImg = state.slides[index]?.querySelector<HTMLElement>(
		'.lightbox-img',
	);
	if (slideImg) slideImg.style.viewTransitionName = name;

	const trigger = document.querySelector<HTMLElement>(
		`[data-lightbox-trigger][data-lightbox-index='${index}']`,
	);
	if (trigger) trigger.style.viewTransitionName = name;

	state.currentTriggerName = name;
}

function openLightboxAt(index: number) {
	if (!state) return;

	const triggerName = `gallery-trigger-${index}`;

	// Pre-position the track so the active slide is showing BEFORE
	// the view transition snapshots. Without this the browser
	// snapshots the lightbox at index 0 and the morph lands wrong.
	setActiveSlide(index);

	const open = () => {
		if (!state) return;
		state.dialog.showModal();
		setViewTransitionNamesFor(index, triggerName);
	};

	const supportsVT =
		typeof (document as unknown as {
			startViewTransition?: (cb: () => void) => { finished: Promise<void> };
		}).startViewTransition === 'function';

	const reduceMotion = window.matchMedia(
		'(prefers-reduced-motion: reduce)',
	).matches;

	if (supportsVT && !reduceMotion) {
		const transition = (
			document as unknown as {
				startViewTransition: (cb: () => void) => { finished: Promise<void> };
			}
		).startViewTransition(open);
		transition.finished.finally(() => {
			// Keep the names on so the close transition can run; we
			// only clear them when the user actually closes.
		});
	} else {
		open();
	}
}

function closeLightbox() {
	if (!state) return;

	const close = () => {
		if (!state) return;
		state.dialog.close();
	};

	const supportsVT =
		typeof (document as unknown as {
			startViewTransition?: (cb: () => void) => { finished: Promise<void> };
		}).startViewTransition === 'function';

	const reduceMotion = window.matchMedia(
		'(prefers-reduced-motion: reduce)',
	).matches;

	if (supportsVT && !reduceMotion) {
		const transition = (
			document as unknown as {
				startViewTransition: (cb: () => void) => { finished: Promise<void> };
			}
		).startViewTransition(close);
		transition.finished.finally(() => {
			clearViewTransitionNames();
		});
	} else {
		close();
		clearViewTransitionNames();
	}
}

function setupLightbox() {
	if (typeof window === 'undefined') return;

	const dialog = document.querySelector<HTMLDialogElement>(
		'[data-gallery-lightbox]',
	);
	if (!dialog) return;
	if (dialog.dataset.bound === 'true') return;
	dialog.dataset.bound = 'true';

	const track = dialog.querySelector<HTMLElement>('[data-lightbox-track]');
	if (!track) return;

	const slides = Array.from(
		dialog.querySelectorAll<HTMLElement>('.lightbox-slide'),
	);
	const dots = Array.from(
		dialog.querySelectorAll<HTMLElement>('[data-lightbox-dot]'),
	);

	state = {
		dialog,
		track,
		slides,
		dots,
		activeIndex: 0,
		currentTriggerName: null,
	};

	// Click on a thumbnail trigger anywhere in the document.
	document.addEventListener('click', (event) => {
		const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
			'[data-lightbox-trigger]',
		);
		if (!target) return;
		event.preventDefault();
		const idx = Number(target.dataset.lightboxIndex ?? '0');
		openLightboxAt(idx);
	});

	dialog
		.querySelector<HTMLElement>('[data-lightbox-close]')
		?.addEventListener('click', closeLightbox);
	dialog
		.querySelector<HTMLElement>('[data-lightbox-prev]')
		?.addEventListener('click', () => {
			if (!state) return;
			setActiveSlide(state.activeIndex - 1);
		});
	dialog
		.querySelector<HTMLElement>('[data-lightbox-next]')
		?.addEventListener('click', () => {
			if (!state) return;
			setActiveSlide(state.activeIndex + 1);
		});

	// Click outside the enlarged photo (dark margins, caption, track) or
	// on the dialog chrome closes — same UX as the close button. The
	// dialog element rarely receives `event.target === dialog` because
	// the slide track fills the viewport, so we key off interactive
	// exclusions instead.
	dialog.addEventListener(
		'click',
		(event) => {
			const target = event.target;
			if (!(target instanceof HTMLElement)) return;
			if (target.closest('button')) return;
			if (target.closest('[data-lightbox-dots]')) return;
			if (target.closest('.lightbox-slide .lightbox-img')) return;
			closeLightbox();
		},
		true,
	);

	dialog.addEventListener('keydown', (event) => {
		if (!state) return;
		if (event.key === 'ArrowLeft') {
			setActiveSlide(state.activeIndex - 1);
		} else if (event.key === 'ArrowRight') {
			setActiveSlide(state.activeIndex + 1);
		}
		// ESC is handled by <dialog> default behaviour, which fires
		// 'cancel' before close — we listen below to clear VT names.
	});

	dialog.addEventListener('cancel', () => {
		// ESC pressed. We can't wrap this in startViewTransition (the
		// cancellation is synchronous), so we just clear the names
		// after the close paints.
		setTimeout(() => {
			clearViewTransitionNames();
		}, 0);
	});

	// On scroll-snap (mobile), the dot indicators should follow the
	// scroll position. IntersectionObserver on each slide tracks
	// which one is mostly visible.
	const slideObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting && entry.intersectionRatio > 0.55) {
					const idx = Number(
						(entry.target as HTMLElement).dataset.lightboxSlide ?? '0',
					);
					if (state && state.activeIndex !== idx) {
						state.activeIndex = idx;
						state.dots.forEach((dot, i) => {
							if (i === idx) dot.dataset.active = 'true';
							else delete dot.dataset.active;
						});
					}
				}
			});
		},
		{ root: track, threshold: [0, 0.55, 1] },
	);
	slides.forEach((slide) => slideObserver.observe(slide));

	// Initialise dot 0 active.
	if (dots[0]) dots[0].dataset.active = 'true';

	// Defensive: silence unused import warning while keeping the
	// singleton imported (other Sprint B/C scripts share it).
	void mouse;
}

if (typeof document !== 'undefined') {
	setupLightbox();
	document.addEventListener('astro:page-load', setupLightbox);
}

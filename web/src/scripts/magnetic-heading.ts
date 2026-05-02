// Magnetic heading — per-character fade-in reveal on load + per-
// character magnetic pull towards the cursor.
//
// Approach (DOM):
//   <h1 data-magnetic-heading>
//     <span class="magnetic-word">
//       <span class="magnetic-char" style="--reveal-delay: …ms">
//         <span class="magnetic-char-inner">B</span>
//       </span>
//       …
//     </span>
//     " "
//     <span class="magnetic-word">…</span>
//   </h1>
//
//   - The word wrapper keeps each word atomic so the line never
//     breaks mid-word.
//   - Outer `.magnetic-char` owns the magnetic transform (220 ms CSS
//     transition for smoothing).
//   - Inner `.magnetic-char-inner` owns the reveal transform (600 ms
//     transition with per-character `--reveal-delay` stagger).
//   - Two transforms on two elements compose naturally — neither
//     fights the other for the `transform` property.
//
// SEO-safe: HTML ships with the heading as plain text. JS wraps after
// page-load; crawlers, RSS readers and "view source" still see the
// heading verbatim.
//
// Reveal: two RAFs after the wrap so the initial (hidden) state
// paints, then `.is-revealed` is added to every char and the staggered
// transitions play. Stagger = 30 ms per char — same feel as the v1
// split-text reveal the user preferred.
//
// Magnet:
//   - RAF loop measures every char's centre once after layout settles
//     (and on resize), then per frame writes `--magnet-x` /
//     `--magnet-y` based on cursor distance.
//   - Radius 220 px, strength 0.18 — same as the previous per-word
//     version, scaled the same way per char.
//   - Off-window: snap all chars to (0, 0).
//
// Bail-outs:
//   - prefers-reduced-motion → reveal happens instantly (CSS rule
//     forces opacity 1, transform none); magnet RAF loop skipped.
//   - pointer:coarse → reveal still plays (motion is allowed); magnet
//     loop skipped (no cursor to magnetise from).
//
// Idempotent on re-runs (`data-magnetic-bound` flag) — important
// because the heading lives inside <main> which gets swapped on
// View Transitions, so this script naturally runs again after
// `astro:page-load`.

import { mouse } from './mouse-tracker';

const RADIUS = 220; // px — cursor must be inside this to attract
const STRENGTH = 0.18;
const REVEAL_STAGGER_MS = 30;

interface MagneticChar {
	el: HTMLElement;
	cx: number;
	cy: number;
}

interface MagneticHeading {
	root: HTMLElement;
	chars: MagneticChar[];
	measureScheduled: boolean;
}

const headings = new Set<MagneticHeading>();

function measureHeading(h: MagneticHeading) {
	h.chars.forEach((c) => {
		const rect = c.el.getBoundingClientRect();
		c.cx = rect.left + rect.width / 2;
		c.cy = rect.top + rect.height / 2;
	});
	h.measureScheduled = false;
}

function scheduleMeasure(h: MagneticHeading) {
	if (h.measureScheduled) return;
	h.measureScheduled = true;
	requestAnimationFrame(() => measureHeading(h));
}

function setupMagneticHeading() {
	if (typeof window === 'undefined') return;

	const reduceMotion = window.matchMedia(
		'(prefers-reduced-motion: reduce)',
	).matches;
	const isCoarse = window.matchMedia('(pointer: coarse)').matches;

	const elements = document.querySelectorAll<HTMLElement>(
		'[data-magnetic-heading]',
	);

	elements.forEach((el) => {
		// Already wrapped on a previous run — re-trigger reveal in case
		// View Transitions reset the DOM state, then bail.
		if (el.dataset.magneticBound === 'true') {
			const chars = el.querySelectorAll<HTMLElement>('.magnetic-char');
			if (reduceMotion) {
				chars.forEach((c) => c.classList.add('is-revealed'));
			} else {
				requestAnimationFrame(() => {
					requestAnimationFrame(() => {
						chars.forEach((c) => c.classList.add('is-revealed'));
					});
				});
			}
			return;
		}
		el.dataset.magneticBound = 'true';

		// Tokenise into words. Multi-whitespace runs collapse into a
		// single space, matching the rendered heading.
		const original = el.textContent ?? '';
		const tokens = original.split(/\s+/).filter(Boolean);
		el.innerHTML = '';

		const charEls: HTMLElement[] = [];
		let charIdx = 0;

		tokens.forEach((word, wordIdx) => {
			const wordSpan = document.createElement('span');
			wordSpan.className = 'magnetic-word';

			Array.from(word).forEach((char) => {
				const outer = document.createElement('span');
				outer.className = 'magnetic-char';
				outer.style.setProperty(
					'--reveal-delay',
					`${charIdx * REVEAL_STAGGER_MS}ms`,
				);

				const inner = document.createElement('span');
				inner.className = 'magnetic-char-inner';
				inner.textContent = char;

				outer.appendChild(inner);
				wordSpan.appendChild(outer);
				charEls.push(outer);
				charIdx += 1;
			});

			el.appendChild(wordSpan);

			// Keep the inter-word space outside the word wrapper so the
			// browser is free to break the line there.
			if (wordIdx < tokens.length - 1) {
				el.appendChild(document.createTextNode(' '));
			}
		});

		// Trigger the staggered reveal. Two RAFs guarantee the initial
		// (hidden) state paints before the transition kicks in.
		if (reduceMotion) {
			charEls.forEach((c) => c.classList.add('is-revealed'));
		} else {
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					charEls.forEach((c) => c.classList.add('is-revealed'));
				});
			});
		}

		// Magnet doesn't run under reduced-motion or on touch.
		if (reduceMotion || isCoarse) return;

		const heading: MagneticHeading = {
			root: el,
			chars: charEls.map((c) => ({ el: c, cx: 0, cy: 0 })),
			measureScheduled: false,
		};
		headings.add(heading);
		scheduleMeasure(heading);
	});
}

function tickMagnet() {
	requestAnimationFrame(tickMagnet);
	if (!mouse.inside || headings.size === 0) {
		// Pointer is off-window or no headings yet — snap chars back.
		headings.forEach((h) => {
			h.chars.forEach((c) => {
				c.el.style.setProperty('--magnet-x', '0px');
				c.el.style.setProperty('--magnet-y', '0px');
			});
		});
		return;
	}
	headings.forEach((h) => {
		h.chars.forEach((c) => {
			const dx = mouse.x - c.cx;
			const dy = mouse.y - c.cy;
			const dist = Math.hypot(dx, dy);
			if (dist > RADIUS) {
				c.el.style.setProperty('--magnet-x', '0px');
				c.el.style.setProperty('--magnet-y', '0px');
				return;
			}
			// Linear falloff: closer = stronger pull.
			const falloff = 1 - dist / RADIUS;
			const tx = dx * STRENGTH * falloff;
			const ty = dy * STRENGTH * falloff;
			c.el.style.setProperty('--magnet-x', `${tx.toFixed(1)}px`);
			c.el.style.setProperty('--magnet-y', `${ty.toFixed(1)}px`);
		});
	});
}

if (typeof document !== 'undefined') {
	setupMagneticHeading();
	document.addEventListener('astro:page-load', setupMagneticHeading);
	// Char centres move with scroll; the magnet RAF uses stale c.x/c.y until
	// the next resize unless we re-measure on scroll (coalesced rAF).
	let scrollMeasureRaf: number | null = null;
	window.addEventListener(
		'scroll',
		() => {
			if (scrollMeasureRaf !== null) return;
			scrollMeasureRaf = requestAnimationFrame(() => {
				scrollMeasureRaf = null;
				headings.forEach(scheduleMeasure);
			});
		},
		{ passive: true },
	);
	window.addEventListener('resize', () => {
		headings.forEach(scheduleMeasure);
	});
	requestAnimationFrame(tickMagnet);
}

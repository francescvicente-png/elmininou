// Image trail — small thumbnails of gallery images spawn at the
// cursor while it hovers any link tagged `data-nav-trail` and fade
// up/out. Currently used by the "Galeria" link in the header AND
// the "Veure tota la galeria" link in the home gallery preview.
//
// Image URLs come from the link's `data-trail-images` attribute,
// populated server-side using astro:assets' `getImage()` so the URLs
// are deterministic and cache-friendly.
//
// Multi-link design: each tagged link can ship its own image set in
// its data attribute. The active link's URL pool is read on
// `mouseenter`. Hovering a different link rotates the pool. Today
// both consumers ship the same 5 images, but this is per-link by
// design (a future "products" trail could ship product shots).
//
// Spawn cadence: every ~90 ms while the cursor is over an active
// link. Each thumb lives ~800 ms, animated by a CSS keyframe (no JS
// animation per frame).
//
// Bail-outs: pointer:coarse (no hover) and reduced-motion. The CSS
// also has a `display: none` fallback so even if the script booted
// somehow on a touch device, nothing would render.

import { mouse } from './mouse-tracker';

const SPAWN_INTERVAL_MS = 90;
const THUMB_LIFETIME_MS = 800;
const RANDOM_OFFSET_PX = 18;

let trailing = false;
let lastSpawn = 0;
let activeImageUrls: string[] = [];
let imageIndex = 0;

function spawnThumb() {
	if (activeImageUrls.length === 0) return;
	const url = activeImageUrls[imageIndex % activeImageUrls.length];
	imageIndex += 1;
	if (!url) return;

	const dx = (Math.random() - 0.5) * 2 * RANDOM_OFFSET_PX;
	const dy = (Math.random() - 0.5) * 2 * RANDOM_OFFSET_PX;

	const thumb = document.createElement('img');
	thumb.src = url;
	thumb.alt = '';
	thumb.setAttribute('aria-hidden', 'true');
	thumb.className = 'nav-trail-thumb';
	thumb.style.left = `${mouse.x + dx}px`;
	thumb.style.top = `${mouse.y + dy}px`;
	// Random rotation so the trail doesn't read like a stack of
	// identical cards. Range plus/minus 8 degrees.
	const rot = (Math.random() - 0.5) * 16;
	thumb.style.setProperty('--trail-rot', `${rot.toFixed(1)}deg`);

	document.body.appendChild(thumb);
	window.setTimeout(() => thumb.remove(), THUMB_LIFETIME_MS);
}

/**
 * Re-confirms the cursor is still over a `[data-nav-trail]` link by
 * looking up the element at the current mouse position. This is the
 * defence against the bug where `mouseleave` never fires:
 *
 *   - the shy header translates the link off-screen (CSS transform
 *     changes the hit-test box but doesn't always emit a mouseleave),
 *   - or the link is the "Veure tota la galeria" link inside the
 *     home-only `<GalleryPreview>` and the user clicks through to
 *     /galeria/ — the link is removed from the DOM mid-transition,
 *     no mouseleave is dispatched, so `trailing` would stay `true`
 *     forever and the trail would follow the cursor across every
 *     page after that.
 *
 * Calling this on each tick is cheap (one elementFromPoint per
 * frame, and only when `trailing` is on). If the cursor isn't over a
 * tagged ancestor, we flip `trailing` off — same effect as a real
 * mouseleave.
 */
function cursorIsOverTrailLink(): boolean {
	if (typeof document === 'undefined') return false;
	const el = document.elementFromPoint(mouse.x, mouse.y);
	if (!el) return false;
	return Boolean(
		(el as Element).closest('[data-nav-trail]'),
	);
}

function tick() {
	requestAnimationFrame(tick);
	if (!trailing) return;

	// Defensive: even though mouseleave should clear `trailing`, a
	// number of corner cases can leave it stuck on (see comment on
	// cursorIsOverTrailLink). Verify each frame and bail out if the
	// cursor is no longer over a tagged link.
	if (!cursorIsOverTrailLink()) {
		trailing = false;
		activeImageUrls = [];
		return;
	}

	const now = performance.now();
	if (now - lastSpawn < SPAWN_INTERVAL_MS) return;
	lastSpawn = now;
	spawnThumb();
}

function parseUrls(raw: string | undefined): string[] {
	if (!raw) return [];
	try {
		const parsed = JSON.parse(raw);
		if (Array.isArray(parsed)) {
			return parsed.filter((s): s is string => typeof s === 'string');
		}
	} catch {
		// fall through
	}
	return [];
}

function setupNavTrail() {
	if (typeof window === 'undefined') return;
	if (window.matchMedia('(pointer: coarse)').matches) return;
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	const links = document.querySelectorAll<HTMLElement>('[data-nav-trail]');

	links.forEach((link) => {
		if (link.dataset.trailBound === 'true') return;
		link.dataset.trailBound = 'true';

		link.addEventListener('mouseenter', () => {
			activeImageUrls = parseUrls(link.dataset.trailImages);
			trailing = activeImageUrls.length > 0;
		});
		link.addEventListener('mouseleave', () => {
			trailing = false;
		});
	});
}

if (typeof document !== 'undefined') {
	setupNavTrail();
	document.addEventListener('astro:page-load', setupNavTrail);

	// Defensive belt: reset the trailing flag on every view-transition
	// boundary. Combined with the per-tick `cursorIsOverTrailLink`
	// check, this guarantees no stale state survives a navigation —
	// even if a mouseleave was missed because the link was removed
	// mid-transition.
	document.addEventListener('astro:before-preparation', () => {
		trailing = false;
		activeImageUrls = [];
	});

	requestAnimationFrame(tick);
}

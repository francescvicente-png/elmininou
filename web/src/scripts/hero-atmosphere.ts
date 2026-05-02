// Hero atmosphere — 3D tilt + cursor spotlight on the hero section.
//
// Tilt and spotlight read pointer position vs the section box. IMPORTANT:
// we only update on `pointermove` inside the section, not on a continuous
// on a continuous `requestAnimationFrame` loop. A per-frame loop was
// coupling scroll to tilt: as the user scrolls, `getBoundingClientRect()`
// moves while the cursor stays fixed in viewport coordinates, so the
// computed tilt drifted every frame — the photo looked like parallax.
//
// Bail-outs: pointer:coarse, prefers-reduced-motion.

const MAX_TILT_DEG = 2;

function applyAtmosphere(section: HTMLElement, clientX: number, clientY: number): void {
	const rect = section.getBoundingClientRect();
	const relX = clientX - rect.left;
	const relY = clientY - rect.top;

	if (relX < 0 || relY < 0 || relX > rect.width || relY > rect.height) {
		section.style.setProperty('--tilt-x', '0deg');
		section.style.setProperty('--tilt-y', '0deg');
		section.style.setProperty('--spot-x', '50%');
		section.style.setProperty('--spot-y', '50%');
		return;
	}

	const nx = (relX / rect.width) * 2 - 1;
	const ny = (relY / rect.height) * 2 - 1;

	section.style.setProperty('--tilt-y', `${(nx * MAX_TILT_DEG).toFixed(2)}deg`);
	section.style.setProperty('--tilt-x', `${(-ny * MAX_TILT_DEG).toFixed(2)}deg`);
	section.style.setProperty('--spot-x', `${((relX / rect.width) * 100).toFixed(2)}%`);
	section.style.setProperty('--spot-y', `${((relY / rect.height) * 100).toFixed(2)}%`);
}

function resetAtmosphere(section: HTMLElement): void {
	section.style.removeProperty('--tilt-x');
	section.style.removeProperty('--tilt-y');
	section.style.removeProperty('--spot-x');
	section.style.removeProperty('--spot-y');
}

let atmosphereAbort: AbortController | null = null;

function setupHeroAtmosphere(): void {
	if (typeof window === 'undefined') return;

	const section = document.querySelector<HTMLElement>('[data-hero-atmosphere]');
	if (!section) {
		atmosphereAbort?.abort();
		atmosphereAbort = null;
		return;
	}

	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const isCoarse = window.matchMedia('(pointer: coarse)').matches;

	if (reduceMotion || isCoarse) {
		atmosphereAbort?.abort();
		atmosphereAbort = null;
		resetAtmosphere(section);
		return;
	}

	atmosphereAbort?.abort();
	atmosphereAbort = new AbortController();
	const { signal } = atmosphereAbort;

	const onPointerMove = (event: PointerEvent) => {
		applyAtmosphere(section, event.clientX, event.clientY);
	};

	const onPointerLeave = () => {
		resetAtmosphere(section);
	};

	section.addEventListener('pointermove', onPointerMove, { passive: true, signal });
	section.addEventListener('pointerleave', onPointerLeave, { passive: true, signal });
}

if (typeof document !== 'undefined') {
	document.addEventListener('astro:before-preparation', () => {
		atmosphereAbort?.abort();
		atmosphereAbort = null;
	});
	document.addEventListener('astro:page-load', setupHeroAtmosphere);
	setupHeroAtmosphere();
}

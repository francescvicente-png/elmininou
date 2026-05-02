// Storytelling sticky-scroll progress tracker.
//
// While the outer section is in view, compute scroll progress and
// flip `data-story-scene-active` on the matching scene + a
// `data-active-scene` index on the section root (so CSS can tint
// the background per scene).
//
// Activation gate matches the CSS @media: lg viewport AND no
// reduced-motion preference. On miss, the script clears any active
// flags so the markup falls through to the default (every scene
// shown as a normal block one after another).
//
// Why a passive scroll listener with rAF coalesce:
//   The wrapper is "active" for hundreds of viewport pixels. We need
//   one update per displayed frame, no more — passive + rAF gate
//   gives us that without blocking the main thread.

interface StoryRoot {
	root: HTMLElement;
	stage: HTMLElement;
	scenes: HTMLElement[];
}

let roots: StoryRoot[] = [];
let pending = false;

function applyActiveScenes() {
	pending = false;
	const viewportHeight = window.innerHeight;

	for (const { root, stage, scenes } of roots) {
		const rect = stage.getBoundingClientRect();
		const total = rect.height - viewportHeight;
		if (total <= 0) continue;

		const scrolled = -rect.top;
		const progress = Math.max(0, Math.min(0.999, scrolled / total));
		const idx = Math.min(
			scenes.length - 1,
			Math.floor(progress * scenes.length),
		);

		root.dataset.activeScene = String(idx);

		scenes.forEach((scene, i) => {
			if (i === idx) scene.dataset.storySceneActive = 'true';
			else delete scene.dataset.storySceneActive;
		});
	}
}

function onScroll() {
	if (pending) return;
	pending = true;
	requestAnimationFrame(applyActiveScenes);
}

function setupStorytelling() {
	if (typeof window === 'undefined') return;

	const desktop = window.matchMedia('(min-width: 1024px)').matches;
	const motionOk = window.matchMedia(
		'(prefers-reduced-motion: no-preference)',
	).matches;

	if (!desktop || !motionOk) {
		// Clear stale flags so the fallback layout reads clean.
		document
			.querySelectorAll<HTMLElement>('[data-storytelling]')
			.forEach((root) => {
				delete root.dataset.activeScene;
				root
					.querySelectorAll<HTMLElement>('[data-story-scene-index]')
					.forEach((scene) => {
						delete scene.dataset.storySceneActive;
					});
			});
		roots = [];
		return;
	}

	roots = [];
	document
		.querySelectorAll<HTMLElement>('[data-storytelling]')
		.forEach((root) => {
			const stage = root.querySelector<HTMLElement>('.storytelling-stage');
			const scenes = Array.from(
				root.querySelectorAll<HTMLElement>('[data-story-scene-index]'),
			);
			if (!stage || scenes.length === 0) return;
			roots.push({ root, stage, scenes });
		});

	if (roots.length > 0) applyActiveScenes();
}

if (typeof document !== 'undefined') {
	setupStorytelling();
	document.addEventListener('astro:page-load', setupStorytelling);
	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', () => {
		setupStorytelling();
		onScroll();
	});
}

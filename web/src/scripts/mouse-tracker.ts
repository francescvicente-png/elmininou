// Mouse tracker — single source of truth for the pointer position.
//
// Several scripts need the same data (cursor coordinates + "is the
// pointer inside the viewport"): hero tilt, hero spotlight, magnetic
// letters, nav image trail. Each one keeping its own `mousemove`
// listener would (a) duplicate work, (b) get out of sync when one
// listener runs before another, (c) make it harder to short-circuit
// on touch / reduced-motion centrally.
//
// This module is the singleton. Every consumer imports `mouse` and
// reads `.x`, `.y`, `.inside` per frame — no events, no callbacks,
// just shared mutable state. Reads are cheap; the whole point is to
// avoid the listener overhead per consumer.
//
// We do NOT short-circuit listeners under `pointer: coarse` or
// reduced-motion: the cost is one assignment per move event and
// consumers that care decide for themselves. Touch devices fire a
// few `mousemove`s during taps, but at most a handful — negligible.

export interface MousePosition {
	/** Viewport-relative x in CSS pixels. */
	x: number;
	/** Viewport-relative y in CSS pixels. */
	y: number;
	/** True after at least one `mousemove`, false while the pointer is
	 *  off-window. Off-window state is updated on document
	 *  mouseleave/enter. */
	inside: boolean;
}

export const mouse: MousePosition = {
	x: 0,
	y: 0,
	inside: false,
};

if (typeof window !== 'undefined') {
	window.addEventListener(
		'mousemove',
		(event) => {
			mouse.x = event.clientX;
			mouse.y = event.clientY;
			mouse.inside = true;
		},
		{ passive: true },
	);
	document.addEventListener('mouseleave', () => {
		mouse.inside = false;
	});
	document.addEventListener('mouseenter', () => {
		mouse.inside = true;
	});
}

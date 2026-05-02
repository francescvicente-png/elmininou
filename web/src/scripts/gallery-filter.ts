// Gallery filter — show/hide gallery items by category.
//
// Looks for a `[data-gallery-filter]` toolbar of buttons (each with
// `data-filter="<categoryId>"`) and the closest following
// `[data-gallery-grid]` container. Clicking a pill flips its
// `is-active` state and toggles `is-filtered-out` on each item whose
// `data-categories` doesn't include the active filter.
//
// The "all" filter (data-filter="all") is special: it shows every
// item regardless of categories.
//
// Idempotent across View Transitions via `data-gallery-filter-bound`.
// Re-evaluates on `astro:page-load` so SPA navigation re-binds.

interface Bindings {
	toolbar: HTMLElement;
	pills: HTMLElement[];
	grid: HTMLElement;
	items: HTMLElement[];
}

function findBindings(): Bindings | null {
	const toolbar = document.querySelector<HTMLElement>('[data-gallery-filter]');
	if (!toolbar) return null;
	if (toolbar.dataset.galleryFilterBound === 'true') return null;
	const grid = toolbar.parentElement?.querySelector<HTMLElement>(
		'[data-gallery-grid]',
	);
	if (!grid) return null;
	const pills = Array.from(
		toolbar.querySelectorAll<HTMLElement>('[data-filter]'),
	);
	const items = Array.from(
		grid.querySelectorAll<HTMLElement>('[data-gallery-item]'),
	);
	return { toolbar, pills, grid, items };
}

function applyFilter(items: HTMLElement[], filter: string): void {
	for (const item of items) {
		if (filter === 'all') {
			item.classList.remove('is-filtered-out');
			continue;
		}
		const cats = (item.dataset.categories ?? '').split(/\s+/).filter(Boolean);
		const visible = cats.includes(filter);
		item.classList.toggle('is-filtered-out', !visible);
	}
}

function setupGalleryFilter() {
	if (typeof document === 'undefined') return;
	const bindings = findBindings();
	if (!bindings) return;
	const { toolbar, pills, items } = bindings;

	toolbar.dataset.galleryFilterBound = 'true';

	toolbar.addEventListener('click', (event) => {
		const target = event.target as HTMLElement | null;
		if (!target) return;
		const pill = target.closest<HTMLElement>('[data-filter]');
		if (!pill) return;
		const filter = pill.dataset.filter ?? 'all';

		// Flip pill active state.
		for (const p of pills) {
			const isActive = p === pill;
			p.classList.toggle('is-active', isActive);
			p.setAttribute('aria-pressed', isActive ? 'true' : 'false');
		}

		applyFilter(items, filter);
	});
}

if (typeof document !== 'undefined') {
	setupGalleryFilter();
	document.addEventListener('astro:page-load', setupGalleryFilter);
}

// Idempotent mobile-menu wiring.
//
// The header is currently rendered with `transition:persist`, so the same
// <button> and <nav> elements survive across View Transitions. That means
// the listener added on first load stays alive for every subsequent route.
// We still re-run setup on `astro:page-load` as a defensive measure: if
// `transition:persist` is ever removed from the header, the script will
// keep working without code changes.
//
// The `data-bound` flag prevents binding the same listener twice when the
// element does persist.
//
// Behaviour added in the UX polish pass:
//   - Body scroll-lock while the menu is open (otherwise the underlying
//     home keeps scrolling under the open menu — confusing on mobile).
//   - ESC closes the menu (matches the dialog convention users expect).
//   - Click on any nav link closes the menu BEFORE the navigation
//     completes, so when the new page renders the menu is already shut
//     and the toggle icon is back to the hamburger.
//
// Note: the open/close icon swap is CSS-only (see Header.astro <style>
// block, driven by `aria-expanded`). The script only flips the attribute.

function setupMobileMenu() {
	const button = document.querySelector<HTMLButtonElement>(
		'[data-mobile-menu-toggle]',
	);
	const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
	if (!button || !menu) return;
	if (button.dataset.bound === 'true') return;
	button.dataset.bound = 'true';

	const setOpen = (open: boolean) => {
		menu.classList.toggle('hidden', !open);
		button.setAttribute('aria-expanded', String(open));
		// Lock the underlying scroll while the menu is open. We restore
		// the original `overflow` on close so we don't fight any other
		// code that might have set it.
		if (open) {
			document.body.dataset.mobileMenuPrevOverflow =
				document.body.style.overflow ?? '';
			document.body.style.overflow = 'hidden';
		} else {
			const prev = document.body.dataset.mobileMenuPrevOverflow;
			if (prev !== undefined) {
				document.body.style.overflow = prev;
				delete document.body.dataset.mobileMenuPrevOverflow;
			} else {
				document.body.style.overflow = '';
			}
		}
	};

	button.addEventListener('click', () => {
		const willOpen = menu.classList.contains('hidden');
		setOpen(willOpen);
	});

	// ESC closes — only when the menu is currently open. Listening on
	// document covers the case where focus has wandered out of the menu
	// after opening (e.g. user tabbed back to the trigger).
	document.addEventListener('keydown', (event) => {
		if (event.key !== 'Escape') return;
		if (button.getAttribute('aria-expanded') !== 'true') return;
		setOpen(false);
		button.focus();
	});

	// Clicking any link inside the menu closes it before the nav
	// happens. View Transitions navigation is async (the new page paints
	// after a small delay), so without this the user would see the menu
	// stay open across the transition.
	menu.querySelectorAll<HTMLAnchorElement>('a').forEach((link) => {
		link.addEventListener('click', () => {
			setOpen(false);
		});
	});
}

if (typeof document !== 'undefined') {
	setupMobileMenu();
	document.addEventListener('astro:page-load', setupMobileMenu);
}

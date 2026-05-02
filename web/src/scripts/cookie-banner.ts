// Cookie consent banner controller.
//
// The banner is rendered server-side with the `hidden` attribute on the
// root, so users with `cookie-consent` already set in localStorage never
// see a flash of the banner. We reveal it only when there's no recorded
// decision yet.
//
// IMPORTANT — current state: this site does NOT load any tracking
// script that requires consent. The banner exists for LSSI compliance
// and to record the user's stated preference now so that, if analytics
// or other non-essential cookies are introduced later, the consent
// infrastructure is already in place. When that happens, gate the
// loader of the new script behind a check of the stored value.
//
// TODO: when adding analytics / non-essential cookies, gate them on
//       window.localStorage.getItem('cookie-consent') === 'accepted'.
//
// The script is idempotent (data-bound flag) and survives View
// Transitions thanks to <CookieBanner transition:persist /> in
// BaseLayout — so it only ever runs setup once per real page load.

const STORAGE_KEY = 'cookie-consent';

type ConsentValue = 'accepted' | 'rejected' | null;

function readConsent(): ConsentValue {
	try {
		const value = window.localStorage.getItem(STORAGE_KEY);
		if (value === 'accepted' || value === 'rejected') return value;
		return null;
	} catch {
		// localStorage can throw in privacy-restricted modes — treat as
		// "no decision" so the banner appears, which is the safer default.
		return null;
	}
}

function writeConsent(value: 'accepted' | 'rejected') {
	try {
		window.localStorage.setItem(STORAGE_KEY, value);
	} catch {
		// Same as above — silent failure is acceptable here.
	}
}

function setupCookieBanner() {
	if (typeof window === 'undefined') return;

	const banner = document.querySelector<HTMLElement>('[data-cookie-banner]');
	if (!banner) return;
	if (banner.dataset.bound === 'true') return;
	banner.dataset.bound = 'true';

	const consent = readConsent();
	if (consent !== null) {
		// Already decided. Leave hidden and exit.
		return;
	}

	// Reveal the banner. The `hidden` attribute is removed first so
	// CSS transitions can run; then `is-visible` triggers the slide-in.
	banner.removeAttribute('hidden');
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			banner.classList.add('is-visible');
		});
	});

	const onDecision = (value: 'accepted' | 'rejected') => {
		writeConsent(value);
		banner.classList.remove('is-visible');
		banner.classList.add('is-leaving');
		// Wait for the leave transition to finish before hiding for real.
		const handleEnd = () => {
			banner.setAttribute('hidden', '');
			banner.classList.remove('is-leaving');
			banner.removeEventListener('transitionend', handleEnd);
		};
		banner.addEventListener('transitionend', handleEnd, { once: true });

		// Safety net for environments where transitionend never fires
		// (reduced-motion, fast tab switches, etc.).
		window.setTimeout(() => {
			if (!banner.hasAttribute('hidden')) {
				banner.setAttribute('hidden', '');
				banner.classList.remove('is-leaving');
			}
		}, 600);
	};

	banner.querySelectorAll<HTMLButtonElement>('[data-cookie-action]').forEach((btn) => {
		btn.addEventListener('click', () => {
			const action = btn.dataset.cookieAction;
			if (action === 'accepted' || action === 'accept') onDecision('accepted');
			else if (action === 'rejected' || action === 'reject') onDecision('rejected');
		});
	});
}

if (typeof document !== 'undefined') {
	setupCookieBanner();
	// The banner is inside <body transition:persist>, so we don't strictly
	// need to re-run on `astro:page-load`. But binding once defensively
	// covers any future change that removes persistence.
	document.addEventListener('astro:page-load', setupCookieBanner);
}

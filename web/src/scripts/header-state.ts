// Header state synchroniser.
//
// The <header> is rendered with `transition:persist` (set in
// src/components/Header.astro). That gives a calm UX — the header doesn't
// flash between page changes — but its content was originally computed
// in the Astro frontmatter and frozen at the first render. Two pieces
// of that content are URL-dependent and would silently desync without
// help:
//
//   1. `aria-current="page"` on each desktop/mobile nav link, which the
//      `.nav-link-underline::after` rule consumes to keep the active
//      page underlined. (Bug 1: the underline stayed on the first page
//      visited, no matter where you navigated.)
//
//   2. `href` on the LanguageSwitcher anchor — it should point to the
//      sibling-language version of the *current* page, not of whichever
//      page was active when the persistent header was first rendered.
//      (Bug 2: clicking ES from /ca/galeria/ landed on /es/, not on
//      /es/galeria/.)
//
// Both run on `astro:after-swap`, which fires once Astro has swapped
// the DOM. We also run them on first script load so the very first
// page render is correct (frontmatter already set them, but doing it
// here too makes the logic the single source of truth.

import { HOME_PAGE_CANVAS_COLOR } from '../config/home-page-canvas';

/** Stable public `/brand/` URL (see scripts/copy-brand-logo.mjs). */
const BRAND_LOGO_PATH = '/brand/el-mini-nou-logo.png';

interface RouteMapEntry {
	ca: string;
	es: string;
}

const ROUTE_MAP: ReadonlyArray<RouteMapEntry> = [
	{ ca: '/ca/', es: '/es/' },
	{ ca: '/ca/menu/', es: '/es/menu/' },
	{ ca: '/ca/galeria/', es: '/es/galeria/' },
	{ ca: '/ca/contacte/', es: '/es/contacto/' },
	{ ca: '/ca/com-arribar/', es: '/es/como-llegar/' },
	{ ca: '/ca/faq/', es: '/es/faq/' },
	{ ca: '/ca/avis-legal/', es: '/es/aviso-legal/' },
	{ ca: '/ca/politica-privacitat/', es: '/es/politica-privacidad/' },
	{ ca: '/ca/politica-cookies/', es: '/es/politica-cookies/' },
	{ ca: '/ca/minigolf/', es: '/es/minigolf/' },
];

function normalise(pathname: string): string {
	return pathname.endsWith('/') ? pathname : pathname + '/';
}

function getCurrentLang(pathname: string): 'ca' | 'es' {
	if (pathname.startsWith('/es/') || pathname === '/es') return 'es';
	return 'ca';
}

function getOtherLangPathname(pathname: string): string {
	const currentLang = getCurrentLang(pathname);
	const otherLang = currentLang === 'ca' ? 'es' : 'ca';
	const normalised = normalise(pathname);

	const entry = ROUTE_MAP.find((r) => r[currentLang] === normalised);
	if (entry) return entry[otherLang];

	return otherLang === 'ca' ? '/ca/' : '/es/';
}

function updateNavCurrent() {
	const current = normalise(window.location.pathname);
	const links = document.querySelectorAll<HTMLAnchorElement>(
		'header [data-nav-link]',
	);

	links.forEach((link) => {
		const href = link.getAttribute('href');
		if (!href) {
			link.removeAttribute('aria-current');
			return;
		}
		if (normalise(href) === current) {
			link.setAttribute('aria-current', 'page');
		} else {
			link.removeAttribute('aria-current');
		}
	});
}

function updateLanguageSwitcher() {
	const target = getOtherLangPathname(window.location.pathname);
	const switcher = document.querySelector<HTMLAnchorElement>(
		'header [data-language-switcher]',
	);
	if (switcher) {
		switcher.setAttribute('href', target);
	}
}

/**
 * Matches document canvas to `HOME_PAGE_CANVAS_COLOR` everywhere.
 *
 * Older template builds toggled `data-home-hero` + `header-hero-overlay`
 * while a fixed cinematic portrait scrolled behind stacked sections — that
 * mode is intentionally disabled for the restaurant landing shell so the DOM
 * never carries those markers (header-shyness + gallery-reveal handlers
 * no-op cleanly instead of fighting SSR).
 */
function syncHomeHeroRoot() {
	const root = document.documentElement;
	root.style.setProperty('--color-page-canvas', HOME_PAGE_CANVAS_COLOR);
	root.removeAttribute('data-home-hero');
	root.classList.remove('header-hero-overlay');
}

function normalizePathname(urlOrPath: string): string {
	try {
		return new URL(urlOrPath, window.location.origin).pathname;
	} catch {
		return urlOrPath;
	}
}

function syncBrandLogoImages() {
	if (!BRAND_LOGO_PATH.trim()) return;
	document.querySelectorAll<HTMLImageElement>('[data-brand-logo]').forEach((img) => {
		const current = normalizePathname(img.getAttribute('src') ?? '');
		if (current !== BRAND_LOGO_PATH) {
			img.setAttribute('src', BRAND_LOGO_PATH);
		}
	});
}

function syncHeaderState() {
	syncHomeHeroRoot();
	syncBrandLogoImages();
	updateNavCurrent();
	updateLanguageSwitcher();
}

if (typeof window !== 'undefined') {
	syncHeaderState();
	document.addEventListener('astro:after-swap', syncHeaderState);
}

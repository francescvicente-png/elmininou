// Headless screenshot capture across all pages of the site.
//
// Generates 2 viewports per page (desktop 1440×900, mobile 390×844) and
// saves full-page PNGs into ./screenshots/{viewport}/{slug}.png.
//
// Cinematic intro is suppressed by pre-setting the sessionStorage flag
// on every page so the curtain never plays — captures the actual
// content underneath, not the intro overlay.
//
// Usage:  BASE=http://localhost:4327 node scripts/capture-screenshots.mjs

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.BASE || 'http://localhost:4327';
const OUT = path.resolve('screenshots');

const PAGES = [
	{ slug: 'home',                  path: '/ca/' },
	{ slug: 'serveis',               path: '/ca/serveis/' },
	{ slug: 'productes',             path: '/ca/productes/' },
	{ slug: 'packs',                 path: '/ca/packs/' },
	{ slug: 'galeria',               path: '/ca/galeria/' },
	{ slug: 'faq',                   path: '/ca/faq/' },
	{ slug: 'contacte',              path: '/ca/contacte/' },
	{ slug: 'com-arribar',           path: '/ca/com-arribar/' },
	{ slug: 'treballa-amb-nosaltres',path: '/ca/treballa-amb-nosaltres/' },
	{ slug: 'avis-legal',            path: '/ca/avis-legal/' },
	{ slug: 'politica-privacitat',   path: '/ca/politica-privacitat/' },
	{ slug: 'politica-cookies',      path: '/ca/politica-cookies/' },
	// Spanish home for completeness
	{ slug: 'home-es',               path: '/es/' },
];

const VIEWPORTS = [
	{ name: 'desktop', width: 1440, height: 900,  deviceScaleFactor: 1 },
	{ name: 'mobile',  width:  390, height: 844,  deviceScaleFactor: 2, isMobile: true, hasTouch: true },
];

// Session-storage seed key — matches src/scripts/cinematic-intro.ts.
// Setting this on each page suppresses the curtain so screenshots capture
// the actual content underneath.
const SESSION_KEY = 'klips-cinematic-intro-played';

async function captureOne(browser, viewport, p) {
	const dir = path.join(OUT, viewport.name);
	await mkdir(dir, { recursive: true });

	const context = await browser.newContext({
		viewport: { width: viewport.width, height: viewport.height },
		deviceScaleFactor: viewport.deviceScaleFactor,
		isMobile: viewport.isMobile ?? false,
		hasTouch: viewport.hasTouch ?? false,
		locale: 'ca-ES',
		colorScheme: 'light',
	});

	// Suppress cinematic intro + cookie banner from the very first paint.
	await context.addInitScript(([key]) => {
		try {
			window.sessionStorage.setItem(key, '1');
			window.localStorage.setItem('cookie-consent', 'accepted');
		} catch (e) {}
	}, [SESSION_KEY]);

	const page = await context.newPage();

	try {
		await page.goto(`${BASE}${p.path}`, {
			waitUntil: 'networkidle',
			timeout: 30000,
		});

		// Settle: let lazy images / fonts paint.
		await page.waitForTimeout(900);

		// Stop any ongoing animations that might keep the page from idling
		// (Marquee, Ken Burns, etc.) — we want a still frame.
		await page.evaluate(() => {
			document.querySelectorAll('*').forEach((el) => {
				el.style.animationPlayState = 'paused';
			});
		});

		const file = path.join(dir, `${p.slug}.png`);
		await page.screenshot({ path: file, fullPage: true });
		const size = (await import('node:fs')).statSync(file).size;
		console.log(`✓ ${viewport.name.padEnd(7)} ${p.slug.padEnd(28)} ${(size / 1024).toFixed(0)} KB`);
	} catch (err) {
		console.error(`✗ ${viewport.name} ${p.slug}: ${err.message}`);
	} finally {
		await context.close();
	}
}

async function main() {
	console.log(`Capturing ${PAGES.length} pages × ${VIEWPORTS.length} viewports = ${PAGES.length * VIEWPORTS.length} screenshots`);
	console.log(`Base: ${BASE}`);
	console.log(`Out:  ${OUT}\n`);

	const browser = await chromium.launch({
		args: ['--no-sandbox', '--disable-dev-shm-usage'],
	});

	for (const viewport of VIEWPORTS) {
		console.log(`\n--- ${viewport.name} (${viewport.width}×${viewport.height}) ---`);
		for (const p of PAGES) {
			await captureOne(browser, viewport, p);
		}
	}

	await browser.close();
	console.log('\nDone.');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});

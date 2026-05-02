/**
 * E2E check: home hero photo is fixed to the viewport (no scroll-driven transform);
 * scroll position of the layer in document flow should change while CSS stays fixed.
 *
 * Run with preview already serving (Astro preview may bind IPv6-only as `localhost`):
 *   pnpm preview --port 4327
 *   node run.mjs   # from a temp dir after `npm i playwright@1.49.1`, or add playwright to the project.
 *
 * Default base URL is http://localhost:4327 — use PREVIEW_URL if yours differs (on some macOS setups
 * 127.0.0.1 does not reach the preview server when it listens on ::1 only).
 */
import { chromium } from 'playwright';

const base = process.env.PREVIEW_URL ?? 'http://localhost:4327';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto(`${base}/ca/`, { waitUntil: 'networkidle' });

async function readState() {
	return page.evaluate(() => {
		const layer = document.querySelector('[data-home-hero-image-layer]');
		const section = document.querySelector('#home-hero');
		const cs = (el) => (el ? getComputedStyle(el) : null);
		return {
			layerPosition: layer ? cs(layer).position : null,
			layerTransform: layer ? cs(layer).transform : null,
			sectionHasStatic: section?.classList.contains('hero-photo-static') ?? false,
			heroHasAtmosphereAttr:
				document.querySelector('#home-hero')?.hasAttribute('data-hero-atmosphere') ?? false,
		};
	});
}

const top = await readState();
await page.evaluate(() => window.scrollTo(0, 400));
await page.waitForTimeout(200);
const mid = await readState();
await page.evaluate(() => window.scrollTo(0, 900));
await page.waitForTimeout(200);
const low = await readState();

await browser.close();

const transformsStable =
	top.layerTransform === mid.layerTransform &&
	mid.layerTransform === low.layerTransform;

const markupOk =
	top.sectionHasStatic === true &&
	top.heroHasAtmosphereAttr === false &&
	top.layerPosition === 'fixed';

const ok = transformsStable && markupOk;

console.log(JSON.stringify({ top, mid, low, transformsStable, markupOk, ok }, null, 2));

if (!ok) {
	process.exit(1);
}

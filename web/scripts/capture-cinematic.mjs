// Captures three frames of the cinematic intro on the home so you have
// visual material for the deck slides about that effect.
//
//   1. cinematic-frame-early.png  — t≈300 ms (blade mid-sweep)
//   2. cinematic-frame-mid.png    — t≈900 ms (wordmark fully revealed)
//   3. cinematic-frame-tagline.png — t≈1200 ms (tagline visible)

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.BASE || 'http://localhost:4327';
const OUT = path.resolve('screenshots/cinematic');

async function main() {
	await mkdir(OUT, { recursive: true });

	const browser = await chromium.launch({
		args: ['--no-sandbox', '--disable-dev-shm-usage'],
	});
	const context = await browser.newContext({
		viewport: { width: 1440, height: 900 },
		locale: 'ca-ES',
	});

	const page = await context.newPage();
	await page.goto(`${BASE}/ca/`);

	// Take three frames at known timings. The cinematic intro CSS
	// timeline (post-1.7s tune):
	//   100 ms  eyebrow fade-in starts
	//   175 ms  text reveal + blade sweep start, both 700 ms
	//   550 ms  tagline fade-in starts (300 ms duration)
	//   1250 ms lift starts
	const frames = [
		{ t: 350,  slug: 'cinematic-frame-early' },
		{ t: 900,  slug: 'cinematic-frame-mid' },
		{ t: 1200, slug: 'cinematic-frame-tagline' },
	];

	const start = Date.now();
	for (const f of frames) {
		const elapsed = Date.now() - start;
		const wait = Math.max(0, f.t - elapsed);
		await page.waitForTimeout(wait);
		const out = path.join(OUT, `${f.slug}.png`);
		await page.screenshot({ path: out });
		console.log(`✓ ${f.slug} @ t≈${Date.now() - start}ms`);
	}

	await browser.close();
	console.log('\nDone.');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});

/**
 * Build-time generator for Open Graph / Twitter Card images (1200×630).
 *
 * Emits one JPEG per language so WhatsApp / Telegram previews match the page
 * locale (ca vs es). Uses a **typographic wordmark only** — no raster logo —
 * so a mis-labelled client JPG cannot ship the wrong trade name.
 *
 * NAP and trade name must stay in sync with `src/data/business.ts`.
 *
 * Output:
 *   - `public/og/default-ca.jpg`
 *   - `public/og/default-es.jpg`
 *   - `public/og/default.jpg`  (alias of CA — defaultLang + legacy URLs)
 *
 * `prebuild` in package.json runs this script.
 */
import sharp from 'sharp';
import { mkdir, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

/** Mirror `business.address` + commercial lines (sync with src/data/business.ts). */
const NAP = {
	street: 'Carrer Jeroni de Moragas, 13',
	city: "L'Ametlla del Vallès",
};

const COPY = {
	ca: {
		lineTag1: 'Brasa informal',
		lineTag2: 'Tapes · entrepans · menú del dia',
		address: `${NAP.street} · ${NAP.city}`,
		cta: 'Reserva per telèfon o WhatsApp',
	},
	es: {
		lineTag1: 'Brasa informal',
		lineTag2: 'Tapas · bocadillos · menú del día',
		address: `${NAP.street} · ${NAP.city}`,
		cta: 'Reserva por teléfono o WhatsApp',
	},
};

const HERO_PATH = resolve(
	ROOT,
	'src/assets/images/demo/Modelo para web.png',
);
const OUT_DIR = resolve(ROOT, 'public/og');

/**
 * Escape text nodes for SVG/XML.
 * @param {string} s
 */
function escapeXml(s) {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

/** @param {'ca' | 'es'} lang */
function buildOverlaySvg(lang) {
	const c = COPY[lang];
	const tag1 = escapeXml(c.lineTag1);
	const tag2 = escapeXml(c.lineTag2);
	const address = escapeXml(c.address);
	const cta = escapeXml(c.cta);

	/* Left stack only — stays inside safe crop for WhatsApp (~600px wide previews). */
	return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
	<defs>
		<linearGradient id="ogScrim" x1="0" y1="0" x2="1" y2="1">
			<stop offset="0" stop-color="#120510" stop-opacity="0.72"/>
			<stop offset="0.55" stop-color="#120510" stop-opacity="0.58"/>
			<stop offset="1" stop-color="#120510" stop-opacity="0.5"/>
		</linearGradient>
	</defs>
	<rect width="1200" height="630" fill="url(#ogScrim)"/>
	<text x="64" y="176"
		font-family="Georgia, 'Times New Roman', serif"
		font-size="48"
		font-weight="700"
		fill="#f4ead8">El mini nou</text>
	<text x="64" y="258"
		font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
		font-size="26"
		font-weight="600"
		fill="#d4b896"
		fill-opacity="0.98">${tag1}</text>
	<text x="64" y="294"
		font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
		font-size="26"
		font-weight="600"
		fill="#d4b896"
		fill-opacity="0.98">${tag2}</text>
	<text x="64" y="354"
		font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
		font-size="21"
		fill="#c9ae88"
		fill-opacity="0.92">${address}</text>
	<text x="64" y="390"
		font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
		font-size="19"
		fill="#b89a78"
		fill-opacity="0.88">${cta}</text>
</svg>`;
}

if (!existsSync(HERO_PATH)) {
	console.error(`[og-image] hero source not found at ${HERO_PATH}`);
	process.exit(1);
}

await mkdir(OUT_DIR, { recursive: true });

const langs = /** @type {const} */ (['ca', 'es']);

for (const lang of langs) {
	const overlaySvg = buildOverlaySvg(lang);
	const outPath = resolve(OUT_DIR, `default-${lang}.jpg`);

	try {
		await sharp(HERO_PATH)
			.resize(1200, 630, { fit: 'cover', position: 'attention' })
			.composite([{ input: Buffer.from(overlaySvg), top: 0, left: 0 }])
			.jpeg({ quality: 86, progressive: true, chromaSubsampling: '4:4:4' })
			.toFile(outPath);
		console.log(`[og-image] generated ${outPath} (${lang})`);
	} catch (err) {
		console.error('[og-image] generation failed:', err);
		process.exit(1);
	}
}

const defaultCa = resolve(OUT_DIR, 'default-ca.jpg');
const legacyDefault = resolve(OUT_DIR, 'default.jpg');
await copyFile(defaultCa, legacyDefault);
console.log(`[og-image] linked ${legacyDefault} → default-ca.jpg`);

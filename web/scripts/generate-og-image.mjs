/**
 * Build-time generator for Open Graph / Twitter Card images (1200×630).
 *
 * Emits one JPEG per language so WhatsApp / Telegram previews match the page
 * locale (ca vs es). Composites the transparent brand PNG (from
 * `copy-brand-logo.mjs`) over a scrim + typographic stack so shares show
 * the restaurant mark as well as NAP/CTA.
 *
 * NAP and trade name must stay in sync with `src/data/business.ts`.
 *
 * Output:
 *   - `public/og/default-%lang%.jpg`
 *   - `public/og/default.jpg`  (alias of CA — defaultLang + legacy URLs)
 *
 * `prebuild` runs `copy-brand-logo.mjs` before this script so
 * `public/brand/el-mini-nou-logo.png` exists.
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
	'src/assets/images/generated/home-hero-restaurant-brasa.jpg',
);
const BRAND_LOGO_PATH = resolve(ROOT, 'public/brand/el-mini-nou-logo.png');
const OUT_DIR = resolve(ROOT, 'public/og');

/** Logo height (px) composited on the OG canvas — stays inside WhatsApp left safe crop. */
const OG_LOGO_HEIGHT = 132;

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

	/* Left stack — raster logo sits above this block; copy stays inside WhatsApp safe crop. */
	return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
	<defs>
		<linearGradient id="ogScrim" x1="0" y1="0" x2="1" y2="1">
			<stop offset="0" stop-color="#120510" stop-opacity="0.72"/>
			<stop offset="0.55" stop-color="#120510" stop-opacity="0.58"/>
			<stop offset="1" stop-color="#120510" stop-opacity="0.5"/>
		</linearGradient>
	</defs>
	<rect width="1200" height="630" fill="url(#ogScrim)"/>
	<text x="64" y="244"
		font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
		font-size="26"
		font-weight="600"
		fill="#d4b896"
		fill-opacity="0.98">${tag1}</text>
	<text x="64" y="282"
		font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
		font-size="26"
		font-weight="600"
		fill="#d4b896"
		fill-opacity="0.98">${tag2}</text>
	<text x="64" y="342"
		font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
		font-size="21"
		fill="#c9ae88"
		fill-opacity="0.92">${address}</text>
	<text x="64" y="378"
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

if (!existsSync(BRAND_LOGO_PATH)) {
	console.error(
		`[og-image] brand logo not found at ${BRAND_LOGO_PATH} — run copy-brand-logo.mjs first (prebuild order).`,
	);
	process.exit(1);
}

const ogLogoPng = await sharp(BRAND_LOGO_PATH)
	.resize({ height: OG_LOGO_HEIGHT })
	.ensureAlpha()
	.png()
	.toBuffer();

await mkdir(OUT_DIR, { recursive: true });

const langs = /** @type {const} */ (['ca', 'es']);

/** Left padding aligns with SVG text block; `top` clears space above the first copy line. */
const OG_LOGO_LEFT = 56;
const OG_LOGO_TOP = 48;

for (const lang of langs) {
	const overlaySvg = buildOverlaySvg(lang);
	const outPath = resolve(OUT_DIR, `default-${lang}.jpg`);

	try {
		await sharp(HERO_PATH)
			.resize(1200, 630, { fit: 'cover', position: 'attention' })
			.composite([
				{ input: Buffer.from(overlaySvg), top: 0, left: 0 },
				{ input: ogLogoPng, top: OG_LOGO_TOP, left: OG_LOGO_LEFT },
			])
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

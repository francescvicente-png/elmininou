/**
 * Copies the brand mark from src/assets into public/ so the header/footer
 * can load it from a stable path (`/brand/el-mini-nou-logo.png`) — critical
 * with `transition:persist` so hashed /_astro URLs never go stale.
 *
 * The source JPEG is flattened on black; we strip that matte to transparency
 * (PNG) so the glyph reads cleanly on paper and footer tints alike.
 *
 * Favicons are generated from the same processed RGBA (resized per size).
 */
import sharp from 'sharp';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const source = resolve(root, 'src/assets/images/El mini nou logo.jpg');
const publicDir = resolve(root, 'public');
const brandDir = resolve(publicDir, 'brand');
const logoDest = resolve(brandDir, 'el-mini-nou-logo.png');

const FAVICON_SIZES = [
	{ size: 32, name: 'favicon-32.png' },
	{ size: 180, name: 'favicon-180.png' },
	{ size: 192, name: 'favicon-192.png' },
	{ size: 512, name: 'favicon-512.png' },
];

/**
 * True for pixels that belong to the black JPEG matte, not the coloured mark.
 * Uses chroma so dark orange edge pixels (high R, low G/B) are kept; near-grey
 * dark pixels (compression halo around black) become transparent.
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns {boolean}
 */
function isBackgroundPixel(r, g, b) {
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const chroma = max - min;
	const sum = r + g + b;
	if (max <= 4) return true;
	if (chroma <= 6 && max <= 12) return true;
	if (chroma < 8 && max < 16 && sum < 28) return true;
	return false;
}

/**
 * @param {Buffer} rgba
 * @param {number} width
 * @param {number} height
 */
function stripBlackMatteToAlpha(rgba, width, height) {
	const channels = 4;
	const out = Buffer.from(rgba);
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const i = (y * width + x) * channels;
			const r = out[i];
			const g = out[i + 1];
			const b = out[i + 2];
			if (isBackgroundPixel(r, g, b)) {
				out[i + 3] = 0;
			} else {
				out[i + 3] = 255;
			}
		}
	}
	return out;
}

if (!existsSync(source)) {
	console.error(`[copy-brand-logo] missing source: ${source}`);
	process.exit(1);
}

mkdirSync(brandDir, { recursive: true });

const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
if (channels !== 4) {
	console.error(`[copy-brand-logo] expected RGBA raw buffer, got ${channels} channels`);
	process.exit(1);
}

const rgba = stripBlackMatteToAlpha(data, width, height);

await sharp(rgba, { raw: { width, height, channels: 4 } })
	.png({ compressionLevel: 9, effort: 10 })
	.toFile(logoDest);
console.log(`[copy-brand-logo] → ${logoDest}`);

for (const { size, name } of FAVICON_SIZES) {
	const outPath = resolve(publicDir, name);
	await sharp(rgba, { raw: { width, height, channels: 4 } })
		.resize(size, size, { fit: 'cover', position: 'center' })
		.png({ compressionLevel: 9 })
		.toFile(outPath);
	console.log(`[copy-brand-logo] favicon → ${outPath}`);
}

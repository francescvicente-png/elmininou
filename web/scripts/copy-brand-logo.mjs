/**
 * Copies the brand mark from src/assets into public/ so the header/footer
 * can load it from a stable path (`/brand/el-mini-nou-logo.jpg`) — critical
 * with `transition:persist` so hashed /_astro URLs never go stale.
 *
 * The same file is resized into browser tab favicons + apple-touch icon.
 */
import sharp from 'sharp';
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const source = resolve(root, 'src/assets/images/El mini nou logo.jpg');
const publicDir = resolve(root, 'public');
const brandDir = resolve(publicDir, 'brand');
const logoDest = resolve(brandDir, 'el-mini-nou-logo.jpg');

if (!existsSync(source)) {
	console.error(`[copy-brand-logo] missing source: ${source}`);
	process.exit(1);
}

mkdirSync(brandDir, { recursive: true });
copyFileSync(source, logoDest);
console.log(`[copy-brand-logo] → ${logoDest}`);

const faviconSizes = [
	{ size: 32, name: 'favicon-32.png' },
	{ size: 180, name: 'favicon-180.png' },
	{ size: 192, name: 'favicon-192.png' },
	{ size: 512, name: 'favicon-512.png' },
];

for (const { size, name } of faviconSizes) {
	const outPath = resolve(publicDir, name);
	await sharp(source)
		.resize(size, size, { fit: 'cover', position: 'center' })
		.png({ compressionLevel: 9 })
		.toFile(outPath);
	console.log(`[copy-brand-logo] favicon → ${outPath}`);
}

#!/usr/bin/env node
/**
 * Builds static snapshots for palette comparison (colors only — fonts stay on theme.ts /
 * astro Fonts API). Sources from ui-ux-pro-max CSVs; there is no literal “hair salon” row,
 * so K3 follows products.csv → Beauty/Spa/Wellness Service:
 *   soft pastels (pink #FFB6C1 + sage #90EE90) + cream + gold accents.
 *
 * Palettes:
 *   K1 — design-system + colors.csv “Soft pink + lavender luxury” (pink field + fuchsia primary)
 *   K2 — Magazine editorial + pink accent (neutral + graphite primary)
 *   K3 — products.csv Beauty/Spa/Wellness (cream + sage primary + gold accent, rose-tint cards)
 *
 * Restores src/config/theme.ts and component primary-tint shadows after each build; ends
 * with sync-theme + full build so the repo returns to committed Palette E (aubergine).
 *
 * Usage:
 *   node scripts/build-k1-k2-previews.mjs
 *   pnpm preview:palettes-k12
 *
 * Serve (three terminals or sequential):
 *   python3 -m http.server 4510 --directory preview-palettes-k12/k1
 *   python3 -m http.server 4511 --directory preview-palettes-k12/k2
 *   python3 -m http.server 4512 --directory preview-palettes-k12/k3
 */
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const THEME_PATH = join(ROOT, 'src/config/theme.ts');
const DIST_PATH = join(ROOT, 'dist');
const OUT_ROOT = join(ROOT, 'preview-palettes-k12');

/** Matches hover / stroke shadows tuned to the committed aubergine primary. */
const BASELINE_PRIMARY_PREFIX = 'oklch(30% 0.075 320';

const FILES_WITH_PRIMARY_TINT = [
	'src/components/PacksTeaser.astro',
	'src/components/FeaturedReviewQuote.astro',
	'src/components/Card.astro',
	'src/components/Footer.astro',
	'src/components/Button.astro',
	'src/components/LocationBlock.astro',
	'src/components/GoogleReviewsBlock.astro',
	'src/components/ReviewCard.astro',
	'src/components/PackCard.astro',
	'src/components/ServiceCard.astro',
	'src/components/ProductCard.astro',
	'src/components/TypographicInterlude.astro',
];

const PALETTES = {
	k1: {
		label: 'K1 Soft Luxury (pink field + fuchsia primary)',
		shadowTintPrefix: 'oklch(62% 0.21 350',
		colorsInner: `
		background: 'oklch(97% 0.022 330)',
		backgroundAlt: 'oklch(99% 0.012 330)',
		foreground: 'oklch(28% 0.11 350)',
		muted: 'oklch(52% 0.04 270)',
		border: 'oklch(91% 0.055 350)',
		primary: 'oklch(62% 0.21 350)',
		primaryHover: 'oklch(56% 0.21 350)',
		primaryForeground: 'oklch(99% 0.005 330)',
		accent: 'oklch(56% 0.22 285)',
		accentHover: 'oklch(50% 0.22 285)',
		accentForeground: 'oklch(99% 0 0)',
		onImage: 'oklch(95% 0.03 330)',
		rating: 'oklch(75% 0.12 75)',
`,
	},
	k2: {
		label: 'K2 Editorial Rosa (neutral + graphite primary + pink accent)',
		shadowTintPrefix: 'oklch(18% 0.02 285',
		colorsInner: `
		background: 'oklch(99% 0.003 280)',
		backgroundAlt: 'oklch(100% 0 0)',
		foreground: 'oklch(15% 0.01 285)',
		muted: 'oklch(48% 0.03 265)',
		border: 'oklch(92% 0.008 280)',
		primary: 'oklch(18% 0.02 285)',
		primaryHover: 'oklch(24% 0.02 285)',
		primaryForeground: 'oklch(99% 0 0)',
		accent: 'oklch(62% 0.21 350)',
		accentHover: 'oklch(56% 0.21 350)',
		accentForeground: 'oklch(99% 0 0)',
		onImage: 'oklch(94% 0.02 320)',
		rating: 'oklch(75% 0.12 75)',
`,
	},
	k3: {
		label:
			'K3 Skill Beauty/Spa/Wellness (cream + sage primary + gold accent, rose-tint surface)',
		shadowTintPrefix: 'oklch(40% 0.10 150',
		colorsInner: `
		background: 'oklch(96% 0.02 95)',
		backgroundAlt: 'oklch(97% 0.035 350)',
		foreground: 'oklch(22% 0.05 150)',
		muted: 'oklch(48% 0.06 145)',
		border: 'oklch(88% 0.06 145)',
		primary: 'oklch(40% 0.10 150)',
		primaryHover: 'oklch(34% 0.10 150)',
		primaryForeground: 'oklch(98% 0.015 95)',
		accent: 'oklch(72% 0.12 80)',
		accentHover: 'oklch(66% 0.12 80)',
		accentForeground: 'oklch(22% 0.05 150)',
		onImage: 'oklch(93% 0.03 90)',
		rating: 'oklch(76% 0.13 80)',
`,
	},
};

function injectColorsIntoTheme(fullSource, colorsInner) {
	const re = /(\tcolors: \{)[\s\S]*?(\n\t\},\n\tfonts:)/;
	if (!re.test(fullSource)) {
		throw new Error('build-palette-previews: could not find colors block in theme.ts');
	}
	return fullSource.replace(re, `$1${colorsInner}\n$2`);
}

function assertBaselineTintsPresent() {
	for (const rel of FILES_WITH_PRIMARY_TINT) {
		const text = readFileSync(join(ROOT, rel), 'utf8');
		if (!text.includes(BASELINE_PRIMARY_PREFIX)) {
			throw new Error(
				`build-palette-previews: expected baseline primary tint in ${rel}`,
			);
		}
	}
}

function swapPrimaryTintInFiles(fromPrefix, toPrefix) {
	for (const rel of FILES_WITH_PRIMARY_TINT) {
		const p = join(ROOT, rel);
		const text = readFileSync(p, 'utf8');
		if (!text.includes(fromPrefix)) {
			throw new Error(`build-palette-previews: prefix not found in ${rel}: ${fromPrefix}`);
		}
		writeFileSync(p, text.split(fromPrefix).join(toPrefix));
	}
}

function runBuild() {
	execSync('zsh -lc "pnpm build"', { cwd: ROOT, stdio: 'inherit' });
}

function main() {
	const themeOriginal = readFileSync(THEME_PATH, 'utf8');
	const fileSnapshots = Object.fromEntries(
		FILES_WITH_PRIMARY_TINT.map((rel) => [
			rel,
			readFileSync(join(ROOT, rel), 'utf8'),
		]),
	);

	assertBaselineTintsPresent();

	rmSync(OUT_ROOT, { recursive: true, force: true });
	mkdirSync(OUT_ROOT, { recursive: true });

	for (const id of ['k1', 'k2', 'k3']) {
		const spec = PALETTES[id];
		console.log(`\n━━━ Building ${id.toUpperCase()} — ${spec.label} ━━━\n`);

		writeFileSync(THEME_PATH, injectColorsIntoTheme(themeOriginal, spec.colorsInner));
		swapPrimaryTintInFiles(BASELINE_PRIMARY_PREFIX, spec.shadowTintPrefix);

		runBuild();

		const dest = join(OUT_ROOT, id);
		rmSync(dest, { recursive: true, force: true });
		cpSync(DIST_PATH, dest, { recursive: true });

		writeFileSync(THEME_PATH, themeOriginal);
		for (const rel of FILES_WITH_PRIMARY_TINT) {
			writeFileSync(join(ROOT, rel), fileSnapshots[rel]);
		}
	}

	// Last Astro build left global.css on the last preview tokens; theme.ts is restored.
	execSync('node scripts/sync-theme.mjs', { cwd: ROOT, stdio: 'inherit' });
	runBuild();

	console.log(`
Done. Working tree restored (Palette E / aubergine).

Serve previews:
  python3 -m http.server 4510 --directory preview-palettes-k12/k1
  python3 -m http.server 4511 --directory preview-palettes-k12/k2
  python3 -m http.server 4512 --directory preview-palettes-k12/k3

Open:
  http://localhost:4510/ca/  → K1 (pink / fuchsia)
  http://localhost:4511/ca/  → K2 (editorial / graphite + pink accent)
  http://localhost:4512/ca/  → K3 (skill Beauty/Spa/Wellness: cream + sage + gold)
`);
}

main();

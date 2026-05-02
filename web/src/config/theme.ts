/**
 * Theme configuration — single source of truth for the brand identity.
 *
 * Harmonised with `src/assets/images/El mini nou logo.jpg`: vivid orange on
 * black in the mark. On the web we keep **neutral black** for body/headings
 * (`foreground`) — only chromatic surfaces (primary, borders, paper tint)
 * pick up the orange; footer band can use logo black separately in global.css.
 *
 * Changes here → run `pnpm build` so scripts/sync-theme.mjs rewrites `@theme`.
 */

export interface ThemeColors {
	background: string;
	backgroundAlt: string;
	foreground: string;
	muted: string;
	border: string;
	primary: string;
	primaryHover: string;
	primaryForeground: string;
	accent: string;
	accentHover: string;
	accentForeground: string;
	onImage: string;
	rating: string;
}

export interface ThemeFonts {
	display: string;
	body: string;
}

export interface ThemeMotion {
	easing: string;
	durationFast: string;
	durationNormal: string;
	durationSlow: string;
}

export interface Theme {
	colors: ThemeColors;
	fonts: ThemeFonts;
	motion: ThemeMotion;
}

export const theme = {
	colors: {
		/** Warm paper — slight orange blossom so the UI “sits” next to the logo orange. */
		background: 'oklch(98.8% 0.014 58)',
		backgroundAlt: 'oklch(100% 0 0)',
		/** Logo uses black for lettering; we mirror that for type (no tinted “brown ink”). */
		foreground: 'oklch(0% 0 0)',
		muted: 'oklch(48% 0.02 265)',
		border: 'oklch(91% 0.042 58)',
		/** Primary orange ≈ #FF7518 (picked to sit between common “safety” orange and the mark). */
		primary: 'oklch(68.5% 0.193 54)',
		primaryHover: 'oklch(60% 0.19 54)',
		primaryForeground: 'oklch(100% 0 0)',
		/** Deeper burnt orange for chips / secondary emphasis (still readable on light bg). */
		accent: 'oklch(42% 0.14 50)',
		accentHover: 'oklch(37% 0.14 50)',
		accentForeground: 'oklch(100% 0 0)',
		onImage: 'oklch(98% 0.01 85)',
		rating: 'oklch(72% 0.15 74)',
	},
	fonts: {
		display: '"Playfair Display SC", "Playfair Display", Georgia, serif',
		body: '"Karla", system-ui, sans-serif',
	},
	motion: {
		easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
		durationFast: '150ms',
		durationNormal: '250ms',
		durationSlow: '400ms',
	},
} as const satisfies Theme;

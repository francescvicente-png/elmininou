/**
 * Placeholder product catalogue.
 *
 * Every entry here is generic, plausible salon retail —
 * NONE of these are confirmed for on-site retail until the salon catalogs them.
 * The page uses `getProductsGrouped()` for category sections and LCP hints;
 * keep `category` accurate so in-page navigation stays meaningful. Imagery is
 * illustrative (AI-generated packshots — see `src/assets/images/demo/attributions.json`).
 *
 * Replacement workflow when the real catalogue arrives:
 *   1. Get the actual product list from the client.
 *   2. Rewrite each entry: id, iconKey, category (`care` | `styling` |
 *      `accessories`), extend ProductIcons.astro if a new shape is needed,
 *      name, description, price, image imports, imageAlt.
 *   3. Set `isPlaceholder: false` on each entry — the card hides the
 *      "Producto de ejemplo" badge automatically when the flag is
 *      false.
 *   4. Edit the placeholder banner copy in the page if appropriate.
 */

import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/config';

import productShampoo from '../assets/images/generated/product-shampoo-sulfate-free.png';
import productMask from '../assets/images/generated/product-repair-mask.png';
import productSerum from '../assets/images/generated/product-serum-ends.png';
import productPaddleBrush from '../assets/images/generated/product-paddle-brush.png';
import productTexturePaste from '../assets/images/generated/product-texture-paste.png';
import productWideComb from '../assets/images/generated/product-wide-comb.png';

export type ProductIconKey =
	| 'wax'
	| 'oil'
	| 'brush'
	| 'shampoo'
	| 'balm'
	| 'comb';

/** Grouping for the products landing page (care vs styling vs tools). */
export type ProductCategoryKey = 'care' | 'styling' | 'accessories';

export interface Product {
	id: string;
	iconKey: ProductIconKey;
	category: ProductCategoryKey;
	nameCa: string;
	nameEs: string;
	descriptionCa: string;
	descriptionEs: string;
	/** Price in EUR. */
	price: number;
	/** True while the entry is illustrative; false once verified
	 *  against the client's real catalogue. */
	isPlaceholder: boolean;
	/** Product-style hero shot for the card (replace with real packshots when available). */
	image: ImageMetadata;
	imageAlt: Record<Lang, string>;
}

export interface ProductGroup {
	category: ProductCategoryKey;
	items: ReadonlyArray<Product>;
}

/** Stable section ids for in-page navigation (`#products-care`, …). */
export function productCategoryAnchorId(category: ProductCategoryKey): string {
	return `products-${category}`;
}

const CATEGORY_ORDER: ReadonlyArray<ProductCategoryKey> = [
	'care',
	'styling',
	'accessories',
];

export const products: ReadonlyArray<Product> = [
	{
		id: 'shampoo-sulfate-free',
		iconKey: 'shampoo',
		category: 'care',
		nameCa: 'Xampú hidratant sense sulfats',
		nameEs: 'Champú hidratante sin sulfatos',
		descriptionCa:
			'Neteja suau per a cabell tractat o sensible: manté el color i la fibra.',
		descriptionEs:
			'Limpieza suave para cabello tratado o sensible: mantiene el color y la fibra.',
		price: 16,
		isPlaceholder: true,
		image: productShampoo,
		imageAlt: {
			ca: "Ampolla de xampú hidratant sense sulfats — fotografia d'exemple generada amb IA, no és el producte real a la venda.",
			es: 'Botella de champú hidratante sin sulfatos — fotografía de ejemplo generada con IA, no es el producto real a la venta.',
		},
	},
	{
		id: 'repair-mask',
		iconKey: 'balm',
		category: 'care',
		nameCa: 'Màscara reparadora',
		nameEs: 'Mascarilla reparadora',
		descriptionCa:
			'Nutrició intensiva per a cabells secs o porosos; facilita el pentinat.',
		descriptionEs:
			'Nutrición intensiva para cabellos secos o porosos; facilita el peinado.',
		price: 22,
		isPlaceholder: true,
		image: productMask,
		imageAlt: {
			ca: "Recipiente de màscara capil·lar reparadora — imatge generada amb IA, exemple visual.",
			es: 'Tarro de mascarilla capilar reparadora — imagen generada con IA, ejemplo visual.',
		},
	},
	{
		id: 'serum-ends',
		iconKey: 'oil',
		category: 'care',
		nameCa: 'Sèrum lluminositat per a puntes',
		nameEs: 'Sérum brillo para puntas',
		descriptionCa:
			'Acabat lleuger, sense engrasar. Sellat visual de puntes obertes.',
		descriptionEs:
			'Acabado ligero, sin engrasar. Sella visualmente las puntas abiertas.',
		price: 18,
		isPlaceholder: true,
		image: productSerum,
		imageAlt: {
			ca: "Sèrum per puntes en envàs amb comptagotes — fotografia d'exemple generada amb IA.",
			es: 'Sérum para puntas en envase con cuentagotas — fotografía de ejemplo generada con IA.',
		},
	},
	{
		id: 'paddle-brush',
		iconKey: 'brush',
		category: 'accessories',
		nameCa: 'Raspall paddle desenreda',
		nameEs: 'Cepillo paddle desenreda',
		descriptionCa:
			'Filaments flexibles per desfer nusos amb menys trencament.',
		descriptionEs:
			'Filamentos flexibles para deshacer nudos con menos rotura.',
		price: 14,
		isPlaceholder: true,
		image: productPaddleBrush,
		imageAlt: {
			ca: "Raspall paddle per desenredar — imatge generada amb IA, exemple visual.",
			es: 'Cepillo paddle desenreda — imagen generada con IA, ejemplo visual.',
		},
	},
	{
		id: 'texture-paste',
		iconKey: 'wax',
		category: 'styling',
		nameCa: 'Pasta de textura flexible',
		nameEs: 'Pasta de textura flexible',
		descriptionCa:
			'Definició i volum sense pes; ideal per acabats naturals o messy.',
		descriptionEs:
			'Definición y volumen sin peso; ideal para acabados naturales o messy.',
		price: 15,
		isPlaceholder: true,
		image: productTexturePaste,
		imageAlt: {
			ca: "Envàs de pasta de textura per al cabell — fotografia d'exemple generada amb IA.",
			es: 'Envase de pasta de textura para el pelo — fotografía de ejemplo generada con IA.',
		},
	},
	{
		id: 'wide-comb',
		iconKey: 'comb',
		category: 'accessories',
		nameCa: 'Pinta àmplia antitrels',
		nameEs: 'Peine ancho anti-tirones',
		descriptionCa:
			'Per cabell mullat o embullat; anatomia ampla per a menys pressió.',
		descriptionEs:
			'Para cabello mojado o enredado; ergonomía ancha para menos presión.',
		price: 9,
		isPlaceholder: true,
		image: productWideComb,
		imageAlt: {
			ca: "Pinta àmplia per cabell mullat — imatge generada amb IA, exemple visual.",
			es: 'Peine ancho para cabello mojado — imagen generada con IA, ejemplo visual.',
		},
	},
];

/**
 * Products sorted for display: by category (care → styling → accessories),
 * then by descending price within each group so hero skus surface first.
 */
export function getProductsGrouped(): ReadonlyArray<ProductGroup> {
	const byCategory = new Map<ProductCategoryKey, Product[]>();
	for (const cat of CATEGORY_ORDER) {
		byCategory.set(cat, []);
	}
	for (const p of products) {
		byCategory.get(p.category)?.push(p);
	}
	return CATEGORY_ORDER.map((category) => {
		const items = [...(byCategory.get(category) ?? [])].sort(
			(a, b) => b.price - a.price,
		);
		return { category, items };
	}).filter((g) => g.items.length > 0);
}

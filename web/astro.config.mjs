// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

// site: URL pública de Cloudflare Pages. Cuando se compre dominio
// custom, cambiar aquí (y actualizar también public/robots.txt).
// https://astro.build/config
export default defineConfig({
  site: 'https://elmininou.pages.dev',
  output: 'static',
  integrations: [
    sitemap({
      // Dev-only routes (e.g. /dev/styleguide/) must not leak into the
      // production sitemap. They render as 404/redirect in build anyway,
      // but keeping them here would invite Googlebot to crawl dead URLs.
      filter: (page) => !page.includes('/dev/'),
    }),
    icon({
      include: {
        // Tabler set is now the single primary icon library for the
        // whole site (UI audit, sprint April 2026). Mixing Lucide and
        // Tabler produced subtle stroke / corner inconsistencies; one
        // library = one visual voice. Tabler also ships sector-specific
        // shapes (razor, mood-kid) that Lucide lacks.
        tabler: [
          // Navigation chrome
          'arrow-up-right',
          'check',
          'chevron-down',
          'chevron-left',
          'chevron-right',
          'external-link',
          'menu-2',
          'x',
          'arrows-maximize',
          'zoom-in',
          // Communication / contact
          'brand-instagram',
          'brand-whatsapp',
          'mail',
          'map-pin',
          'phone',
          'calendar',
          'info-circle',
          'message-circle',
          'alert-triangle',
          'hourglass',
          // Content / domain
          'scissors',
          'sparkles',
          'star',
          'star-filled',
          'user',
          'users',
          'heart',
          'award',
          'world',
          'gift',
          'leaf',
          'quote',
          'circle-check',
          'bookmark-filled',
          'receipt-euro',
          'shopping-bag',
          // Sector-specific (barbershop)
          'razor',
          'razor-electric',
          'mood-kid',
          // Products
          'container',
          'droplet',
          'bottle',
          'brush',
          'cup',
          // Restaurant / menu (El mini nou)
          'flame',
          'bowl',
          'meat',
          'fish',
          'salad',
          'cheese',
          'sausage',
          'carrot',
          'bread',
          'beer',
          'tools-kitchen-2',
          // Minigolf section
          'flag',
          'golf',
          'arrow-right',
          'clock',
        ],
      },
    }),
  ],
  fonts: [
    {
      // UI/UX Pro Max — Restaurant Menu pairing (skill typography.csv #33).
      name: 'Playfair Display SC',
      cssVariable: '--font-playfair-display-sc',
      provider: fontProviders.google(),
      weights: [400, 700],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
    },
    {
      name: 'Karla',
      cssVariable: '--font-karla',
      provider: fontProviders.google(),
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});

# Cómo crear una nueva web a partir de esta plantilla

Esta plantilla es la base de una agencia local de webs (barberías, panaderías, dentistas, pizzerías…). Se ha diseñado para que crear una nueva instancia sea cuestión de **rellenar 3 archivos de configuración + sustituir contenido**, sin tocar lógica.

> **Tiempo estimado de adaptación:** 1.5–2 h para un negocio "estándar" (mismas secciones que esta web). Más si el negocio pide secciones extra (Sprint 2: productos, FAQ, premios…).

---

## Pasos

### 1. Clonar el repo

```sh
git clone <url-de-esta-plantilla> mi-nueva-web
cd mi-nueva-web
rm -rf .git
git init
git add -A && git commit -m "chore: initial copy from template"
```

### 2. Datos del negocio — `src/data/business.ts`

Reescribe **todos** los campos:

- `name`, `legalName` (igual si autónomo).
- `languages`, `defaultLang` — normalmente `['ca', 'es']` y `'ca'`. Si añades idiomas, ver paso 9.
- `address` (street, postalCode, city, region, country en ISO 3166-1).
- `geo.lat` y `geo.lon` — copia de Google Maps con clic derecho → "¿Qué hay aquí?".
- `phone` (formato humano) y `phoneTel` (formato E.164 con `+`, para `tel:` y WhatsApp / `wa.me`).
- `freshaUrl` — URL pública del perfil en **Fresha** (u otro listado) **solo si quieres enlazarla** en `sameAs` del JSON-LD. En Klip’s va **vacía** porque el negocio no reserva ahí. Para reservas por teléfono/WhatsApp no hace falta rellenarla.
- `googleMapsUrl` — URL larga del Place en Google Maps.
- `googlePlaceId` — opcional pero útil para futuras integraciones (Place API). Se obtiene en `https://developers.google.com/maps/documentation/places/web-service/place-id`.
- `socialLinks` — `instagram`, `facebook`, `tiktok`, `x`. Solo los que tenga el negocio.

Y luego:

- `openingHours` — array de slots por día. `null` significa cerrado. Soporta horarios partidos (`[['09:00','14:00'],['16:00','20:00']]`).
- `googleReviews` — rating, count, lastUpdated. Opcional al inicio (poner `count: 0` y ocultar el bloque desde `site.features.reviews = false` si aún no hay reseñas).

### 3. Configuración del sitio — `src/data/site.ts`

- `canonicalUrl` — empieza con el dominio gratis de Cloudflare Pages (`https://<proyecto>.pages.dev`); cuando el cliente compre dominio propio, cámbialo aquí y en [`astro.config.mjs`](./astro.config.mjs) (`site:`) y en [`public/robots.txt`](./public/robots.txt) (`Sitemap:`).
- `businessType` — `'barbershop' | 'bakery' | 'pizzeria' | …`. Hoy solo afecta a la documentación; en sprints futuros condicionará iconos y `Schema.org @type`.
- `features` — toggles para activar/desactivar secciones. Si el cliente no tiene reseñas Google aún, pon `reviews: false`. `products` / `faq` según necesidad. `onlineBooking: false` + `booking.provider: 'phone'` cuando las citas son solo por **teléfono y WhatsApp** (como Klip’s). `careers: false` si no hay página “trabaja con nosotros”.
- `booking` — `{ provider, url }`. Valores típicos: `'phone'` (URL vacía; el CTA usa `tel:` vía `getBookingCta()`), `'fresha'` / `'treatwell'` / `'booksy'` + URL del widget o perfil, o `'custom'` con URL propia. **Si usas un dominio de terceros con XHR/fetch**, añádela a `connect-src` en [`public/_headers`](./public/_headers).

### 4. Tema visual — `src/config/theme.ts`

> **Sprint 3 update — sync automático.** A partir de Sprint 3 sólo necesitas editar `theme.ts`. El script `scripts/sync-theme.mjs` se ejecuta en el `prebuild` hook (paralelo a `generate-og-image.mjs`) y reescribe el bloque `@theme` de `global.css` entre los marcadores `THEME_AUTOGEN_START` / `THEME_AUTOGEN_END`. **No edites global.css dentro de esos marcadores** — tus cambios serán sobrescritos en el siguiente build.

Pasos para retematizar:

1. Abre `src/config/theme.ts` y cambia los valores de `colors` y `motion`. Si cambias `fonts.display` o `fonts.body`, edita también la sección `fonts:` de [`astro.config.mjs`](./astro.config.mjs) (Astro 6 self-hostea desde Google Fonts).
2. `pnpm build` (o `pnpm dev` que también dispara el prebuild) → el script lee `theme.ts`, regenera el `@theme` block en `global.css` automáticamente.
3. Comprueba contraste manualmente. La paleta actual está calibrada para WCAG AAA en luminancia con tokens en `oklch()`; mantén ese formato para resultados predecibles.

**Tip**: para validar el sync sin un build completo, ejecuta `node scripts/sync-theme.mjs` directamente. Es idempotente — si nada ha cambiado, no toca el archivo.

### 4b. Reordenar / desactivar secciones del home — `src/config/home-sections.ts`

El home (`/ca/` y `/es/`) renderiza las secciones leyendo el array `homeSections`. Para una nueva web:

- **Reordenar**: cambia el orden del array. Por ejemplo, una panadería querría poner `gallery-preview` antes de `services-preview` (las fotos del producto venden antes que la lista de precios).
- **Desactivar**: `enabled: false` en cualquier entry. La sección desaparece del HTML built. La home compila sin ella.
- **Añadir secciones nuevas**: añadir un nuevo `HomeSectionId` al type union, crear el componente correspondiente en `src/components/sections/`, añadir el case al switch en `pages/{ca,es}/index.astro`.

`hero` debe ser siempre la primera entrada — el loop lo trata como caso especial (no lo envuelve en `<FadeInOnScroll>` para proteger el LCP).

### 5. Servicios

Edita `src/data/services.ts`. Cada servicio tiene:

- `id` — identificador estable (kebab-case).
- `icon` — ID semántico que [`ServiceIcon`](./src/components/icons/ServiceIcon.astro) resuelve a **Tabler** o SVG inline (ver `astro.config.mjs → icon.include.tabler`).
- `duration`, `price` — en minutos y euros.
- `featured: true` para destacar en la home (opcional).
- `name`, `description` — objetos `{ ca, es }` con las traducciones.

Iconos: el set activo es **Tabler** (más SVGs custom en `ServiceIcon` si hace falta). Cada nombre nuevo que uses en `services.ts` debe existir en `astro.config.mjs → integrations.icon.include.tabler` o en el mapper del componente.

### 6. Imágenes y galería

- Coloca las fotos reales del cliente en `src/assets/images/<carpeta-cliente>/` (sustituyendo o complementando `src/assets/images/demo/` mientras la web sea pre-handover).
- Edita `src/data/gallery.ts` con las nuevas referencias y `alt` text bilingüe.
- Sustituye la imagen de hero (`heroImage` exportado allí mismo).
- Cuando la web esté lista para entrega, **borra** `src/assets/images/demo/` y la sección "Excepción temporal al principio de no-stock" del `CLAUDE.md`.

### 7a. Reseñas reales — `src/data/reviews.ts`

Tres reseñas reales públicas, copiadas literalmente de la fuente (Google Maps, Tripadvisor, etc.). **Nunca inventar reseñas.** Para cada entrada:

- `authorName`, `authorInitial` (capital).
- `rating` (1–5 entero).
- `dateCa`, `dateEs` — texto humano tal cual aparece en la fuente ("hace 1 mes", "fa 2 mesos").
- `textCa` (opcional, `null` si la reseña no existe en catalán y se usa la traducción Spanish), `textEs` (siempre presente como fallback).
- `language` — idioma original. Si difiere del idioma de la página al renderizar, ReviewCard muestra una nota "traducida automáticamente".
- `isLocalGuide`, `reviewCountByAuthor` opcionales — Google los marca, vale la pena reflejarlos.

Si el negocio no tiene reseñas todavía: dejar `reviews: []` y poner `site.features.reviews = false`. La sección desaparece del home y del contacto.

### 7b. Diferenciadores destacados — `src/data/highlights.ts`

Tres datos editoriales que justifican por qué elegir a este negocio. El primero suele anclar a un dato verificable (rating Google + número de reseñas leídos directamente de `business.ts`); el segundo y tercero son storytelling. Marcar con `pendingConfirmation: true` los que no estén validados con el cliente — la UI los muestra con asterisco discreto.

Iconos de highlights: claves en `highlights.ts` mapeadas a **Tabler** en [`HighlightsBlock.astro`](./src/components/HighlightsBlock.astro). Cada icono Tabler nuevo debe estar en `astro.config.mjs → icon.include.tabler`.

### 7c. Catálogo de productos — `src/data/products.ts`

Lista placeholder hasta que el cliente confirme el catálogo real. Cada entrada lleva `isPlaceholder: true` que activa el badge "Producto de ejemplo" en `<ProductCard>`. Cuando llegue el catálogo real:

1. Reescribe cada entrada con nombres, descripciones y precios reales.
2. Pon `isPlaceholder: false` en cada una — el badge desaparece automáticamente.
3. Si el negocio NO vende productos, pon `site.features.products = false` y elimina la entrada `products` del `routeMap` + del mirror en `header-state.ts ROUTE_MAP`. La página seguirá compilando si la dejas, pero conviene retirarla del navegador.

Iconos custom (`ProductIconKey`): `wax`, `oil`, `brush`, `shampoo`, `balm`, `comb`. Para añadir uno nuevo (p.ej. `pomade`), añade el case al SVG inline en `src/components/icons/ProductIcons.astro` y al type union.

### 7d. Preguntas frecuentes — `src/data/faq.ts`

Seis Q/A pairs cubriendo cita, pago, aparcamiento, duración, niños, idiomas. Sirven como base reusable; modifica el wording según el sector (una panadería tendrá otras preguntas habituales). Usa `pendingConfirmation: true` en cualquier respuesta que falta validar — la UI muestra una nota muted "* pendiente de confirmar con el negocio".

`<SchemaFaqPage>` emite JSON-LD `FAQPage` automáticamente desde estos datos, así que respetar la estructura es suficiente para que Google muestre rich snippets cuando indexe la página.

Si el negocio no quiere FAQ: `site.features.faq = false` y eliminar la entrada `faq` del `routeMap` + mirror.

### 7e. Página careers (opcional)

En **Klip’s** la feature está **desactivada** (`site.features.careers: false`): no hay entradas en `routeMap` y las URLs antiguas redirigen al home (ver [`public/_redirects`](./public/_redirects)).

Para **otro cliente** que sí contrate: reactivar `careers: true`, restaurar rutas en `routes.ts` + mirror en `header-state.ts`, y volver a añadir las páginas `treballa-amb-nosaltres` / `trabaja-con-nosotros` si las eliminaste en un fork. Los textos viven bajo las claves i18n `careers.*`.

### 7g. Botón flotante WhatsApp — `src/components/WhatsAppFloat.astro` (Sprint 4)

Botón flotante en esquina inferior derecha que abre WhatsApp Web / app con mensaje precargado. Activable via `site.features.whatsappFloat`.

- **Teléfono usado**: el componente reutiliza `business.phoneTel` (formato E.164 con `+`); strip de no-dígitos para construir la URL `wa.me/<digits>`. Si cambias el número en `business.ts`, el botón se actualiza automáticamente.
- **Mensaje precargado**: i18n keys `whatsapp.defaultMessage` (CA: "Hola, m'agradaria reservar una cita.", ES: "Hola, me gustaría reservar una cita."). Edita en `src/i18n/ui.ts` para cambiarlo.
- **Páginas excluidas**: la lista `LEGAL_PATHS` en `src/layouts/BaseLayout.astro` define dónde NO se muestra (avis legal, política privacidad, política cookies). Para añadir/quitar páginas de la exclusión, edita ese array.
- **Desactivar globalmente**: `site.features.whatsappFloat = false` y el componente no se renderiza en ninguna página.
- **Z-index**: 8900 — debajo del cookie banner (9000) y de la barra de carga (10000), encima del resto.
- **Animación de entrada**: fade-in + scale + translate después de 1.5 s desde la carga (no compite con el Hero por la atención). CSS-only, sin JS. Bajo `prefers-reduced-motion` aparece directo sin animación.

### 7f. Datos legales — `src/data/legal.ts`

- `legalEntity.taxId` — NIF / CIF del titular.
- `legalEntity.email` — email de contacto para solicitudes RGPD.
- `websiteOwner.developerName` y `developerEmail` — decisión: si figuras públicamente como developer mientras la web es pre-handover, o si no.
- Cuando el cliente firme y tome la titularidad, flippea `websiteOwner.isFinalOwner` a `true`. Los párrafos "pre-handover" desaparecen automáticamente.

### 8. Páginas legales

Las plantillas en `src/pages/{ca,es}/avis-legal.astro`, `politica-privacitat.astro`, `politica-cookies.astro` (y sus equivalentes en `es/`) **leen automáticamente** de `legal.ts` y `business.ts`. No deberías necesitar tocar el texto a no ser que el negocio tenga particularidades (newsletter propia, formulario propio, e-commerce…). Si hay particularidades, el texto debe auditarse con asesor legal real.

### 9. i18n

Por defecto: catalán (CA) y castellano (ES). Para añadir o quitar:

1. Edita `src/i18n/config.ts` — añade el código y exporta el tipo `Lang`.
2. Añade la columna nueva en `src/i18n/ui.ts` — copiar todas las claves al nuevo idioma.
3. Crea `src/pages/<lang>/` con todas las páginas — usa CA o ES como punto de partida.
4. Edita `src/i18n/routes.ts` — añade el campo al `routeMap` para cada ruta.
5. Edita `src/scripts/header-state.ts` — replica `routeMap` en su `ROUTE_MAP` mirror.

**Instancia Klip's:** el `routeMap` incluye `bridal` → `/ca/nuvies/` y `/es/novias/`. No incluye `packs` ni `careers`; las redirecciones 302 para URLs legacy están en [`public/_redirects`](./public/_redirects). Detalle en [`VESSEL_CONTEXT.md`](./VESSEL_CONTEXT.md).

### 10. Verificar en local

```sh
pnpm install
pnpm dev          # http://localhost:4321/
pnpm build        # dist/ con todo el HTML estático
pnpm preview      # sirve dist/ para una revisión real
```

Checklist visual rápido:

- Header: el menú móvil abre/cierra, el switcher CA↔ES navega correctamente.
- Hero del home: comprueba LCP, CTAs de reserva (`getBookingCta`) y animaciones según diseño actual.
- Galería: el cascade fade revela las fotos al hacer scroll.
- Reseñas: el bloque Google Reviews cuadra con `googleReviews` en `business.ts`.
- Footer: los tres links legales abren las páginas correctas en el idioma actual.
- Banner cookies: aparece la primera vez, persiste la decisión en `localStorage`.

### 11. Build y deploy a Cloudflare Pages

```sh
pnpm build
```

En el dashboard de Cloudflare Pages:

- **Build command:** `pnpm install --frozen-lockfile && pnpm build`
- **Output directory:** `dist`
- **Root directory:** vacío (no monorepo).
- **Environment variables:** `NODE_VERSION=22`, `PNPM_VERSION=10.33.2`.

Detalle paso a paso en la sección **"Guía de despliegue a Cloudflare Pages"** del `CLAUDE.md`.

### 12. Conectar dominio personalizado (cuando el cliente lo compre)

1. **Cloudflare Pages → Custom domains → Add a custom domain.**
2. Esperar la propagación DNS (5 min – 48 h).
3. Actualizar `site.canonicalUrl` en `src/data/site.ts`, `astro.config.mjs → site` y `public/robots.txt → Sitemap:`.
4. Commit + push → re-deploy automático.

### 13. Google Business Profile + Search Console (post-handover)

- En el GBP del cliente: edita el campo "Sitio web" con la nueva URL.
- Crea una propiedad en Google Search Console, verifica el dominio (DNS o HTML tag), envía `<dominio>/sitemap-index.xml`.
- Sube fotos del local a GBP — son las que aparecen en el Knowledge Panel.

---

## Checklist post-handover (antes de cobrar la entrega)

- [ ] Dominio comprado, configurado en Cloudflare Pages, certificado SSL activo.
- [ ] La cuenta de Cloudflare está a nombre del cliente (o transferencia documentada).
- [ ] `business.ts` con datos reales (incluido NIF en `legal.ts`).
- [ ] `legal.ts` con email RGPD del titular.
- [ ] `websiteOwner.isFinalOwner = true` en `legal.ts`.
- [ ] Fotos demo (`src/assets/images/demo/`) sustituidas por las del cliente; carpeta demo eliminada del repo.
- [ ] Sección "Qui som" / "Sobre nosotros" del home personalizada con texto real del cliente; `<Badge>` de "Contingut pendent" eliminado.
- [ ] Iconos de servicios revisados con el cliente.
- [ ] Google Business Profile actualizado con la URL.
- [ ] Search Console verificado y sitemap enviado.
- [ ] (Opcional) Cloudflare Email Routing si el dominio sirve para email (`info@dominio.cat` → buzón real).
- [ ] Lighthouse mobile **≥ 95** en home, servicios, galería, contacto y al menos una página legal.
- [ ] Probado en mobile real (no solo emulador) y en desktop.

---

## Stack de la plantilla

- **Astro 6** + TypeScript estricto
- **Tailwind CSS 4** vía `@tailwindcss/vite`
- **pnpm** + Node 22+
- **Lenis** (smooth scroll desktop)
- **Motion** (instalado, sin importar — reservado para animaciones puntuales)
- **`@astrojs/sitemap`** + **`astro-icon`** (subset **Tabler**; ver `astro.config.mjs`)
- **Cloudflare Pages** (hosting estático gratuito + CDN global)
- **Reservas:** **teléfono/WhatsApp** (`booking.provider: 'phone'`) y/o plataforma externa (Fresha, Treatwell, Booksy, URL custom); si el tercero usa XHR, actualizar `connect-src` en `public/_headers`
- **Cloudflare Email Routing** (recomendado para emails `@dominio` sin coste)

---

## Mantenimiento

Tarifa orientativa de mantenimiento post-entrega: **45 €/h con mínimo 30 minutos** por intervención. Cambios estructurales (4+ horas estimadas): presupuesto por fases, no horas sueltas.

Cobrar ANTES de empezar cambios significativos. Adelantar el alta del cliente como editor en GitHub si se quiere autoservicio para textos.

---

## Roadmap de la plantilla (sprints futuros)

- **Sprint 2** — secciones nuevas: reseñas reales (no solo el agregado de Google), productos a la venta, FAQ, premios y menciones de prensa, mejor placeholder visual de "Qui som".
- **Sprint 3 (TBD)** — automatización del sync `theme.ts` → `global.css` con un Vite plugin custom; CMS ligero (Decap?) para que el cliente edite textos sin tocar código; integración Cloudflare Web Analytics.

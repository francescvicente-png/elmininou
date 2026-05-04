# CONTEXT — El mini nou

> **Documento único de contexto técnico y de producto del proyecto.**
> Punto de entrada obligatorio para cualquier agente (Claude Code u otros) antes de tocar código.
> Última consolidación: 04/05/2026 (sincronizada con `CLAUDE.md` v2.0 en raíz).
> Sustituye y deja obsoletos a: `Auditoria_Completa_ElMiniNou.md`, `DOSSIER_ESTADO_ELMININOU.md`, `docs/HANDOFF_EL_MINI_NOU.md`.

Para el estado del producto en lenguaje llano (jefes, cliente) → `ESTADO_ELMININOU.md`.
Para la fuente canónica de la carta → `MENU_ELMININOU.md`.

---

## Índice

1. [Identidad del producto y del cliente](#1-identidad-del-producto-y-del-cliente)
2. [Stack y arquitectura](#2-stack-y-arquitectura)
3. [Mapa de páginas y funcionalidades](#3-mapa-de-páginas-y-funcionalidades)
4. [Datos cargados y feature flags](#4-datos-cargados-y-feature-flags)
5. [Tema visual y sistema de diseño](#5-tema-visual-y-sistema-de-diseño)
6. [Componentes propios vs heredados](#6-componentes-propios-vs-heredados)
7. [SEO y Schema.org](#7-seo-y-schemaorg)
8. [Decisiones técnicas tomadas](#8-decisiones-técnicas-tomadas)
9. [Diferencias con la plantilla Klip's](#9-diferencias-con-la-plantilla-klips)
10. [Build, rendimiento y métricas](#10-build-rendimiento-y-métricas)
11. [Deuda técnica heredada](#11-deuda-técnica-heredada)
12. [Bloqueantes y pendientes con el cliente](#12-bloqueantes-y-pendientes-con-el-cliente)
13. [URLs, comandos locales y deploy](#13-urls-comandos-locales-y-deploy)

---

## 1. Identidad del producto y del cliente

### 1.1 Producto

- **Nombre comercial:** El mini nou
- **Tipo:** bar-restaurante con **minigolf de 18 hoyos integrado** al local. Cocina informal: brasas, platos combinados, tapas, entrepans, hamburguesas.
- **Diferenciador comercial principal:** el **minigolf**. Gratuito si se come en el restaurante; **5 €/persona si solo se juega**. Es el ángulo más fuerte de la web frente a otros restaurantes locales.
- **Repositorio:** `francescvicente-png/elmininou` (este repo)
- **Subcarpeta del código:** `web/` (Astro 6 estático)
- **Hosting actual:** Cloudflare Pages → `https://elmininou.pages.dev`
- **Estado:** pre-producción, en revisión interna antes de presentar al restaurante.
- **Web actual del cliente:** NO TIENEN. El dominio `espaielmini.com` (del local anterior) está expirado y en venta.

### 1.2 NAP (Name, Address, Phone)

| Campo | Valor |
|---|---|
| Dirección | Carrer Jeroni de Moragas, 13 — 08480 L'Ametlla del Vallès (Barcelona), España |
| Teléfono | 604 92 79 03 → E.164 `+34604927903` |
| Instagram | [@elmininou](https://www.instagram.com/elmininou/) |
| Email RGPD | `francecsvicente@gmail.com` ⚠️ con typo aparente (probablemente `francescvicente`) |
| Coordenadas geo | **41.67069170689928, 2.254346301702218** (verificadas en Google Maps por Francesc; reflejadas en `business.ts`) |
| Google Place ID | ⚠️ vacío |
| Nombre legal/fiscal | ⚠️ "Titular fiscal pendent" (placeholder) |
| NIF titular | ⚠️ "TODO_NIF_TITULAR" (placeholder) |

**⚠️ Directorios terceros:** los nombres y teléfonos en directorios externos pueden no coincidir con la realidad. Mantener **604 92 79 03** como fuente declarada por el titular.

### 1.3 Horario (Europe/Madrid)

| Día | Horario |
|---|---|
| Lunes | Cerrado |
| Martes | Cerrado |
| Miércoles | Cerrado |
| Jueves | 20:00 – 23:00 |
| Viernes | 20:00 – 23:00 |
| Sábado | 09:00 – 23:00 |
| Domingo | 09:00 – 16:00 |

**Pendiente:** validar con el cliente antes de cerrar el Schema.org. Confirmar si hay temporada alta/baja.

### 1.4 Reseñas de Google

- **5,0 ★ · 11 reseñas** (a 02/05/2026).
- Hardcoded en `googleReviews` (`src/data/business.ts`).
- El array `src/data/reviews.ts` está **vacío** y `site.features.reviews = false`. La home renderiza un bloque editorial bento construido a mano con las 8 reseñas con texto reales (ver §3.4).

### 1.5 Prestador legal LSSI (del sitio web, no del restaurante)

- **Persona física:** Francesc Josep Vicente Blanco
- **NIF:** 48167829X
- **Dirección:** Carrer Nou, 82, 08492 Sant Martí de Centelles (Barcelona)
- **Email:** `francecsvicente@gmail.com` (verificar typo)
- **Titular fiscal del restaurante:** pendiente de obtener por escrito.

### 1.6 Estado comercial y reglas de comunicación con el cliente

- **Estado comercial:** **prospección fría**. El cliente todavía **no ha sido contactado**. Francesc visitó el local como cliente (con sus padres) y decidió hacer la web por iniciativa propia como prospección comercial.
- **Sistema de reservas actual del restaurante:** solo teléfono y WhatsApp. **NO** usan Fresha, Treatwell ni similar.
- **Rating Google:** 5,0 con 11 reseñas (todas con texto positivo, perfil joven).

**⚠️ REGLA ABSOLUTA DE COMUNICACIÓN:** el local anterior en el mismo edificio se llamaba **"elMini VERMUTS & GRILL"** y cerró. El propietario actual de "El mini nou" es **distinto** y tomó el relevo. **NO mencionar nunca al cliente el local anterior** — el dueño actual no quiere que se le recuerde el antecedente. Esto aplica también a copy de la web, mensajes de presentación, etc.

### 1.7 Modelo económico cerrado (referencia interna, no contractual)

- **Web base:** 1.100 €.
- **Sesión fotográfica:** 200 € (15-20 fotos: comida + interior + minigolf, 2-3 h en local).
- **Total recomendado:** 1.300 €.
- **Cobro:** 50 % al inicio, 50 % al lanzamiento.
- **Plazo:** 10-14 días desde la sesión fotográfica.
- **Mantenimiento:** 240 €/año en factura única anual. Incluye dominio, 3 actualizaciones de carta/año, 2 cambios pequeños/año, monitorización mensual, soporte WhatsApp prioridad 24-48 h.
- **Cambios fuera del plan:** 30 € puntual, 45 €/h trabajo grande.
- **Forma de pago:** a elección del cliente (efectivo, Bizum, transferencia).
- **Factura:** pendiente de la decisión fiscal de Francesc (alta epígrafe 763 vía gestor).

---

## 2. Stack y arquitectura

### 2.1 Tabla resumen

| Capa | Tecnología | Versión / detalle |
|---|---|---|
| Framework web | Astro | 6.1.9, `output: 'static'` (HTML puro, sin servidor) |
| Lenguaje | TypeScript | strict mode (`extends: "astro/tsconfigs/strict"`) |
| CSS | Tailwind CSS 4 vía `@tailwindcss/vite` | 4.2.4 (sin PostCSS) |
| Smooth scroll | Lenis | 1.3.23 (solo desktop, bail-out en `prefers-reduced-motion`) |
| Animaciones | Motion (framer-motion) | 12.38.0 |
| Sitemap | `@astrojs/sitemap` | 3.7.2 |
| Procesado de imagen | Sharp | 0.34.5 |
| Iconos | Tabler vía `astro-icon` | 1.2.33 (~50 iconos tree-shaken) |
| Tipografía display | Playfair Display SC | auto-hospedada en build |
| Tipografía cuerpo | Karla | auto-hospedada en build |
| Hosting | Cloudflare Pages | edge CDN global |
| Analytics | Microsoft Clarity | **no configurado** (`clarityProjectId: ''`) |
| Node mínimo | 22.12.0 |  |
| Gestor de paquetes | pnpm |  |

### 2.2 `package.json` (resumido)

```json
{
  "name": "klips-estilistes-web",          // ⚠️ HEREDADO de la plantilla anterior
  "type": "module",
  "version": "0.0.1",
  "private": true,
  "engines": { "node": ">=22.12.0" },
  "scripts": {
    "dev": "astro dev",
    "predev": "node scripts/copy-brand-logo.mjs",
    "prebuild": "node scripts/sync-theme.mjs && node scripts/copy-brand-logo.mjs && node scripts/generate-og-image.mjs",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "@astrojs/sitemap": "^3.7.2",
    "astro": "^6.1.9",
    "astro-icon": "^1.1.5",
    "lenis": "^1.3.23",
    "motion": "^12.38.0"
  },
  "devDependencies": {
    "@iconify-json/tabler": "^1.2.33",
    "@tailwindcss/vite": "^4.2.4",
    "sharp": "^0.34.5",
    "tailwindcss": "^4.2.4"
  }
}
```

### 2.3 `astro.config.mjs` — claves

- `site: 'https://elmininou.pages.dev'`
- `output: 'static'`
- Sitemap excluye rutas `/dev/`.
- Iconos Tabler incluidos: navegación (`arrow-up-right`, `chevron-*`, `menu-2`, etc.), comunicación (`brand-instagram`, `brand-whatsapp`, `mail`, `phone`, `map-pin`), marca/contenido (`star`, `award`, `heart`, `quote`), gastronomía (`flame`, `bowl`, `meat`, `fish`, `salad`, `cheese`, `sausage`, `carrot`, `bread`, `beer`) **y residuos heredados** (`razor`, `razor-electric`, `mood-kid`, `scissors`).
- Fuentes Google auto-hospedadas en build con `fontProviders.google()` (Playfair Display SC y Karla).

### 2.4 Estructura del repositorio (raíz)

```
elmininou/
├── CLAUDE.md              ← contrato de trabajo del proyecto (técnico, en raíz)
├── CONTEXT_ELMININOU.md   ← este archivo: contexto técnico+producto
├── ESTADO_ELMININOU.md    ← escaparate del producto en lenguaje llano
├── MENU_ELMININOU.md      ← fuente canónica de la carta
├── README.md              ← índice corto del repo + arranque
├── docs/
│   └── reference/         ← capturas físicas del menú (PDF/PNG del restaurante)
├── skills-lock.json
└── web/                   ← código Astro (subcarpeta de trabajo)
    ├── astro.config.mjs
    ├── package.json
    ├── public/
    ├── scripts/           ← copy-brand-logo, sync-theme, generate-og-image…
    └── src/
        ├── assets/images/
        │   ├── menu-generated/      ← 50+ ilustraciones de platos generadas con Gemini
        │   ├── generated/           ← mezcla restaurante + residuos peluquería
        │   └── demo/                ← residuos de plantilla peluquería
        ├── components/
        │   ├── restaurant/   ← Header/Footer/HomePage propios del restaurante
        │   ├── menu/         ← MenuPageHero
        │   ├── sections/     ← 24 secciones (varias deshabilitadas)
        │   ├── seo/          ← SchemaLocalBusiness, SchemaFaqPage, etc.
        │   ├── bridal/       ← ⚠️ heredado, NO se usa
        │   └── (35 componentes raíz compartidos)
        ├── config/
        │   ├── theme.ts              ← tokens de diseño (única fuente de verdad)
        │   ├── home-sections.ts      ← orquestador (parcialmente obsoleto, ver §11)
        │   └── home-page-canvas.ts
        ├── data/
        │   ├── business.ts           ← NAP del restaurante
        │   ├── site.ts               ← feature flags, businessType
        │   ├── services.ts (822 ln)  ← LA CARTA (50+ platos en 8 categorías)
        │   ├── menu-illustrations.ts ← mapeo plato ↔ imagen IA
        │   ├── faq.ts                ← 10 preguntas
        │   ├── gallery.ts            ← 12 imágenes IA
        │   ├── highlights.ts
        │   ├── home-gallery-preview.ts
        │   ├── legal.ts
        │   ├── reviews.ts            ← array vacío (las reseñas reales están en home, no aquí)
        │   ├── bridal.ts (505 ln)    ← ⚠️ heredado, no se usa
        │   ├── packs.ts              ← ⚠️ heredado, no se usa
        │   ├── products.ts           ← ⚠️ heredado, no se usa
        │   ├── equip.ts              ← ⚠️ placeholders peluquería
        │   ├── manifesto.ts          ← placeholder, sección desactivada
        │   └── storytelling.ts       ← placeholder, sección desactivada
        ├── i18n/                     ← config.ts, routes.ts, ui.ts, utils.ts
        ├── layouts/BaseLayout.astro
        ├── pages/
        │   ├── 404.astro
        │   ├── ca/ (9 páginas)
        │   ├── es/ (9 páginas)
        │   ├── dev/ (3 páginas internas, fuera del sitemap)
        │   └── index.astro           ← redirección por idioma
        ├── scripts/                  ← 22 scripts cliente (lenis, lightbox, magnetic, etc.)
        ├── styles/global.css
        └── types/photo-license.ts
```

---

## 3. Mapa de páginas y funcionalidades

### 3.1 Rutas implementadas (bilingüe CA/ES, espejo perfecto)

| Ruta CA | Ruta ES | Contenido |
|---------|---------|-----------|
| `/` | — | Redirección por idioma (HTML estático + JS + meta-refresh fallback) |
| `/ca/` | `/es/` | Portada / Home (`RestaurantHomePage.astro`) |
| `/ca/menu/` | `/es/menu/` | Carta digital completa (50+ platos en 8 categorías) |
| `/ca/minigolf/` | `/es/minigolf/` | **Página dedicada al minigolf de 18 hoyos** (mayor diferenciador comercial) |
| `/ca/galeria/` | `/es/galeria/` | Galería 12 imágenes IA + lightbox View Transitions |
| `/ca/contacte/` | `/es/contacto/` | Canales de contacto |
| `/ca/com-arribar/` | `/es/como-llegar/` | Cómo llegar (mapa link + dirección) |
| `/ca/faq/` | `/es/faq/` | 10 preguntas en acordeón + Schema FAQPage |
| `/ca/avis-legal/` | `/es/aviso-legal/` | Aviso legal LSSI (con placeholders) |
| `/ca/politica-privacitat/` | `/es/politica-privacidad/` | RGPD |
| `/ca/politica-cookies/` | `/es/politica-cookies/` | Política de cookies |
| `/dev/styleguide/` | — | Solo dev (excluida del sitemap) |
| `/dev/components-preview/` | — | Solo dev |
| `/dev/logo-preview/` | — | Solo dev |

### 3.2 Rutas que NO existen (eliminadas o nunca implementadas para restaurante)

- `productes` / `productos` → eliminada (catálogo retail de Klip's, no aplica).
- `nuvies` / `novias` → eliminada (bridal de peluquería).
- `serveis` / `servicios` → renombrada a `menu`.
- `packs`, `treballa-amb-nosaltres` → nunca implementadas.

### 3.3 Funcionalidades — Portada (`/ca/`, `/es/`)

**Hero**
- Animación de revelado por carácter en el H1 (stagger 30 ms/carácter) + efecto magnético al cursor (radio 220 px, intensidad 0.18). Solo desktop, respeta `prefers-reduced-motion`.
- Imagen de fondo AVIF + WebP, `<link rel="preload" fetchpriority="high">` con srcset 768/1024/1280/1920/2400 px.
- Dos CTAs primarios: "Reservar" (`tel:`) y "Veure carta" (link a `/ca/menu/`).
- Anchor "↓ Plats destacats" con scroll suave Lenis.

**Quick info bar (3 columnas)**
- Horario con badge en tiempo real (ver §3.11).
- Teléfono clicable.
- Dirección con link a Google Maps (URL construida con dirección codificada).

**Selección de carta destacada**
- 6 platos `featured` extraídos de `services.ts`.
- Cada tarjeta: nombre, precio en EUR (`Intl.NumberFormat` locale `ca-ES` / `es-ES`), descripción con alérgenos en texto, icono Tabler temático.
- Fallback "A confirmar en sala" cuando `price === null`.
- Hover micro-elevación (`translate-y-0.5`, `shadow-md`).

**Bloque editorial de reseñas Google reales** (añadido en últimas sesiones)
- Las 8 reseñas con texto reales se renderizan en composición bento: cita destacada grande + tarjetas alrededor.
- Mitja 5,0 ★ y contador de las 11 reseñas verificadas (3 sin texto se cuentan pero no se citan).
- Cada cita incluye: nombre del autor, fecha, distintivo "Local Guide" cuando corresponde, marca "Reseña verificada en Google".
- Si la reseña original es en castellano, la versión catalana incluye aviso de traducción automática.

**Banner CTA naranja**
- Dos botones: teléfono (`tel:`) y WhatsApp con mensaje pre-formateado URL-encoded (`wa.me/?text=...`).

**Sección "On som"**
- `<address>` semántico + link a Google Maps. (Antes había placeholder de mapa incrustado, ya eliminado).

### 3.4 Funcionalidades — Carta (`/ca/menu/`, `/es/menu/`)

- **Hero editorial** con imagen IA + título + subtítulo.
- **Nav sticky** de categorías (z-30, `backdrop-blur-xl`, `top-20`): se ancla al scroll y permite saltar entre las 8 secciones.
- **Plats firma** al inicio: 3 clásicos destacados con foto grande y precio visible (orientado a primer cliente).
- **Filtros dietéticos rápidos** combinables: brasa, vegetarià, sense gluten, per compartir, picant. Aplican filtro client-side instantáneo.
- **Catálogo agrupado** con 50+ platos en 8 categorías (`SERVICE_CATEGORY_ORDER`):
  - `starters` — Per començar / Para empezar (14 platos)
  - `grills` — Brases (6)
  - `pasta` — Pasta (2)
  - `combos` — Combinats (8)
  - `sandwiches-hot` — Entrepans calents (6)
  - `sandwiches-cold` — Entrepans freds (4)
  - `tapas` — Tapes (9)
  - `drinks` — Begudes (4 grupos representativos)
- Cada plato: foto IA + nombre + precio EUR + descripción bilingüe + alérgenos en texto.
- **Detalle ampliado** al abrir imagen: foto grande + nombre + precio + ingredientes + bloque de aviso de alérgenos + recordatorio de confirmar en sala.
- **Bloque política de alérgenos** destacado: la carta impresa es la referencia legal.
- **CTA final** de reserva por teléfono.

### 3.5 Funcionalidades — Minigolf (`/ca/minigolf/`, `/es/minigolf/`)

Página dedicada al **mayor diferenciador comercial** del local.

- **Hero editorial** del minigolf.
- **Componentes propios:** `MinigolfSection.astro` (también usado en home como teaser) y `MinigolfHoles.astro` (presentación de los 18 hoyos).
- **Modelo de uso:** gratis si comes en el restaurante; **5 €/persona si solo juegas**. Esta regla queda explícita en la página.
- **Schema.org:** la página emite `@type: Service` apuntando al `Restaurant` principal vía `@id`. No es un negocio aparte: es un servicio del restaurante.
- **CTAs:** reservar mesa por teléfono / WhatsApp (no hay reserva de pista propia — viene incluida con la mesa).

### 3.6 Funcionalidades — Galería (`/ca/galeria/`, `/es/galeria/`)

- Hero con título editorial.
- **Filtro por categorías**: Tot / El local / Cuina i barra / Plats / Brasa / Taules. Implementado con `data-category` + `IntersectionObserver`.
- **Mosaico** de 12 imágenes (todas IA, etiquetadas como tal en `alt`).
- **Lightbox fullscreen** en `<dialog>` nativo:
  - Apertura con morph vía **View Transitions API** (thumbnail → fullscreen).
  - Navegación por teclado (←/→) y táctil (scroll-snap nativo en mobile).
  - Dots indicadores sincronizados con `IntersectionObserver`.
  - Fallback sin JS: `<dialog>` estándar sin animación.
  - Progressive enhancement: si el browser no soporta View Transitions, abre sin morph.
- Pull quote editorial + CTA contacto.

### 3.7 Funcionalidades — FAQ (`/ca/faq/`, `/es/faq/`)

- 10 preguntas/respuestas en acordeón. Bilingüe (`questionCa/Es`, `answerCa/Es`).
- Temas: reserva de mesa, métodos de pago, aparcamiento, horario, alérgenos, idiomas, sin app de reservas externa, grupos grandes, cambios/cancelaciones, comida para llevar.
- **5 de 10 preguntas con `pendingConfirmation: true`** — pendientes de validación con el restaurante (no muestran badge visible al usuario, pero sí flag interno).
- Schema.org `FAQPage` JSON-LD para rich snippets en Google.

### 3.8 Funcionalidades globales — Header

- Logo clicable a inicio.
- Switcher de idioma CA/ES con rutas emparejadas.
- CTA "Truca per reservar" (`tel:`).
- Menú hamburguesa en móvil (con checkbox CSS como fallback sin JS).
- **Shyness**: se oculta al hacer scroll hacia abajo, reaparece al subir.
- **Image trail**: al hover sobre el link "Galeria", miniaturas siguen al cursor (solo desktop; cancelado en `prefers-reduced-motion` y touch). Defensa anti-stale state con `elementFromPoint` en cada frame de RAF, para evitar que el trail se quede activo tras una View Transition.

### 3.9 Funcionalidades globales — Footer

- Horario completo, teléfono clicable, dirección con Google Maps, Instagram.
- Links a páginas legales.
- Nota explícita: "imatges il·lustratives generades amb IA".

### 3.10 WhatsApp flotante

- Botón fijo esquina inferior derecha, mensaje pre-rellenado en URL.
- **Ocultado en páginas legales** vía lista hardcoded en `BaseLayout.astro` (`LEGAL_PATHS`):

```ts
const LEGAL_PATHS: ReadonlyArray<string> = [
  '/ca/avis-legal/', '/es/aviso-legal/',
  '/ca/politica-privacitat/', '/es/politica-privacidad/',
  '/ca/politica-cookies/', '/es/politica-cookies/',
];
const showWhatsApp = site.features.whatsappFloat && !LEGAL_PATHS.includes(Astro.url.pathname);
```

Decisión de layout (no feature flag): en una página legal el CTA de venta es intrusivo y demuestra inconsistencia.

### 3.11 Badge de apertura en tiempo real

- "Obert ara · tanca a les 23:00" / "Tancat ara · obrim a les..." / "Tancat avui · obrim dijous a les...".
- Calculado en cliente con el reloj del visitante. Recalcula cada 60 s.
- **Multi-slot diario**: si hay cierre a mediodía y reapertura, detecta ambos tramos.
- Lookup hacia adelante hasta 7 días para buscar el próximo día abierto.
- Sin JS: `display:none` (degradación elegante).

```ts
// src/scripts/opening-now.ts:79-123
function computeStatus(now: Date, hours): Status {
  const todaySlots = hours[todayKey];
  const nowMins = now.getHours() * 60 + now.getMinutes();
  if (todaySlots?.length) {
    for (const [from, to] of todaySlots) {
      if (nowMins >= parseTime(from) && nowMins < parseTime(to)) return { state: 'open', closeAt: to };
    }
    for (const [from] of todaySlots) {
      if (parseTime(from) > nowMins) return { state: 'opens-later', openAt: from };
    }
  }
  for (let ahead = 1; ahead <= 7; ahead++) {
    const nextKey = dayKeyByJsDay[(todayJsDay + ahead) % 7];
    const nextSlots = hours[nextKey];
    if (nextSlots?.length) return { state: 'closed', nextOpenDay: nextKey, nextOpenAt: nextSlots[0][0] };
  }
}
```

### 3.12 Banner de cookies

- LSSI compliant. Bilingüe (detecta idioma de URL en SSR).
- Estado persistido en `localStorage`.
- Animación entrada/salida (translate + opacity).
- **`transition:persist`** en Astro: no parpadea entre navegaciones SPA.
- **No tiene efecto funcional de gating todavía** porque no se carga ningún tracker que lo necesite (Clarity está vacío). Cuando se active, la infra ya está lista.

### 3.13 Otros globales

- **Scroll suave Lenis**: solo desktop, bail-out en `prefers-reduced-motion`. Mobile usa scroll nativo.
- **View Transitions SPA**: animación slide entre páginas con `ClientRouter`. Reset a top en cada nav (excepto si la URL tiene hash).
- **PageLoadingBar**: barra de progreso de navegación SPA, `transition:persist`.
- **Scroll reveal**: `IntersectionObserver` para secciones con fade-in al entrar en viewport.
- **OG images**: generadas en build con Sharp 1200×630 JPEG q86, una por idioma (`default-ca.jpg`, `default-es.jpg`, `default.jpg` alias CA). Composición: hero + scrim oscuro SVG + logo + copy bilingüe.
- **Favicons**: PNGs 16/32/48/180/192/512 generados en build.
- **`scripts/sync-theme.mjs`**: parsea `theme.ts` con regex y reescribe el bloque `@theme` de `global.css` entre marcadores. Tema sincronizado en `prebuild`. Evita duplicar tokens entre TS y CSS.

---

## 4. Datos cargados y feature flags

### 4.1 `src/data/business.ts` — NAP

```ts
export const business: Business = {
  name: 'El mini nou',
  legalName: 'Titular fiscal pendent',          // ⚠️ PLACEHOLDER
  languages: ['ca', 'es'],
  defaultLang: 'ca',
  address: {
    street: 'Carrer Jeroni de Moragas, 13',
    postalCode: '08480',
    city: "L'Ametlla del Vallès",
    region: 'Barcelona',
    country: 'ES',
  },
  geo: { lat: 41.67069170689928, lon: 2.254346301702218 }, // ✅ verificadas en Maps
  phone: '604 92 79 03',
  phoneTel: '+34604927903',
  freshaUrl: '',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Carrer+Jeroni+de+Moragas+13...',
  googlePlaceId: '',                            // ⚠️ VACÍO
  socialLinks: { instagram: 'https://www.instagram.com/elmininou/' },
};

export const openingHours = {
  monday: null, tuesday: null, wednesday: null,
  thursday: [['20:00', '23:00']],
  friday:   [['20:00', '23:00']],
  saturday: [['09:00', '23:00']],
  sunday:   [['09:00', '16:00']],
};

export const googleReviews = {
  rating: 5, count: 11,
  url: business.googleMapsUrl,
  lastUpdated: '2026-05-02',
};
```

### 4.2 `src/data/site.ts` — feature flags

```ts
export const site: SiteConfig = {
  canonicalUrl: 'https://elmininou.pages.dev',
  ogImageCacheBust: '3',
  businessType: 'restaurant',                    // ✅ correcto
  features: {
    services: true,                              // → carta digital
    gallery: true,
    reviews: false,                              // ⚠️ array vacío; las reseñas reales están en home
    products: false,
    faq: true,
    blog: false,
    awards: false,
    onlineBooking: false,                        // tel: como CTA primario
    careers: false,
    whatsappFloat: true,
  },
  booking: { provider: 'phone', url: '' },
  analytics: { clarityProjectId: '' },           // ⚠️ ANALYTICS NO CONFIGURADO
};
```

### 4.3 `src/data/services.ts` — la carta (822 líneas)

```ts
export const SERVICE_CATEGORY_ORDER = [
  'starters', 'grills', 'pasta', 'combos',
  'sandwiches-hot', 'sandwiches-cold', 'tapas', 'drinks',
];
```

Estructura de cada plato:

```ts
{
  id: string;
  icon: string;                  // Tabler icon
  duration: 0;                   // ⚠️ heredado de plantilla peluquería, sin uso real
  price: number | null;
  category: ServiceCategoryKey;
  featured?: boolean;            // 6 platos featured aparecen en home
  pendingConfirmation?: boolean;
  illustration?: ImageMetadata;  // foto IA del plato
  name: { ca: string; es: string };
  description: { ca: string; es: string };  // alérgenos en texto plano dentro
}
```

Ejemplo real:

```ts
{
  id: 'amanida-el-mini',
  icon: 'leaf',
  duration: 0,
  price: 11,
  category: 'starters',
  featured: true,
  name: { ca: 'Amanida «El mini»', es: 'Ensalada «El mini»' },
  description: {
    ca: "Mesclum, poma, nous, gall d'indi, ceba, pastanaga, blat de moro, salsa rosa. Al·lèrgens (text): nous, ou.",
    es: "Mezclum, manzana, nueces, pavo, cebolla, zanahoria, maíz, salsa rosa. Alérgenos (texto): nueces, huevo.",
  },
},
```

> **La fuente canónica de la carta en Markdown** está en `MENU_ELMININOU.md` en la raíz. Esa transcripción es el origen para alimentar `services.ts`.

### 4.4 `src/data/menu-illustrations.ts`

Mapeo `id` → `ImageMetadata` para las 50+ ilustraciones IA en `src/assets/images/menu-generated/dish-*.jpg`. Generadas con **Gemini (modelo nano-banana 2)**.

```ts
export const MENU_DISH_ILLUSTRATIONS = {
  'amanida-el-mini': dishAmanidaElMini,
  'amanida-codony': dishAmanidaCodony,
  // ...50+ entradas
};
```

### 4.5 `src/data/legal.ts`

```ts
export const serviceProvider = {
  fullName: 'Francesc Josep Vicente Blanco',
  taxId: '48167829X',
  addressLine: 'Carrer Nou, 82, 08492 Sant Martí de Centelles (Barcelona)',
  email: 'francecsvicente@gmail.com',     // ⚠️ typo: "francecs" → debería ser "francesc"
};

export const legalEntity = {
  tradeName: business.name,
  legalName: business.legalName,           // ⚠️ 'Titular fiscal pendent'
  address: 'Carrer Jeroni de Moragas, 13, 08480 L\'Ametlla del Vallès',
  taxId: 'TODO_NIF_TITULAR',                // ⚠️ PLACEHOLDER
  email: serviceProvider.email,
  phone: business.phone,
  registryInfo: null,
};

export const legalLastUpdated = '2026-05-02';
```

### 4.6 Otros archivos de datos

| Archivo | Estado | Notas |
|---|---|---|
| `gallery.ts` (309 ln) | ✅ usado | 12 imágenes IA. Categorías con IDs heredados (`space`, `tools`, `cuts`, `color`, `care`) pero labels traducidos a "El local / Cuina i barra / Plats / Brasa / Taules". |
| `faq.ts` (130 ln) | ✅ usado | 10 preguntas; 5 con `pendingConfirmation: true`. |
| `highlights.ts` | ✅ usado | 3 diferenciadores: "Brases, carta i bar", "A L'Ametlla del Vallès", "★ a Google" (counter animado a 5.0). |
| `home-gallery-preview.ts` | ✅ usado | 3 imágenes IA: interior, mesa puesta, parrilla. |
| `facts.ts` | ❌ desactivado | 4 facts; sección `facts` desactivada en `home-sections.ts`. |
| `reviews.ts` | ❌ vacío | Las reseñas reales se renderizan en home como bloque editorial bento, no desde aquí. |
| `bridal.ts` (505 ln) | ❌ HEREDADO | Página de bodas/núvies de peluquería. Sin uso. |
| `packs.ts` (109 ln) | ❌ HEREDADO | Pack 5 talls + targeta regal de Klip's. |
| `products.ts` (205 ln) | ❌ HEREDADO | Champús, cepillos. |
| `equip.ts` (88 ln) | ❌ HEREDADO | 4 estilistas de peluquería (Marc, Laia, Judit, Clara). |
| `manifesto.ts` | ❌ desactivado | Copy de salón. |
| `storytelling.ts` | ❌ desactivado | Placeholder restaurante 4 escenas. |

---

## 5. Tema visual y sistema de diseño

### 5.1 `src/config/theme.ts`

Única fuente de verdad para colores, fuentes y motion. Espacio de color **OKLCH** (perceptualmente uniforme — degradados y `color-mix` se ven bien sin bandas grises).

```ts
export const theme = {
  colors: {
    background:        'oklch(98.8% 0.014 58)',    // Warm paper / orange blossom
    backgroundAlt:     'oklch(100% 0 0)',
    foreground:        'oklch(0% 0 0)',             // Negro neutro (del logo)
    muted:             'oklch(48% 0.02 265)',
    border:            'oklch(91% 0.042 58)',
    primary:           'oklch(68.5% 0.193 54)',     // Naranja vivo ≈ #FF7518
    primaryHover:      'oklch(60% 0.19 54)',
    primaryForeground: 'oklch(100% 0 0)',
    accent:            'oklch(42% 0.14 50)',        // Burnt orange
    accentHover:       'oklch(37% 0.14 50)',
    accentForeground:  'oklch(100% 0 0)',
    onImage:           'oklch(98% 0.01 85)',
    rating:            'oklch(72% 0.15 74)',        // Earth gold (estrellas)
  },
  fonts: {
    display: '"Playfair Display SC", "Playfair Display", Georgia, serif',
    body:    '"Karla", system-ui, sans-serif',
  },
  motion: {
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    durationFast: '150ms',
    durationNormal: '250ms',
    durationSlow: '400ms',
  },
};
```

`HOME_PAGE_CANVAS_COLOR = '#FFF7F4'` (overscroll background).

### 5.2 `src/config/home-sections.ts` — orquestador (parcialmente obsoleto)

```ts
export const homeSections = [
  { id: 'hero', enabled: true },
  { id: 'highlights', enabled: true },
  { id: 'services-preview', enabled: true },
  { id: 'equip', enabled: false },                // ❌ peluquería
  { id: 'bridal-teaser', enabled: false },        // ❌ bridal
  { id: 'gallery-preview', enabled: true },
  { id: 'post-gallery-hero', enabled: false },
  { id: 'reviews', enabled: false },              // (las reales están en home, hardcoded)
  { id: 'marquee', enabled: false },
  { id: 'facts', enabled: false },
  { id: 'manifesto', enabled: false },
  { id: 'storytelling', enabled: false },
  { id: 'interlude-aiguafreda', enabled: false }, // ❌ Aiguafreda era pueblo de Klip's
  { id: 'about', enabled: true },
  { id: 'interlude-ofici', enabled: false },
  { id: 'location', enabled: true },
  { id: 'cta-banner', enabled: true },
  { id: 'logo-video', enabled: false },
];
```

> **⚠️ Aviso para futuros agentes:** la portada actual (`/ca/`) **NO usa este sistema**. Renderiza un componente monolítico `RestaurantHomePage.astro` con su propio layout. El array `homeSections` está quedando obsoleto sin haberse borrado. Coexisten dos sistemas — decidir cuál se mantiene.

### 5.3 Tokens CSS expuestos

`scripts/sync-theme.mjs` regenera el bloque `@theme` de `global.css` desde `theme.ts` en cada `prebuild`:

```css
@theme {
  --font-display: var(--font-playfair-display-sc), Georgia, serif;
  --font-body: var(--font-karla), system-ui, sans-serif;
  --color-background: oklch(98.8% 0.014 58);
  --color-foreground: oklch(0% 0 0);
  --color-primary: oklch(68.5% 0.193 54);
  --color-accent: oklch(42% 0.14 50);
  --radius-sm: 0.25rem;  --radius-md: 0.5rem;  --radius-lg: 0.75rem;
  --radius-xl: 1rem;     --radius-full: 9999px;
  --shadow-sm: ...; --shadow-md: ...; --shadow-lg: ...;
  --duration-fast: 150ms; --duration-normal: 250ms; --duration-slow: 400ms;
}
```

---

## 6. Componentes propios vs heredados

### 6.1 Específicos del restaurante (creados o adaptados)

- `src/components/restaurant/RestaurantHeader.astro`
- `src/components/restaurant/RestaurantFooter.astro`
- `src/components/restaurant/RestaurantHomePage.astro` ← **portada monolítica**
- `src/components/menu/MenuPageHero.astro`
- `src/components/menu/MenuSignatureDishes.astro` — plats firma destacados al inicio de la carta.
- `src/components/menu/MenuDietaryFilter.astro` — filtros dietéticos client-side combinables.
- `src/components/menu/MenuStoryBreak.astro` — interludios editoriales entre secciones de carta.
- `src/components/sections/MinigolfSection.astro` — bloque de minigolf (home + página dedicada).
- `src/components/sections/MinigolfHoles.astro` — presentación de los 18 hoyos.
- `src/components/sections/ReviewsBentoSection.astro` — bento editorial de reseñas reales de Google en home.

### 6.2 Compartidos (válidos para cualquier sector)

Header, Footer, Button, Card, Container, Heading, Text, Section, Marquee, Badge, FaqItem, FaqList, GalleryFilter, GalleryGrid, GalleryLightbox, OpeningHours, ReviewCard, ReviewsBlock, GoogleReviewsBlock, ServiceCard, Hero, HighlightsBlock, LocationBlock, CookieBanner, WhatsAppFloat, PageLoadingBar, CtaBanner, EditorialDivider, Link, LanguageSwitcher, MagazineGallery, TypographicInterlude.

### 6.3 Heredados pero NO usados (deuda — limpiar)

- `BridalLanding.astro` y toda la carpeta `src/components/bridal/` (8 componentes).
- `ProductCard.astro`, `ProductShowcaseCard.astro`.
- `PackCard.astro`, `PacksTeaser.astro`, `NuviesTeaser.astro`.
- `CinematicIntro.astro` (cortina de barbería).
- `StorytellingSection.astro`, `ManifestoSection.astro`, `LogoVideoSection.astro`, `EquipSection.astro`, `FactsSection.astro`, `MarqueeSection.astro`.
- `BeforeAfterSlider.astro` (sección eliminada, pero `before-after.ts` sigue importado en `BaseLayout`).
- `FeaturedReviewQuote.astro`, `HomeScrollSections.astro`.
- `decorative/AboutPlaceholder.astro`, `decorative/DrawnBorder.astro`.

### 6.4 Componentes que faltan (oportunidad)

- ❌ `MenuSection` semántico para Schema.org `MenuSection` / `MenuItem` detallados.
- ❌ `AllergenLegend` específico (los alérgenos están en texto plano dentro de `description`).

---

## 7. SEO y Schema.org

### 7.1 SEO técnico por página

- `<title>` patrón `[Página] · El mini nou`.
- `<meta name="description">` específica por página.
- `<link rel="canonical">` absoluta.
- `<link rel="alternate" hreflang>` para `ca`, `es`, `x-default`.
- Open Graph: `og:type`, `og:url`, `og:title`, `og:description`, `og:image` 1200×630, `og:locale`, `og:locale:alternate`, `og:site_name`.
- Twitter Card `summary_large_image`.
- Schema.org `Restaurant` JSON-LD (ver §7.2).
- Schema.org `BreadcrumbList` en páginas interiores.
- Schema.org `WebSite` en portada.
- Schema.org `FAQPage` en `/faq/`.
- `robots.txt` apuntando a sitemap.
- Sitemap automático excluyendo `/dev/`.

### 7.2 `SchemaLocalBusiness.astro`

```ts
{
  '@context': 'https://schema.org',
  '@type': 'Restaurant',                              // ✅
  additionalType: 'https://schema.org/FoodEstablishment',
  '@id': `${canonicalUrl}#localbusiness`,
  name: 'El mini nou',
  description: "Restaurant and bar in L'Ametlla del Vallès (Barcelona): grills, combined plates, sandwiches and tapas...",
  image: [ogImageUrl],
  url: `${siteUrlBase}/`,
  telephone: '+34604927903',
  hasMenu: '/ca/menu/',                               // ✅
  address: { '@type': 'PostalAddress', streetAddress, addressLocality, addressRegion, postalCode, addressCountry },
  geo: { '@type': 'GeoCoordinates', latitude: 41.67069170689928, longitude: 2.254346301702218 }, // ✅
  openingHoursSpecification: [...],                   // generado desde openingHours
  priceRange: '€€',                                   // (subjetivo)
  paymentAccepted: 'Cash, Credit Card, Debit Card, Bizum',
  currenciesAccepted: 'EUR',
  sameAs: [instagram, googleMaps],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 5, reviewCount: 11, bestRating: 5, worstRating: 1,
  },
  servesCuisine: 'Regional',
}
```

**Schema adicional — página minigolf:**
La página `/ca/minigolf/` y `/es/minigolf/` emite `@type: Service` apuntando al `Restaurant` principal vía `@id` (`#localbusiness`). El minigolf es un servicio del restaurante, no un negocio independiente.

**Lo que falta o se puede mejorar:**

- ❌ NO emite `Menu` Schema con `MenuSection`/`MenuItem` detallados — solo `hasMenu` apuntando a la URL. Oportunidad de rich-result en SERP.
- `aggregateRating` hardcoded (no leído de Google API).
- `priceRange` fijo en `€€` (subjetivo, sin lectura del catálogo).

### 7.3 Otros schemas

- `SchemaWebSite.astro`: `WebSite` con `name`, `url`, `inLanguage: ['ca-ES', 'es-ES']`. **Sin `SearchAction`** (no hay buscador interno).
- `SchemaBreadcrumbs.astro`: `BreadcrumbList` por página con prop `items`.
- `SchemaFaqPage.astro`: `FAQPage` filtrando por idioma activo.
- `SchemaBridalOffers.astro`: ❌ HEREDADO, sin uso.

---

## 8. Decisiones técnicas tomadas

### 8.1 Bootstrap y plantilla

- **Bootstrap desde plantilla `klips-estilistes-web`** (Astro 6 estático) — copia con `clone`/`rsync` excluyendo `.git`, `node_modules`, `dist`, `.astro`, `.vite`.
- Plantilla origen + procedimiento: [`klips-estilistes-web`](https://github.com/francescvicente-png/klips-estilistes-web), archivo raíz [`TEMPLATE_USAGE.md`](https://github.com/francescvicente-png/klips-estilistes-web/blob/main/TEMPLATE_USAGE.md).
- Metodología comercial/fases: misma filosofía que el `CLAUDE.md` del repo Klips ([enlace](https://github.com/francescvicente-png/klips-estilistes-web/blob/main/CLAUDE.md)). **No** copiar marca ni precios de Klip's.

### 8.2 Producto y configuración

- `businessType: 'restaurant'` y Schema `@type: Restaurant` con `additionalType: FoodEstablishment`.
- Idiomas: **CA por defecto** + ES espejo.
- Rutas activas: home, menu, galeria, contacte, com-arribar, faq, legales.
- Rutas eliminadas: `productes`, `nuvies`, `serveis` (renombrada a `menu`), `packs`, `treballa-amb-nosaltres`.
- Reservas: solo teléfono + WhatsApp (`site.booking.provider = 'phone'`). Sin Fresha/Treatwell.
- WhatsApp float: activo en páginas comerciales, oculto en legales (lista hardcoded en `BaseLayout`).
- Microsoft Clarity: campo preparado (`site.analytics.clarityProjectId`), **pendiente configurar ID**.

### 8.3 Hosting y deploy

- Cloudflare Pages, dominio `*.pages.dev` provisional hasta dominio propio.
- Auto-deploy desde rama `main`. **Sin branch protection** — push a main desplega al instante.

### 8.4 Diseño

- **Skill UI/UX:** dirección visual y jerarquía deben salir de `ui-ux-pro-max` (`~/.claude/skills/ui-ux-pro-max/SKILL.md`). Product type cercano: *restaurant / landing gastronómico / carta digital legible*.
- Prioridades de la skill: accesibilidad (contraste, foco, headings), tamaños táctiles, rendimiento LCP/reserva de hueco para imágenes, **no usar solo color para alérgenos** (texto/leyenda explícita).
- Tipografías: Playfair Display SC (display) + Karla (body) — pairing UI/UX skill #33 "restaurant menu".
- Paleta: naranja vivo `oklch(68.5% 0.193 54)` ≈ #FF7518 + papel cálido `oklch(98.8% 0.014 58)` (orange blossom).

### 8.5 Marca editorial

- ToV: catalán gastronómico natural; ES espejo claro.
- Citaciones de marca con **mensajes golf** (ver §"Citacions marca" en `MENU_ELMININOU.md`). Pendiente de validar derechos de uso de la silueta golf con el cliente antes de publicar tipografía/silueta original.
- Contexto golf/minigolf: pista UX latente hasta que el cliente apruebe copy.

### 8.6 Reglas de stack heredadas (válidas)

- TypeScript modo strict obligatorio.
- `pnpm build` corre `sync-theme.mjs` antes para regenerar tokens CSS.
- Hook `predev`/`prebuild` ejecuta `copy-brand-logo.mjs`.
- En Mac: invocar pnpm como `zsh -lc "pnpm <comando>"` (PATH del Bash tool).

---

## 9. Diferencias con la plantilla Klip's

### 9.1 Eliminadas / desactivadas para restaurante

- ❌ `CinematicIntro` (cortina barbería) — script en disco, no llamado.
- ❌ `data-logo-shave` del Header (animación capilar) — eliminado.
- ❌ `ManifestoSection`, `StorytellingSection` — desactivadas.
- ❌ `LogoVideoSection` — desactivada (no hay vídeo del logo).
- ❌ `EquipSection` — desactivada (no hay equipo documentado).
- ❌ Páginas `/nuvies/`, `/novias/` — eliminadas.
- ❌ Páginas `/productes/`, `/productos/` — eliminadas.
- ❌ Páginas `/packs/`, `/treballa-amb-nosaltres/` — nunca implementadas.
- ❌ Sección "Antes/Después" en galería — eliminada.
- ❌ Highlights pills "CUINA OBERTA" / "AMBIENT LOCAL" — eliminadas.
- ❌ Placeholder "Mapa incrustat opcional aquí" — eliminado.

### 9.2 Añadidas específicamente para restaurante

- ✅ `RestaurantHeader`, `RestaurantFooter`, `RestaurantHomePage`, `MenuPageHero`.
- ✅ `services.ts` con 50+ platos en 8 categorías.
- ✅ `menu-illustrations.ts` con mapeo plato ↔ ilustración IA.
- ✅ `assets/images/menu-generated/` con 50+ JPG generados con Gemini.
- ✅ Iconos Tabler de gastronomía (flame, meat, fish, salad, bread, beer...).
- ✅ Schema.org `Restaurant` en lugar de `BeautySalon`/`HairSalon`.
- ✅ OG image generator con texto "Brasa informal · Tapes · entrepans · menú del dia".
- ✅ Copy de UI orientada a restauración en `i18n/ui.ts`.
- ✅ Bloque editorial bento de reseñas reales de Google en home (`ReviewsBentoSection`).
- ✅ Filtros dietéticos en carta + plats firma + detalle ampliado de plato (`MenuDietaryFilter`, `MenuSignatureDishes`).
- ✅ **Páginas dedicadas `/ca/minigolf/` y `/es/minigolf/`** + componentes `MinigolfSection` y `MinigolfHoles` — diferenciador comercial principal.
- ✅ Schema.org `Service` para minigolf apuntando al `Restaurant` principal vía `@id`.

### 9.3 Compartidos (sirven a ambos sectores sin tocar)

Container, Heading, Text, Button, Card, Section, Hero, FaqList/FaqItem, GalleryGrid/GalleryFilter/GalleryLightbox, OpeningHours, Footer, Header, CookieBanner, WhatsAppFloat, PageLoadingBar, CtaBanner, MetaTags, SchemaBreadcrumbs, SchemaWebSite, SchemaFaqPage, scripts (lenis, magnetic-heading, opening-now, mouse-tracker, etc.).

---

## 10. Build, rendimiento y métricas

### 10.1 Estado del build

```
$ pnpm build
[build] ✓ Completed in ~2 s
[@astrojs/sitemap] sitemap-index.xml created at dist
[build] 25 page(s) built
[build] Complete!
```

| Métrica | Valor |
|---|---|
| Build pasa | ✅ |
| Páginas generadas | 25 (incluye las 2 de minigolf CA/ES) |
| Archivos en `dist/` | 253 |
| Tamaño `dist/` | 28 MB (95% imágenes) |
| Bundle JS principal (`BaseLayout` script) | 42,7 KB minificado |
| Bundle Astro `ClientRouter` | 15,8 KB |
| Errores compilación | 0 |
| Warnings | 0 |

### 10.2 Lighthouse

**No medido todavía sobre El mini nou.** Plantilla origen (Azzakriti, mismo stack): Performance 99–100 / A11y 100 / BP 100 / SEO 100 en mobile. Razonable esperar valores similares pero **debe medirse antes de afirmarlo**.

### 10.3 Ventajas técnicas (lo vendible para marketing)

1. **Edge CDN global** (Cloudflare Pages, sin servidor, sin BD). TTFB <500 ms desde España. Comparado con WordPress: orden de magnitud más rápido.
2. **Core Web Vitals**:
   - LCP: hero AVIF preloaded con srcset responsive, `<link rel="preload" fetchpriority="high">` antes del primer CSS.
   - CLS: `aspect-ratio` explícito en imágenes, fuentes con `font-display: swap` auto-hospedadas.
   - INP: cero JS bloqueante de main thread, todos los scripts en bundle separado.
   - FCP: fuentes auto-hospedadas en build (sin round-trip a `fonts.googleapis.com`).
3. **Bilingüismo CA/ES nativo** sin biblioteca externa: `routes.ts` única fuente de verdad; strings tipados — un i18n faltante = error de compilación.
4. **UX desktop alta gama**: magnetic heading, image trail, lightbox con View Transitions API nativa, scroll suave Lenis con bail-out elegante.
5. **OG images en build** con Sharp (sin Vercel OG/Cloudinary). 1200×630 con safe crop 300 px izquierda para WhatsApp. Una imagen por idioma.
6. **Cookie banner LSSI sin tracker propio**: la infraestructura está lista, pero no se carga ningún script que requiera consentimiento hasta que se active Clarity. Compliance primero, tracking después.
7. **Degradación elegante sin JS**: badge "Obert ara" con `display:none` fallback, lightbox como `<dialog>` estándar, menú móvil con checkbox CSS, scroll progress no bloqueante.

### 10.4 Coste de la inacción (sin web vs. con esta web)

| Tarea | Sin web | Con esta web |
|---|---|---|
| Cliente pregunta "¿tenéis menú?" | Foto/PDF manual cada vez (~3 min) | URL en bio/Maps, navega solo |
| Consulta horario | Llamada o mensaje (~2 min) | Visible en home, footer, badge tiempo real, Google |
| Reserva fuera de atención | Cliente prueba en otro sitio | CTA WhatsApp 24 h con mensaje pre-rellenado |
| Búsqueda "restaurant ametlla vallès" | Perfil Maps genérico | Web indexada con Schema.org Restaurant + rating |
| Compartir por WhatsApp/Telegram | URL Maps sin preview visual | OG 1200×630 con logo + tags + dirección |
| Cliente castellanohablante | Barrera idiomática | `/es/menu/` completo |
| Actualizar horario/carta | Manual en GMB/Tripadvisor | Cambio en `business.ts`/`services.ts` + auto-deploy ~2 min |

Estimaciones (sin datos reales del negocio):
- 5–15 consultas/semana por horario+carta a 3 min cada una → ~2,5 h/mes de staff (estimado).
- Rich snippets de rating: +15–30 % CTR en búsquedas locales (industry benchmark).

---

## 11. Deuda técnica heredada

### 11.1 Crítica para limpieza

1. **`package.json` con `"name": "klips-estilistes-web"`**. Trivial corregir a `"elmininou-web"`.
2. **`home-sections.ts` está obsoleto**: la portada actual no lo consulta. Decidir entre borrarlo o rehacer `RestaurantHomePage.astro` para que respete el orquestador.
3. **`web/screenshots/` con material de Klip's** (13 desktop + 13 mobile incluyendo `packs.png`, `productes.png`, `treballa-amb-nosaltres.png`). No usar como referencia visual.
4. **`web/VESSEL_CONTEXT_AZZAKRITI.md`** y **`public/brand/klips-logo.jpg`**: residuos del proyecto anterior.

### 11.2 Datos heredados sin uso (ocupan disco y deps TS)

- `bridal.ts` (505 ln), `packs.ts`, `products.ts`, `equip.ts`, `manifesto.ts`, `storytelling.ts`.
- Carpeta `src/components/bridal/` (8 componentes) + `BridalLanding`, `PackCard`, `ProductCard`...
- `src/assets/images/demo/` con material de peluquería (`Modelo para web.png`, `Trabajadora 2.jpg`, `Logo_hair_movement_animation_*.mp4`, `Logo Azzakariti bueno.png`, `logo-klips.jpg`, `ejemplo-pelo-*.jpg`, `preview-space-*.jpg`).
- `src/assets/images/generated/` con `service-blowout.png`, `service-organic-color.png`, `product-shampoo-sulfate-free.png`, `bridal-pack-*.png`.

### 11.3 Ruido menor

- `before-after.ts` cargado globalmente en `BaseLayout.astro` aunque la sección "Antes/Después" se eliminó. Busca `[data-before-after]` y no encuentra nada (~2–3 KB inútiles en bundle).
- Iconos heredados en `astro.config.mjs`: `razor`, `razor-electric`, `mood-kid`, `scissors`. Bundle impact negligible pero ruido.
- Categorías de galería con IDs heredados (`space`, `tools`, `cuts`, `color`, `care`). Funciona porque labels están traducidos, pero confunde a quien lea el código.
- Identificadores TS sonando a peluquería: `Service`, `ServiceCategoryKey`, `services-preview`, `featured` en `services.ts`. Convendría renombrar a `Dish`, `MenuCategoryKey`, `menu-preview`.
- `interlude-aiguafreda` declarado como ID válido en `home-sections.ts` (Aiguafreda era el pueblo de Klip's).

### 11.4 Decisiones técnicas notables (positivas)

A modo de referencia para futuros agentes:

- **`sync-theme.mjs`**: tokens TS↔CSS sincronizados automáticamente. Si añades color en `theme.ts` y olvidas el CSS, el `prebuild` lo arregla solo.
- **WhatsApp suprimido en legales**: lista en `BaseLayout`, no feature flag. Decisión de layout consistente.
- **Image trail con defensa anti-stale state**: `elementFromPoint` por frame de RAF para evitar trail huérfano tras View Transition.
- **Apertura tiempo real con multi-slot y lookup hacia adelante** hasta 7 días.

---

## 12. Bloqueantes y pendientes con el cliente

### 12.1 BLOQUEANTE para enseñar al cliente

1. **Datos legales incompletos**:
   - `business.legalName: 'Titular fiscal pendent'` → visible en aviso legal y privacidad.
   - `legalEntity.taxId: 'TODO_NIF_TITULAR'` → sin NIF del restaurante.
   - `serviceProvider.email: 'francecsvicente@gmail.com'` → typo aparente (`francecs` → `francesc`).
   - Sin estos datos las páginas legales no son LSSI/RGPD-ready.
2. **Cero fotografía real**: TODAS las imágenes son IA (Gemini), etiquetadas honestamente en `alt`. Para presentación al cliente con orgullo se necesita sesión fotográfica del local, platos y equipo.
3. **Reseñas vacías en datos**: aunque la home tiene un bento editorial con las 8 reseñas reales con texto, conviene formalizar en `reviews.ts` con permiso explícito del cliente.
4. **Google Place ID vacío** — no se puede vincular oficialmente con la ficha de Google.

### 12.2 IMPORTANTE no bloqueante

6. **Analytics**: registrar el sitio en `clarity.microsoft.com` y pegar el ID en `site.analytics.clarityProjectId`.
7. **Validación de carta con cliente**: confirmar precios, descripciones y alérgenos de los 50+ platos. La fuente actual es `MENU_ELMININOU.md` (transcripción del PDF). Verificar contra carta impresa actual.
8. **FAQ con 5/10 preguntas en `pendingConfirmation`**: pasar revisión y quitar el flag.
9. **Schema.org `MenuSection`/`MenuItem`** no emitidos — oportunidad de rich-result en SERP si se priorizan.
10. **Dominio propio** — pendiente comprar y conectar (hoy `*.pages.dev`).

### 12.3 Decisiones de producto pendientes

10. **¿Sesión fotográfica planificada?** Cubrirá comida + interior + minigolf (2-3 h en local, 15-20 fotos).
11. **¿Reservas online (Fresha/CoverManager/Booksy)?** Hoy solo tel: + WhatsApp. La infra está preparada para activarlo si el cliente lo decide.
12. **¿Sección de equipo (cocina/sala)?** `EquipSection` disponible pero desactivada — requiere fotos+bios.
13. **¿Menú del día con precio fijo?** La carta tiene precios por plato; si hay menú diario (12,50 € · primer + segon + postres + cafè), conviene destacarlo.
14. **¿Hay reseñas reales que el cliente quiera publicar verbatim con autorización formal por escrito?**
15. **Métodos de pago**: FAQ y Schema dicen "Efectivo, tarjeta, Bizum". Confirmar.
16. **Horario actual** + temporada baja/alta.
17. **Tarifa minigolf**: confirmar que sigue siendo gratis con comida y 5 €/persona solo juego.

### 12.4 Riesgos abiertos

19. **Cloudflare Pages despliega desde `main` sin branch protection** — un push directo accidental despliega al instante.
20. **Sin tests automatizados** (unitarios, E2E ni Lighthouse en CI). Para web estática de bajo riesgo es defendible, pero conviene saberlo.
21. **Escala de la carta**: si crece > 100 platos, `services.ts` (822 líneas) será incómodo. En algún momento mover a `.json` o `.md` con frontmatter.
22. **Dependencia de Google Maps**: sin fallback a OpenStreetMap (la clave i18n `location.viewOnOSM` está preparada, pero el componente de ubicación solo renderiza Google).

---

## 13. URLs, comandos locales y deploy

### 13.1 URLs

- **Producción Cloudflare Pages**: `https://elmininou.pages.dev` — auto-deploy desde `main`.
- **Local dev**: `pnpm dev` → `http://localhost:4321`.
- **Local preview** (build de producción servido en local): `pnpm preview`.
- **Sin dominio custom todavía**.

### 13.2 Comandos clave

Desde `/Users/francescjosepvicenteblanco/elmininou/web`:

```sh
zsh -lc "pnpm install"
zsh -lc "pnpm dev"        # dev server
zsh -lc "pnpm build"      # genera dist/
zsh -lc "pnpm preview"    # sirve dist/
```

> **Nota Mac**: invocar pnpm dentro de `zsh -lc "..."` por el PATH del Bash tool.

### 13.3 Pre-build / pre-dev hooks

- `predev`: `copy-brand-logo.mjs`.
- `prebuild`: `sync-theme.mjs && copy-brand-logo.mjs && generate-og-image.mjs`.

Si `copy-brand-logo.mjs` falla silenciosamente o el logo fuente no existe, `generate-og-image.mjs` aborta con `process.exit(1)`. No es bug — es comportamiento correcto — pero puede sorprender en CI nuevo.

### 13.4 Deploy

- Cloudflare Pages, build automático en cada push a `main`.
- **No hay branch protection**.
- Variables de entorno: ninguna crítica hoy (no hay analytics activo).

---

*Fin del CONTEXT · 04/05/2026.*

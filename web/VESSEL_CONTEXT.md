# VESSEL_CONTEXT — Plantilla local + instancia Klip’s estilistes

> **Propósito.** Contexto único para quien clona el repo o mantiene **Klip’s**: qué es el producto, cómo están las reservas, rutas activas, seguridad (CSP) y dónde tocar datos. Complementa [`CLAUDE.md`](./CLAUDE.md) (contrato y fases del proyecto Klip’s) y [`TEMPLATE_USAGE.md`](./TEMPLATE_USAGE.md) (pasos rápidos de adaptación).
>
> **Fecha del snapshot.** 01/05/2026.

---

## 1. Instancia actual vs plantilla reusable

| Aspecto | Estado en este repo (Klip’s) | Notas para clonar a otro cliente |
|--------|------------------------------|----------------------------------|
| Negocio | **Klip’s estilistes** — peluquería / salón (unisex, coloración orgánica, etc.) | Sustituir `src/data/business.ts` |
| Reservas | **Teléfono + WhatsApp** — sin plataforma externa de booking | `site.features.onlineBooking = false`, `site.booking.provider = 'phone'`, `getBookingCta()` en código |
| Fresha / Treatwell / Booksy | **No usados** en Klip’s (`business.freshaUrl` vacío) | Otro cliente puede poner `'fresha'` + URL y `onlineBooking: true`; entonces conviene **añadir** el dominio del proveedor a `connect-src` en [`public/_headers`](./public/_headers) |
| Schema.org | `BeautySalon` en [`SchemaLocalBusiness.astro`](src/components/seo/SchemaLocalBusiness.astro) | Mapear según `site.businessType` |
| Idiomas | CA (defecto) + ES, URLs simétricas `/ca/…` y `/es/…` | Igual para la mayoría de clientes locales |
| Analytics | Microsoft Clarity (cookieless) si `site.analytics.clarityProjectId` tiene valor | Whitelist en CSP (`clarity.ms`) |
| Build | ~**27** páginas estáticas (comerciales + legales + `/` + 404 + dev stubs) | Varía si se añaden rutas |

El archivo histórico muy largo [`VESSEL_CONTEXT_AZZAKRITI.md`](./VESSEL_CONTEXT_AZZAKRITI.md) quedó como **puntero** al presente documento; no usarlo como fuente de verdad (describía sobre todo la barbería Azzakriti + Fresha).

---

## 2. Reservas y CTAs (modelo Klip’s)

1. **`src/data/site.ts`**
   - `features.onlineBooking: false` — el header y el hero muestran **“Truca per reservar”** / equivalente ES vía `getBookingCta()` → `tel:` usando `business.phoneTel`.
   - `booking: { provider: 'phone', url: '' }` — el tipo `BookingProvider` incluye también `'fresha' | 'treatwell' | 'booksy' | 'custom'`.
2. **`src/data/business.ts`** — `phone`, `phoneTel` (E.164) para `tel:` y `wa.me`.
3. **WhatsApp flotante** — [`WhatsAppFloat.astro`](src/components/WhatsAppFloat.astro); mensaje precargado en `src/i18n/ui.ts` (`whatsapp.defaultMessage`). Oculto en rutas legales (`LEGAL_PATHS` en [`BaseLayout.astro`](src/layouts/BaseLayout.astro)).
4. **SEO / rendimiento** — [`MetaTags.astro`](src/components/seo/MetaTags.astro) hace **preconnect a Fresha solo si** `onlineBooking && booking.provider === 'fresha'`. Con Klip’s no se emite ese preconnect.

Textos legales (privacidad, cookies, aviso legal) ya reflejan reserva por **teléfono/WhatsApp** y enlace a **Meta (WhatsApp)**, no Fresha.

---

## 3. Rutas activas en v1 (`routeMap`)

Fuente: [`src/i18n/routes.ts`](src/i18n/routes.ts). Cada ruta tiene pareja CA/ES. El **espejo cliente** obligatorio está en [`src/scripts/header-state.ts`](src/scripts/header-state.ts) (`ROUTE_MAP`).

| Clave | CA | ES |
|--------|----|----|
| home | `/ca/` | `/es/` |
| services | `/ca/serveis/` | `/es/servicios/` |
| gallery | `/ca/galeria/` | `/es/galeria/` |
| products | `/ca/productes/` | `/es/productos/` |
| **bridal** | **`/ca/nuvies/`** | **`/es/novias/`** |
| contact | `/ca/contacte/` | `/es/contacto/` |
| directions | `/ca/com-arribar/` | `/es/como-llegar/` |
| faq | `/ca/faq/` | `/es/faq/` |
| legalNotice | `/ca/avis-legal/` | `/es/aviso-legal/` |
| privacyPolicy | `/ca/politica-privacitat/` | `/es/politica-privacidad/` |
| cookiesPolicy | `/ca/politica-cookies/` | `/es/politica-cookies/` |

**Desactivadas en v1 (Klip’s):**

- **Packs** — el contenido de novias va en `/ca/nuvies/` y `/es/novias/`. [`public/_redirects`](./public/_redirects): `/ca/packs/` → `/ca/nuvies/`, `/es/packs/` → `/es/novias/` (302).
- **Careers** — `site.features.careers: false`; redirecciones 302 de las URLs antiguas al home.
- **Blog** — no forma parte de la plantilla base v1.

---

## 4. Home: secciones (`home-sections.ts`)

Archivo: [`src/config/home-sections.ts`](src/config/home-sections.ts). El **hero** debe ser la primera entrada (LCP). Orden actual relevante:

- Activas: `hero`, `gallery-preview`, `post-gallery-hero`, `highlights`, `marquee`, `services-preview`, **`equip`** (equipo / estilistas), `interlude-aiguafreda`, `about`, `reviews`, `location`, `cta-banner`.
- Desactivadas para Klip’s: `facts`, **`manifesto`**, **`storytelling`**, **`logo-video`**.
- `interlude-ofici`: desactivado.

**CinematicIntro** (cortina tipo barbería): intencionalmente **no** usada en [`src/pages/ca/index.astro`](src/pages/ca/index.astro) / [`es/index.astro`](src/pages/es/index.astro) para Klip’s; el componente sigue en el repo por si otra instancia lo quiere.

**Header logo:** sin `data-logo-shave` (efecto navaja); clases `logo-shave*` se conservan por si se reactiva en otro cliente.

**Footer:** mega-wordmark **«KLIP'S»** (identidad del cliente, no otra marca).

---

## 5. CSP y `_headers` (Cloudflare Pages)

Archivo: [`public/_headers`](./public/_headers).

- **Scripts / conexiones permitidas:** `'self'`, **Microsoft Clarity** (`clarity.ms`). En la instancia Klip’s **no** se lista Fresha en `connect-src` (el sitio no se conecta a Fresha).
- Si activas **Fresha** (u otro booking externo) y el navegador necesita `connect-src` a ese origen, añade el dominio explícitamente y documenta el cambio.
- Cache larga para `/_astro/*` y fuentes; políticas de seguridad estándar (HSTS, `X-Frame-Options: DENY`, etc.).

---

## 6. OG image y marca

- Script: [`scripts/generate-og-image.mjs`](scripts/generate-og-image.mjs) — composición con logo Klip’s y copy alineado a **reserva por teléfono/WhatsApp** (no Fresha).
- Salida: `public/og/default.jpg` (regenerada en `prebuild`).

---

## 7. Datos y componentes a revisar al clonar

- **`src/data/business.ts`** — NAP, redes, reseñas, horarios.
- **`src/data/site.ts`** — `canonicalUrl`, `businessType`, `features`, `booking`, `analytics`.
- **`src/data/equip.ts`** + [`EquipSection.astro`](src/components/sections/EquipSection.astro) — perfiles de equipo (placeholders con `pendingConfirmation` hasta confirmación).
- **`src/data/services.ts`**, **`gallery.ts`**, **`reviews.ts`**, **`faq.ts`**, **`legal.ts`**, etc.
- **`astro.config.mjs`** — `site` (URL producción), subset **`astro-icon` / Tabler** (si usas un icono nuevo, añádelo a `include.tabler`).

Iconos del UI: **Tabler** vía `astro-icon`, no Lucide como motor principal (ver `astro.config.mjs`).

---

## 8. Comandos y entorno

- **pnpm:** en automatizaciones que reseteen `PATH`, usar `zsh -lc "pnpm …"` o la ruta absoluta al binario (ver [`CLAUDE.md`](./CLAUDE.md) · Notas de entorno).
- **Build:** `pnpm build` debe completar sin errores antes de push a `main` (deploy Cloudflare Pages).

---

## 9. Documentos relacionados

| Archivo | Uso |
|---------|-----|
| [`TEMPLATE_USAGE.md`](./TEMPLATE_USAGE.md) | Pasos 1–13 para nueva instancia |
| [`CLAUDE.md`](./CLAUDE.md) | Contrato Klip’s, fases, reglas del agente |
| [`README.md`](./README.md) | Quickstart del repo |

---

**Mantenimiento:** cuando cambien rutas, reservas o CSP, actualizar **este archivo** en la misma PR que el código.

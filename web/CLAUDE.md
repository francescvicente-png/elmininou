# CLAUDE.md — El mini nou web

> Este archivo es el contrato de trabajo del proyecto. Cualquier agente (Cursor, Claude Code, etc.) que abra este repo debe leerlo entero antes de tocar código. Última actualización: 03/05/2026.

---

## 1. Identidad del proyecto

**Cliente**: El mini nou.
**Sector**: bar-restaurante con minigolf integrado. Cocina informal: brasas, platos combinados, tapas, entrepans, hamburguesas.
**Ubicación**: Carrer Jeroni de Moragas, 13, 08480 L'Ametlla del Vallès, Barcelona.
**Coordenadas**: 41.67069170689928, 2.254346301702218 (verificadas en Google Maps por Francesc).
**Titular fiscal**: pendiente de confirmación con el cliente.
**Teléfono**: 604 92 79 03 (`+34604927903`).
**Email**: pendiente de confirmar canal RGPD del restaurante (actualmente apunta al email de Francesc como prestador LSSI).
**Instagram**: @elmininou (https://www.instagram.com/elmininou/).
**Web actual**: NO TIENEN. El dominio `espaielmini.com` (local anterior) está expirado y en venta.
**Sistema reservas actual**: solo teléfono y WhatsApp. NO usan Fresha, Treatwell ni similar.
**Rating Google**: 5,0 con 11 reseñas (todas con texto positivo, perfil joven).
**Diferenciador comercial principal**: minigolf de 18 hoyos integrado al local. Gratuito si comes en el restaurante. 5 €/persona si solo juegas.

**Estado comercial**: prospección fría. El cliente todavía no ha sido contactado. Francesc visitó el local como cliente con sus padres y decidió hacer la web como prospección.

**Nota importante**: el local anterior (elMini VERMUTS & GRILL, mismo edificio) cerró. El propietario actual de "El mini nou" es distinto y tomó el relevo. **NO mencionar el local anterior al cliente** (el dueño actual no quiere que se le recuerde el antecedente).

---

## 2. Stack heredado (NO discutir, ya está cerrado)

Este proyecto se hereda de la plantilla de Klip's, que a su vez heredó de azzakriti-barbershop-web. El stack está cerrado:

- **Framework**: Astro 6.1.9 con `output: 'static'`.
- **Lenguaje**: TypeScript modo strict.
- **CSS**: Tailwind CSS 4.2.4 vía `@tailwindcss/vite`.
- **Iconos**: `astro-icon` 1.1.5 + `@iconify-json/tabler` 1.2.33.
- **Smooth scroll**: `lenis` 1.3.23.
- **Sitemap**: `@astrojs/sitemap` 3.7.2.
- **Procesado de imagen**: `sharp` 0.34.5.
- **Tipografías**: Playfair Display SC (display) + Karla (body), auto-hospedadas vía Astro Fonts API.
- **Animaciones**: Motion 12.38.0.
- **Hosting**: Cloudflare Pages (auto-deploy desde rama `main`).
- **Analytics**: Microsoft Clarity (cookieless) — infraestructura lista en `BaseLayout.astro` y `_headers`. Solo falta rellenar `clarityProjectId` en `src/data/site.ts`.

**Workaround pnpm en macOS**: pnpm vive en `/Users/francescjosepvicenteblanco/Library/pnpm/pnpm`. En sesiones de agente el `Bash` tool restablece PATH y pnpm no es invocable directamente. **Invocar pnpm SIEMPRE como `zsh -lc "pnpm <comando>"`**. NO modificar archivos de shell.

---

## 3. Decisiones técnicas tomadas (registradas, NO re-discutir)

### 3.1 Schema.org

- `@type: "Restaurant"` como tipo principal.
- `additionalType: "https://schema.org/FoodEstablishment"`.
- `hasMenu` apuntando a `/ca/menu/` (URL canónica).
- `aggregateRating` con valores reales de Google (5,0 / 11).
- `openingHoursSpecification` generado desde `business.openingHours`.
- `priceRange: "€€"`.
- `paymentAccepted: "Cash, Credit Card, Debit Card, Bizum"`.
- `servesCuisine: "Regional"` (cocina informal mediterránea).
- Página de minigolf emite `@type: Service` apuntando al Restaurant principal via `@id`.

### 3.2 Paleta visual

- Primary: `oklch(68.5% 0.193 54)` ≈ #FF7518 (naranja vivo, evoca brasa).
- Background: `oklch(98.8% 0.014 58)` (papel cálido, "orange blossom").
- Accent: `oklch(42% 0.14 50)` (burnt orange).
- Foreground: negro neutro `oklch(0% 0 0)` (del logo del cliente).
- Mantener exactamente esta paleta. NO cambiar sin razón fuerte.

### 3.3 Tipografía

- **Display**: Playfair Display SC (serif con caps, encaja con identidad gastronómica).
- **Body**: Karla (sans-serif limpia, alta legibilidad).
- NO añadir más fuentes.

### 3.4 Reservas y CTAs

- CTA primario "Reserva taula" → `tel:+34604927903`.
- CTA secundario WhatsApp Float.
- `site.features.onlineBooking = false`.
- `site.booking.provider = 'phone'`.
- NO integrar Fresha, Treatwell ni similar (el cliente no los usa).

### 3.5 Idiomas y rutas

- Idiomas: CA (default) + ES.
- Rutas activas:
  - `/ca/` y `/es/` (home).
  - `/ca/menu/` y `/es/menu/` (carta digital con 50+ platos en 8 categorías).
  - `/ca/galeria/` y `/es/galeria/`.
  - `/ca/minigolf/` y `/es/minigolf/` ✅ **RUTA NUEVA, mayor diferenciador comercial**.
  - `/ca/contacte/` y `/es/contacto/`.
  - `/ca/com-arribar/` y `/es/como-llegar/`.
  - `/ca/faq/` y `/es/faq/`.
  - Páginas legales (aviso legal, privacidad, cookies).
- Rutas DESACTIVADAS: productos, packs, careers, bridal/novias (no aplican a restaurante activo).

### 3.6 Componentes principales del proyecto

- `<RestaurantHomePage />` — portada con hero, carta destacada, reserve CTA, minigolf y mapa.
- `<RestaurantHeader />` — navegación: Inici · Carta · Minigolf · Galeria · FAQ · Contacte.
- `<RestaurantFooter />`.
- `<MenuPageHero />` para la página de carta.
- `<MinigolfSection />` para home + páginas `/ca/minigolf/` y `/es/minigolf/`.

### 3.7 Componentes HEREDADOS y NO usados (deuda)

Existen en el repo restos de la plantilla de peluquería/barbería que NO se usan: `src/components/bridal/`, `data/bridal.ts`, `data/packs.ts`, `data/products.ts`, `data/equip.ts`, `data/manifesto.ts`, `data/storytelling.ts`, `BridalLanding.astro`, `PackCard.astro`, `ProductCard.astro`, `CinematicIntro.astro`, etc. **NO se eliminan en el corto plazo** (pueden servir de referencia para futuros clientes). **Pero NO se importan ni renderizan en El mini nou**.

### 3.8 Sistema auto-sync de tema

`scripts/sync-theme.mjs` parsea `theme.ts` y reescribe el bloque `@theme` de `global.css` entre marcadores `THEME_AUTOGEN_START / THEME_AUTOGEN_END`. El hook `prebuild` ejecuta esto antes de cada build. No tocar sin entender el mecanismo.

---

## 4. Modelo económico (cerrado)

- **Web base**: 1.100 €.
- **Sesión fotográfica**: 200 € (15-20 fotos: comida + interior + minigolf, 2-3h en local).
- **Total recomendado**: 1.300 €.
- **Cobro**: 50% al inicio, 50% al lanzamiento.
- **Plazo**: 10-14 días desde sesión fotográfica.
- **Mantenimiento**: 240 €/año pagado en una sola factura anual. Incluye:
  - Dominio.
  - 3 actualizaciones de carta al año (temporadas, productos, precios).
  - 2 cambios pequeños al año.
  - Monitorización mensual.
  - Soporte WhatsApp prioridad 24-48h.
- **Cambios fuera del plan**: 30 € puntual, 45 €/h trabajo grande.
- **Forma de pago**: a elección del cliente (efectivo, Bizum, transferencia).
- **Factura**: pendiente de la decisión fiscal de Francesc (alta epígrafe 763 vía gestor).

---

## 5. Estado actual del proyecto

A 03/05/2026:

- Plantilla técnica al ~80% de presentación al cliente.
- 25 páginas en build (incluyendo las 2 páginas de minigolf).
- Carta digital implementada con 50+ platos en 8 categorías con ilustraciones IA.
- Schema.org Restaurant configurado y validado.
- Paleta y tipografía adaptadas al sector gastronómico.
- Sección de minigolf implementada en home + páginas dedicadas.
- Microsoft Clarity: infraestructura lista, falta el `clarityProjectId` (pendiente de registro en clarity.microsoft.com).
- Pendiente: sesión fotográfica real, datos legales del titular (NIF), validación final con el cliente.

---

## 6. Reglas de trabajo del agente

1. Comunicación con Francesc en castellano. Código y comentarios internos en inglés.
2. Fechas en `DD/MM/AAAA`.
3. Cero placeholders crípticos. TODOs legibles.
4. Antes de tocar un archivo no leído, leerlo primero.
5. Tras cada fase verificable, parar y reportar.
6. Si encuentras un conflicto entre el plan y el repo, parar y reportar. No improvisar.
7. Pnpm: invocar siempre como `zsh -lc "pnpm <comando>"`.
8. Honestidad técnica: si una decisión del plan ya no aplica, decirlo, no mentir para cumplir.

---

## 7. Documentos relacionados (en disco local de Francesc)

- `MAESTRO.md` — identidad y modelo de negocio de Francesc.
- `PLAYBOOK_VENTA.md` — protocolo comercial.
- `docs/HANDOFF_EL_MINI_NOU.md` — briefing original del cliente.
- `docs/MENU_CA_SOURCE.md` — fuente de verdad de la carta.
- `Auditoria_Completa_ElMiniNou.md` — auditoría técnica.
- `BRIEFING_GESTOR_ALTA_AUTONOMO_WEBS.md` — gestión fiscal (externa al proyecto técnico).

Estos documentos son fuentes de contexto humano. Si entran en conflicto con este `CLAUDE.md`, este `CLAUDE.md` prevalece **solo en decisiones técnicas del proyecto El mini nou**.

---

**FIN del CLAUDE.md. Versión 2.0 · 03/05/2026.**

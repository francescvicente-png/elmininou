# CLAUDE.md — Klip's estilistes web

> Este archivo es el contrato de trabajo del proyecto. Cualquier agente (Cursor, Claude Code, etc.) que abra este repo debe leerlo entero antes de tocar código. Última actualización: 01/05/2026.

---

## 1. Identidad del proyecto

**Cliente**: Klip's estilistes (nombre comercial actual; nombre histórico "Klip's Perruqueria").
**Sector**: peluquería unisex, propietat de dones, con foco en color orgánico/vegano, balayage, tratamientos de fibra capilar, manicura, depilación, novias.
**Ubicación**: Carrer Major, 18, 08591 Aiguafreda, Barcelona.
**Coordenadas**: 41.7690140, 2.2490007.
**Titular**: Beatriz Vega Segura. Confirmado por la Associació de Perruquers d'Osona.
**Teléfono**: 938 44 04 85.
**Email actual**: [klips.perruqueria@gmail.com](mailto:klips.perruqueria@gmail.com) (mantiene "perruqueria" del nombre histórico).
**Instagram**: @klipsestilistes (713 publicaciones, 1.351 seguidores, activo).
**Facebook**: facebook.com/klipsestilistes (inactivo desde 2022).
**Threads**: klipsestilistes (activo).
**Web actual**: NO TIENEN. Hay un hueco real que llenar.
**Sistema reservas actual**: NO TIENEN. Solo teléfono y WhatsApp. Aparecen en Fresha pero como perfil pasivo generado por la propia plataforma; el negocio NO está afiliado a Fresha.
**Rating Google**: 4,7 con 43 reseñas.

**Estado comercial**: prospección fría. Beatriz no ha sido contactada todavía. Visita comercial pendiente de planificar tras lanzamiento de Azzakriti (caso anterior).

---

## 2. Stack heredado (NO discutir, ya está cerrado)

Este proyecto se hereda de la plantilla **azzakriti-barbershop-web** (commit con rama editorial mergeada, Lighthouse 99-100/100/100/100 mobile). El stack está cerrado y NO se discute:

- **Framework**: Astro 6.1.9 con `output: 'static'`.
- **Lenguaje**: TypeScript modo strict.
- **CSS**: Tailwind CSS 4.2.4 vía `@tailwindcss/vite`.
- **Iconos**: `astro-icon` 1.1.5 + `@iconify-json/tabler` 1.2.33.
- **Smooth scroll**: `lenis` 1.3.23 (solo desktop, bail-out en `prefers-reduced-motion`).
- **Sitemap**: `@astrojs/sitemap` 3.7.2.
- **Procesado de imagen**: `sharp` 0.34.5 (devDep).
- **Tipografía**: Astro 6 Fonts API (auto-hospedaje desde Google Fonts en build time).
- **Gestor paquetes**: `pnpm`.
- **Node**: ≥ 22.12.0.
- **Hosting**: Cloudflare Pages (auto-deploy desde main).
- **Analytics**: Microsoft Clarity (cookieless).

**Workaround pnpm en macOS**: pnpm está en `/Users/francescjosepvicenteblanco/Library/pnpm/pnpm`. En sesiones de agente el `Bash` tool restablece PATH y pnpm no es invocable directamente. **Invoca pnpm SIEMPRE como `zsh -lc "pnpm <comando>"`**. NO modifiques archivos de shell.

---

## 3. Decisiones técnicas tomadas (registradas, NO re-discutir)

### 3.1 Schema.org

- `@type: "BeautySalon"` como tipo principal.
- `additionalType: ["HairSalon", "NailSalon"]` para máxima cobertura SEO.
- Esto requiere editar `src/components/seo/SchemaLocalBusiness.astro` para soportar `additionalType` (no lo soporta hoy). Cambio aditivo a la plantilla, queda como mejora reusable para futuros clientes.

### 3.2 Paleta visual

**PENDIENTE de decisión final.** En las sesiones anteriores se probaron y descartaron:

- Sage + cream (Paleta C, descartada por insulsa).
- Cocoa + nude (descartada por demasiado tierra unisex).
- Aubergine + champagne (planteada como dirección final pero NO aplicada en el repo).
- Lavender paper background (planteada como mejor opción pero no validada en pantalla).

**Próxima sesión técnica**: aplicar paleta E (aubergine + champagne sobre lavender paper) y validar en `pnpm preview`. Bloque `colors:` propuesto para `src/config/theme.ts`:

```ts
colors: {
  background: 'oklch(96% 0.010 290)',        // lavender paper
  backgroundAlt: 'oklch(98% 0.006 290)',
  foreground: 'oklch(22% 0.025 320)',        // tinta plum
  muted: 'oklch(48% 0.018 320)',
  border: 'oklch(88% 0.015 320)',
  primary: 'oklch(30% 0.075 320)',           // aubergine grisáceo profundo
  primaryHover: 'oklch(25% 0.075 320)',
  primaryForeground: 'oklch(96% 0.010 290)',
  accent: 'oklch(72% 0.085 80)',             // champagne dorado
  accentHover: 'oklch(67% 0.085 80)',
  accentForeground: 'oklch(22% 0.025 320)',
  onImage: 'oklch(90% 0.02 75)',
  rating: 'oklch(75% 0.13 75)',
},
```

### 3.3 Tipografía

- **Display**: Cormorant Garamond (sustituye a Fraunces de Azzakriti).
- **Body**: Inter (mantiene de Azzakriti).
- **Mono**: ELIMINADA. IBM Plex Mono fuera del proyecto. Eyebrows que usaban mono se reconvierten a Inter uppercase con tracking.

### 3.4 Sistema auto-sync de tema

`scripts/sync-theme.mjs` parsea `theme.ts` y reescribe el bloque `@theme` de `global.css` entre marcadores `THEME_AUTOGEN_START / THEME_AUTOGEN_END`. Hook `prebuild` ejecuta esto antes de cada build.

**Si el script tiene whitelist hardcoded**, añadir los tokens nuevos: `accent`, `accentHover`, `accentForeground`. Si itera sobre todas las claves de `colors`, no tocar.

### 3.5 Reservas y CTAs

Beatriz NO usa Fresha. Decisión:

- CTA primario "Truca per reservar" → `tel:+34938440485`.
- CTA secundario WhatsApp Float con mensaje "Hola, m'agradaria reservar una cita."
- `site.features.onlineBooking = false`.
- `site.booking.provider = 'phone'` (añadir esta opción al type union si no existe).

### 3.6 Idiomas y rutas

- Idiomas: CA (default) + ES.
- Rutas activas en v1:
  - `/ca/serveis/` y `/es/servicios/` ✅
  - `/ca/galeria/` y `/es/galeria/` ✅
  - `/ca/productes/` y `/es/productos/` ✅ (Beatriz vende productos orgánicos según su Instagram)
  - `/ca/nuvies/` y `/es/novias/` ✅ **NUEVA RUTA, mayor diferenciador comercial**
  - `/ca/contacte/` y `/es/contacto/` ✅
  - `/ca/com-arribar/` y `/es/como-llegar/` ✅
  - `/ca/faq/` y `/es/faq/` ✅
  - `/ca/avis-legal/` y `/es/aviso-legal/` ✅
  - `/ca/politica-privacitat/` y `/es/politica-privacidad/` ✅
  - `/ca/politica-cookies/` y `/es/politica-cookies/` ✅
- Rutas DESACTIVADAS en v1:
  - `/ca/packs/` ❌ (los packs internos de novias se cubren en `/ca/nuvies/`)
  - `/ca/treballa-amb-nosaltres/` ❌ (equipo estable de 3-4 estilistas, no contratan)
  - `/ca/blog/` ❌ (no incluido en plantilla base)

**Implementación de las rutas nuevas**:

1. Añadir `bridal` o `nuvies` al `routeMap` en `src/i18n/routes.ts`.
2. Mirror en `src/scripts/header-state.ts → ROUTE_MAP`.
3. Crear las dos páginas en `src/pages/{ca,es}/`.
4. Añadir item en `Header.astro → navItems`.

### 3.7 Componentes específicos de Azzakriti que se ELIMINAN o desactivan

- `<CinematicIntro />` ❌ DESACTIVADO en `src/pages/{ca,es}/index.astro`. La cortina blade-sweep es muy específica de barbería tradicional. NO eliminar el componente del repo (queda disponible para futuros clientes que sí encajen).
- `logo-shave.ts` ❌ ELIMINAR el atributo `data-logo-shave` del Header. NO eliminar el script del repo (queda disponible).
- `<TypographicInterlude word="AIGUAFREDA" />` ✅ MANTENER (Klip's está en el mismo pueblo).
- Footer mega-wordmark ✅ CAMBIAR de "AZZAKRITI" a "KLIP'S".
- `<LogoVideoSection />` ❌ DESACTIVAR en `home-sections.ts` (no tienen video del logo).
- `<ManifestoSection />` ❌ DESACTIVAR (la pull-quote editorial era muy específica de Zacarías).
- `<StorytellingSection />` ❌ DESACTIVAR (sticky-scroll de 4 escenas migratorias bereber-Stuttgart-Cataluña no aplica).

### 3.8 Componente NUEVO a crear

`**<EquipSection />`** que sustituye conceptualmente al `<StorytellingSection />` desactivado.

- Grid 2x2 con foto + nombre + rol de las 3-4 estilistas.
- Datos pendientes de Beatriz (foto, nombre, rol, mini-bio de cada una).
- Placeholder con badges `pendingConfirmation: true` hasta confirmación.
- Estructura propuesta:
  ```ts
  // src/data/equip.ts
  export interface EstilistaProfile {
    id: string;
    name: string;
    role: string;
    bio: string;
    image: ImageMetadata;
    pendingConfirmation?: boolean;
  }
  ```
- Componente reusable para futuros clientes con equipo (otras peluquerías, restaurantes con varios cocineros, etc.).

---

## 4. Modelo económico (cerrado)

- **Web base**: 600 €.
- **Sesión fotográfica**: 150 € (más compleja que la de Azzakriti: 15-20 fotos, equipo de 3-4 personas, balayage en proceso, mayor planificación).
- **Total recomendado**: 750 €.
- **Cobro**: 50% al inicio, 50% al lanzamiento.
- **Plazo**: 10-14 días desde sesión fotográfica.
- **Mantenimiento**:
  - Año 1: dominio incluido + 1 cambio menor incluido.
  - Año 2+: dominio gratis si la cliente hace al menos 1 cambio grande en el año. Si no, 15 €/año. Cambios bajo demanda: 22 € pequeño · 45 €/h mediano.
- **Forma de pago**: a elección de la cliente (efectivo, Bizum, transferencia).
- **Factura**: pendiente de la decisión fiscal de Francesc (alta en epígrafe 763 vía gestor — gestión externa al proyecto técnico).

---

## 5. Plan de fases A-H

Adaptado del PLAYBOOK_TECNICO_AZZAKRITI con las decisiones específicas de Klip's.

### Fase A — Bootstrap del proyecto hermano (60 min)

- Posicionarse en directorio padre con `azzakriti-barbershop-web/` adyacente.
- `rsync` excluyendo `.git`, `node_modules`, `dist`, `.astro`, `.vite`.
- `git init` desde cero, primer commit "chore: initial copy from azzakriti template".
- `pnpm install`.
- Verificar `pnpm dev` arranca con HTTP 200 en `/ca/`.

### Fase B — Identidad del paquete (30 min)

- `package.json → name: "klips-estilistes-web"`.
- `astro.config.mjs → site: "https://klips-estilistes-web.pages.dev"`.
- `public/robots.txt → Sitemap`.
- `src/data/site.ts → canonicalUrl + businessType: "beauty-salon"` (añadir al type union si falta).
- `README.md` actualizado.
- Commit.

### Fase C — Paleta + tipografía (90 min)

- Aplicar paleta E (aubergine + champagne sobre lavender paper) en `src/config/theme.ts`.
- Verificar `scripts/sync-theme.mjs` y ampliarlo si tiene whitelist para los tokens `accent*`.
- Sustituir Fraunces por Cormorant Garamond en `astro.config.mjs`.
- Eliminar IBM Plex Mono. Reconvertir eyebrows a Inter uppercase tracking.
- `grep -r "Fraunces\|font-fraunces" src/ astro.config.mjs` y limpiar matches.
- `grep -r "IBM Plex Mono\|font-mono\|Plex Mono" src/ astro.config.mjs` y limpiar matches.
- `pnpm build` verificar fonts auto-hospedadas correctas.
- Commit.

### Fase D — Stubs editoriales mínimos (60 min)

- Hero CA: "Coloració orgànica al cor d'Aiguafreda" / "Estilisme conscient. Tradició i ciència del cabell."
- Hero ES: "Coloración orgánica en el corazón de Aiguafreda" / "Estilismo consciente. Tradición y ciencia del cabello."
- Footer wordmark: AZZAKRITI → KLIP'S.
- Header logo: Azzakriti → Klip's, **eliminar `data-logo-shave`**.
- BaseLayout title pattern actualizado.
- CinematicIntro comentado en index.astro de ambos idiomas.
- LogoVideoSection desactivado en home-sections.ts.
- ManifestoSection desactivado.
- StorytellingSection desactivado.
- Commit.

### Fase E — Datos del cliente (90 min)

- `src/data/business.ts` con NAP confirmado, geo, openingHours reales, googleReviews 4,7/43.
- `src/data/services.ts` placeholder con servicios genéricos + badges `pendingConfirmation: true` hasta confirmación de Beatriz.
- `src/data/products.ts` con productos placeholder marcados como pendientes.
- `src/data/reviews.ts` con las 3 reseñas reales seleccionadas (Josep Duran prioritaria por riqueza editorial).
- `src/data/legal.ts` con NIF + email RGPD pendientes.
- `src/data/highlights.ts` con los 3 diferenciadores: "Coloració orgànica i vegana" / "Equip femení amb formació contínua" / "4,7★ amb 43 ressenyes".
- Schema.org BeautySalon + additionalType validado en `validator.schema.org`.
- Commit.

### Fase F — Componente nuevo `<EquipSection />` (120 min)

- Crear `src/data/equip.ts` con estructura de 4 estilistas placeholder.
- Crear `src/components/sections/EquipSection.astro` con grid 2x2.
- Insertar en `home-sections.ts` después de `highlights`, antes de `gallery-preview`.
- Verificar responsividad móvil (grid 2x2 → 1 columna).
- Aplicar badges `pendingConfirmation` visibles.
- Commit.

### Fase G — Página `/nuvies/` y `/novias/` (180 min)

- Añadir `bridal` o `nuvies` al `routeMap` en `src/i18n/routes.ts`.
- Mirror en `src/scripts/header-state.ts → ROUTE_MAP`.
- Crear `src/pages/ca/nuvies.astro` y `src/pages/es/novias.astro`.
- Estructura propuesta: hero específico + 3 paquetes (prueba+evento, con damas, deluxe) + galería de novias + FAQ específica + CTA whatsapp prereserva.
- Añadir item al `Header.astro → navItems` (CA: "Núvies", ES: "Novias").
- Banner editorial `<NuviesTeaser />` en home linkando a la página.
- Crear datos placeholder en `src/data/bridal.ts` con badges pendientes.
- Commit.

### Fase H — Verificación final + deploy (60 min)

- Lighthouse mobile: Performance 99-100, A11y 100, BP 100, SEO 100.
- LCP < 2.5s en 4G simulado.
- CLS = 0. TBT < 200ms.
- Validar Schema.org en `validator.schema.org`.
- Validar hreflang en cada página.
- Bundle JS final ~37-45 KB sin gzip.
- Build pasa con 30+ páginas (vs 24 de Azzakriti, por las páginas nuevas de novias).
- Deploy a Cloudflare Pages preview.
- URL preview compartida con Francesc para validación.

**Tiempo total estimado**: 11-12 horas de trabajo técnico (vs 1.5-2 horas del target inicial — el upgrade es por la página de novias y el componente Equip nuevos).

---

## 6. Reglas de trabajo del agente

1. **Comunicación con Francesc en castellano.** Código y comentarios internos en inglés.
2. **Fechas en `DD/MM/AAAA`.**
3. **Cero placeholders crípticos.** Si hay un TODO, debe ser legible y explicar el porqué.
4. **Antes de tocar un archivo no leído en esta sesión, verificar con Read primero.** Hubo incidentes en sesiones pasadas con archivos asumidos.
5. **Tras cada fase verificable, parar y reportar** qué se hizo, qué cambió, qué se verificó. Esperar "continúa" si no es obvio.
6. **Si encuentras un conflicto** entre lo que pide el plan y lo que ves en el repo (archivo movido, campo renombrado), **PARAR y reportar**. No improvisar.
7. **Pnpm**: invocar SIEMPRE como `zsh -lc "pnpm <comando>"`.
8. **Honestidad técnica**: si una decisión del plan ya no aplica por algo que has descubierto en el repo, decirlo. No mentir para cumplir el plan.

---

## 7. Estado actual del proyecto

A 01/05/2026:

- Plantilla Azzakriti acabada y validada.
- Decisiones técnicas y comerciales para Klip's cerradas.
- **NO se ha empezado todavía la Fase A.**
- Pendiente: validación visual de paleta E antes de comprometer toda la cadena de stubs editoriales.

**Próxima acción**: ejecutar Fase A (Bootstrap del proyecto hermano).

---

## 8. Documentos relacionados (en disco local de Francesc)

- `MAESTRO.md` — identidad y modelo de negocio de Francesc.
- `PLAYBOOK_VENTA.md` — protocolo comercial.
- `PLAYBOOK_TECNICO.md` — playbook técnico genérico.
- `VESSEL_CONTEXT.md` — contexto de la plantilla e instancia Klip’s (rutas, reservas, CSP); el archivo `VESSEL_CONTEXT_AZZAKRITI.md` solo redirige aquí.
- `CLAUDE_PROYECTO_AZZAKRITI.md` — historial de decisiones del proyecto anterior.
- `BRIEFING_GESTOR_ALTA_AUTONOMO_WEBS.md` — gestión fiscal (externa al proyecto técnico).

Estos documentos son **fuentes de verdad de contexto humano**. Si entran en conflicto con este `CLAUDE.md`, este `CLAUDE.md` prevalece **solo en decisiones técnicas del proyecto Klip's**. Los documentos externos prevalecen en identidad de Francesc, modelo comercial y protocolos de venta.

---

**FIN del CLAUDE.md. Versión 1.0 · 01/05/2026.**
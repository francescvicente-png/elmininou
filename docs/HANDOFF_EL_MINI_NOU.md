# Handoff — Web **El mini nou** (restaurante)

**Documento para el siguiente agente / sesión técnica.**
**Última actualización:** 02/05/2026.

**Repositorio:** este (`elmininou` en GitHub) es la **fuente de verdad** para briefing + carta en Markdown. El código Astro vivirá más adelante (p. ej. subcarpeta `web/` o repo hermano) según decidáis.

Este archivo describe **qué hay que hacer**, **con qué datos**, **desde qué plantilla**, y **qué riesgos** tiene copiar una base hecha para **peluquería** (Klip's) y adaptarla a **restaurante**.

---

## 1. Dirección técnica (obligatoria antes de pintar pantallas)

### 1.1 Skill UI/UX

Francesc quiere que el **diseño y la jerarquía** salgan del enfoque de la skill **`ui-ux-pro-max`** (no improvisar patrones por defecto de LLM).

- **Ubicación típica de la skill (Claude Code):** `~/.claude/skills/ui-ux-pro-max/SKILL.md`
- **En Cursor**, si está registrada como skill del usuario, léela **antes** de maquetar home, `/menu/` y navegación.
- **Product type** cercano para consultas dentro de la skill: *restaurant / landing gastronómico / carta digital legible*.
- Prioridades informadas por la skill: accesibilidad (contraste, foco, headings), tamaños táctiles, rendimiento LCP/reserva de hueco para imágenes, **no usar solo color** para alérgenos (añadir texto/leyenda explícita).

### 1.2 Golden template — modelo usado para Klips

Bootstrap **copiando** el repo público **`klips-estilistes-web`** (Astro 6 estático). Guía oficial de instancia nueva:

- **Plantilla y procedimiento:** [francescvicente-png/klips-estilistes-web](https://github.com/francescvicente-png/klips-estilistes-web) → archivo raíz **`TEMPLATE_USAGE.md`** ([enlace directo](https://github.com/francescvicente-png/klips-estilistes-web/blob/main/TEMPLATE_USAGE.md)).

Pasos resumidos:

1. Nueva carpeta de proyecto para el sitio Astro (`clone`/`rsync` excluyendo `.git`, `node_modules`, `dist`, `.astro`, `.vite`) — puede llamarse igual `elmininou-web` o vivir dentro de `./web/` en este repo.
2. `git init` (si aplica), `pnpm install`.
3. Seguir **`TEMPLATE_USAGE.md`** para `business.ts`, `site.ts`, `theme.ts`, `home-sections.ts`, rutas i18n, etc.

**Riesgos al heredar desde peluquería (Klip's):**

| Área | En Klips | Cambio esperado para El mini nou |
|------|----------|-----------------------------------|
| `businessType` / Schema | `BeautySalon` (+ tipos ligados salón)) | **`Restaurant`** y/o **`FoodEstablishment`**; revisar **`SchemaLocalBusiness`** o equivalente y JSON-LD. |
| Rutas contenido | `serveis`/servicios, productos, núvies… | Diseñar rutas restaurante (`/menu/`, etc.); **eliminar** o desactivar lo que no aplique (`novias`, `productes` físicos si no hay). |
| OG / marca | Scripts con wordmark cliente | Adaptar texto OG a nombre comercial y NAP nuevo. |
| Home sections | Editorial peluquería / retratos | Replanteo: hero gastronómía, horario, ubicación, contexto golf/minigolf si cliente lo valida (ver marca §4). |

---

## 2. Alcance preferido para v1 (cuanto más “currada”, mejor)

Implementación **multipart** (similar amplitud a Klips, no landing mínima):

- **`/ca/` y `/es/`** con **catalán por defecto**.
- **Home** editorial (hero, propuesta, horarios, ubicación/mapa, destacados o frases marca).
- **`/menu/`** bilíngue con **precios**, secciones, **leyenda de alérgenos** coherente con la carta.
- **Galería** (fotos sesión cuando existan).
- **Contacto**, **FAQ** restauración.
- **Legal** RGPD Cookies + Aviso legal CA/ES como en plantilla.

**Hosting:** Cloudflare Pages, dominio inicial `*.pages.dev` hasta dominio comprado.

**Comercial / fases:** misma filosofía que **`CLAUDE.md`** del repo Klips (solo metodología; **no** copiar marca ni precios Klip's).

---

## 3. Identidad cliente — datos confirmados por Francesc / Google

> **Nombre comercial:** *El mini nou*.
> **Repositorio briefing + carta:** `elmininou` (este repo).
> **Instagram:** [https://www.instagram.com/elmininou/](https://www.instagram.com/elmininou/)

### 3.1 NAP operativo

| Campo | Valor |
|--------|--------|
| Dirección | **Carrer Jeroni de Moragas, 13** — **08480** **L'Ametlla del Vallès** (Barcelona), España |
| Teléfono (fuente usuario) | **604 92 79 03** → **E.164 `+34604927903`** |

**⚠ Directorios terceros (no oficial):** nombres/teléfonos distintos en la web; **no** usarlos sin confirmación del titular. Mantener **604 92 79 03** como fuente declarada.

### 3.2 Coordenadas (lat/lon)

Pendiente: **Google Maps** → clic derecho en el local → pegar en `business.ts`.

```txt
COORDENADAS: PENDIENTE — pegar de Google Maps
```

### 3.3 Horario (Europe/Madrid)

| Día | Horario |
|-----|---------|
| Lunes | Cerrado |
| Martes | Cerrado |
| Miércoles | Cerrado |
| Jueves | 20:00 – 23:00 |
| Viernes | 20:00 – 23:00 |
| Sábado | 09:00 – 23:00 |
| Domingo | 09:00 – 16:00 |

Validar con el cliente antes de legal/Schema definitivo.

### 3.4 Google reviews (referencia)

**5.0 · 11 reseñas** (actualizar fecha al volcar a `reviews.ts`).

---

## 4. Marca editorial y contexto

- Cartas en catalán con **mensajes golf** y silueta (validar uso en web y derechos).
- Listados en la vía sobre minigolf: **pista UX** hasta copy aprobada por el local.
- **ToV:** catalán gastronómico natural; ES espejo claro.

---

## 5. Prestador legal (sitio web)

- **Francesc Josep Vicente Blanco** como persona física prestadora (LSSI), mismo patrón que `legal.ts` de la plantilla.
- **Titular fiscal del restaurante:** pendiente datos por escrito del cliente.

---

## 6. Menú `/menu/` — fuente textual

Transcripción canónica en catalán en **este repo**:

- **`docs/MENU_CA_SOURCE.md`**

Incluye notas de brases, guarnición 1,50 €, canelons sin precio, citas golf.

**Capturas:** subir a **`docs/reference/`** (ver `docs/reference/README.md`).

---

## 7. Reservas y CTAs

- Instagram confirmado.
- WhatsApp: confirmar con el local.
- TheFork / Google Reservas: revisar ficha Maps.
- CTA **teléfono** siempre como camino seguro: `tel:+34604927903`.

---

## 8. Checklist inicial

1. Clonar plantilla desde [klips-estilistes-web](https://github.com/francescvicente-png/klips-estilistes-web) y seguir `TEMPLATE_USAGE.md`.
2. `business.ts`: NAP, horario §3.3, geo pendiente.
3. `site.ts` + `astro.config.mjs`: URL Pages, features restaurante.
4. Schema **Restaurant** / **FoodEstablishment**.
5. Rutas i18n **`/menu/`**.
6. Volcar **`MENU_CA_SOURCE.md`** → modelo TS.
7. UI con skill **ui-ux-pro-max**.
8. Reseñas solo texto real autorizado.
9. Legal + cookies.
10. Lighthouse + validator.schema.org.

---

## 9. Preguntas abiertas al cliente

Legal/NIF establecimiento, horario temporada, coords Maps, marca IG vs nombre en carta, WhatsApp negocio, **precio canelons**, unidades empandas/tequeños.

---

## Referencias plantilla Klips

| Recurso | URL |
|---------|-----|
| `TEMPLATE_USAGE.md` | https://github.com/francescvicente-png/klips-estilistes-web/blob/main/TEMPLATE_USAGE.md |
| `CLAUDE.md` (metodología) | https://github.com/francescvicente-png/klips-estilistes-web/blob/main/CLAUDE.md |

**FIN del handoff.**

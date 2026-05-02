# Klip's estilistes · Web

Web bilingüe (catalán por defecto, castellano como segundo idioma) para **Klip's estilistes**, una peluquería unisex en Aiguafreda (Barcelona). Sitio estático construido con Astro 6 y Tailwind CSS 4. Hosting previsto en Cloudflare Pages.

## Stack

- [Astro](https://astro.build/) 6 con TypeScript estricto
- [Tailwind CSS](https://tailwindcss.com/) 4 vía `@tailwindcss/vite`
- pnpm + Node 22+
- `@astrojs/sitemap`, `astro-icon` (subset Tabler en `astro.config.mjs`), Astro 6 Fonts API

## Estado

**En desarrollo · contenido demo.** Servicios, fotografías y datos de reseñas son demostrativos hasta que el cliente confirme el proyecto y aporte los reales. Cliente real (Klip's estilistes) **no contactado todavía**.

Ver [`CLAUDE.md`](./CLAUDE.md) para el plan de fases, contrato de trabajo, decisiones técnicas y datos demo a sustituir. Contexto de plantilla + rutas/reservas: [`VESSEL_CONTEXT.md`](./VESSEL_CONTEXT.md).

## Comandos

```sh
pnpm install            # instala dependencias
pnpm dev                # servidor de desarrollo en http://localhost:4321
pnpm build              # genera la versión estática en dist/
pnpm preview            # sirve dist/ localmente para verificar el build
```

## Estructura del proyecto

```text
src/        # código fuente: components, layouts, pages, data, i18n, styles, assets
public/     # assets estáticos servidos tal cual (favicon, robots, OG image, _headers, _redirects)
scripts/    # utilities de build (generador de la OG image)
dist/       # salida del build (autogenerada, no se versiona)
```

Detalle completo de la estructura, decisiones de diseño y flujo de trabajo en [`CLAUDE.md`](./CLAUDE.md).

## Despliegue

Auto-deploy a Cloudflare Pages desde la rama `main`. Cualquier `git push origin main` desencadena un nuevo deploy. Ver la sección "Guía de despliegue a Cloudflare Pages" en [`CLAUDE.md`](./CLAUDE.md) para los pasos de configuración inicial y verificaciones post-deploy.

## Licencia

**All rights reserved.** Sitio comercial. Cualquier uso, copia o redistribución requiere autorización expresa del mantenedor.

## Mantenedor

**Francesc Vicente Blanco**

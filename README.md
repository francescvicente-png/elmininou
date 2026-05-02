# El mini nou — projecte web

Repositori dedicat al restaurant **El mini nou** (L’Ametlla del Vallès).

## Contingut

| Fitxer / carpeta | Descripció |
|------------------|-------------|
| [`docs/HANDOFF_EL_MINI_NOU.md`](./docs/HANDOFF_EL_MINI_NOU.md) | Handoff: stack, NAP, schema, checklist |
| [`docs/MENU_CA_SOURCE.md`](./docs/MENU_CA_SOURCE.md) | Transcripció canònica de la carta |
| [`docs/reference/`](./docs/reference/) | Captures PDF/PNG del menú |
| **`web/`** | **Codi Astro 6** (plantilla Klip’s adaptada): home, `/ca/menu/`, `/es/menu/`, galeria, FAQ, legal |

## Desenvolupament local (`web/`)

```sh
cd web
pnpm install
pnpm dev    # http://localhost:4321/
pnpm build
```

**URL pública prevista:** `https://elmininou.pages.dev` (configurable a `web/src/data/site.ts` i `web/astro.config.mjs`).

## Instagram

[@elmininou](https://www.instagram.com/elmininou/)

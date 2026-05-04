# El mini nou — projecte web

Repositori dedicat al restaurant **El mini nou** (L'Ametlla del Vallès).

## Documents de context

| Fitxer | Per a qui | Què conté |
|---|---|---|
| [`CONTEXT_ELMININOU.md`](./CONTEXT_ELMININOU.md) | Agents (Claude Code i altres) | Context tècnic + de producte complet: stack, pàgines, dades, decisions, deute, pendents. **Punt d'entrada obligatori abans de tocar codi.** |
| [`ESTADO_ELMININOU.md`](./ESTADO_ELMININOU.md) | Caps, client, lectors no tècnics | Aparador del producte en llenguatge planer (què funciona, què està en curs, problemes coneguts). |
| [`MENU_ELMININOU.md`](./MENU_ELMININOU.md) | Qui editi la carta | Font canònica de la carta del restaurant (preus, al·lèrgens, citacions golf). |
| [`docs/reference/`](./docs/reference/) | Verificació visual | Captures físiques (PDF/PNG) del menú original del local. |
| `web/` | Desenvolupador | Codi Astro 6 estàtic. |

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

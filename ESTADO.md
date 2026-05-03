# Estado del proyecto — El mini nou

> **Última actualización:** 03/05/2026
> **Estado general:** 🟡 En desarrollo
> **Versión actual:** pre-producción (web en revisión antes de presentar al restaurant — incorporadas les ressenyes reals de Google)

---

## ¿Qué es?

Web pública del restaurant **El mini nou** de l'Ametlla del Vallès. Sirve como aparador del local en internet: presenta la carta amb fotos, mostra els horaris i la ubicació, i permet als clients trucar o escriure per WhatsApp per reservar taula. Funciona en català i castellà.

---

## ¿Qué funciona ya? ✅

- Pàgina d'inici amb foto editorial del restaurant, presentació, horaris, telèfon, adreça i tria de plats destacats.
- **Pàgina de carta completa** amb tots els plats organitzats per seccions (entrants, brases, pastes, combinats, entrepans calents, entrepans freds, tapes, begudes).
- **Foto editorial per cada plat** de la carta (54 imatges), generades com a referència visual.
- **Visualització ampliada de cada plat** en obrir-ne la imatge: a part de la foto en gran, mostra el nom, el preu, els ingredients, els al·lèrgens destacats en un bloc d'avís i un recordatori de confirmar sempre al servei.
- **Plats firma al començament de la carta**: tres clàssics destacats amb foto gran i preu visible per ajudar al client que entra per primer cop a decidir.
- **Filtres dietètics ràpids** a la carta amb etiquetes a cada plat (brasa, vegetarià, sense gluten, per compartir, picant). Es poden combinar — per exemple "brasa + per compartir" — i el catàleg s'adapta al moment.
- Galeria de fotos del local i de plats com a mostra ambient.
- Botó flotant de WhatsApp i botó de "trucar per reservar" sempre visibles.
- Pàgines de contacte, com arribar i preguntes freqüents.
- **Bloc de ressenyes reals de Google al home**: les 8 ressenyes amb text es mostren en una composició editorial tipus bento (cita destacada gran + tarjetes), amb mitjana 5,0 ★ i comptador de les 11 ressenyes verificades. Les 3 valoracions sense text es comptabilitzen però no es citen. Cada cita inclou nom de l'autor, data, distintiu de "Local Guide" quan correspon i marca de "Ressenya verificada a Google". Si la ressenya original és en castellà, la versió en català inclou un avís de traducció automàtica.
- Pàgines legals (avís legal, política de privacitat, política de cookies).
- Banner de cookies amb opció d'acceptar / rebutjar.
- Versió completa en català i en castellà.
- Disseny adaptat a mòbil, tauleta i ordinador.
- La web es publica automàticament a Cloudflare cada cop que hi ha canvis al repositori.

---

## ¿En qué se está trabajando ahora? 🔨

- Refinament dels textos i fotos abans d'ensenyar la web al restaurant. — sense data tancada.

---

## ¿Qué está pendiente? ⏳

- Revisió de la carta amb el restaurant: confirmar plats vigents, preus actuals i al·lèrgens reals (les fotos i alguns textos són referencials i poden necessitar ajust).
- Substituir, si convé, les fotos generades per fotos reals fetes al local.
- Confirmar dades de contacte definitives: nom comercial, NIF, email RGPD per a la pàgina legal.
- Decidir si cal afegir una pàgina específica de menú del dia o promocions.
- Connectar un domini propi (ara la web viu sota un subdomini de Cloudflare Pages).

---

## 💰 Impacto en el negocio

[Pendent d'estimar amb el restaurant — necessitem saber quanta gent truca o pregunta per la carta i els al·lèrgens per dimensionar l'estalvi.]

Beneficis esperats (estimats, encara per validar):
- Reducció de trucades preguntant horari, adreça i carta — la web ho té tot disponible 24/7.
- Menys preguntes sobre al·lèrgens al servei: el client pot consultar-ho abans de venir.
- Presència professional davant cerques tipus "restaurant Ametlla del Vallès" a Google.

---

## ⚠️ Problemas conocidos

- Les fotos dels plats són **referencials generades amb IA**, no fotos reals del local. Cada plat porta una nota indicant-ho, però convé substituir-les per fotos reals quan es pugui. Impacte: mitjà.
- Els al·lèrgens i preus de la carta estan basats en una font interna i poden no coincidir amb la carta impresa actual del restaurant. Impacte: alt fins a la revisió amb el restaurant.
- La web encara no té domini propi.

---

## 💡 Ideas y mejoras propuestas

- Pàgina pública de menú del dia que es pugui actualitzar setmanalment sense tocar codi.
- Galeria de fotos reals del local i de plats reals (sessió fotogràfica).
- Botó "compartir carta" per WhatsApp directe des de cada plat.
- Versió "imprimible" de la carta en PDF per al servei en sala.
- Sistema d'icones més evident per al·lèrgens crítics (fruita seca, lactosa, ou) plat per plat — actualment hi ha el filtre "sense gluten", però es podria reforçar visualment per tot tipus d'al·lèrgens.

---

## Próximos pasos

1. Quedar amb el restaurant per validar carta, preus i dades de contacte definitives.
2. Decidir si fem sessió fotogràfica al local o si mantenim les fotos IA durant un temps.
3. Comprar i connectar un domini propi.

---

## Notas para el lector

Aquest document s'actualitza quan hi ha avenços rellevants per al producte. No conté detalls tècnics ni història del codi. Per a informació tècnica, consulta el repositori i el `CLAUDE.md` del projecte.

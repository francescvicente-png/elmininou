/**
 * Invented narrative for the home storytelling section — DEMO placeholder.
 *
 * Generic restaurant journey (kitchen roots, sala craft, locality).
 * Replace with the real story when the business confirms it.
 *
 * Each scene gets:
 *   - `idea` / `title` / `body` (bilingual)
 *   - `imageIndex`: which gallery image backs the panel (decorative only).
 */
import type { Lang } from '../i18n/config';

export interface StoryScene {
	id: string;
	imageIndex: number;
	idea: Record<Lang, string>;
	title: Record<Lang, string>;
	body: Record<Lang, string>;
}

export const storyScenes: ReadonlyArray<StoryScene> = [
	{
		id: 'origen',
		imageIndex: 0,
		idea: { ca: 'Origen', es: 'Origen' },
		title: { ca: "L'origen", es: 'El origen' },
		body: {
			ca: 'Tot restaurant comença per entendre foc i verdura amb calma — què té sentit cada setmana davant dels proveïdors i què llegim millor sobre la graella.',
			es: 'Todo restaurante empieza entendiendo fuego y verdura con calma — qué encaja cada semana con los proveedores y qué leemos mejor en la plancha.',
		},
	},
	{
		id: 'formacio',
		imageIndex: 2,
		idea: { ca: 'Formació', es: 'Formación' },
		title: { ca: "L'aprenentatge", es: 'El aprendizaje' },
		body: {
			ca: "La sala i el passi comparteixen el mateix vocabulari: ordenar tapes o brasa exigeix dir amb claredat al·lèrgens i ingredients abans que arribin els coberts.",
			es: 'Sala y pas comparten vocabulario: pedir tapas o brasa exige decir con claridad alérgenos e ingredientes antes de que lleguen los cubiertos.',
		},
	},
	{
		id: 'ofici',
		imageIndex: 4,
		idea: { ca: 'Ofici', es: 'Oficio' },
		title: { ca: 'El ritme entre fogons i taules', es: 'El ritmo entre fogones y mesas' },
		body: {
			ca: 'Un menjador tranquil no és més lent: és temps real per repetir cada plat sense convertir-ne la visita en un monòleg inaccessible.',
			es: 'Un comedor tranquilo no es más lento: es tiempo real para repetir cada plato sin convertir la visita en un monólogo inaccesible.',
		},
	},
	{
		id: 'ametlla',
		imageIndex: 5,
		idea: {
			ca: "L'Ametlla del Vallès",
			es: 'La Ametlla del Vallès',
		},
		title: {
			ca: "Avui, al carrer Jeroni de Moragas",
			es: 'Hoy, en la calle Jeroni de Moragas',
		},
		body: {
			ca: 'Un restaurant de poble acull veïnat i excursionistes amb la mateixa regla de joc: carta llegida endavant i brasa feta servir amb criteri, sempre parlant primer amb sala.',
			es: 'Un restaurante de pueblo acoge vecinos y visitantes con la misma regla: carta a la vista y brasa con criterio, hablando antes con sala.',
		},
	},
];

export const storytellingPlaceholder = true;

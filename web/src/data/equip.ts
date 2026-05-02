/**
 * Salon team profiles for the home EquipSection.
 *
 * Profile copy is bilingual; replace names or bios when the salon confirms wording.
 */
import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/config';
import trabajador1 from '../assets/images/demo/Trabajador 1.jpg';
import trabajadora2 from '../assets/images/demo/Trabajadora 2.jpg';
import trabajadora3 from '../assets/images/demo/Trabajadora 3.jpg';
import trabajadora4 from '../assets/images/demo/Trabajadora 4.jpg';

export type Bilingual = Record<Lang, string>;

export interface EstilistaProfile {
	id: string;
	name: Bilingual;
	role: Bilingual;
	bio: Bilingual;
	image: ImageMetadata;
}

export const equipProfiles: ReadonlyArray<EstilistaProfile> = [
	{
		id: 'stylist-1',
		name: {
			ca: 'Marc',
			es: 'Marc',
		},
		role: {
			ca: 'Colorista i tall tècnic',
			es: 'Colorista y corte técnico',
		},
		bio: {
			ca: "S'enfoca en diagnòstic de color, brillantor i solucions que respectin el cabell. Combina talls precisos amb assessorament honest sobre què es pot aconseguir en cada visita.",
			es: 'Se centra en diagnóstico de color, brillo y soluciones que respeten el cabello. Combina cortes precisos con asesoramiento honesto sobre qué se puede lograr en cada visita.',
		},
		image: trabajador1,
	},
	{
		id: 'stylist-2',
		name: {
			ca: 'Laia',
			es: 'Laia',
		},
		role: {
			ca: 'Estètica i cures capil·lars',
			es: 'Estética y tratamientos capilares',
		},
		bio: {
			ca: "Atén tractaments de cabell i cures que busquen confort i resultat visible: hidratacions, ferratges suaus i protocols adequats al que el cabell demana.",
			es: 'Atiende tratamientos capilares que buscan confort y resultado visible: hidrataciones, secados cuidadosos y protocolos adecuados a lo que el pelo pide.',
		},
		image: trabajadora2,
	},
	{
		id: 'stylist-3',
		name: {
			ca: 'Judit',
			es: 'Judit',
		},
		role: {
			ca: 'Especialista en pentinats i look',
			es: 'Especialista en peinados y look',
		},
		bio: {
			ca: "Dissenya pentinats per a dia a dia i ocasions: volum, textura i fixes que aguantin sense perdre naturalitat. Bona mà per a recollits i acabats finos.",
			es: 'Diseña peinados para el día a día y ocasiones: volumen, textura y fijaciones que aguanten sin perder naturalidad. Buena mano para recogidos y acabados finos.',
		},
		image: trabajadora3,
	},
	{
		id: 'stylist-4',
		name: {
			ca: 'Clara',
			es: 'Clara',
		},
		role: {
			ca: 'Recepció i assessorament al client',
			es: 'Recepción y asesoramiento al cliente',
		},
		bio: {
			ca: "És el primer contacte al taulell: escolta què necessites, encaixa horaris i et connecta amb el professional adequate. Busca que cada visita comenci amb tranquil·litat i claredat.",
			es: 'Es el primer contacto en recepción: escucha qué necesitas, encaja horarios y te conecta con la profesional adecuada. Busca que cada visita empiece con tranquilidad y claridad.',
		},
		image: trabajadora4,
	},
];

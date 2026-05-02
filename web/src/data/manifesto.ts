/**
 * Editorial pull-quote on the home: one sentence, generous spacing.
 *
 * Placeholder aligned with a hair / beauty salon (honest advice, same
 * venue for several services). Replace with the owner’s voice when ready.
 */
import type { Lang } from '../i18n/config';

export interface ManifestoCopy {
	eyebrow: Record<Lang, string>;
	body: Record<Lang, string>;
	attribution: Record<Lang, string>;
}

export const manifesto: ManifestoCopy = {
	eyebrow: {
		ca: 'El saló',
		es: 'El salón',
	},
	body: {
		ca: 'Un bon saló no et ven una imatge: et dóna temps, criteri i un pla clar pel cabell i pels serveis que triïs al mateix local.',
		es: 'Un buen salón no te vende una imagen: te da tiempo, criterio y un plan claro para el pelo y para los servicios que elijas en el mismo local.',
	},
	attribution: {
		ca: 'Apunts del local · Pendent de personalitzar',
		es: 'Apuntes del local · Pendiente de personalizar',
	},
};

export const manifestoPlaceholder = true;

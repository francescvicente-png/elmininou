/**
 * Menu imagery — Gemini (nano-banana model 2) Editorial food shots for the carta page.
 * Illustrative promotional photography only; dishes may differ from daily service plating.
 */

import type { ImageMetadata } from 'astro';

import menuHero from '../assets/images/menu-generated/menu-hero.jpg';
import dishAmanidaElMini from '../assets/images/menu-generated/dish-amanida-el-mini.jpg';
import dishEntranya from '../assets/images/menu-generated/dish-entranya.jpg';
import dishEspaguetis from '../assets/images/menu-generated/dish-espaguetis.jpg';
import dishGrandSlam from '../assets/images/menu-generated/dish-grand-slam.jpg';
import dishSandwichBotifarra from '../assets/images/menu-generated/dish-sandwich-botifarra.jpg';
import dishTapasOlives from '../assets/images/menu-generated/dish-tapas-olives.jpg';

export const MENU_PAGE_HERO_IMAGE = menuHero;

/** Featured catalog cards keyed by `Service.id`. */
export const MENU_DISH_ILLUSTRATIONS: Partial<Record<string, ImageMetadata>> = {
	'amanida-el-mini': dishAmanidaElMini,
	entranya: dishEntranya,
	espaguetis: dishEspaguetis,
	'grand-slam': dishGrandSlam,
	'sandwich-botifarra': dishSandwichBotifarra,
	'tapas-olives': dishTapasOlives,
};

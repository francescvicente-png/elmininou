/**
 * Menu imagery — Gemini (nano-banana model 2) Editorial food shots for the carta page.
 * Illustrative promotional photography only; dishes may differ from daily service plating.
 */

import type { ImageMetadata } from 'astro';

import menuHero from '../assets/images/menu-generated/menu-hero.jpg';

// Starters
import dishAmanidaElMini from '../assets/images/menu-generated/dish-amanida-el-mini.jpg';
import dishAmanidaCodony from '../assets/images/menu-generated/dish-amanida-codony.jpg';
import dishAmanidaTonyina from '../assets/images/menu-generated/dish-amanida-tonyina.jpg';
import dishAmanidaMixta from '../assets/images/menu-generated/dish-amanida-mixta.jpg';
import dishProvoloneCalent from '../assets/images/menu-generated/dish-provolone-calent.jpg';
import dishTequenos from '../assets/images/menu-generated/dish-tequenos.jpg';
import dishEmpanades from '../assets/images/menu-generated/dish-empanades.jpg';
import dishMatrimoni from '../assets/images/menu-generated/dish-matrimoni.jpg';
import dishCroquetes from '../assets/images/menu-generated/dish-croquetes.jpg';
import dishEscalivada from '../assets/images/menu-generated/dish-escalivada.jpg';
import dishPatatesFregides from '../assets/images/menu-generated/dish-patates-fregides.jpg';
import dishPatatesBraves from '../assets/images/menu-generated/dish-patates-braves.jpg';
import dishFingersPollastre from '../assets/images/menu-generated/dish-fingers-pollastre.jpg';
import dishPaTorrat from '../assets/images/menu-generated/dish-pa-torrat.jpg';

// Grills
import dishEntranya from '../assets/images/menu-generated/dish-entranya.jpg';
import dishPollastReQuarter from '../assets/images/menu-generated/dish-pollastre-quarter.jpg';
import dishXai from '../assets/images/menu-generated/dish-xai.jpg';
import dishPopPure from '../assets/images/menu-generated/dish-pop-pure.jpg';
import dishXurrasc from '../assets/images/menu-generated/dish-xurrasc.jpg';
import dishCansalada from '../assets/images/menu-generated/dish-cansalada.jpg';

// Pasta
import dishEspaguetis from '../assets/images/menu-generated/dish-espaguetis.jpg';
import dishCanelons from '../assets/images/menu-generated/dish-canelons.jpg';

// Combos
import dishBogey from '../assets/images/menu-generated/dish-bogey.jpg';
import dishBolaEmbocada from '../assets/images/menu-generated/dish-bola-embocada.jpg';
import dishChip from '../assets/images/menu-generated/dish-chip.jpg';
import dishMilanga from '../assets/images/menu-generated/dish-milanga.jpg';
import dishNapo from '../assets/images/menu-generated/dish-napo.jpg';
import dishACavall from '../assets/images/menu-generated/dish-a-cavall.jpg';
import dishGrandSlam from '../assets/images/menu-generated/dish-grand-slam.jpg';
import dishGreen from '../assets/images/menu-generated/dish-green.jpg';

// Hot sandwiches
import dishSandwichBotifarra from '../assets/images/menu-generated/dish-sandwich-botifarra.jpg';
import dishSandwichLlom from '../assets/images/menu-generated/dish-sandwich-llom.jpg';
import dishSandwichCansaladaHot from '../assets/images/menu-generated/dish-sandwich-cansalada-hot.jpg';
import dishSandwichTruita from '../assets/images/menu-generated/dish-sandwich-truita.jpg';
import dishSandwichBikini from '../assets/images/menu-generated/dish-sandwich-bikini.jpg';
import dishSandwichFrankfurt from '../assets/images/menu-generated/dish-sandwich-frankfurt.jpg';

// Cold sandwiches
import dishSandwichTonyinaFred from '../assets/images/menu-generated/dish-sandwich-tonyina-fred.jpg';
import dishSandwichFormatge from '../assets/images/menu-generated/dish-sandwich-formatge.jpg';
import dishSandwichFuet from '../assets/images/menu-generated/dish-sandwich-fuet.jpg';
import dishSandwichPernilDolc from '../assets/images/menu-generated/dish-sandwich-pernil-dolc.jpg';

// Tapas
import dishTapasOlives from '../assets/images/menu-generated/dish-tapas-olives.jpg';
import dishTapasEscopinyes from '../assets/images/menu-generated/dish-tapas-escopinyes.jpg';
import dishTapasMusclos from '../assets/images/menu-generated/dish-tapas-musclos.jpg';
import dishTapasBraves from '../assets/images/menu-generated/dish-tapas-braves.jpg';
import dishTapasPotaChip from '../assets/images/menu-generated/dish-tapas-potato-chip.jpg';
import dishTapasTequenos from '../assets/images/menu-generated/dish-tapas-tequenos.jpg';
import dishTapasEmpanades from '../assets/images/menu-generated/dish-tapas-empanades.jpg';
import dishTapasCroquetes5 from '../assets/images/menu-generated/dish-tapas-croquetes-5.jpg';
import dishTapasFingers from '../assets/images/menu-generated/dish-tapas-fingers.jpg';

// Drinks (representative selection)
import dishDrinkCanya from '../assets/images/menu-generated/dish-drink-canya.jpg';
import dishDrinkRefresc from '../assets/images/menu-generated/dish-drink-refresc.jpg';
import dishDrinkCombinats from '../assets/images/menu-generated/dish-drink-combinats.jpg';
import dishDrinkVermut from '../assets/images/menu-generated/dish-drink-vermut.jpg';

export const MENU_PAGE_HERO_IMAGE = menuHero;

/** Featured catalog cards keyed by `Service.id`. */
export const MENU_DISH_ILLUSTRATIONS: Partial<Record<string, ImageMetadata>> = {
	// Starters
	'amanida-el-mini': dishAmanidaElMini,
	'amanida-codony': dishAmanidaCodony,
	'amanida-tonyina': dishAmanidaTonyina,
	'amanida-mixta': dishAmanidaMixta,
	'provolone-calent': dishProvoloneCalent,
	tequenos: dishTequenos,
	empanades: dishEmpanades,
	matrimoni: dishMatrimoni,
	croquetes: dishCroquetes,
	escalivada: dishEscalivada,
	'patates-fregides': dishPatatesFregides,
	'patates-braves': dishPatatesBraves,
	'fingers-pollastre': dishFingersPollastre,
	'pa-torrat': dishPaTorrat,
	// Grills
	entranya: dishEntranya,
	'pollastre-quarter': dishPollastReQuarter,
	xai: dishXai,
	'pop-pure': dishPopPure,
	xurrasc: dishXurrasc,
	cansalada: dishCansalada,
	// Pasta
	espaguetis: dishEspaguetis,
	canelons: dishCanelons,
	// Combos
	bogey: dishBogey,
	'bola-embocada': dishBolaEmbocada,
	chip: dishChip,
	milanga: dishMilanga,
	napo: dishNapo,
	'a-cavall': dishACavall,
	'grand-slam': dishGrandSlam,
	green: dishGreen,
	// Hot sandwiches
	'sandwich-botifarra': dishSandwichBotifarra,
	'sandwich-llom': dishSandwichLlom,
	'sandwich-cansalada-hot': dishSandwichCansaladaHot,
	'sandwich-truita': dishSandwichTruita,
	'sandwich-bikini': dishSandwichBikini,
	'sandwich-frankfurt': dishSandwichFrankfurt,
	// Cold sandwiches
	'sandwich-tonyina-fred': dishSandwichTonyinaFred,
	'sandwich-formatge': dishSandwichFormatge,
	'sandwich-fuet': dishSandwichFuet,
	'sandwich-pernil-dolç': dishSandwichPernilDolc,
	// Tapas
	'tapas-olives': dishTapasOlives,
	'tapas-escopinyes': dishTapasEscopinyes,
	'tapas-musclos': dishTapasMusclos,
	'tapas-braves': dishTapasBraves,
	'tapas-potato-chip': dishTapasPotaChip,
	'tapas-tequenos': dishTapasTequenos,
	'tapas-empanades': dishTapasEmpanades,
	'tapas-croquetes-5': dishTapasCroquetes5,
	'tapas-fingers': dishTapasFingers,
	// Drinks
	'drink-canya': dishDrinkCanya,
	'drink-copa-cervesa': dishDrinkCanya,
	'drink-refresc': dishDrinkRefresc,
	'drink-combinats': dishDrinkCombinats,
	'drink-vermut': dishDrinkVermut,
};

import type { CategoryCard, FaqItem, PvaIntro, StepCard } from '../types/content';
import { media } from './images';

/** Tarjetas del home: dos categorías, una frase cada una. */
export const homeCategories: CategoryCard[] = [
	{
		title: 'Pinturas para tela',
		description: 'PINTEREX: color y cuidado para tus telas.',
		image: media.customShirt,
		alt: 'Polera personalizada con pintura textil',
		href: '/productos#productos',
		cta: 'Ver productos',
		accent: 'brand',
	},
	{
		title: 'Pinturas PVA',
		description: 'Para papel, cartón, madera y manualidades.',
		image: media.craftTable,
		alt: 'Materiales de pintura para manualidades',
		href: '/productos#pva',
		cta: 'Ver categoría',
		accent: 'deep',
	},
];

/** Tres pasos, válidos para el home y para el catálogo. */
export const steps: StepCard[] = [
	{
		title: 'Prepara',
		text: 'Lava la tela y déjala secar.',
		image: media.fabricPrep,
		alt: 'Tela limpia lista para pintar',
	},
	{
		title: 'Pinta',
		text: 'Aplica la pintura con pincel.',
		image: media.brushApplication,
		alt: 'Pincel aplicando pintura',
	},
	{
		title: 'Fija',
		text: 'Deja secar 72 horas antes de lavar.',
		image: media.colorMixing,
		alt: 'Colores fijados sobre la tela',
	},
];

export const pvaIntro: PvaIntro = {
	title: 'PVA: color para otras superficies.',
	description: 'Papel, cartón, madera y manualidades. Otra forma de seguir creando.',
	image: media.craftTable,
	imageAlt: 'Pinturas PVA y materiales para manualidades',
};

/** Cuatro preguntas que realmente se hace la gente antes de empezar. */
export const faqs: FaqItem[] = [
	{
		question: '¿Sirve para cualquier tela?',
		answer: 'Funciona mejor en algodón. En telas sintéticas, haz una prueba pequeña antes.',
	},
	{
		question: '¿Cuándo puedo lavar la prenda?',
		answer: 'Después de 72 horas de secado a temperatura ambiente.',
	},
	{
		question: '¿Cuál producto elijo?',
		answer: 'La Pintura textil da el color. Los otros cuatro ayudan a proteger, fijar, diluir o crear efectos.',
	},
	{
		question: '¿PVA y PINTEREX son iguales?',
		answer: 'No. PINTEREX es para tela. PVA es para papel, cartón, madera y manualidades.',
	},
];

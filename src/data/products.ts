import type { PvaProduct, TextileProduct } from '../types/content';
import { media } from './images';

/**
 * PINTEREX: un producto principal y cuatro complementarios.
 * Cada ficha responde a tres preguntas: qué es, cuándo usarlo y cómo usarlo.
 */
export const textileProducts: TextileProduct[] = [
	{
		id: 'pintura-textil',
		name: 'Pintura textil',
		tag: 'El principal',
		description: 'Da color a la tela y fija el diseño después del secado.',
		image: media.customShirt,
		alt: 'Polera personalizada con pintura textil',
		presentation: '37 ml',
		badges: ['Tela', 'Secado 72 h'],
		steps: [
			'Lava la tela y déjala secar.',
			'Aplica la pintura con pincel.',
			'Deja secar 72 horas antes de lavar.',
		],
		tip: 'Funciona mejor en algodón.',
		featured: true,
	},
	{
		id: 'termolina-lechosa',
		name: 'Termolina lechosa',
		tag: 'Protege',
		description: 'Evita que los bordes de la tela se deshilachen.',
		image: media.fabricPrep,
		alt: 'Tela limpia lista para trabajar',
		presentation: '37 ml',
		badges: ['Algodón', 'Sin plancha'],
		steps: [
			'Usa algodón limpio y sin almidón.',
			'Aplica en el borde con pincel.',
			'Deja secar 30 a 60 minutos.',
		],
		tip: 'No la uses en telas sintéticas.',
	},
	{
		id: 'cola-permanente',
		name: 'Cola permanente',
		tag: 'Fija moldes',
		description: 'Mantiene el molde o esténcil en su lugar mientras pintas.',
		image: media.stencilWork,
		alt: 'Molde y pincel sobre la mesa de trabajo',
		presentation: '37 ml',
		badges: ['Reutilizable'],
		steps: [
			'Aplica una capa fina en el reverso del molde.',
			'Espera 20 minutos hasta que quede pegajosa.',
			'Coloca el molde y presiona suavemente.',
		],
		tip: 'No la apliques directo sobre la tela.',
	},
	{
		id: 'diluyente',
		name: 'Diluyente',
		tag: 'Da fluidez',
		description: 'Hace la pintura más líquida para degradados y aerógrafo.',
		image: media.brushApplication,
		alt: 'Pincel aplicando pintura sobre una superficie',
		presentation: '100 ml',
		badges: ['Degradados', 'Aerógrafo'],
		steps: [
			'Pon un poco de pintura en un recipiente.',
			'Agrega diluyente poco a poco.',
			'Aplica y deja secar.',
		],
		tip: 'Úsalo solo con pinturas PINTEREX.',
	},
	{
		id: 'pintura-incolora',
		name: 'Pintura incolora (500)',
		tag: 'Crea efectos',
		description: 'Aclara los colores y hace transparencias sin perder flexibilidad.',
		image: media.colorMixing,
		alt: 'Colores acrílicos siendo mezclados',
		presentation: '37 ml',
		badges: ['Transparencias'],
		steps: [
			'Mezcla con tu color PINTEREX.',
			'Añade poco a poco hasta el tono que quieras.',
			'Aplica y deja secar.',
		],
		tip: 'Fija con plancha sin vapor, de 3 a 5 minutos.',
	},
];

/** PVA: nombres provisionales hasta recibir las fichas oficiales. */
export const pvaProducts: PvaProduct[] = [
	{
		id: 'pva-escolar',
		name: 'PVA escolar',
		description: 'Para trabajos escolares y manualidades.',
		image: media.craftTable,
		alt: 'Materiales sobre una mesa de trabajo',
		bestFor: 'Papel y cartón',
	},
	{
		id: 'pva-manualidades',
		name: 'PVA manualidades',
		description: 'Color para tus proyectos creativos.',
		image: media.artSupplies,
		alt: 'Materiales de arte sobre una mesa',
		bestFor: 'Manualidades',
	},
	{
		id: 'pva-madera',
		name: 'PVA madera',
		description: 'Decora piezas y objetos de madera.',
		image: media.woodCraft,
		alt: 'Piezas de madera para decorar',
		bestFor: 'Madera',
	},
	{
		id: 'pva-premium',
		name: 'PVA Premium',
		description: 'Un acabado más uniforme en cada capa.',
		image: media.creativeProcess,
		alt: 'Proceso creativo con materiales de pintura',
		bestFor: 'Acabado decorativo',
	},
];

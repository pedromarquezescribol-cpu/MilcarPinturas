import type { FooterGroup, NavLink, SeoMeta } from '../types/content';

/** Rutas y textos globales. Cambia aquí, no en los componentes. */
export const SITE = {
	/** Marca protagonista de la web. */
	name: 'Pinterex',
	/** Empresa matriz, dueña de la marca. */
	parent: 'Milcar',
	lang: 'es',
	year: 2026,
	routes: {
		home: '/',
		products: '/productos',
		videos: '/#videos',
	},
} as const;

/** Rotación de la portada. Cambia aquí el tiempo, no en el script. */
export const heroCarousel = {
	intervalMs: 3000,
} as const;

export const navLinks: NavLink[] = [
	{ href: SITE.routes.home, label: 'Inicio' },
	{ href: SITE.routes.products, label: 'Productos' },
];

/** Anclas visibles en la barra del catálogo. Solo lo esencial. */
export const catalogSections: NavLink[] = [
	{ href: '#productos', label: 'Productos' },
	{ href: '#pva', label: 'PVA' },
	{ href: '#videos', label: 'Videos' },
	{ href: '#preguntas', label: 'Preguntas' },
];

export const footerGroups: FooterGroup[] = [
	{
		title: 'Explorar',
		links: [
			{ href: SITE.routes.home, label: 'Inicio' },
			{ href: SITE.routes.products, label: 'Productos' },
			{ href: SITE.routes.videos, label: 'Videos' },
		],
	},
	{
		title: 'Categorías',
		links: [
			{ href: '/productos#productos', label: 'Pinturas para tela' },
			{ href: '/productos#pva', label: 'Pinturas PVA' },
		],
	},
];

export const seo: Record<'default' | 'home' | 'products', SeoMeta> = {
	default: {
		title: SITE.name,
		description: 'Pinturas para tela PINTEREX y pinturas PVA para papel, cartón y madera.',
	},
	home: {
		title: `${SITE.name} | Pinturas para tela y PVA`,
		description: 'Pinturas PINTEREX para tela y pinturas PVA para papel, cartón y madera. Simple de usar.',
	},
	products: {
		title: `Productos | ${SITE.name}`,
		description: 'Cinco productos PINTEREX para tela y pinturas PVA para otras superficies. Fácil de elegir y usar.',
	},
};

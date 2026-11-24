import type { HeroSlide } from '../types/content';

/**
 * Banco único de imágenes del sitio.
 *
 * Cada clave es una foto, no una sección: si la misma imagen se usa en dos
 * lugares, ambas apuntan a la misma clave. El día que lleguen las definitivas
 * solo se reemplaza el valor de la clave y el cambio se replica en todo el sitio.
 */
export const media = {
	brushApplication:
		'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1600&h=1200&q=80',
	customShirt:
		'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1600&h=1200&q=80',
	colorMixing:
		'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1600&h=1200&q=80',
	stencilWork:
		'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1600&h=1200&q=80',
	fabricPrep:
		'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1600&h=1200&q=80',
	craftTable:
		'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&h=1200&q=80',
	artSupplies:
		'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1600&h=1200&q=80',
	woodCraft:
		'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&h=1200&q=80',
	creativeProcess:
		'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&w=1600&h=1200&q=80',
} as const;

export type MediaKey = keyof typeof media;

/** Fotos de fondo del carrusel de portada. */
export const heroSlides: HeroSlide[] = [
	{ src: media.brushApplication, alt: 'Pinceles y pintura aplicada sobre una tela' },
	{ src: media.customShirt, alt: 'Prenda personalizada con pintura textil' },
	{ src: media.colorMixing, alt: 'Colores mezclados para una manualidad' },
	{ src: media.stencilWork, alt: 'Obra de arte en proceso sobre el caballete' },
];

import { pvaProducts, textileProducts } from '../data/products';
import type { PvaProduct, TextileProduct } from '../types/content';

/**
 * Selectores del catálogo. Las secciones reciben los datos por props y no
 * necesitan saber de dónde vienen ni en qué orden están.
 */
export function getTextileProducts(): TextileProduct[] {
	return textileProducts;
}

export function getPvaProducts(): PvaProduct[] {
	return pvaProducts;
}

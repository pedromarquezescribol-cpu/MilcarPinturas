/**
 * Contratos de contenido. Solo los campos que la web realmente muestra.
 * Menos campos = menos texto que mantener y más fácil de auditar.
 */

export type BadgeVariant = 'brand' | 'deep' | 'dark' | 'light' | 'soft' | 'muted';
export type ActionVariant = 'dark' | 'brand' | 'deep' | 'light';

export interface NavLink {
	href: string;
	label: string;
}

export interface FooterGroup {
	title: string;
	links: NavLink[];
}

export interface SeoMeta {
	title: string;
	description: string;
}

export interface BaseProduct {
	id: string;
	name: string;
	description: string;
	image: string;
	alt: string;
}

/** Producto textil: qué es, para qué sirve y tres pasos de uso. */
export interface TextileProduct extends BaseProduct {
	tag: string;
	presentation: string;
	badges: string[];
	steps: string[];
	tip?: string;
	featured?: boolean;
}

/** PVA: solo nombre, uso e imagen. */
export interface PvaProduct extends BaseProduct {
	bestFor: string;
}

export interface CategoryCard {
	title: string;
	description: string;
	image: string;
	alt: string;
	href: string;
	cta: string;
	accent: 'brand' | 'deep';
}

export interface StepCard {
	title: string;
	text: string;
	image: string;
	alt: string;
}

export interface FaqItem {
	question: string;
	answer: string;
}

/** Foto de portada con su texto alternativo. */
export interface HeroSlide {
	src: string;
	alt: string;
}

export interface DemoVideo {
	id: string;
	title: string;
	description: string;
	badge: string;
}

export interface PvaIntro {
	title: string;
	description: string;
	image: string;
	imageAlt: string;
}

/**
 * Comportamiento del carrusel de portada.
 * El markup vive en HomeHero.astro; aquí solo hay lógica.
 */

const SELECTORS = {
	root: '[data-hero-carousel]',
	slide: '[data-hero-slide]',
	dot: '[data-hero-dot]',
	status: '[data-hero-status]',
} as const;

const DEFAULT_INTERVAL_MS = 3000;

class HeroCarousel {
	private readonly slides: HTMLElement[];
	private readonly dots: HTMLButtonElement[];
	private readonly status: HTMLElement | null;
	private readonly intervalMs: number;

	private index = 0;
	private timer: number | undefined;

	constructor(root: HTMLElement) {
		this.slides = Array.from(root.querySelectorAll<HTMLElement>(SELECTORS.slide));
		this.dots = Array.from(root.querySelectorAll<HTMLButtonElement>(SELECTORS.dot));
		this.status = root.querySelector<HTMLElement>(SELECTORS.status);
		this.intervalMs = Number(root.dataset.heroInterval) || DEFAULT_INTERVAL_MS;

		this.dots.forEach((dot, index) => {
			dot.addEventListener('click', () => {
				this.show(index);
				this.start();
			});
		});

		// La portada ocupa casi toda la pantalla: pausar con el mouse dejaría
		// el carrusel detenido mientras el cursor esté sobre ella.
		document.addEventListener('visibilitychange', () => this.start());

		this.show(0);
		this.start();
	}

	private show(index: number): void {
		if (this.slides.length === 0) return;

		this.index = (index + this.slides.length) % this.slides.length;

		this.slides.forEach((slide, i) => {
			const isActive = i === this.index;
			slide.classList.toggle('opacity-100', isActive);
			slide.classList.toggle('opacity-0', !isActive);
			slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
		});

		this.dots.forEach((dot, i) => {
			const isActive = i === this.index;
			dot.setAttribute('aria-current', isActive ? 'true' : 'false');
			dot.classList.toggle('w-8', isActive);
			dot.classList.toggle('w-2', !isActive);
			dot.classList.toggle('bg-white', isActive);
			dot.classList.toggle('bg-white/50', !isActive);
		});

		if (this.status) {
			this.status.textContent = String(this.index + 1).padStart(2, '0');
		}
	}

	private start(): void {
		window.clearInterval(this.timer);
		if (this.slides.length > 1 && !document.hidden) {
			this.timer = window.setInterval(() => this.show(this.index + 1), this.intervalMs);
		}
	}
}

/** Punto de composición: conecta el DOM con el carrusel. */
export function initHeroCarousel(): void {
	const root = document.querySelector<HTMLElement>(SELECTORS.root);
	if (!root || root.dataset.heroCarouselReady === 'true') return;
	root.dataset.heroCarouselReady = 'true';

	new HeroCarousel(root);
}

initHeroCarousel();

import { getEmbedUrl } from '../lib/youtube';

/**
 * Comportamiento del carrusel de videos.
 * El markup vive en VideoCarousel.astro; aquí solo hay lógica, dividida en
 * dos colaboradores con una responsabilidad cada uno.
 */

const SELECTORS = {
	root: '[data-video-carousel]',
	track: '[data-video-track]',
	prev: '[data-carousel-prev]',
	next: '[data-carousel-next]',
	modal: '[data-video-modal]',
	frame: '[data-video-frame]',
	title: '[data-video-modal-title]',
	close: '[data-video-close]',
	trigger: '[data-video-id]',
} as const;

type VideoTrigger = HTMLButtonElement;

class CarouselScroller {
	constructor(
		private readonly track: HTMLElement,
		prevButton: Element | null,
		nextButton: Element | null,
		private readonly fraction = 0.8,
	) {
		prevButton?.addEventListener('click', () => this.scroll(-1));
		nextButton?.addEventListener('click', () => this.scroll(1));
	}

	private scroll(direction: -1 | 1): void {
		this.track.scrollBy({
			left: direction * this.track.clientWidth * this.fraction,
			behavior: 'smooth',
		});
	}
}

class VideoModal {
	private lastTrigger: VideoTrigger | null = null;

	constructor(
		private readonly modal: HTMLElement,
		private readonly frame: HTMLIFrameElement,
		private readonly title: HTMLElement | null,
		private readonly closeButton: HTMLElement | null,
	) {
		this.closeButton?.addEventListener('click', () => this.close());
		this.modal.addEventListener('click', (event) => {
			if (event.target === this.modal) this.close();
		});
		this.modal.addEventListener('keydown', (event) => this.handleKeydown(event));
	}

	open(trigger: VideoTrigger): void {
		const id = trigger.dataset.videoId;
		if (!id) return;

		const embedUrl = getEmbedUrl(id);
		if (!embedUrl) return;

		const label = trigger.dataset.videoTitle ?? 'Video';
		this.lastTrigger = trigger;
		if (this.title) this.title.textContent = label;
		this.frame.title = label;
		this.frame.src = embedUrl;
		this.modal.classList.remove('hidden');
		this.modal.classList.add('flex');
		document.body.classList.add('overflow-hidden');
		this.closeButton?.focus();
	}

	close(): void {
		this.frame.src = '';
		this.modal.classList.add('hidden');
		this.modal.classList.remove('flex');
		document.body.classList.remove('overflow-hidden');
		this.lastTrigger?.focus();
		this.lastTrigger = null;
	}

	private getFocusable(): HTMLElement[] {
		return Array.from(
			this.modal.querySelectorAll<HTMLElement>(
				'button:not([disabled]), [href], iframe, [tabindex]:not([tabindex="-1"])',
			),
		);
	}

	/** Mantiene el foco dentro del diálogo mientras está abierto. */
	private handleKeydown(event: KeyboardEvent): void {
		if (!this.isOpen()) return;

		if (event.key === 'Escape') {
			this.close();
			return;
		}

		if (event.key !== 'Tab') return;

		const focusable = this.getFocusable();
		if (focusable.length === 0) {
			event.preventDefault();
			this.modal.focus();
			return;
		}

		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		const active = document.activeElement;

		if (event.shiftKey && (active === first || active === this.modal)) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && active === last) {
			event.preventDefault();
			first.focus();
		}
	}

	private isOpen(): boolean {
		return !this.modal.classList.contains('hidden');
	}
}

/** Punto de composición: conecta el DOM con los dos colaboradores. */
function initVideoCarousel(): void {
	const root = document.querySelector<HTMLElement>(SELECTORS.root);
	if (!root || root.dataset.carouselReady === 'true') return;
	root.dataset.carouselReady = 'true';

	const track = root.querySelector<HTMLElement>(SELECTORS.track);
	if (track) {
		new CarouselScroller(track, root.querySelector(SELECTORS.prev), root.querySelector(SELECTORS.next));
	}

	const modal = document.querySelector<HTMLElement>(SELECTORS.modal);
	const frame = modal?.querySelector<HTMLIFrameElement>(SELECTORS.frame);
	if (!modal || !frame) return;

	const videoModal = new VideoModal(
		modal,
		frame,
		modal.querySelector<HTMLElement>(SELECTORS.title),
		modal.querySelector<HTMLElement>(SELECTORS.close),
	);

	root.querySelectorAll<VideoTrigger>(SELECTORS.trigger).forEach((trigger) => {
		trigger.addEventListener('click', () => videoModal.open(trigger));
	});
}

initVideoCarousel();

import type { DemoVideo } from '../types/content';

/**
 * Todo lo relacionado con URLs de YouTube vive aquí.
 * Lo consumen tanto el servidor (miniaturas) como el cliente (embed).
 */
const VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

export function isYouTubeVideoId(id: string): boolean {
	return VIDEO_ID_PATTERN.test(id);
}

export function getThumbnailUrl(id: string): string {
	return isYouTubeVideoId(id) ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '';
}

export function getEmbedUrl(id: string): string {
	return isYouTubeVideoId(id)
		? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`
		: '';
}

/** Descarta configuraciones inválidas antes de renderizar el carrusel. */
export function getPlayableVideos(videos: DemoVideo[]): DemoVideo[] {
	return videos.filter((video) => isYouTubeVideoId(video.id));
}

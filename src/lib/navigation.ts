/**
 * Regla pura para decidir si un enlace está activo.
 * No depende de Astro ni del DOM: es fácil de probar y reutilizar.
 */
export function isActivePath(currentPath: string, href: string): boolean {
	if (href === '/') return currentPath === '/';
	return currentPath === href || currentPath.startsWith(`${href}/`);
}

# Pinterex — landing de pinturas

Landing informativa de **Pinterex**, marca de **Milcar**, hecha con
**Astro 7 + Tailwind 4**. Dos categorías: PINTEREX (tela) y PVA
(papel, cartón, madera). Sin precios.

## Principio de contenido

El usuario es una persona común. Por eso:

- **Una idea por sección** y frases cortas.
- **Solo 4 preguntas frecuentes** y 3 pasos de uso.
- Los detalles largos (modo de uso, consejos) van dentro de un `details`:
  están disponibles, pero no cansan a quien solo quiere mirar.
- Cada ficha de producto responde a tres preguntas: **qué es, cuándo usarlo, cómo usarlo**.

## Arranque

```sh
pnpm install
pnpm dev        # http://localhost:4321
pnpm check      # tipos: 0 errores
pnpm build      # genera ./dist
pnpm preview    # sirve ./dist
```

> En este entorno el servidor se inicia con `astro dev --background` y se gestiona
> con `astro dev stop`, `astro dev status` y `astro dev logs`.

## Estructura

```text
src/
├── config/site.ts        rutas, navbar, footer, anclas y SEO
├── types/content.ts      contratos mínimos del contenido
├── data/                 imágenes, productos, textos y videos
├── lib/                  selectores de catálogo, ruta activa y URLs de YouTube
├── components/
│   ├── ui/               Badge, ActionLink, Photo
│   ├── layout/           Navbar y Footer
│   └── sections/         una sección visual por archivo (incluye VideoCarousel)
├── scripts/              carrusel de portada y carrusel/modal de videos
├── layouts/Layout.astro  head + navbar + slot + footer
├── pages/                solo composición de secciones
└── styles/global.css     tokens de marca
```

Las páginas son **composition roots**: importan secciones y les pasan datos
por props. Las secciones no importan archivos de datos.

## SOLID aplicado

- **SRP:** un archivo, una razón de cambio. `HomeHero.astro` y `VideoCarousel.astro`
  tienen el markup; `hero-carousel.ts` y `video-carousel.ts` tienen el comportamiento
  (este último dividido en `CarouselScroller` y `VideoModal`).
- **OCP:** los estilos de badges y botones viven en mapas de variantes. Agregar una
  variante no obliga a tocar las secciones.
- **LSP:** todo producto cumple `BaseProduct`; las tarjetas trabajan con el mismo contrato.
- **ISP:** `PvaProduct` no arrastra campos de uso que no necesita.
- **DIP:** las secciones dependen de interfaces y reciben datos por props; las reglas
  de selección están en `lib/catalog.ts`.

## Dónde cambiar cada cosa

| Quiero... | Editar |
| --- | --- |
| Colores o tipografía | `src/styles/global.css` |
| Marca, empresa matriz, enlaces o SEO | `src/config/site.ts` |
| Velocidad del carrusel de portada | `src/config/site.ts` (`heroCarousel.intervalMs`) |
| Una imagen, o reutilizar la misma en varias partes | `src/data/images.ts` (objeto `media`) |
| Texto de los productos | `src/data/products.ts` |
| Pasos, categorías o FAQs | `src/data/content.ts` |
| Videos de Pinterex | `src/data/videos.ts` (el `id` de YouTube) |
| Orden de las secciones | `src/pages/*.astro` |

En `src/data/images.ts` cada clave de `media` es **una foto**, no una sección.
Si la misma imagen aparece en el hero y en una tarjeta, ambos usan la misma
clave. Para poner las fotos definitivas solo se reemplaza el valor de la clave
y el cambio se replica en todo el sitio.

Los IDs inválidos de YouTube se descartan con `getPlayableVideos()` y el modal
usa `youtube-nocookie.com`. Se cierra con el botón, clic fuera o `Escape`, y
devuelve el foco al video elegido.

## Paleta

Del logo `src/assets/logos/logomilcar.png`:

| Token | Valor |
| --- | --- |
| `--color-brand` | `#FF9B02` |
| `--color-brand-deep` | `#FD6B00` |
| `--color-brand-soft` | `#FFF1DC` |

Tipografía: **Nunito**.

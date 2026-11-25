# Pinterex — landing de pinturas

Landing informativa de **Pinterex**, una marca de **Milcar**, hecha con
**Astro 7 + Tailwind 4 + TypeScript**. Dos categorías: PINTEREX (tela) y PVA
(papel, cartón, madera). No muestra precios.

El sitio es 100 % estático, tiene dos páginas y no usa frameworks de UI ni
librerías de animación. Las reglas operativas para agentes/herramientas están
en [`AGENTS.md`](./AGENTS.md).

## Identidad de la pestaña

| Elemento | Valor / archivo |
| --- | --- |
| Título en inicio | `milcarpinturas` |
| Título en productos | `Productos \| milcarpinturas` |
| Configuración | `SITE.browserTitle` y `seo` en `src/config/site.ts` |
| Icono | `public/M.webp` + `public/favicon.ico` (generado desde esa imagen) |

La **M de `M.webp` es mayúscula**. Si se reemplaza esa imagen, hay que volver a
generar `favicon.ico` desde ella; si no, Chrome puede seguir mostrando el icono
anterior. `public/favicon.svg` quedó de la plantilla de Astro y **no está en uso**.

## Arranque

Requisitos: Node >= 22.23.4 y pnpm.

```sh
pnpm install
pnpm dev        # http://localhost:4321 (primer plano)
pnpm check      # tipos: 0 errores, 0 warnings, 0 hints
pnpm build      # genera ./dist
pnpm preview    # sirve ./dist
```

En este entorno el servidor se maneja en segundo plano:

```sh
pnpm astro dev --background   # arranca en http://localhost:4321
pnpm astro dev status         # estado y PID
pnpm astro dev logs           # requests recientes
pnpm astro dev stop           # detenerlo
```

Si querés manejarlo desde tu terminal, primero `pnpm astro dev stop` y después
`pnpm dev`. No corras ambos a la vez: chocan en el puerto 4321. Astro recarga
solo los cambios, así que no hace falta reiniciar.

## Páginas y secciones

| Ruta | Secciones (en orden) |
| --- | --- |
| `/` | Hero con carrusel → Videos → Categorías (`#categorias`) → Pasos |
| `/productos` | Hero → Barra de anclas → Productos (`#productos`) → Pasos (`#como-empezar`) → PVA (`#pva`) → Videos (`#videos`) → Preguntas (`#preguntas`) |

Las páginas son **composition roots**: eligen secciones y les pasan datos por
props. Las secciones de listado no importan datos por su cuenta. La excepción
son `HomeHero.astro` y `ProductHero.astro`, que son únicas y leen la
configuración y `media` directamente.

## Estructura

```text
src/
├── config/site.ts        rutas, navbar, footer, anclas, SEO y velocidad del hero
├── types/content.ts      contratos de contenido
├── data/
│   ├── images.ts         diccionario único de fotos (media) + heroSlides
│   ├── content.ts        categorías, pasos, intro PVA y FAQs
│   ├── products.ts       productos textiles y PVA
│   └── videos.ts         IDs de YouTube de los videos
├── lib/
│   ├── catalog.ts        selectores de productos
│   ├── navigation.ts     detección de ruta activa
│   └── youtube.ts        validación de IDs, miniaturas y URL embebida
├── components/
│   ├── ui/               Badge, ActionLink, Photo
│   ├── layout/           Navbar y Footer
│   └── sections/         HomeHero, VideoCarousel, CategoryCards, StepCards,
│                         ProductHero, CatalogNav, ProductGrid, ProductCard,
│                         PvaSection, Faq
├── scripts/
│   ├── hero-carousel.ts  rotación de la portada
│   └── video-carousel.ts scroll del carrusel + modal de video
├── layouts/Layout.astro  head, navbar, slot y footer
├── pages/                index.astro y productos.astro
└── styles/global.css     tokens de marca y animaciones CSS
public/                   M.webp, favicon.ico, favicon.svg (sin usar)
src/assets/logos/         logomilcar.png y logo-pinterex.webp
```

## Principio de contenido

El usuario es una persona común. Por eso:

- Una idea por sección y frases cortas.
- Solo 4 preguntas frecuentes y 3 pasos de uso.
- Los detalles largos (modo de uso, consejos) van dentro de un `<details>`:
  están disponibles, pero no cansan a quien solo quiere mirar.
- Cada ficha de producto responde a tres preguntas: **qué es, cuándo usarlo,
  cómo usarlo**.
- Sin precios.

## Dónde cambiar cada cosa

| Quiero... | Editar |
| --- | --- |
| Colores o tipografía | `src/styles/global.css` (`@theme`) |
| Marca, matriz, enlaces, footer o SEO | `src/config/site.ts` |
| Título que se ve en la pestaña | `src/config/site.ts` (`SITE.browserTitle`) |
| Icono de la pestaña | `public/M.webp` y regenerar `public/favicon.ico` |
| Velocidad del carrusel de portada | `src/config/site.ts` (`heroCarousel.intervalMs`) |
| Una imagen, o reutilizar la misma en varias partes | `src/data/images.ts` (objeto `media`) |
| Fotos del hero | `src/data/images.ts` (`heroSlides`) |
| Texto de los productos | `src/data/products.ts` |
| Pasos, categorías, intro PVA o FAQs | `src/data/content.ts` |
| Videos de Pinterex | `src/data/videos.ts` (el `id` de YouTube) |
| Reglas de selección del catálogo | `src/lib/catalog.ts` |
| Orden de las secciones | `src/pages/*.astro` |
| Apariencia de badges o botones | `src/components/ui/Badge.astro` y `ActionLink.astro` |

En `src/data/images.ts` cada clave de `media` es **una foto**, no una sección.
Si la misma imagen aparece en el hero y en una tarjeta, ambas usan la misma
clave. Para poner las fotos definitivas solo se reemplaza el valor de la clave
y el cambio se replica en todo el sitio. Las fotos locales nuevo van en
`public/` (`/nombre.ext`) o se importan desde `src/assets/` si se quiere URL
con hash, como los logos del navbar.

## Comportamientos importantes

### Carrusel de portada

- Rota automáticamente cada **3 s** (`heroCarousel.intervalMs` en `site.ts`,
  pasado al DOM como `data-hero-interval`).
- Tiene puntos clickeables y un contador `01 / 04`.
- No se pausa al pasar el mouse ni con `prefers-reduced-motion`: es una
  decisión de producto, no un bug.

### Carrusel de videos

- Los IDs inválidos se descartan con `getPlayableVideos()`; las miniaturas
  vienen de `img.youtube.com` y el reproductor usa `youtube-nocookie.com`.
- El modal se cierra con el botón **Cerrar**, con `Escape` o haciendo clic
  fuera, y devuelve el foco al botón que lo abrió. Mantiene el foco dentro
  mientras está abierto (focus trap).
- **Solo abre el video el botón «Ver video» con el icono de play**, centrado
  en la miniatura. La tarjeta, la imagen y el texto no hacen nada al clickear,
  para que deslizar el carrusel no reproduzca un video por accidente.
- Además, si se detecta un arrastre de más de 10 px sobre ese botón, el clic
  se ignora.

### Desplegables y transiciones

- Los `<details data-smooth>` (productos y FAQs) muestran un chevron: abajo al
  estar cerrados y arriba al estar abiertos.
- La animación de altura es solo CSS (`::details-content` + `interpolate-size`)
  y se aplica con `@supports`, con fallback al comportamiento nativo.
- Las transiciones entre `/` y `/productos` son View Transitions nativas,
  también solo CSS. No se usa `ClientRouter`.
- Todo el movimiento se respeta con `prefers-reduced-motion`, excepto el
  carrusel del hero, por decisión explícita.

### Navbar responsive

- Una sola fila en todos los anchos. En móvil (< 640 px) se ocultan el logo
  Pinterex y el separador para que no se superponga con los enlaces; desde
  `sm` se muestran ambos logos.
- **“Inicio” siempre está visible**, incluso en móvil. El logo también enlaza
  al inicio y tiene un `aria-label` explícito.
- El header mide 54 px en móvil y 70 px desde `sm`. Si cambiás su altura,
  actualizá el sticky de `src/components/sections/CatalogNav.astro`
  (`top-[54px] sm:top-[70px]`).

### Catálogo

- Un producto principal (`featured: true`) ocupa todo el ancho, con imagen y
  texto en dos columnas grandes.
- Los otros cuatro se muestran en una grilla 2×2 sin huecos.
- El encabezado usa `products.length`, así que el número nunca se desincroniza.

## Paleta y tipografía

Del logo `src/assets/logos/logomilcar.png`:

| Token | Valor |
| --- | --- |
| `--color-brand` | `#FF9B02` |
| `--color-brand-deep` | `#FD6B00` |
| `--color-brand-soft` | `#FFF1DC` |

Tipografía: **Nunito** (cargada desde Google Fonts en `Layout.astro`).
Los estilos de badges, botones y fotos están centralizados en `src/components/ui/`.

## Verificación rápida

Antes de dar un cambio por terminado:

```sh
pnpm run check && pnpm run build
```

Y en el navegador:

1. Título de la pestaña = `milcarpinturas`; favicon = la “M” (probá en
   incógnito si no se ve, los favicons se cachean aparte).
2. Hero rotando cada 3 s; clic en la tarjeta de video **no** abre nada;
   clic en «Ver video» **sí** abre; `Escape` cierra.
3. Chevrons de FAQs y de “Cómo se usa” girando al abrir/cerrar.
4. A 320, 375, 414, 640 y 1440 px: “Inicio” y “Productos” visibles, sin
   solapes ni scroll horizontal, y la barra del catálogo pegada bajo el header.

Si el favicon sigue siendo el de Astro, no es el servidor: abrí
`http://localhost:4321/M.webp` y `http://localhost:4321/favicon.ico`; si ambos
muestran tu imagen, cerrá Chrome por completo y volvelo a abrir.

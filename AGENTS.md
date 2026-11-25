# AGENTS.md — reglas para editar este proyecto

Landing estática de **Pinterex** (marca protagonista), una marca de **Milcar**.
Astro 7 + Tailwind 4 + TypeScript. Sin frameworks de UI y sin librerías de
animación. Todo el contenido visible y los comentarios de código van en español.

Leé `README.md` para el mapa general; este archivo contiene las **reglas de
trabajo** y las decisiones que no conviene revertir sin permiso.

## 1. Comandos y entorno

- Requisitos: **Node >= 22.23.4** y **pnpm** (hay `pnpm-lock.yaml`).
- Instalación: `pnpm install`.
- Servidor (modo preferido en este entorno):

  ```sh
  pnpm astro dev --background   # http://localhost:4321
  pnpm astro dev status
  pnpm astro dev logs
  pnpm astro dev stop
  ```

- Si el usuario quiere manejarlo desde su propia terminal: primero
  `pnpm astro dev stop` y recién después `pnpm dev`. No levantar un segundo
  servidor mientras el background siga activo (conflicto en el puerto 4321).
- Verificación obligatoria antes de dar por terminado cualquier cambio:

  ```sh
  pnpm run check   # debe dar 0 errores, 0 warnings, 0 hints
  pnpm run build   # genera dist/ estático
  ```

- `pnpm preview` sirve `dist/`. No hace falta reiniciar el dev server: Astro
  recarga los cambios solo. Si el navegador no refleja el cambio, es caché:
  Ctrl+F5 o ventana de incógnito.

## 2. Arquitectura

```text
src/
├── config/site.ts        SITE, rutas, navbar, footer, anclas, SEO, intervalo del hero
├── types/content.ts      contratos de contenido (únicos, sin campos de más)
├── data/                 imágenes (media), textos, productos, videos
├── lib/                  reglas puras: catálogo, ruta activa, URLs de YouTube
├── components/
│   ├── ui/               Badge, ActionLink, Photo (variantes centralizadas)
│   ├── layout/           Navbar, Footer
│   └── sections/         una sección visual por archivo
├── scripts/             hero-carousel.ts y video-carousel.ts (solo comportamiento)
├── layouts/Layout.astro  head + navbar + slot + footer
├── pages/                composition roots: solo eligen secciones y pasan props
└── styles/global.css     @theme (tokens), view transitions, animación de <details>
public/                   archivos servidos tal cual (favicon, M.webp)
```

- **Dependencia correcta:** página → sección (props) → tipos/UI. Las secciones
  que muestran listas **no importan datos**: los reciben por props desde
  `src/pages/*.astro`.
- **Excepción intencional:** `HomeHero.astro` y `ProductHero.astro` son
  singulares y leen directo `config/site.ts` y `data/images.ts`.
- `src/scripts/*.ts` contiene la lógica; los `<script>` de los componentes solo
  hacen el import. No mezclar markup con comportamiento.
- Los contratos están en `src/types/content.ts`. Si un producto necesita un
  campo nuevo, se agrega al tipo correspondiente y se documenta su uso.

## 3. Reglas de contenido

- Un único diccionario de imágenes: `media` en `src/data/images.ts`. Cada clave
  es **una foto**, no una sección. Si la misma foto aparece dos veces, se
  reutiliza la clave; nunca se pega la URL en un componente.
  - Foto local nueva: archivo en `public/` y ruta `/nombre.ext`, o import desde
    `src/assets/` si se quiere URL con hash (como los logos del navbar).
  - `heroSlides` reside en `images.ts` y referencia claves de `media`.
- Textos cortos (títulos, CTAs, etiquetas) pueden vivir en el componente.
- Textos largos o reutilizados van en `src/data/*.ts`.
- Copia: frases cortas, una idea por sección, sin precios. Detalles largos
  dentro de `<details data-smooth>`. 4 FAQs y 3 pasos, por decisión de producto.
- Cada ficha de producto responde a **qué es, cuándo usarlo, cómo usarlo**.
- Marca y enlaces globales siempre en `src/config/site.ts`, no hardcodeados.

## 4. Decisiones que no deben revertirse sin permiso

1. **Carrusel del hero:** rota cada `heroCarousel.intervalMs` (3000 ms, configurado
   en `site.ts` y pasado como `data-hero-interval`). **No** se pausa al pasar el
   mouse ni con `prefers-reduced-motion`: es decisión de producto, no un bug.
2. **Transiciones:** nativas y solo CSS (`@view-transition { navigation: auto; }`
   en `global.css`, dentro de `prefers-reduced-motion: no-preference`). No agregar
   `ClientRouter` ni dependencias de animación. Solo `site-header` tiene
   `view-transition-name` para que las fotos no hagan morphing.
3. **Desplegables:** `<details data-smooth>` con chevron `group-open:rotate-180`.
   Tailwind 4 usa la propiedad CSS `rotate`, no `transform`: al verificar con CDP,
   mirá `getComputedStyle(svg).rotate` (`none` → `180deg`).
4. **Navbar:** una sola fila siempre. Por debajo de `sm` se ocultan el logo
   Pinterex y el separador para que no se pise con los links; **“Inicio” queda
   visible en móvil** (y el logo también enlaza al inicio con su `aria-label`).
   El header mide **54 px en móvil** y **70 px desde `sm`**. Si cambiás esa
   altura, actualizá el sticky de `CatalogNav.astro`:
   `top-[54px] sm:top-[70px]`.
5. **Catálogo:** un producto `featured` a todo el ancho y los otros cuatro en
   2×2. El número del título se calcula con `products.length`, no se escribe a mano.
6. **Favicon:** `public/M.webp` (la **M mayúscula importa**) más un
   `public/favicon.ico` generado desde esa misma imagen en 16×16 y 32×32.
   `public/favicon.svg` quedó de la plantilla de Astro y **no está enlazado**:
   no volver a agregarlo a `Layout.astro`. Si reemplazás `M.webp`, regenerá
   el `.ico` o Chrome puede seguir mostrando el icono viejo.
7. **Título de pestaña:** `SITE.browserTitle = 'milcarpinturas'`. La ruta
   `/productos` usa `Productos | milcarpinturas`. Nunca debe aparecer “Astro”.
8. **Videos:** el **único** disparador del modal es el botón «Ver video» con
   icono de play, centrado en la miniatura. La tarjeta (`<article>`), la imagen
   y el texto no abren nada. `bindPlayButton()` ignora clics después de un
   arrastre mayor a 10 px para no reproducir al deslizar el carrusel. El modal
   mantiene focus trap, cierra con Escape/clic fuera y devuelve el foco.

## 5. Checklist antes de reportar un cambio terminado

- [ ] `pnpm run check` → 0/0/0 y `pnpm run build` → correcto.
- [ ] Título y favicon correctos (probar en incógnito por la caché de favicons).
- [ ] Hero rotando cada 3 s sin pausarse por hover.
- [ ] Videos: clic en la tarjeta **no** abre; clic en «Ver video» **sí** abre;
      arrastrar sobre el botón **no** abre; Escape cierra y devuelve el foco.
- [ ] FAQs y “Cómo se usa”: chevron abajo al cerrar, arriba al abrir.
- [ ] 320/375/414/640/1440 px: “Inicio” y “Productos” visibles, sin solapes
      ni scroll horizontal; sticky del catálogo pegado justo bajo el header.
- [ ] Sin URLs de imágenes repetidas fuera de `media` y sin `ClientRouter`.

## 6. Referencias

- Astro: https://docs.astro.build
- Routing: https://docs.astro.build/en/guides/routing/
- Componentes: https://docs.astro.build/en/basics/astro-components/
- Estilos / Tailwind: https://docs.astro.build/en/guides/styling/
- View Transitions: https://docs.astro.build/en/guides/view-transitions/

# Prompt: Implementación completa de SEO y visibilidad web para Lechonería Chancho el Lechón

## Contexto del proyecto

Soy el desarrollador de **Lechonería Chancho el Lechón**, una lechonería colombiana ubicada en Cali (Diagonal 15 #71A-58, barrio 7 de Agosto). El sitio web está construido con **Astro 7 + React + Tailwind CSS v4**, desplegado en **Vercel**. Es un sitio estático de una sola página (`/`) cuyo objetivo principal es **conseguir pedidos por WhatsApp y aumentar la visibilidad local en Google**.

La URL del sitio es: `[INSERTAR URL DE VERCEL]`
El número de WhatsApp de contacto es: `+573128839301`

---

## Lo que necesito implementar

Quiero que el sitio esté **completamente optimizado** para visibilidad en motores de búsqueda y redes sociales. Implementa **todo** lo siguiente sin omitir ningún punto:

---

### 1. Meta tags esenciales (SEO on-page)

En el `<head>` de `src/layouts/Layout.astro`:

- `<title>` único y descriptivo (~60 caracteres), con keyword principal
- `<meta name="description">` (~155 caracteres), persuasivo, con palabras clave locales
- `<meta name="keywords">` con keywords relevantes para lechonería en Cali
- `<meta name="author">` con el nombre del negocio
- `<meta name="robots" content="index, follow">`
- `<meta name="theme-color">` con el color de marca
- `<link rel="canonical">` apuntando a la URL base del sitio
- `<meta charset="UTF-8">` y `<meta name="viewport">`

**Keywords clave a incluir en el contenido y meta tags:**
lechonería Cali, lechona tolimense Cali, lechona para eventos Cali, domicilios lechona Cali, lechona 7 de agosto, lechona tradicional, Chancho el Lechón, lechona por raciones Cali

---

### 2. Open Graph — para Facebook, WhatsApp al compartir y LinkedIn

```html
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="[URL absoluta de imagen 1200×630px]" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="..." />
<meta property="og:url" content="[URL del sitio]" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Lechonería Chancho el Lechón" />
<meta property="og:locale" content="es_CO" />
```

La imagen Open Graph (`og:image`) debe ser una imagen real del negocio, accesible públicamente vía HTTPS, preferiblemente en `/public/og-image.jpg`. Indícame las dimensiones exactas y cómo nombrarla.

---

### 3. Twitter / X Cards

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="[URL absoluta]" />
<meta name="twitter:image:alt" content="..." />
```

---

### 4. Datos estructurados — Schema.org JSON-LD (obligatorio para negocios locales)

Implementa los siguientes schemas como bloques `<script type="application/ld+json">` en el `<head>`:

#### 4a. `LocalBusiness` + `FoodEstablishment`
```json
{
  "@context": "https://schema.org",
  "@type": ["FoodEstablishment", "LocalBusiness"],
  "name": "Lechonería Chancho el Lechón",
  "description": "...",
  "url": "[URL]",
  "telephone": "+573128839301",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Diagonal 15 #71A-58",
    "addressLocality": "Santiago de Cali",
    "addressRegion": "Valle del Cauca",
    "addressCountry": "CO"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 3.445028,
    "longitude": -76.488641
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday", "Sunday"],
      "opens": "09:00",
      "closes": "20:00"
    }
  ],
  "servesCuisine": "Colombian",
  "priceRange": "$$",
  "image": "[URL og-image]",
  "sameAs": [
    "[URL Instagram]",
    "[URL Facebook]",
    "[URL TikTok]"
  ]
}
```

#### 4b. `BreadcrumbList` (para navegación en Google)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [...]
}
```

#### 4c. `WebSite` con SearchAction
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Lechonería Chancho el Lechón",
  "url": "[URL]"
}
```

---

### 5. Sitemap XML automático

Instala y configura `@astrojs/sitemap` en `astro.config.mjs`:
- Incluir la URL base del sitio
- El sitemap debe generarse en `sitemap-index.xml`
- Agregar `<link rel="sitemap" href="/sitemap-index.xml">` en el `<head>`

---

### 6. `robots.txt`

Crea `/public/robots.txt` con:
```
User-agent: *
Allow: /
Sitemap: [URL]/sitemap-index.xml
```

---

### 7. Favicons y app icons (visibilidad en tabs y móviles)

- `favicon.ico` (32×32) en `/public/`
- `favicon.svg` para navegadores modernos
- `apple-touch-icon.png` (180×180) para iOS
- `<meta name="theme-color">` con el color de marca

Genera un `<head>` con todas las etiquetas necesarias para el soporte completo de íconos.

---

### 8. Web App Manifest (PWA básico)

Crea `/public/manifest.webmanifest`:
```json
{
  "name": "Lechonería Chancho el Lechón",
  "short_name": "Chancho el Lechón",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#3b1a0a",
  "theme_color": "#c9922a",
  "icons": [...]
}
```
Y el `<link rel="manifest">` en el `<head>`.

---

### 9. Preconnect y preload de recursos críticos

En el `<head>`, agrega hints de rendimiento:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="dns-prefetch" href="https://wa.me" />
<link rel="preload" as="image" href="/media/logo.webp" />
```

---

### 10. Verificación de Google Search Console

Agrega el meta tag de verificación de Google (se lo pido a Google Search Console y te doy el código):
```html
<meta name="google-site-verification" content="[CÓDIGO]" />
```

---

## Consideraciones adicionales

- Todo el código debe ser compatible con **Astro 7** y respetar la arquitectura actual del proyecto.
- El Layout actual está en `src/layouts/Layout.astro` — todos los meta tags van ahí.
- Las imágenes referenciadas por URL absoluta deben estar en `/public/` y ser accesibles en producción.
- Los schemas JSON-LD deben ser válidos (verificables en https://search.google.com/test/rich-results).
- El `og:image` debe estar en formato `.jpg` o `.png`, mínimo `1200×630px`, máximo `8MB`.
- Para WhatsApp, el `og:image` funciona solo si la URL es HTTPS y la imagen es accesible públicamente.

---

## Entregables esperados

1. `src/layouts/Layout.astro` actualizado con todos los meta tags y schemas
2. `/public/robots.txt`
3. `/public/manifest.webmanifest`
4. `astro.config.mjs` con `@astrojs/sitemap` configurado
5. Lista de los favicons necesarios y sus dimensiones exactas para que yo los genere
6. Guía de 5 pasos para verificar en Google Search Console una vez desplegado

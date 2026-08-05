# Mitchell Argamasilla

Personal operating profile built with Astro.

## Local development

```bash
npm install
npm run dev
```

## Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `22`

The standard build keeps Astro's static files at the root of `dist`, including
`dist/index.html`, so Cloudflare Pages can serve the homepage.

## OpenAI Sites

Run `npm run build:sites` when preparing the alternate Sites-specific bundle.

## Content

Portfolio data lives under `content/`. Run `npm run portfolio:refresh` to scan
for project metadata and refresh the generated project catalog.

# OP Property Management — Website

Static bilingual (English · Arabic) company website, built for search engines (SEO) and AI answer engines (GEO), targeting the Middle East (GCC) and the USA.

## Pages
| URL | Page |
|---|---|
| `/` | Home — English |
| `/ar/` | Home — Arabic (right-to-left) |
| `/contact.html` | Contact us — English |
| `/ar/contact.html` | Contact us — Arabic |

## Editing
All text and company details live in `build.js`. After editing, regenerate the pages:

```
node build.js
```

This writes `index.html`, `contact.html`, `ar/index.html`, `ar/contact.html`, `sitemap.xml`, `robots.txt` and `llms.txt`. Styling is in `styles.css`; the mobile menu and WhatsApp form are in `script.js`.

## SEO & GEO built in
- Separate, indexable URL per language with `hreflang` (en / ar / x-default) and canonical tags
- Unique titles and meta descriptions targeting the services and countries served
- Schema.org structured data: Organization (with `areaServed` for SA, AE, KW, QA, BH, OM, US), Service, FAQPage, ContactPage, BreadcrumbList
- FAQ section with direct answers, which AI assistants and Google can quote
- `sitemap.xml` with language alternates, `robots.txt` allowing search and AI crawlers, `llms.txt` summary for AI assistants
- Open Graph / Twitter share image (`og-image.png`), favicon, semantic and accessible HTML, mobile-friendly layout

## Before going live
1. In `build.js`, set `site.url` to the real domain and set the real phone, WhatsApp and email, then run `node build.js`.
2. Submit `sitemap.xml` in Google Search Console and Bing Webmaster Tools.
3. Create a Google Business Profile for the Saudi location to appear in local Saudi searches.

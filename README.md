# OP Property Management — Website

Static, trilingual (English · Arabic · Urdu) company website. No build step: open `index.html` in a browser or host the folder on any static host (e.g. GitHub Pages).

## Services
1. Short-term rental property management — Booking.com, Airbnb, Agoda, Gathern
2. HubSpot implementation A to Z
3. Trademark registration in Saudi Arabia (SAIP)
4. Online store setup — Noon, Amazon, Trendyol

## Files
- `index.html` — page structure; translatable text is marked with `data-i18n`
- `styles.css` — styling, including right-to-left layout for Arabic and Urdu
- `script.js` — translations, language switcher, WhatsApp contact form

## Languages
Switch with the EN / عربي / اردو buttons, or link directly with `?lang=en`, `?lang=ar`, `?lang=ur`.
The choice is remembered; otherwise the visitor's browser language is used.

## To do before going live
Replace the placeholder WhatsApp number and email in `index.html` and `WHATSAPP_NUMBER` in `script.js`.

# Kalyan & Sravanthi — Wedding Invitation

A mobile-first bilingual wedding invitation built with Next.js, React and TypeScript.

## Included

- English / Telugu language entrance
- Srinivasa Kalyanam ceremonial hero
- Invitation and family details
- Countdown-ready section
- Engagement, Haldi, Wedding and Reception cards
- Story and gallery placeholders
- Responsive RSVP preview
- Music control placeholder
- Mobile, tablet and desktop layouts

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
```

The project uses Next.js static export, so the generated `out` folder can be hosted on Vercel, Netlify, Cloudflare Pages or any static host.

## Before launch

1. Replace event placeholders with confirmed dates, times and venues.
2. Add Google Maps and calendar links.
3. Replace gallery placeholders with optimized WebP/AVIF photos.
4. Add a licensed audio file and connect it to the music button.
5. Connect RSVP to Supabase or another secure backend. The current form is a front-end preview and does not persist guest information.
6. Protect the private RSVP dashboard using server-side authentication.

## Main files

- `app/page.tsx` — page content, language copy and interactions
- `app/globals.css` — complete responsive styling
- `public/srinivasa-kalyanam-banner.png` — generated ceremonial background
- `next.config.ts` — static export configuration

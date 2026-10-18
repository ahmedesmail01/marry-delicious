# Marry Delicious

Arabic-first bilingual homemade-food storefront built with Next.js App Router, TypeScript, Tailwind CSS 4 and GSAP.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000. The scripts use Next.js’s Webpack mode for compatibility with restricted development environments. For production: `npm run build` then `npm start`.

## Features

- Arabic / English menus transcribed from the supplied menu images.
- Category filters, quantity controls and a locally persisted basket.
- Itemized WhatsApp order requests to **+20 10 00669623**. Orders require manual confirmation; no payment is collected.
- Original branding and food illustrations extracted from the supplied images.
- Web app manifest, branded icons and service worker with network-first caching and offline fallback after the first visit.
- GSAP entrance animation respects reduced motion.

Prices are reproduced without assuming a serving size. Confirm portions, current prices and delivery on WhatsApp. The unlabeled “as per daily price” menu line is presented as a general daily-price enquiry rather than an invented product.

## PWA

Serve over HTTPS (or localhost). Visit once online to cache the app. Chromium browsers offer installation when eligible; iOS users can use Share → Add to Home Screen. The install button appears when the browser provides its install prompt. Service worker changes require bumping the cache version in `public/sw.js`.

Deploy using any Next.js-compatible Node hosting service. No API keys or environment variables are needed. Menu data lives in `app/menu.ts`; WhatsApp ordering and UI live in `app/page.tsx`.

## Visual experience

The main interface uses locally hosted Cairo variable type for Arabic and English, with connected Arabic spacing and tabular prices. The text wordmark uses the locally hosted Playball script font. Food galleries use locally downloaded Pexels images; source links and licensing are documented in `ASSETS.md`.

- Hero photo slider: buttons, direct slide selectors and touch swipes; GSAP crossfades and image zoom.
- Meal category carousel: native swipe/keyboard scroll and GSAP-animated arrow navigation, linking to filtered menu categories.
- GSAP ScrollTrigger: section reveals, staggered steps, menu category reveals, image parallax and reading progress.
- Basket entrance and item-count feedback animations.
- Motion effects respect the reduced-motion preference; hero slides change only on user input.

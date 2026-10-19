# Kihara Jimmy Chege — Portfolio

A deep-blue, white, beige, and black portfolio for Kihara Jimmy Chege, built with React, Vite, and Tailwind CSS. The page prioritizes selected work, practical capabilities, background, and contact.

## Features

- Compact navigation, a prominent typed name introduction, and a lightweight animated background with a pause control
- Lazy-loaded interactive Three.js security core with orbiting nodes, pointer response, and pause/play control; rendering pauses offscreen and in hidden tabs
- Nine project case studies with category filters and keyboard-accessible dialogs; Transwest is the single SACCO management entry
- Optimized project artwork with original PNG fallbacks, plus lightweight SVG concepts for the newer projects
- EPRA Hackathon third place and Best Use of Data recognition for FairGrid, plus the Zetech geospatial datathon
- Cisco CCNA, Huawei HCIA, and ICS College ethical hacking/cybersecurity studies
- Self-assessed language/framework proficiency bars within the owner’s 80–94% range
- Native View Transitions for project filters with a direct-update fallback; case studies expand from their selected cards
- Artwork / interface concept flippers, rolling counters, magnetic buttons, pointer-driven card tilt, reversible scroll reveals, and subtle hero parallax
- Beige 3D security core with white/beige orbital rings and particles that morph between sphere and orbit shapes
- Indeterminate contact-button progress, confirmed-send checkmark, and lightweight SVG celebration; reduced motion disables decorative animation
- Skills grouped by capability, with expandable technology details
- Responsive navigation, active section indicators, and reduced-motion support
- Contact form with an honest email-app fallback and optional POST endpoint
- Printable résumé at `/cv.html`, including Print / Save as PDF
- Matching favicon, social preview, and canonical metadata

## Tech Stack

- React 19 + JSX
- Vite 8
- Tailwind CSS 4
- Radix UI dialogs
- React Three Fiber + Three.js
- Framer Motion (motion preferences)
- Lucide React (with custom brand icons)

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

Run the interaction and responsive browser checks while the dev server is running:

```bash
npm run check:browser
npm run check:responsive-seo
```

The checks use the installed Playwright Chromium browser and the Vite dev server at `http://localhost:5173`. The development server uses this fixed address and reports an error if the port is already occupied. Set `PORTFOLIO_BASE_URL` if using a different dev port. They cover filters, dialogs, focus restoration, navigation, email fallback, mocked endpoint responses, clipboard, six viewport widths, and résumé printing. Screenshots and a résumé PDF are written to the ignored `artifacts/portfolio/` directory. Endpoint tests intercept requests locally and send no messages.

The responsive/SEO check covers 20 sizes from 280 to 3840 pixels wide, phone landscape, touch navigation, structured data, and crawl files. Point `PORTFOLIO_BASE_URL` at `npm run preview` to additionally verify the built site with JavaScript disabled.

## Search and sharing

`npm run build` generates static HTML for the full portfolio through `scripts/prerender.mjs`, using the same React components as the interactive site. The production page exposes profile, project, award, skill, and education content without waiting for JavaScript; browser startup mounts the interactive app. `dist/` contains the complete deployable site, including the sitemap and robots file. The local Vite development page remains client rendered.

The home page includes a descriptive title, canonical URL, Open Graph/Twitter sharing metadata, and JSON-LD for WebSite, ProfilePage, and Person. The résumé has its own canonical URL and sharing metadata. `public/robots.txt` allows crawling and points to `public/sitemap.xml`; the sitemap includes the home page and résumé. These use the existing configured domain, `https://jimmysite.me`. Update that domain consistently in `index.html`, `src/data/config.js`, `public/cv.html`, `public/robots.txt`, and `public/sitemap.xml` if the production address changes. After deployment, submit the sitemap in the domain's Google Search Console and inspect the live URL. Local checks do not verify search indexing or guarantee rankings.

## Configuration

Contact form endpoint can be configured via environment variable:

```env
VITE_CONTACT_ENDPOINT=https://your-endpoint.example.com/contact
```

Without an endpoint, the form opens an email draft and preserves the entered text. With an endpoint, it sends JSON containing `name`, `email`, `subject`, and `message`, and reports success only after an HTTP success response. Configure the endpoint to accept the deployed site's origin.

Personal details live in `src/data/config.js`, project details in `src/data/projects.js`, and toolkit entries in `src/data/technologies.js`. Project preview metadata lives in `src/sections/Projects.jsx`. Every project has a GitHub icon on its card and a repository link in its case study. FairGrid, HashX, Transwest, and Mastered Seed currently use owner-approved, name-based placeholder URLs on `chege-5`; replace their `github` fields and remove `githubPlaceholder` when the final URLs are available. Replace the concept previews with actual screenshots when available.

The résumé is a standalone document in `public/cv.html`; keep it in sync when updating profile details. `public/social-card.svg` is the editable source for `public/og-image.png`. Current project photographs live in `public/images/projects/`, with photographer credits and source/license links in `CREDITS.md` and `credits.json`. Their display metadata is in `src/data/projectImages.js`; `node scripts/fetch-project-images.mjs` can restore the photos. The photos illustrate each project's subject and are not application screenshots. Older generated artwork and provenance remain in `public/images/ARTWORK.md`. Visual effects live in `src/visuals.css`, `src/journey.css`, and `src/components/VisualEffects.jsx`. Projects follow a zigzag path; education follows a straight timeline, with both adapting to a single column on narrow screens. The animated scene respects reduced-motion preferences. Original experimental sections remain in `src/` for future reuse.

## License

© 2026 Kihara Jimmy Chege

## Portrait

`src/assets/me.png` supplies the profile portrait, with an optimized `me.webp` for display. It appears in the header, enlarged About portrait, rotating 3D medallion, and browser icon. Portraits, event photos, and the certificate retain their original colors. The portrait is also the hero fallback if WebGL is unavailable. `epra.png` / `epra.webp` appear on the enlarged EPRA achievement card. `certificate.jpeg` appears on the GeoML card and in its certificate viewer. Event photos and certificates are excluded from automatic portrait selection. The original assets are preserved.

Project descriptions are in `src/data/projects.js`; achievements, training, and proficiency values are in `src/data/highlights.js`. SentinelX is explicitly in development. The public summAI repository currently describes an interface prototype. Course attendance is distinguished from certification exams; the supplied GeoML certificate confirms the 12-hour sprint and the 11 July 2026 date.

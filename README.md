# GeoTreks Kenya — Company Website PWA

A complete, production-ready company website for GeoTreks Kenya — a geospatial, survey and remote sensing company. Built as a Progressive Web App (PWA) with a full admin panel.

---

## Quick Start

```bash
npm install
npm run dev
# Open http://localhost:5173
```

**Build for production:**
```bash
npm run build
npm run preview  # preview the production build
```

---

## Site Structure

### Public Pages
| Route | Page |
|-------|------|
| `/` | Home — hero, services, projects, testimonials |
| `/about` | About Us — story, mission, team, values |
| `/services` | Services — 6 detailed service sections |
| `/projects` | Projects — filterable portfolio |
| `/blog` | Blog / Insights — all articles |
| `/blog/:slug` | Individual blog post |
| `/contact` | Contact — form, map, FAQ |

### Admin Panel (`/admin`)
| Route | Section |
|-------|---------|
| `/admin` | Dashboard — metrics, enquiries, activity |
| `/admin/blog` | Blog manager — create, edit, delete posts |
| `/admin/pages` | Pages overview + company info editor |
| `/admin/settings` | Site settings — SEO, features, social |
| `/admin/logs` | Activity logs — form submissions, events |

**Default admin PIN: `1234`** (change in Settings)

---

## PWA Features

- Installable on Android (Add to Home Screen via Chrome)
- Offline support for cached pages via Workbox service worker
- App manifest with proper icons
- Full-page offline fallback

---

## SEO Features

- Semantic HTML5 structure on all pages
- Full `<meta>` tags (description, keywords, author)
- Open Graph tags for social sharing
- Twitter Card meta tags
- JSON-LD structured data (Organization + LocalBusiness)
- Canonical URLs
- Google Fonts preconnect

---

## Customisation

### Update company information
Edit `src/data/content.js` — this single file controls all text, team members, services, projects, blog posts, and contact details.

### Add a new blog post
Either:
1. Go to `/admin/blog` → click "New post" → fill in the form
2. Or add a post object directly to `BLOG_POSTS` in `src/data/content.js`

### Change colours
All brand colours are defined as CSS variables in `src/styles/global.css`:
```css
--green-700: #0a5c47;  /* Primary brand green */
--green-500: #1fa068;  /* Accent green */
```

### Add a new service or project
Add entries to the `SERVICES` or `PROJECTS` arrays in `src/data/content.js`. All pages update automatically.

---

## Deployment

### Vercel (recommended — free)
```bash
npm run build
# Push to GitHub, connect repo to Vercel, deploy
# Add no environment variables needed — this is a pure frontend app
```

### Netlify
```bash
npm run build
# Drag /dist folder to Netlify drop zone
# Or connect GitHub repo
```

### Custom hosting
Upload the contents of the `/dist` folder to any static host. Add a redirect rule so all routes serve `index.html` (for React Router to work).

**Nginx config:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| Routing | React Router v6 |
| Maps | Leaflet (contact page) |
| PWA | vite-plugin-pwa + Workbox |
| Icons | Lucide React |
| Fonts | Sora + Inter + JetBrains Mono |
| Dates | date-fns |
| CSS | Plain CSS with custom properties |

**No backend required.** All data is in `src/data/content.js`. Form submissions are stored in localStorage for the admin panel to read.

---

## Connecting a Real Backend (Optional)

To persist contact form submissions and newsletter signups to a database:

1. Create a free [Supabase](https://supabase.com) project
2. Create a `submissions` table
3. In `ContactPage.jsx`, replace the `localStorage.setItem` call with:
```js
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(YOUR_URL, YOUR_KEY)
await supabase.from('submissions').insert(form)
```

---

## License
MIT — free to use, modify, and deploy commercially.

GeoTreks Kenya · geotreks.co.ke

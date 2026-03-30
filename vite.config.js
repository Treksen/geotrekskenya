import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
includeAssets: ['favicon.svg', 'icons/*.png', 'images/*.jpg', 'images/logo.png'],
manifest: {
  name: 'GeoTreks Kenya',
  short_name: 'GeoTreks',
  description: 'Geospatial, Survey & Remote Sensing Company in Kenya',
  theme_color: '#0a5c47',
  background_color: '#ffffff',
  display: 'standalone',
  orientation: 'any',
  scope: '/',
  start_url: '/',
  icons: [
    {
      src: 'icons/icon-192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any'
    },
    {
      src: 'icons/icon-512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any'
    },
    {
      src: 'icons/icon-512.png',  // maskable uses same file
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable'        // ← split from 'any maskable' — that combo is deprecated
    }
  ],
  categories: ['business', 'productivity'],
  screenshots: []
},
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'google-fonts-cache', expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 } }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'gstatic-fonts-cache', expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 } }
          },
          {
            urlPattern: /^https:\/\/unpkg\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'cdn-cache', expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 7 } }
          }
        ]
      }
    })
  ]
})

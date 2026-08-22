import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

/*
  Web app manifest. Next serves this at /manifest.webmanifest and adds <link rel="manifest"> to every
  page. Besides the install/PWA basics, it gives Google a clean, correctly sized icon source (192 is a
  multiple of 48, which Google's favicon guidance recommends) in addition to the /favicon.ico and the
  512 PNG already in the <head>. `display: browser` because this is a website, not an installable app.
*/
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AuraScribe',
    short_name: 'AuraScribe',
    description: site.metaDescription,
    start_url: '/',
    display: 'browser',
    background_color: '#121110',
    theme_color: '#121110',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}

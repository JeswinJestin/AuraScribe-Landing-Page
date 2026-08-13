/** @type {import('next').NextConfig} */

/*
  Security headers. This is a static marketing site with no auth, no database, and no user
  accounts, so the surface is small, but these headers close the obvious gaps (clickjacking,
  MIME sniffing, referrer leakage, feature abuse) and ship a Content-Security-Policy.

  CSP notes:
  - `script-src`/`style-src` allow 'unsafe-inline' because Next.js App Router injects inline
    hydration scripts and the JSON-LD block, and the design uses inline style attributes. There is
    NO user-generated HTML rendered anywhere, so the XSS surface that 'unsafe-inline' would matter
    for does not exist here.
  - `connect-src` allows docs.google.com so the contact form can POST to a Google Form when one is
    configured (site.contactForm.formAction). Remove it if that integration is dropped.
  - Everything else is same-origin. next/font self-hosts the fonts at build time, so no external
    font host is needed.
*/
// Next.js DEV mode compiles with eval-based source maps and HMR, which require 'unsafe-eval'.
// Production bundles never eval, so the deployed CSP stays strict (no 'unsafe-eval').
const isDev = process.env.NODE_ENV !== 'production'
const scriptSrc = isDev ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'" : "script-src 'self' 'unsafe-inline'"

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  scriptSrc,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://docs.google.com",
  "form-action 'self' https://docs.google.com",
  "frame-ancestors 'none'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
]

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // don't advertise the framework (checklist: minimise version info)
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default nextConfig

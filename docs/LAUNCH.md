# Launch guide — aurascribe.dev

Everything needed to take the landing page from "pushed to GitHub" to "live on aurascribe.dev".
Do these in order. Nothing here needs code changes except the Google Form step.

## 1. Deploy to Vercel

1. Go to https://vercel.com/new and import the GitHub repo `JeswinJestin/AuraScribe-Landing-Page`.
2. Vercel auto-detects **Next.js** — leave the build settings at their defaults (build `next build`,
   output handled automatically). No environment variables are required for a first deploy.
3. Click **Deploy**. You get a working `*.vercel.app` URL in about a minute.

## 2. Point the domain (name.com → Vercel)

1. In the Vercel project: **Settings → Domains → Add** `aurascribe.dev`. Add `www.aurascribe.dev`
   too and let Vercel set it to redirect to the apex.
2. Vercel then shows the exact DNS records to create. **Use the values Vercel shows** (they can
   change over time); as a guide it is usually:
   - Apex `aurascribe.dev` → an **A record** to Vercel's IP.
   - `www` → a **CNAME** to `cname.vercel-dns.com`.
3. In **name.com → your domain → DNS records**, add exactly those records. Delete any parked/forwarding
   records name.com added by default.
4. Wait for propagation (minutes to a couple of hours). Vercel auto-provisions the HTTPS certificate.
   `.dev` is HTTPS-only (HSTS preloaded), which is fine — Vercel serves HTTPS automatically.
5. No `NEXT_PUBLIC_SITE_URL` needed: the code already defaults canonicals/sitemap/OG to
   `https://aurascribe.dev`. Only set that env var in Vercel if the domain ever changes.

## 3. Contact form — Google Form integration

The form (`components/contact.tsx`) already works as a **mailto** fallback today. To collect
submissions in a Google Sheet instead, wire a Google Form:

1. Create a form at https://forms.google.com (title e.g. "AuraScribe Contact"). Add three questions:
   - **Name** — Short answer
   - **Email** — Short answer
   - **Message** — Paragraph
2. Get the field IDs and the submit URL:
   - Top-right **⋮ menu → Get pre-filled link**.
   - Type recognisable dummy values: Name = `NAMEHERE`, Email = `EMAILHERE`, Message = `MSGHERE`.
   - Click **Get link → Copy link**. It looks like:
     `https://docs.google.com/forms/d/e/FORM_ID/viewform?usp=pp_url&entry.111=NAMEHERE&entry.222=EMAILHERE&entry.333=MSGHERE`
   - Each `entry.NNN` right before your dummy value is that field's ID.
   - The **submit URL** is the same but ends in `/formResponse` (not `/viewform`):
     `https://docs.google.com/forms/d/e/FORM_ID/formResponse`
3. Put them into `lib/site.ts` → `contactForm`:
   ```ts
   contactForm: {
     formAction: 'https://docs.google.com/forms/d/e/FORM_ID/formResponse',
     fields: { name: 'entry.111', email: 'entry.222', message: 'entry.333' },
   },
   ```
   (Or send me the three `entry.` IDs + the FORM_ID and I will wire it.)
4. In the Form's **Responses** tab, click the green Sheets icon to pipe responses into a Google Sheet,
   and optionally **⋮ → Get email notifications for new responses**.
5. Commit + push; Vercel redeploys. The site's Content-Security-Policy already allows
   `https://docs.google.com` for the form POST, so nothing else is needed.
6. **Test:** submit once from the live site and confirm the row appears in the Form responses.
   Note: Google Forms does not return a readable response (the request is `no-cors`), so the site
   optimistically shows "sent" — that is expected and correct for this integration.

## 4. Search engines

1. **Google Search Console** (https://search.google.com/search-console): add a property for
   `aurascribe.dev`. Easiest verification is the **DNS TXT** method (add the TXT record at name.com).
   Then **Sitemaps → submit** `https://aurascribe.dev/sitemap.xml`.
2. **Bing Webmaster Tools** (https://www.bing.com/webmasters): add the site (you can import from
   Search Console) and submit the same sitemap.
3. Give it days to weeks to index. Searching your name should, over time, surface the site via the
   `Person` structured data already in place.

## 5. Final checks (after DNS is live)

- [ ] `https://aurascribe.dev` loads; `http://` and `www.` redirect to it.
- [ ] All routes 200: `/`, `/about`, `/blog`, a blog post, `/privacy`, `/terms`; unknown route 404s.
- [ ] Language wheel auto-cycles and the card follows; clicking a language works.
- [ ] Mobile: no horizontal scroll; nav + Download work; contact form submits.
- [ ] `robots.txt` and `sitemap.xml` load and show `aurascribe.dev`.
- [ ] Run Lighthouse (Chrome DevTools) on the live URL; address anything red.
- [ ] (Recommended, not blocking) add a real product screenshot to `public/` and place it in the
      hero or a Features cell.

## 6. Optional / later

- Replace the icon set if you make new artwork: `app/icon.png`, `app/apple-icon.png`,
  `public/icon.png`, and `app/opengraph-image.tsx` share the identity. See `docs/APP-CONTEXT.md` for
  the brief to feed an image generator.
- Enable Dependabot on the repo (Settings → Code security) for dependency alerts.
- The Next 15/16 upgrade for the two low-risk `npm audit` items remains its own scoped task.

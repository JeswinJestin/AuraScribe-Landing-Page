# AuraScribe site — post-deploy SEO & indexing checklist

**Written:** 2026-08-14 · Applies to the LIVE site at **https://www.aurascribe.dev** (apex
`aurascribe.dev` 308-redirects to `www` — the `www` host is canonical).

This is the mandatory sequence after a Vercel deploy. Do the steps **in order**. Most of "why isn't it
ranking / no favicon" is **time + a few one-time account actions**, not code — the site is already
indexed (it shows as the first organic result for "AuraScribe").

---

## 0. Ship the code fixes first (they must be live for the rest to matter)

Two fixes were just made in the repo:
- **`app/favicon.ico`** — a real multi-size (16/32/48) root favicon. Before this, `/favicon.ico`
  returned **404**, which is the main reason Google showed a blank globe instead of your icon.
- **Brand `alternateName` schema** — tells Google that "Aura Scribe", "aurascribe", etc. are all
  *this* app, so it stops merging you with the unrelated **Aura AI Scribe** (medical) and
  **auraScribe.co** (meeting notes).

**Deploy:** commit + push to the GitHub repo wired to Vercel; Vercel auto-redeploys. Then confirm the
favicon is live (this must return **200**, not 404):

```bash
curl -sI https://www.aurascribe.dev/favicon.ico | head -1
```

Expect `HTTP/2 200` with `content-type: image/x-icon` (or `image/vnd.microsoft.icon`).

---

## 1. Google Search Console (GSC)

### 1a. Add the property (use a **Domain** property)
- GSC → **Add property → Domain** → enter `aurascribe.dev` (no `https`, no `www`).
- It gives you a **DNS TXT record**. Add it at your domain registrar (where you bought `.dev`), DNS
  settings, add a `TXT` record, host `@`, value = the `google-site-verification=...` string. Save.
- Back in GSC → **Verify**. DNS can take minutes to a few hours to propagate. A Domain property is best
  here because it covers `www` + apex + `http`/`https` in one, matching your redirect setup.
- If you already verified earlier, skip to 1b.

### 1b. Submit the sitemap
- GSC → **Sitemaps** → enter `sitemap.xml` → Submit. (Full URL: `https://www.aurascribe.dev/sitemap.xml`.)
- Status should become **Success** with ~11 URLs discovered. If it says "Couldn't fetch", wait a day
  and resubmit — a fresh domain sometimes needs a retry.

### 1c. Force-crawl the important pages
- GSC → **URL Inspection** (top search bar) → paste `https://www.aurascribe.dev/` → **Test live URL**
  → **Request indexing**. Do this for the homepage first, then `/about` and your top 2–3 blog posts.
- Request-indexing is rate-limited (~10–ish/day) — spend it on the homepage + best pages, not all 11.

### 1d. Read the Pages (Indexing) report — know what's normal
- GSC → **Indexing → Pages**. Expected, NOT errors:
  - **"Page with redirect"** for `http://` and apex `aurascribe.dev` URLs — that's your 308 to `www`,
    correct.
  - **"Alternate page with proper canonical tag"** for `#how`, `#compare` style fragment hits — fine.
  - **"Discovered / Crawled — currently not indexed"** on a brand-new site — usually a *timing* state,
    not a defect. Re-check in 1–2 weeks; the sitemap + request-indexing pushes them along.
- Genuine errors to act on if they appear: **5xx**, **soft 404**, **blocked by robots.txt**,
  **redirect error**. None are expected here (robots allows all; every route returns 200/redirect).

### 1e. Favicon in Google — there is no button, only time
- Google refetches favicons on its own schedule (days to a few weeks after launch), separate from
  indexing. There's no "refresh favicon" tool. What speeds it: `/favicon.ico` now returns 200 (done in
  step 0) + requesting indexing of the homepage (1c). Then wait. The blank globe is normal pre-refetch.

---

## 2. Bing Webmaster Tools (also feeds DuckDuckGo, Ecosia, ChatGPT search)

The site already ships Bing ownership proof (a `msvalidate.01` meta tag **and** `/BingSiteAuth.xml`),
so verification is trivial.

- **Fastest path:** Bing Webmaster → **Import from Google Search Console** (one click, pulls the site
  + sitemaps once GSC is set up). Otherwise **Add site** `https://www.aurascribe.dev` → verify via the
  existing meta tag / XML (both are already deployed).
- **Submit sitemap:** Bing → Sitemaps → `https://www.aurascribe.dev/sitemap.xml`.
- **Submit URLs:** Bing → **URL Submission** → submit the homepage + key pages (Bing allows thousands
  per day, so you can submit all 11 sitemap URLs here).
- **Optional — IndexNow (instant recrawl on future changes):** Bing supports IndexNow. If you want it,
  it needs a key file at the site root; treat it as a separate small task, not required for launch.

---

## 3. Winning the brand term "AuraScribe" (disambiguation from the other products)

You're competing for the name with **Aura AI Scribe** (established medical product) and
**auraScribe.co**. You already rank #1 organically; the goal is to also own the AI overview / knowledge
side. This is off-page + time — code can only prime it (done via `alternateName`).

Do these, roughly in impact order:
1. **Make every owned property link to `https://www.aurascribe.dev` with the anchor text "AuraScribe":**
   - The **GitHub app repo**: set the repo **About → Website** to the site, and link it at the top of
     the README. (Repo links are strong, trusted brand signals.)
   - The **HuggingFace** model page, your LinkedIn/Behance, any social bios.
2. **Get a handful of quality backlinks** (also in the app's HANDOFF task list):
   - **alternativeto.net** — list AuraScribe as a Wispr Flow / Dragon / Windows Voice Typing alternative.
   - **Product Hunt** launch; a **"Show HN"** on Hacker News.
   - **awesome-lists** PRs: `awesome-privacy`, `awesome-windows`, `awesome-selfhosted`-style lists.
   - Relevant subreddits (r/windows, r/privacy, r/opensource) — as genuine sharing, not spam.
3. **Be consistent:** always write the brand as **"AuraScribe"** (one word, that casing) everywhere. The
   `alternateName` schema covers people who type "Aura Scribe", but your own usage should be uniform.
4. **Patience:** a new domain needs authority before Google will show a knowledge panel or trust it over
   an established same-name product. Weeks, not days. Track progress in GSC → Performance (filter query
   contains "aurascribe" and watch average position climb).

---

## 4. Validate everything (quick, one-time)

- **Rich Results / Schema:** https://validator.schema.org/ and Google's Rich Results Test on the
  homepage — confirm `SoftwareApplication`, `WebSite`, `FAQPage`, `Person` parse with no errors.
- **Live favicon:** load `https://www.aurascribe.dev/favicon.ico` in a browser — you should see the icon.
- **Lighthouse / PageSpeed Insights:** run on the homepage; aim for green. (Fonts + OG image are already
  optimized; first load ~197 KB.)
- **Mobile-friendly:** GSC's mobile usability / any responsive check — the site has no horizontal
  scroll at 375/768 (already verified).

---

## 5. What to expect on a realistic timeline

| When | What |
|---|---|
| Immediately after deploy | `/favicon.ico` returns 200; schema updated |
| Hours–1 day | GSC domain verified; sitemap "Success"; Bing imported |
| 1–7 days | Homepage recrawled; favicon likely starts showing in results |
| 1–4 weeks | Most pages indexed; brand queries climb; AI-overview confusion eases as backlinks land |

If after ~2 weeks a specific page still won't index (not just "pending"), *then* inspect it in GSC for a
concrete reason — don't pre-emptively treat "Discovered — not indexed" on a new site as a bug.

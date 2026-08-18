# SEO & ranking playbook — aurascribe.dev

How to get indexed, then how to actually rank and compete. On-page/technical SEO is already built
(see "Already done"); the rest is submission + off-page work that only you can do.

## Already done (in the code, verified live)

- Unique `<title>` + meta description per route; single `<h1>` per page.
- Canonical URLs, `sitemap.xml` (all 10 routes), `robots.txt` (allow-all + sitemap), correct 404s.
- Open Graph + Twitter card + a real 1200×630 `next/og` social image.
- JSON-LD: `SoftwareApplication`, `WebSite`, `FAQPage`, `Person` (you, with `sameAs` → GitHub /
  LinkedIn / Behance), and `BlogPosting` + `BreadcrumbList` on posts.
- `public/llms.txt` describing the app + author for AI crawlers.
- Fast, static, mobile-clean (no horizontal scroll), WCAG AA contrast, security headers.
- Canonical/OG use the primary `www.aurascribe.dev` (no redirect in the canonical or image URL).

## Step 1 — get it indexed (detailed)

### 1a. Understand the two ways to verify (and which to pick)

Both Google and Bing need to confirm you own the site. You are offered several methods; here is what
each means and which to use:

- **DNS record (TXT or CNAME)** — you add a record at your domain registrar (name.com). This proves
  you own the whole DOMAIN, so it verifies `aurascribe.dev`, `www.aurascribe.dev`, and every page at
  once. **This is the best method — use it for Google.** It does not depend on any file or the site
  being up.
- **HTML file upload / XML file** — you put a specific file at the site root
  (`https://www.aurascribe.dev/<file>`). For this site that means committing the file to `public/`.
  Bing's `BingSiteAuth.xml` is **already added** (in `public/BingSiteAuth.xml`) and deployed.
- **HTML meta tag** — a `<meta>` tag in the site's `<head>`. Bing's tag (`msvalidate.01`) is
  **already added** in `app/layout.tsx`, so Bing can verify by meta tag too.

### 1b. Verify Bing (should work now — nothing left to code)

Bing gave three options; two of them are now satisfied by the deployed site:
1. **XML file** — Bing looks for `https://www.aurascribe.dev/BingSiteAuth.xml`. It now exists
   (confirm by opening that URL in a browser — you should see the `<users><user>…` XML). In Bing
   Webmaster, pick "XML File" and click **Verify**.
2. **HTML meta tag** — the `<meta name="msvalidate.01" content="3BB68E671EFDBCEC0E777C1BF54853D7">`
   tag is now in the home page `<head>`. In Bing, pick "HTML Meta Tag" and click **Verify**.
   (Earlier it failed only because the site had not been redeployed with the tag yet.)
3. **CNAME** (optional) — if you prefer DNS: at name.com add a CNAME record with **Host/Name**
   `17eeac7c45c4f09d938a4fb2a0abc9ea` and **Value/Target** `verify.bing.com`, then Verify.

You only need ONE to succeed. The XML file or meta tag is easiest now — just click Verify.

### 1c. Verify Google Search Console (use the DNS TXT method)

1. Go to https://search.google.com/search-console → **Add property**.
2. Choose the **Domain** property type (left box), enter `aurascribe.dev` (no https, no www).
3. Google shows a **TXT record** to add, like `google-site-verification=abc123…`. Copy it.
4. Add it at name.com (see 1d), then come back and click **Verify**. DNS can take a few minutes to a
   couple of hours to propagate; if it fails immediately, wait and retry.

### 1d. How to add a DNS record at name.com (step by step)

1. Log in at name.com → **My Domains** → click **aurascribe.dev**.
2. Open the **DNS Records** (or "Manage DNS Records") page.
3. Click **Add Record**. For each record set the fields:
   - **Google verification (TXT):** Type = `TXT`, Host = `@` (means the root domain), Answer/Value =
     the full `google-site-verification=…` string, TTL = default (300). Save.
   - **Bing CNAME (only if you chose that method):** Type = `CNAME`, Host =
     `17eeac7c45c4f09d938a4fb2a0abc9ea`, Answer/Value = `verify.bing.com`, TTL = default. Save.
4. **Do not touch** the existing records that point the site to Vercel (the A record on `@` and the
   CNAME on `www`) — verification records are added alongside them, they do not replace them.
5. Wait for propagation, then click Verify in the respective console.

### 1e. Submit the sitemap and request indexing

Once verified in Google Search Console:
1. **Sitemaps** (left menu) → enter `sitemap.xml` → **Submit**. Full URL:
   `https://www.aurascribe.dev/sitemap.xml`. It should read "Success" and list 10 discovered URLs.
2. **URL Inspection** (top search bar) → paste `https://www.aurascribe.dev/` → **Request indexing**.
   Repeat for `/about`, `/blog`, and each blog post. This nudges Google to crawl them sooner.
3. In Bing Webmaster → **Sitemaps** → submit the same URL.

### 1f. "Pages not indexed" / visibility — what it means and how to fix

Submitting a sitemap does **not** instantly index every page — Google decides per URL, and it takes
days to weeks for a brand-new domain. To diagnose:
1. Search Console → **Indexing → Pages**. It splits URLs into **"Indexed"** vs **"Not indexed"** with
   a reason for each (e.g. "Discovered – currently not indexed", "Crawled – currently not indexed").
2. For a new site these reasons are usually just **"give it time"** — Google crawls, then indexes over
   subsequent visits. **Request indexing** (1e) speeds the important pages.
3. Make sure nothing blocks indexing (all already correct on this site, but to confirm): the page has
   no `noindex` (our `robots` is `index, follow`), `robots.txt` allows all, and the canonical points
   to the same URL (it does, to the `www` version).
4. If a page shows **"Alternate page with proper canonical tag"** for the bare-apex or non-www URL,
   that is EXPECTED and fine — those are the redirecting duplicates; the `www` canonical is the one
   that gets indexed.
5. Re-check weekly. Impressions in **Performance** are the first sign it is working, before clicks.

### 1g. Also do

Bing feeds DuckDuckGo and increasingly AI answer engines, so keep both consoles active. Give the
whole thing 1–3 weeks and keep an eye on **Pages** (coverage) and **Performance** (queries).

## Step 2 — match search intent (biggest on-page lever)

Your money keywords and the page that should own each:

| Intent / query | Target page |
|---|---|
| free wispr flow alternative, superwhisper/dragon alternative | `/blog/free-wispr-flow-alternative` + home comparison |
| offline dictation windows, on-device speech to text | `/blog/offline-dictation-windows` + home |
| malayalam / kannada speech to text, voice typing | `/blog/malayalam-speech-to-text-offline` |
| dictate into any app / hotkey voice typing | `/blog/dictate-into-any-app-hotkey` |
| private / local dictation, is dictation private | `/blog/local-vs-cloud-dictation-privacy` + `/privacy` |

Keep each page genuinely answering that one question. Do **not** keyword-stuff — write for the human,
and the query match follows. Update posts as you learn real queries from Search Console.

## Step 3 — build topical authority (more content)

You compete by being the definitive, honest source on *local Windows dictation*. Add posts over time
(reuse the blog structure — see the app repo pattern), e.g.:

- "How fast is on-device dictation, really?" (lean into the speed story: transcribes as you speak,
  text is ready the instant you stop — a genuine, demonstrable advantage over cloud round-trips).
- "Dictate code and commands without the cloud" (developer angle).
- "Windows Voice Typing (Win+H) vs a local app" (comparison intent).
- "Set up offline dictation on a locked-down / air-gapped PC" (privacy/enterprise angle).
- Per-language guides (Hindi, Tamil, Telugu, …) since each maps to a real, underserved query.

Internal-link every new post to the relevant existing ones and to the home comparison. You already
have breadcrumbs and a blog index feeding crawl depth.

## Step 4 — off-page / backlinks (what actually moves rankings)

Rankings for competitive terms need links and mentions from places your audience trusts:

- **Product Hunt** launch (schedule it; prepare the assets from `docs/APP-CONTEXT.md`).
- **AlternativeTo.net** — list AuraScribe as a free/open alternative to Wispr Flow, Superwhisper,
  Dragon, and Windows Voice Typing. High-intent referral + a relevant backlink.
- **Awesome lists** — PRs to `awesome-privacy`, `awesome-windows`, `awesome-selfhosted`-style lists,
  and any "speech-to-text" / "offline AI" lists.
- **Hacker News** "Show HN", and relevant subreddits (r/Windows, r/privacy, r/software, language
  communities for Malayalam/Kannada). Lead with the honest hook: free, offline, open, fast.
- **The app's GitHub README** should link to aurascribe.dev, and vice-versa (done here).
- Reach out to privacy / open-source / accessibility bloggers and YouTubers who cover dictation.
- Answer real questions on Reddit / forums / Stack Exchange where "offline dictation Windows" or
  "Malayalam speech to text" come up, and link only where genuinely helpful.

## Step 5 — entity & trust signals

- The `Person` JSON-LD (you, `sameAs` GitHub/LinkedIn/Behance) helps searches for your name resolve
  to a real entity. Keep those profiles consistent (same name, a line about AuraScribe).
- Consider a Wikidata/Crunchbase-style entry for AuraScribe once it has a few independent mentions.
- Keep the comparison and claims scrupulously honest — trust is the moat, and false claims get
  penalised (and would betray the product's whole premise).

## Step 6 — measure and iterate

- Monthly: Search Console **Performance** → find queries where you rank #5–20 and improve that exact
  page (title, intro, a section that answers the query better). That is the fastest ranking lever.
- Watch **Core Web Vitals** in Search Console (the site is static and light, so this should stay
  green; re-check after adding images).
- Track which backlinks drive real referral traffic and do more of what works.
- Watch for **AI-answer citations** (ChatGPT/Perplexity/Google AI): the clear structure + `llms.txt`
  + honest, specific copy make the site quotable. Being cited there is the new "page one".

## The competitive angle (use it everywhere)

AuraScribe's real, defensible advantages over Wispr Flow / Superwhisper / Dragon / Win+H:

1. **Free and open source** (MIT) — no subscription, no account, source is auditable.
2. **100% offline** — the voice never leaves the machine; verifiable, not a promise.
3. **Fast** — on-device, transcribes while you speak, text ready the moment you stop; no cloud
   round-trip latency.
4. **Languages others skip** — accurate, local **Malayalam and Kannada** (plus 25 European, ~40
   Asian). This is a near-unique, high-intent niche with low competition.
5. **Lightweight** — ~9 MB installer, runs on an ordinary CPU.

Lead with whichever of these matches the searcher's intent. The Malayalam/Kannada angle in
particular is where you can rank #1 quickly because almost no one else serves it locally.

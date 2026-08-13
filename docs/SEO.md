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

## Step 1 — get it indexed (do this first)

1. **Google Search Console** (https://search.google.com/search-console):
   - Add a **Domain property** for `aurascribe.dev` (covers apex + www + all subpaths). Verify with
     the **DNS TXT** record it gives you, added at name.com.
   - **Sitemaps → submit** `https://www.aurascribe.dev/sitemap.xml`.
   - **URL Inspection** → paste the homepage → **Request indexing**. Repeat for /about and /blog.
2. **Bing Webmaster Tools** (https://www.bing.com/webmasters): add the site (you can import from
   Google Search Console in one click) and submit the same sitemap. Bing also feeds DuckDuckGo and,
   increasingly, AI answer engines.
3. Confirm coverage over the next 1–3 weeks in Search Console → **Pages** (indexed vs not) and
   **Performance** (impressions/clicks/queries).

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
5. **Lightweight** — ~8.6 MB installer, runs on an ordinary CPU.

Lead with whichever of these matches the searcher's intent. The Malayalam/Kannada angle in
particular is where you can rank #1 quickly because almost no one else serves it locally.

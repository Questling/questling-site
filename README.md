# Questling — Marketing & SEO Website

The public website for **Questling**, the screen-free adventure app for kids.
Built with [Astro](https://astro.build) — it outputs plain static HTML (fast,
great for Google, free to host). No backend, no database, no servers.

---

## Run it on your Mac

You need [Node.js](https://nodejs.org) (you already have it from the app project).

```bash
cd /Users/devneon/QuestlingSite
npm install      # one time — downloads Astro into node_modules/
npm run dev      # starts the local preview
```

Then open the URL it prints (usually **http://localhost:4321**). Leave it running —
when you save a file, the browser refreshes automatically (just like Expo's live
reload).

| Command | What it does |
|---|---|
| `npm run dev` | Live local preview while you work. |
| `npm run build` | Builds the final static site into `dist/`. |
| `npm run preview` | Serves the built `dist/` so you can check the real output. |

---

## Folder map

```
QuestlingSite/
├── astro.config.mjs        ← site URL + sitemap setting (EDIT before deploy)
├── package.json            ← scripts + dependencies
├── public/                 ← files served as-is at the site root
│   ├── questling-icon.png  ← the gem logo (also the favicon + social image)
│   ├── robots.txt          ← tells Google it can crawl + where the sitemap is
│   └── images/             ← SVG illustrations (hero, steps, article thumbnails)
└── src/
    ├── consts.ts           ← site name, email, nav links — change once, applies everywhere
    ├── content.config.ts   ← the "rules" every article file must follow
    ├── styles/global.css   ← the whole design system (colors, cards, buttons)
    ├── components/         ← reusable pieces
    │   ├── BaseHead.astro  ← all the SEO <head> tags
    │   ├── Header.astro    ← top nav (with mobile hamburger)
    │   ├── Footer.astro    ← footer
    │   └── ArticleCard.astro ← one article card (used on home + articles page)
    ├── layouts/
    │   └── BaseLayout.astro ← wraps every page: head + header + content + footer
    ├── content/articles/   ← YOUR ARTICLES LIVE HERE (one .md file each)
    │   └── why-are-kids-always-indoors.md
    └── pages/              ← each file = one page/URL
        ├── index.astro            → /
        ├── about.astro            → /about
        ├── contact.astro          → /contact
        ├── 404.astro              → shown for bad URLs
        └── articles/
            ├── index.astro        → /articles  (the grid)
            └── [...slug].astro    → /articles/<any-article>  (renders each .md)
```

Rule of thumb: **`src/pages/` = things that become pages.** Everything else is
supporting code. **`src/content/articles/` = your blog posts.**

---

## How to add a new article (step by step)

1. **Copy the example.** Duplicate `src/content/articles/why-are-kids-always-indoors.md`
   and rename it. *The filename becomes the URL*, so use lowercase words with
   hyphens:
   `screen-time-rules-that-actually-work.md` → `/articles/screen-time-rules-that-actually-work`

2. **Edit the frontmatter** (the part between the two `---` lines). Every field is
   required except `updatedDate`:

   ```yaml
   ---
   title: "Screen-Time Rules That Actually Work"
   description: "A short, Google-friendly summary (~150 characters). Shows under the title in search and on the article card."
   pubDate: 2026-07-05            # YYYY-MM-DD. Newest articles sort to the top automatically.
   updatedDate: 2026-07-10        # optional — only if you revise it later
   heroImage: "/images/article-screen-time.svg"   # see step 3
   heroAlt: "Describe the image for screen readers and SEO"
   ---
   ```

   > If you miss a field or mistype a date, `npm run dev` will show a clear error
   > telling you exactly what's wrong — that's by design, so you can't half-publish.

3. **Add a thumbnail image.** Drop an image into `public/images/` and point
   `heroImage` at it (e.g. `/images/my-article.svg`). You can reuse an existing
   one to start. A real photo (1.6:1 ratio, ~800×500) looks great here later.

4. **Write the body** below the frontmatter in plain Markdown:
   `## Heading`, `**bold**`, `- bullet`, `[link text](/)`, `> quote`.

5. **Save.** The article appears automatically on `/articles` and in the home
   page's featured strip (newest first). No other file needs touching.

---

## SEO — what's already handled

- Unique `<title>` + meta description on every page
- Open Graph + Twitter tags (link previews use the gem image)
- Canonical URLs
- `sitemap.xml` (auto-generated at build) + `robots.txt`
- Schema.org `Article` structured data on each post
- Semantic HTML, alt text on images, keyboard focus styles, mobile-responsive

**The one thing you must do before going live:** open `astro.config.mjs` and set
`site:` to your real domain, and update the domain in `public/robots.txt`. The
sitemap and share links are built from that URL.

---

## Deploy for free

Both options below are free and need **no backend**.

### Option A — Netlify or Vercel (easiest)

1. Push this folder to a GitHub repository.
2. Go to [netlify.com](https://netlify.com) or [vercel.com](https://vercel.com),
   "Add new site" → "Import from GitHub", pick the repo.
3. They auto-detect Astro. Build command `npm run build`, publish directory `dist`.
4. Click deploy. You get a free `*.netlify.app` / `*.vercel.app` URL; add a custom
   domain later in their dashboard.

### Option B — GitHub Pages

1. In `astro.config.mjs` set `site` to `https://YOURNAME.github.io` and add
   `base: '/REPO-NAME'` if it's a project (not user) site.
2. Push to GitHub. In the repo: **Settings → Pages → Build from GitHub Actions**.
   Astro has an official Pages workflow you can paste in
   ([guide](https://docs.expo.dev) → search "Astro GitHub Pages").

> Tip: your privacy policy already lives on GitHub Pages
> (`questling.github.io/QuestlingPrivacy`), so a GitHub Pages deploy keeps
> everything in one place.

---

## Notes for later

- **Email signup** (home page) and the **contact form** open the visitor's email
  app via `mailto:` — no server involved. When you want a real mailing list, swap
  the signup `<form>` for a free Buttondown/Mailchimp/ConvertKit embed (still no
  backend). Look for the `TODO` comment in `src/pages/index.astro`.
- **App Store / Google Play badges** are styled as "coming soon" and aren't
  clickable yet. When the app ships, link them to the real store URLs.
- **Illustrations** are placeholder SVGs in the brand style. Replace any with real
  photos/screenshots when you have them — keep the `alt` text descriptive.

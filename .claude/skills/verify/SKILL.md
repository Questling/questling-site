---
name: verify
description: Verify QuestlingSite changes by building, previewing, and driving headless Chrome over CDP (no Playwright needed).
---

# Verifying QuestlingSite (static Astro site)

## Build + serve
```bash
npm run build                      # static build to dist/, fails loudly on schema errors
npm run preview -- --port 4322     # serves dist/ at http://localhost:4322 (NOT 127.0.0.1, it binds IPv6)
```

## Browser handle: headless Chrome via CDP, zero dependencies
There is no Playwright/Puppeteer here, but Google Chrome is installed and
Node >= 22 has a built-in WebSocket client, so drive Chrome's DevTools
protocol directly:

1. Launch: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --remote-debugging-port=9223 --user-data-dir=$(mktemp -d) --hide-scrollbars about:blank`
2. `fetch http://127.0.0.1:9223/json/list`, take the `webSocketDebuggerUrl` of the `page` target.
3. Connect with `new WebSocket(url)`, send `{id, method, params}` JSON.
4. Useful methods: `Page.navigate`, `Page.captureScreenshot`,
   `Runtime.evaluate` (with `returnByValue: true`),
   `Emulation.setDeviceMetricsOverride` (393x852 mobile = 3, 1440x900 desktop = 2),
   `Emulation.setEmulatedMedia` with `features: [{name: 'prefers-reduced-motion', value: 'reduce'}]`.

A working script from a past session: scroll the page with
`Runtime.evaluate(window.scrollTo(...))`, wait ~1.2s for damped animations to
settle, screenshot, and read DOM state (active classes, CSS vars, and
`document.documentElement.scrollWidth - innerWidth` which must be 0, the site
bans horizontal scroll).

## Flows worth driving
- Home page scroll showcase (`#app-showcase`): pinned 3D phone, screens swap
  per step, feature items highlight, rail fills. Check desktop, 393px
  (becomes a snap carousel), and reduced-motion (becomes a vertical stack).
- Any new article: check it renders at `/articles/<slug>` and appears on
  `/articles` and possibly the home featured strip (top 3 by pubDate).

## Gotchas
- `curl http://127.0.0.1:4322` fails; use `http://localhost:4322`.
- The site header is sticky (~69px); pinned/anchored content must clear it.
- House style: no em dashes anywhere, including code comments.

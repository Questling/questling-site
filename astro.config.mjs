// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// IMPORTANT: change `site` to your real domain before deploying.
// This URL is baked into the sitemap, canonical links, and social-share tags,
// so SEO depends on it being correct.
// Examples:
//   GitHub Pages (project): https://YOURNAME.github.io/QuestlingSite
//   Vercel/Netlify:         https://questling.com   (or the *.vercel.app URL)
export default defineConfig({
  site: 'https://getquestling.com',
  integrations: [sitemap()],
});

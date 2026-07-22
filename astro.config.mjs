// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { QUESTS, slug } from './src/data/quest-utils';

// The quest pages now live INSIDE the app (static files served under /app), so
// the auto-sitemap can't discover them the way it does Astro pages. List every
// quest URL (plus the app entry points) as customPages so all 200 still land in
// sitemap.xml for Google. customPages are ADDED to the auto-generated pages.
const appPages = [
  'https://getquestling.com/app',
  'https://getquestling.com/app/quests',
  ...QUESTS.map((q) => `https://getquestling.com/app/quest/${slug(q)}`),
];

export default defineConfig({
  site: 'https://getquestling.com',
  integrations: [sitemap({ customPages: appPages })],
});

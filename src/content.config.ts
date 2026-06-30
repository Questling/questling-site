import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// An "article" is one Markdown file in src/content/articles/.
// Its filename (minus ".md") becomes its URL, e.g.
//   why-are-kids-always-indoors.md  ->  /articles/why-are-kids-always-indoors
//
// The `schema` below is the contract every article must follow. If you forget
// a field, `npm run dev` / `npm run build` will tell you exactly what's missing,
// so you can never half-publish a broken article.
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // Shown on Google + in the article card. Keep ~150 chars, parent-focused.
      description: z.string(),
      pubDate: z.coerce.date(),
      // Optional: set this if you revise an old article (helps SEO freshness).
      updatedDate: z.coerce.date().optional(),
      // Thumbnail shown on the cards + at the top of the article + as the
      // social-share image. Path is relative to this file's folder.
      heroImage: z.string(),
      heroAlt: z.string(),
    }),
});

export const collections = { articles };

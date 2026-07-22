// Everything derived from the raw quest data: URLs, gems, category, FAQs, and
// interlinking. Kept out of quests.ts so that file stays pure data.
import { QUESTS, type Quest } from './quests';

export { QUESTS, type Quest };

// Title -> URL slug, e.g. "The Stick Sword Hunt" -> "the-stick-sword-hunt".
export function slug(q: Quest): string {
  return q.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Gems a quest is worth (mirrors the app's formula), used in copy + FAQ.
export function gemsFor(q: Quest): number {
  let gems = 10;
  if (q.minAge >= 7) gems += 5;
  if (q.steps.length >= 5) gems += 5;
  if (q.maxAge >= 12) gems += 5;
  return gems;
}

// The first FREE_COUNT quests are free in the app; the rest need Quest Plus.
// Used to frame the "open in the app" gate on each quest page.
export const FREE_COUNT = 50;
export function isFree(q: Quest): boolean {
  return q.id <= FREE_COUNT;
}

export type Category = 'outdoor' | 'nature' | 'active' | 'creative' | 'quiet';

// A simple category from the quest's own words. Drives grouping, interlinking,
// and the longform framing. First match wins.
export function categoryOf(q: Quest): Category {
  const t = `${q.title} ${q.details} ${q.materials}`.toLowerCase();
  if (/\b(run|race|jump|tag|ball|sport|climb|obstacle|relay|balance|hop|dance|throw|kick|chase)\b/.test(t)) return 'active';
  if (/\b(bug|insect|leaf|leaves|rock|plant|flower|bird|tree|garden|seed|nature|pond|worm|butterfly|snail|cloud|star)\b/.test(t)) return 'nature';
  if (/\b(make|build|draw|paint|craft|create|design|story|invent|fort|art|decorate|write|sculpt|music|costume)\b/.test(t)) return 'creative';
  if (/\b(watch|listen|observe|read|quiet|calm|rest|slow|breathe|notice)\b/.test(t)) return 'quiet';
  return 'outdoor';
}

const CATEGORY_LABEL: Record<Category, string> = {
  outdoor: 'Outdoor',
  nature: 'Nature',
  active: 'Active & energetic',
  creative: 'Creative',
  quiet: 'Calm & quiet',
};
export function categoryLabel(c: Category): string {
  return CATEGORY_LABEL[c];
}

// One paragraph on why this KIND of quest is good for kids (unique per category).
const CATEGORY_WHY: Record<Category, string> = {
  outdoor:
    'Outdoor quests get kids off the couch and into fresh air and real space. That movement and unstructured time builds coordination, focus, and mood in a way a screen never can, and it makes "outside" feel like the fun option instead of the boring one.',
  nature:
    'Nature quests build curiosity and close observation. Noticing a bug, a leaf, or the shape of a cloud teaches kids to slow down and pay attention to the living world, which is exactly the muscle screens let go slack.',
  active:
    'Active quests burn energy and build strength, balance, and confidence. A kid who has run, climbed, and jumped is calmer afterward, sleeps better, and is far less likely to reach for a device out of restlessness.',
  creative:
    'Creative quests stretch imagination and problem-solving. When a kid invents, builds, or makes something up, they are practicing the self-directed thinking that endless entertainment quietly replaces.',
  quiet:
    'Calm quests give kids a chance to slow down, notice, and reset. Not every screen-free moment has to be high energy, and a quiet, absorbing activity is a gentle off-ramp from an overstimulated day.',
};
export function whyFor(q: Quest): string {
  return CATEGORY_WHY[categoryOf(q)];
}

// A rough time estimate from how many steps the quest has.
export function timeEstimate(q: Quest): string {
  const n = q.steps.length;
  if (n <= 3) return '10 to 20 minutes';
  if (n <= 5) return '20 to 40 minutes';
  return '30 to 60 minutes';
}

// FAQ items generated from the quest's REAL data, different for every quest, so
// each page has genuine, non-duplicate FAQ content (and FAQ rich results).
export function faqFor(q: Quest): { q: string; a: string }[] {
  const gems = gemsFor(q);
  const needs = q.materials.trim().toLowerCase().startsWith('none')
    ? 'Nothing at all. It uses whatever you already have around you, so you can start right away.'
    : `You'll need ${q.materials}. That's it.`;
  return [
    {
      q: `What age is "${q.title}" for?`,
      a: `It's aimed at kids around ${q.ageRange}, but it's easy to make simpler for a younger child or more of a challenge for an older one.`,
    },
    { q: `What do I need for "${q.title}"?`, a: needs },
    {
      q: `How long does it take?`,
      a: `Usually about ${timeEstimate(q)}, though it happily stretches longer if your kid gets into it.`,
    },
    {
      q: `Is it screen-free?`,
      a: `Completely. You pick the quest on your phone, and your child does the whole thing in the real world with no screen of their own.`,
    },
    {
      q: `How does my kid earn a reward for doing it?`,
      a: `In the free Questling app, finishing this quest earns around ${gems} gems, which your child trades for real-world rewards that you set.`,
    },
  ];
}

// Interlinking: category -> relevant article slugs (all exist in the catalog).
const CATEGORY_ARTICLES: Record<Category, string[]> = {
  outdoor: ['screen-free-outdoor-activities', 'why-outdoor-play-matters', 'why-are-kids-always-indoors'],
  nature: ['nature-scavenger-hunt-ideas', 'why-outdoor-play-matters', 'screen-free-outdoor-activities'],
  active: ['screen-free-outdoor-activities', 'screen-free-activities-for-tweens', 'why-outdoor-play-matters'],
  creative: ['what-to-do-when-your-kid-is-bored', 'why-boredom-is-good-for-kids', 'screen-free-play-space'],
  quiet: ['screen-free-bedtime-routine', 'why-boredom-is-good-for-kids', 'how-screen-time-affects-kids-sleep'],
};
export function relatedArticleSlugs(q: Quest): string[] {
  return CATEGORY_ARTICLES[categoryOf(q)];
}

// Related quests: same category, closest in age, excluding this one.
export function relatedQuests(q: Quest, n = 6): Quest[] {
  const cat = categoryOf(q);
  return QUESTS.filter((x) => x.id !== q.id && categoryOf(x) === cat)
    .sort((a, b) => Math.abs(a.minAge - q.minAge) - Math.abs(b.minAge - q.minAge))
    .slice(0, n);
}

// Free quests to funnel a paid quest's visitors toward (same category first,
// then any free quest), so a locked page still offers something to do now.
export function freeQuests(q: Quest, n = 6): Quest[] {
  const cat = categoryOf(q);
  const sameCat = QUESTS.filter((x) => isFree(x) && x.id !== q.id && categoryOf(x) === cat);
  const rest = QUESTS.filter((x) => isFree(x) && x.id !== q.id && categoryOf(x) !== cat);
  return [...sameCat, ...rest].slice(0, n);
}

// Hub pages: the "middle layer" between articles and the 200 quest pages.
// Each hub targets a real mid-tail search ("outdoor quests for kids") and
// gives the quest pages a crawl path that isn't one flat 200-item list.
import { QUESTS, categoryOf, isFree, slug, type Category, type Quest } from './quest-utils';

export interface Hub {
  slug: string;
  title: string; // page H1 + <title>
  description: string; // meta description
  intro: string[]; // unique paragraphs (no em dashes, house rule)
  filter: (q: Quest) => boolean;
  articles: { slug: string; title: string }[]; // cross-links into the article cluster
}

const cat = (c: Category) => (q: Quest) => categoryOf(q) === c;
// A quest belongs to an age band if its range overlaps the band.
const ages = (lo: number, hi: number) => (q: Quest) => q.minAge <= hi && q.maxAge >= lo;

export const HUBS: Hub[] = [
  {
    slug: 'outdoor-quests-for-kids',
    title: 'Outdoor Quests for Kids',
    description:
      'Screen-free outdoor quests for kids: real-world missions for the backyard, the park, and beyond, each with steps, an age range, and gems to earn.',
    intro: [
      'The hardest part of getting a kid outside is not the outside part. It is that "go play outside" hands them a blank page. An outdoor quest fixes that by giving the afternoon a plot: a specific mission, a clear finish line, and a reward waiting at the end.',
      'Every quest below runs on the real world. Grass, sticks, sidewalks, weather. You pick the quest on your phone, your kid does it out there with no screen of their own, and finishing earns gems they can trade for rewards you set. Most need nothing but what is already in the yard.',
    ],
    filter: cat('outdoor'),
    articles: [
      { slug: 'screen-free-outdoor-activities', title: 'Screen-free outdoor activities' },
      { slug: 'how-to-get-kids-to-play-outside', title: 'How to get kids to play outside' },
      { slug: 'backyard-activities-for-kids', title: 'Backyard activities for kids' },
    ],
  },
  {
    slug: 'nature-quests-for-kids',
    title: 'Nature Quests for Kids',
    description:
      'Nature quests for kids: bug safaris, cloud watching, leaf hunts, and other screen-free missions that turn curiosity about the living world into an adventure.',
    intro: [
      'Kids are born naturalists. Hand a five-year-old a magnifying glass and a patch of grass and they will find more in ten minutes than most adults notice in a week. Nature quests point that curiosity at something specific: find it, watch it, count it, name it.',
      'These quests build the slowest, most valuable skill a screen can never teach: paying close attention. Each one below has its own steps and age range, and finishing earns gems toward rewards you choose. A backyard, a sidewalk strip of weeds, or a park all work.',
    ],
    filter: cat('nature'),
    articles: [
      { slug: 'nature-activities-for-kids', title: 'Nature activities for kids' },
      { slug: 'nature-scavenger-hunt-ideas', title: 'Nature scavenger hunt ideas' },
      { slug: 'nature-crafts-for-kids', title: 'Nature crafts for kids' },
    ],
  },
  {
    slug: 'active-quests-for-kids',
    title: 'Active Quests for Kids',
    description:
      'Active, energy-burning quests for kids: races, balance challenges, obstacle courses, and outdoor games that wear kids out the good way, no screens involved.',
    intro: [
      'Some kids do not need an activity so much as an outlet. If yours is bouncing off the walls by mid-afternoon, the fastest fix is a physical challenge with a score attached: beat your time, hold your balance, land the jump.',
      'The quests below all get a kid moving: running, jumping, balancing, throwing, climbing. A kid who has spent an hour on a real physical mission is calmer at dinner and sleeps better at night, and the gems they earn make the next quest an easy sell.',
    ],
    filter: cat('active'),
    articles: [
      { slug: 'outdoor-games-for-kids-to-burn-energy', title: 'Outdoor games to burn energy' },
      { slug: 'gross-motor-activities-for-kids', title: 'Gross motor activities for kids' },
      { slug: 'indoor-activities-to-burn-energy', title: 'Indoor activities to burn energy' },
    ],
  },
  {
    slug: 'creative-quests-for-kids',
    title: 'Creative Quests for Kids',
    description:
      'Creative quests for kids: build forts, paint rocks, invent worlds, and make real things with their hands. Screen-free missions for imaginative kids.',
    intro: [
      'Creativity is the first thing endless entertainment quietly replaces. A kid who is fed stories all day stops inventing their own. Creative quests flip that back: here is a pile of ordinary stuff, now make something nobody has ever made before.',
      'Every quest below asks a kid to build, design, or invent, using things already around the house or yard. There is no wrong answer and no instructions to follow perfectly, just a mission and whatever their imagination does with it. Finishing earns gems toward rewards you set.',
    ],
    filter: cat('creative'),
    articles: [
      { slug: 'creative-activities-for-kids', title: 'Creative activities for kids' },
      { slug: 'art-projects-for-kids', title: 'Art projects for kids' },
      { slug: 'building-activities-for-kids', title: 'Building activities for kids' },
    ],
  },
  {
    slug: 'calm-quests-for-kids',
    title: 'Calm Quests for Kids',
    description:
      'Calm, quiet quests for kids: slow, absorbing screen-free missions that help an overstimulated kid settle down, focus, and reset.',
    intro: [
      'Not every screen-free moment needs to burn energy. Sometimes the kid in front of you is wound up, frayed, or overstimulated, and what they need is not a race but an off-ramp: something slow and absorbing enough to bring them back down.',
      'These quests are the quiet ones: watching, listening, noticing, waiting. They are especially good for the hour before dinner and the wind-down before bed, and they quietly build focus and patience, the exact muscles fast screens let go slack.',
    ],
    filter: cat('quiet'),
    articles: [
      { slug: 'calm-down-activities-for-kids', title: 'Calm-down activities for kids' },
      { slug: 'calming-activities-for-anxious-kids', title: 'Calming activities for anxious kids' },
      { slug: 'screen-free-bedtime-routine', title: 'A screen-free bedtime routine' },
    ],
  },
  {
    slug: 'quests-for-ages-5-7',
    title: 'Quests for Ages 5 to 7',
    description:
      'Screen-free quests for 5, 6, and 7 year olds: short, simple real-world missions sized for little kids, with easy steps and rewards they can earn.',
    intro: [
      'Five-to-sevens live in a sweet spot: old enough to follow a mission with real steps, young enough that a stick can still be a sword and a puddle can still be a laboratory. The right quest at this age is short, concrete, and ends with something to show off.',
      'Everything below fits that window. The steps are simple, the materials are things you already have, and most quests wrap in ten to twenty minutes, which is exactly as long as a six-year-old’s attention wants to be held. Finishing earns gems toward rewards you choose.',
    ],
    filter: ages(5, 7),
    articles: [
      { slug: 'screen-free-activities-for-5-year-olds', title: 'Screen-free activities for 5-year-olds' },
      { slug: 'screen-free-activities-for-6-year-olds', title: 'Screen-free activities for 6-year-olds' },
      { slug: 'screen-free-activities-for-7-year-olds', title: 'Screen-free activities for 7-year-olds' },
    ],
  },
  {
    slug: 'quests-for-ages-8-10',
    title: 'Quests for Ages 8 to 10',
    description:
      'Screen-free quests for 8, 9, and 10 year olds: bigger challenges with real independence, from building projects to outdoor missions they run themselves.',
    intro: [
      'Eight-to-tens want a real challenge and a little room to run it themselves. Too babyish and they roll their eyes; too supervised and it stops being theirs. The quests that land at this age have a goal worth bragging about and steps a kid can own start to finish.',
      'The missions below hit that mark: build something that works, beat a measurable record, run a real investigation. You stay the quest-giver and the reward-setter, but the doing belongs to them, and the gems they earn keep the next mission an easy yes.',
    ],
    filter: ages(8, 10),
    articles: [
      { slug: 'screen-free-activities-for-8-year-olds', title: 'Screen-free activities for 8-year-olds' },
      { slug: 'screen-free-activities-for-9-year-olds', title: 'Screen-free activities for 9-year-olds' },
      { slug: 'screen-free-activities-for-10-year-olds', title: 'Screen-free activities for 10-year-olds' },
    ],
  },
  {
    slug: 'quests-for-ages-11-13',
    title: 'Quests for Ages 11 to 13',
    description:
      'Screen-free quests for tweens and young teens: real independence, real skills, and challenges an 11 to 13 year old will not roll their eyes at.',
    intro: [
      'This is the hardest age to pull off a screen. A tween has a world in their pocket, and anything that smells like a little-kid activity is dead on arrival. What still works is mastery: a challenge hard enough to be worth beating, with independence built in.',
      'The quests below are the big ones: multi-step builds, survival skills, endurance challenges, projects that take real follow-through. Treat the gems like a real currency (they set the rewards with you) and the loop holds surprisingly well, even for a thirteen-year-old.',
    ],
    filter: ages(11, 13),
    articles: [
      { slug: 'screen-free-activities-for-tweens', title: 'Screen-free activities for tweens' },
      { slug: 'screen-free-activities-for-11-year-olds', title: 'Screen-free activities for 11-year-olds' },
      { slug: 'screen-free-activities-for-13-year-olds', title: 'Screen-free activities for 13-year-olds' },
    ],
  },
];

// Quests for a hub, free (playable) first, capped so pages stay fast.
export function hubQuests(h: Hub, n = 24): Quest[] {
  const all = QUESTS.filter(h.filter);
  const free = all.filter(isFree);
  const paid = all.filter((q) => !isFree(q));
  return [...free, ...paid].slice(0, n);
}

export { slug as questSlug };

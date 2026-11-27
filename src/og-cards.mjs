// Own 1200×675 share/Discover images per page (spec: MY-PLANS BUILDER-SPECS 27 Nov, item 1).
// scripts/og-cards.mjs renders these into src/static/og/<file>.jpg; build.mjs page() uses OG_BY_PATH for og:image + JSON-LD.
import { OG_CARDS as AARTI } from './aarti.mjs';
import { OG_CARDS as VYAK } from './vyakaran.mjs';
const EXTRA = [
  { file: 'hanuman-chalisa', path: '/hanuman-chalisa/', emoji: '🙏', deco: '🚩🪔🌺', title: 'हनुमान चालीसा' },
  { file: 'ramzan', path: '/ramzan/', emoji: '🌙', deco: '⭐🕌🤲', title: 'Sehri · Iftar 2027' },
  { file: 'namaz-time', path: '/namaz-time/', emoji: '🕌', deco: '🌅🕰🧭', title: 'नमाज़ का समय' },
  { file: 'board-exam', path: '/board-exam/', emoji: '📝', deco: '📚⏳✏', title: 'Board Exam 2027' },
  { file: 'income-tax', path: '/income-tax/', emoji: '💰', deco: '🧾📊🇮🇳', title: 'Income Tax 2026-27' },
];
export const OG_CARDS = [...AARTI, ...VYAK, ...EXTRA];
export const OG_BY_PATH = Object.fromEntries(OG_CARDS.map((c) => [c.path, `/og/${c.file}.jpg`]));

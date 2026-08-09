import { LOCALE_META } from '../i18n/locales';

const BASIC_WORD_LEVEL_COUNT = 5;
const WORDS_PER_LEVEL = 10;
const TOTAL_BASIC_WORDS = BASIC_WORD_LEVEL_COUNT * WORDS_PER_LEVEL;

const BASIC_WORD_LEVELS = [
  { level: 1, themeKey: 'basicWords.level1.theme' },
  { level: 2, themeKey: 'basicWords.level2.theme' },
  { level: 3, themeKey: 'basicWords.level3.theme' },
  { level: 4, themeKey: 'basicWords.level4.theme' },
  { level: 5, themeKey: 'basicWords.level5.theme' },
];

const basicWordItems = [
  { key: 'greeting_morning', level: 1, labels: { pl: 'dzień dobry', en: 'good morning', it: 'buongiorno' } },
  { key: 'greeting_hello', level: 1, labels: { pl: 'cześć', en: 'hello', it: 'ciao' } },
  { key: 'greeting_hi', level: 1, labels: { pl: 'hej', en: 'hi', it: 'ciao' } },
  { key: 'greeting_goodbye', level: 1, labels: { pl: 'do widzenia', en: 'goodbye', it: 'arrivederci' } },
  { key: 'greeting_night', level: 1, labels: { pl: 'dobranoc', en: 'good night', it: 'buonanotte' } },
  { key: 'greeting_see_you', level: 1, labels: { pl: 'do zobaczenia', en: 'see you', it: 'a presto' } },
  { key: 'greeting_welcome', level: 1, labels: { pl: 'witaj', en: 'welcome', it: 'benvenuto' } },
  { key: 'greeting_evening', level: 1, labels: { pl: 'dobry wieczór', en: 'good evening', it: 'buonasera' } },
  { key: 'greeting_bye', level: 1, labels: { pl: 'pa', en: 'bye', it: 'ciao' } },
  { key: 'greeting_nice', level: 1, labels: { pl: 'miło cię poznać', en: 'nice to meet you', it: 'piacere di conoscerti' } },
  { key: 'polite_please', level: 2, labels: { pl: 'proszę', en: 'please', it: 'per favore' } },
  { key: 'polite_thank_you', level: 2, labels: { pl: 'dziękuję', en: 'thank you', it: 'grazie' } },
  { key: 'polite_thanks', level: 2, labels: { pl: 'dzięki', en: 'thanks', it: 'grazie' } },
  { key: 'polite_sorry', level: 2, labels: { pl: 'przepraszam', en: 'sorry', it: 'scusa' } },
  { key: 'polite_excuse_me', level: 2, labels: { pl: 'słucham', en: 'excuse me', it: 'scusi' } },
  { key: 'polite_welcome_reply', level: 2, labels: { pl: 'proszę bardzo', en: "you're welcome" } },
  { key: 'polite_yes', level: 2, labels: { pl: 'tak', en: 'yes', it: 'sì' } },
  { key: 'polite_no', level: 2, labels: { pl: 'nie', en: 'no', it: 'no' } },
  { key: 'polite_okay', level: 2, labels: { pl: 'dobrze', en: 'okay', it: 'va bene' } },
  { key: 'polite_of_course', level: 2, labels: { pl: 'oczywiście', en: 'of course', it: 'certo' } },
  { key: 'daily_help', level: 3, labels: { pl: 'pomocy', en: 'help', it: 'aiuto' } },
  { key: 'daily_wait', level: 3, labels: { pl: 'czekaj', en: 'wait', it: 'aspetta' } },
  { key: 'daily_here', level: 3, labels: { pl: 'tutaj', en: 'here', it: 'qui' } },
  { key: 'daily_there', level: 3, labels: { pl: 'tam', en: 'there', it: 'lì' } },
  { key: 'daily_now', level: 3, labels: { pl: 'teraz', en: 'now', it: 'adesso' } },
  { key: 'daily_water', level: 3, labels: { pl: 'woda', en: 'water', it: 'acqua' } },
  { key: 'daily_food', level: 3, labels: { pl: 'jedzenie', en: 'food', it: 'cibo' } },
  { key: 'daily_hungry', level: 3, labels: { pl: 'jestem głodny', en: "I'm hungry" } },
  { key: 'daily_tired', level: 3, labels: { pl: 'jestem zmęczony', en: "I'm tired" } },
  { key: 'daily_dont_know', level: 3, labels: { pl: 'nie wiem', en: "I don't know" } },
  { key: 'family_mom', level: 4, labels: { pl: 'mama', en: 'mom', it: 'mamma' } },
  { key: 'family_dad', level: 4, labels: { pl: 'tata', en: 'dad', it: 'papà' } },
  { key: 'family_grandma', level: 4, labels: { pl: 'babcia', en: 'grandma', it: 'nonna' } },
  { key: 'family_grandpa', level: 4, labels: { pl: 'dziadek', en: 'grandpa', it: 'nonno' } },
  { key: 'family_brother', level: 4, labels: { pl: 'brat', en: 'brother', it: 'fratello' } },
  { key: 'family_sister', level: 4, labels: { pl: 'siostra', en: 'sister', it: 'sorella' } },
  { key: 'family_baby', level: 4, labels: { pl: 'dziecko', en: 'baby', it: 'bambino' } },
  { key: 'family_friend', level: 4, labels: { pl: 'przyjaciel', en: 'friend', it: 'amico' } },
  { key: 'family_dog', level: 4, labels: { pl: 'pies', en: 'dog', it: 'cane' } },
  { key: 'family_cat', level: 4, labels: { pl: 'kot', en: 'cat', it: 'gatto' } },
  { key: 'place_home', level: 5, labels: { pl: 'dom', en: 'home', it: 'casa' } },
  { key: 'place_school', level: 5, labels: { pl: 'szkoła', en: 'school', it: 'scuola' } },
  { key: 'place_play', level: 5, labels: { pl: 'baw się', en: 'play', it: 'gioca' } },
  { key: 'place_sleep', level: 5, labels: { pl: 'śpij', en: 'sleep', it: 'dormi' } },
  { key: 'place_read', level: 5, labels: { pl: 'czytaj', en: 'read', it: 'leggi' } },
  { key: 'place_today', level: 5, labels: { pl: 'dzisiaj', en: 'today', it: 'oggi' } },
  { key: 'place_tomorrow', level: 5, labels: { pl: 'jutro', en: 'tomorrow', it: 'domani' } },
  { key: 'place_good', level: 5, labels: { pl: 'dobrze', en: 'good', it: 'bene' } },
  { key: 'place_bad', level: 5, labels: { pl: 'źle', en: 'bad', it: 'male' } },
  { key: 'place_love', level: 5, labels: { pl: 'kocham cię', en: 'I love you', it: 'ti amo' } },
];

function getLabelForLocale(item, localeCode) {
  if (!item?.labels) return '';
  const code = localeCode || 'pl';
  if (item.labels[code]) return item.labels[code];
  if (process.env.NODE_ENV === 'development' && code !== 'pl') {
    console.warn(`basicWords: missing labels.${code} for key ${item.key}`);
  }
  return item.labels.pl || '';
}

function getSourceLocale(dir) {
  return dir.startsWith('pl-to-') ? 'pl' : dir.endsWith('-to-pl') ? dir.split('-to-pl')[0] : null;
}

function getTargetLocale(dir) {
  if (dir.startsWith('pl-to-')) return dir.slice('pl-to-'.length);
  if (dir.endsWith('-to-pl')) return 'pl';
  return null;
}

function isValidBasicWordsDir(dir, locale) {
  if (!dir || !locale || locale === 'pl') return false;
  return dir === `pl-to-${locale}` || dir === `${locale}-to-pl`;
}

function getSpeechLangForDir(dir, side) {
  const localeCode = side === 'source' ? getSourceLocale(dir) : getTargetLocale(dir);
  if (!localeCode || !LOCALE_META[localeCode]) return 'pl-PL';
  return LOCALE_META[localeCode].speechLang;
}

function getSourceLabel(item, dir) {
  return getLabelForLocale(item, getSourceLocale(dir));
}

function getTargetLabel(item, dir) {
  return getLabelForLocale(item, getTargetLocale(dir));
}

function getBasicWordsForLevel(level) {
  return basicWordItems.filter((item) => item.level === level);
}

function getLevelProgressKey(dir, level) {
  return `basic-words:${dir}:level-${level}`;
}

function getDirectionProgressKeys(dir) {
  return BASIC_WORD_LEVELS.map(({ level }) => getLevelProgressKey(dir, level));
}

function getDirectionCompletedCount(dir, getCount = () => 0) {
  return getDirectionProgressKeys(dir).reduce((sum, key) => sum + getCount(key), 0);
}

export {
  BASIC_WORD_LEVEL_COUNT,
  WORDS_PER_LEVEL,
  TOTAL_BASIC_WORDS,
  BASIC_WORD_LEVELS,
  basicWordItems,
  getLabelForLocale,
  getSourceLocale,
  getTargetLocale,
  isValidBasicWordsDir,
  getSpeechLangForDir,
  getSourceLabel,
  getTargetLabel,
  getBasicWordsForLevel,
  getLevelProgressKey,
  getDirectionProgressKeys,
  getDirectionCompletedCount,
};

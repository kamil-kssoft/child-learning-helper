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
  { key: 'greeting_morning', level: 1, labels: { pl: 'dzień dobry', en: 'good morning' } },
  { key: 'greeting_hello', level: 1, labels: { pl: 'cześć', en: 'hello' } },
  { key: 'greeting_hi', level: 1, labels: { pl: 'hej', en: 'hi' } },
  { key: 'greeting_goodbye', level: 1, labels: { pl: 'do widzenia', en: 'goodbye' } },
  { key: 'greeting_night', level: 1, labels: { pl: 'dobranoc', en: 'good night' } },
  { key: 'greeting_see_you', level: 1, labels: { pl: 'do zobaczenia', en: 'see you' } },
  { key: 'greeting_welcome', level: 1, labels: { pl: 'witaj', en: 'welcome' } },
  { key: 'greeting_evening', level: 1, labels: { pl: 'dobry wieczór', en: 'good evening' } },
  { key: 'greeting_bye', level: 1, labels: { pl: 'pa', en: 'bye' } },
  { key: 'greeting_nice', level: 1, labels: { pl: 'miło cię poznać', en: 'nice to meet you' } },
  { key: 'polite_please', level: 2, labels: { pl: 'proszę', en: 'please' } },
  { key: 'polite_thank_you', level: 2, labels: { pl: 'dziękuję', en: 'thank you' } },
  { key: 'polite_thanks', level: 2, labels: { pl: 'dzięki', en: 'thanks' } },
  { key: 'polite_sorry', level: 2, labels: { pl: 'przepraszam', en: 'sorry' } },
  { key: 'polite_excuse_me', level: 2, labels: { pl: 'słucham', en: 'excuse me' } },
  { key: 'polite_welcome_reply', level: 2, labels: { pl: 'proszę bardzo', en: "you're welcome" } },
  { key: 'polite_yes', level: 2, labels: { pl: 'tak', en: 'yes' } },
  { key: 'polite_no', level: 2, labels: { pl: 'nie', en: 'no' } },
  { key: 'polite_okay', level: 2, labels: { pl: 'dobrze', en: 'okay' } },
  { key: 'polite_of_course', level: 2, labels: { pl: 'oczywiście', en: 'of course' } },
  { key: 'daily_help', level: 3, labels: { pl: 'pomocy', en: 'help' } },
  { key: 'daily_wait', level: 3, labels: { pl: 'czekaj', en: 'wait' } },
  { key: 'daily_here', level: 3, labels: { pl: 'tutaj', en: 'here' } },
  { key: 'daily_there', level: 3, labels: { pl: 'tam', en: 'there' } },
  { key: 'daily_now', level: 3, labels: { pl: 'teraz', en: 'now' } },
  { key: 'daily_water', level: 3, labels: { pl: 'woda', en: 'water' } },
  { key: 'daily_food', level: 3, labels: { pl: 'jedzenie', en: 'food' } },
  { key: 'daily_hungry', level: 3, labels: { pl: 'jestem głodny', en: "I'm hungry" } },
  { key: 'daily_tired', level: 3, labels: { pl: 'jestem zmęczony', en: "I'm tired" } },
  { key: 'daily_dont_know', level: 3, labels: { pl: 'nie wiem', en: "I don't know" } },
  { key: 'family_mom', level: 4, labels: { pl: 'mama', en: 'mom' } },
  { key: 'family_dad', level: 4, labels: { pl: 'tata', en: 'dad' } },
  { key: 'family_grandma', level: 4, labels: { pl: 'babcia', en: 'grandma' } },
  { key: 'family_grandpa', level: 4, labels: { pl: 'dziadek', en: 'grandpa' } },
  { key: 'family_brother', level: 4, labels: { pl: 'brat', en: 'brother' } },
  { key: 'family_sister', level: 4, labels: { pl: 'siostra', en: 'sister' } },
  { key: 'family_baby', level: 4, labels: { pl: 'dziecko', en: 'baby' } },
  { key: 'family_friend', level: 4, labels: { pl: 'przyjaciel', en: 'friend' } },
  { key: 'family_dog', level: 4, labels: { pl: 'pies', en: 'dog' } },
  { key: 'family_cat', level: 4, labels: { pl: 'kot', en: 'cat' } },
  { key: 'place_home', level: 5, labels: { pl: 'dom', en: 'home' } },
  { key: 'place_school', level: 5, labels: { pl: 'szkoła', en: 'school' } },
  { key: 'place_play', level: 5, labels: { pl: 'baw się', en: 'play' } },
  { key: 'place_sleep', level: 5, labels: { pl: 'śpij', en: 'sleep' } },
  { key: 'place_read', level: 5, labels: { pl: 'czytaj', en: 'read' } },
  { key: 'place_today', level: 5, labels: { pl: 'dzisiaj', en: 'today' } },
  { key: 'place_tomorrow', level: 5, labels: { pl: 'jutro', en: 'tomorrow' } },
  { key: 'place_good', level: 5, labels: { pl: 'dobrze', en: 'good' } },
  { key: 'place_bad', level: 5, labels: { pl: 'źle', en: 'bad' } },
  { key: 'place_love', level: 5, labels: { pl: 'kocham cię', en: 'I love you' } },
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

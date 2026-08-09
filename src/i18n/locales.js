const DEFAULT_LOCALE = 'pl';

const SUPPORTED_LOCALES = ['pl', 'en', 'it'];

const LOCALE_META = {
  pl: {
    label: 'Polski',
    htmlLang: 'pl',
    speechLang: 'pl-PL',
    flag: '🇵🇱',
  },
  en: {
    label: 'English',
    htmlLang: 'en',
    speechLang: 'en-US',
    flag: '🇬🇧',
  },
  it: {
    label: 'Italiano',
    htmlLang: 'it',
    speechLang: 'it-IT',
    flag: '🇮🇹',
  },
};

function isSupportedLocale(locale) {
  return SUPPORTED_LOCALES.includes(locale);
}

function normalizeLocale(locale) {
  if (!locale || typeof locale !== 'string') {
    return DEFAULT_LOCALE;
  }

  const short = locale.toLowerCase().split('-')[0];
  return isSupportedLocale(short) ? short : DEFAULT_LOCALE;
}

function getSpeechLang(locale) {
  const normalized = normalizeLocale(locale);
  return LOCALE_META[normalized].speechLang;
}

function getHtmlLang(locale) {
  const normalized = normalizeLocale(locale);
  return LOCALE_META[normalized].htmlLang;
}

export {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  LOCALE_META,
  isSupportedLocale,
  normalizeLocale,
  getSpeechLang,
  getHtmlLang,
};

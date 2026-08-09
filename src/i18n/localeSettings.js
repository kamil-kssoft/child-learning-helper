import { DEFAULT_LOCALE, normalizeLocale } from './locales';

const APP_LOCALE_KEY = 'appLocale';

function getStoredLocale() {
  try {
    return normalizeLocale(localStorage.getItem(APP_LOCALE_KEY));
  } catch {
    return DEFAULT_LOCALE;
  }
}

function setStoredLocale(locale) {
  const normalized = normalizeLocale(locale);
  try {
    localStorage.setItem(APP_LOCALE_KEY, normalized);
  } catch {
    // ignore quota / private mode failures
  }
  return normalized;
}

export { APP_LOCALE_KEY, getStoredLocale, setStoredLocale };

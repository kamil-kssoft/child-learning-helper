import { DEFAULT_LOCALE, normalizeLocale } from './locales';
import pl from './ui/pl';
import en from './ui/en';
import it from './ui/it';

const UI_MESSAGES = {
  pl,
  en,
  it,
};

function interpolate(template, params = {}) {
  if (!template) return '';
  return String(template).replace(/\{(\w+)\}/g, (_, key) => {
    if (params[key] === undefined || params[key] === null) {
      return '';
    }
    return String(params[key]);
  });
}

function translate(locale, key, params = {}) {
  const normalized = normalizeLocale(locale);
  const messages = UI_MESSAGES[normalized] || UI_MESSAGES[DEFAULT_LOCALE];
  const fallback = UI_MESSAGES[DEFAULT_LOCALE];
  const template = messages[key] ?? fallback[key] ?? key;
  return interpolate(template, params);
}

function resolveLocalizedValue(value, locale, fallbackLocale = DEFAULT_LOCALE) {
  if (value == null) return '';
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value);
  }

  if (typeof value !== 'object') {
    return String(value);
  }

  const normalized = normalizeLocale(locale);
  if (value[normalized] != null) {
    return String(value[normalized]);
  }

  const fallback = normalizeLocale(fallbackLocale);
  if (value[fallback] != null) {
    return String(value[fallback]);
  }

  const first = Object.values(value).find((entry) => entry != null);
  return first != null ? String(first) : '';
}

export { UI_MESSAGES, interpolate, translate, resolveLocalizedValue };

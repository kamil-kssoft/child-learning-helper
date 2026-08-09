import { DEFAULT_LOCALE } from './locales';
import { APP_LOCALE_KEY, getStoredLocale, setStoredLocale } from './localeSettings';

describe('localeSettings', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('defaults to Polish when nothing is stored', () => {
    expect(getStoredLocale()).toBe(DEFAULT_LOCALE);
  });

  test('persists and reads a supported locale', () => {
    expect(setStoredLocale('en')).toBe('en');
    expect(localStorage.getItem(APP_LOCALE_KEY)).toBe('en');
    expect(getStoredLocale()).toBe('en');
  });

  test('normalizes unsupported values to default', () => {
    expect(setStoredLocale('it')).toBe(DEFAULT_LOCALE);
    expect(getStoredLocale()).toBe(DEFAULT_LOCALE);
  });
});

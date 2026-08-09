import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_LOCALE, LOCALE_META, SUPPORTED_LOCALES, getHtmlLang, normalizeLocale } from './locales';
import { getStoredLocale, setStoredLocale } from './localeSettings';
import { translate } from './translate';

const LocaleContext = createContext({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: (key, params) => translate(DEFAULT_LOCALE, key, params),
  supportedLocales: SUPPORTED_LOCALES,
  localeMeta: LOCALE_META,
});

function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(() => getStoredLocale());

  const setLocale = useCallback((nextLocale) => {
    setLocaleState(setStoredLocale(nextLocale));
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = getHtmlLang(locale);
    }
  }, [locale]);

  const t = useCallback(
    (key, params) => translate(locale, key, params),
    [locale]
  );

  const value = useMemo(
    () => ({
      locale: normalizeLocale(locale),
      setLocale,
      t,
      supportedLocales: SUPPORTED_LOCALES,
      localeMeta: LOCALE_META,
    }),
    [locale, setLocale, t]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

function useLocale() {
  return useContext(LocaleContext);
}

function useT() {
  return useLocale().t;
}

export { LocaleProvider, useLocale, useT };

import { useLocale } from '../i18n/LocaleContext';
import './LanguageSwitcher.css';

function LanguageSwitcher() {
  const { locale, setLocale, supportedLocales, localeMeta, t } = useLocale();

  return (
    <div className="language-switcher" role="group" aria-label={t('menu.language')}>
      <span className="language-switcher-label">{t('menu.language')}</span>
      <div className="language-switcher-flags">
        {supportedLocales.map((code) => {
          const selected = code === locale;
          const meta = localeMeta[code];
          return (
            <button
              key={code}
              type="button"
              className={`language-switcher-flag${selected ? ' is-selected' : ''}`}
              aria-label={meta?.label || code}
              aria-pressed={selected}
              title={meta?.label || code}
              onClick={() => setLocale(code)}
            >
              <span className="language-switcher-flag-emoji" aria-hidden="true">
                {meta?.flag || code}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default LanguageSwitcher;

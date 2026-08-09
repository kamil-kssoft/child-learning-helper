import { useLocale } from '../i18n/LocaleContext';
import './LanguageSwitcher.css';

function LanguageSwitcher() {
  const { locale, setLocale, supportedLocales, localeMeta, t } = useLocale();

  return (
    <div className="language-switcher" role="group" aria-label={t('menu.language')}>
      <span className="language-switcher-label">{t('menu.language')}</span>
      <div className="language-switcher-buttons">
        {supportedLocales.map((code) => {
          const selected = code === locale;
          return (
            <button
              key={code}
              type="button"
              className={`language-switcher-button${selected ? ' is-selected' : ''}`}
              aria-pressed={selected}
              onClick={() => setLocale(code)}
            >
              {localeMeta[code]?.label || code}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default LanguageSwitcher;

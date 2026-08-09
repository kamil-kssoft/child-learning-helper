import { useT } from '../i18n/LocaleContext';
import './SoundUnlockBanner.css';

function SoundUnlockBanner({ onUnlock, isUnlocking }) {
  const t = useT();
  return (
    <div className="sound-unlock-overlay" role="dialog" aria-modal="true" aria-label={t('unlock.aria')}>
      <div className="sound-unlock-panel">
        <p className="sound-unlock-title">{t('unlock.title')}</p>
        <p className="sound-unlock-text">{t('unlock.text')}</p>
        <button
          type="button"
          className="sound-unlock-button"
          onClick={onUnlock}
          disabled={isUnlocking}
        >
          {isUnlocking ? t('unlock.loading') : t('unlock.button')}
        </button>
      </div>
    </div>
  );
}

export default SoundUnlockBanner;

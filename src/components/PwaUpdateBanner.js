import { usePwaUpdate } from '../hooks/usePwaUpdate';
import { useT } from '../i18n/LocaleContext';
import './PwaUpdateBanner.css';

function PwaUpdateBanner() {
  const t = useT();
  const { needsUpdate, refresh } = usePwaUpdate();

  if (!needsUpdate) {
    return null;
  }

  return (
    <div className="pwa-update-banner" role="alert">
      <span className="pwa-update-banner-text">{t('pwa.update.text')}</span>
      <button
        type="button"
        className="pwa-update-banner-button"
        onClick={refresh}
      >
        {t('pwa.update.button')}
      </button>
    </div>
  );
}

export default PwaUpdateBanner;

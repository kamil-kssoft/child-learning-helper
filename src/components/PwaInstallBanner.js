import { usePwaInstall } from '../hooks/usePwaInstall';
import { useT } from '../i18n/LocaleContext';
import './PwaInstallBanner.css';

function PwaInstallBanner() {
  const t = useT();
  const { canShowBanner, canPromptInstall, iosDevice, promptInstall, dismiss } =
    usePwaInstall();

  if (!canShowBanner) {
    return null;
  }

  return (
    <section className="pwa-install-banner" aria-label={t('pwa.install.aria')}>
      <div className="pwa-install-banner-content">
        {iosDevice && !canPromptInstall ? (
          <p className="pwa-install-banner-text">{t('pwa.install.ios')}</p>
        ) : (
          <p className="pwa-install-banner-text">{t('pwa.install.generic')}</p>
        )}
        <div className="pwa-install-banner-actions">
          {canPromptInstall && (
            <button
              type="button"
              className="pwa-install-banner-button"
              onClick={promptInstall}
            >
              {t('pwa.install.button')}
            </button>
          )}
          <button
            type="button"
            className="pwa-install-banner-dismiss"
            onClick={dismiss}
            aria-label={t('pwa.install.dismiss')}
          >
            ✕
          </button>
        </div>
      </div>
    </section>
  );
}

export default PwaInstallBanner;

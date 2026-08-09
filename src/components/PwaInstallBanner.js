import { usePwaInstall } from '../hooks/usePwaInstall';
import './PwaInstallBanner.css';

function PwaInstallBanner() {
  const { canShowBanner, canPromptInstall, iosDevice, promptInstall, dismiss } =
    usePwaInstall();

  if (!canShowBanner) {
    return null;
  }

  return (
    <section className="pwa-install-banner" aria-label="Instalacja aplikacji">
      <div className="pwa-install-banner-content">
        {iosDevice && !canPromptInstall ? (
          <p className="pwa-install-banner-text">
            Dotknij Udostępnij, potem Dodaj do ekranu początkowego
          </p>
        ) : (
          <p className="pwa-install-banner-text">
            Zainstaluj aplikację na urządzeniu
          </p>
        )}
        <div className="pwa-install-banner-actions">
          {canPromptInstall && (
            <button
              type="button"
              className="pwa-install-banner-button"
              onClick={promptInstall}
            >
              Zainstaluj
            </button>
          )}
          <button
            type="button"
            className="pwa-install-banner-dismiss"
            onClick={dismiss}
            aria-label="Zamknij"
          >
            ✕
          </button>
        </div>
      </div>
    </section>
  );
}

export default PwaInstallBanner;

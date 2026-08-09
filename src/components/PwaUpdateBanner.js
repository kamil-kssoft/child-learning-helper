import { usePwaUpdate } from '../hooks/usePwaUpdate';
import './PwaUpdateBanner.css';

function PwaUpdateBanner() {
  const { needsUpdate, refresh } = usePwaUpdate();

  if (!needsUpdate) {
    return null;
  }

  return (
    <div className="pwa-update-banner" role="alert">
      <span className="pwa-update-banner-text">
        Dostępna nowa wersja aplikacji
      </span>
      <button
        type="button"
        className="pwa-update-banner-button"
        onClick={refresh}
      >
        Odśwież
      </button>
    </div>
  );
}

export default PwaUpdateBanner;

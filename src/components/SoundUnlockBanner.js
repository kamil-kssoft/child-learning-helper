import './SoundUnlockBanner.css';

function SoundUnlockBanner({ onUnlock, isUnlocking }) {
  return (
    <div className="sound-unlock-overlay" role="dialog" aria-modal="true" aria-label="Włącz dźwięk">
      <div className="sound-unlock-panel">
        <p className="sound-unlock-title">🔊 Włącz dźwięk</p>
        <p className="sound-unlock-text">
          Aby usłyszeć nazwy i komunikaty, tapnij przycisk poniżej. Przeglądarka wymaga
          jednego tapnięcia, żeby zezwolić na odtwarzanie dźwięku.
        </p>
        <button
          type="button"
          className="sound-unlock-button"
          onClick={onUnlock}
          disabled={isUnlocking}
        >
          {isUnlocking ? 'Włączanie…' : 'Tapnij, żeby włączyć dźwięk'}
        </button>
      </div>
    </div>
  );
}

export default SoundUnlockBanner;

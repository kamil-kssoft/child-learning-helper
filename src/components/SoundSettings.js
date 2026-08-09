import { useState, useEffect } from 'react';
import BackButton from './BackButton';
import SoundPermissionMessage from './SoundPermissionMessage';
import { useAudio } from '../hooks/useAudio';
import {
  DEFAULT_SPEECH_RATE,
  getSoundEnabled,
  setSoundEnabled,
  getSpeechRate,
  setSpeechRate,
  setAudioUnlocked,
} from '../utils/audioSettings';
import './SoundSettings.css';

const TEST_PHRASE = 'To jest test dźwięku. Wszystko działa poprawnie.';

function SoundSettings() {
  const [soundEnabled, setSoundEnabledLocal] = useState(() => getSoundEnabled());
  const [speechRate, setSpeechRateLocal] = useState(() => getSpeechRate());
  const [isTesting, setIsTesting] = useState(false);
  const { speak, unlockAudio, playSuccess, permissionIssue, clearPermissionIssue } = useAudio();

  useEffect(() => {
    setSoundEnabled(soundEnabled);
    if (!soundEnabled) {
      setAudioUnlocked(false);
      clearPermissionIssue();
    }
  }, [soundEnabled, clearPermissionIssue]);

  useEffect(() => {
    setSpeechRate(speechRate);
  }, [speechRate]);

  const handleSoundToggle = async (enabled) => {
    setSoundEnabledLocal(enabled);
    if (enabled) {
      await unlockAudio();
    }
  };

  const handleTest = async () => {
    setIsTesting(true);
    clearPermissionIssue();

    const unlockResult = await unlockAudio();
    if (!unlockResult?.ok) {
      setIsTesting(false);
      return;
    }

    await speak(TEST_PHRASE);
    playSuccess();
    setIsTesting(false);
  };

  return (
    <div className="sound-settings-container">
      <BackButton />
      <h1 className="sound-settings-title">🔊 Ustawienia dźwięku</h1>

      <div className="sound-settings-panel">
        <label className="sound-settings-label">
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={(e) => handleSoundToggle(e.target.checked)}
          />
          Dźwięk włączony
        </label>

        {soundEnabled && (
          <label className="sound-settings-label sound-settings-label-column">
            <span>Tempo mowy: {speechRate.toFixed(2)}</span>
            <input
              type="range"
              className="speech-rate-slider"
              min="0.5"
              max="1.2"
              step="0.05"
              value={speechRate}
              onChange={(e) => setSpeechRateLocal(Number(e.target.value))}
            />
          </label>
        )}

        {soundEnabled && (
          <button
            type="button"
            className="sound-settings-test-button"
            onClick={handleTest}
            disabled={isTesting}
          >
            {isTesting ? 'Odtwarzanie…' : 'Testuj dźwięk'}
          </button>
        )}

        {soundEnabled && (
          <SoundPermissionMessage
            issue={permissionIssue}
            onDismiss={clearPermissionIssue}
          />
        )}

        {!soundEnabled && (
          <p className="sound-settings-hint">
            Włącz dźwięk, aby usłyszeć nazwy podczas nauki i quizów.
          </p>
        )}
      </div>
    </div>
  );
}

export default SoundSettings;

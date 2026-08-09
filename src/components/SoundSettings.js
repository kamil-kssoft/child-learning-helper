import { useState, useEffect } from 'react';
import BackButton from './BackButton';
import SoundPermissionMessage from './SoundPermissionMessage';
import LanguageSwitcher from './LanguageSwitcher';
import { useAudio } from '../hooks/useAudio';
import { useT } from '../i18n/LocaleContext';
import {
  getSoundEnabled,
  setSoundEnabled,
  getSpeechRate,
  setSpeechRate,
  setAudioUnlocked,
} from '../utils/audioSettings';
import './SoundSettings.css';

function SoundSettings() {
  const t = useT();
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

    await speak(t('sound.testPhrase'));
    playSuccess();
    setIsTesting(false);
  };

  return (
    <div className="sound-settings-container">
      <BackButton />
      <h1 className="sound-settings-title">{t('sound.title')}</h1>

      <div className="sound-settings-panel">
        <LanguageSwitcher />

        <label className="sound-settings-label">
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={(e) => handleSoundToggle(e.target.checked)}
          />
          {t('sound.enabled')}
        </label>

        {soundEnabled && (
          <label className="sound-settings-label sound-settings-label-column">
            <span>{t('sound.rate', { rate: speechRate.toFixed(2) })}</span>
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
            {isTesting ? t('sound.testing') : t('sound.test')}
          </button>
        )}

        {soundEnabled && (
          <SoundPermissionMessage
            issue={permissionIssue}
            onDismiss={clearPermissionIssue}
          />
        )}

        {!soundEnabled && (
          <p className="sound-settings-hint">{t('sound.hint')}</p>
        )}
      </div>
    </div>
  );
}

export default SoundSettings;

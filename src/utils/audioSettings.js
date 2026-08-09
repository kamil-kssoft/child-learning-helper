const DEFAULT_SPEECH_RATE = 0.85;
const AUDIO_UNLOCKED_KEY = 'audioUnlocked';

function isAudioUnlocked() {
  try {
    return sessionStorage.getItem(AUDIO_UNLOCKED_KEY) === 'true';
  } catch {
    return false;
  }
}

function setAudioUnlocked(unlocked) {
  try {
    if (unlocked) {
      sessionStorage.setItem(AUDIO_UNLOCKED_KEY, 'true');
    } else {
      sessionStorage.removeItem(AUDIO_UNLOCKED_KEY);
    }
  } catch {
    // ignore
  }
}

function getSoundEnabled() {
  try {
    return JSON.parse(localStorage.getItem('soundEnabled') ?? 'true');
  } catch {
    return true;
  }
}

function setSoundEnabled(enabled) {
  localStorage.setItem('soundEnabled', JSON.stringify(enabled));
}

function getSpeechRate() {
  try {
    const rate = JSON.parse(localStorage.getItem('speechRate') ?? String(DEFAULT_SPEECH_RATE));
    return typeof rate === 'number' && rate >= 0.5 && rate <= 1.5 ? rate : DEFAULT_SPEECH_RATE;
  } catch {
    return DEFAULT_SPEECH_RATE;
  }
}

function setSpeechRate(rate) {
  localStorage.setItem('speechRate', JSON.stringify(rate));
}

export {
  AUDIO_UNLOCKED_KEY,
  DEFAULT_SPEECH_RATE,
  getSoundEnabled,
  setSoundEnabled,
  getSpeechRate,
  setSpeechRate,
  isAudioUnlocked,
  setAudioUnlocked,
};

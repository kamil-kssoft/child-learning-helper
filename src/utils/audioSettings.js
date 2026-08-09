const DEFAULT_SPEECH_RATE = 0.85;

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
  DEFAULT_SPEECH_RATE,
  getSoundEnabled,
  setSoundEnabled,
  getSpeechRate,
  setSpeechRate,
};

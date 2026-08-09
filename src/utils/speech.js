const LEARN_SILENCE_MS = 700;
const SPEAK_TIMEOUT_MS = 4000;
const VOICES_WAIT_MS = 400;

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getSpeechSynthesis() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }
  return window.speechSynthesis;
}

function waitForVoices(speechSynthesis, waitMs = VOICES_WAIT_MS) {
  const existing = speechSynthesis.getVoices();
  if (existing.length > 0) {
    return Promise.resolve(existing);
  }

  return new Promise((resolve) => {
    let settled = false;
    const finish = (voices) => {
      if (settled) return;
      settled = true;
      speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
      clearTimeout(timeoutId);
      resolve(voices);
    };

    const onVoicesChanged = () => {
      finish(speechSynthesis.getVoices());
    };

    speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
    const timeoutId = setTimeout(() => {
      finish(speechSynthesis.getVoices());
    }, waitMs);

    // Some engines only populate voices after an explicit getVoices() call.
    speechSynthesis.getVoices();
  });
}

function pickPolishVoice(voices) {
  if (!voices || voices.length === 0) return null;
  return (
    voices.find((voice) => voice.lang && voice.lang.toLowerCase() === 'pl-pl') ||
    voices.find((voice) => voice.lang && voice.lang.toLowerCase().startsWith('pl')) ||
    null
  );
}

/**
 * Call from a click/tap handler so Brave/Chrome grant autoplay for speech + Web Audio.
 * Does not require microphone permission — only a user gesture (and site sound allowed).
 */
function unlockAudioPlayback() {
  const speechSynthesis = getSpeechSynthesis();
  if (speechSynthesis && typeof SpeechSynthesisUtterance !== 'undefined') {
    try {
      speechSynthesis.cancel();
      if (speechSynthesis.paused) {
        speechSynthesis.resume();
      }
      // Silent utterance during a tap unlocks autoplay for later speak() calls
      // (needed in Brave/Chrome; no microphone permission is involved).
      const warmup = new SpeechSynthesisUtterance(' ');
      warmup.volume = 0;
      warmup.rate = 2;
      speechSynthesis.speak(warmup);
    } catch {
      // ignore unlock failures
    }
  }

  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      // Close immediately — useAudio creates its own context later.
      if (typeof ctx.close === 'function') {
        ctx.close();
      }
    }
  } catch {
    // ignore unlock failures
  }
}

/**
 * Speak text via the Web Speech API.
 * Always settles, even on older phones where speak() can hang without onend/onerror.
 */
function speakText(text, { enabled = true, rate = 0.85, timeoutMs = SPEAK_TIMEOUT_MS } = {}) {
  if (!text) {
    return Promise.resolve();
  }

  if (!enabled) {
    return Promise.resolve();
  }

  const speechSynthesis = getSpeechSynthesis();
  if (!speechSynthesis) {
    return delay(LEARN_SILENCE_MS);
  }

  return new Promise((resolve) => {
    let settled = false;
    let speakDelayId = null;

    const finish = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      if (speakDelayId !== null) {
        clearTimeout(speakDelayId);
      }
      resolve();
    };

    const timeoutId = setTimeout(finish, timeoutMs);

    const queueUtterance = (voices) => {
      if (settled) return;

      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pl-PL';
        utterance.rate = rate;
        utterance.pitch = 1.1;

        const polishVoice = pickPolishVoice(voices);
        if (polishVoice) {
          utterance.voice = polishVoice;
        }

        utterance.onend = finish;
        utterance.onerror = finish;

        // Yield after cancel() — older Chrome often drops the next speak() otherwise.
        speakDelayId = setTimeout(() => {
          speakDelayId = null;
          if (settled) return;
          try {
            speechSynthesis.speak(utterance);
          } catch {
            finish();
          }
        }, 0);
      } catch {
        finish();
      }
    };

    try {
      // cancel() can leave Chrome/Android speechSynthesis paused; resume first.
      try {
        speechSynthesis.cancel();
        if (speechSynthesis.paused) {
          speechSynthesis.resume();
        }
      } catch {
        // ignore cancel/resume failures on limited engines
      }

      waitForVoices(speechSynthesis).then(queueUtterance, finish);
    } catch {
      finish();
    }
  });
}

export {
  LEARN_SILENCE_MS,
  SPEAK_TIMEOUT_MS,
  VOICES_WAIT_MS,
  unlockAudioPlayback,
  speakText,
  waitForVoices,
  pickPolishVoice,
};

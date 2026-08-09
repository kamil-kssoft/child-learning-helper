import {
  ISSUE_UNSUPPORTED,
  ISSUE_BLOCKED,
  issueFromSpeechError,
} from './audioPermissions';

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

function okResult() {
  return { ok: true, issue: null };
}

function issueResult(issue) {
  return { ok: false, issue };
}

/**
 * Call from a click/tap handler so Brave/Chrome grant autoplay for speech + Web Audio.
 * Returns any detected permission/capability issue.
 */
async function unlockAudioPlayback() {
  const speechSynthesis = getSpeechSynthesis();
  if (!speechSynthesis || typeof SpeechSynthesisUtterance === 'undefined') {
    return issueResult(ISSUE_UNSUPPORTED);
  }

  const probeIssue = await new Promise((resolve) => {
    let settled = false;
    let timeoutId = null;

    const finish = (issue) => {
      if (settled) return;
      settled = true;
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      resolve(issue);
    };

    try {
      speechSynthesis.cancel();
      if (speechSynthesis.paused) {
        speechSynthesis.resume();
      }

      const warmup = new SpeechSynthesisUtterance(' ');
      warmup.volume = 0;
      warmup.rate = 2;
      warmup.onend = () => finish(null);
      warmup.onerror = (event) => {
        finish(issueFromSpeechError(event?.error) || ISSUE_BLOCKED);
      };

      speechSynthesis.speak(warmup);

      // If the engine ignores the utterance with no events, treat as blocked.
      timeoutId = setTimeout(() => {
        const stuck = !speechSynthesis.speaking && !speechSynthesis.pending;
        finish(stuck ? ISSUE_BLOCKED : null);
      }, 700);
    } catch {
      finish(ISSUE_BLOCKED);
    }
  });

  return probeIssue ? issueResult(probeIssue) : okResult();
}

/**
 * Speak text via the Web Speech API.
 * Always settles, even on older phones where speak() can hang without onend/onerror.
 * Resolves to { ok, issue }.
 */
function speakText(text, { enabled = true, rate = 0.85, timeoutMs = SPEAK_TIMEOUT_MS } = {}) {
  if (!text) {
    return Promise.resolve(okResult());
  }

  if (!enabled) {
    return Promise.resolve(okResult());
  }

  const speechSynthesis = getSpeechSynthesis();
  if (!speechSynthesis) {
    return delay(LEARN_SILENCE_MS).then(() => issueResult(ISSUE_UNSUPPORTED));
  }

  return new Promise((resolve) => {
    let settled = false;
    let speakDelayId = null;
    let sawStart = false;

    const finish = (issue = null) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      clearTimeout(startWatchId);
      if (speakDelayId !== null) {
        clearTimeout(speakDelayId);
      }
      resolve(issue ? issueResult(issue) : okResult());
    };

    const timeoutId = setTimeout(() => {
      // Hang with no start often means autoplay/sound blocked.
      finish(sawStart ? null : ISSUE_BLOCKED);
    }, timeoutMs);

    const startWatchId = setTimeout(() => {
      if (settled) return;
      if (speechSynthesis.speaking || speechSynthesis.pending) {
        sawStart = true;
      }
    }, 250);

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

        utterance.onstart = () => {
          sawStart = true;
        };
        utterance.onend = () => finish(null);
        utterance.onerror = (event) => {
          const issue = issueFromSpeechError(event?.error);
          // canceled/interrupted while skipping should not look like a permission error
          finish(issue);
        };

        // Yield after cancel() — older Chrome often drops the next speak() otherwise.
        speakDelayId = setTimeout(() => {
          speakDelayId = null;
          if (settled) return;
          try {
            speechSynthesis.speak(utterance);
          } catch {
            finish(ISSUE_BLOCKED);
          }
        }, 0);
      } catch {
        finish(ISSUE_BLOCKED);
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

      waitForVoices(speechSynthesis).then(queueUtterance, () => finish(ISSUE_BLOCKED));
    } catch {
      finish(ISSUE_BLOCKED);
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

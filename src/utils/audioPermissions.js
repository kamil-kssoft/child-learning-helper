const ISSUE_UNSUPPORTED = 'unsupported';
const ISSUE_BLOCKED = 'blocked';
const ISSUE_NO_AUDIO = 'no-audio';

const MESSAGES = {
  [ISSUE_UNSUPPORTED]:
    'Ta przeglądarka nie obsługuje mowy. Dźwięk nie będzie działał.',
  [ISSUE_BLOCKED]:
    'Przeglądarka blokuje dźwięk. Zezwól tej stronie na dźwięk i autoplay (w Brave: ikona tarczy → ustawienia witryny). Mikrofon nie jest potrzebny.',
  [ISSUE_NO_AUDIO]:
    'Brak dostępu do dźwięku na tym urządzeniu. Sprawdź ustawienia dźwięku przeglądarki i systemu.',
};

function messageForIssue(issue) {
  if (!issue) return '';
  return MESSAGES[issue] || MESSAGES[ISSUE_BLOCKED];
}

function issueFromSpeechError(errorCode) {
  if (!errorCode) return null;
  if (errorCode === 'not-allowed') return ISSUE_BLOCKED;
  if (errorCode === 'synthesis-unavailable' || errorCode === 'audio-hardware') {
    return ISSUE_NO_AUDIO;
  }
  // canceled / interrupted are normal (user skip) — not permission problems
  return null;
}

async function queryAutoplayPermission() {
  if (typeof navigator === 'undefined' || !navigator.permissions?.query) {
    return null;
  }

  try {
    const status = await navigator.permissions.query({ name: 'autoplay' });
    return status?.state || null;
  } catch {
    return null;
  }
}

/**
 * Best-effort check for missing sound/autoplay capability or permission.
 * Returns an issue code or null when nothing obvious is wrong.
 */
async function detectAudioPermissionIssue() {
  if (typeof window === 'undefined') {
    return ISSUE_UNSUPPORTED;
  }

  if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
    return ISSUE_UNSUPPORTED;
  }

  const autoplay = await queryAutoplayPermission();
  if (autoplay === 'denied') {
    return ISSUE_BLOCKED;
  }

  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) {
      return ISSUE_NO_AUDIO;
    }

    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      try {
        await ctx.resume();
      } catch {
        // ignore
      }
    }

    const stillSuspended = ctx.state === 'suspended';
    if (typeof ctx.close === 'function') {
      try {
        await ctx.close();
      } catch {
        // ignore
      }
    }

    // Suspended after a user gesture usually means autoplay/sound is blocked.
    // Without a gesture, suspended is normal — caller should pass fromUnlock=true.
    if (stillSuspended) {
      return ISSUE_BLOCKED;
    }
  } catch {
    return ISSUE_NO_AUDIO;
  }

  return null;
}

export {
  ISSUE_UNSUPPORTED,
  ISSUE_BLOCKED,
  ISSUE_NO_AUDIO,
  MESSAGES,
  messageForIssue,
  issueFromSpeechError,
  queryAutoplayPermission,
  detectAudioPermissionIssue,
};

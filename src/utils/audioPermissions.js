import { translate } from '../i18n/translate';
import { DEFAULT_LOCALE } from '../i18n/locales';

const ISSUE_UNSUPPORTED = 'unsupported';
const ISSUE_BLOCKED = 'blocked';
const ISSUE_NO_AUDIO = 'no-audio';

const ISSUE_TO_UI_KEY = {
  [ISSUE_UNSUPPORTED]: 'permission.unsupported',
  [ISSUE_BLOCKED]: 'permission.blocked',
  [ISSUE_NO_AUDIO]: 'permission.noAudio',
};

/** @deprecated Prefer messageForIssue(issue, locale) */
const MESSAGES = {
  [ISSUE_UNSUPPORTED]: translate(DEFAULT_LOCALE, 'permission.unsupported'),
  [ISSUE_BLOCKED]: translate(DEFAULT_LOCALE, 'permission.blocked'),
  [ISSUE_NO_AUDIO]: translate(DEFAULT_LOCALE, 'permission.noAudio'),
};

function messageForIssue(issue, locale = DEFAULT_LOCALE) {
  if (!issue) return '';
  const key = ISSUE_TO_UI_KEY[issue] || ISSUE_TO_UI_KEY[ISSUE_BLOCKED];
  return translate(locale, key);
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

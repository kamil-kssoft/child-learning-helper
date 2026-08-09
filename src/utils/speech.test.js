import { speakText, SPEAK_TIMEOUT_MS, unlockAudioPlayback } from './speech';
import { ISSUE_BLOCKED, ISSUE_UNSUPPORTED } from './audioPermissions';

function createSpeechSynthesisMock({ hang = false, voices = [], error = null } = {}) {
  const listeners = {};
  const mock = {
    paused: false,
    speaking: false,
    pending: false,
    cancel: jest.fn(),
    resume: jest.fn(function resume() {
      this.paused = false;
    }),
    getVoices: jest.fn(() => voices),
    addEventListener: jest.fn((event, handler) => {
      listeners[event] = listeners[event] || [];
      listeners[event].push(handler);
    }),
    removeEventListener: jest.fn((event, handler) => {
      listeners[event] = (listeners[event] || []).filter((h) => h !== handler);
    }),
    speak: jest.fn(function speak(utterance) {
      if (hang) {
        // Older phones: speak() queues work but never fires onend/onerror.
        return;
      }
      if (error) {
        if (utterance.onerror) {
          utterance.onerror({ error });
        }
        return;
      }
      this.speaking = true;
      if (utterance.onstart) {
        utterance.onstart();
      }
      this.speaking = false;
      if (utterance.onend) {
        utterance.onend();
      }
    }),
    emit(event) {
      (listeners[event] || []).forEach((handler) => handler());
    },
  };
  return mock;
}

describe('speakText', () => {
  const OriginalUtterance = global.SpeechSynthesisUtterance;
  const OriginalAudioContext = window.AudioContext;

  beforeEach(() => {
    jest.useFakeTimers();
    global.SpeechSynthesisUtterance = function SpeechSynthesisUtterance(text) {
      this.text = text;
      this.lang = '';
      this.rate = 1;
      this.pitch = 1;
      this.volume = 1;
      this.voice = null;
      this.onend = null;
      this.onerror = null;
      this.onstart = null;
    };
    window.AudioContext = jest.fn(() => ({
      state: 'running',
      resume: jest.fn(async () => {}),
      close: jest.fn(async () => {}),
    }));
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    delete window.speechSynthesis;
    global.SpeechSynthesisUtterance = OriginalUtterance;
    window.AudioContext = OriginalAudioContext;
  });

  test('resolves even when speechSynthesis hangs without onend/onerror (older phones)', async () => {
    window.speechSynthesis = createSpeechSynthesisMock({
      hang: true,
      voices: [{ lang: 'pl-PL', name: 'Polish' }],
    });

    const promise = speakText('pies', { timeoutMs: 1000 });

    await Promise.resolve();
    jest.advanceTimersByTime(0);
    expect(window.speechSynthesis.speak).toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    await expect(promise).resolves.toEqual({ ok: false, issue: ISSUE_BLOCKED });
  });

  test('resolves on onend when speech works', async () => {
    window.speechSynthesis = createSpeechSynthesisMock({
      hang: false,
      voices: [{ lang: 'pl-PL', name: 'Polish' }],
    });

    const promise = speakText('kot', { timeoutMs: SPEAK_TIMEOUT_MS });

    await Promise.resolve();
    jest.advanceTimersByTime(0);

    await expect(promise).resolves.toEqual({ ok: true, issue: null });
  });

  test('returns immediately when sound is disabled', async () => {
    window.speechSynthesis = createSpeechSynthesisMock({ hang: true });
    await expect(speakText('pies', { enabled: false })).resolves.toEqual({
      ok: true,
      issue: null,
    });
    expect(window.speechSynthesis.speak).not.toHaveBeenCalled();
  });

  test('reports blocked when speech errors with not-allowed', async () => {
    window.speechSynthesis = createSpeechSynthesisMock({
      error: 'not-allowed',
      voices: [{ lang: 'pl-PL', name: 'Polish' }],
    });

    const promise = speakText('dom', { timeoutMs: SPEAK_TIMEOUT_MS });
    await Promise.resolve();
    jest.advanceTimersByTime(0);

    await expect(promise).resolves.toEqual({ ok: false, issue: ISSUE_BLOCKED });
  });

  test('unlockAudioPlayback speaks a silent utterance on user gesture (Brave/Chrome)', async () => {
    window.speechSynthesis = createSpeechSynthesisMock({
      voices: [{ lang: 'pl-PL', name: 'Polish' }],
    });

    const promise = unlockAudioPlayback();
    await Promise.resolve();
    jest.advanceTimersByTime(0);

    expect(window.speechSynthesis.speak).toHaveBeenCalled();
    const utterance = window.speechSynthesis.speak.mock.calls[0][0];
    expect(utterance.volume).toBe(0);

    await expect(promise).resolves.toEqual({ ok: true, issue: null });
  });

  test('unlockAudioPlayback reports unsupported without speechSynthesis', async () => {
    delete window.speechSynthesis;
    await expect(unlockAudioPlayback()).resolves.toEqual({
      ok: false,
      issue: ISSUE_UNSUPPORTED,
    });
  });

  test('resumes paused synthesis after cancel (Chrome/Android quirk)', async () => {
    const synth = createSpeechSynthesisMock({
      hang: false,
      voices: [{ lang: 'pl-PL', name: 'Polish' }],
    });
    synth.paused = true;
    synth.cancel = jest.fn(function cancel() {
      this.paused = true;
    });
    window.speechSynthesis = synth;

    const promise = speakText('dom', { timeoutMs: SPEAK_TIMEOUT_MS });

    await Promise.resolve();
    jest.advanceTimersByTime(0);

    await expect(promise).resolves.toEqual({ ok: true, issue: null });
    expect(synth.cancel).toHaveBeenCalled();
    expect(synth.resume).toHaveBeenCalled();
  });
});

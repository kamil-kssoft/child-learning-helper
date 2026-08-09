import { speakText, SPEAK_TIMEOUT_MS } from './speech';

function createSpeechSynthesisMock({ hang = false, voices = [] } = {}) {
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
    speak: jest.fn((utterance) => {
      if (hang) {
        // Older phones: speak() queues work but never fires onend/onerror.
        return;
      }
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

  beforeEach(() => {
    jest.useFakeTimers();
    global.SpeechSynthesisUtterance = function SpeechSynthesisUtterance(text) {
      this.text = text;
      this.lang = '';
      this.rate = 1;
      this.pitch = 1;
      this.voice = null;
      this.onend = null;
      this.onerror = null;
    };
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    delete window.speechSynthesis;
    global.SpeechSynthesisUtterance = OriginalUtterance;
  });

  test('resolves even when speechSynthesis hangs without onend/onerror (older phones)', async () => {
    window.speechSynthesis = createSpeechSynthesisMock({
      hang: true,
      voices: [{ lang: 'pl-PL', name: 'Polish' }],
    });

    const promise = speakText('pies', { timeoutMs: 1000 });

    // Flush waitForVoices microtask, then the post-cancel speak delay.
    await Promise.resolve();
    jest.advanceTimersByTime(0);
    expect(window.speechSynthesis.speak).toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    await expect(promise).resolves.toBeUndefined();
  });

  test('resolves on onend when speech works', async () => {
    window.speechSynthesis = createSpeechSynthesisMock({
      hang: false,
      voices: [{ lang: 'pl-PL', name: 'Polish' }],
    });

    const promise = speakText('kot', { timeoutMs: SPEAK_TIMEOUT_MS });

    await Promise.resolve();
    jest.advanceTimersByTime(0);

    await expect(promise).resolves.toBeUndefined();
  });

  test('returns immediately when sound is disabled', async () => {
    window.speechSynthesis = createSpeechSynthesisMock({ hang: true });
    await expect(speakText('pies', { enabled: false })).resolves.toBeUndefined();
    expect(window.speechSynthesis.speak).not.toHaveBeenCalled();
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

    await expect(promise).resolves.toBeUndefined();
    expect(synth.cancel).toHaveBeenCalled();
    expect(synth.resume).toHaveBeenCalled();
  });
});

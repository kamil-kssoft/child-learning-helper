import {
  ISSUE_BLOCKED,
  ISSUE_UNSUPPORTED,
  issueFromSpeechError,
  messageForIssue,
  detectAudioPermissionIssue,
} from './audioPermissions';

describe('audioPermissions', () => {
  const OriginalAudioContext = window.AudioContext;
  const OriginalSpeechSynthesis = window.speechSynthesis;

  afterEach(() => {
    window.AudioContext = OriginalAudioContext;
    if (OriginalSpeechSynthesis === undefined) {
      delete window.speechSynthesis;
    } else {
      window.speechSynthesis = OriginalSpeechSynthesis;
    }
    delete window.SpeechSynthesisUtterance;
  });

  test('issueFromSpeechError maps not-allowed to blocked', () => {
    expect(issueFromSpeechError('not-allowed')).toBe(ISSUE_BLOCKED);
    expect(issueFromSpeechError('canceled')).toBeNull();
    expect(issueFromSpeechError('interrupted')).toBeNull();
  });

  test('messageForIssue returns Polish guidance for blocked sound', () => {
    const message = messageForIssue(ISSUE_BLOCKED);
    expect(message).toMatch(/blokuje dźwięk/i);
    expect(message).toMatch(/autoplay/i);
  });

  test('detectAudioPermissionIssue reports unsupported without speech API', async () => {
    delete window.speechSynthesis;
    delete window.SpeechSynthesisUtterance;
    await expect(detectAudioPermissionIssue()).resolves.toBe(ISSUE_UNSUPPORTED);
  });

  test('detectAudioPermissionIssue reports blocked when AudioContext stays suspended', async () => {
    window.speechSynthesis = {};
    window.SpeechSynthesisUtterance = function SpeechSynthesisUtterance() {};
    window.AudioContext = jest.fn(() => ({
      state: 'suspended',
      resume: jest.fn(async () => {}),
      close: jest.fn(async () => {}),
    }));

    await expect(detectAudioPermissionIssue()).resolves.toBe(ISSUE_BLOCKED);
  });
});

import { useCallback, useRef, useState } from 'react';
import {
  getSoundEnabled,
  getSpeechRate,
  isAudioUnlocked,
  setAudioUnlocked,
} from '../utils/audioSettings';
import { ISSUE_BLOCKED, ISSUE_NO_AUDIO } from '../utils/audioPermissions';
import { speakText, unlockAudioPlayback } from '../utils/speech';
import { useLocale } from '../i18n/LocaleContext';
import { getSpeechLang } from '../i18n/locales';

function playTone(audioContext, frequency, startTime, duration, type = 'sine', volume = 0.3) {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gainNode.gain.setValueAtTime(volume, startTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
}

export function useAudio() {
  const { locale } = useLocale();
  const speechLang = getSpeechLang(locale);
  const audioContextRef = useRef(null);
  const [permissionIssue, setPermissionIssue] = useState(null);
  const [audioUnlocked, setAudioUnlockedState] = useState(() => isAudioUnlocked());

  const clearPermissionIssue = useCallback(() => {
    setPermissionIssue(null);
  }, []);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);

  const speak = useCallback(async (text) => {
    const result = await speakText(text, {
      enabled: getSoundEnabled(),
      rate: getSpeechRate(),
      lang: speechLang,
    });

    if (result?.issue) {
      setPermissionIssue(result.issue);
    } else if (result?.ok) {
      setPermissionIssue(null);
    }

    return result;
  }, [speechLang]);

  const unlockAudio = useCallback(async () => {
    const result = await unlockAudioPlayback();
    if (result?.issue) {
      setPermissionIssue(result.issue);
    } else if (result?.ok) {
      setAudioUnlocked(true);
      setAudioUnlockedState(true);
      setPermissionIssue(null);
    }
    return result;
  }, []);

  const playSuccess = useCallback(() => {
    if (!getSoundEnabled()) return;

    try {
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') {
        setPermissionIssue(ISSUE_BLOCKED);
        return;
      }
      const now = ctx.currentTime;
      playTone(ctx, 523, now, 0.15);
      playTone(ctx, 659, now + 0.15, 0.15);
      playTone(ctx, 784, now + 0.3, 0.25);
    } catch {
      setPermissionIssue(ISSUE_NO_AUDIO);
    }
  }, [getAudioContext]);

  const playWrong = useCallback(() => {
    if (!getSoundEnabled()) return;

    try {
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') {
        setPermissionIssue(ISSUE_BLOCKED);
        return;
      }
      const now = ctx.currentTime;
      playTone(ctx, 220, now, 0.3, 'triangle', 0.2);
    } catch {
      setPermissionIssue(ISSUE_NO_AUDIO);
    }
  }, [getAudioContext]);

  return {
    speak,
    playSuccess,
    playWrong,
    unlockAudio,
    audioUnlocked,
    permissionIssue,
    clearPermissionIssue,
    soundEnabled: getSoundEnabled(),
  };
}

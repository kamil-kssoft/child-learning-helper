import { useCallback, useRef } from 'react';
import { getSoundEnabled, getSpeechRate } from '../utils/audioSettings';

const LEARN_SILENCE_MS = 700;

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

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function useAudio() {
  const audioContextRef = useRef(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);

  const speak = useCallback((text) => {
    if (!text) {
      return Promise.resolve();
    }

    if (!getSoundEnabled()) {
      return delay(LEARN_SILENCE_MS);
    }

    if (!('speechSynthesis' in window)) {
      return delay(LEARN_SILENCE_MS);
    }

    return new Promise((resolve) => {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pl-PL';
      utterance.rate = getSpeechRate();
      utterance.pitch = 1.1;
      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      window.speechSynthesis.speak(utterance);
    });
  }, []);

  const playSuccess = useCallback(() => {
    if (!getSoundEnabled()) return;

    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      playTone(ctx, 523, now, 0.15);
      playTone(ctx, 659, now + 0.15, 0.15);
      playTone(ctx, 784, now + 0.3, 0.25);
    } catch {
      // Audio not available
    }
  }, [getAudioContext]);

  const playWrong = useCallback(() => {
    if (!getSoundEnabled()) return;

    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      playTone(ctx, 220, now, 0.3, 'triangle', 0.2);
    } catch {
      // Audio not available
    }
  }, [getAudioContext]);

  return { speak, playSuccess, playWrong };
}

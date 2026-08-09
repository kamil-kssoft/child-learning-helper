import { useCallback, useRef } from 'react';
import { getSoundEnabled, getSpeechRate } from '../utils/audioSettings';
import { speakText } from '../utils/speech';

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
    return speakText(text, {
      enabled: getSoundEnabled(),
      rate: getSpeechRate(),
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

  return { speak, playSuccess, playWrong, soundEnabled: getSoundEnabled() };
}

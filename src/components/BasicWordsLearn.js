import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useLocale, useT } from '../i18n/LocaleContext';
import {
  WORDS_PER_LEVEL,
  getBasicWordsForLevel,
  getSourceLabel,
  getTargetLabel,
  getSpeechLangForDir,
  isValidBasicWordsDir,
  getLevelProgressKey,
} from '../config/basicWords';
import { shuffleArray } from '../utils/arrayUtils';
import { getSoundEnabled, getSpeechRate } from '../utils/audioSettings';
import { speakText } from '../utils/speech';
import { useLearningProgress } from '../hooks/useLearningProgress';
import BackButton from './BackButton';
import ProgressBar from './ProgressBar';
import SoundPermissionMessage from './SoundPermissionMessage';
import SoundUnlockBanner from './SoundUnlockBanner';
import { useAudio } from '../hooks/useAudio';
import './BaseItem.css';
import './ProgressBar.css';
import './BasicWords.css';

const STEP_SOURCE = 'source';
const STEP_REVEAL = 'reveal';
const STEP_TARGET_AUDIO = 'target_audio';

function buildWordOrder(levelItems, randomize) {
  const list = [...levelItems];
  return randomize ? shuffleArray(list) : list;
}

function BasicWordsLearn() {
  const t = useT();
  const { locale } = useLocale();
  const [searchParams] = useSearchParams();
  const dir = searchParams.get('dir') || '';
  const level = parseInt(searchParams.get('level') || '0', 10);
  const randomize = searchParams.get('randomize') === '1';

  const levelItems = useMemo(() => getBasicWordsForLevel(level), [level]);
  const [wordOrder, setWordOrder] = useState(() => buildWordOrder(levelItems, randomize));
  const [wordIndex, setWordIndex] = useState(0);
  const [step, setStep] = useState(STEP_SOURCE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const { markComplete } = useLearningProgress();
  const progressKey = useMemo(() => getLevelProgressKey(dir, level), [dir, level]);
  const speakCancelRef = useRef(false);

  const {
    unlockAudio,
    audioUnlocked,
    permissionIssue,
    clearPermissionIssue,
  } = useAudio();

  const soundEnabled = getSoundEnabled();
  const needsUnlock = soundEnabled && !audioUnlocked;
  const currentItem = wordOrder[wordIndex];
  const showTarget = step === STEP_REVEAL || step === STEP_TARGET_AUDIO;
  const sessionCurrent = wordIndex + 1;
  const sessionTotal = WORDS_PER_LEVEL;

  const sessionProgressClass = [
    'session-progress',
    soundEnabled && permissionIssue ? 'session-progress-below-alert' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const speakWithLang = useCallback(async (text, lang) => {
    if (!text || !soundEnabled) return;
    setIsSpeaking(true);
    speakCancelRef.current = false;
    const result = await speakText(text, {
      enabled: soundEnabled,
      rate: getSpeechRate(),
      lang,
    });
    if (!speakCancelRef.current) {
      setIsSpeaking(false);
    }
    return result;
  }, [soundEnabled]);

  useEffect(() => {
    setWordOrder(buildWordOrder(levelItems, randomize));
    setWordIndex(0);
    setStep(STEP_SOURCE);
  }, [levelItems, randomize, dir, level]);

  useEffect(() => {
    if (!currentItem || step !== STEP_SOURCE) return;
    if (!soundEnabled || !audioUnlocked) return;

    let cancelled = false;
    const timer = setTimeout(() => {
      speakWithLang(getSourceLabel(currentItem, dir), getSpeechLangForDir(dir, 'source')).then(
        () => {
          if (!cancelled) setIsSpeaking(false);
        }
      );
    }, 300);

    return () => {
      cancelled = true;
      speakCancelRef.current = true;
      clearTimeout(timer);
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
    };
  }, [currentItem, step, dir, soundEnabled, audioUnlocked, speakWithLang]);

  useEffect(() => {
    if (!currentItem || step !== STEP_TARGET_AUDIO) return;
    if (!soundEnabled || !audioUnlocked) return;

    let cancelled = false;
    const timer = setTimeout(() => {
      speakWithLang(getTargetLabel(currentItem, dir), getSpeechLangForDir(dir, 'target')).then(
        () => {
          if (!cancelled) setIsSpeaking(false);
        }
      );
    }, 100);

    return () => {
      cancelled = true;
      speakCancelRef.current = true;
      clearTimeout(timer);
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
    };
  }, [currentItem, step, dir, soundEnabled, audioUnlocked, speakWithLang]);

  const advanceWord = useCallback(() => {
    const nextIndex = wordIndex + 1;
    if (nextIndex >= wordOrder.length) {
      setWordOrder(buildWordOrder(levelItems, randomize));
      setWordIndex(0);
    } else {
      setWordIndex(nextIndex);
    }
    setStep(STEP_SOURCE);
  }, [wordIndex, wordOrder.length, levelItems, randomize]);

  const handleTileClick = useCallback(() => {
    if (!currentItem) return;
    if (soundEnabled && isSpeaking) return;

    if (step === STEP_SOURCE) {
      setStep(STEP_REVEAL);
      return;
    }

    if (step === STEP_REVEAL) {
      setStep(STEP_TARGET_AUDIO);
      return;
    }

    if (step === STEP_TARGET_AUDIO) {
      markComplete(progressKey, currentItem.key);
      advanceWord();
    }
  }, [
    currentItem,
    soundEnabled,
    isSpeaking,
    step,
    markComplete,
    progressKey,
    advanceWord,
  ]);

  const handleUnlockAudio = useCallback(async () => {
    setIsUnlocking(true);
    await unlockAudio();
    setIsUnlocking(false);
  }, [unlockAudio]);

  if (locale === 'pl' || !isValidBasicWordsDir(dir, locale)) {
    return <Navigate to="/menu" replace />;
  }

  if (level < 1 || level > 5 || levelItems.length === 0) {
    return <Navigate to={`/basic-words?dir=${dir}&randomize=${randomize ? 1 : 0}`} replace />;
  }

  const tileWaiting = soundEnabled && isSpeaking;

  return (
    <div className="basic-words-container">
      <BackButton />

      {needsUnlock && (
        <SoundUnlockBanner onUnlock={handleUnlockAudio} isUnlocking={isUnlocking} />
      )}

      {soundEnabled && permissionIssue && !needsUnlock && (
        <div className="sound-permission-banner">
          <SoundPermissionMessage
            issue={permissionIssue}
            onDismiss={clearPermissionIssue}
          />
        </div>
      )}

      <ProgressBar
        className={sessionProgressClass}
        value={sessionCurrent}
        max={sessionTotal}
        showLabel
        label={t('progress.session', { current: sessionCurrent, total: sessionTotal })}
      />

      <div className="basic-words-tiles">
        <div
          onClick={handleTileClick}
          className={`basic-words-tile base-item-tile ${tileWaiting ? 'tile-waiting' : ''}`}
        >
          <span className="basic-words-source">
            {getSourceLabel(currentItem, dir)}
          </span>
          <span
            className={`basic-words-target ${showTarget ? '' : 'basic-words-target-hidden'}`}
          >
            {getTargetLabel(currentItem, dir)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BasicWordsLearn;

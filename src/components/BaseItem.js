import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { generateArrayWithSubitems } from '../utils/arrayUtils';
import { useAudio } from '../hooks/useAudio';
import { useT } from '../i18n/LocaleContext';
import BackButton from './BackButton';
import Feedback from './Feedback';
import ProgressBar from './ProgressBar';
import SoundPermissionMessage from './SoundPermissionMessage';
import SoundUnlockBanner from './SoundUnlockBanner';
import { useLearningProgress } from '../hooks/useLearningProgress';
import { getProgressKey } from '../utils/learningProgress';
import './Feedback.css';
import './ProgressBar.css';
import './BaseItem.css';

export function BaseItem({ values, style, renderContent, getItemLabel, categoryLabel = '' }) {
  const t = useT();
  const queryParams = new URLSearchParams(window.location.search);
  const requestedTilesCount = parseInt(queryParams.get('count') || '1', 10);
  const randomize = queryParams.get('randomize') === '1';
  const tilesCount = Math.min(requestedTilesCount, values.length);
  const isQuizMode = tilesCount > 1;

  const [currentSequences, setCurrentSequences] = useState([]);
  const [currentSequenceIdx, setCurrentSequenceIdx] = useState(0);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [wrongTileIdx, setWrongTileIdx] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const {
    speak,
    playSuccess,
    playWrong,
    unlockAudio,
    audioUnlocked,
    soundEnabled,
    permissionIssue,
    clearPermissionIssue,
  } = useAudio();
  const feedbackTimeoutRef = useRef(null);
  const { markComplete } = useLearningProgress();
  const progressKey = useMemo(() => getProgressKey(), []);

  const labelFor = useCallback(
    (item) => (getItemLabel ? getItemLabel(item) : String(item)),
    [getItemLabel]
  );

  const quizPromptSpeech = useCallback((label) => label, []);

  const generateValues = useCallback(() => {
    if (values.length < 2 && requestedTilesCount > 1) return;
    if (values.length === 0) return;

    const currentSet = generateArrayWithSubitems(values, tilesCount, randomize);
    setCurrentSequences(currentSet);
    setCurrentSequenceIdx(0);
    if (isQuizMode) {
      setCorrectIndex(Math.floor(Math.random() * tilesCount));
    }
  }, [values, tilesCount, randomize, isQuizMode, requestedTilesCount]);

  useEffect(() => {
    generateValues();
  }, [generateValues]);

  const currentItems = useMemo(
    () => currentSequences[currentSequenceIdx] || [],
    [currentSequences, currentSequenceIdx]
  );
  const correctItem = currentItems[correctIndex];
  const correctLabel = correctItem ? labelFor(correctItem) : '';
  const learnItem = currentItems[0];

  useEffect(() => {
    if (isQuizMode || !learnItem || !soundEnabled || !audioUnlocked) return;

    let cancelled = false;
    setIsAdvancing(true);

    const timer = setTimeout(async () => {
      await speak(labelFor(learnItem));
      if (!cancelled) setIsAdvancing(false);
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      window.speechSynthesis?.cancel();
      setIsAdvancing(false);
    };
  }, [currentSequenceIdx, learnItem, isQuizMode, soundEnabled, audioUnlocked, speak, labelFor]);

  useEffect(() => {
    if (soundEnabled && audioUnlocked && isQuizMode && correctItem) {
      const timer = setTimeout(() => {
        speak(quizPromptSpeech(labelFor(correctItem)));
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [
    isQuizMode,
    correctItem,
    currentSequenceIdx,
    correctIndex,
    soundEnabled,
    audioUnlocked,
    speak,
    labelFor,
    quizPromptSpeech,
  ]);

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, []);

  const recordTaskComplete = useCallback(
    (item) => {
      if (item != null) {
        markComplete(progressKey, item);
      }
    },
    [markComplete, progressKey]
  );

  const advanceToNext = useCallback(() => {
    if (currentSequenceIdx < currentSequences.length - 1) {
      setCurrentSequenceIdx((prev) => prev + 1);
      if (isQuizMode) {
        setCorrectIndex(Math.floor(Math.random() * tilesCount));
      }
      return;
    }
    generateValues();
  }, [currentSequenceIdx, currentSequences.length, isQuizMode, tilesCount, generateValues]);

  const showFeedback = useCallback((type, onDone) => {
    setFeedback(type);
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
    }
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback(null);
      setWrongTileIdx(null);
      setIsLocked(false);
      if (onDone) onDone();
    }, type === 'success' ? 1200 : 800);
  }, []);

  const handleLearnClick = useCallback(() => {
    if (currentItems.length === 0) return;

    // Allow tap-to-skip while announcing. On older phones speechSynthesis can
    // hang without onend; without this the tile stays locked forever.
    if (isAdvancing) {
      window.speechSynthesis?.cancel();
    }

    recordTaskComplete(learnItem);
    advanceToNext();
  }, [isAdvancing, currentItems, learnItem, recordTaskComplete, advanceToNext]);

  const handleQuizClick = useCallback(
    (tileIdx) => {
      if (isLocked || !correctItem) return;

      if (tileIdx === correctIndex) {
        setIsLocked(true);
        if (soundEnabled) {
          speak(t('feedback.success'));
          playSuccess();
        }
        recordTaskComplete(correctItem);
        showFeedback('success', advanceToNext);
      } else {
        setWrongTileIdx(tileIdx);
        if (soundEnabled) {
          speak(t('feedback.wrongSpeech'));
          playWrong();
        }
        showFeedback('wrong');
      }
    },
    [
      isLocked,
      correctItem,
      correctIndex,
      soundEnabled,
      speak,
      playSuccess,
      playWrong,
      showFeedback,
      recordTaskComplete,
      advanceToNext,
      t,
    ]
  );

  const sessionProgressClass = [
    'session-progress',
    isQuizMode ? 'session-progress-below-prompt' : '',
    soundEnabled && permissionIssue ? 'session-progress-below-alert' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const sessionCurrent = currentSequences.length > 0 ? currentSequenceIdx + 1 : 0;
  const sessionTotal = currentSequences.length;

  const handleTileClick = isQuizMode ? handleQuizClick : () => handleLearnClick();

  const handleUnlockAudio = useCallback(async () => {
    setIsUnlocking(true);
    await unlockAudio();
    setIsUnlocking(false);
  }, [unlockAudio]);

  const needsUnlock = soundEnabled && !audioUnlocked;

  if (values.length === 0) {
    return (
      <div className="base-item-container">
        <BackButton />
        <p className="base-item-message">{t('base.empty')}</p>
      </div>
    );
  }

  if (requestedTilesCount > 1 && values.length < 2) {
    return (
      <div className="base-item-container">
        <BackButton />
        <p className="base-item-message">{t('base.quizTooFew')}</p>
      </div>
    );
  }

  return (
    <div className="base-item-container">
      <BackButton />
      <Feedback type={feedback} />

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

      {isQuizMode && correctLabel && (
        <div className={`quiz-prompt${soundEnabled && permissionIssue ? ' quiz-prompt-below-alert' : ''}`}>
          <strong>{correctLabel}</strong>
        </div>
      )}

      {sessionTotal > 0 && (
        <ProgressBar
          className={sessionProgressClass}
          value={sessionCurrent}
          max={sessionTotal}
          showLabel
          label={t('progress.session', { current: sessionCurrent, total: sessionTotal })}
        />
      )}

      <div
        className="base-item-tiles"
        style={{
          paddingTop: isQuizMode ? '80px' : '60px',
          ...style,
        }}
      >
        {currentItems.length > 0 &&
          Array.from(Array(tilesCount), (_, idx) => {
            const currentItem = currentItems[idx];
            const { content, style: itemStyle } = renderContent(currentItem);
            const isWrong = wrongTileIdx === idx;
            const isCorrect = feedback === 'success' && idx === correctIndex;

            return (
              <div
                key={`${currentSequenceIdx}-${currentItem}`}
                onClick={() => handleTileClick(idx)}
                className={`base-item-tile ${isWrong ? 'tile-wrong' : ''} ${isCorrect ? 'tile-correct' : ''} ${!isQuizMode && isAdvancing ? 'tile-waiting' : ''}`}
                style={itemStyle}
              >
                {content}
              </div>
            );
          })}
      </div>
    </div>
  );
}

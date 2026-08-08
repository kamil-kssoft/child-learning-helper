import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { generateArrayWithSubitems } from '../utils/arrayUtils';
import { useAudio } from '../hooks/useAudio';
import BackButton from './BackButton';
import Feedback from './Feedback';
import './Feedback.css';
import './BaseItem.css';

function buildQuizPrompt(label, categoryLabel) {
  if (categoryLabel) {
    return `Znajdź ${categoryLabel}: ${label}`;
  }
  return `Znajdź ${label}`;
}

export function BaseItem({ values, style, renderContent, getItemLabel, categoryLabel = '' }) {
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

  const { speak, playSuccess, playWrong } = useAudio();
  const feedbackTimeoutRef = useRef(null);

  const labelFor = useCallback(
    (item) => (getItemLabel ? getItemLabel(item) : String(item)),
    [getItemLabel]
  );

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
    if (!isQuizMode && learnItem) {
      const timer = setTimeout(() => {
        speak(labelFor(learnItem));
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentSequenceIdx, learnItem, isQuizMode, speak, labelFor]);

  useEffect(() => {
    if (isQuizMode && correctItem) {
      const timer = setTimeout(() => {
        speak(buildQuizPrompt(labelFor(correctItem), categoryLabel));
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isQuizMode, correctItem, currentSequenceIdx, correctIndex, speak, labelFor, categoryLabel]);

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, []);

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

  const handleLearnClick = useCallback(async () => {
    if (isAdvancing || currentItems.length === 0) return;

    setIsAdvancing(true);
    try {
      await speak(labelFor(currentItems[0]));
      advanceToNext();
    } finally {
      setIsAdvancing(false);
    }
  }, [isAdvancing, currentItems, speak, labelFor, advanceToNext]);

  const handleQuizClick = useCallback(
    (tileIdx) => {
      if (isLocked || !correctItem) return;

      if (tileIdx === correctIndex) {
        setIsLocked(true);
        speak('Brawo!');
        playSuccess();
        showFeedback('success', advanceToNext);
      } else {
        setWrongTileIdx(tileIdx);
        speak('Spróbuj jeszcze raz');
        playWrong();
        showFeedback('wrong');
      }
    },
    [isLocked, correctItem, correctIndex, speak, playSuccess, playWrong, showFeedback, advanceToNext]
  );

  const handleTileClick = isQuizMode ? handleQuizClick : () => handleLearnClick();

  if (values.length === 0) {
    return (
      <div className="base-item-container">
        <BackButton />
        <p className="base-item-message">Brak elementów do nauki.</p>
      </div>
    );
  }

  if (requestedTilesCount > 1 && values.length < 2) {
    return (
      <div className="base-item-container">
        <BackButton />
        <p className="base-item-message">
          Za mało elementów do quizu. Wyłącz tryb quizu w menu.
        </p>
      </div>
    );
  }

  return (
    <div className="base-item-container">
      <BackButton />
      <Feedback type={feedback} />

      {isQuizMode && correctLabel && (
        <div className="quiz-prompt">
          Znajdź{categoryLabel ? ` ${categoryLabel}` : ''}: <strong>{correctLabel}</strong>
        </div>
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

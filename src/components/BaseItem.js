import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { generateArrayWithSubitems } from '../utils/arrayUtils';
import { useAudio } from '../hooks/useAudio';
import BackButton from './BackButton';
import Feedback from './Feedback';
import './Feedback.css';
import './BaseItem.css';

export function BaseItem({ values, style, renderContent, getItemLabel, categoryLabel = '' }) {
  const queryParams = new URLSearchParams(window.location.search);
  const tilesCount = parseInt(queryParams.get('count') || '1', 10);
  const randomize = queryParams.get('randomize') === '1';
  const isQuizMode = tilesCount > 1;

  const [currentSequences, setCurrentSequences] = useState([]);
  const [currentSequenceIdx, setCurrentSequenceIdx] = useState(0);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [wrongTileIdx, setWrongTileIdx] = useState(null);
  const [isLocked, setIsLocked] = useState(false);

  const { speak, playSuccess, playWrong } = useAudio();
  const feedbackTimeoutRef = useRef(null);

  const labelFor = useCallback(
    (item) => (getItemLabel ? getItemLabel(item) : String(item)),
    [getItemLabel]
  );

  const generateValues = useCallback(() => {
    if (values.length < tilesCount) return;
    const currentSet = generateArrayWithSubitems(values, tilesCount, randomize);
    setCurrentSequences(currentSet);
    setCurrentSequenceIdx(0);
    if (isQuizMode) {
      setCorrectIndex(Math.floor(Math.random() * tilesCount));
    }
  }, [values, tilesCount, randomize, isQuizMode]);

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
        speak(`Znajdź ${labelFor(correctItem)}`);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isQuizMode, correctItem, currentSequenceIdx, correctIndex, speak, labelFor]);

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

  const handleLearnClick = useCallback(() => {
    if (currentItems.length > 0) {
      speak(labelFor(currentItems[0]));
    }
    advanceToNext();
  }, [currentItems, speak, labelFor, advanceToNext]);

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

  return (
    <div className="base-item-container">
      <BackButton />
      <Feedback type={feedback} />

      {isQuizMode && correctLabel && (
        <div className="quiz-prompt">
          Znajdź: <strong>{correctLabel}</strong>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          flex: 1,
          width: '100%',
          padding: '20px',
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
                key={idx}
                onClick={() => handleTileClick(idx)}
                className={`${isWrong ? 'tile-wrong' : ''} ${isCorrect ? 'tile-correct' : ''}`}
                style={{
                  flex: '1 1 calc(200px)',
                  maxWidth: '400px',
                  maxHeight: '400px',
                  minWidth: '200px',
                  minHeight: '200px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 'min(20vw, 20vh)',
                  cursor: 'pointer',
                  userSelect: 'none',
                  border: '3px solid #ccc',
                  borderRadius: '16px',
                  backgroundColor: '#f8f9fa',
                  overflow: 'hidden',
                  ...itemStyle,
                }}
              >
                {content}
              </div>
            );
          })}
      </div>
    </div>
  );
}

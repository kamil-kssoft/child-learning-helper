import { useState, useEffect } from 'react';
import { generateArrayWithSubitems, shuffleArray } from '../utils/arrayUtils';

export function BaseItem({ values, style, renderContent }) {
  // Get count from URL params, default to 2
  const queryParams = new URLSearchParams(window.location.search);
  const tilesCount = parseInt(queryParams.get('count') || '2', 10);
  const randomize = queryParams.get('randomize') === '1';

  const [currentSequences, setCurrentSequences] = useState([]);
  const [currentSequenceIdx, setCurrentSequenceIdx] = useState(0);

  function generateValues() {
    if (values.length < tilesCount) return;
    const currentSet = generateArrayWithSubitems(values, tilesCount, randomize);
    console.log(currentSet);
    setCurrentSequences(currentSet);
    setCurrentSequenceIdx(0);
  }

  useEffect(() => {
    generateValues();
  }, [values, tilesCount, randomize]);

  function handleClick() {
    if (currentSequenceIdx < currentSequences.length - 1) {
      const nextSequenceIdx = currentSequenceIdx + 1;
      setCurrentSequenceIdx(nextSequenceIdx);
      return;
    }
    generateValues();
    setCurrentSequenceIdx(0);
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        height: '100vh',
        width: '100vw',
        padding: '20px',
        ...style
      }}
    >
      {currentSequences && currentSequences.length > 0 && Array.from(Array(tilesCount), (e, idx) => {
        const currentItem = currentSequences[currentSequenceIdx][idx];
        const { content, style: itemStyle } = renderContent(currentItem);

        return (
          <div
            key={idx}
            onClick={() => handleClick()}
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
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor: '#f8f9fa',
              overflow: 'hidden',
              ...itemStyle
            }}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}
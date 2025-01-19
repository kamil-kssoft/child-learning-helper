import { useState, useEffect } from 'react';
import { shuffleArray } from '../utils/arrayUtils';

export function BaseQuiz({ values, style }) {
  // Get count from URL params, default to 2
  const queryParams = new URLSearchParams(window.location.search);
  const squareCount = parseInt(queryParams.get('count') || '2', 10);

  const [currentValues, setCurrentValues] = useState([]);

  function generateValues() {
    if (values.length < squareCount) return;
    // Shuffle all values and take first N
    const shuffled = shuffleArray([...values]);
    const selected = shuffled.slice(0, squareCount);
    setCurrentValues(selected);
  }

  useEffect(() => {
    generateValues();
  }, [values, squareCount]);

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
      {currentValues.map((value, idx) => (
        <div
          key={idx}
          onClick={generateValues}
          style={{
            flex: '1 1 calc(200px)',
            maxWidth: '400px',
            maxHeight: '400px',
            minWidth: '150px',
            minHeight: '150px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 'min(10vw, 10vh)',
            cursor: 'pointer',
            userSelect: 'none',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#f8f9fa'
          }}
        >
          {value}
        </div>
      ))}
    </div>
  );
}
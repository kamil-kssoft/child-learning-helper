import { useState, useEffect } from 'react';

function LearnQuiz() {
  const getValueSet = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const start = urlParams.get('start');
    const stop = urlParams.get('stop');

    // If no start/stop provided, return range 1-10
    if (!start || !stop) {
      return Array.from({length: 10}, (_, i) => String(i + 1));
    }

    // Handle numeric ranges
    if (!isNaN(start) && !isNaN(stop)) {
      const startNum = parseInt(start);
      const stopNum = parseInt(stop);
      return Array.from(
        {length: stopNum - startNum + 1},
        (_, i) => String(startNum + i)
      );
    }

    // Handle single character ranges
    if (start.length === 1 && stop.length === 1) {
      const startCode = start.charCodeAt(0);
      const stopCode = stop.charCodeAt(0);
      return Array.from(
        {length: stopCode - startCode + 1},
        (_, i) => String.fromCharCode(startCode + i)
      );
    }

    // Handle word lists (comma-separated)
    return start.split(',').map(word => word.trim());
  };

  const values = getValueSet();

  const [leftValue, setLeftValue] = useState(() => {
    // Initialize with a random value
    const index = Math.floor(Math.random() * values.length);
    return values[index];
  });
  const [rightValue, setRightValue] = useState(() => {
    // Initialize with a different random value
    const availableValues = values.filter(v => v !== leftValue);
    const index = Math.floor(Math.random() * availableValues.length);
    return availableValues[index];
  });

  const updateBothValues = () => {
    // Get available values and create a copy
    const availableValues = values.filter(v => v !== leftValue && v !== rightValue);

    // Get random index for left value
    const leftIndex = Math.floor(Math.random() * availableValues.length);
    const newLeftValue = availableValues[leftIndex];

    // Remove the selected value from available values
    const remainingValues = availableValues.filter(v => v !== newLeftValue);

    // Get random index for right value from remaining values
    const rightIndex = Math.floor(Math.random() * remainingValues.length);
    const newRightValue = remainingValues[rightIndex];

    setLeftValue(newLeftValue);
    setRightValue(newRightValue);
  };

  useEffect(() => {
    updateBothValues();
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        width: '90vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        padding: '20px'
      }}
    >
      <div
        onClick={updateBothValues}
        className="clickable-cell"
        style={{
          flex: 1,
          height: '100%',
          maxHeight: '600px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 'min(20vw, 20vh)',
          lineHeight: '1',
          textAlign: 'center'
        }}
      >
        {leftValue}
      </div>
      <div
        onClick={updateBothValues}
        className="clickable-cell"
        style={{
          flex: 1,
          height: '100%',
          maxHeight: '600px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 'min(20vw, 20vh)',
          lineHeight: '1',
          textAlign: 'center'
        }}
      >
        {rightValue}
      </div>
    </div>
  );
}

export default LearnQuiz;
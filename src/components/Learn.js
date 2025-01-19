import { useState, useEffect } from 'react';

function Learn() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentValue, setCurrentValue] = useState(null);
  const [randomizedValues, setRandomizedValues] = useState([]);

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

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const getRandomValue = () => {
    if (randomizedValues.length === 0) {
      const newRandomized = shuffleArray(values.filter(v => v !== currentValue));
      setRandomizedValues(newRandomized);
      return newRandomized[0];
    }

    const [nextValue, ...remaining] = randomizedValues;
    setRandomizedValues(remaining);
    return nextValue;
  };

  const values = getValueSet();
  const shouldRandomize = new URLSearchParams(window.location.search).get('randomize') === '1';

  const getNextValue = () => {
    const nextIndex = (currentIndex + 1) % values.length;
    setCurrentIndex(nextIndex);
    return values[nextIndex];
  };

  const handleOverlayClick = () => {
    setCurrentValue(shouldRandomize ? getRandomValue() : getNextValue());
  };

  useEffect(() => {
    if (shouldRandomize) {
      setRandomizedValues(shuffleArray(values));
    }
    setCurrentValue(values[0]);
  }, []);

  return (
    <div className="app">
      <table>
        <tbody>
          <tr>
            <td onClick={handleOverlayClick} className="clickable-cell">
              {currentValue}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Learn;
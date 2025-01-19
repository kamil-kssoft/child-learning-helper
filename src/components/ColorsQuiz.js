import { useState, useEffect } from 'react';
import { ColorSquare } from './BaseColors';
import { colors } from '../config/colors'; // to access the complete color list
import { shuffleArray } from '../utils/arrayUtils'; // or any shuffle helper you already have

function ColorsQuiz() {
  const queryParams = new URLSearchParams(window.location.search);
  const squareCount = parseInt(queryParams.get('count') || '2', 10);

  // Use a single state array to store all colors
  const [colorStates, setColorStates] = useState(Array(squareCount).fill(''));

  // Update all colors at once
  const updateAllColors = () => {
    // Filter out current colors from the available options
    const availableColors = colors.filter(color => !colorStates.includes(color));

    // If we've used all colors, reset to full color list
    const colorPool = availableColors.length < squareCount ? [...colors] : availableColors;

    // Shuffle and select new colors
    const shuffled = shuffleArray(colorPool);
    const newColors = shuffled.slice(0, squareCount);

    setColorStates(newColors);
  };

  // Initialize colors on component mount
  useEffect(() => {
    updateAllColors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        padding: '20px'
      }}
    >
      {colorStates.map((color, idx) => (
        <ColorSquare
          key={idx}
          color={color}
          onClick={updateAllColors}
          style={{
            flex: '1 1 calc(200px)',
            maxWidth: '400px',
            maxHeight: '400px',
            minWidth: '150px',
            minHeight: '150px'
          }}
        />
      ))}
    </div>
  );
}

export default ColorsQuiz;
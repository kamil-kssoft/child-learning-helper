import { useState, useEffect } from 'react';
import { useColorManagement, ColorSquare } from './BaseColors';

function ColorsQuiz() {
  const leftColor = useColorManagement();
  const rightColor = useColorManagement();

  const updateBothColors = () => {
    // Get available colors and create a copy
    const availableColors = [...leftColor.getAvailableColors()];

    // Get random index for left color
    const leftIndex = Math.floor(Math.random() * availableColors.length);
    leftColor.setColor(availableColors[leftIndex]);

    // Remove the selected color from available colors
    availableColors.splice(leftIndex, 1);

    // Get random index for right color from remaining colors
    const rightIndex = Math.floor(Math.random() * availableColors.length);
    rightColor.setColor(availableColors[rightIndex]);
  };

  useEffect(() => {
    updateBothColors();
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
      <ColorSquare
        color={leftColor.currentColor}
        onClick={updateBothColors}
        style={{ flex: 1, height: '100%', maxHeight: '600px', width: '100%' }}
      />
      <ColorSquare
        color={rightColor.currentColor}
        onClick={updateBothColors}
        style={{ flex: 1, height: '100%', maxHeight: '600px', width: '100%' }}
      />
    </div>
  );
}

export default ColorsQuiz;
import { useState, useEffect } from 'react';

function Colors() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const colors = [
    '#FF0000', // Red
    '#00FF00', // Green
    '#0000FF', // Blue
    '#FFFF00', // Yellow
    '#FFFFFF', // White
    '#000000', // Black
    '#FFA500'  // Orange
  ];

  const getNextColor = () => {
    const nextIndex = (currentIndex + 1) % colors.length;
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    document.body.style.backgroundColor = colors[currentIndex];
    // Cleanup when component unmounts
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [currentIndex]);

  return (
    <div
      className="app"
      onClick={getNextColor}
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
    </div>
  );
}

export default Colors;
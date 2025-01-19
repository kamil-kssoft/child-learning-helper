import { useState, useEffect } from 'react';
import { colors } from '../config/colors';

export function useColorManagement(initialIndex = 0) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const getNextColor = () => {
    const nextIndex = Math.floor(Math.random() * colors.length);
    setCurrentIndex(nextIndex);
  };

  return {
    currentColor: colors[currentIndex],
    getNextColor,
    getAvailableColors: () => colors.filter(color => color !== colors[currentIndex]),
    setColor: (color) => {
      const index = colors.indexOf(color);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  };
}

export const ColorSquare = ({ color, onClick, size = '200px', style = {} }) => (
  <div
    onClick={onClick}
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      cursor: 'pointer',
      border: '1px solid black',
      ...style
    }}
  />
);
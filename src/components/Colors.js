import { useEffect } from 'react';
import { useColorManagement, ColorSquare } from './BaseColors';

function Colors() {
  const { currentColor, getNextColor } = useColorManagement();

  useEffect(() => {
    document.body.style.backgroundColor = currentColor;
    // Cleanup when component unmounts
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [currentColor]);

  return (
      <ColorSquare
        color={currentColor}
        onClick={getNextColor}
        className="app"
        style={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '0'
      }}
    />
  );
}

export default Colors;
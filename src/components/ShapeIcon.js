function ShapeIcon({ shape }) {
  const size = 'min(18vw, 18vh)';

  if (shape === 'star') {
    return <span style={{ color: '#f1c40f', fontSize: size }}>⭐</span>;
  }

  if (shape === 'heart') {
    return <span style={{ color: '#e74c3c', fontSize: size }}>❤️</span>;
  }

  if (shape === 'triangle') {
    return (
      <div
        style={{
          width: size,
          height: size,
          backgroundColor: '#f39c12',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        }}
      />
    );
  }

  const shapeStyles = {
    circle: { borderRadius: '50%', backgroundColor: '#4a90d9', width: size, height: size },
    square: { backgroundColor: '#e74c3c', width: size, height: size },
    rectangle: {
      backgroundColor: '#9b59b6',
      width: 'min(25vw, 25vh)',
      height: 'min(14vw, 14vh)',
    },
  };

  return <div style={shapeStyles[shape]} />;
}

export default ShapeIcon;

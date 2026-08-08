function ShapeIcon({ shape }) {
  if (shape === 'star') {
    return <span style={{ color: '#f1c40f', fontSize: 'min(18vw, 18vh)' }}>⭐</span>;
  }

  if (shape === 'heart') {
    return <span style={{ color: '#e74c3c', fontSize: 'min(18vw, 18vh)' }}>❤️</span>;
  }

  if (shape === 'triangle') {
    return (
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: '70px solid transparent',
          borderRight: '70px solid transparent',
          borderBottom: '120px solid #f39c12',
        }}
      />
    );
  }

  const shapeStyles = {
    circle: { borderRadius: '50%', backgroundColor: '#4a90d9' },
    square: { backgroundColor: '#e74c3c' },
    rectangle: { backgroundColor: '#9b59b6', width: '70%', height: '45%' },
  };

  return (
    <div
      style={{
        width: '60%',
        height: '60%',
        ...shapeStyles[shape],
      }}
    />
  );
}

export default ShapeIcon;

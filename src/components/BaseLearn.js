import { useState, useEffect } from 'react';

export function BaseLearn({ values, shouldRandomize = false, randomizerFn, style }) {
  const [index, setIndex] = useState(0);
  const [currentValue, setCurrentValue] = useState(null);

  useEffect(() => {
    setCurrentValue(values[0]);
  }, [values]);

  const handleClick = () => {
    if (shouldRandomize) {
      setCurrentValue(randomizerFn(values));
    } else {
      setIndex((prev) => (prev + 1) % values.length);
      setCurrentValue(values[index]);
    }
  };

  return (
    <div style={style} onClick={handleClick}>
      {currentValue}
    </div>
  );
}
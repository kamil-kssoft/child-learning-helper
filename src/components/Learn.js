import { BaseLearn } from './BaseLearn';
import { useValueSet } from '../hooks/useValueSet';
import { shuffleArray } from '../utils/arrayUtils';

function Learn() {
  const values = useValueSet();
  const shouldRandomize = new URLSearchParams(window.location.search).get('randomize') === '1';

  const randomizerFn = (arr) => {
    // Example: pick a random from a shuffled array
    const shuffled = shuffleArray(arr);
    return shuffled[0];
  };

  return (
    <div style={{ /* container styles */ }}>
      <BaseLearn
        values={values}
        shouldRandomize={shouldRandomize}
        randomizerFn={randomizerFn}
        style={{
          fontSize: 'min(80vw, 80vh)',
          textAlign: 'center',
          userSelect: 'none'
        }}
      />
    </div>
  );
}

export default Learn;
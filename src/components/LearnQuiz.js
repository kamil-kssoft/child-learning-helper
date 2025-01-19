import { useValueSet } from '../hooks/useValueSet';
import { BaseQuiz } from './BaseQuiz';

function LearnQuiz() {
  const values = useValueSet();

  return (
    <BaseQuiz
      values={values}
      style={{
        display: 'flex',
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    />
  );
}

export default LearnQuiz;
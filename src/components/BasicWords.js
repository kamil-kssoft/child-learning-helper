import { useSearchParams } from 'react-router-dom';
import BasicWordsLevels from './BasicWordsLevels';
import BasicWordsLearn from './BasicWordsLearn';

function BasicWords() {
  const [searchParams] = useSearchParams();
  const level = searchParams.get('level');

  if (level) {
    return <BasicWordsLearn />;
  }

  return <BasicWordsLevels />;
}

export default BasicWords;

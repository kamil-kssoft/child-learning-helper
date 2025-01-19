import { useValueSet } from '../hooks/useValueSet';
import { BaseItem } from './BaseItem';

function Learn() {
  const values = useValueSet();

  return (
    <BaseItem
      values={values}
      renderContent={(item) => ({
        content: item
      })}
    />
  );
}

export default Learn;
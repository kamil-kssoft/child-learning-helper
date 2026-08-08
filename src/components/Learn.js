import { useMemo } from 'react';
import { useValueSet } from '../hooks/useValueSet';
import { BaseItem } from './BaseItem';
import { getNumberLabel, getLetterLabel } from '../config/content';

function Learn() {
  const values = useValueSet();

  const categoryLabel = useMemo(() => {
    const start = new URLSearchParams(window.location.search).get('start');
    if (!start) return 'cyfrę';
    return !isNaN(start) ? 'cyfrę' : 'literę';
  }, []);

  const getItemLabel = (item) => {
    if (!isNaN(item)) {
      return getNumberLabel(item);
    }
    if (item.length === 1 && item.match(/[A-Za-z]/)) {
      return getLetterLabel(item);
    }
    return item;
  };

  return (
    <BaseItem
      values={values}
      getItemLabel={getItemLabel}
      categoryLabel={categoryLabel}
      renderContent={(item) => ({
        content: item,
      })}
    />
  );
}

export default Learn;

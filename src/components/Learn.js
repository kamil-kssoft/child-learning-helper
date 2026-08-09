import { useMemo } from 'react';
import { useValueSet } from '../hooks/useValueSet';
import { BaseItem } from './BaseItem';
import { getNumberLabel, getLetterLabel } from '../config/content';
import { useLocale, useT } from '../i18n/LocaleContext';

function Learn() {
  const values = useValueSet();
  const { locale } = useLocale();
  const t = useT();

  const categoryLabel = useMemo(() => {
    const start = new URLSearchParams(window.location.search).get('start');
    if (!start) return t('category.number');
    return !isNaN(start) ? t('category.number') : t('category.letter');
  }, [t]);

  const getItemLabel = (item) => {
    if (!isNaN(item)) {
      return getNumberLabel(item, locale);
    }
    if (item.length === 1 && item.match(/[A-Za-z]/)) {
      return getLetterLabel(item, locale);
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

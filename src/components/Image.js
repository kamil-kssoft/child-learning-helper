import { useState } from 'react';
import { BaseItem } from './BaseItem';
import { animalItems, getItemLabel } from '../config/content';
import { useLocale, useT } from '../i18n/LocaleContext';
import './Image.css';

const ANIMAL_FALLBACK = '🐾';

function AnimalTile({ filename, label }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="animal-tile-fallback" aria-label={label}>
        {ANIMAL_FALLBACK}
      </span>
    );
  }

  return (
    <img
      src={`/img/${filename}`}
      alt={label}
      loading="lazy"
      decoding="async"
      className="animal-tile-image"
      onError={() => setFailed(true)}
    />
  );
}

function Image() {
  const { locale } = useLocale();
  const t = useT();
  const values = animalItems.map((a) => a.value);
  const resolveLabel = (filename) => {
    const item = animalItems.find((a) => a.value === filename);
    return item ? getItemLabel(item, locale) : filename;
  };

  return (
    <BaseItem
      values={values}
      getItemLabel={resolveLabel}
      categoryLabel={t('category.animal')}
      renderContent={(item) => ({
        content: <AnimalTile filename={item} label={resolveLabel(item)} />,
      })}
    />
  );
}

export default Image;

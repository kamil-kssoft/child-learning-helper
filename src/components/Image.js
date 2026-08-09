import { useState } from 'react';
import { BaseItem } from './BaseItem';
import { animalItems } from '../config/content';
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
  const values = animalItems.map((a) => a.value);
  const getItemLabel = (filename) =>
    animalItems.find((a) => a.value === filename)?.label || filename;

  return (
    <BaseItem
      values={values}
      getItemLabel={getItemLabel}
      categoryLabel="zwierzę"
      renderContent={(item) => ({
        content: <AnimalTile filename={item} label={getItemLabel(item)} />,
      })}
    />
  );
}

export default Image;

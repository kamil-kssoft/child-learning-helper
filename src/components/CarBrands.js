import { useState } from 'react';
import { BaseItem } from './BaseItem';
import { carBrandItems } from '../config/content';
import './CarBrands.css';

const BRAND_FALLBACK = '🚘';

function BrandTile({ filename, label }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="car-brand-tile-fallback" aria-label={label}>
        {BRAND_FALLBACK}
      </span>
    );
  }

  return (
    <img
      src={`/img/${filename}`}
      alt={label}
      loading="lazy"
      decoding="async"
      className="car-brand-tile-image"
      onError={() => setFailed(true)}
    />
  );
}

function CarBrands() {
  const values = carBrandItems.map((b) => b.value);
  const getItemLabel = (filename) =>
    carBrandItems.find((b) => b.value === filename)?.label || filename;

  return (
    <BaseItem
      values={values}
      getItemLabel={getItemLabel}
      categoryLabel="markę"
      renderContent={(item) => ({
        content: <BrandTile filename={item} label={getItemLabel(item)} />,
      })}
    />
  );
}

export default CarBrands;

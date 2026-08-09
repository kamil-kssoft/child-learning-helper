import { useState } from 'react';
import { BaseItem } from './BaseItem';
import { carBrandItems, getItemLabel } from '../config/content';
import { useLocale, useT } from '../i18n/LocaleContext';
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
  const { locale } = useLocale();
  const t = useT();
  const values = carBrandItems.map((b) => b.value);
  const resolveLabel = (filename) => {
    const item = carBrandItems.find((b) => b.value === filename);
    return item ? getItemLabel(item, locale) : filename;
  };

  return (
    <BaseItem
      values={values}
      getItemLabel={resolveLabel}
      categoryLabel={t('category.carBrand')}
      renderContent={(item) => ({
        content: <BrandTile filename={item} label={resolveLabel(item)} />,
      })}
    />
  );
}

export default CarBrands;

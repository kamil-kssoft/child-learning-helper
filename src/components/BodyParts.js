import { useState } from 'react';
import CategoryView from './CategoryView';
import { bodyPartItems, getItemLabel } from '../config/content';
import { useLocale, useT } from '../i18n/LocaleContext';
import './BodyParts.css';

const ORGAN_FALLBACK = '🫀';

function isOrganImage(value) {
  return typeof value === 'string' && /\.(png|jpe?g|webp|gif|svg)$/i.test(value);
}

function BodyPartTile({ value, label }) {
  const [failed, setFailed] = useState(false);

  if (!isOrganImage(value) || failed) {
    return (
      <span className="body-part-emoji" aria-label={label}>
        {failed ? ORGAN_FALLBACK : value}
      </span>
    );
  }

  return (
    <img
      src={`/img/${value}`}
      alt={label}
      loading="lazy"
      decoding="async"
      className="body-part-tile-image"
      onError={() => setFailed(true)}
    />
  );
}

function BodyParts() {
  const t = useT();
  const { locale } = useLocale();
  const resolveLabel = (value) => {
    const item = bodyPartItems.find((entry) => entry.value === value);
    return item ? getItemLabel(item, locale) : value;
  };

  return (
    <CategoryView
      items={bodyPartItems}
      categoryLabel={t('category.bodyPart')}
      renderContent={(value) => ({
        content: <BodyPartTile value={value} label={resolveLabel(value)} />,
      })}
    />
  );
}

export default BodyParts;

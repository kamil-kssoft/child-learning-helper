import { BaseItem } from './BaseItem';
import { getItemLabel } from '../config/content';
import { useLocale } from '../i18n/LocaleContext';

function CategoryView({ items, renderContent, categoryLabel }) {
  const { locale } = useLocale();
  const values = items.map((item) => item.value);
  const resolveLabel = (value) => {
    const item = items.find((entry) => entry.value === value);
    return item ? getItemLabel(item, locale) : value;
  };

  return (
    <BaseItem
      values={values}
      getItemLabel={resolveLabel}
      categoryLabel={categoryLabel}
      renderContent={renderContent}
    />
  );
}

export default CategoryView;

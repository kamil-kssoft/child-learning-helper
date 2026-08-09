import { BaseItem } from './BaseItem';
import { colorItems, getItemLabel } from '../config/content';
import { useLocale, useT } from '../i18n/LocaleContext';

function Colors() {
  const { locale } = useLocale();
  const t = useT();
  const values = colorItems.map((c) => c.value);
  const resolveLabel = (hex) => {
    const item = colorItems.find((c) => c.value === hex);
    return item ? getItemLabel(item, locale) : hex;
  };

  return (
    <BaseItem
      values={values}
      getItemLabel={resolveLabel}
      categoryLabel={t('category.color')}
      renderContent={(item) => ({
        style: {
          backgroundColor: item,
        },
      })}
    />
  );
}

export default Colors;

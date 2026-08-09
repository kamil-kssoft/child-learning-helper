import CategoryView from './CategoryView';
import { clothesItems } from '../config/content';
import { useT } from '../i18n/LocaleContext';

function Clothes() {
  const t = useT();
  return (
    <CategoryView
      items={clothesItems}
      categoryLabel={t('category.clothing')}
      renderContent={(emoji) => ({
        content: emoji,
      })}
    />
  );
}

export default Clothes;

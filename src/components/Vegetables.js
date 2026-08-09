import CategoryView from './CategoryView';
import { vegetableItems } from '../config/content';
import { useT } from '../i18n/LocaleContext';

function Vegetables() {
  const t = useT();
  return (
    <CategoryView
      items={vegetableItems}
      categoryLabel={t('category.vegetable')}
      renderContent={(emoji) => ({
        content: emoji,
      })}
    />
  );
}

export default Vegetables;

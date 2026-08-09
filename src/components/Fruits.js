import CategoryView from './CategoryView';
import { fruitItems } from '../config/content';
import { useT } from '../i18n/LocaleContext';

function Fruits() {
  const t = useT();
  return (
    <CategoryView
      items={fruitItems}
      categoryLabel={t('category.fruit')}
      renderContent={(emoji) => ({
        content: emoji,
      })}
    />
  );
}

export default Fruits;

import CategoryView from './CategoryView';
import { sportItems } from '../config/content';
import { useT } from '../i18n/LocaleContext';

function Sports() {
  const t = useT();
  return (
    <CategoryView
      items={sportItems}
      categoryLabel={t('category.sport')}
      renderContent={(emoji) => ({
        content: emoji,
      })}
    />
  );
}

export default Sports;

import CategoryView from './CategoryView';
import { homeItems } from '../config/content';
import { useT } from '../i18n/LocaleContext';

function HomeItems() {
  const t = useT();
  return (
    <CategoryView
      items={homeItems}
      categoryLabel={t('category.homeItem')}
      renderContent={(emoji) => ({
        content: emoji,
      })}
    />
  );
}

export default HomeItems;

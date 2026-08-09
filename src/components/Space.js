import CategoryView from './CategoryView';
import { spaceItems } from '../config/content';
import { useT } from '../i18n/LocaleContext';

function Space() {
  const t = useT();
  return (
    <CategoryView
      items={spaceItems}
      categoryLabel={t('category.spaceObject')}
      renderContent={(emoji) => ({
        content: emoji,
      })}
    />
  );
}

export default Space;

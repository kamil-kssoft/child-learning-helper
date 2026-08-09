import CategoryView from './CategoryView';
import { flagItems } from '../config/content';
import { useT } from '../i18n/LocaleContext';

function Flags() {
  const t = useT();
  return (
    <CategoryView
      items={flagItems}
      categoryLabel={t('category.flag')}
      renderContent={(flag) => ({
        content: flag,
      })}
    />
  );
}

export default Flags;

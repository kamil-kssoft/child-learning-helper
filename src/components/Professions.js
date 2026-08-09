import CategoryView from './CategoryView';
import { professionItems } from '../config/content';
import { useT } from '../i18n/LocaleContext';

function Professions() {
  const t = useT();
  return (
    <CategoryView
      items={professionItems}
      categoryLabel={t('category.profession')}
      renderContent={(emoji) => ({
        content: emoji,
      })}
    />
  );
}

export default Professions;

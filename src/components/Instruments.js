import CategoryView from './CategoryView';
import { instrumentItems } from '../config/content';
import { useT } from '../i18n/LocaleContext';

function Instruments() {
  const t = useT();
  return (
    <CategoryView
      items={instrumentItems}
      categoryLabel={t('category.instrument')}
      renderContent={(emoji) => ({
        content: emoji,
      })}
    />
  );
}

export default Instruments;

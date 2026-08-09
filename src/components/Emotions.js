import CategoryView from './CategoryView';
import { emotionItems } from '../config/content';
import { useT } from '../i18n/LocaleContext';

function Emotions() {
  const t = useT();
  return (
    <CategoryView
      items={emotionItems}
      categoryLabel={t('category.emotion')}
      renderContent={(emoji) => ({
        content: emoji,
      })}
    />
  );
}

export default Emotions;

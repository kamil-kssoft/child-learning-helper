import CategoryView from './CategoryView';
import { bodyPartItems } from '../config/content';
import { useT } from '../i18n/LocaleContext';

function BodyParts() {
  const t = useT();
  return (
    <CategoryView
      items={bodyPartItems}
      categoryLabel={t('category.bodyPart')}
      renderContent={(emoji) => ({
        content: emoji,
      })}
    />
  );
}

export default BodyParts;

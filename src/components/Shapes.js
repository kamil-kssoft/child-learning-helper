import CategoryView from './CategoryView';
import ShapeIcon from './ShapeIcon';
import { shapeItems } from '../config/content';
import { useT } from '../i18n/LocaleContext';

function Shapes() {
  const t = useT();
  return (
    <CategoryView
      items={shapeItems}
      categoryLabel={t('category.shape')}
      renderContent={(shape) => ({
        content: <ShapeIcon shape={shape} />,
      })}
    />
  );
}

export default Shapes;

import CategoryView from './CategoryView';
import ShapeIcon from './ShapeIcon';
import { shapeItems } from '../config/content';

function Shapes() {
  return (
    <CategoryView
      items={shapeItems}
      categoryLabel="kształt"
      renderContent={(shape) => ({
        content: <ShapeIcon shape={shape} />,
      })}
    />
  );
}

export default Shapes;

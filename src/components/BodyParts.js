import CategoryView from './CategoryView';
import { bodyPartItems } from '../config/content';

function BodyParts() {
  return (
    <CategoryView
      items={bodyPartItems}
      categoryLabel="część ciała"
      renderContent={(emoji) => ({
        content: emoji,
      })}
    />
  );
}

export default BodyParts;

import CategoryView from './CategoryView';
import { vegetableItems } from '../config/content';

function Vegetables() {
  return (
    <CategoryView
      items={vegetableItems}
      categoryLabel="warzywo"
      renderContent={(emoji) => ({
        content: emoji,
      })}
    />
  );
}

export default Vegetables;

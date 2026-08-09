import CategoryView from './CategoryView';
import { clothesItems } from '../config/content';

function Clothes() {
  return (
    <CategoryView
      items={clothesItems}
      categoryLabel="ubranie"
      renderContent={(emoji) => ({
        content: emoji,
      })}
    />
  );
}

export default Clothes;

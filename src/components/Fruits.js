import CategoryView from './CategoryView';
import { fruitItems } from '../config/content';

function Fruits() {
  return (
    <CategoryView
      items={fruitItems}
      categoryLabel="owoc"
      renderContent={(emoji) => ({
        content: emoji,
      })}
    />
  );
}

export default Fruits;

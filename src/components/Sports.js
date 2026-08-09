import CategoryView from './CategoryView';
import { sportItems } from '../config/content';

function Sports() {
  return (
    <CategoryView
      items={sportItems}
      categoryLabel="sport"
      renderContent={(emoji) => ({
        content: emoji,
      })}
    />
  );
}

export default Sports;

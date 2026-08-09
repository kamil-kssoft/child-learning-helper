import CategoryView from './CategoryView';
import { homeItems } from '../config/content';

function HomeItems() {
  return (
    <CategoryView
      items={homeItems}
      categoryLabel="przedmiot"
      renderContent={(emoji) => ({
        content: emoji,
      })}
    />
  );
}

export default HomeItems;

import CategoryView from './CategoryView';
import { spaceItems } from '../config/content';

function Space() {
  return (
    <CategoryView
      items={spaceItems}
      categoryLabel="obiekt"
      renderContent={(emoji) => ({
        content: emoji,
      })}
    />
  );
}

export default Space;

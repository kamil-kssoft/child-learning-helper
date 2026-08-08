import CategoryView from './CategoryView';
import { emotionItems } from '../config/content';

function Emotions() {
  return (
    <CategoryView
      items={emotionItems}
      categoryLabel="emocja"
      renderContent={(emoji) => ({
        content: emoji,
      })}
    />
  );
}

export default Emotions;

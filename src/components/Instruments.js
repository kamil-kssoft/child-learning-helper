import CategoryView from './CategoryView';
import { instrumentItems } from '../config/content';

function Instruments() {
  return (
    <CategoryView
      items={instrumentItems}
      categoryLabel="instrument"
      renderContent={(emoji) => ({
        content: emoji,
      })}
    />
  );
}

export default Instruments;

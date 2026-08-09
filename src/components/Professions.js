import CategoryView from './CategoryView';
import { professionItems } from '../config/content';

function Professions() {
  return (
    <CategoryView
      items={professionItems}
      categoryLabel="zawód"
      renderContent={(emoji) => ({
        content: emoji,
      })}
    />
  );
}

export default Professions;

import CategoryView from './CategoryView';
import { vehicleItems } from '../config/content';

function Vehicles() {
  return (
    <CategoryView
      items={vehicleItems}
      categoryLabel="pojazd"
      renderContent={(emoji) => ({
        content: emoji,
      })}
    />
  );
}

export default Vehicles;

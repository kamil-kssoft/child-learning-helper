import CategoryView from './CategoryView';
import { vehicleItems } from '../config/content';
import { useT } from '../i18n/LocaleContext';

function Vehicles() {
  const t = useT();
  return (
    <CategoryView
      items={vehicleItems}
      categoryLabel={t('category.vehicle')}
      renderContent={(emoji) => ({
        content: emoji,
      })}
    />
  );
}

export default Vehicles;

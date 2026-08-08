import CategoryView from './CategoryView';
import { carBrandItems } from '../config/content';

function CarBrands() {
  return (
    <CategoryView
      items={carBrandItems}
      categoryLabel="marka"
      renderContent={(logo) => ({
        content: (
          <img
            src={`/img/brands/${logo}`}
            alt=""
            style={{
              maxWidth: '70%',
              maxHeight: '70%',
              objectFit: 'contain',
            }}
          />
        ),
      })}
    />
  );
}

export default CarBrands;

import { BaseItem } from './BaseItem';
import { animalItems } from '../config/content';

function Image() {
  const values = animalItems.map((a) => a.value);
  const getItemLabel = (filename) =>
    animalItems.find((a) => a.value === filename)?.label || filename;

  return (
    <BaseItem
      values={values}
      getItemLabel={getItemLabel}
      categoryLabel="zwierzę"
      renderContent={(item) => ({
        content: (
          <img
            className="tile-image"
            src={`/img/${item}`}
            alt={getItemLabel(item)}
            draggable={false}
          />
        ),
      })}
    />
  );
}

export default Image;

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
        style: {
          backgroundImage: `url(/img/${item})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '400px',
          minWidth: '400px',
        },
      })}
    />
  );
}

export default Image;

import { BaseItem } from './BaseItem';
import { animals } from '../config/colors';

function Image() {
  const values = animals;

  return (
    <BaseItem
      values={values}
      renderContent={(item) => ({
        style: {
          backgroundImage: `url(/img/${item})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '400px',
          minWidth: '400px'
        }
      })}
    />
  );
}

export default Image;
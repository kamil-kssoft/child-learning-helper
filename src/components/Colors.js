import { BaseItem } from './BaseItem';
import { colors } from '../config/colors';

function Colors() {
  const values = colors;

  return (
    <BaseItem
      values={values}
      renderContent={(item) => ({
        style: {
          backgroundColor: item
        }
      })}
    />
  );
}

export default Colors;
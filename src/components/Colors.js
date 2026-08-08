import { BaseItem } from './BaseItem';
import { colorItems } from '../config/content';

function Colors() {
  const values = colorItems.map((c) => c.value);
  const getItemLabel = (hex) =>
    colorItems.find((c) => c.value === hex)?.label || hex;

  return (
    <BaseItem
      values={values}
      getItemLabel={getItemLabel}
      categoryLabel="kolor"
      renderContent={(item) => ({
        style: {
          backgroundColor: item,
        },
      })}
    />
  );
}

export default Colors;

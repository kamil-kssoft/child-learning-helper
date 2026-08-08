import { BaseItem } from './BaseItem';

function CategoryView({ items, renderContent, categoryLabel }) {
  const values = items.map((item) => item.value);
  const getItemLabel = (value) =>
    items.find((item) => item.value === value)?.label || value;

  return (
    <BaseItem
      values={values}
      getItemLabel={getItemLabel}
      categoryLabel={categoryLabel}
      renderContent={renderContent}
    />
  );
}

export default CategoryView;

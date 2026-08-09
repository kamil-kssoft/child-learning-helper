import CategoryView from './CategoryView';
import { weatherItems } from '../config/content';

function Weather() {
  return (
    <CategoryView
      items={weatherItems}
      categoryLabel="pogodę"
      renderContent={(emoji) => ({
        content: emoji,
      })}
    />
  );
}

export default Weather;

import CategoryView from './CategoryView';
import { weatherItems } from '../config/content';
import { useT } from '../i18n/LocaleContext';

function Weather() {
  const t = useT();
  return (
    <CategoryView
      items={weatherItems}
      categoryLabel={t('category.weather')}
      renderContent={(emoji) => ({
        content: emoji,
      })}
    />
  );
}

export default Weather;

import { Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import PwaInstallBanner from './PwaInstallBanner';
import LanguageSwitcher from './LanguageSwitcher';
import ProgressBar from './ProgressBar';
import { useLearningProgress } from '../hooks/useLearningProgress';
import {
  colorItems,
  animalItems,
  fruitItems,
  vegetableItems,
  weatherItems,
  shapeItems,
  countingItems,
  vehicleItems,
  carBrandItems,
  emotionItems,
  bodyPartItems,
  clothesItems,
  professionItems,
  homeItems,
  spaceItems,
  sportItems,
  instrumentItems,
  flagItems,
} from '../config/content';
import {
  getDirectionCompletedCount,
  TOTAL_BASIC_WORDS,
} from '../config/basicWords';
import { useLocale, useT } from '../i18n/LocaleContext';
import { LOCALE_META } from '../i18n/locales';
import './Menu.css';
import './ProgressBar.css';

function Menu() {
  const t = useT();
  const { locale } = useLocale();
  const { getCompletedCount } = useLearningProgress();
  const [randomize, setRandomize] = useState(() =>
    JSON.parse(localStorage.getItem('randomize') || 'false')
  );
  const [testMode, setTestMode] = useState(() =>
    JSON.parse(localStorage.getItem('testMode') || 'false')
  );
  const [quizCount, setQuizCount] = useState(() =>
    JSON.parse(localStorage.getItem('quizCount') || '2')
  );

  useEffect(() => {
    localStorage.setItem('randomize', JSON.stringify(randomize));
    localStorage.setItem('testMode', JSON.stringify(testMode));
    localStorage.setItem('quizCount', JSON.stringify(quizCount));
  }, [randomize, testMode, quizCount]);

  const menuSections = useMemo(() => {
    const sections = [
      {
        titleKey: 'menu.section.basics',
        items: [
          { labelKey: 'menu.item.numbers', icon: '🔢', path: '/learn?start=0&stop=40', progressKey: 'learn:0-40', totalItems: 41 },
          { labelKey: 'menu.item.uppercase', icon: '🔤', path: '/learn?start=A&stop=Z', progressKey: 'learn:A-Z', totalItems: 26 },
          { labelKey: 'menu.item.lowercase', icon: '🔡', path: '/learn?start=a&stop=z', progressKey: 'learn:a-z', totalItems: 26 },
          { labelKey: 'menu.item.colors', icon: '🎨', path: '/colors?a=1', progressKey: 'colors', totalItems: colorItems.length },
        ],
      },
      {
        titleKey: 'menu.section.animalsNature',
        items: [
          { labelKey: 'menu.item.animals', icon: '🐾', path: '/image?a=1', progressKey: 'image', totalItems: animalItems.length },
          { labelKey: 'menu.item.fruits', icon: '🍎', path: '/fruits?a=1', progressKey: 'fruits', totalItems: fruitItems.length },
          { labelKey: 'menu.item.vegetables', icon: '🥕', path: '/vegetables?a=1', progressKey: 'vegetables', totalItems: vegetableItems.length },
          { labelKey: 'menu.item.weather', icon: '☀️', path: '/weather?a=1', progressKey: 'weather', totalItems: weatherItems.length },
        ],
      },
      {
        titleKey: 'menu.section.shapesCounting',
        items: [
          { labelKey: 'menu.item.shapes', icon: '🔷', path: '/shapes?a=1', progressKey: 'shapes', totalItems: shapeItems.length },
          { labelKey: 'menu.item.counting', icon: '🔢', path: '/counting?a=1', progressKey: 'counting', totalItems: countingItems.length },
        ],
      },
      {
        titleKey: 'menu.section.vehicles',
        items: [
          { labelKey: 'menu.item.vehicles', icon: '🚗', path: '/vehicles?a=1', progressKey: 'vehicles', totalItems: vehicleItems.length },
          { labelKey: 'menu.item.carBrands', icon: '🚘', path: '/car-brands?a=1', progressKey: 'car-brands', totalItems: carBrandItems.length },
        ],
      },
      {
        titleKey: 'menu.section.emotions',
        items: [
          { labelKey: 'menu.item.emotions', icon: '😊', path: '/emotions?a=1', progressKey: 'emotions', totalItems: emotionItems.length },
        ],
      },
      {
        titleKey: 'menu.section.dailyLife',
        items: [
          { labelKey: 'menu.item.bodyParts', icon: '👀', path: '/body-parts?a=1', progressKey: 'body-parts', totalItems: bodyPartItems.length },
          { labelKey: 'menu.item.clothes', icon: '👕', path: '/clothes?a=1', progressKey: 'clothes', totalItems: clothesItems.length },
          { labelKey: 'menu.item.home', icon: '🏠', path: '/home?a=1', progressKey: 'home', totalItems: homeItems.length },
          { labelKey: 'menu.item.professions', icon: '👨‍⚕️', path: '/professions?a=1', progressKey: 'professions', totalItems: professionItems.length },
        ],
      },
      {
        titleKey: 'menu.section.worldPlay',
        items: [
          { labelKey: 'menu.item.space', icon: '🚀', path: '/space?a=1', progressKey: 'space', totalItems: spaceItems.length },
          { labelKey: 'menu.item.sports', icon: '⚽', path: '/sports?a=1', progressKey: 'sports', totalItems: sportItems.length },
          { labelKey: 'menu.item.instruments', icon: '🎸', path: '/instruments?a=1', progressKey: 'instruments', totalItems: instrumentItems.length },
          { labelKey: 'menu.item.flags', icon: '🏳️', path: '/flags?a=1', progressKey: 'flags', totalItems: flagItems.length },
        ],
      },
    ];

    if (locale !== 'pl') {
      const foreignLabel = LOCALE_META[locale]?.label || locale;
      sections.splice(1, 0, {
        titleKey: 'menu.section.language',
        items: [
          {
            labelKey: 'menu.item.basicWordsPlTo',
            labelParams: { lang: foreignLabel },
            icon: '💬',
            path: `/basic-words?dir=pl-to-${locale}`,
            isBasicWords: true,
            dir: `pl-to-${locale}`,
            totalItems: TOTAL_BASIC_WORDS,
          },
          {
            labelKey: 'menu.item.basicWordsToPl',
            labelParams: { lang: foreignLabel },
            icon: '💬',
            path: `/basic-words?dir=${locale}-to-pl`,
            isBasicWords: true,
            dir: `${locale}-to-pl`,
            totalItems: TOTAL_BASIC_WORDS,
          },
        ],
      });
    }

    return sections;
  }, [locale]);

  const getPath = (basePath) => {
    const randomizeMode = randomize ? 1 : 0;
    const count = testMode ? quizCount : 1;
    return `${basePath}&count=${count}&randomize=${randomizeMode}`;
  };

  const getBasicWordsPath = (basePath) => {
    const randomizeMode = randomize ? 1 : 0;
    return `${basePath}&randomize=${randomizeMode}`;
  };

  return (
    <div className="menu-container">
      <h1 className="menu-title">{t('menu.title')}</h1>

      <PwaInstallBanner />

      <div className="options-container">
        <LanguageSwitcher />

        <label className="option-label">
          <input
            type="checkbox"
            checked={randomize}
            onChange={(e) => setRandomize(e.target.checked)}
          />
          {t('menu.randomize')}
        </label>
        <div className="form-check form-switch option-label">
          <input
            className="form-check-input"
            type="checkbox"
            id="testModeSwitch"
            checked={testMode}
            onChange={(e) => setTestMode(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="testModeSwitch">
            {testMode ? t('menu.quiz') : t('menu.learn')}
          </label>
        </div>

        {testMode && (
          <label className="option-label">
            {t('menu.quizCount')}
            <input
              type="number"
              className="form-control"
              min="2"
              max="6"
              value={quizCount}
              onChange={(e) => setQuizCount(Number(e.target.value))}
              style={{ width: '4rem' }}
            />
          </label>
        )}

        <Link to="/sound" className="menu-settings-link">
          <span className="menu-icon">🔊</span>
          {t('menu.soundSettings')}
        </Link>
      </div>

      {menuSections.map((section) => (
        <div key={section.titleKey} className="menu-section">
          <h2 className="menu-section-title">{t(section.titleKey)}</h2>
          {section.items.map((item) => {
            const completed = item.isBasicWords
              ? getDirectionCompletedCount(item.dir, getCompletedCount)
              : getCompletedCount(item.progressKey);
            const linkPath = item.isBasicWords
              ? getBasicWordsPath(item.path)
              : getPath(item.path);
            return (
              <Link key={item.labelKey} to={linkPath} className="menu-item">
                <span className="menu-icon">{item.icon}</span>
                <div className="menu-item-content">
                  <span className="menu-item-label">
                    {t(item.labelKey, item.labelParams)}
                  </span>
                  <ProgressBar
                    className="menu-progress"
                    value={completed}
                    max={item.totalItems}
                    label={t('progress.category', {
                      completed,
                      total: item.totalItems,
                    })}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Menu;

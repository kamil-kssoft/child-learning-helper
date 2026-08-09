import { Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import PwaInstallBanner from './PwaInstallBanner';
import LanguageSwitcher from './LanguageSwitcher';
import { useT } from '../i18n/LocaleContext';
import './Menu.css';

function Menu() {
  const t = useT();
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

  const menuSections = useMemo(
    () => [
      {
        titleKey: 'menu.section.basics',
        items: [
          { labelKey: 'menu.item.numbers', icon: '🔢', path: '/learn?start=0&stop=40' },
          { labelKey: 'menu.item.uppercase', icon: '🔤', path: '/learn?start=A&stop=Z' },
          { labelKey: 'menu.item.lowercase', icon: '🔡', path: '/learn?start=a&stop=z' },
          { labelKey: 'menu.item.colors', icon: '🎨', path: '/colors?a=1' },
        ],
      },
      {
        titleKey: 'menu.section.animalsNature',
        items: [
          { labelKey: 'menu.item.animals', icon: '🐾', path: '/image?a=1' },
          { labelKey: 'menu.item.fruits', icon: '🍎', path: '/fruits?a=1' },
          { labelKey: 'menu.item.vegetables', icon: '🥕', path: '/vegetables?a=1' },
          { labelKey: 'menu.item.weather', icon: '☀️', path: '/weather?a=1' },
        ],
      },
      {
        titleKey: 'menu.section.shapesCounting',
        items: [
          { labelKey: 'menu.item.shapes', icon: '🔷', path: '/shapes?a=1' },
          { labelKey: 'menu.item.counting', icon: '🔢', path: '/counting?a=1' },
        ],
      },
      {
        titleKey: 'menu.section.vehicles',
        items: [
          { labelKey: 'menu.item.vehicles', icon: '🚗', path: '/vehicles?a=1' },
          { labelKey: 'menu.item.carBrands', icon: '🚘', path: '/car-brands?a=1' },
        ],
      },
      {
        titleKey: 'menu.section.emotions',
        items: [
          { labelKey: 'menu.item.emotions', icon: '😊', path: '/emotions?a=1' },
        ],
      },
      {
        titleKey: 'menu.section.dailyLife',
        items: [
          { labelKey: 'menu.item.bodyParts', icon: '👀', path: '/body-parts?a=1' },
          { labelKey: 'menu.item.clothes', icon: '👕', path: '/clothes?a=1' },
          { labelKey: 'menu.item.home', icon: '🏠', path: '/home?a=1' },
          { labelKey: 'menu.item.professions', icon: '👨‍⚕️', path: '/professions?a=1' },
        ],
      },
      {
        titleKey: 'menu.section.worldPlay',
        items: [
          { labelKey: 'menu.item.space', icon: '🚀', path: '/space?a=1' },
          { labelKey: 'menu.item.sports', icon: '⚽', path: '/sports?a=1' },
          { labelKey: 'menu.item.instruments', icon: '🎸', path: '/instruments?a=1' },
        ],
      },
    ],
    []
  );

  const getPath = (basePath) => {
    const randomizeMode = randomize ? 1 : 0;
    const count = testMode ? quizCount : 1;
    return `${basePath}&count=${count}&randomize=${randomizeMode}`;
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
          {section.items.map((item) => (
            <Link key={item.labelKey} to={getPath(item.path)} className="menu-item">
              <span className="menu-icon">{item.icon}</span>
              {t(item.labelKey)}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Menu;

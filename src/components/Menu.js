import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Menu.css';

function Menu() {
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

  const menuSections = [
    {
      title: 'Podstawy',
      items: [
        { label: 'Cyfry 0–40', icon: '🔢', path: '/learn?start=0&stop=40' },
        { label: 'Wielkie litery A–Z', icon: '🔤', path: '/learn?start=A&stop=Z' },
        { label: 'Małe litery a–z', icon: '🔡', path: '/learn?start=a&stop=z' },
        { label: 'Kolory', icon: '🎨', path: '/colors?a=1' },
      ],
    },
    {
      title: 'Zwierzęta i natura',
      items: [
        { label: 'Zwierzęta', icon: '🐾', path: '/image?a=1' },
        { label: 'Owoce', icon: '🍎', path: '/fruits?a=1' },
      ],
    },
    {
      title: 'Kształty i liczenie',
      items: [
        { label: 'Kształty', icon: '🔷', path: '/shapes?a=1' },
        { label: 'Liczenie', icon: '🔢', path: '/counting?a=1' },
      ],
    },
    {
      title: 'Pojazdy',
      items: [
        { label: 'Pojazdy', icon: '🚗', path: '/vehicles?a=1' },
      ],
    },
    {
      title: 'Emocje',
      items: [
        { label: 'Emocje', icon: '😊', path: '/emotions?a=1' },
      ],
    },
  ];

  const getPath = (basePath) => {
    const randomizeMode = randomize ? 1 : 0;
    const count = testMode ? quizCount : 1;
    return `${basePath}&count=${count}&randomize=${randomizeMode}`;
  };

  return (
    <div className="menu-container">
      <h1 className="menu-title">🌈 Zabawa w naukę</h1>

      <div className="options-container">
        <label className="option-label">
          <input
            type="checkbox"
            checked={randomize}
            onChange={(e) => setRandomize(e.target.checked)}
          />
          Losuj kolejność
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
            {testMode ? 'Quiz' : 'Ucz się'}
          </label>
        </div>

        {testMode && (
          <label className="option-label">
            Liczba elementów:
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
      </div>

      {menuSections.map((section) => (
        <div key={section.title} className="menu-section">
          <h2 className="menu-section-title">{section.title}</h2>
          {section.items.map((item, index) => (
            <Link
              key={index}
              to={getPath(item.path)}
              className="menu-item"
            >
              <span className="menu-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Menu;

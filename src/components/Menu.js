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

  const baseItems = [
    { label: 'Liczby 0–10', icon: '🔢', path: '/learn?start=0&stop=10' },
    { label: 'Liczby 0–20', icon: '🔢', path: '/learn?start=0&stop=20' },
    { label: 'Litery A–H', icon: '🔤', path: '/learn?start=A&stop=H' },
    { label: 'Litery I–P', icon: '🔤', path: '/learn?start=I&stop=P' },
    { label: 'Litery R–Z', icon: '🔤', path: '/learn?start=R&stop=Z' },
    { label: 'Litery A–Z', icon: '🔤', path: '/learn?start=A&stop=Z' },
    { label: 'Kolory', icon: '🎨', path: '/colors?a=1' },
    { label: 'Zwierzęta', icon: '🐾', path: '/image?a=1' },
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

      {baseItems.map((item, index) => (
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
  );
}

export default Menu;

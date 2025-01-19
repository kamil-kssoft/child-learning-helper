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
    { label: 'Numbers 0-10', path: '/learn?start=0&stop=10' },
    { label: 'Numbers 0-20', path: '/learn?start=0&stop=20' },
    { label: 'Letters A-H', path: '/learn?start=A&stop=H' },
    { label: 'Letters I-P', path: '/learn?start=I&stop=P' },
    { label: 'Letters R-Z', path: '/learn?start=R&stop=Z' },
    { label: 'Letters A-Z', path: '/learn?start=A&stop=Z' },
    { label: 'Colors', path: '/colors' },
  ];

  const getPath = (basePath) => {
    if (basePath === '/colors') {
      return testMode
        ? `/colorsQuiz?count=${quizCount}`
        : basePath;
    }
    if (!basePath.startsWith('/learn')) return basePath;

    if (testMode) {
      const params = new URLSearchParams(basePath.split('?')[1]);
      return `/learnQuiz?${params.toString()}&count=${quizCount}`;
    }

    return `${basePath}${randomize ? '&randomize=1' : ''}`;
  };

  return (
    <div className="menu-container">
      <div className="options-container">
        <label className="option-label">
          <input
            type="checkbox"
            checked={randomize}
            onChange={(e) => setRandomize(e.target.checked)}
          />
          Randomize order
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
            {testMode ? 'Test' : 'Learn'}
          </label>
        </div>

        {testMode && (
          <label className="option-label">
            Number of items:
            <input
              type="number"
              className="form-control"
              min="2"
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
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default Menu;
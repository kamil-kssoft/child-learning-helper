import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Menu.css';
import { shuffleArrayWithSubitems } from '../utils/arrayUtils';

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
    { label: 'Colors', path: '/colors?a=1' },
    { label: 'Animals', path: '/image?a=1' },
  ];

  const getPath = (basePath) => {
    const randomizeMode = randomize ? 1 : 0;
    const count = testMode ? quizCount : 1;
    return `${basePath}&count=${count}&randomize=${randomizeMode}`;
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
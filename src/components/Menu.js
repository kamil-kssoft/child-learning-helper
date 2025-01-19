import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Menu.css';

function Menu() {
  const [randomize, setRandomize] = useState(false);
  const [testMode, setTestMode] = useState(false);

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
    if (basePath === '/colors') return testMode ? '/colorsQuiz' : basePath;
    if (!basePath.startsWith('/learn')) return basePath;

    // Redirect to LearnQuiz component when in test mode
    if (testMode) {
      const params = new URLSearchParams(basePath.split('?')[1]);
      return `/learnQuiz?${params.toString()}`;
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
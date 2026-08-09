import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { DEFAULT_SPEECH_RATE } from '../utils/audioSettings';
import { unlockAudioPlayback } from '../utils/speech';
import PwaInstallBanner from './PwaInstallBanner';
import SoundPermissionMessage from './SoundPermissionMessage';
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
  const [soundEnabled, setSoundEnabled] = useState(() =>
    JSON.parse(localStorage.getItem('soundEnabled') ?? 'true')
  );
  const [speechRate, setSpeechRate] = useState(() =>
    JSON.parse(localStorage.getItem('speechRate') ?? String(DEFAULT_SPEECH_RATE))
  );
  const [permissionIssue, setPermissionIssue] = useState(null);

  useEffect(() => {
    localStorage.setItem('randomize', JSON.stringify(randomize));
    localStorage.setItem('testMode', JSON.stringify(testMode));
    localStorage.setItem('quizCount', JSON.stringify(quizCount));
    localStorage.setItem('soundEnabled', JSON.stringify(soundEnabled));
    localStorage.setItem('speechRate', JSON.stringify(speechRate));
  }, [randomize, testMode, quizCount, soundEnabled, speechRate]);

  useEffect(() => {
    if (!soundEnabled) {
      setPermissionIssue(null);
    }
  }, [soundEnabled]);

  const checkSoundPermission = async () => {
    const result = await unlockAudioPlayback();
    setPermissionIssue(result?.issue || null);
    return result;
  };

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
        { label: 'Marki aut', icon: '🚘', path: '/car-brands?a=1' },
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

      <PwaInstallBanner />

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

        <label className="option-label">
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={async (e) => {
              const enabled = e.target.checked;
              setSoundEnabled(enabled);
              if (enabled) {
                await checkSoundPermission();
              } else {
                setPermissionIssue(null);
              }
            }}
          />
          Dźwięk włączony
        </label>

        {soundEnabled && (
          <label className="option-label option-label-column">
            <span>Tempo mowy: {speechRate.toFixed(2)}</span>
            <input
              type="range"
              className="speech-rate-slider"
              min="0.5"
              max="1.2"
              step="0.05"
              value={speechRate}
              onChange={(e) => setSpeechRate(Number(e.target.value))}
            />
          </label>
        )}

        {soundEnabled && (
          <SoundPermissionMessage
            issue={permissionIssue}
            onDismiss={() => setPermissionIssue(null)}
          />
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
              onClick={() => {
                if (soundEnabled) {
                  checkSoundPermission();
                }
              }}
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

import { useT } from '../i18n/LocaleContext';
import './Feedback.css';

function Feedback({ type }) {
  const t = useT();
  if (!type) return null;

  if (type === 'success') {
    return (
      <div className="feedback-overlay feedback-success" aria-live="polite">
        <div className="feedback-content">
          <span className="feedback-emoji">⭐</span>
          <span className="feedback-text">{t('feedback.success')}</span>
        </div>
        <div className="confetti-container">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="confetti-piece" style={{ '--i': i }} />
          ))}
        </div>
      </div>
    );
  }

  if (type === 'wrong') {
    return (
      <div className="feedback-overlay feedback-wrong" aria-live="polite">
        <div className="feedback-content">
          <span className="feedback-emoji">🤔</span>
          <span className="feedback-text">{t('feedback.wrong')}</span>
        </div>
      </div>
    );
  }

  return null;
}

export default Feedback;

import './Feedback.css';

function Feedback({ type }) {
  if (!type) return null;

  if (type === 'success') {
    return (
      <div className="feedback-overlay feedback-success" aria-live="polite">
        <div className="feedback-content">
          <span className="feedback-emoji">⭐</span>
          <span className="feedback-text">Brawo!</span>
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
          <span className="feedback-text">Spróbuj jeszcze raz!</span>
        </div>
      </div>
    );
  }

  return null;
}

export default Feedback;

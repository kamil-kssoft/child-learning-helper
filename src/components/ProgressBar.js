import './ProgressBar.css';

function ProgressBar({ value = 0, max = 0, className = '', showLabel = false, label = '' }) {
  const percent = max > 0 ? Math.min(100, (value / max) * 100) : 0;

  return (
    <div className={`progress-bar-wrapper ${className}`.trim()}>
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || undefined}
      >
        <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
      </div>
      {showLabel && label && <span className="progress-bar-label">{label}</span>}
    </div>
  );
}

export default ProgressBar;

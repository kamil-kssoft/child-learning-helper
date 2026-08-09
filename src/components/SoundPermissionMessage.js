import { messageForIssue } from '../utils/audioPermissions';
import './SoundPermissionMessage.css';

function SoundPermissionMessage({ issue, onDismiss }) {
  if (!issue) return null;

  return (
    <div className="sound-permission-message" role="alert">
      <p className="sound-permission-message-text">{messageForIssue(issue)}</p>
      {onDismiss && (
        <button
          type="button"
          className="sound-permission-message-dismiss"
          onClick={onDismiss}
          aria-label="Zamknij"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default SoundPermissionMessage;

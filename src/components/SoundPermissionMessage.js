import { messageForIssue } from '../utils/audioPermissions';
import { useLocale, useT } from '../i18n/LocaleContext';
import './SoundPermissionMessage.css';

function SoundPermissionMessage({ issue, onDismiss }) {
  const { locale } = useLocale();
  const t = useT();
  if (!issue) return null;

  return (
    <div className="sound-permission-message" role="alert">
      <p className="sound-permission-message-text">{messageForIssue(issue, locale)}</p>
      {onDismiss && (
        <button
          type="button"
          className="sound-permission-message-dismiss"
          onClick={onDismiss}
          aria-label={t('permission.dismiss')}
        >
          ×
        </button>
      )}
    </div>
  );
}

export default SoundPermissionMessage;

import { Link } from 'react-router-dom';
import { useT } from '../i18n/LocaleContext';
import './BackButton.css';

function BackButton() {
  const t = useT();
  return (
    <Link to="/menu" className="back-button" aria-label={t('back.aria')}>
      {t('back.menu')}
    </Link>
  );
}

export default BackButton;

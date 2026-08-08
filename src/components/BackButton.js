import { Link } from 'react-router-dom';
import './BackButton.css';

function BackButton() {
  return (
    <Link to="/menu" className="back-button" aria-label="Wróć do menu">
      ← Menu
    </Link>
  );
}

export default BackButton;

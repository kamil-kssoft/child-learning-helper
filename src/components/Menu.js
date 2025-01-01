import { Link } from 'react-router-dom';
import { useState } from 'react';

function Menu() {
  const [randomize, setRandomize] = useState(false);

  const baseItems = [
    { label: 'Numbers 0-10', path: '/learn?start=0&stop=10' },
    { label: 'Numbers 0-20', path: '/learn?start=0&stop=20' },
    { label: 'Letters A-H', path: '/learn?start=A&stop=H' },
    { label: 'Letters I-P', path: '/learn?start=I&stop=P' },
    { label: 'Letters R-Z', path: '/learn?start=R&stop=Z' },
    { label: 'Colors', path: '/colors' },
  ];

  const getPath = (basePath) => {
    if (!basePath.startsWith('/learn')) return basePath;
    return `${basePath}${randomize ? '&randomize=1' : ''}`;
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      padding: '2rem',
      maxWidth: '300px',
      margin: '0 auto'
    }}>
      <label style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '1.2rem',
        marginBottom: '1rem'
      }}>
        <input
          type="checkbox"
          checked={randomize}
          onChange={(e) => setRandomize(e.target.checked)}
        />
        Randomize order
      </label>

      {baseItems.map((item, index) => (
        <Link
          key={index}
          to={getPath(item.path)}
          style={{
            padding: '1rem',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '0.5rem',
            textAlign: 'center',
            fontSize: '1.2rem'
          }}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default Menu;
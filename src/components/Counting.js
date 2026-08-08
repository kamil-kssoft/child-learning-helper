import CategoryView from './CategoryView';
import { countingItems } from '../config/content';

function CountingTile({ item }) {
  const entry = countingItems.find((c) => c.value === item);
  if (!entry) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        padding: '10px',
        fontSize: 'min(10vw, 10vh)',
      }}
    >
      {Array.from({ length: entry.count }, (_, i) => (
        <span key={i}>{entry.emoji}</span>
      ))}
    </div>
  );
}

function Counting() {
  return (
    <CategoryView
      items={countingItems}
      categoryLabel="liczba"
      renderContent={(item) => ({
        content: <CountingTile item={item} />,
      })}
    />
  );
}

export default Counting;

import { buildQuizRound, generateArrayWithSubitems } from './arrayUtils';

describe('buildQuizRound', () => {
  it('includes the unique target once and fills remaining tiles with other items', () => {
    const values = ['a', 'b', 'c', 'd'];
    const round = buildQuizRound(values, 'b', 3);

    expect(round.items).toHaveLength(3);
    expect(round.items.filter((item) => item === 'b')).toHaveLength(1);
    expect(round.items[round.correctIndex]).toBe('b');
    expect(new Set(round.items).size).toBe(3);
    round.items.forEach((item) => {
      expect(values).toContain(item);
    });
  });
});

describe('generateArrayWithSubitems', () => {
  it('uses each value as the correct answer exactly once in quiz mode', () => {
    const values = ['a', 'b', 'c', 'd'];
    const rounds = generateArrayWithSubitems(values, 2, false);

    expect(rounds).toHaveLength(values.length);

    const correctAnswers = rounds.map((round) => round.items[round.correctIndex]);
    expect(correctAnswers).toEqual(values);
    expect(new Set(correctAnswers).size).toBe(values.length);

    rounds.forEach((round) => {
      expect(round.items).toHaveLength(2);
      expect(new Set(round.items).size).toBe(2);
    });
  });

  it('keeps unique correct answers when randomized', () => {
    const values = ['a', 'b', 'c', 'd', 'e'];
    const rounds = generateArrayWithSubitems(values, 3, true);

    const correctAnswers = rounds.map((round) => round.items[round.correctIndex]);
    expect(correctAnswers.sort()).toEqual([...values].sort());
    expect(new Set(correctAnswers).size).toBe(values.length);
  });

  it('returns single-item rounds in learn mode', () => {
    const values = ['a', 'b', 'c'];
    const rounds = generateArrayWithSubitems(values, 1, false);

    expect(rounds).toEqual([
      { items: ['a'], correctIndex: 0 },
      { items: ['b'], correctIndex: 0 },
      { items: ['c'], correctIndex: 0 },
    ]);
  });
});

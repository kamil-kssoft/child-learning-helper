import {
  getProgressKey,
  markItemComplete,
  getCompletedCount,
  getProgressPercent,
  loadProgress,
} from './learningProgress';

describe('learningProgress', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('derives progress key from learn route query params', () => {
    expect(getProgressKey('/learn', '?start=0&stop=40')).toBe('learn:0-40');
    expect(getProgressKey('/learn', '?start=A&stop=Z')).toBe('learn:A-Z');
  });

  it('derives progress key from category pathname', () => {
    expect(getProgressKey('/fruits', '')).toBe('fruits');
    expect(getProgressKey('/car-brands', '')).toBe('car-brands');
  });

  it('tracks completed items without duplicates', () => {
    markItemComplete('fruits', '🍎');
    markItemComplete('fruits', '🍎');
    markItemComplete('fruits', '🍌');

    expect(getCompletedCount('fruits')).toBe(2);
    expect(getProgressPercent('fruits', 5)).toBe(40);
    expect(loadProgress().fruits).toEqual(['🍎', '🍌']);
  });
});

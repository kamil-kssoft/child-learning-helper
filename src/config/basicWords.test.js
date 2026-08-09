import {
  BASIC_WORD_LEVEL_COUNT,
  WORDS_PER_LEVEL,
  TOTAL_BASIC_WORDS,
  basicWordItems,
  getSourceLabel,
  getTargetLabel,
  isValidBasicWordsDir,
  getDirectionCompletedCount,
} from '../config/basicWords';

describe('basicWords', () => {
  it('has 50 unique keys across 5 levels', () => {
    expect(basicWordItems.length).toBe(TOTAL_BASIC_WORDS);
    const keys = basicWordItems.map((item) => item.key);
    expect(new Set(keys).size).toBe(TOTAL_BASIC_WORDS);
  });

  it('has 10 words per level', () => {
    for (let level = 1; level <= BASIC_WORD_LEVEL_COUNT; level += 1) {
      const levelItems = basicWordItems.filter((item) => item.level === level);
      expect(levelItems.length).toBe(WORDS_PER_LEVEL);
    }
  });

  it('resolves source and target labels by direction', () => {
    const item = basicWordItems[0];
    expect(getSourceLabel(item, 'pl-to-en')).toBe('dzień dobry');
    expect(getTargetLabel(item, 'pl-to-en')).toBe('good morning');
    expect(getSourceLabel(item, 'en-to-pl')).toBe('good morning');
    expect(getTargetLabel(item, 'en-to-pl')).toBe('dzień dobry');
  });

  it('validates direction against locale', () => {
    expect(isValidBasicWordsDir('pl-to-en', 'en')).toBe(true);
    expect(isValidBasicWordsDir('en-to-pl', 'en')).toBe(true);
    expect(isValidBasicWordsDir('pl-to-en', 'pl')).toBe(false);
    expect(isValidBasicWordsDir('pl-to-it', 'en')).toBe(false);
  });

  it('sums direction completed count across levels', () => {
    const counts = {
      'basic-words:pl-to-en:level-1': 3,
      'basic-words:pl-to-en:level-2': 10,
      'basic-words:pl-to-en:level-3': 0,
      'basic-words:pl-to-en:level-4': 5,
      'basic-words:pl-to-en:level-5': 2,
    };
    const getCount = (key) => counts[key] || 0;
    expect(getDirectionCompletedCount('pl-to-en', getCount)).toBe(20);
  });
});

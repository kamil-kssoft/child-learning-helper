import { translate, resolveLocalizedValue, interpolate } from './translate';
import {
  colorItems,
  animalItems,
  shapeItems,
  fruitItems,
  vehicleItems,
  emotionItems,
  countingItems,
  carBrandItems,
  getItemLabel,
  getNumberLabel,
  getLetterLabel,
} from '../config/content';

const ALL_ITEM_LISTS = [
  colorItems,
  animalItems,
  shapeItems,
  fruitItems,
  vehicleItems,
  emotionItems,
  countingItems,
  carBrandItems,
];

describe('translate', () => {
  test('interpolates params', () => {
    expect(interpolate('Find {label}', { label: 'red' })).toBe('Find red');
  });

  test('returns Polish and English UI strings', () => {
    expect(translate('pl', 'feedback.success')).toBe('Brawo!');
    expect(translate('en', 'feedback.success')).toBe('Great job!');
  });

  test('falls back to Polish for unknown locale', () => {
    expect(translate('de', 'menu.randomize')).toBe('Losuj kolejność');
  });
});

describe('resolveLocalizedValue', () => {
  test('resolves nested locale maps with fallback', () => {
    expect(resolveLocalizedValue({ pl: 'czerwony', en: 'red' }, 'en')).toBe('red');
    expect(resolveLocalizedValue({ pl: 'czerwony' }, 'en')).toBe('czerwony');
  });
});

describe('content labels', () => {
  test('every content item has pl and en labels', () => {
    ALL_ITEM_LISTS.flat().forEach((item) => {
      expect(item.labels?.pl).toBeTruthy();
      expect(item.labels?.en).toBeTruthy();
    });
  });

  test('getItemLabel returns locale-specific text', () => {
    const red = colorItems[0];
    expect(getItemLabel(red, 'pl')).toBe('czerwony');
    expect(getItemLabel(red, 'en')).toBe('red');
  });

  test('number and letter labels switch by locale', () => {
    expect(getNumberLabel(2, 'pl')).toBe('dwa');
    expect(getNumberLabel(2, 'en')).toBe('two');
    expect(getLetterLabel('B', 'pl')).toBe('be');
    expect(getLetterLabel('B', 'en')).toBe('bee');
  });
});

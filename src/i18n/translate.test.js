import fs from 'fs';
import path from 'path';
import { translate, resolveLocalizedValue, interpolate } from './translate';
import {
  colorItems,
  animalItems,
  shapeItems,
  fruitItems,
  vehicleItems,
  emotionItems,
  vegetableItems,
  weatherItems,
  bodyPartItems,
  clothesItems,
  professionItems,
  homeItems,
  spaceItems,
  sportItems,
  instrumentItems,
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
  vegetableItems,
  weatherItems,
  bodyPartItems,
  clothesItems,
  professionItems,
  homeItems,
  spaceItems,
  sportItems,
  instrumentItems,
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
    expect(translate('it', 'feedback.success')).toBe('Bravo!');
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
  test('every content item has pl, en, and it labels', () => {
    ALL_ITEM_LISTS.flat().forEach((item) => {
      expect(item.labels?.pl).toBeTruthy();
      expect(item.labels?.en).toBeTruthy();
      expect(item.labels?.it).toBeTruthy();
    });
  });

  test('getItemLabel returns locale-specific text', () => {
    const red = colorItems[0];
    expect(getItemLabel(red, 'pl')).toBe('czerwony');
    expect(getItemLabel(red, 'en')).toBe('red');
    expect(getItemLabel(red, 'it')).toBe('rosso');
  });

  test('body parts category includes chart organs and omit reproductive organs', () => {
    expect(bodyPartItems.length).toBe(18);
    const labels = bodyPartItems.map((item) => item.labels.pl);
    expect(labels.slice(0, 8)).toEqual([
      'oczy', 'nos', 'ucho', 'usta', 'ręka', 'noga', 'stopa', 'głowa',
    ]);
    expect(labels).toEqual(expect.arrayContaining([
      'mózg',
      'tarczyca',
      'płuca',
      'serce',
      'wątroba',
      'żołądek',
      'trzustka',
      'nerki',
      'jelita',
      'pęcherz',
    ]));
    expect(labels.join(' ')).not.toMatch(/rozrod|jądr|jajnik|macic|penis|pochw|nosogard|grasic/i);

    const images = bodyPartItems.filter((item) => String(item.value).endsWith('.png'));
    expect(images).toHaveLength(10);
    images.forEach((item) => {
      const filePath = path.join(__dirname, '../../public/img', item.value);
      expect(fs.existsSync(filePath)).toBe(true);
    });
  });

  test('number and letter labels switch by locale', () => {
    expect(getNumberLabel(2, 'pl')).toBe('dwa');
    expect(getNumberLabel(2, 'en')).toBe('two');
    expect(getNumberLabel(2, 'it')).toBe('due');
    expect(getLetterLabel('B', 'pl')).toBe('be');
    expect(getLetterLabel('B', 'en')).toBe('bee');
    expect(getLetterLabel('B', 'it')).toBe('bi');
  });
});

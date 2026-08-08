const colorItems = [
  { value: '#FF0000', label: 'czerwony' },
  { value: '#00FF00', label: 'zielony' },
  { value: '#0000FF', label: 'niebieski' },
  { value: '#FFFF00', label: 'żółty' },
  { value: '#FFFFFF', label: 'biały' },
  { value: '#000000', label: 'czarny' },
  { value: '#FFA500', label: 'pomarańczowy' },
  { value: '#800080', label: 'fioletowy' },
  { value: '#8B4513', label: 'brązowy' },
];

const animalItems = [
  { value: 'kaczuszka.jpeg', label: 'kaczuszka' },
  { value: 'kon.jpeg', label: 'koń' },
  { value: 'kot.jpg', label: 'kot' },
  { value: 'krolik.jpeg', label: 'królik' },
  { value: 'panda.jpeg', label: 'panda' },
  { value: 'papuga.jpeg', label: 'papuga' },
  { value: 'pingwin.jpeg', label: 'pingwin' },
  { value: 'slimak.jpeg', label: 'ślimak' },
  { value: 'slon.jpeg', label: 'słoń' },
  { value: 'sowa.jpeg', label: 'sowa' },
  { value: 'swinka.jpeg', label: 'świnka' },
  { value: 'tygrys.jpeg', label: 'tygrys' },
  { value: 'wiewiorka.jpg', label: 'wiewiórka' },
  { value: 'zyrafa.jpeg', label: 'żyrafa' },
];

const numberLabels = {
  0: 'zero', 1: 'jeden', 2: 'dwa', 3: 'trzy', 4: 'cztery',
  5: 'pięć', 6: 'sześć', 7: 'siedem', 8: 'osiem', 9: 'dziewięć',
  10: 'dziesięć', 11: 'jedenaście', 12: 'dwanaście', 13: 'trzynaście',
  14: 'czternaście', 15: 'piętnaście', 16: 'szesnaście', 17: 'siedemnaście',
  18: 'osiemnaście', 19: 'dziewiętnaście', 20: 'dwadzieścia',
};

const letterLabels = {
  A: 'a', B: 'be', C: 'ce', D: 'de', E: 'e', F: 'ef', G: 'gie', H: 'ha',
  I: 'i', J: 'jot', K: 'ka', L: 'el', M: 'em', N: 'en', O: 'o', P: 'pe',
  R: 'er', S: 'es', T: 'te', U: 'u', W: 'wu', Y: 'y', Z: 'zet',
};

function getNumberLabel(value) {
  return numberLabels[parseInt(value, 10)] || value;
}

function getLetterLabel(value) {
  return letterLabels[value.toUpperCase()] || value;
}

export {
  colorItems,
  animalItems,
  getNumberLabel,
  getLetterLabel,
};

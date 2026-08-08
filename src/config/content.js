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

const shapeItems = [
  { value: 'circle', label: 'koło' },
  { value: 'square', label: 'kwadrat' },
  { value: 'triangle', label: 'trójkąt' },
  { value: 'star', label: 'gwiazda' },
  { value: 'heart', label: 'serce' },
  { value: 'rectangle', label: 'prostokąt' },
];

const fruitItems = [
  { value: '🍎', label: 'jabłko' },
  { value: '🍌', label: 'banan' },
  { value: '🍐', label: 'gruszka' },
  { value: '🍊', label: 'pomarańcza' },
  { value: '🍓', label: 'truskawka' },
  { value: '🍇', label: 'winogrono' },
  { value: '🍉', label: 'arbuz' },
  { value: '🍒', label: 'wiśnia' },
];

const vehicleItems = [
  { value: '🚗', label: 'samochód' },
  { value: '🚌', label: 'autobus' },
  { value: '🚂', label: 'pociąg' },
  { value: '🚢', label: 'statek' },
  { value: '✈️', label: 'samolot' },
  { value: '🚁', label: 'helikopter' },
  { value: '🚲', label: 'rower' },
  { value: '🚒', label: 'wóz strażacki' },
];

const emotionItems = [
  { value: '😊', label: 'szczęśliwy' },
  { value: '😢', label: 'smutny' },
  { value: '😮', label: 'zaskoczony' },
  { value: '😠', label: 'zły' },
  { value: '😴', label: 'śpiący' },
  { value: '🤩', label: 'zachwycony' },
];

const countingItems = [
  { value: 'count-1-star', label: 'jeden', count: 1, emoji: '⭐' },
  { value: 'count-2-apple', label: 'dwa', count: 2, emoji: '🍎' },
  { value: 'count-3-ball', label: 'trzy', count: 3, emoji: '⚽' },
  { value: 'count-4-flower', label: 'cztery', count: 4, emoji: '🌸' },
  { value: 'count-5-star', label: 'pięć', count: 5, emoji: '⭐' },
  { value: 'count-6-heart', label: 'sześć', count: 6, emoji: '❤️' },
  { value: 'count-7-ball', label: 'siedem', count: 7, emoji: '🎾' },
  { value: 'count-8-flower', label: 'osiem', count: 8, emoji: '🌼' },
  { value: 'count-9-star', label: 'dziewięć', count: 9, emoji: '✨' },
  { value: 'count-10-apple', label: 'dziesięć', count: 10, emoji: '🍏' },
];

const carBrandItems = [
  { value: 'audi.svg', label: 'Audi' },
  { value: 'bmw.svg', label: 'BMW' },
  { value: 'mercedes.svg', label: 'Mercedes' },
  { value: 'volkswagen.svg', label: 'Volkswagen' },
  { value: 'toyota.svg', label: 'Toyota' },
  { value: 'skoda.svg', label: 'Skoda' },
  { value: 'ford.svg', label: 'Ford' },
  { value: 'opel.svg', label: 'Opel' },
  { value: 'renault.svg', label: 'Renault' },
  { value: 'peugeot.svg', label: 'Peugeot' },
  { value: 'citroen.svg', label: 'Citroën' },
  { value: 'fiat.svg', label: 'Fiat' },
  { value: 'kia.svg', label: 'Kia' },
  { value: 'hyundai.svg', label: 'Hyundai' },
  { value: 'nissan.svg', label: 'Nissan' },
  { value: 'mazda.svg', label: 'Mazda' },
  { value: 'volvo.svg', label: 'Volvo' },
  { value: 'seat.svg', label: 'Seat' },
  { value: 'dacia.svg', label: 'Dacia' },
  { value: 'honda.svg', label: 'Honda' },
  { value: 'suzuki.svg', label: 'Suzuki' },
  { value: 'jeep.svg', label: 'Jeep' },
  { value: 'tesla.svg', label: 'Tesla' },
];

export {
  colorItems,
  animalItems,
  shapeItems,
  fruitItems,
  vehicleItems,
  emotionItems,
  countingItems,
  carBrandItems,
  getNumberLabel,
  getLetterLabel,
};

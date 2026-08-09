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
  21: 'dwadzieścia jeden', 22: 'dwadzieścia dwa', 23: 'dwadzieścia trzy',
  24: 'dwadzieścia cztery', 25: 'dwadzieścia pięć', 26: 'dwadzieścia sześć',
  27: 'dwadzieścia siedem', 28: 'dwadzieścia osiem', 29: 'dwadzieścia dziewięć',
  30: 'trzydzieści', 31: 'trzydzieści jeden', 32: 'trzydzieści dwa',
  33: 'trzydzieści trzy', 34: 'trzydzieści cztery', 35: 'trzydzieści pięć',
  36: 'trzydzieści sześć', 37: 'trzydzieści siedem', 38: 'trzydzieści osiem',
  39: 'trzydzieści dziewięć', 40: 'czterdzieści',
};

const letterLabels = {
  A: 'a', B: 'be', C: 'ce', D: 'de', E: 'e', F: 'ef', G: 'gie', H: 'ha',
  I: 'i', J: 'jot', K: 'ka', L: 'el', M: 'em', N: 'en', O: 'o', P: 'pe',
  Q: 'ku', R: 'er', S: 'es', T: 'te', U: 'u', V: 've', W: 'wu', X: 'eks',
  Y: 'y', Z: 'zet',
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
  { value: 'car-brands/alfa-romeo.png', label: 'alfa romeo' },
  { value: 'car-brands/aston-martin.png', label: 'aston martin' },
  { value: 'car-brands/audi.png', label: 'audi' },
  { value: 'car-brands/bentley.png', label: 'bentley' },
  { value: 'car-brands/bmw.png', label: 'be em wu' },
  { value: 'car-brands/bugatti.png', label: 'bugatti' },
  { value: 'car-brands/chrysler.png', label: 'chrysler' },
  { value: 'car-brands/citroen.png', label: 'citroen' },
  { value: 'car-brands/dacia.png', label: 'dacia' },
  { value: 'car-brands/daewoo.png', label: 'daewoo' },
  { value: 'car-brands/daihatsu.png', label: 'daihatsu' },
  { value: 'car-brands/dodge.png', label: 'dodge' },
  { value: 'car-brands/ferrari.png', label: 'ferrari' },
  { value: 'car-brands/fiat.png', label: 'fiat' },
  { value: 'car-brands/ford.png', label: 'ford' },
  { value: 'car-brands/holden.png', label: 'holden' },
  { value: 'car-brands/honda.png', label: 'honda' },
  { value: 'car-brands/hyundai.png', label: 'hyundai' },
  { value: 'car-brands/jaguar.png', label: 'jaguar' },
  { value: 'car-brands/jeep.png', label: 'dżip' },
  { value: 'car-brands/kia.png', label: 'kia' },
  { value: 'car-brands/koenigsegg.png', label: 'kenigseg' },
  { value: 'car-brands/lamborghini.png', label: 'lamborghini' },
  { value: 'car-brands/land-rover.png', label: 'land rover' },
  { value: 'car-brands/lexus.png', label: 'lexus' },
  { value: 'car-brands/maserati.png', label: 'maserati' },
  { value: 'car-brands/maybach.png', label: 'maybach' },
  { value: 'car-brands/mazda.png', label: 'mazda' },
  { value: 'car-brands/mclaren.png', label: 'mclaren' },
  { value: 'car-brands/mercedes.png', label: 'mercedes' },
  { value: 'car-brands/mini.png', label: 'mini' },
  { value: 'car-brands/mitsubishi.png', label: 'mitsubishi' },
  { value: 'car-brands/nissan.png', label: 'nissan' },
  { value: 'car-brands/opel.png', label: 'opel' },
  { value: 'car-brands/peugeot.png', label: 'peżo' },
  { value: 'car-brands/porsche.png', label: 'porsche' },
  { value: 'car-brands/renault.png', label: 'reno' },
  { value: 'car-brands/rolls-royce.png', label: 'rolls royce' },
  { value: 'car-brands/rover.png', label: 'rover' },
  { value: 'car-brands/saab.png', label: 'saab' },
  { value: 'car-brands/seat.png', label: 'seat' },
  { value: 'car-brands/skoda.png', label: 'škoda' },
  { value: 'car-brands/smart.png', label: 'smart' },
  { value: 'car-brands/ssangyong.png', label: 'ssangyong' },
  { value: 'car-brands/subaru.png', label: 'subaru' },
  { value: 'car-brands/suzuki.png', label: 'suzuki' },
  { value: 'car-brands/toyota.png', label: 'toyota' },
  { value: 'car-brands/volkswagen.png', label: 'volkswagen' },
  { value: 'car-brands/volvo.png', label: 'volvo' },
];

const animalFilenames = animalItems.map((animal) => animal.value);
const carBrandFilenames = carBrandItems.map((brand) => brand.value);

export {
  colorItems,
  animalItems,
  animalFilenames,
  carBrandItems,
  carBrandFilenames,
  shapeItems,
  fruitItems,
  vehicleItems,
  emotionItems,
  countingItems,
  getNumberLabel,
  getLetterLabel,
};

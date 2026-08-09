const colorItems = [
  { value: '#FF0000', labels: { pl: 'czerwony', en: 'red' } },
  { value: '#00FF00', labels: { pl: 'zielony', en: 'green' } },
  { value: '#0000FF', labels: { pl: 'niebieski', en: 'blue' } },
  { value: '#FFFF00', labels: { pl: 'żółty', en: 'yellow' } },
  { value: '#FFFFFF', labels: { pl: 'biały', en: 'white' } },
  { value: '#000000', labels: { pl: 'czarny', en: 'black' } },
  { value: '#FFA500', labels: { pl: 'pomarańczowy', en: 'orange' } },
  { value: '#800080', labels: { pl: 'fioletowy', en: 'purple' } },
  { value: '#8B4513', labels: { pl: 'brązowy', en: 'brown' } },
];

const animalItems = [
  { value: 'kaczuszka.jpeg', labels: { pl: 'kaczuszka', en: 'duckling' } },
  { value: 'kon.jpeg', labels: { pl: 'koń', en: 'horse' } },
  { value: 'kot.jpg', labels: { pl: 'kot', en: 'cat' } },
  { value: 'krolik.jpeg', labels: { pl: 'królik', en: 'rabbit' } },
  { value: 'panda.jpeg', labels: { pl: 'panda', en: 'panda' } },
  { value: 'papuga.jpeg', labels: { pl: 'papuga', en: 'parrot' } },
  { value: 'pingwin.jpeg', labels: { pl: 'pingwin', en: 'penguin' } },
  { value: 'slimak.jpeg', labels: { pl: 'ślimak', en: 'snail' } },
  { value: 'slon.jpeg', labels: { pl: 'słoń', en: 'elephant' } },
  { value: 'sowa.jpeg', labels: { pl: 'sowa', en: 'owl' } },
  { value: 'swinka.jpeg', labels: { pl: 'świnka', en: 'piggy' } },
  { value: 'tygrys.jpeg', labels: { pl: 'tygrys', en: 'tiger' } },
  { value: 'wiewiorka.jpg', labels: { pl: 'wiewiórka', en: 'squirrel' } },
  { value: 'zyrafa.jpeg', labels: { pl: 'żyrafa', en: 'giraffe' } },
];

const numberLabels = {
  pl: {
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
  },
  en: {
    0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four',
    5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine',
    10: 'ten', 11: 'eleven', 12: 'twelve', 13: 'thirteen',
    14: 'fourteen', 15: 'fifteen', 16: 'sixteen', 17: 'seventeen',
    18: 'eighteen', 19: 'nineteen', 20: 'twenty',
    21: 'twenty one', 22: 'twenty two', 23: 'twenty three',
    24: 'twenty four', 25: 'twenty five', 26: 'twenty six',
    27: 'twenty seven', 28: 'twenty eight', 29: 'twenty nine',
    30: 'thirty', 31: 'thirty one', 32: 'thirty two',
    33: 'thirty three', 34: 'thirty four', 35: 'thirty five',
    36: 'thirty six', 37: 'thirty seven', 38: 'thirty eight',
    39: 'thirty nine', 40: 'forty',
  },
};

const letterLabels = {
  pl: {
    A: 'a', B: 'be', C: 'ce', D: 'de', E: 'e', F: 'ef', G: 'gie', H: 'ha',
    I: 'i', J: 'jot', K: 'ka', L: 'el', M: 'em', N: 'en', O: 'o', P: 'pe',
    Q: 'ku', R: 'er', S: 'es', T: 'te', U: 'u', V: 've', W: 'wu', X: 'eks',
    Y: 'y', Z: 'zet',
  },
  en: {
    A: 'ay', B: 'bee', C: 'see', D: 'dee', E: 'ee', F: 'eff', G: 'jee', H: 'aitch',
    I: 'eye', J: 'jay', K: 'kay', L: 'ell', M: 'em', N: 'en', O: 'oh', P: 'pee',
    Q: 'cue', R: 'ar', S: 'ess', T: 'tee', U: 'you', V: 'vee', W: 'double you', X: 'ex',
    Y: 'why', Z: 'zee',
  },
};

const shapeItems = [
  { value: 'circle', labels: { pl: 'koło', en: 'circle' } },
  { value: 'square', labels: { pl: 'kwadrat', en: 'square' } },
  { value: 'triangle', labels: { pl: 'trójkąt', en: 'triangle' } },
  { value: 'star', labels: { pl: 'gwiazda', en: 'star' } },
  { value: 'heart', labels: { pl: 'serce', en: 'heart' } },
  { value: 'rectangle', labels: { pl: 'prostokąt', en: 'rectangle' } },
];

const fruitItems = [
  { value: '🍎', labels: { pl: 'jabłko', en: 'apple' } },
  { value: '🍌', labels: { pl: 'banan', en: 'banana' } },
  { value: '🍐', labels: { pl: 'gruszka', en: 'pear' } },
  { value: '🍊', labels: { pl: 'pomarańcza', en: 'orange' } },
  { value: '🍓', labels: { pl: 'truskawka', en: 'strawberry' } },
  { value: '🍇', labels: { pl: 'winogrono', en: 'grapes' } },
  { value: '🍉', labels: { pl: 'arbuz', en: 'watermelon' } },
  { value: '🍒', labels: { pl: 'wiśnia', en: 'cherry' } },
];

const vehicleItems = [
  { value: '🚗', labels: { pl: 'samochód', en: 'car' } },
  { value: '🚌', labels: { pl: 'autobus', en: 'bus' } },
  { value: '🚂', labels: { pl: 'pociąg', en: 'train' } },
  { value: '🚢', labels: { pl: 'statek', en: 'ship' } },
  { value: '✈️', labels: { pl: 'samolot', en: 'airplane' } },
  { value: '🚁', labels: { pl: 'helikopter', en: 'helicopter' } },
  { value: '🚲', labels: { pl: 'rower', en: 'bike' } },
  { value: '🚒', labels: { pl: 'wóz strażacki', en: 'fire truck' } },
];

const emotionItems = [
  { value: '😊', labels: { pl: 'szczęśliwy', en: 'happy' } },
  { value: '😢', labels: { pl: 'smutny', en: 'sad' } },
  { value: '😮', labels: { pl: 'zaskoczony', en: 'surprised' } },
  { value: '😠', labels: { pl: 'zły', en: 'angry' } },
  { value: '😴', labels: { pl: 'śpiący', en: 'sleepy' } },
  { value: '🤩', labels: { pl: 'zachwycony', en: 'amazed' } },
];

const countingItems = [
  { value: 'count-1-star', labels: { pl: 'jeden', en: 'one' }, count: 1, emoji: '⭐' },
  { value: 'count-2-apple', labels: { pl: 'dwa', en: 'two' }, count: 2, emoji: '🍎' },
  { value: 'count-3-ball', labels: { pl: 'trzy', en: 'three' }, count: 3, emoji: '⚽' },
  { value: 'count-4-flower', labels: { pl: 'cztery', en: 'four' }, count: 4, emoji: '🌸' },
  { value: 'count-5-star', labels: { pl: 'pięć', en: 'five' }, count: 5, emoji: '⭐' },
  { value: 'count-6-heart', labels: { pl: 'sześć', en: 'six' }, count: 6, emoji: '❤️' },
  { value: 'count-7-ball', labels: { pl: 'siedem', en: 'seven' }, count: 7, emoji: '🎾' },
  { value: 'count-8-flower', labels: { pl: 'osiem', en: 'eight' }, count: 8, emoji: '🌼' },
  { value: 'count-9-star', labels: { pl: 'dziewięć', en: 'nine' }, count: 9, emoji: '✨' },
  { value: 'count-10-apple', labels: { pl: 'dziesięć', en: 'ten' }, count: 10, emoji: '🍏' },
];

const carBrandItems = [
  { value: 'car-brands/alfa-romeo.png', labels: { pl: 'alfa romeo', en: 'alfa romeo' } },
  { value: 'car-brands/aston-martin.png', labels: { pl: 'aston martin', en: 'aston martin' } },
  { value: 'car-brands/audi.png', labels: { pl: 'audi', en: 'audi' } },
  { value: 'car-brands/bentley.png', labels: { pl: 'bentley', en: 'bentley' } },
  { value: 'car-brands/bmw.png', labels: { pl: 'be em wu', en: 'B M W' } },
  { value: 'car-brands/bugatti.png', labels: { pl: 'bugatti', en: 'bugatti' } },
  { value: 'car-brands/chrysler.png', labels: { pl: 'chrysler', en: 'chrysler' } },
  { value: 'car-brands/citroen.png', labels: { pl: 'citroen', en: 'citroen' } },
  { value: 'car-brands/dacia.png', labels: { pl: 'dacia', en: 'dacia' } },
  { value: 'car-brands/daewoo.png', labels: { pl: 'daewoo', en: 'daewoo' } },
  { value: 'car-brands/daihatsu.png', labels: { pl: 'daihatsu', en: 'daihatsu' } },
  { value: 'car-brands/dodge.png', labels: { pl: 'dodge', en: 'dodge' } },
  { value: 'car-brands/ferrari.png', labels: { pl: 'ferrari', en: 'ferrari' } },
  { value: 'car-brands/fiat.png', labels: { pl: 'fiat', en: 'fiat' } },
  { value: 'car-brands/ford.png', labels: { pl: 'ford', en: 'ford' } },
  { value: 'car-brands/holden.png', labels: { pl: 'holden', en: 'holden' } },
  { value: 'car-brands/honda.png', labels: { pl: 'honda', en: 'honda' } },
  { value: 'car-brands/hyundai.png', labels: { pl: 'hyundai', en: 'hyundai' } },
  { value: 'car-brands/jaguar.png', labels: { pl: 'jaguar', en: 'jaguar' } },
  { value: 'car-brands/jeep.png', labels: { pl: 'dżip', en: 'jeep' } },
  { value: 'car-brands/kia.png', labels: { pl: 'kia', en: 'kia' } },
  { value: 'car-brands/lamborghini.png', labels: { pl: 'lamborghini', en: 'lamborghini' } },
  { value: 'car-brands/land-rover.png', labels: { pl: 'land rover', en: 'land rover' } },
  { value: 'car-brands/lexus.png', labels: { pl: 'lexus', en: 'lexus' } },
  { value: 'car-brands/maserati.png', labels: { pl: 'maserati', en: 'maserati' } },
  { value: 'car-brands/maybach.png', labels: { pl: 'maybach', en: 'maybach' } },
  { value: 'car-brands/mazda.png', labels: { pl: 'mazda', en: 'mazda' } },
  { value: 'car-brands/mclaren.png', labels: { pl: 'mclaren', en: 'mclaren' } },
  { value: 'car-brands/mercedes.png', labels: { pl: 'mercedes', en: 'mercedes' } },
  { value: 'car-brands/mini.png', labels: { pl: 'mini', en: 'mini' } },
  { value: 'car-brands/mitsubishi.png', labels: { pl: 'mitsubishi', en: 'mitsubishi' } },
  { value: 'car-brands/nissan.png', labels: { pl: 'nissan', en: 'nissan' } },
  { value: 'car-brands/opel.png', labels: { pl: 'opel', en: 'opel' } },
  { value: 'car-brands/peugeot.png', labels: { pl: 'peżo', en: 'peugeot' } },
  { value: 'car-brands/porsche.png', labels: { pl: 'porsche', en: 'porsche' } },
  { value: 'car-brands/renault.png', labels: { pl: 'reno', en: 'renault' } },
  { value: 'car-brands/rolls-royce.png', labels: { pl: 'rolls royce', en: 'rolls royce' } },
  { value: 'car-brands/rover.png', labels: { pl: 'rover', en: 'rover' } },
  { value: 'car-brands/saab.png', labels: { pl: 'saab', en: 'saab' } },
  { value: 'car-brands/seat.png', labels: { pl: 'seat', en: 'seat' } },
  { value: 'car-brands/skoda.png', labels: { pl: 'škoda', en: 'skoda' } },
  { value: 'car-brands/smart.png', labels: { pl: 'smart', en: 'smart' } },
  { value: 'car-brands/ssangyong.png', labels: { pl: 'ssangyong', en: 'ssangyong' } },
  { value: 'car-brands/subaru.png', labels: { pl: 'subaru', en: 'subaru' } },
  { value: 'car-brands/suzuki.png', labels: { pl: 'suzuki', en: 'suzuki' } },
  { value: 'car-brands/toyota.png', labels: { pl: 'toyota', en: 'toyota' } },
  { value: 'car-brands/volkswagen.png', labels: { pl: 'volkswagen', en: 'volkswagen' } },
  { value: 'car-brands/volvo.png', labels: { pl: 'volvo', en: 'volvo' } },
];

const animalFilenames = animalItems.map((animal) => animal.value);
const carBrandFilenames = carBrandItems.map((brand) => brand.value);

function getItemLabel(item, locale = 'pl') {
  if (!item) return '';
  if (typeof item === 'string') return item;
  if (item.labels) {
    return item.labels[locale] || item.labels.pl || item.value || '';
  }
  if (item.label) {
    return typeof item.label === 'string'
      ? item.label
      : item.label[locale] || item.label.pl || item.value || '';
  }
  return item.value || '';
}

function getNumberLabel(value, locale = 'pl') {
  const map = numberLabels[locale] || numberLabels.pl;
  const key = parseInt(value, 10);
  return map[key] || String(value);
}

function getLetterLabel(value, locale = 'pl') {
  const map = letterLabels[locale] || letterLabels.pl;
  const key = String(value).toUpperCase();
  return map[key] || String(value);
}

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
  numberLabels,
  letterLabels,
  getItemLabel,
  getNumberLabel,
  getLetterLabel,
};

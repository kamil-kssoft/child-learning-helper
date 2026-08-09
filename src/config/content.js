const colorItems = [
  { value: '#FF0000', labels: { pl: 'czerwony', en: 'red', it: 'rosso' } },
  { value: '#00FF00', labels: { pl: 'zielony', en: 'green', it: 'verde' } },
  { value: '#0000FF', labels: { pl: 'niebieski', en: 'blue', it: 'blu' } },
  { value: '#FFFF00', labels: { pl: 'żółty', en: 'yellow', it: 'giallo' } },
  { value: '#FFFFFF', labels: { pl: 'biały', en: 'white', it: 'bianco' } },
  { value: '#000000', labels: { pl: 'czarny', en: 'black', it: 'nero' } },
  { value: '#FFA500', labels: { pl: 'pomarańczowy', en: 'orange', it: 'arancione' } },
  { value: '#800080', labels: { pl: 'fioletowy', en: 'purple', it: 'viola' } },
  { value: '#8B4513', labels: { pl: 'brązowy', en: 'brown', it: 'marrone' } },
];

const animalItems = [
  { value: 'kaczuszka.jpeg', labels: { pl: 'kaczuszka', en: 'duckling', it: 'anatroccolo' } },
  { value: 'kon.jpeg', labels: { pl: 'koń', en: 'horse', it: 'cavallo' } },
  { value: 'kot.jpg', labels: { pl: 'kot', en: 'cat', it: 'gatto' } },
  { value: 'krolik.jpeg', labels: { pl: 'królik', en: 'rabbit', it: 'coniglio' } },
  { value: 'panda.jpeg', labels: { pl: 'panda', en: 'panda', it: 'panda' } },
  { value: 'papuga.jpeg', labels: { pl: 'papuga', en: 'parrot', it: 'pappagallo' } },
  { value: 'pingwin.jpeg', labels: { pl: 'pingwin', en: 'penguin', it: 'pinguino' } },
  { value: 'slimak.jpeg', labels: { pl: 'ślimak', en: 'snail', it: 'lumaca' } },
  { value: 'slon.jpeg', labels: { pl: 'słoń', en: 'elephant', it: 'elefante' } },
  { value: 'sowa.jpeg', labels: { pl: 'sowa', en: 'owl', it: 'gufo' } },
  { value: 'swinka.jpeg', labels: { pl: 'świnka', en: 'piggy', it: 'maialino' } },
  { value: 'tygrys.jpeg', labels: { pl: 'tygrys', en: 'tiger', it: 'tigre' } },
  { value: 'wiewiorka.jpg', labels: { pl: 'wiewiórka', en: 'squirrel', it: 'scoiattolo' } },
  { value: 'zyrafa.jpeg', labels: { pl: 'żyrafa', en: 'giraffe', it: 'giraffa' } },
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
  it: {
    0: 'zero', 1: 'uno', 2: 'due', 3: 'tre', 4: 'quattro',
    5: 'cinque', 6: 'sei', 7: 'sette', 8: 'otto', 9: 'nove',
    10: 'dieci', 11: 'undici', 12: 'dodici', 13: 'tredici',
    14: 'quattordici', 15: 'quindici', 16: 'sedici', 17: 'diciassette',
    18: 'diciotto', 19: 'diciannove', 20: 'venti',
    21: 'ventuno', 22: 'ventidue', 23: 'ventitré',
    24: 'ventiquattro', 25: 'venticinque', 26: 'ventisei',
    27: 'ventisette', 28: 'ventotto', 29: 'ventinove',
    30: 'trenta', 31: 'trentuno', 32: 'trentadue',
    33: 'trentatré', 34: 'trentaquattro', 35: 'trentacinque',
    36: 'trentasei', 37: 'trentasette', 38: 'trentotto',
    39: 'trentanove', 40: 'quaranta',
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
  it: {
    A: 'a', B: 'bi', C: 'ci', D: 'di', E: 'e', F: 'effe', G: 'gi', H: 'acca',
    I: 'i', J: 'i lunga', K: 'kappa', L: 'elle', M: 'emme', N: 'enne', O: 'o', P: 'pi',
    Q: 'cu', R: 'erre', S: 'esse', T: 'ti', U: 'u', V: 'vu', W: 'doppia vu', X: 'ics',
    Y: 'ipsilon', Z: 'zeta',
  },
};

const shapeItems = [
  { value: 'circle', labels: { pl: 'koło', en: 'circle', it: 'cerchio' } },
  { value: 'square', labels: { pl: 'kwadrat', en: 'square', it: 'quadrato' } },
  { value: 'triangle', labels: { pl: 'trójkąt', en: 'triangle', it: 'triangolo' } },
  { value: 'star', labels: { pl: 'gwiazda', en: 'star', it: 'stella' } },
  { value: 'heart', labels: { pl: 'serce', en: 'heart', it: 'cuore' } },
  { value: 'rectangle', labels: { pl: 'prostokąt', en: 'rectangle', it: 'rettangolo' } },
];

const fruitItems = [
  { value: '🍎', labels: { pl: 'jabłko', en: 'apple', it: 'mela' } },
  { value: '🍌', labels: { pl: 'banan', en: 'banana', it: 'banana' } },
  { value: '🍐', labels: { pl: 'gruszka', en: 'pear', it: 'pera' } },
  { value: '🍊', labels: { pl: 'pomarańcza', en: 'orange', it: 'arancione' } },
  { value: '🍓', labels: { pl: 'truskawka', en: 'strawberry', it: 'fragola' } },
  { value: '🍇', labels: { pl: 'winogrono', en: 'grapes', it: 'uva' } },
  { value: '🍉', labels: { pl: 'arbuz', en: 'watermelon', it: 'anguria' } },
  { value: '🍒', labels: { pl: 'wiśnia', en: 'cherry', it: 'ciliegia' } },
];

const vehicleItems = [
  { value: '🚗', labels: { pl: 'samochód', en: 'car', it: 'macchina' } },
  { value: '🚌', labels: { pl: 'autobus', en: 'bus', it: 'autobus' } },
  { value: '🚂', labels: { pl: 'pociąg', en: 'train', it: 'treno' } },
  { value: '🚢', labels: { pl: 'statek', en: 'ship', it: 'nave' } },
  { value: '✈️', labels: { pl: 'samolot', en: 'airplane', it: 'aereo' } },
  { value: '🚁', labels: { pl: 'helikopter', en: 'helicopter', it: 'elicottero' } },
  { value: '🚲', labels: { pl: 'rower', en: 'bike', it: 'bicicletta' } },
  { value: '🚒', labels: { pl: 'wóz strażacki', en: 'fire truck', it: 'camion dei pompieri' } },
];

const emotionItems = [
  { value: '😊', labels: { pl: 'szczęśliwy', en: 'happy', it: 'felice' } },
  { value: '😢', labels: { pl: 'smutny', en: 'sad', it: 'triste' } },
  { value: '😮', labels: { pl: 'zaskoczony', en: 'surprised', it: 'sorpreso' } },
  { value: '😠', labels: { pl: 'zły', en: 'angry', it: 'arrabbiato' } },
  { value: '😴', labels: { pl: 'śpiący', en: 'sleepy', it: 'assonnato' } },
  { value: '🤩', labels: { pl: 'zachwycony', en: 'amazed', it: 'stupito' } },
];

const vegetableItems = [
  { value: '🥕', labels: { pl: 'marchewka', en: 'carrot', it: 'carota' } },
  { value: '🍅', labels: { pl: 'pomidor', en: 'tomato', it: 'pomodoro' } },
  { value: '🥒', labels: { pl: 'ogórek', en: 'cucumber', it: 'cetriolo' } },
  { value: '🥦', labels: { pl: 'brokuł', en: 'broccoli', it: 'broccoli' } },
  { value: '🥔', labels: { pl: 'ziemniak', en: 'potato', it: 'patata' } },
  { value: '🌽', labels: { pl: 'kukurydza', en: 'corn', it: 'mais' } },
  { value: '🫑', labels: { pl: 'papryka', en: 'pepper', it: 'peperone' } },
  { value: '🧅', labels: { pl: 'cebula', en: 'onion', it: 'cipolla' } },
];

const weatherItems = [
  { value: '☀️', labels: { pl: 'słońce', en: 'sun', it: 'sole' } },
  { value: '🌧️', labels: { pl: 'deszcz', en: 'rain', it: 'pioggia' } },
  { value: '❄️', labels: { pl: 'śnieg', en: 'snow', it: 'neve' } },
  { value: '☁️', labels: { pl: 'chmura', en: 'cloud', it: 'nuvola' } },
  { value: '🌈', labels: { pl: 'tęcza', en: 'rainbow', it: 'arcobaleno' } },
  { value: '⛈️', labels: { pl: 'burza', en: 'storm', it: 'temporale' } },
  { value: '💨', labels: { pl: 'wiatr', en: 'wind', it: 'vento' } },
  { value: '🌤️', labels: { pl: 'pogodnie', en: 'partly sunny', it: 'parzialmente soleggiato' } },
];

const bodyPartItems = [
  { value: '👀', labels: { pl: 'oczy', en: 'eyes', it: 'occhi' } },
  { value: '👃', labels: { pl: 'nos', en: 'nose', it: 'naso' } },
  { value: '👂', labels: { pl: 'ucho', en: 'ear', it: 'orecchio' } },
  { value: '👄', labels: { pl: 'usta', en: 'mouth', it: 'bocca' } },
  { value: '✋', labels: { pl: 'ręka', en: 'hand', it: 'mano' } },
  { value: '🦵', labels: { pl: 'noga', en: 'leg', it: 'gamba' } },
  { value: '🦶', labels: { pl: 'stopa', en: 'foot', it: 'piede' } },
  { value: '🧠', labels: { pl: 'głowa', en: 'head', it: 'testa' } },
];

const clothesItems = [
  { value: '👕', labels: { pl: 'koszulka', en: 't-shirt', it: 'maglietta' } },
  { value: '👖', labels: { pl: 'spodnie', en: 'pants', it: 'pantaloni' } },
  { value: '🧥', labels: { pl: 'kurtka', en: 'jacket', it: 'giacca' } },
  { value: '👗', labels: { pl: 'sukienka', en: 'dress', it: 'vestito' } },
  { value: '🧦', labels: { pl: 'skarpetki', en: 'socks', it: 'calzini' } },
  { value: '👟', labels: { pl: 'buty', en: 'shoes', it: 'scarpe' } },
  { value: '🧢', labels: { pl: 'czapka', en: 'cap', it: 'cappello' } },
  { value: '🧤', labels: { pl: 'rękawiczki', en: 'gloves', it: 'guanti' } },
];

const professionItems = [
  { value: '👨‍⚕️', labels: { pl: 'lekarz', en: 'doctor', it: 'dottore' } },
  { value: '👨‍🚒', labels: { pl: 'strażak', en: 'firefighter', it: 'pompiere' } },
  { value: '👮', labels: { pl: 'policjant', en: 'police officer', it: 'poliziotto' } },
  { value: '👩‍🏫', labels: { pl: 'nauczyciel', en: 'teacher', it: 'insegnante' } },
  { value: '👨‍🍳', labels: { pl: 'kucharz', en: 'chef', it: 'cuoco' } },
  { value: '👷', labels: { pl: 'budowlaniec', en: 'builder', it: 'muratore' } },
  { value: '👩‍🌾', labels: { pl: 'rolnik', en: 'farmer', it: 'contadino' } },
  { value: '👨‍✈️', labels: { pl: 'pilot', en: 'pilot', it: 'pilota' } },
];

const homeItems = [
  { value: '🛏️', labels: { pl: 'łóżko', en: 'bed', it: 'letto' } },
  { value: '🪑', labels: { pl: 'krzesło', en: 'chair', it: 'sedia' } },
  { value: '🚪', labels: { pl: 'drzwi', en: 'door', it: 'porta' } },
  { value: '🪟', labels: { pl: 'okno', en: 'window', it: 'finestra' } },
  { value: '💡', labels: { pl: 'lampa', en: 'lamp', it: 'lampada' } },
  { value: '🍽️', labels: { pl: 'talerz', en: 'plate', it: 'piatto' } },
  { value: '🚿', labels: { pl: 'prysznic', en: 'shower', it: 'doccia' } },
  { value: '🛁', labels: { pl: 'wanna', en: 'bathtub', it: 'vasca da bagno' } },
];

const spaceItems = [
  { value: '🚀', labels: { pl: 'rakieta', en: 'rocket', it: 'razzo' } },
  { value: '🌙', labels: { pl: 'księżyc', en: 'moon', it: 'luna' } },
  { value: '⭐', labels: { pl: 'gwiazda', en: 'star', it: 'stella' } },
  { value: '🪐', labels: { pl: 'planeta', en: 'planet', it: 'pianeta' } },
  { value: '🌍', labels: { pl: 'ziemia', en: 'earth', it: 'terra' } },
  { value: '👨‍🚀', labels: { pl: 'astronauta', en: 'astronaut', it: 'astronauta' } },
  { value: '🛸', labels: { pl: 'statek kosmiczny', en: 'spaceship', it: 'astronave' } },
  { value: '☄️', labels: { pl: 'kometa', en: 'comet', it: 'cometa' } },
];

const sportItems = [
  { value: '⚽', labels: { pl: 'piłka nożna', en: 'soccer', it: 'calcio' } },
  { value: '🏀', labels: { pl: 'koszykówka', en: 'basketball', it: 'pallacanestro' } },
  { value: '🏊', labels: { pl: 'pływanie', en: 'swimming', it: 'nuoto' } },
  { value: '🏃', labels: { pl: 'bieganie', en: 'running', it: 'corsa' } },
  { value: '🎾', labels: { pl: 'tenis', en: 'tennis', it: 'tennis' } },
  { value: '⛸️', labels: { pl: 'łyżwy', en: 'ice skating', it: 'pattinaggio sul ghiaccio' } },
  { value: '🤸', labels: { pl: 'gimnastyka', en: 'gymnastics', it: 'ginnastica' } },
  { value: '🏂', labels: { pl: 'snowboard', en: 'snowboarding', it: 'snowboard' } },
];

const instrumentItems = [
  { value: '🎸', labels: { pl: 'gitara', en: 'guitar', it: 'chitarra' } },
  { value: '🥁', labels: { pl: 'bęben', en: 'drum', it: 'tamburo' } },
  { value: '🎹', labels: { pl: 'pianino', en: 'piano', it: 'pianoforte' } },
  { value: '🎻', labels: { pl: 'skrzypce', en: 'violin', it: 'violino' } },
  { value: '🪈', labels: { pl: 'flet', en: 'flute', it: 'flauto' } },
  { value: '🎺', labels: { pl: 'trąbka', en: 'trumpet', it: 'tromba' } },
  { value: '🪗', labels: { pl: 'akordeon', en: 'accordion', it: 'fisarmonica' } },
  { value: '🎷', labels: { pl: 'saksofon', en: 'saxophone', it: 'sassofono' } },
];

const countingItems = [
  { value: 'count-1-star', labels: { pl: 'jeden', en: 'one', it: 'uno' }, count: 1, emoji: '⭐' },
  { value: 'count-2-apple', labels: { pl: 'dwa', en: 'two', it: 'due' }, count: 2, emoji: '🍎' },
  { value: 'count-3-ball', labels: { pl: 'trzy', en: 'three', it: 'tre' }, count: 3, emoji: '⚽' },
  { value: 'count-4-flower', labels: { pl: 'cztery', en: 'four', it: 'quattro' }, count: 4, emoji: '🌸' },
  { value: 'count-5-star', labels: { pl: 'pięć', en: 'five', it: 'cinque' }, count: 5, emoji: '⭐' },
  { value: 'count-6-heart', labels: { pl: 'sześć', en: 'six', it: 'sei' }, count: 6, emoji: '❤️' },
  { value: 'count-7-ball', labels: { pl: 'siedem', en: 'seven', it: 'sette' }, count: 7, emoji: '🎾' },
  { value: 'count-8-flower', labels: { pl: 'osiem', en: 'eight', it: 'otto' }, count: 8, emoji: '🌼' },
  { value: 'count-9-star', labels: { pl: 'dziewięć', en: 'nine', it: 'nove' }, count: 9, emoji: '✨' },
  { value: 'count-10-apple', labels: { pl: 'dziesięć', en: 'ten', it: 'dieci' }, count: 10, emoji: '🍏' },
];

const flagItems = [
  { value: '🇫🇷', labels: { pl: 'Francja', en: 'France', it: 'Francia' } },
  { value: '🇪🇸', labels: { pl: 'Hiszpania', en: 'Spain', it: 'Spagna' } },
  { value: '🇺🇸', labels: { pl: 'Stany Zjednoczone', en: 'United States', it: 'Stati Uniti' } },
  { value: '🇨🇳', labels: { pl: 'Chiny', en: 'China', it: 'Cina' } },
  { value: '🇮🇹', labels: { pl: 'Włochy', en: 'Italy', it: 'Italia' } },
  { value: '🇹🇷', labels: { pl: 'Turcja', en: 'Turkey', it: 'Turchia' } },
  { value: '🇲🇽', labels: { pl: 'Meksyk', en: 'Mexico', it: 'Messico' } },
  { value: '🇩🇪', labels: { pl: 'Niemcy', en: 'Germany', it: 'Germania' } },
  { value: '🇹🇭', labels: { pl: 'Tajlandia', en: 'Thailand', it: 'Tailandia' } },
  { value: '🇬🇧', labels: { pl: 'Wielka Brytania', en: 'United Kingdom', it: 'Regno Unito' } },
  { value: '🇯🇵', labels: { pl: 'Japonia', en: 'Japan', it: 'Giappone' } },
  { value: '🇦🇹', labels: { pl: 'Austria', en: 'Austria', it: 'Austria' } },
  { value: '🇬🇷', labels: { pl: 'Grecja', en: 'Greece', it: 'Grecia' } },
  { value: '🇵🇹', labels: { pl: 'Portugalia', en: 'Portugal', it: 'Portogallo' } },
  { value: '🇳🇱', labels: { pl: 'Holandia', en: 'Netherlands', it: 'Paesi Bassi' } },
  { value: '🇵🇱', labels: { pl: 'Polska', en: 'Poland', it: 'Polonia' } },
  { value: '🇭🇷', labels: { pl: 'Chorwacja', en: 'Croatia', it: 'Croazia' } },
  { value: '🇨🇭', labels: { pl: 'Szwajcaria', en: 'Switzerland', it: 'Svizzera' } },
  { value: '🇪🇬', labels: { pl: 'Egipt', en: 'Egypt', it: 'Egitto' } },
  { value: '🇨🇿', labels: { pl: 'Czechy', en: 'Czech Republic', it: 'Repubblica Ceca' } },
  { value: '🇭🇺', labels: { pl: 'Węgry', en: 'Hungary', it: 'Ungheria' } },
  { value: '🇲🇦', labels: { pl: 'Maroko', en: 'Morocco', it: 'Marocco' } },
  { value: '🇧🇪', labels: { pl: 'Belgia', en: 'Belgium', it: 'Belgio' } },
  { value: '🇩🇰', labels: { pl: 'Dania', en: 'Denmark', it: 'Danimarca' } },
  { value: '🇸🇪', labels: { pl: 'Szwecja', en: 'Sweden', it: 'Svezia' } },
  { value: '🇳🇴', labels: { pl: 'Norwegia', en: 'Norway', it: 'Norvegia' } },
  { value: '🇮🇸', labels: { pl: 'Islandia', en: 'Iceland', it: 'Islanda' } },
  { value: '🇮🇪', labels: { pl: 'Irlandia', en: 'Ireland', it: 'Irlanda' } },
  { value: '🇫🇮', labels: { pl: 'Finlandia', en: 'Finland', it: 'Finlandia' } },
  { value: '🇸🇰', labels: { pl: 'Słowacja', en: 'Slovakia', it: 'Slovacchia' } },
  { value: '🇷🇴', labels: { pl: 'Rumunia', en: 'Romania', it: 'Romania' } },
  { value: '🇧🇬', labels: { pl: 'Bułgaria', en: 'Bulgaria', it: 'Bulgaria' } },
  { value: '🇪🇪', labels: { pl: 'Estonia', en: 'Estonia', it: 'Estonia' } },
  { value: '🇱🇻', labels: { pl: 'Łotwa', en: 'Latvia', it: 'Lettonia' } },
  { value: '🇱🇹', labels: { pl: 'Litwa', en: 'Lithuania', it: 'Lituania' } },
  { value: '🇺🇦', labels: { pl: 'Ukraina', en: 'Ukraine', it: 'Ucraina' } },
  { value: '🇦🇱', labels: { pl: 'Albania', en: 'Albania', it: 'Albania' } },
];

const carBrandItems = [
  { value: 'car-brands/alfa-romeo.png', labels: { pl: 'alfa romeo', en: 'alfa romeo', it: 'alfa romeo' } },
  { value: 'car-brands/aston-martin.png', labels: { pl: 'aston martin', en: 'aston martin', it: 'aston martin' } },
  { value: 'car-brands/audi.png', labels: { pl: 'audi', en: 'audi', it: 'audi' } },
  { value: 'car-brands/bentley.png', labels: { pl: 'bentley', en: 'bentley', it: 'bentley' } },
  { value: 'car-brands/bmw.png', labels: { pl: 'be em wu', en: 'B M W', it: 'bi emme vu' } },
  { value: 'car-brands/bugatti.png', labels: { pl: 'bugatti', en: 'bugatti', it: 'bugatti' } },
  { value: 'car-brands/chrysler.png', labels: { pl: 'chrysler', en: 'chrysler', it: 'chrysler' } },
  { value: 'car-brands/citroen.png', labels: { pl: 'citroen', en: 'citroen', it: 'citroen' } },
  { value: 'car-brands/dacia.png', labels: { pl: 'dacia', en: 'dacia', it: 'dacia' } },
  { value: 'car-brands/daewoo.png', labels: { pl: 'daewoo', en: 'daewoo', it: 'daewoo' } },
  { value: 'car-brands/daihatsu.png', labels: { pl: 'daihatsu', en: 'daihatsu', it: 'daihatsu' } },
  { value: 'car-brands/dodge.png', labels: { pl: 'dodge', en: 'dodge', it: 'dodge' } },
  { value: 'car-brands/ferrari.png', labels: { pl: 'ferrari', en: 'ferrari', it: 'ferrari' } },
  { value: 'car-brands/fiat.png', labels: { pl: 'fiat', en: 'fiat', it: 'fiat' } },
  { value: 'car-brands/ford.png', labels: { pl: 'ford', en: 'ford', it: 'ford' } },
  { value: 'car-brands/holden.png', labels: { pl: 'holden', en: 'holden', it: 'holden' } },
  { value: 'car-brands/honda.png', labels: { pl: 'honda', en: 'honda', it: 'honda' } },
  { value: 'car-brands/hyundai.png', labels: { pl: 'hyundai', en: 'hyundai', it: 'hyundai' } },
  { value: 'car-brands/jaguar.png', labels: { pl: 'jaguar', en: 'jaguar', it: 'jaguar' } },
  { value: 'car-brands/jeep.png', labels: { pl: 'dżip', en: 'jeep', it: 'jeep' } },
  { value: 'car-brands/kia.png', labels: { pl: 'kia', en: 'kia', it: 'kia' } },
  { value: 'car-brands/lamborghini.png', labels: { pl: 'lamborghini', en: 'lamborghini', it: 'lamborghini' } },
  { value: 'car-brands/land-rover.png', labels: { pl: 'land rover', en: 'land rover', it: 'land rover' } },
  { value: 'car-brands/lexus.png', labels: { pl: 'lexus', en: 'lexus', it: 'lexus' } },
  { value: 'car-brands/maserati.png', labels: { pl: 'maserati', en: 'maserati', it: 'maserati' } },
  { value: 'car-brands/maybach.png', labels: { pl: 'maybach', en: 'maybach', it: 'maybach' } },
  { value: 'car-brands/mazda.png', labels: { pl: 'mazda', en: 'mazda', it: 'mazda' } },
  { value: 'car-brands/mclaren.png', labels: { pl: 'mclaren', en: 'mclaren', it: 'mclaren' } },
  { value: 'car-brands/mercedes.png', labels: { pl: 'mercedes', en: 'mercedes', it: 'mercedes' } },
  { value: 'car-brands/mini.png', labels: { pl: 'mini', en: 'mini', it: 'mini' } },
  { value: 'car-brands/mitsubishi.png', labels: { pl: 'mitsubishi', en: 'mitsubishi', it: 'mitsubishi' } },
  { value: 'car-brands/nissan.png', labels: { pl: 'nissan', en: 'nissan', it: 'nissan' } },
  { value: 'car-brands/opel.png', labels: { pl: 'opel', en: 'opel', it: 'opel' } },
  { value: 'car-brands/peugeot.png', labels: { pl: 'peżo', en: 'peugeot', it: 'peugeot' } },
  { value: 'car-brands/porsche.png', labels: { pl: 'porsche', en: 'porsche', it: 'porsche' } },
  { value: 'car-brands/renault.png', labels: { pl: 'reno', en: 'renault', it: 'renault' } },
  { value: 'car-brands/rolls-royce.png', labels: { pl: 'rolls royce', en: 'rolls royce', it: 'rolls royce' } },
  { value: 'car-brands/rover.png', labels: { pl: 'rover', en: 'rover', it: 'rover' } },
  { value: 'car-brands/saab.png', labels: { pl: 'saab', en: 'saab', it: 'saab' } },
  { value: 'car-brands/seat.png', labels: { pl: 'seat', en: 'seat', it: 'seat' } },
  { value: 'car-brands/skoda.png', labels: { pl: 'škoda', en: 'skoda', it: 'skoda' } },
  { value: 'car-brands/smart.png', labels: { pl: 'smart', en: 'smart', it: 'smart' } },
  { value: 'car-brands/ssangyong.png', labels: { pl: 'ssangyong', en: 'ssangyong', it: 'ssangyong' } },
  { value: 'car-brands/subaru.png', labels: { pl: 'subaru', en: 'subaru', it: 'subaru' } },
  { value: 'car-brands/suzuki.png', labels: { pl: 'suzuki', en: 'suzuki', it: 'suzuki' } },
  { value: 'car-brands/toyota.png', labels: { pl: 'toyota', en: 'toyota', it: 'toyota' } },
  { value: 'car-brands/volkswagen.png', labels: { pl: 'volkswagen', en: 'volkswagen', it: 'volkswagen' } },
  { value: 'car-brands/volvo.png', labels: { pl: 'volvo', en: 'volvo', it: 'volvo' } },
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
  flagItems,
  carBrandItems,
  carBrandFilenames,
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
  numberLabels,
  letterLabels,
  getItemLabel,
  getNumberLabel,
  getLetterLabel,
};

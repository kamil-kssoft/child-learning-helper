import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LocaleProvider } from './i18n/LocaleContext';
import Menu from './components/Menu';
import Colors from './components/Colors';
import Learn from './components/Learn';
import Image from './components/Image';
import Shapes from './components/Shapes';
import Fruits from './components/Fruits';
import Vegetables from './components/Vegetables';
import Weather from './components/Weather';
import BodyParts from './components/BodyParts';
import Clothes from './components/Clothes';
import Professions from './components/Professions';
import HomeItems from './components/HomeItems';
import Space from './components/Space';
import Sports from './components/Sports';
import Instruments from './components/Instruments';
import Vehicles from './components/Vehicles';
import CarBrands from './components/CarBrands';
import Emotions from './components/Emotions';
import Counting from './components/Counting';
import SoundSettings from './components/SoundSettings';
import PwaUpdateBanner from './components/PwaUpdateBanner';
import './App.css';

function App() {
  return (
    <LocaleProvider>
      <Router>
        <PwaUpdateBanner />
        <Routes>
          <Route path="/menu" element={<Menu />} />
          <Route path="/colors" element={<Colors />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/image" element={<Image />} />
          <Route path="/shapes" element={<Shapes />} />
          <Route path="/fruits" element={<Fruits />} />
          <Route path="/vegetables" element={<Vegetables />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/body-parts" element={<BodyParts />} />
          <Route path="/clothes" element={<Clothes />} />
          <Route path="/professions" element={<Professions />} />
          <Route path="/home" element={<HomeItems />} />
          <Route path="/space" element={<Space />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/instruments" element={<Instruments />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/car-brands" element={<CarBrands />} />
          <Route path="/emotions" element={<Emotions />} />
          <Route path="/sound" element={<SoundSettings />} />
          <Route path="/counting" element={<Counting />} />
          <Route path="*" element={<Navigate to="/menu" />} />
        </Routes>
      </Router>
    </LocaleProvider>
  );
}

export default App;

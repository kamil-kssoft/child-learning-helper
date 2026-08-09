import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Menu from './components/Menu';
import Colors from './components/Colors';
import Learn from './components/Learn';
import Image from './components/Image';
import Shapes from './components/Shapes';
import Fruits from './components/Fruits';
import Vehicles from './components/Vehicles';
import CarBrands from './components/CarBrands';
import Emotions from './components/Emotions';
import Counting from './components/Counting';
import SoundSettings from './components/SoundSettings';
import PwaUpdateBanner from './components/PwaUpdateBanner';
import './App.css';

function App() {
  return (
    <Router>
      <PwaUpdateBanner />
      <Routes>
        <Route path="/menu" element={<Menu />} />
        <Route path="/colors" element={<Colors />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/image" element={<Image />} />
        <Route path="/shapes" element={<Shapes />} />
        <Route path="/fruits" element={<Fruits />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/car-brands" element={<CarBrands />} />
        <Route path="/emotions" element={<Emotions />} />
        <Route path="/sound" element={<SoundSettings />} />
        <Route path="/counting" element={<Counting />} />
        <Route path="*" element={<Navigate to="/menu" />} />
      </Routes>
    </Router>
  );
}

export default App;

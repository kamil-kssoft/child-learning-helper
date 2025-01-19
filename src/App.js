import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Menu from './components/Menu';
import Colors from './components/Colors';
import Learn from './components/Learn';
import './App.css';
import Image from './components/Image';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/learn" element={<Learn />} /> */}
        {/* <Route path="/colors" element={<Colors />} /> */}
        <Route path="/menu" element={<Menu />} />
        <Route path="/colors" element={<Colors />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/image" element={<Image />} />
        <Route path="*" element={<Navigate to="/menu" />} />
      </Routes>
    </Router>
  );
}

export default App;

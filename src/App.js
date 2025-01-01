import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Learn from './components/Learn';
import Colors from './components/Colors';
import Menu from './components/Menu';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/learn" element={<Learn />} />
        <Route path="/colors" element={<Colors />} />
        <Route path="/" element={<Menu />} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Learn from './components/Learn';
import Colors from './components/Colors';
import Menu from './components/Menu';
import ColorsQuiz from './components/ColorsQuiz';
import LearnQuiz from './components/LearnQuiz';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/learn" element={<Learn />} />
        <Route path="/colors" element={<Colors />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/colorsQuiz" element={<ColorsQuiz />} />
        <Route path="/learnQuiz" element={<LearnQuiz />} />
        <Route path="*" element={<Navigate to="/menu" />} />
      </Routes>
    </Router>
  );
}

export default App;

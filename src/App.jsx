
import { Navigate, Route, Routes } from 'react-router-dom';
import Contato from './components/Contact/Contact';
import Experiencias from './components/Experiences/Experiences';
import Processo from './components/Process/Process';
import Projects from './components/Projects/Projects';
import About from './components/Sobre/Sobre';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home/Home';
import './styles/global.css';
import BackToTop from './components/BackToTop/BackToTop';

function PortfolioPage() {
  return (
    <>
      <Home />
      <About />
      <Projects />
      <Experiencias />
      <Processo />
      <Contato />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BackToTop />
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

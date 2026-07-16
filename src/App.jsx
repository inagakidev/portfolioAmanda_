
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Contato from './components/Contact/Contact';
import Experiencias from './components/Experiences/Experiences';
import Processo from './components/Process/Process';
import Projects from './components/Projects/Projecs';
import About from './components/Sobre/Sobre';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home/Home';
import './styles/global.css';

export default function App() {


  return (
    <ThemeProvider>
      <Home />
      <About />
      <Projects />
      <Experiencias />
      <Processo />
      <Contato />
    </ThemeProvider>
  );
}

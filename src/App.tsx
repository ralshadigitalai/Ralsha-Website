import React from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { WhoItsFor } from './components/WhoItsFor';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { useScrollReveal } from './hooks/useScrollReveal';

export const App: React.FC = () => {
  useScrollReveal();

  return (
    <>
      <Nav />
      <Hero />
      <Services />
      <Process />
      <WhoItsFor />
      <Contact />
      <Footer />
    </>
  );
};

export default App;

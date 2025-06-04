import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutSection from '../components/About';
import HowItWorksSection from '../components/Works'; // Import de la nouvelle section
import VosAvis from '../components/VosAvis';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import LoadingPage from './LoadingPage';
export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div>

      {isLoading && <LoadingPage onLoaded={handleLoadingComplete} />}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero id="hero" />
      <AboutSection id="about" />
      <HowItWorksSection id="how-it-works" />
      <VosAvis id="vos-avis" />
      <ContactForm id="contact" />
      <Footer />
    </div>
  );
}
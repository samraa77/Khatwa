// Navbar.jsx
import React, { useState } from 'react';
import './navbar.css';
import { FaBars, FaGlobe, FaSun, FaMoon } from 'react-icons/fa';

export default function Navbar({ darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLang, setShowLang] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false); // Close the mobile menu after clicking (optional)
    }
  };

  return (
    <header className={`navbar ${darkMode ? 'dark' : ''}`}>
      <div className="navbar-content">
        {/* Logo */}
        <div className="navbar-left" onClick={() => setIsOpen(!isOpen)}>
          <img src="/images/logoKhatwa.svg" alt="Logo" className="navbar-logo" />
          <span className="navbar-brand">Khatwa</span>
        </div>

        {/* Liens centrés */}
        <nav className={`navbar-center ${isOpen ? 'open' : ''}`}>
          <a href="#hero" onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}>Accueil</a>
          <a href="#about" onClick={(e) => {
              e.preventDefault();
              scrollToSection('about');
            }}>À propos</a>
          <a href="#how-it-works" onClick={(e) => {
              e.preventDefault();
              scrollToSection('how-it-works');
            }}>Fonctionnement</a>
          <a href="#vos-avis" onClick={(e) => {
              e.preventDefault();
              scrollToSection('vos-avis');
            }}>Vos avis</a>
          <a href="#contact" onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}>Contact</a>
        </nav>

        {/* Icônes à droite */}
        <div className="navbar-right">
          <FaGlobe className="icon-colored" onClick={() => setShowLang(!showLang)} />
          {darkMode ? (
            <FaSun className="icon-colored" onClick={() => setDarkMode(!darkMode)} />
          ) : (
            <FaMoon className="icon-colored" onClick={() => setDarkMode(!darkMode)} />
          )}
          {showLang && (
            <ul className="lang-dropdown">
              <li>🇫🇷 Français</li>
              <li>🇬🇧 English</li>
              <li>🇲🇦 عربي</li>
            </ul>
          )}
        </div>

        {/* Menu burger pour mobile */}
        <div className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
          <FaBars className="icon-colored" />
        </div>
      </div>
    </header>
  );
}
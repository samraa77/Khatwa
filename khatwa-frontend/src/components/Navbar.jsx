// Navbar.jsx
import React, { useState } from 'react';
import './navbar.css';
import { FaBars, FaGlobe, FaSun, FaMoon } from 'react-icons/fa'; // Exemple avec React Icons

export default function Navbar({ darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLang, setShowLang] = useState(false);

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
          <a href="#hero">Accueil</a>
          <a href="#about">À propos</a>
          <a href="#how-it-works">Fonctionnement</a>
          <a href="#vos-avis">Vos avis</a>
          <a href="#contact">Contact</a>
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
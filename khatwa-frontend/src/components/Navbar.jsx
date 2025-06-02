import React, { useState } from 'react';
import './navbar.css';

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
        <nav className="navbar-center">
          <a href="#">Accueil</a>
          <a href="#">À propos</a>
          <a href="#">Contact</a>
        </nav>

        {/* Icônes à droite */}
        <div className="navbar-right">
          <img
            src="/images/lang.svg"
            alt="Langue"
            className="icon-colored"
            onClick={() => setShowLang(!showLang)}
          />
           <img
        src={darkMode ? "/images/sun.svg" : "/images/dark.svg"}
        alt="Toggle Theme"
        className="icon-colored"
        onClick={() => setDarkMode(!darkMode)}
      />

          {showLang && (
            <ul className="lang-dropdown">
              <li>🇫🇷 Français</li>
              <li>🇬🇧 English</li>
              <li>🇲🇦 عربي</li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}

import React from 'react';
import './footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-left">
          <img src="/images/logoKhatwa.svg" alt="Khatwa Logo" className="footer-logo" />
          <span className="footer-brand">Khatwa</span>
        </div>

        <div className="footer-links">
          <a href="#">Accueil</a>
          <a href="#">À propos</a>
          <a href="#">Contact</a>
        </div>

        <div className="footer-social">
          <a href="#"><FaYoutube /></a>
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaLinkedin /></a>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Khatwa. Tous droits réservés.
      </div>
    </footer>
  );
}

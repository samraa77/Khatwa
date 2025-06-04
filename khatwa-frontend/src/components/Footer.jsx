import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <motion.div className="footer-left" variants={fadeIn} initial="hidden" animate="visible">
          <img src="/images/logoKhatwa.svg" alt="Logo" className="footer-logo" />
          <span className="footer-brand">Khatwa</span>
        </motion.div>

        <motion.div className="footer-links" variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
          <a href="#hero">Accueil</a>
          <a href="#about">À propos</a>
          <a href="#how-it-works">Fonctionnement</a>
          <a href="#vos-avis">Vos avis</a>
          <a href="#contact">Contact</a>
        </motion.div>

        <motion.div className="footer-social" variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
          <a href="#" aria-label="Facebook"><FaFacebook /></a>
          <a href="#" aria-label="Twitter"><FaTwitter /></a>
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
        </motion.div>
      </div>
      <motion.div className="footer-bottom" variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.6 }}>
        &copy; 2025 Khatwa. Tous droits réservés.
      </motion.div>
    </footer>
  );
}
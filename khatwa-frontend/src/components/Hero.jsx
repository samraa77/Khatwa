import React from 'react';
import './Hero.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Import Link

export default function HeroSection() {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const buttonHover = {
    scale: 1.1,
    transition: { duration: 0.3, type: "spring", stiffness: 300 },
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-text">
        <motion.h1
          className="hero-title"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          style={{ originX: 0 }}
        >
          KHATWA <br /> chaque objectif <br /> commence par un
          <span role="img" aria-label="rocket">
            🚀
          </span>
        </motion.h1>
        <motion.div className="hero-buttons">
          <a href="#about">
            <motion.button
              className="button-86"
              variants={buttonHover}
              whileHover="scale"
            >
              En savoir plus
            </motion.button>
          </a>
           <Link to="/signup">
            <motion.button
              className="button-89"
              variants={buttonHover}
              whileHover="scale"
            >
              L'essayer ?
            </motion.button>
          </Link>
        </motion.div>
      </div>
      <div className="hero-image">
        <img src="/images/image.png" alt="Phone" className="phone-frame" />
        <motion.div
          className="phone-overlay"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.5,
            type: "spring",
            stiffness: 100,
          }}
        >
          <img
            src="/images/logoKhatwa.svg"
            alt="Logo Khatwa"
            className="logo-on-phone"
          />
        </motion.div>
      </div>
    </section>
  );
}
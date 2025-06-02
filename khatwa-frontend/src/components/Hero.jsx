import React from 'react';
import './hero.css';

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1 className="hero-title">Khatwa, chaque objectif commence par un pas.</h1>
        <p className="hero-desc">
            Grâce à notre intelligence artificielle, atteignez vos objectifs en 30, 60 ou 90 jours avec un plan sur mesure, pensé pour vous guider étape par étape.
        </p>
       <div className="hero-buttons">
        <button className="button-86">Commencer</button>
        <button className="button-86">Découvrir</button>
        </div>

      </div>

      <div className="hero-image">
        <img src="/images/image.png" alt="Phone" className="phone-frame" />
        <div className="phone-overlay">
            <img src="/images/logoKhatwa.svg" alt="Logo Khatwa" className="logo-on-phone" />
        </div>
      </div>
    </section>
  );
}

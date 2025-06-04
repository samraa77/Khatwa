import React from 'react';
import './Contact.css';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
  };

  const buttonHover = {
    scale: 1.05,
    transition: { duration: 0.3, type: "spring", stiffness: 300 },
  };

  return (
   <section class="contact-section">
  <motion.div
    class="contact-box"
    variants={fadeIn}
    initial="hidden"
    animate="visible"
  >
    <div class="contact-header">
      <h2>Envie de nous parler ?</h2>
      <p>Remplissez le formulaire et notre équipe vous répondra sous 24h.</p>
    </div>
    <form class="contact-form">
      <div class="input-group">
        <label for="name">Nom complet</label>
        <input type="text" id="name" placeholder="Entrez votre nom" />
      </div>
      <div class="input-group">
        <label for="email">Adresse email</label>
        <input type="email" id="email" placeholder="exemple@khatwa.com" />
      </div>
      <div class="input-group">
        <label for="subject">Objet</label>
        <input type="text" id="subject" placeholder="Sujet du message" />
      </div>
      <div class="input-group">
        <label for="message">Message</label>
        <textarea id="message" placeholder="Décrivez votre demande..."></textarea>
      </div>
      <motion.button
        type="submit"
        class="btn-submit"
        variants={buttonHover}
        whileHover="scale"
      >
        Envoyer le message
      </motion.button>
    </form>
  </motion.div>
</section>
  );
}
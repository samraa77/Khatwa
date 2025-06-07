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
   <section class="contact-section" id="contact">
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
     <form >           
            <div className="name-inputs">
              <input type="text" name="prenom" placeholder="Prénom"  required />
              <input type="text" name="nom" placeholder="Nom"  required />
            </div>
            <div className="age-country-inputs">
              <input type="text" name="text" placeholder="objectif" required />
              <input type="email" name="email" placeholder="email" required />

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
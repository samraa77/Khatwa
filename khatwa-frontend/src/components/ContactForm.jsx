import React from 'react';
import './contact.css';

export default function ContactSection() {
  return (
    <section className="contact-section">
      <div className="contact-box">
        <div className="contact-header">
          <h2>Envie de nous parler ?</h2>
          <p>Remplissez le formulaire et notre équipe vous répondra sous 24h.</p>
        </div>

        <form className="contact-form">
          <div className="input-group">
            <label>Nom complet</label>
            <input type="text" placeholder="Entrez votre nom" />
          </div>

          <div className="input-group">
            <label>Adresse email</label>
            <input type="email" placeholder="exemple@khatwa.com" />
          </div>

          <div className="input-group">
            <label>Objet</label>
            <input type="text" placeholder="Sujet du message" />
          </div>

          <div className="input-group">
            <label>Message</label>
            <textarea placeholder="Décrivez votre demande..."></textarea>
          </div>

          <button type="submit" className="btn-submit">Envoyer le message</button>
        </form>
      </div>
    </section>
  );
}

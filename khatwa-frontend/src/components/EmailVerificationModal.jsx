import React from 'react';
import { FaEnvelope } from 'react-icons/fa';
import './EmailVerificationModal.css';

const EmailVerificationModal = ({ onClose }) => {
  return (
    <div className="email-verification-backdrop">
      <div className="email-verification-modal">
        <div className="email-icon">
          <FaEnvelope />
        </div>
        <p>
            Un lien de vérification a été envoyé .<a href="https://mail.google.com" target="_blank" rel="noopener noreferrer" className="mail-link">
            Vérifiez votre adresse e-mail</a><br />
            N'oubliez pas de <b>vérifier votre dossier spam</b> si vous ne le trouvez pas.
          </p>

        <button className="return-to-site-button" onClick={onClose}>
          Fermer
        </button>
        <p className="contact-info">Besoin d’aide ? <a href="/">Contactez-nous.</a> </p>
      </div>
    </div>
  );
};

export default EmailVerificationModal;

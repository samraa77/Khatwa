// ForgotPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   await axios.post('http://127.0.0.1:8000/api/forgot-password', { email });
    //   setStatus('Un lien de réinitialisation a été envoyé à votre adresse e-mail.');
    // } catch (err) {
    //   setStatus("Erreur lors de l'envoi. Veuillez réessayer.");
    // }
  };

  return (
    <div className="forgot-page">
  <div className="forgot-container">
    <h2>Mot de passe oublié ?</h2>
    <p>Entrez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.</p>
    <input type="email" placeholder="Adresse e-mail" />
    <div className="btn-group">
      <button className="cancel-btn">Annuler</button>
      <button className="reset-btn">Réinitialiser</button>
    </div>
  </div>
</div>

  );
};

export default ForgotPassword;

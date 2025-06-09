import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/forgot-password', { email });
      setStatus('Un lien de réinitialisation a été envoyé à votre adresse e-mail.');
    } catch (err) {
      setStatus("Erreur lors de l'envoi. Veuillez réessayer.");
    }
  };

  const handleCancel = () => {
    setEmail('');
    setStatus('');
    navigate('/signup'); // ou '/signup' selon ta logique
  };

  return (
    <div className="forgot-page">
      <div className="forgot-container">
        <h2>Mot de passe oublié ?</h2>
        <p>Entrez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="btn-group">
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Annuler
            </button>
            <button type="submit" className="reset-btn">
              Réinitialiser
            </button>
          </div>
        </form>
        {status && <p className="status-msg">{status}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;

import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ResetPassword.css';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/reset-password', {
        token,
        email,
        password,
        password_confirmation: confirmation
      });

      setShowModal(true);

      // Redirige automatiquement après 3 secondes
      setTimeout(() => {
        navigate('/signup');
      }, 3000);
    } catch (err) {
      setMessage('Erreur de réinitialisation.');
    }
  };

  return (
    <div className="reset-page">
      <div className="reset-container">
        <h2>Changer le mot de passe</h2>
        <form onSubmit={handleReset}>
          <input
            type="email"
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            required
          />
          <button type="submit" className="confirm-btn">Changer le mot de passe</button>
          {message && <p className="status-msg">{message}</p>}
        </form>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Mot de passe réinitialisé !</h3>
            <p>Vous allez être redirigé vers la page de connexion...</p>
            <button onClick={() => navigate('/signup')}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;

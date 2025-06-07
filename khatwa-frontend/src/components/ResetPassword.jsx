// ResetPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ResetPassword.css';

const ResetPassword = () => {
  const { token } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
    //   await axios.post('http://127.0.0.1:8000/api/reset-password', {
    //     token,
    //     email,
    //     password,
    //     password_confirmation: confirmation
    //   });
      setMessage('Mot de passe réinitialisé avec succès.');
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
        <button type="submit" className="confirm-btn">Change mot de passe</button>
        {message && <p className="status-msg">{message}</p>}
      </form>
    </div>
    </div> 
    
  );
};

export default ResetPassword;

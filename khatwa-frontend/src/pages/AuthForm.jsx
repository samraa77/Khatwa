import React, { useState, useEffect } from 'react';
import '../assets/styles/AuthForm.css';
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from 'react-icons/fa';
import axios from 'axios';
import EmailVerificationModal from '../components/EmailVerificationModal';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const AuthForm = () => {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    age: '',
    email: '',
    password: '',
    acceptTerms: false
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios.get('https://api.countrylayer.com/v2/all?access_key=7534a478f9fe9d346823b87b3fc7010f')
  //     .then(res => {
  //       const sorted = res.data.sort((a, b) => a.name.localeCompare(b.name));
  //       setCountries(sorted);
  //     })
  //     .catch(err => console.error('Erreur lors du chargement des pays :', err));
  // }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      setMessage("Veuillez accepter les conditions.");
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/register', {
        ...formData,
        pays: selectedCountry
      });

      setFormData({ prenom: '', nom: '', age: '', email: '', password: '', acceptTerms: false });
      setSelectedCountry('');
      setShowVerificationModal(true);
    } catch (err) {
      setMessage("Erreur lors de l'inscription.");
      console.error(err);
    }
  };

  const handleSignInSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://127.0.0.1:8000/api/login', loginData);
    localStorage.setItem('token', res.data.access_token);
    setIsLoggedIn(true);
    navigate('/dashboard'); // ✅ ici uniquement si succès
  } catch (err) {
    if (err.response?.status === 403) {
      alert("Votre email n’est pas encore vérifié.");
    } else {
      alert("Erreur de connexion.");
    }
  }
};


  const handleSignUpClick = () => setIsSignUpActive(true);
  const handleSignInClick = () => setIsSignUpActive(false);

  return (
    <div className="body-auth">
      <div className={`container ${isSignUpActive ? 'right-panel-active' : ''}`} id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUpSubmit}>
            <h1>S'inscrire</h1>
            <div className="social-container">
              <a href="#" className="social"><FaFacebookF /></a>
              <a href="#" className="social"><FaGooglePlusG /></a>
              <a href="#" className="social"><FaLinkedinIn /></a>
            </div>
            <span>ou utilisez votre donnée</span>
            <div className="name-inputs">
              <input type="text" name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} required />
              <input type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} required />
            </div>
            <div className="age-country-inputs">
              <input type="number" name="age" placeholder="Âge" value={formData.age} onChange={handleChange} required />
              <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} required>
                <option value="">morroco</option>
                {/* {countries.map(country => (
                  // <option key={country.alpha2Code} value={country.name}>{country.name}</option>
                ))}                 */} <option>moroco</option> 

              </select>
            </div>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange} required />
            <div className="terms-group">
              <input type="checkbox" id="terms" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} />
              <label htmlFor="terms">J'accepte les <a href="#">conditions d'utilisation</a></label>
            </div>
            <button type="submit">S'inscrire</button>
            {message && <p className="feedback">{message}</p>}
          </form>
        </div>

        <div className="form-container sign-in-container">
          <form onSubmit={handleSignInSubmit}>
            <h1>Se connecter</h1>
            <div className="social-container">
              <a href="#" className="social"><FaFacebookF /></a>
              <a href="#" className="social"><FaGooglePlusG /></a>
              <a href="#" className="social"><FaLinkedinIn /></a>
            </div>
            <span>ou utilisez votre compte</span>
            <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange} required />
            <input type="password" name="password" placeholder="Mot de passe" value={loginData.password} onChange={handleLoginChange} required />
            <Link to="/forgot-password" className="forgot-link">Mot de passe oublié?</Link>
            <button type="submit">Connexion</button>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Content de te revoir!</h1>
              <p>Pour rester connecté avec nous, veuillez vous connecter avec vos informations personnelles</p>
              <button className="ghost" id="signIn" onClick={handleSignInClick}>Se Connecter</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Salut, Ami!</h1>
              <p>Entrez vos détails personnels et commencez votre voyage avec nous</p>
              <button className="ghost" id="signUp" onClick={handleSignUpClick}>S'inscrire</button>
            </div>
          </div>
        </div>
      </div>
      {showVerificationModal && <EmailVerificationModal onClose={() => setShowVerificationModal(false)} />}
    </div>
  );
};

export default AuthForm;

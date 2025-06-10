import React, { useState, useEffect } from 'react';
import '../assets/styles/ProfileForm.css';

export default function ProfileForm() {
  const [profileImage, setProfileImage] = useState(null); // affichage
  const [imageFile, setImageFile] = useState(null);       // pour envoi
  const [removePhoto, setRemovePhoto] = useState(false);  // signal suppression
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    age: '',
    pays: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://127.0.0.1:8000/api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const user = await res.json();
        setFormData({
          prenom: user.prenom || '',
          nom: user.nom || '',
          age: user.age || '',
          pays: user.pays || '',
          email: user.email || '',
          password: ''
        });
        if (user.photo) {
          setProfileImage(`http://127.0.0.1:8000/storage/${user.photo}`);
        }
      } catch (err) {
        console.error('Erreur de récupération du profil:', err);
      }
    };
    fetchUser();
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setRemovePhoto(false);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const removeImage = () => {
    setProfileImage(null);
    setImageFile(null);
    setRemovePhoto(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (let key in formData) data.append(key, formData[key]);
      if (imageFile) data.append('image', imageFile);
      if (removePhoto) data.append('remove_photo', '1');

      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/api/profile/update', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: data
      });

      if (!response.ok) throw new Error('Erreur de mise à jour.');
      alert('Profil mis à jour avec succès !');
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur de mise à jour du profil.');
    }
  };

  return (
    <div className="container" style={{ marginLeft: "205px" }}>
      <div className="card">
        <div className="card-header"><h2 className="card-title">Photo de profil</h2></div>
        <div className="card-content">
          <div className="profile-section">
            <div className="image-placeholder">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="profile-image" />
              ) : (
                <div className="no-image">
                  <div className="upload-icon">📤</div><span>No image</span>
                </div>
              )}
            </div>
            <div className="image-controls">
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <button
                type="button"
                className="button-outline"
                onClick={() => document.getElementById('photo-upload').click()}
              >
                Upload Photo
              </button>
              {profileImage && (
                <button type="button" onClick={removeImage} className="link-button">Remove</button>
              )}
            </div>
            <div className="image-info">
              <p className="info-title">Exigences de l'image :</p>
              <ul>
                <li>1. Min. 400 x 400px</li>
                <li>2. Max. 2MB</li>
                <li>3. Votre visage ou logo d'entreprise</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><h2 className="card-title">Détails utilisateur</h2></div>
        <div className="card-content">
          <form onSubmit={handleSubmit} className="form">
            <div className="form-grid">
              {['prenom', 'nom', 'pays', 'email', 'password'].map((field, idx) => (
                <div key={idx} className="form-group">
                  <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    id={field}
                    name={field}
                    type={field === 'password' ? 'password' : 'text'}
                    className="input"
                    value={formData[field]}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="form-group">
                <label htmlFor="age">Âge</label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  className="input"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="button-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

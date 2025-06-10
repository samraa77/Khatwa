import React, { useState } from 'react';
import '../assets/styles/ProfileForm.css';

export default function ProfileForm() {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Traitement du formulaire
  };

  return (
    <div className="containe " style={{ marginLeft:"205px" }}>
      {/* Profile Photo Section */}
        <div className="card">
            <div className="card-header">
                <h2 className="card-title">Profile Photo</h2>
            </div>
            <div className="card-content">
                <div className="profile-section">
                    <div className="image-placeholder">
                        {profileImage ? (
                            <img src={profileImage} alt="Profile" className="profile-image" />
                        ) : (
                            <div className="no-image">
                            {/* Icône Upload, à remplacer par une image ou une SVG */}
                            <div className="upload-icon">📤</div>
                            <span>No image</span>
                            </div>
                        )}
                    </div>
                    <div className="image-controls">
                        <label htmlFor="photo-upload" className="upload-label">
                            <button type="button" className="button-outline">Upload Photo</button>
                            <input
                            id="photo-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            />
                        </label>
                        {profileImage && (
                            <button onClick={removeImage} className="link-button">Remove</button>
                        )}
                    </div>
                    <div className="image-info">
                        <p className="info-title">Image requirements:</p>
                        <ul>
                            <li>1. Min. 400 x 400px</li>
                            <li>2. Max. 2MB</li>
                            <li>3. Your face or company logo</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        {/* User Details Section */}
        <div className="card">
            <div className="card-header">
            <h2 className="card-title">User Details</h2>
            </div>
            <div className="card-content">
            <form onSubmit={handleSubmit} className="form">
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input id="firstName" placeholder="Placeholder" className="input" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input id="lastName" placeholder="Placeholder" className="input" />
                    </div> 
                    <div className="form-group">
                <label htmlFor="company">Company</label>
                <input id="company" placeholder="Placeholder" className="input" />
                </div>
                 <div className="form-group">
                <label htmlFor="phone">age</label>
                <input id="number" type="number" placeholder="Placeholder" className="input" />
                </div>

                     <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="Placeholder" className="input" />
                    </div>
                     <div className="form-group">
                <label htmlFor="phone">mot de pass</label>
                <input id="password" type="password" placeholder="Placeholder" className="input" />
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
"use client"

import { useState } from "react"
import "../assets/styles/SettingsPage.css"

// Composants UI simples sans shadcn
const Button = ({ children, variant = "default", className = "", onClick, ...props }) => (
  <button
    className={`btn ${variant === "outline" ? "btn-outline" : "btn-default"} ${className}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
)

const Card = ({ children, className = "" }) => <div className={`card ${className}`}>{children}</div>

const CardHeader = ({ children }) => <div className="card-header">{children}</div>

const CardTitle = ({ children, className = "" }) => <h3 className={`card-title ${className}`}>{children}</h3>

const CardContent = ({ children, className = "" }) => <div className={`card-content ${className}`}>{children}</div>

const Input = ({ className = "", ...props }) => <input className={`input ${className}`} {...props} />

const Label = ({ children, htmlFor, className = "" }) => (
  <label htmlFor={htmlFor} className={`label ${className}`}>
    {children}
  </label>
)

const Switch = ({ checked, onCheckedChange }) => (
  <label className="switch">
    <input type="checkbox" checked={checked} onChange={(e) => onCheckedChange(e.target.checked)} />
    <span className="slider"></span>
  </label>
)

const Select = ({ children, value, onValueChange }) => (
  <select className="select" value={value} onChange={(e) => onValueChange && onValueChange(e.target.value)}>
    {children}
  </select>
)

const Avatar = ({ children, className = "" }) => <div className={`avatar ${className}`}>{children}</div>

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

// Icônes SVG simples
const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z" />
  </svg>
)

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z" />
  </svg>
)

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 19v1H3v-1l2-2v-6c0-3.1 2.03-5.83 5-6.71V4a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.29c2.97.88 5 3.61 5 6.71v6l2 2m-7 2a2 2 0 0 1-2 2 2 2 0 0 1-2-2" />
  </svg>
)

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V18H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z" />
  </svg>
)

const AlertIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z" />
  </svg>
)

const PowerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.56 5.44L15.11 6.89C16.84 7.94 18 9.83 18 12A6 6 0 0 1 6 12C6 9.83 7.16 7.94 8.88 6.88L7.44 5.44C5.36 6.88 4 9.28 4 12A8 8 0 0 0 20 12C20 9.28 18.64 6.88 16.56 5.44M13 3H11V13H13" />
  </svg>
)

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
  </svg>
)

const SaveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />
  </svg>
)

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [showDeactivateModal, setShowDeactivateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [language, setLanguage] = useState("fr")

  return (
    <div className="settings-container">
      <div className="settings-wrapper">
        {/* Header */}
        <div className="header">
          <h1 className="header-title">Paramètres</h1>
        </div>

        <div className="cards-container">
          {/* Profil */}
          <Card>
            <CardHeader>
              <CardTitle className="section-title">
                <UserIcon />
                Mon Profil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="avatar-section">
                <Avatar>
                  <div className="avatar-placeholder">JD</div>
                </Avatar>
                <Button variant="outline">Changer la photo</Button>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="form-group">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>

               <div className="form-grid">
                
              <div className="form-group">
                <Label htmlFor="email">Age</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
                <div className="form-group">
                  <Label htmlFor="lastName">Pays</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>

             
<div className="form-grid">
                
              <div className="form-group">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
                <div className="form-group">
                  <Label htmlFor="lastName">Mot de Pass</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="section-title">
                <BellIcon />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="switch-group">
                <div className="switch-info">
                  <Label>Notifications par email</Label>
                  <p className="switch-description">Recevoir des emails importants</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <div className="switch-group">
                <div className="switch-info">
                  <Label>Notifications push</Label>
                  <p className="switch-description">Alertes sur votre appareil</p>
                </div>
                <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>
            </CardContent>
          </Card>

          {/* Préférences */}
          <Card>
            <CardHeader>
              <CardTitle className="section-title">
                <SettingsIcon />
                Préférences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="form-group">
                <Label htmlFor="language">Langue</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </Select>
              </div>

              <div className="switch-group">
                <div className="switch-info">
                  <Label>Mode sombre</Label>
                  <p className="switch-description">Interface sombre</p>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
            </CardContent>
          </Card>

          {/* Sécurité */}
          <Card>
            <CardHeader>
              <CardTitle className="section-title">
                <ShieldIcon />
                Sécurité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="full-width">
                Changer le mot de passe
              </Button>
              <Button variant="outline" className="full-width">
                Authentification à deux facteurs
              </Button>
            </CardContent>
          </Card>

          {/* Gestion du compte */}
          <Card className="danger-card">
            <CardHeader>
              <CardTitle className="section-title danger-title">
                <AlertIcon />
                Gestion du compte
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="danger-description">
                Ces actions affecteront votre compte et peuvent être irréversibles. Veuillez procéder avec prudence.
              </p>

              <div className="danger-actions">
                <Button
                  variant="outline"
                  className="warning-btn full-width"
                  onClick={() => setShowDeactivateModal(true)}
                >
                  <PowerIcon />
                  Désactiver mon compte
                </Button>

                <Button variant="outline" className="danger-btn full-width" onClick={() => setShowDeleteModal(true)}>
                  <TrashIcon />
                  Supprimer définitivement mon compte
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bouton de sauvegarde */}
          <div className="save-section">
            <Button className="save-btn">
              <SaveIcon />
              Sauvegarder les modifications
            </Button>
          </div>
        </div>

        {/* Modals */}
        <Modal isOpen={showDeactivateModal} onClose={() => setShowDeactivateModal(false)}>
          <div className="modal-header">
            <h3>Désactiver votre compte ?</h3>
          </div>
          <div className="modal-body">
            <p>
              Votre compte sera temporairement désactivé. Vous pourrez le réactiver en vous connectant à nouveau.
              Pendant la désactivation, vos données seront conservées mais ne seront pas visibles par les autres
              utilisateurs.
            </p>
          </div>
          <div className="modal-footer">
            <Button variant="outline" onClick={() => setShowDeactivateModal(false)}>
              Annuler
            </Button>
            <Button className="warning-btn">Désactiver</Button>
          </div>
        </Modal>

        <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
          <div className="modal-header">
            <h3>Supprimer définitivement votre compte ?</h3>
          </div>
          <div className="modal-body">
            <p>
              Cette action est irréversible. Toutes vos données personnelles, contenus et historique seront
              définitivement supprimés. Vous ne pourrez pas récupérer votre compte après cette action.
            </p>
          </div>
          <div className="modal-footer">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Annuler
            </Button>
            <Button className="danger-btn">Supprimer définitivement</Button>
          </div>
        </Modal>
      </div>
    </div>
  )
}

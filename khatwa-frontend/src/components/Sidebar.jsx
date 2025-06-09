<<<<<<< HEAD
import React from "react";
import { Home, Mail, Eye, Monitor, User, LogOut, Settings, Bell } from "lucide-react";
import "./Sidebar.css";
import { Link, useNavigate } from 'react-router-dom'; // Import Link et useNavigate
=======
import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Home, Mail, Eye, Monitor, User, LogOut, Settings, Bell } from "lucide-react";
import "./sidebar.css";
import { Link, useNavigate } from 'react-router-dom';
>>>>>>> 4af7cc5fcb05d6024a17400a1fd34d389eec4f91

const navItems = [
  { icon: <Home size={18} />, label: "Tableau de Bord", path: "/Layout" },
  { icon: <Mail size={18} />, label: "Nouveau Défi", path: "/Layout/Nouveau-defi" },
  { icon: <Eye size={18} />, label: "Calendrier Défi", path: "/Layout/Calendrier-défi" },
  { icon: <Monitor size={18} />, label: "List Défi", path: "/Layout/List-défi" },
  { icon: <Settings size={18} />, label: "Paramètres", path: "/Layout/Paramètres" },
];

const Sidebar = () => {
<<<<<<< HEAD
  const navigate = useNavigate(); // Initialiser useNavigate

  // Fonction pour déconnecter
  const handleLogout = () => {
    console.log('Logout clicked'); // Exemple
    // Ajoutez votre logique de déconnexion si nécessaire, puis redirigez
    navigate('/');
  };

  // Fonction pour récupérer les notifications (exemple)
  const fetchNotifications = async () => {
    console.log('fetchNotifications clicked');
    return 9; // exemple
=======
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/notifications', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setNotifications(res.data);
    } catch (error) {
      console.error('Erreur lors du chargement des notifications :', error);
    }
>>>>>>> 4af7cc5fcb05d6024a17400a1fd34d389eec4f91
  };

  const handleNotificationClick = async (id) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/notifications/${id}/read`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, read_at: new Date().toISOString() } : n))
      );
    } catch (err) {
      console.error('Erreur lors de la mise à jour :', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
      alert('Erreur lors de la déconnexion.');
    }
  };

  const unreadCount = notifications.filter(n => !n.read_at).length;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-pack">
          <img src="/images/logoKhatwa.svg" alt="Khatwa Logo" className="logo" />
          <span className="footer-brand">KHATWA</span>
        </div>

        <div className="sidebar-icons">
          <div className="icon-wrapper">
<<<<<<< HEAD
            {/* Lien vers le profil */}
            <Link to="/profile" style={{ color: "#ffffff" }}> 
=======
            <Link to="/profile" style={{ color: "#ffffff" }}>
>>>>>>> 4af7cc5fcb05d6024a17400a1fd34d389eec4f91
              <User size={20} />
            </Link>
          </div>

          <div className="icon-wrapper notification" onClick={toggleNotifications}>
            <Bell size={20} />
<<<<<<< HEAD
            <span className="notif-count">9</span>
          </div>
          <div className="icon-wrapper" onClick={handleLogout}> {/* Bouton pour déconnexion */}
=======
            {unreadCount > 0 && <span className="notif-count">{unreadCount}</span>}
            {showNotifications && (
              <div className="notification-dropdown" ref={dropdownRef}>
                {notifications.length === 0 ? (
                  <p className="empty-msg">Aucune notification.</p>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`notif-item ${notif.read_at ? 'read' : 'unread'}`}
                      onClick={() => handleNotificationClick(notif.id)}
                    >
                      <strong>{notif.data.titre}</strong>
                      <p>{notif.data.message}</p>
                      <small style={{ fontSize: '11px', color: '#888' }}>
                        {new Date(notif.created_at).toLocaleString()}
                      </small>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="icon-wrapper" onClick={handleLogout}>
>>>>>>> 4af7cc5fcb05d6024a17400a1fd34d389eec4f91
            <LogOut size={20} />
          </div>
        </div>
      </div>

      <ul className="sidebar-nav">
        {navItems.map((item, index) => (
          <li key={index}>
            {/* Remplacement par Link */}
            <Link to={item.path} className="sidebar-link">
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
              {item.badge && <span className="badge">{item.badge}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
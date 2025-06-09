import React, { useState, useEffect, useRef } from "react";  
import { Home, Mail, Eye, Monitor, User, LogOut, Settings, Bell } from "lucide-react";  
import { Link, useNavigate } from 'react-router-dom';  
import "./Sidebar.css";  

const navItems = [  
  { icon: <Home size={18} />, label: "Tableau de Bord", path: "/Layout" },  
  { icon: <Mail size={18} />, label: "Nouveau Défi", path: "/Layout/Nouveau-defi" },  
  { icon: <Eye size={18} />, label: "Calendrier Défi", path: "/Layout/Calendrier-défi" },  
  { icon: <Monitor size={18} />, label: "List Défi", path: "/Layout/List-défi" },  
  { icon: <Settings size={18} />, label: "Paramètres", path: "/Layout/Paramètres" },  
];  

const Sidebar = () => {  
  const navigate = useNavigate();  
  const [notifications, setNotifications] = useState([]);  
  const [showNotifications, setShowNotifications] = useState(false);  
  const dropdownRef = useRef(null);  

  // Fonction pour déconnecter  
  const handleLogout = () => {  
    // Ajoutez votre logique de déconnexion ici  
    // Exemple : suppression du token et redirection  
    localStorage.removeItem('token');  
    navigate('/');  
  };  

  // Fonction pour récupérer notifications  
  const fetchNotifications = async () => {  
    // Exemple : remplacez avec votre API  
    // const res = await axios.get('Votre_URL_API');  
    // setNotifications(res.data);  
    // Pour l'exemple, c'est statique  
    setNotifications([  
      {  
        id: 1,  
        data: { titre: 'Notification 1', message: 'Message 1' },  
        created_at: new Date().toISOString(),  
        read_at: null,  
      },  
      {  
        id: 2,  
        data: { titre: 'Notification 2', message: 'Message 2' },  
        created_at: new Date().toISOString(),  
        read_at: null,  
      },  
    ]);  
  };  

  const handleNotificationClick = (id) => {  
    // Exemple : marquer comme lu  
    setNotifications(prev =>  
      prev.map(n => (n.id === id ? { ...n, read_at: new Date().toISOString() } : n))  
    );  
  };  

  const toggleNotifications = () => {  
    setShowNotifications(!showNotifications);  
  };  

  const unreadCount = notifications.filter(n => !n.read_at).length;  

  useEffect(() => {  
    fetchNotifications();  
  }, []);  

  return (  
    <aside className="sidebar">  
      {/* Header */}  
      <div className="sidebar-header">  
        <div className="logo-pack">  
          <img src="/images/logoKhatwa.svg" alt="Khatwa Logo" className="logo" />  
          <span className="footer-brand">KHATWA</span>  
        </div>  

        {/* Icônes */}  
        <div className="sidebar-icons">  
          {/* Profile */}  
          <div className="icon-wrapper">  
            <Link to="/profile" style={{ color: "#ffffff" }}><User size={20} /></Link>  
          </div>  

          {/* Notifications */}  
          <div className="icon-wrapper notification" onClick={toggleNotifications}>  
            <Bell size={20} />  
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
                    {/* Bouton déconnexion */}
          <div className="icon-wrapper" onClick={handleLogout}>
            <LogOut size={20} />
          </div>
        </div>
      </div>

      {/* Menu de navigation */}
      <ul className="sidebar-nav">
        {navItems.map((item, index) => (
          <li key={index} className="nav-item">
            <Link to={item.path} className="nav-link">
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
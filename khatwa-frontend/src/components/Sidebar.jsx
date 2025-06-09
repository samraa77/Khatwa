import React from "react";
import { Home, Mail, Eye, Monitor, User, LogOut, Settings, Bell } from "lucide-react";
import "./sidebar.css";
import { Link, useNavigate } from 'react-router-dom'; // Import Link et useNavigate

const navItems = [
  { icon: <Home size={18} />, label: "Tableau de Bord", path: "/Layout" },
  { icon: <Mail size={18} />, label: "Nouveau Défi", path: "/Layout/Nouveau-defi" },
  { icon: <Eye size={18} />, label: "Calendrier Défi", path: "/Layout/Calendrier-défi" },
  { icon: <Monitor size={18} />, label: "List Défi", path: "/Layout/List-défi" },
  { icon: <Settings size={18} />, label: "Paramètres", path: "/Layout/Paramètres" },
];

const Sidebar = () => {
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
  };

  //const [notificationCount, setNotificationCount] = React.useState(0);

  //React.useEffect(() => {
  //  fetchNotifications().then(count => setNotificationCount(count));
  //}, []);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-pack">
          <img src="/images/logoKhatwa.svg" alt="Khatwa Logo" className="logo" />
          <span className="footer-brand">KHATWA</span>
        </div>

        <div className="sidebar-icons">
          <div className="icon-wrapper">
            {/* Lien vers le profil */}
            <Link to="/profile" style={{ color: "#ffffff" }}> 
              <User size={20} />
            </Link>
          </div>
          <div className="icon-wrapper notification">
            <Bell size={20} />
            <span className="notif-count">9</span>
          </div>
          <div className="icon-wrapper" onClick={handleLogout}> {/* Bouton pour déconnexion */}
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
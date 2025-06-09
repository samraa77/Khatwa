import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Home, Mail, Eye, Monitor, User, LogOut, Settings, Bell } from "lucide-react";
import "./sidebar.css";
import { Link, useNavigate } from 'react-router-dom';

const navItems = [
  { icon: <Home size={18} />, label: "Dashboard", path: "/Layout" },
  { icon: <Mail size={18} />, label: "Messages", path: "/messages" },
  { icon: <Eye size={18} />, label: "Analytics", path: "/analytics" },
  { icon: <Monitor size={18} />, label: "Monitoring", path: "/monitoring" },
  { icon: <Settings size={18} />, label: "Settings", path: "/Settings" },
];

const Sidebar = () => {
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
            <Link to="/profile" style={{ color: "#ffffff" }}>
              <User size={20} />
            </Link>
          </div>

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

          <div className="icon-wrapper" onClick={handleLogout}>
            <LogOut size={20} />
          </div>
        </div>
      </div>

      <ul className="sidebar-nav">
        {navItems.map((item, index) => (
          <li key={index}>
            <a href={item.path} className="sidebar-link">
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
              {item.badge && <span className="badge">{item.badge}</span>}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;

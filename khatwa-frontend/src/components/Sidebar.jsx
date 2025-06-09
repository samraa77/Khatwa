// components/Sidebar.jsx
import React from "react";
import { Home, Mail, Eye, Monitor, User, LogOut, Settings, Bell } from "lucide-react";
import "./sidebar.css";
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate

const navItems = [
  { icon: <Home size={18} />, label: "Dashboard", path: "/Layout" },
  { icon: <Mail size={18} />, label: "Messages", path: "/messages" },
  { icon: <Eye size={18} />, label: "Analytics", path: "/analytics" },
  { icon: <Monitor size={18} />, label: "Monitoring", path: "/monitoring" },
  { icon: <Settings size={18} />, label: "Settings", path: "/Settings" },
];

const Sidebar = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle logout
  const handleLogout = () => {
    // Communicate with BDD to perform disconnect action
    // Example:
    // api.logout().then(() => {
    //   navigate('/landingpage');
    // });
    console.log('Logout clicked'); // example
    navigate('/landingpage'); // Navigate to landing page
  };

  // Function to fetch notifications (example)
  const fetchNotifications = async () => {
    // try {
    //   const response = await api.getNotifications();
    //   // Process notifications from the database
    //   console.log('Notifications:', response.data);
    //   return response.data.length; // Return the number of notifications
    // } catch (error) {
    //   console.error('Error fetching notifications:', error);
    //   return 0; // Return 0 in case of error
    // }
    console.log('fetchNotifications  clicked'); // example
    return 9
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
            <Link to="/profile" style={{color:"#ffffff"}}> {/* Wrap User icon with Link */}
              <User size={20} />
            </Link>
          </div>
          <div className="icon-wrapper notification">
            <Bell size={20} />
            <span className="notif-count">9</span>{/*{notificationCount}*/}
          </div>
          <div className="icon-wrapper" onClick={handleLogout}> {/* Add onClick handler */}
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

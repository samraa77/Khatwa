import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout-wrapper">
      <Sidebar />
      <main className="layout-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

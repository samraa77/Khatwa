// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthForm from "./pages/AuthForm"; // Import the AuthForm component
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import NewChallenge from "./pages/NewChallenge";
import ProfileForm from "./pages/ProfileForm";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/SignUp" element={<AuthForm />} /> {/* Add this route */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/Layout" element={<Layout />}>   
          <Route index element={<Dashboard />} />
          <Route path="Nouveau-defi" element={<NewChallenge />} />

          <Route path="Profile" element={<ProfileForm />} />
          <Route path="Parametres" element={<SettingsPage />} />


        </Route> 
      </Routes>
    </Router>
  );
}
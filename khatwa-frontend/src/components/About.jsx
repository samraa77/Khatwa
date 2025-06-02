import React from 'react';
import { FaUserFriends, FaTasks, FaRocket, FaUsers } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './about.css';

const stats = [
  { icon: <FaUserFriends />, number: '250+', label: 'Utilisateurs satisfaits' },
  { icon: <FaTasks />, number: '600+', label: 'Challenges créés' },
  { icon: <FaRocket />, number: '1.8K+', label: 'Plans IA générés' },
  { icon: <FaUsers />, number: '11K+', label: 'Abonnés actifs' },
];

const data = [
  { name: 'Jour 1', value: 30 },
  { name: 'Jour 10', value: 50 },
  { name: 'Jour 20', value: 45 },
  { name: 'Jour 30', value: 70 },
  { name: 'Jour 40', value: 60 },
  { name: 'Jour 50', value: 80 },
  { name: 'Jour 60', value: 95 },
];

export default function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-content">
        <div className="text-zone">
          <h2 className="about-title">Pourquoi Khatwa ?</h2>
          <p className="about-desc">
            Khatwa est bien plus qu'une simple application de planification. Grâce à son intelligence artificielle,
            elle évalue votre profil, vos habitudes et vos objectifs pour générer un plan sur mesure.
            Chaque tâche vous fait progresser, un pas après l'autre.
          </p>
          <div className="stats-grid">
            {stats.map((item, index) => (
              <div className="stat-card" key={index}>
                <span className="stat-icon">{item.icon}</span>
                <h3>{item.number}</h3>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="chart-zone">
          <ResponsiveContainer width="100%" height={650}>
            <LineChart data={data}>
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#7c3aed" strokeWidth={4} dot />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { FaUserFriends, FaTasks, FaRocket, FaUsers, FaStar } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './About.css';
import { motion } from 'framer-motion';

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
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating > 0 && comment.trim() !== '') {
      const newReview = { rating: rating, comment: comment };
      setReviews([...reviews, newReview]);
      setRating(0);
      setComment('');
    } else {
      alert('Veuillez donner une note et un commentaire.');
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
  };

  const buttonHover = {
    scale: 1.1,
    transition: { duration: 0.3, type: "spring", stiffness: 300 },
  };

  return (
    <section className="about-section">
      <div className="about-content">
        <div className="about-header">
          <motion.h2
            className="about-title"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            Pourquoi Khatwa ?
          </motion.h2>
          <motion.p
            className="about-desc"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            Khatwa est bien plus qu'une simple application de planification. Grâce à son intelligence artificielle,
            elle évalue votre profil, vos habitudes et vos objectifs pour générer un plan sur mesure.
            Chaque tâche vous fait progresser, un pas après l'autre.
          </motion.p>
        </div>

        <div className="about-body">
          <div className="chart-zone">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#eee', border: 'none' }}
                  labelStyle={{ fontWeight: 'bold', color: '#333' }}
                />
                <Line type="monotone" dataKey="value" stroke="#7c3aed" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="stats-grid">
            {stats.map((item, index) => (
              <motion.div
                className="stat-card"
                key={index}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="stat-icon">{item.icon}</span>
                <h3>{item.number}</h3>
                <p>{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    
    </section>
  );
}
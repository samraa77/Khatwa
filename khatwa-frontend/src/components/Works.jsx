import React from 'react';
import './Works.css';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaCog, FaChartLine } from 'react-icons/fa';

export default function HowItWorksSection() {
  // Variants pour l'animation d'apparition progressive
  const fadeIn = {
    hidden: { opacity: 0, y: 20 }, // État initial : invisible et légèrement décalé vers le bas
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeInOut' }, // Animation : apparition en douceur
    },
  };

  const steps = [
    {
      icon: <FaCheckCircle />,
      title: 'Définissez vos objectifs',
      description: 'Commencez par identifier clairement ce que vous souhaitez accomplir. Qu\'il s\'agisse d\'objectifs personnels ou professionnels, la clarté est la clé.',
    },
    {
      icon: <FaCog />,
      title: 'Laissez l\'IA travailler',
      description: 'Notre IA analyse vos objectifs, vos habitudes et vos préférences pour créer un plan personnalisé, adapté à votre style de vie.',
    },
    {
      icon: <FaChartLine />,
      title: 'Suivez vos progrès',
      description: 'Utilisez nos outils de suivi intuitifs pour mesurer vos progrès, rester motivé et ajuster votre plan si nécessaire.',
    },
  ];

  return (
    <section className="how-it-works-section">
      <div className="how-it-works-container">
        <motion.h2
          className="how-it-works-title"
          variants={fadeIn} // Application des variants d'animation
          initial="hidden" // État initial du composant
          animate="visible" // État final du composant (après l'animation)
        >
          Comment ça marche ?
        </motion.h2>
        <div className="how-it-works-steps">
          {steps.map((step, index) => (
            <motion.div
              className="how-it-works-step"
              key={index}
              variants={fadeIn} // Application des variants d'animation
              initial="hidden" // État initial du composant
              animate="visible" // État final du composant (après l'animation)
              transition={{ delay: 0.2 + index * 0.2 }} // Délai d'apparition pour chaque étape
            >
              <span className="how-it-works-icon">{step.icon}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
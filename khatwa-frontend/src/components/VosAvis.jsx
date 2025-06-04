import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './VosAvis.css'; // Import du fichier CSS dédié

export default function VosAvis() {
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
    <motion.div
      className="feedback-section" id="vos-avis"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.6 }}
    >
      <h2 className="feedback-title">Vos avis</h2>
      <div className="feedback-container">
        {/* Formulaire d'avis */}
        <motion.div className="feedback-form card" whileHover={{ scale: 1.02 }}>
          <h3>Donnez votre avis</h3>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((value) => (
              <FaStar
                key={value}
                className={`star ${value <= rating ? 'active' : ''}`}
                onClick={() => handleRating(value)}
              />
            ))}
          </div>
          <textarea
            placeholder="Votre commentaire"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <motion.button
            className="submit-button"
            onClick={handleSubmit}
            variants={buttonHover}
            whileHover="scale"
          >
            Envoyer
          </motion.button>
        </motion.div>

        {/* Affichage des avis */}
        <div className="reviews">
          <h3>Avis récents</h3>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <motion.div
                className="review card"
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="review-rating">
                  {[...Array(review.rating)].map((_, i) => <FaStar key={i} className="star active" />)}
                </div>
                <p>{review.comment}</p>
              </motion.div>
            ))
          ) : (
            <p>Aucun avis pour le moment.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
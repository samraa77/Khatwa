// LoadingPage.jsx
import React, { useState, useEffect } from 'react';
import '../assets/styles/LoadingPage.css'; // Create this CSS file

const LoadingPage = ({ onLoaded }) => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'KHATWA';
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prevText => prevText + fullText[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 300); // Adjust timing here (milliseconds per letter)

      return () => clearTimeout(timeout); // Clear timeout on unmount
    } else {
      // Once the full text is displayed, call the onLoaded callback
      setTimeout(() => {
        onLoaded(); // Call the function to hide the loading page
      }, 500); // Small delay before hiding
    }
  }, [currentIndex, fullText, onLoaded]);

  return (
    <div className="loading-container">
      <img src="/images/logoKhatwa.svg" alt="Khatwa Logo" className="loading-logo" />
    </div>
  );
};

export default LoadingPage;
// MainCard Component Update

import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainCard = ({ title, description, link, width, height, image }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{ ...styles.card, width, height }}
      onClick={() => navigate(link)}
      role="button" // Accessibility for screen readers
      tabIndex={0} // Make it focusable for keyboard users
      onKeyPress={(e) => e.key === 'Enter' && navigate(link)} // Handle keyboard navigation
      aria-label={`Navigate to ${title}`}
    >
      <img src={image} alt={title} style={styles.image} />
      <h2 style={styles.title}>{title}</h2>
      <p style={styles.description}>{description}</p>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1rem',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#e0e0e0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  cardHover: {
    transform: 'scale(1.02)',
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '5px',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '1.5rem',
    margin: '0.5rem 0',
  },
  description: {
    fontSize: '1rem',
    margin: '0.5rem 0',
  },
};

export default MainCard;

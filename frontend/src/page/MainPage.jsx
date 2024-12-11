import React from 'react';
import MainCard from '../components/MainCard';
import { Link } from 'react-router-dom';

// Direct image imports
import videoImage from '../images/video.png';
import overviewImage from '../images/overview.png';
import trendsImage from '../images/trends.png';

const MainPage = () => {
  const cardsData = [
    { 
      title: 'Video Analytics', 
      description: 'Traffic analysis and reports', 
      link: '/VideoAnalysis', 
      width: '1250px', 
      height: '400px', 
      image: videoImage 
    },
    { 
      title: 'Overview', 
      description: 'View real-time traffic', 
      link: '/Overview', 
      width: '600px', 
      height: '400px', 
      image: overviewImage
    },
    { 
      title: 'Traffic Data Trends', 
      description: 'Traffic analysis and reports', 
      link: '/DataTrends', 
      width: '600px', 
      height: '400px', 
      image: trendsImage
    },
  ];

  // Rest of your component remains the same
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {cardsData.map((card, index) => (
          <MainCard key={index} {...card} />
        ))}
      </div>

      <footer style={styles.footer}>
        <Link to="/Settings">Settings</Link>
        <Link to="/Support">Support</Link>
        <Link to="/Contact">Contact</Link>
      </footer>
    </div>
  );
};

// ... rest of your code
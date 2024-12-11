import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar'; // Ensure NavBar is imported
import MainPage from './page/MainPage';
import VideoAnalysis from './page/VideoAnalysis';
import VideoDetail from './components/VideoDetail'; // Import the VideoDetail component
import { Navigate } from 'react-router-dom';

import Map from './page/Map';
import Overview from './page/Overview';
import TrafficVolume from './subpage/TrafficVolume';
import Performance from './subpage/Performance';
import TrafficMetrics from './subpage/TrafficMetrics';
import LengthVsSpeed from './subpage/LengthVsSpeed';

import Settings from './subpage/Settings'; // Import Settings Page
import Support from './subpage/Support'; // Import Support Page
import Contact from './subpage/Contact'; // Import Contact Page
//import VideoAnalysis from './page/VideoAnalysis';
//import NotFound from './page/NotFound'; // Optional: A 404 page for unknown routes

const App = () => {
  return (
    <Router>
      <div>
        <NavBar /> {/* Ensure NavBar is displayed on all pages */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/DataTrends" element={<Navigate to="/TrafficVolume" />} />  {/* Redirects directly to Traffic Volume */}
          <Route path="/VideoAnalysis" element={<VideoAnalysis />} />
          <Route path="/Map" element={<Map />} />
          <Route path="/Overview" element={<Overview />} />
          <Route path="/TrafficVolume" element={<TrafficVolume />} />
          <Route path="/Performance" element={<Performance />} />
          <Route path="/TrafficMetrics" element={<TrafficMetrics />} />
          <Route path="/LengthVsSpeed" element={<LengthVsSpeed />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/Support" element={<Support />} />
          <Route path="/Contact" element={<Contact />} />

          <Route path="/video/:id" element={<VideoDetail />} /> {/* Video detail route */}
          
          {/* Optional: 404 page for unknown routes */}
          {/*<Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

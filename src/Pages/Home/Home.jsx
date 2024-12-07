import React, { useState } from 'react';
import home_img from '../../assets/intro76.jpg';
import './Home.css'; // Import the CSS file

const Home = () => {
  const [showAbout, setShowAbout] = useState(false);

  const handleMouseEnter = () => {
    setShowAbout(true);
  };

  const handleMouseLeave = () => {
    setShowAbout(false);
  };

  return (
    <div
      className="home-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="home-text">Improve your Performance</div>
      <img className="home-image" src={home_img} alt="Home" />

      {showAbout && (
        <div className="about-popup">
          <h2>About Us</h2>
          <p>
            Welcome to our platform! We are dedicated to helping you improve your
            performance through effective tools and resources. Explore more to
            achieve your goals!
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;

import React from 'react';
import './Footer.css'; // Import the CSS file

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Tourpedia </p>
      </div>
    </footer>
  );
};

export default Footer;

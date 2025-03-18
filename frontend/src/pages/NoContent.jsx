import React from 'react';
import './NoContent.css';

function NoContent() {
  return (
    <div className="no-content-container">
      <div className="content-box">
        <h1 className="title">Coming Soon</h1>
        <div className="divider"></div>
        <p className="message">We're working on something awesome!</p>
        
        <div className="club-info">
          <h2>Hackathon Club</h2>
          <p>Empowering students to build, innovate, and create through code.</p>
          
          <div className="cta-section">
            <p>Join our community of passionate developers!</p>
            <div className="social-links">
              <a href="#" className="social-btn">Discord</a>
              <a href="#" className="social-btn">GitHub</a>
              <a href="#" className="social-btn">Instagram</a>
            </div>
          </div>
        </div>
      </div>
      
      <footer>
        <p>© {new Date().getFullYear()} Hackathon Club. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default NoContent;
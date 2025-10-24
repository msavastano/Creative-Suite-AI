import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SideMenu.css';

const SideMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`side-menu ${isOpen ? 'open' : 'closed'}`}>
      <button onClick={toggleMenu} className="toggle-button">
        {isOpen ? 'Close' : 'Open'}
      </button>
      <nav>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/image-generation">Image Generation</Link></li>
          <li><Link to="/image-editing">Image Editing</Link></li>
          <li><Link to="/video-generation">Video Generation</Link></li>
          <li><Link to="/video-player">Video Player</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default SideMenu;

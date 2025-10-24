import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SideMenu.css";

const SideMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`side-menu ${isOpen ? "open" : "closed"}`}>
      <button onClick={toggleMenu} className="toggle-button">
        {isOpen ? "Close" : "Open"}
      </button>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <span className="material-symbols-outlined icon">dashboard</span>
              <span className="label">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/image-generation">
              <span className="material-symbols-outlined icon">image</span>
              <span className="label">Image Generation</span>
            </Link>
          </li>
          <li>
            <Link to="/image-editing">
              <span className="material-symbols-outlined icon">edit</span>
              <span className="label">Image Editing</span>
            </Link>
          </li>
          <li>
            <Link to="/video-generation">
              <span className="material-symbols-outlined icon">
                video_library
              </span>
              <span className="label">Video Generation</span>
            </Link>
          </li>
          <li>
            <Link to="/video-player">
              <span className="material-symbols-outlined icon">play_arrow</span>
              <span className="label">Video Player</span>
            </Link>
          </li>
          <li>
            <Link to="/prompt-improvement">
              <span className="material-symbols-outlined icon">tips_and_updates</span>
              <span className="label">Prompt Improvement</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideMenu;

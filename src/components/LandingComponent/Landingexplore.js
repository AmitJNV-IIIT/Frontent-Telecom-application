import React from 'react';
import './css/LandingRecharge.css';
import { useNavigate } from 'react-router-dom';
//
function Explore() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/service-unavailable');
  };
  return (
    <div className="form" data-testid="explore">
      <div className="title">WANT TO EXPLORE?</div>
      <div className="subtitle subtitle-want">
        Excitel is a broadband service provider known for offering high-speed
        internet services primarily in select urban areas of India.
      </div>
      <button type="text" className="submit" onClick={handleClick}>
        Explore Excitel
      </button>
    </div>
  );
}

export default Explore;

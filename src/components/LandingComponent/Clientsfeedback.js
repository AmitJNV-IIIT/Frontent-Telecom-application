import React from 'react';
// import Userratingscarousel from "./UserRatingsCarousel";
import './css/Clientfeedback.css';
import TestimonialCard from './TestimonialCard';
//
function Clientsfeedback() {
  return (
    <div data-testid="clientfeedback">
      <div className="feedback">
        <div className="feedback-page-container">
          <TestimonialCard />
        </div>
      </div>
    </div>
  );
}
export default Clientsfeedback;

import React from 'react';
import feedbackImage from '../../assets/images/feedback.jpg';
//
function Coupon() {
  return (
    <div className="heading-container-coupon">
      <img src={feedbackImage} alt="Feedback" className="feedback-image" />
      <h2>Coupon</h2>
    </div>
  );
}

export default Coupon;

import React from 'react';
import loginIcon from '../../assets/images/Profile.png';
import './css/TestimonialCard.css';
//
function TestimonialCard({ testimonial }) {
  const numberOfStars = testimonial.starRating;

  // Create an array to store JSX elements for stars
  const starsArray = [];
  for (let i = 0; i < numberOfStars; i++) {
    starsArray.push(
      <span key={i} className="star">
        &#9733;
      </span>
    );
  }

  return (
    <div className="testimonial-card">
      <div className="testimonial-card-container">
        <div className="rate">
          <div className="feedback-stars-testimonial">{starsArray}</div>
        </div>
        <div>
          <span style={{ fontSize: '14px', color: 'lightgrey' }}>
            {testimonial.description}
          </span>
        </div>
        <br />
        <div className="testimonial-card-profile">
          <img
            className="testimonial-profile-image"
            src={loginIcon}
            alt="login"
          />
          <div style={{ marginLeft: '10px' }}>
            <div className="testimonial-profile-name">
              <b>{testimonial.customerName}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;

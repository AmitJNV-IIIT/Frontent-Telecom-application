import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './css/FeedbackAdmin.css';
import StarIcon from '@mui/icons-material/Star';
//
const Feedback = ({ name, description, rating }) => {
  const [expanded, setExpanded] = useState(false);

  const handleFeedbackClick = () => {
    setExpanded(!expanded);
  };

  const truncatedFeedback =
    description.length > 46
      ? description.substring(0, 46) + '...'
      : description;

  return (
    <div className="feedback-container-admin">
      <div className="user-info-container">
        <h3 className="feedback-name">{name}</h3>
        <h4 className="feedback-rating">
          {rating}
          <span className="star-particular">
            <StarIcon />
          </span>
        </h4>
      </div>

      <div>
        <p className="feedback-description" style={{ marginBottom: '0' }}>
          {expanded ? description : truncatedFeedback}
        </p>
        <p
          className="feedback-text"
          onClick={handleFeedbackClick}
          style={{ marginTop: '1%', color: '#FFC107' }}
        >
          {expanded ? 'Show Less' : 'Show More'}
        </p>
      </div>
    </div>
  );
};

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
};

export default Feedback;

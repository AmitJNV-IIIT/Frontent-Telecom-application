import React from 'react';

// import feedback from "../../assets/images/Base.png";
//
import './css/ExcitelFeedback.css';

import Feedback from './Feedback';

const ExcitelFeedback = () => {
  const handleFeedback = () => {
    console.log('');
  };

  return (
    <div className="feedback-page-container">
      <div>
        <h2 className="feedback-heading">Provide your feedback</h2>
      </div>

      <div className="container-feedback">
        <div className="feedback-col">
          <Feedback onFeedback={handleFeedback} />
        </div>

        {/* <div className="img-col">

          <img src={feedback} alt="Feedback Vector" />

        </div> */}
      </div>
    </div>
  );
};

export default ExcitelFeedback;

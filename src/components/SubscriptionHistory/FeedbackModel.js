import React, { useState } from 'react';
import './css/Feedback.css';
import HowerRating from './HoverRating';
// import feedbackImage from "../../assets/images/feedback.jpg";
import PlanDetails from './PlanDetails';
import Coupon from './Coupon';
//
// import "./css/prepaidrecharge.css";
import Swal from 'sweetalert2';
import ReusableSubscriptionCard from './ReusableSubscriptionCard';
import { request } from '../../axios/AxiosHelper';

function PlanFeedback() {
  var Comp = localStorage.getItem('Comp');
  Comp = JSON.parse(Comp);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const handleRatingChange = (newValue) => {
    setRating(newValue);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = (e) => {
    if (!rating || !feedback) {
      alert('Please fill in both the rating and feedback fields.');
      return;
    }
    e.preventDefault();
    const reviewData = {
      name: Comp.plan.planType,
      mobileNumber: Comp.mobileNumber,
      planID: Comp.plan.planID,
      starRating: rating,
      description: feedback
    };
    postDataToServer(reviewData);
    setFeedback('');
    //
    Swal.fire({
      icon: 'success',
      title: 'Feedback Submitted',
      text: 'Thank you for your feedback!'
    });
  };
  const postDataToServer = (data) => {
    request('POST', '/subscription/planfeedback', data)
      .then(() => {
        console.log('');
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: err.message,
          timer: 1000
        });
      });
  };
  return (
    <div
      className="card"
      style={{ background: 'black', display: 'flex', gap: '2rem' }}
    >
      <PlanDetails />

      <ReusableSubscriptionCard subscription={Comp} type={'Modal'} />

      <Coupon />
      <HowerRating value={rating} onChange={handleRatingChange} />
      <div className="heading-container" style={{ marginTop: '-3vh' }}>
        <img alt="Feedback" className="feedback-image" />
        <h3 style={{ marginTop: '2vh' }}>Plan Feedback</h3>
      </div>
      <div className="feedback-div">
        <textarea
          rows="4"
          cols="25"
          value={feedback}
          onChange={handleFeedbackChange}
          placeholder="Provide your feedback on the plan below"
        ></textarea>
      </div>
      <button onClick={handleSubmit} style={{ marginTop: '-3vh' }}>
        Submit
      </button>
    </div>
  );
}
export default PlanFeedback;

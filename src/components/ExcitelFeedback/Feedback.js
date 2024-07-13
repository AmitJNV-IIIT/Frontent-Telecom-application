/*eslint-disable*/

import React, { useState, useEffect } from 'react';
import './css/Feedback.css';
import '../SubscriptionHistory/HoverRating.js';
import HoverRating from '../SubscriptionHistory/HoverRating.js';
import Swal from 'sweetalert2';
import CategoryButton from './CategoryButton.js';
import { request } from '../../axios/AxiosHelper.js';
import { useNavigate } from 'react-router-dom';

const Feedback = (props) => {
  const [feedback, setFeedback] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [ratingData, setRatingData] = useState({
    starRating1: 0,
    starRating2: 0,
    starRating3: 0
  });
  const [formData, setFormData] = useState({
    starRating: '',
    description: '',
    category: [],
    name: 'Abhi Singh', // Default value
    mobileNumber: '9898787656' // Default value
  });

  const name = JSON.parse(window.sessionStorage.getItem('PersonData'));

  const [formReadyToSubmit, setFormReadyToSubmit] = useState(false);
  const navigate = useNavigate();
  const handleRatingChange = (rating, index) => {
    const newRatings = { ...ratingData, [index]: rating };
    setRatingData(newRatings);

    const averageRating = Math.floor(
      (parseFloat(newRatings.starRating1) +
        parseFloat(newRatings.starRating2) +
        parseFloat(newRatings.starRating3)) /
        3
    );

    setFormData({ ...formData, starRating: averageRating });
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Update only selectedCategory
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedCategory === '') {
      Swal.fire('Oops...', 'Please select at least one category!', 'error');
      return;
    } else if (feedback.trim() === '') {
      Swal.fire('Oops...', 'Feedback cannot be empty!', 'error');
      return;
    }

    // Proceed to submit form data
    setFormReadyToSubmit(true);
  };

  useEffect(() => {
    if (formReadyToSubmit) {
      // Simulate a POST request

      request('POST', '/subscriptions/excitelFeedback', {
        starRating: String(formData.starRating),
        description: feedback,
        category: selectedCategory, // Use selectedCategory
        customerName: name.name,
        mobileNumber: name.mobileNumber
      })
        .then((response) => {
          if (response.status === 'OK') {
            Swal.fire({
              icon: 'success',
              title: 'Feedback Posted Successfully',
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Feedback couldnt posted',
              showConfirmButton: false,
              timer: 1500
            });
          }
          setFeedback(''); // Reset feedback
          setSelectedCategory('');
          setFormData({}); // Reset selected categories
          navigate('/');
        })
        .catch((error) => console.error('Submission Error:', error))
        .finally(() => setFormReadyToSubmit(false)); // Reset submit trigger
    }
  }, [formReadyToSubmit, feedback, selectedCategory]);

  return (
    <div className="feed-excitel-feedback">
      <form onSubmit={handleSubmit} className="feed-excitel-feedback-form">
        <h2 className="feed-subheading">Share your Experience</h2>
        <div className="feed-star-div">
          <p className="feed-gradient-text">
            <b>Is our site useful to you?</b>
          </p>
          <HoverRating
            value={ratingData.starRating1}
            onChange={(rating) => handleRatingChange(rating, 'starRating1')}
            className="feedback-star-hover"
            style={{ marginTop: '2vh' }}
          />
        </div>
        <div className="feed-star-div">
          <p className="feed-gradient-text">
            <b>How easy is it to use?</b>
          </p>
          <HoverRating
            value={ratingData.starRating2}
            onChange={(rating) => handleRatingChange(rating, 'starRating2')}
            className="feedback-star-hover"
            style={{ marginTop: '2vh' }}
          />
        </div>
        <div className="feed-star-div">
          <p className="feed-gradient-text">
            <b>How is your overall experience on our website?</b>
          </p>
          <HoverRating
            value={ratingData.starRating3}
            onChange={(rating) => handleRatingChange(rating, 'starRating3')}
            className="feedback-star-hover"
            style={{ marginTop: '2vh' }}
          />
        </div>
        <h2 className="feed-category-subheading">
          Tell us what can be improved?
        </h2>
        <div className="feed-button-group">
          {[
            'Overall Service',
            'Customer Support',
            'On Time Delivery',
            'Network Band',
            'Others',
            'Speed'
          ].map((category) => (
            <CategoryButton
              className={
                selectedCategory === category ? 'selected-category' : ''
              }
              key={category}
              style={
                selectedCategory === category ? { background: 'purple' } : {}
              }
              category={category}
              isSelected={selectedCategory === category}
              onClick={(category) => handleCategoryClick(category)}
            />
          ))}
        </div>
        <div className="feedback-text-area-div">
          <h2 className="feed-form-label">Write a feedback</h2>
          <textarea
            name="feedback"
            placeholder="Your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="feedback-textarea"
          />
          <button className="feedback-submit-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Feedback;

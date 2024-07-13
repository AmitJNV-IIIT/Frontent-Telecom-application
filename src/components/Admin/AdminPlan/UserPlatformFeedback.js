import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import '../AdminPlan/css/UserPlatformFeedback.css';

const UserPlatformFeedback = ({ feedbackData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className="feedback-container"
      data-testid="user-feedback-modal"
      style={{ height: '82%', position: 'relative' }}
    >
      <h2 style={{ paddingTop: '1.3rem' }}>Recent Feedbacks</h2>
      <div className="admin-feedbacks-section">
        {feedbackData.slice(0, 3).map((item, index) => (
          <div key={index} className="feedback-container-desc">
            <div
              className="feedback-desc"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <FaUserCircle
                data-testid="user-feedback-icon"
                size={30}
                style={{ marginRight: '10px' }}
              />
              <h3>{item.CustomerName}</h3>
            </div>
            <p className="dashboard-p">{item.Description}</p>
          </div>
        ))}
      </div>
      <div className="feedback-admin-btn-div">
        <button
          className="all-feedback-btn"
          onClick={() => setIsModalOpen(true)}
        >
          View All Feedbacks
        </button>
      </div>

      {isModalOpen && (
        <div className="user-feedback-modal">
          <div className="user-feedback-modal-content">
            <div className="feedback-modal-container">
              <span
                className="close-modal"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </span>
              <div className="platform-feedback-h2">
                <h2 className="feedback-h2">Recent Feedbacks</h2>
              </div>

              {feedbackData.map((item, index) => (
                <div key={index} className="feedback-container-desc">
                  <div
                    className="feedback-desc"
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <FaUserCircle
                      data-testid="user-feedback-icon"
                      size={35}
                      style={{ marginRight: '10px' }}
                    />

                    <h3>{item.CustomerName}</h3>
                  </div>

                  <p className="dashboard-p">{item.Description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPlatformFeedback;

import React from 'react';
import './css/UserInformation.css';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
//

const UserInformation = ({ userInfo }) => {
  const navigate = useNavigate();
  const resetPassword = () => {
    navigate('/reset-password');
  };
  return (
    <div className="info-container">
      <div className="info-container-details">
        <div className="info-container-fields">
          <p>Name</p>
          <p>Email</p>
          <p>Mobile</p>
          <p>Type</p>
        </div>
        <div className="info-container-values">
          <p>{userInfo?.name}</p>
          <p>{userInfo?.email}</p>
          <p>{userInfo?.mobileNumber}</p>
          <p>{userInfo?.simType}</p>
        </div>
      </div>
      <button className="reset-button" onClick={resetPassword}>
        Reset Password
      </button>
    </div>
  );
};
UserInformation.propTypes = {
  userInfo: PropTypes.shape({
    // Define the structure of userInfo object
    name: PropTypes.string.isRequired,
    mobileNumber: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    simType: PropTypes.string.isRequired
    // Add more PropTypes for other properties if needed
  }).isRequired
};

export default UserInformation;

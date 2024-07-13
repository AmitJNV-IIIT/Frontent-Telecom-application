import React from 'react';
import './css/UserHomePageHeader.css';
import PropTypes from 'prop-types';

const UserHomePageHeader = ({ userInfo }) => {
  return (
    <div
      className="userhomepageheader"
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <div className="welcomeuser">
        <h1 style={{ fontSize: '37px', fontStyle: 'oblique' }}>
          {' '}
          {/*Hey Developer please remove this checking event */}
          {userInfo == undefined && userInfo.name == undefined
            ? ''
            : 'Hi ' + userInfo.name.split(' ')[0] + ', Welcome to Excitel!'}
        </h1>
        <span style={{ fontSize: '40px' }}>👋</span>
      </div>
    </div>
  );
};
UserHomePageHeader.propTypes = {
  userInfo: PropTypes.shape({
    // Define the structure of userInfo object
    name: PropTypes.string.isRequired
    // Add more PropTypes for other properties if needed
  }).isRequired
};
export default UserHomePageHeader;

import React from 'react';
// import { Link } from "react-router-dom";
import './css/AccessDenied.css';

const AccessDenied = () => {
  return (
    <div style={{ color: 'white' }} className="access-denied-container">
      <h1>Access Denied</h1>
      <p>
        Oops! It seems you dont have permission to access this page
        <br />
        Please contact your administrator for further assistance.
      </p>
      {/* <Link to="/">Go to Home Page</Link> */}
    </div>
  );
};

export default AccessDenied;

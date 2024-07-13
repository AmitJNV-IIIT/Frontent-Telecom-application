import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { Link } from "react-router-dom";
// import "../AccessDenied/css/AccessDenied";
//
const ServiceUnavailable = () => {
  const navigate = useNavigate();
  const reroute = () => {
    navigate('/');
    location.reload();
  };
  return (
    <div className="access-denied-container">
      <h1 style={{ color: 'white' }}>Service Currently Unavailable!!</h1>
      <p style={{ color: 'white' }}>Please retry after some time!!</p>
      <Button onClick={reroute}>Go to Home Page</Button>
    </div>
  );
};

export default ServiceUnavailable;

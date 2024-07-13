import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { Link } from "react-router-dom";

import '../Common/AccessDenied/css/AccessDenied.css';
const NoPageExists = () => {
  const navigate = useNavigate();
  const reroute = () => {
    navigate('/');
    location.reload();
  };
  return (
    <div className="access-denied-container">
      <h1 style={{ color: 'white' }}>404 Page Not Found</h1>
      <p style={{ color: 'white' }}>
        The page you are looking for doesn&apos;t exist!
      </p>
      <Button onClick={reroute}>Go to Home Page</Button>
    </div>
  );
};

export default NoPageExists;

import React from 'react';
import RegistrationPage from '../components/Authentication/Registration/RegistrationPage';

const Registration = () => {
  const handleClose = (e) => {
    console.log(e);
  };
  return <RegistrationPage type={'Registration'} handleClose={handleClose} />;
};

export default Registration;

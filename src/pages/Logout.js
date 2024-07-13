import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Common/Spinner/Spinner';
import { request } from '../axios/AxiosHelper';
//
const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    request('POST', '/auth/logout').then((response) => {});
  }, [navigate]);

  return (
    <div>
      <Spinner />
      <h1>Logging out...</h1>
    </div>
  );
};

export default Logout;

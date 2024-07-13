import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();
//
export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState('USER');

  const login = (role) => {
    // Accept userRole as argument to set role
    setRole(role);
    setIsLogin(true);
  };

  const logout = () => {
    setIsLogin(false);
    setRole('USER');
    window.sessionStorage.removeItem('auth_data');
  };

  return (
    <AuthContext.Provider value={{ role, isLogin, login, logout }}>
      {' '}
      {/* Include userId in the context value */}
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useAuth = () => useContext(AuthContext);

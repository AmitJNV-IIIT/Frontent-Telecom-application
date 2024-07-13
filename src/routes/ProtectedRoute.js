import React from 'react';
import { Route, Navigate } from 'react-router-dom';
//
const ProtectedRoute = ({ role, allowedRoles, path, element }) => {
  const renderElement = () => {
    return allowedRoles.includes(role) ? (
      element
    ) : (
      <Navigate to="/access-denied" />
    );
  };

  return <Route path={path} element={renderElement()} />;
};

export default ProtectedRoute;

/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LandingPage from '../pages/Landingpage';
import Prepaid from '../pages/Prepaid';
import Postpaid from '../pages/Postpaid';
import Login from '../pages/Login';
import RegistrationPage from '../components/Authentication/Registration/RegistrationPage';
import ResetPassword from '../components/Authentication/ResetPassword/ResetPassword';
import SupportPage from '../pages/Support';
import Subscription from '../pages/Subscription';
import BroadbandConnectionPage from '../pages/BroadbandConnection';
import ForgotPassword from '../pages/ForgotPassword';
import Broadband from '../pages/Broadband';
import UserHomePage from '../pages/Home';
import AdminPlanManagement from '../pages/AdminPlanManagement';
import AccessDenied from '../components/Common/AccessDenied/AccessDenied';
import Navbar from '../components/Common/Navbar/Navbar';
import Footer from '../components/Common/Footer/Footer';
import ProtectedRoute from './ProtectedRoute';
import ConfirmationPage from '../pages/Confirmation';
import LocateUs from '../pages/LocateUs';
import AdminDashboard from '../pages/AdminDashboard';
import ServiceUnavailable from '../components/Common/ServiceUnavailable/ServiceUnavailable';
import { element } from 'prop-types';
import NoPageExists from '../components/Common/NoPageExists';
import Feedback from '../pages/Feedback';
import { Navigate } from 'react-router-dom';

// import TestimonialCard from "../components/LandingComponent/TestimonialCard";
const withRoleProtection = (Component, role, allowedRoles) => {
  return allowedRoles.includes(role) ? (
    Component
  ) : (
    <Navigate to="/access-denied" />
  );
};

const ExcitelRoutes = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('');

  useEffect(() => {
    const sessionRole = window.sessionStorage.getItem('ROLE');
    setRole(sessionRole || '');
  }, []);
  const roleInfo = (e) => {
    if (e == null) {
      navigate('/login');
      setRole(e);
      window.sessionStorage.setItem('ROLE', '');
    } else if (e === 'RoutedLink') {
      setRole('USER');
      window.sessionStorage.setItem('ROLE', 'USER');
    } else if (e === 'USER') {
      navigate('/home');
      setRole(e);
      window.sessionStorage.setItem('ROLE', e);
    } else if (e === 'ADMIN') {
      navigate('/admin');
      setRole(e);
      window.sessionStorage.setItem('ROLE', e);
    }
  };

  const routes = {
    ADMIN: [
      { path: '/admin', element: <AdminPlanManagement /> },
      { path: '/admin/adminPlanManagement', element: <AdminPlanManagement /> },
      { path: '/admin/adminDashboard', element: <AdminDashboard /> }
    ],
    USER: [
      { path: '/home', element: <UserHomePage /> },
      { path: '/subscription', element: <Subscription /> },
      { path: '/feedback', element: <Feedback /> }
    ],
    COMMON: [
      { path: '/', element: <LandingPage /> },
      { path: '/prepaid', element: <Prepaid /> },
      { path: '/postpaid', element: <Postpaid /> },
      { path: '/broadband', element: <Broadband /> },
      { path: '/support', element: <SupportPage /> },
      { path: '/login', element: <Login roleInfo={roleInfo} /> },

      { path: '/register', element: <RegistrationPage /> },
      { path: '/reset-password', element: <ResetPassword /> },
      { path: '/forgot-password', element: <ForgotPassword /> },

      { path: '/broadbandConnection', element: <BroadbandConnectionPage /> },
      { path: '/locate', element: <LocateUs /> },
      { path: '/service-unavailable', element: <ServiceUnavailable /> },
      { path: '/access-denied', element: <AccessDenied /> },
      { path: '/confirmation', element: <ConfirmationPage /> }
    ]
  };

  // const userRoutes = role === 'ADMIN' ? routes.ADMIN : routes.COMMON;

  // const userRoutes = role ? routes[role] : routes.COMMON;
  return (
    <>
      <div className="navbar-wrapper">
        <div className="navbar">
          <Navbar roleInfo={roleInfo} role={role} />
        </div>
      </div>
      <Routes>
        {routes.COMMON.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        {routes.ADMIN.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={withRoleProtection(element, role, ['ADMIN'])}
          />
        ))}
        {routes.USER.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={withRoleProtection(element, role, ['USER'])}
          />
        ))}
        <Route path="*" element={<NoPageExists />} />
      </Routes>

      <Footer />
    </>
  );
};

export default ExcitelRoutes;

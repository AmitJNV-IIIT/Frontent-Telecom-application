/*eslint-disable*/

import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Modal from './Modal';
import loginIcon from '../../../assets/images/Profile.png';
import LogoPng from '../../../assets/images/logo.png';
import AdminPng from '../../../assets/images/adminLogo.png';
import './css/Navbar.css';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import UserInformation from '../../Home/UserInformation';
import RegistrationPage from '../../Authentication/Registration/RegistrationPage';
import HomeCouponModal from '../../Coupon/HomeCouponModal';
import { request } from '../../../axios/AxiosHelper';
// import { useAuth } from '../../../hooks/contextApi/AuthContext';

function Navbar({ roleInfo, role }) {
  const PersonData = JSON.parse(window.sessionStorage.getItem('PersonData'));

  const isLogin = role == 'USER';
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeLink, setActiveLink] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  // const dropdownRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [couponModal, setCouponModal] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    await request('POST', '/auth/logout').then((response) => {
      if (response.status == 'OK') {
        window.sessionStorage.clear();
        window.sessionStorage.setItem('ROLE', '');
        // Update authentication status
        setIsLoggedIn(false);
        roleInfo(null);
        toggleMenu(!open);
        window.sessionStorage.clear();
        // Navigate to the login page
        navigate('/login');
      }
    });
  };

  const handleLinkClick = async (path) => {
    if (path === '/logout') {
      await handleLogout();
      setActiveLink(path);
      setAnchorEl(null);
      navigate('/login');
    } else {
      if (path === '/') {
        setActiveLink('');
      } else {
        setActiveLink(path);
      }
      navigate(path);
      setAnchorEl(null);
    }
  };
  const loginCLick = () => {
    navigate('/login');
  };
  useEffect(() => {
    // setActiveLink(path);
    const currentPath = location.pathname;
    setActiveLink(currentPath);
    if (role !== '') {
      setIsLoggedIn(true);
    }
  }, [role, roleInfo]);
  const handleCloseModal = (e) => {
    setShowModal(false);
  };
  const setCouponsDetailsVisibility = () => {
    setCouponModal(false);
  };
  const modalOpen = () => {
    setShowModal(true);
    toggleMenu(!open);
  };
  const couponModalOpen = () => {
    setCouponModal(true);
    toggleMenu(!open);
  };
  // useEffect(() => {
  // const handleClickOutside = (event) => {
  // if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //   setIsOpen(false);
  // }
  // };

  // document.addEventListener('click', handleClickOutside);

  // return () => {
  //   document.removeEventListener('click', handleClickOutside);
  // };
  // }, []);
  function extractInitials(fullName) {
    const parts = fullName?.trim().split(/\s+/);

    if (parts && parts.length > 1) {
      return `${parts[0].charAt(0)}${parts[1].charAt(0)}`;
    } else {
      return parts[0].substring(0, 2).toUpperCase();
    }
  }
  if (role === 'USER') {
    const fullName = PersonData?.name;

    var initials = extractInitials(fullName);
  }

  // var initials = '0';

  return (
    <>
      <div className="desktop">
        <nav data-testid="navbar">
          <div className="logo">
            <Link
              to="/"
              className="photo_link"
              onClick={() => handleLinkClick('/')}
            >
              <img src={LogoPng} alt="Logo" />
            </Link>
          </div>

          <div className="pages">
            {role == 'ADMIN' ? (
              <Link
                to="/admin/adminDashboard"
                className={`text_link ${
                  activeLink === '/admin/adminDashboard' ? 'active-link' : ''
                }`}
                onClick={() => handleLinkClick('/admin/adminDashboard')}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/prepaid"
                className={`text_link ${
                  activeLink === '/prepaid' ? 'active-link' : ''
                }`}
                onClick={() => handleLinkClick('/prepaid')}
              >
                Prepaid
              </Link>
            )}
            {role == 'ADMIN' ? (
              <Link
                to="/admin/adminPlanManagement"
                className={`text_link ${
                  activeLink === '/admin/adminPlanManagement'
                    ? 'active-link'
                    : ''
                }`}
                onClick={() => handleLinkClick('/admin/adminPlanManagement')}
              >
                Data Plans
              </Link>
            ) : (
              <Link
                to="/postpaid"
                className={`text_link ${
                  activeLink === '/postpaid' ? 'active-link' : ''
                }`}
                onClick={() => handleLinkClick('/postpaid')}
              >
                Postpaid
              </Link>
            )}
            {role == 'ADMIN' ? (
              ''
            ) : (
              <Link
                to="/broadband"
                className={`text_link ${
                  activeLink === '/broadband' ? 'active-link' : ''
                }`}
                onClick={() => handleLinkClick('/broadband')}
              >
                Broadband
              </Link>
            )}
            {role === 'USER' ? (
              <Link
                to="/subscription"
                className={`text_link ${
                  activeLink === '/subscription' ? 'active-link' : ''
                }`}
                onClick={() => handleLinkClick('/subscription')}
              >
                Subscription
              </Link>
            ) : (
              role !== 'ADMIN' && (
                <Link
                  to="/locate"
                  className={`text_link ${
                    activeLink === '/locate' ? 'active-link' : ''
                  }`}
                  onClick={() => handleLinkClick('/locate')}
                >
                  Locate Us
                </Link>
              )
            )}
            {role === 'ADMIN' ? (
              <Link
                to="/login"
                className={`text_link ${
                  activeLink === '/login' ? 'active-link' : ''
                }`}
                onClick={() => handleLinkClick('/logout')}
              >
                Logout
              </Link>
            ) : (
              <Link
                to="/support"
                className={`text_link ${
                  activeLink === '/support' ? 'active-link' : ''
                }`}
                onClick={() => handleLinkClick('/support')}
              >
                Support
              </Link>
            )}
          </div>
          {role === 'ADMIN' ? (
            <img src={AdminPng} alt="Logo" width={30} height={30} />
          ) : role === 'USER' ? (
            <div className="dropdown">
              <div
                className="login"
                onClick={toggleMenu}
                style={{ display: 'flex' }}
              >
                {isLogin ? (
                  <Avatar sx={{ bgcolor: '#8F43EE', marginTop: '10%' }}>
                    {initials}
                  </Avatar>
                ) : (
                  <img src={loginIcon} alt="Logo" />
                )}

                {isOpen == false ? (
                  <ArrowDropDown style={{ color: 'white', height: '50px' }} />
                ) : (
                  <ArrowDropUp style={{ color: 'white', height: '50px' }} />
                )}
              </div>
              {PersonData != null && isOpen && (
                <div className="dropdown-content">
                  <Link
                    className="name-content"
                    style={{ border: 'none', cursor: 'inherit' }}
                  >
                    {PersonData?.name}
                  </Link>
                  <Link onClick={toggleMenu} to="/home">
                    Home
                  </Link>
                  <Link onClick={modalOpen}>User Details</Link>
                  <Link onClick={couponModalOpen}>View Coupons</Link>
                  <Link onClick={toggleMenu} to="/reset-password">
                    Change Password
                  </Link>
                  <Link onClick={handleLogout} to="/login">
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="login" onClick={loginCLick}>
              <img src={loginIcon} alt="login" />
            </div>
          )}
        </nav>
      </div>
      {showModal && (
        <Modal show={showModal}>
          <RegistrationPage
            PersonData={PersonData}
            type={'userDetails'}
            handleClose={handleCloseModal}
          />
        </Modal>
      )}
      {couponModal && (
        <Modal
          className="viewcouponmodal"
          type={'viewCoupon'}
          show={couponModal}
        >
          <HomeCouponModal
            type={'viewCoupon'}
            setCouponsDetailsVisibility={setCouponsDetailsVisibility}
          />
        </Modal>
      )}
      <div className="mobile">
        <AppBar
          position="fixed"
          m
          style={{
            backgroundColor: 'transparent'
          }}
        >
          <Toolbar className="toolbar" style={{ marginTop: '-3%' }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>

            <div className="logo">
              <Link to="/">
                <img src={LogoPng} alt="Logo" />
              </Link>
            </div>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{ style: { backgroundColor: '#090A18' } }}
            >
              {role === 'ADMIN' ? (
                <>
                  <MenuItem
                    onClick={() =>
                      handleLinkClick('/admin/adminPlanManagement')
                    }
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                    Dashboard
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      handleLinkClick('/admin/adminPlanManagement')
                    }
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                    Data Plans
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem
                    onClick={() => handleLinkClick('/prepaid')}
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                    Prepaid
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleLinkClick('/postpaid')}
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                    Postpaid
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleLinkClick('/broadband')}
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                    Broadband
                  </MenuItem>
                  {role === 'USER' && (
                    <MenuItem
                      onClick={() => handleLinkClick('/subscription')}
                      style={{ textDecoration: 'none', color: 'white' }}
                    >
                      Subscription
                    </MenuItem>
                  )}
                  <MenuItem
                    onClick={() => handleLinkClick('/locate')}
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                    Locate Us
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleLinkClick('/support')}
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                    Support
                  </MenuItem>
                </>
              )}
              {isLoggedIn && (
                <MenuItem
                  onClick={() => handleLinkClick('/logout')}
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  LogOut
                </MenuItem>
              )}
            </Menu>

            {role === 'ADMIN' ? (
              <img src={AdminPng} alt="Logo" width={30} height={30} />
            ) : role === 'USER' ? (
              <div className="dropdown">
                <div
                  className="login"
                  onClick={toggleMenu}
                  style={{ display: 'flex' }}
                >
                  {isLogin ? (
                    <Avatar sx={{ bgcolor: '#8F43EE', marginTop: '10%' }}>
                      {initials}
                    </Avatar>
                  ) : (
                    <img src={loginIcon} alt="Logo" />
                  )}
                  {isOpen == false ? (
                    <ArrowDropDown style={{ color: 'white', height: '50px' }} />
                  ) : (
                    <ArrowDropUp style={{ color: 'white', height: '50px' }} />
                  )}
                </div>
                {PersonData != null && isOpen && (
                  <div className="dropdown-content">
                    <Link
                      className="name-content"
                      style={{ border: 'none', cursor: 'inherit' }}
                    >
                      {PersonData?.name && PersonData.name.length > 15
                        ? PersonData.name.substring(0, 12) + '...'
                        : PersonData?.name}
                    </Link>
                    <Link onClick={toggleMenu} to="/home">
                      Home
                    </Link>
                    <Link onClick={modalOpen}>User Details</Link>
                    <Link onClick={couponModalOpen}>View Coupons</Link>
                    <Link onClick={toggleMenu} to="/reset-password">
                      Change Password
                    </Link>
                    <Link onClick={handleLogout} to="/login">
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="login" onClick={loginCLick}>
                <img src={loginIcon} alt="login" />
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}

export default Navbar;

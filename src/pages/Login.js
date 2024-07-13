import React, { useState } from 'react';

import { IconButton, InputAdornment, TextField, Link } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Swal from 'sweetalert2';
import RegisterBg from '../assets/images/Registerbg2.jpg';
import { useAuth } from '../hooks/contextApi/AuthContext';
import { request, setAuthHeader, requestNoHeader } from '../axios/AxiosHelper';

import '../components/Authentication/LoginComponent/css/Login.css';
import encodePassword from '../utils/EncodePassword';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = ({ roleInfo }) => {
  const history = useNavigate();
  const location = useLocation();
  const { login } = useAuth() || {};
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({
    phoneNumber: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  if (location.state && location.state.data) {
    window.sessionStorage.setItem(
      'PlanTypeForSelectedPlan',
      location.state.from
    );
    window.sessionStorage.setItem(
      'SelectedPlan',
      JSON.stringify(location.state.data)
    );
  }
  const fetchData = () => {
    request('GET', '/auth/user')
      .then((response) => {
        window.sessionStorage.setItem(
          'PersonData',
          JSON.stringify(response?.data)
        );
        const SelectedPlan = JSON.parse(
          window.sessionStorage.getItem('SelectedPlan')
        );
        const PlanTypeForSelectedPlan = window.sessionStorage.getItem(
          'PlanTypeForSelectedPlan'
        );
        if (SelectedPlan && PlanTypeForSelectedPlan) {
          history(PlanTypeForSelectedPlan, { state: { data: SelectedPlan } }); // Redirect back to the page where the modal was open
          roleInfo('RoutedLink');
        } else {
          roleInfo(response?.data?.role);
        }

        const preventNavigation = function () {
          window.history.pushState(null, null, window.location.pathname);
        };
        if (response?.data?.role) {
          // Check if the user is logged in
          window.history.pushState(null, null, window.location.pathname);
          window.removeEventListener('popstate', preventNavigation); // Remove existing listener
          window.addEventListener('popstate', preventNavigation); // Add new listener
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: err.message,
          timer: 1000
        });
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let errors = { phoneNumber: '', password: '' };
    // Combine phone number and password checks
    const phone = phoneNumber.trim();

    if (!phone) {
      errors.phoneNumber = 'Please enter a mobile number.';
    }
    if (!password.trim()) {
      errors.password = 'Password is required';
    }

    if (errors.phoneNumber || errors.password) {
      setFormErrors(errors);
      if (errors.phoneNumber) {
        setPhoneNumber('');
      } else if (errors.password) {
        setPassword('');
      }
    } else {
      setFormErrors({ phoneNumber: '', password: '' });
      onLogin();
    }
  };

  const phoneNumberChangeHandler = (e) => {
    e.preventDefault();
    const val = e.target.value.slice(0, 10);
    const regex = /^[0-9]*$/;
    if (!regex.test(val)) {
      return;
    }
    setPhoneNumber(val);
    if (val?.length === 10 && !(val.charAt(0) >= '0' && val.charAt(0) <= '5')) {
      setFormErrors({ phoneNumber: '' });
    } else {
      validatePhoneNumber(val);
    }
  };

  function validatePhoneNumber(phone) {
    let errors = { phoneNumber: '', password: '' };

    if (phone.charAt(0) === '0' || phone?.length !== 10) {
      if (phone.charAt(0) >= '0' && phone.charAt(0) <= '5') {
        errors.phoneNumber = 'Phone number cannot start with digits 0-5.';
        setFormErrors(errors);
      } else if (phone?.length !== 10 && phone?.length) {
        errors.phoneNumber = 'Phone number must be exactly 10 digits long.';
        setFormErrors(errors);
      } else if (phone?.length === 10) {
        errors.phoneNumber = '';
        setFormErrors(errors);
      } else {
        errors.phoneNumber = '';
        setFormErrors(errors);
      }
    }
  }

  const passwordChangeHandler = (e) => {
    let errors = { phoneNumber: '', password: '' };
    setFormErrors(errors);
    e.preventDefault();
    setPassword(e.target.value);
    setFormErrors({ ...formErrors });
  };

  const onLogin = () => {
    requestNoHeader('POST', '/auth/login', {
      mobileNumber: phoneNumber,
      password: encodePassword(password)
    })
      .then((response) => {
        if (response.status === '401 UNAUTHORIZED') {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed: Invalid Credentials',
            showConfirmButton: false,
            timer: 1500
          });
        }
        setAuthHeader(response?.response.split(':')[1].trim());

        if (response.status === 'OK') {
          Swal.fire({
            icon: 'success',
            title: 'Login successful',
            showConfirmButton: false,
            timer: 1500
          });
          fetchData();
          login(response.message);
        }
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: 'Try again',
          timer: 2000
        });
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="app">
      <div
        style={{
          backgroundImage: `url(${RegisterBg})`,
          width: '100%',
          height: 'auto',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        className="app-top"
      >
        {/* <div className="app-left grid-layout"> */}
        {/* <img
            src="https://ps-asde-ggn-batch3-frontend-assets.s3.amazonaws.com/static-assets/login_page_5.png"
            alt="Earth Image"
            className="earth-image"
          /> */}
        {/* </div> */}

        <div className="app-right">
          <h1 className="h1ForRegister">Welcome to Excitel!</h1>
          <h3>Log in to unlock a world of digital experiences.</h3>

          <form className="app-form" onSubmit={handleSubmit}>
            <p className="login-p1">Please enter mobile number</p>

            <TextField
              placeholder="Enter Mobile Number"
              id="input-with-icon-textfield"
              variant="outlined"
              name="phoneNumber"
              value={phoneNumber}
              onChange={phoneNumberChangeHandler}
              className="phoneNumberInput"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" style={{ color: 'black' }}>
                    +91
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end" style={{ color: 'white' }}>
                    <IconButton
                      style={{ color: 'white', backgroundColor: 'black' }}
                      data-testid="password-toggle-icon"
                    >
                      <CallIcon color="inherit" />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {formErrors.phoneNumber && (
              <p className="phoneNumberError">{formErrors.phoneNumber}</p>
            )}

            <p style={{ fontSize: '15px' }}>Please enter your password</p>
            <TextField
              placeholder="Enter Password"
              id="input-with-icon-textfield"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              value={password}
              onChange={passwordChangeHandler}
              className="passwordInput"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      style={{
                        color: 'white',
                        backgroundColor: 'black',
                        width: '30px',
                        height: '30px'
                      }}
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <VisibilityOffIcon color="black" />
                      ) : (
                        <VisibilityIcon color="black" />
                      )}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {formErrors.password && (
              <p className="passwordError">{formErrors.password}</p>
            )}

            <div>
              <input
                type="submit"
                value="Login"
                className="login-button"
                // disabled={!phoneNumber || !password}
                onClick={handleSubmit}
                disabled={formErrors.phoneNumber}
              />
            </div>
          </form>

          <p>
            New here ?{' '}
            <Link
              className="registerText"
              href="/register"
              style={{
                color: 'white',
                textDecoration: 'none',
                fontWeight: 600
              }}
            >
              Register Here
            </Link>
          </p>
          {/* <p><NavLink to="/forgot-password">Forgot password?</NavLink></p> */}
          <Link
            className="registerText"
            href="/forgot-password"
            style={{
              color: 'white',

              fontWeight: 600,
              textDecoration: 'underline',
              textDecorationColor: 'black'
            }}
          >
            <p>Forgot Password</p>
          </Link>
        </div>

        {/* </Grid> 
        </Grid> */}
      </div>
    </div>
  );
};

export default Login;

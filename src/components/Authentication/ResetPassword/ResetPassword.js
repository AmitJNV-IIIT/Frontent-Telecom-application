import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material';
import { ArrowBack, Visibility, VisibilityOff } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './css/ResetPassword.css';
// import { useAuth } from '../../../hooks/contextApi/AuthContext';
import { request } from '../../../axios/AxiosHelper';
import DummyImg from '../../../assets/images/reset-pass3.jpg';
import './css/ResetPassword.css';
import encodePassword from '../../../utils/EncodePassword';

const ResetPassword = () => {
  // const { isLogin } = useAuth();
  const role = window.sessionStorage.getItem('ROLE');
  const isLogin = role == 'USER';
  const location = useLocation();

  var hashKey;
  var phoneNumber;
  /* istanbul ignore next */
  {
    if (location.state == null) {
      hashKey = null;
    } else {
      // istanbul ignore next
      phoneNumber = location.state.phoneNumber;
      // istanbul ignore next
      hashKey = location.state.hashKey;
    }
  }
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  //   const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleTogglePasswordVisibility = (toggleFunction) => {
    toggleFunction((prevShowPassword) => !prevShowPassword);
  };
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Reset Password: Excitel';
    return () => {
      document.title = previousTitle;
    };
  }, []);

  const getPasswordInputProps = (showPassword, toggleFunction, name) => {
    return {
      type: showPassword ? 'text' : 'password',
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            onClick={() => handleTogglePasswordVisibility(toggleFunction)}
            edge="end"
            aria-label={`toggle ${name} password visibility`}
            className="eye-btn"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      )
    };
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'oldPassword':
        setOldPassword(value);
        break;
      case 'newPassword':
        setNewPassword(value);
        break;
      case 'confirmNewPassword':
        setConfirmNewPassword(value);
        break;
    }

    // Password validation
    if (name === 'newPassword') {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(value)) {
        setNewPasswordError(
          'Password must contain at least one lowercase letter, one uppercase letter, one digit, and minimum length of 8 characters'
        );
      } else {
        setNewPasswordError('');
      }
    }

    if (name === 'confirmNewPassword') {
      if (value !== newPassword) {
        setConfirmPasswordError('Passwords should match');
      } else {
        setConfirmPasswordError('');
      }
    }
  };
  const handlePasswordUpdate = (endpoint, requestData) => {
    request('POST', endpoint, requestData).then((response) => {
      if (response.status === 'OK') {
        Swal.fire({
          icon: 'success',
          title: 'Password Update Successfuly',
          showConfirmButton: false,
          timer: 1500
        });

        navigate('/home');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Password Update Unsuccessful',
          text: 'Try Again!!',
          showConfirmButton: true
        });
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newPasswordError || confirmPasswordError) {
      Swal.fire({
        icon: 'error',
        title: 'Password Update Unsuccessful',
        text: 'Please fix the validation errors before updating the password.',
        showConfirmButton: true
      });
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      return;
    } else {
      // istanbul ignore next
      const endpoint = isLogin
        ? '/auth/reset-password-login'
        : '/auth/password/reset-password';

      // istanbul ignore next
      const requestData = isLogin
        ? {
            oldPassword: encodePassword(oldPassword),
            newPassword: encodePassword(newPassword)
          }
        : {
            status: 'update Password',
            mobileNumber: phoneNumber,
            keyAndHash: hashKey,
            newPassword: encodePassword(newPassword)
          };

      handlePasswordUpdate(endpoint, requestData);

      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    }
  };
  return (
    <div className="parent">
      <Container className="container">
        <Grid style={{ marginTop: '2vh' }} container spacing={3}>
          <Grid item xs={12} md={8} className="grid-left">
            <Box className="box">
              <IconButton
                className="back-btn"
                data-testid="back-btn"
                onClick={() => navigate(-1)}
              >
                <ArrowBack />
              </IconButton>
              <h2 style={{ color: 'white' }}>Set a New Password</h2>
              <p style={{ color: 'whitesmoke' }}>
                Create a new password. Ensure it differs from previous ones for
                security
              </p>
              <form onSubmit={handleSubmit}>
                {isLogin && (
                  <div>
                    <label style={{ color: 'white' }} htmlFor="oldPassword">
                      Old Password
                    </label>
                    <div className="input-field">
                      <TextField
                        className="text-field"
                        id="oldPassword"
                        name="oldPassword"
                        variant="outlined"
                        value={oldPassword}
                        onChange={handleChange}
                        fullWidth
                        required
                        placeholder="Please enter old password"
                        InputProps={getPasswordInputProps(
                          showOldPassword,
                          setShowOldPassword,
                          oldPassword
                        )}
                      />
                    </div>
                  </div>
                )}
                <label style={{ color: 'white' }} htmlFor="newPassword">
                  New Password
                </label>
                <div className="input-field">
                  <TextField
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={handleChange}
                    fullWidth
                    required
                    placeholder="Please enter new password"
                    InputProps={getPasswordInputProps(
                      showNewPassword,
                      setShowNewPassword,
                      'newPassword'
                    )}
                  />
                </div>
                {newPasswordError && (
                  <Typography variant="body2" color="error">
                    {newPasswordError}
                  </Typography>
                )}

                <label style={{ color: 'white' }} htmlFor="confirmNewPassword">
                  Confirm New Password
                </label>
                <div className="input-field">
                  <TextField
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    type="password"
                    value={confirmNewPassword}
                    onChange={handleChange}
                    fullWidth
                    required
                    placeholder="Please confirm new password"
                    InputProps={getPasswordInputProps(
                      showConfirmNewPassword,
                      setShowConfirmNewPassword,
                      'confirmNewPassword'
                    )}
                  />
                </div>
                {confirmPasswordError && (
                  <Typography variant="body2" color="error">
                    {confirmPasswordError}
                  </Typography>
                )}

                <Button type="submit" className="update-btn">
                  Update Password
                </Button>
              </form>
            </Box>
          </Grid>
          <Grid item md={4} className="grid-right">
            <Box className="image-box">
              <img
                src={DummyImg}
                alt="DummyImage"
                style={{
                  width: '89%',
                  marginLeft: '-9.2vw',
                  borderRadius: '5%'
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ResetPassword;

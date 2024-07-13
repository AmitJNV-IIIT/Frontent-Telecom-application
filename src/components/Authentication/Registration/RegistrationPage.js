/*eslint-disable*/
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditNoteIcon from '@mui/icons-material/EditNote';
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { Email, Visibility, VisibilityOff } from '@mui/icons-material';

import Swal from 'sweetalert2';

import { request, requestNoHeader } from '../../../axios/AxiosHelper';
import './css/RegistrationPage.css';
import encodePassword from '../../../utils/EncodePassword';
//
let isdisable = false;
const RegistrationPage = ({ PersonData, type, handleClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',

    state: '',
    postalCode: '',
    country: 'India',
    subscriptionType: ''
  });
  useEffect(() => {
    const fetchFromData = async () => {
      setFormData({
        name: PersonData?.name || '',

        email: PersonData?.email || '',
        phone: PersonData?.mobileNumber || '',
        address: PersonData?.address || '',
        state: PersonData?.state || '',
        postalCode: PersonData?.pinCode || '',
        subscriptionType: PersonData?.simType || '',
        country: PersonData?.country || ''
      });
    };
    fetchFromData();
    setUserEnter(false);
  }, [PersonData]);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',

    state: '',
    postalCode: '',
    country: 'India'
  });

  const [otpState, setOTPState] = useState({
    otpSent: false,
    otpInput: ''
  });
  const [verifiedUser, setVerifiedUser] = useState(false);
  const [userEnter, setUserEnter] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (type === 'userDetails') {
    isdisable = true;
  }
  const [codes, setCodes] = useState(['', '', '', '', '', '']);

  let otpRecieved = '';
  if (codes.length === 6) {
    for (let i = 0; i < codes.length; i++) {
      otpRecieved += codes[i];
    }
  }

  // const [isCodeInputDisabled, setIsCodeInputDisabled] = useState(false);
  const inputRefs = useRef([]);

  const handleCodeChange = (index, event) => {
    const value = event.target.value;
    const newValue = value.length > 1 ? value.charAt(0) : value; // Limit input to one character
    const newCodes = [...codes];
    newCodes[index] = newValue;
    setCodes(newCodes);

    // setOTPState({...otpState,otpInput:result})
    if (index < 5 && value !== '') {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index, event) => {
    if (event.key === 'Backspace' && index > 0 && codes[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    const { value } = event.target;
    setPasswordsMatch(value === formData.password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'subscriptionType' && type == 'userDetails') {
    } else {
      setUserEnter(true);

      if (name === 'password' && type !== 'userDetails') {
        if (!value.length) {
          setValidationErrors({ ...validationErrors, password: '' });
        } else {
          let passwordErrorMessage = validatePassword(value);

          setValidationErrors((prevState) => ({
            ...prevState,
            [name]: passwordErrorMessage
          }));
        }
      } else if (name === 'email') {
        const isValidEmail = /\S+@\S+\.\S+/.test(value);
        setValidationErrors((prevState) => ({
          ...prevState,
          [name]: isValidEmail ? '' : 'Please provide a valid email'
        }));
        if (value.length === 0) {
          setValidationErrors({ ...validationErrors, email: '' }); // Clear error on empty email
        }
      }

      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  const userDetailsSave = () => {
    console.log('');
  };

  function postalChangeHandler(e) {
    const { value } = e.target;
    setUserEnter(true);
    // Allow only numbers and backspace key
    const newValue = value.replace(/[^0-9\b]/g, '');

    // Limit length to 6
    if (newValue.length > 6) {
      return;
    }

    // Update the state or input value with the sanitized value
    // (implementation depends on your framework)
    setFormData({ ...formData, postalCode: newValue }); // Example for state update
  }

  function validatePassword(value) {
    let passwordErrorMessage = '';
    if (value.length < 8) {
      passwordErrorMessage = 'Password must be at least 8 characters long';
    } else if (!/[a-z]/.test(value)) {
      passwordErrorMessage =
        'Password must contain at least one lowercase letter';
    } else if (!/[A-Z]/.test(value)) {
      passwordErrorMessage =
        'Password must contain at least one uppercase letter';
    } else if (!/\d/.test(value)) {
      passwordErrorMessage = 'Password must contain at least one digit';
    } else if (!/[!@#$%^&*]/.test(value)) {
      passwordErrorMessage =
        'Password must contain at least one special character';
    }
    return passwordErrorMessage;
  }

  function nameValidation(val) {
    if (val.length < 3 || val.length === 0) {
      const msg = 'Please enter atleast three characters';
      setValidationErrors({ ...validationErrors, name: msg });
    } else {
      setValidationErrors({ ...validationErrors, name: '' });
    }
  }

  const nameInputHandler = (e) => {
    e.preventDefault();
    const val = e.target.value;
    const regex = /^[a-zA-Z ]*$/;

    if (!regex.test(val)) {
      return;
    }
    nameValidation(val);
    setUserEnter(true);
    setFormData({
      ...formData,
      name: val
    });
  };

  const phoneNumberChangeHandler = (e) => {
    e.preventDefault();
    const val = e.target.value.slice(0, 10);
    const regex = /^[0-9]*$/;
    if (!regex.test(val)) {
      return;
    }
    setFormData({
      ...formData,
      phone: val
    });
    if (val.length === 10 && !(val.charAt(0) >= '0' && val.charAt(0) <= '5')) {
      setValidationErrors({ ...validationErrors, phone: '' });
    } else {
      validatePhoneNumber(val);
    }
  };

  function validatePhoneNumber(phone) {
    let phoneError = '';
    if (phone.charAt(0) === '0' || phone.length !== 10) {
      if (phone.charAt(0) >= '0' && phone.charAt(0) <= '5') {
        phoneError = 'Phone number cannot start with digits 0-5.';
        setValidationErrors({ ...setValidationErrors, phone: phoneError });
      } else if (phone.length !== 10 && phone.length) {
        phoneError = 'Phone number must be exactly 10 digits long.';
        setValidationErrors({ ...setValidationErrors, phone: phoneError });
      } else if (phone.length === 10) {
        phoneError = '';
        setValidationErrors({ ...setValidationErrors, phone: phoneError });
      } else {
        phoneError = '';
        setValidationErrors({ ...setValidationErrors, phone: phoneError });
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (type === 'userDetails') {
      const updateData = {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        pinCode: formData.postalCode,
        state: formData.state,
        mobileNumber: formData.phone,
        country: 'India',
        simType: formData.subscriptionType
      };
      try {
        request('PUT', `/auth/user`, updateData).then((response) => {
          if (response.status === 'OK') {
            Swal.fire({
              icon: 'success',
              title: 'User Details updated successfuly',
              showConfirmButton: false,
              timer: 1500
            });
            window.sessionStorage.setItem(
              'PersonData',
              JSON.stringify(updateData)
            );
            setUserEnter(false);
          }
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: error.message,
          timer: 1000
        });
      }
    } else {
      const isValid = validateForm(formData);
      if (isValid) {
        request('POST', '/auth/register', {
          mobileNumber: formData.phone,
          password: encodePassword(formData.password),
          name: formData.name,
          simType: formData.subscriptionType,
          address: formData.address,
          pinCode: formData.postalCode,
          state: formData.state,
          country: 'India',
          email: formData.email
        })
          .then((response) => {
            if (response.status == 'CREATED') {
              Swal.fire({
                icon: 'success',
                title: 'Registration Successful',
                showConfirmButton: false,
                timer: 1500
              });
              navigate('/login');
            }
            // setFormData()
            // login();
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'An error occurred during registration',
              showConfirmButton: false,
              timer: 1500
            });
            console.error('An error occurred during registration:', error);
          });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Invalid form fields',
          showConfirmButton: false,
          timer: 1500
        });
      }
      setFormData({
        ...formData,
        password: '',
        confirmPassword: ''
      });
    }
  };

  const validateForm = (formData) => {
    const isValidPhoneNumber = /^\d{10}$/.test(formData.phone);

    const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(
      formData.password
    );

    return isValidPhoneNumber && isValidPassword;
  };

  const handleSendOTP = () => {
    requestNoHeader('GET', '/auth/password/send-otp/' + formData.phone).then(
      (response) => {
        if (response.status == 'OK') {
          // Here you can implement the logic to send OTP
          // For demonstration purposes, let's just update the state to simulate OTP sent
          setOTPState({
            otpSent: true,
            otpInput: ''
          });
          Swal.fire({
            icon: 'success',
            title: 'OTP sent successfully',
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'something went wrong',
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    );
  };

  const handleReSendOTP = () => {
    handleSendOTP();
  };

  const handleSubmitOTP = async () => {
    //implement the logic to submit OTP

    await requestNoHeader('POST', '/auth/password/verify-otp', {
      mobileNumber: formData.phone,
      otp: otpRecieved
    }).then((response) => {
      if (response.status == 'OK') {
        setVerifiedUser(true);
        Swal.fire({
          icon: 'success',
          title: 'OTP Verification Successful',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Wrong OTP',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  };
  return (
    <>
      <Container className="container_registration">
        {/* <div className="top-right-corner"></div> */}

        <Grid
          container
          spacing={type === 'userDetails' ? 1 : 3}
          className="grid-container"
        >
          {type == 'userDetails' ? (
            ''
          ) : (
            <Grid
              item
              xs={12}
              sm={6}
              style={{
                display: 'flex',
                justifyContent: 'center'
              }}
              className="grid-image"
            >
              <Typography
                style={{ fontSize: '4rem', fontFamily: 'fantasy' }}
                variant="h1"
                align="center"
                className="image-header"
              >
                Let&apos;s Connect The World
              </Typography>

              <img
                src="https://ps-asde-ggn-batch3-frontend-assets.s3.amazonaws.com/static-assets/spinning_earth1.gif"
                alt="Spinning earth"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  animation: 'spin 5s linear infinite' // Adjust the duration (5s) to slow down or speed up the animation
                }}
              />
            </Grid>
          )}
          <Grid item xs={12} sm={type === 'userDetails' ? 12 : 6}>
            <Box
              className={
                type == 'userDetails' ? 'user-details-box' : 'register-box'
              }
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                  variant="h4"
                  style={{
                    color: '#ffffff',
                    fontWeight: 600,
                    textAlign: 'center',
                    marginBottom: '1rem'
                  }}
                >
                  {type == 'userDetails' ? 'My Details' : ''}
                </Typography>
                {type == 'userDetails' ? (
                  <Close
                    style={{
                      color: 'white',
                      cursor: 'pointer',
                      textAlign: 'right'
                    }}
                    onClick={handleClose}
                  />
                ) : (
                  ''
                )}
              </div>

              <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="white-label">
                    Name:
                  </label>
                  <TextField
                    className="input-textfield"
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={nameInputHandler}
                    placeholder="Enter your name"
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                    InputProps={
                      type == 'userDetails'
                        ? {
                            endAdornment: (
                              <InputAdornment position="end">
                                <EditNoteIcon />
                              </InputAdornment>
                            )
                          }
                        : ''
                    }
                  />
                  {validationErrors.name && (
                    <Typography variant="body2" style={{ color: 'red' }}>
                      {validationErrors.name}
                    </Typography>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="white-label">
                    Email:
                  </label>
                  <TextField
                    className="input-textfield"
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                    InputProps={
                      type == 'userDetails'
                        ? {
                            endAdornment: (
                              <InputAdornment position="end">
                                <EditNoteIcon />
                              </InputAdornment>
                            )
                          }
                        : {
                            endAdornment: (
                              <InputAdornment position="end">
                                <Email />
                              </InputAdornment>
                            )
                          }
                    }
                  />
                  {validationErrors.email && (
                    <Typography variant="body2" style={{ color: 'red' }}>
                      {validationErrors.email}
                    </Typography>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="white-label">
                    Phone Number:
                  </label>
                  <TextField
                    className="input-textfield"
                    type="tel"
                    name="phone"
                    id="phone"
                    disabled={isdisable}
                    value={
                      type == 'userDetails'
                        ? PersonData?.mobileNumber
                        : formData.phone
                    }
                    onChange={phoneNumberChangeHandler}
                    placeholder="Enter your phone number"
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                    InputProps={
                      type == 'userDetails'
                        ? ''
                        : {
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className="input-textfield"
                                size="small"
                                style={{ color: 'black', fontSize: 'small' }}
                              >
                                +91
                              </InputAdornment>
                            )
                          }
                    }
                  />
                  {validationErrors.phone && (
                    <Typography variant="body2" style={{ color: 'red' }}>
                      {validationErrors.phone}
                    </Typography>
                  )}
                </div>
                {type == 'userDetails' ? (
                  ''
                ) : (
                  <>
                    <div className="form-group-send-otp">
                      {otpState.otpSent ? null : (
                        <div className="sendOtpBtn">
                          <Button
                            className="submit-button"
                            variant="contained"
                            onClick={handleSendOTP}
                            disabled={
                              validationErrors.phone || formData.phone === ''
                            }
                            style={{
                              marginBottom: '1rem',
                              background:
                                'linear-gradient(to right bottom, rgb(0, 128, 255), rgb(128, 0, 255))',
                              marginLeft: '36%'
                            }}
                          >
                            Send OTP
                          </Button>
                        </div>
                      )}
                      {/* verifiedUser?null:otpState.otpSent */}
                      {verifiedUser
                        ? null
                        : otpState.otpSent && (
                            <div>
                              <div className="code-input-container">
                                {codes.map((code, index) => (
                                  <input
                                    key={index}
                                    ref={(el) =>
                                      (inputRefs.current[index] = el)
                                    }
                                    type="text"
                                    value={code}
                                    onChange={(e) => handleCodeChange(index, e)}
                                    onKeyDown={(e) => handleBackspace(index, e)}
                                    className="code-input-box"
                                    maxLength={1}
                                    placeholder="-"
                                  />
                                ))}
                              </div>

                              <div className="button-container-register">
                                <Button
                                  className="submit-button"
                                  variant="contained"
                                  onClick={handleSubmitOTP}
                                  disabled={!otpState.otpSent}
                                >
                                  Submit OTP
                                </Button>
                                <div>
                                  <span
                                    className="resend-link"
                                    onClick={handleReSendOTP}
                                  >
                                    Resend
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="password" className="white-label">
                        Password:
                      </label>
                      <TextField
                        className="input-textfield"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        fullWidth
                        required
                        variant="outlined"
                        size="small"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleTogglePasswordVisibility}
                                edge="end"
                                aria-label="toggle password visibility"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                      {validationErrors.password && (
                        <Typography variant="body2" style={{ color: 'red' }}>
                          {validationErrors.password}
                        </Typography>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="confirmPassword" className="white-label">
                        Confirm Password:
                      </label>
                      <TextField
                        className="input-textfield"
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={(e) => {
                          handleChange(e);
                          handleConfirmPasswordChange(e);
                        }}
                        placeholder="Confirm your password"
                        fullWidth
                        required
                        variant="outlined"
                        size="small"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleToggleConfirmPasswordVisibility}
                                edge="end"
                                aria-label="toggle confirm password visibility"
                              >
                                {showConfirmPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                      {!passwordsMatch && (
                        <Typography variant="body2" style={{ color: 'red' }}>
                          Passwords should match
                        </Typography>
                      )}
                    </div>
                  </>
                )}
                <div className="form-group">
                  <label htmlFor="address" className="white-label">
                    Address Line:
                  </label>
                  <TextField
                    className="input-textfield"
                    type="text"
                    name="address"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                    InputProps={
                      type == 'userDetails'
                        ? {
                            endAdornment: (
                              <InputAdornment position="end">
                                <EditNoteIcon />
                              </InputAdornment>
                            )
                          }
                        : ''
                    }
                  />
                </div>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <div className="form-group">
                      <label htmlFor="state" className="white-label">
                        State:
                      </label>
                      <TextField
                        className="input-textfield"
                        type="text"
                        name="state"
                        id="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Enter your state"
                        fullWidth
                        required
                        variant="outlined"
                        size="small"
                        style={{ width: '206%' }}
                        InputProps={
                          type == 'userDetails'
                            ? {
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <EditNoteIcon />
                                  </InputAdornment>
                                )
                              }
                            : ''
                        }
                      />
                    </div>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <div className="form-group">
                      <label htmlFor="postalCode" className="white-label">
                        Postal Code:
                      </label>
                      <TextField
                        className="input-textfield"
                        type="text"
                        name="postalCode"
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={postalChangeHandler}
                        placeholder="Enter your postal code"
                        fullWidth
                        required
                        variant="outlined"
                        size="small"
                        InputProps={
                          type == 'userDetails'
                            ? {
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <EditNoteIcon />
                                  </InputAdornment>
                                )
                              }
                            : ''
                        }
                      />
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="form-group">
                      <label htmlFor="country" className="white-label">
                        Country:
                      </label>
                      <TextField
                        disabled
                        className="input-textfield"
                        type="text"
                        name="country"
                        id="country"
                        value="India"
                        fullWidth
                        required
                        size="small"
                      />
                    </div>
                  </Grid>
                </Grid>

                <div className="form-group">
                  <label className="white-label">Subscription Type:</label>
                  <RadioGroup
                    className="styleAlign "
                    aria-label="subscriptionType"
                    name="subscriptionType"
                    disabled={isdisable}
                    value={formData.subscriptionType.toLowerCase()}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="prepaid"
                      control={<Radio className="radio-button" />}
                      label="Prepaid"
                      labelPlacement="end"
                      className="white-label"
                    />
                    <FormControlLabel
                      value="postpaid"
                      control={<Radio className="radio-button" />}
                      label="Postpaid"
                      labelPlacement="end"
                      className="white-label"
                    />
                    {/* <FormControlLabel
                    value="broadband"
                    control={<Radio className="radio-button" />}
                    label="Broadband"
                    labelPlacement="end"
                    className="white-label"
                  /> */}
                  </RadioGroup>
                </div>

                {type == 'userDetails' ? (
                  <Button
                    onClick={userDetailsSave}
                    style={{
                      marginTop: '-3vh',
                      background:
                        'linear-gradient(to right bottom, rgb(0, 128, 255), rgb(128, 0, 255))'
                    }}
                    className="submit-button"
                    type="submit"
                    variant="contained"
                    disabled={!userEnter || validationErrors.name !== ''}
                  >
                    SAVE
                  </Button>
                ) : (
                  <Button
                    style={{
                      background:
                        'linear-gradient(to right bottom, rgb(0, 128, 255), rgb(128, 0, 255))'
                    }}
                    className="submit-button"
                    type="submit"
                    variant="contained"
                    disabled={!verifiedUser}
                  >
                    REGISTER
                  </Button>
                )}
              </form>
              {type == 'userDetails' ? (
                ''
              ) : (
                <Typography
                  variant="body1"
                  style={{
                    color: '#ffffff',
                    marginBottom: '1rem',
                    marginTop: '1rem'
                  }}
                >
                  Already have an account?{' '}
                  <Link
                    href="/login"
                    style={{
                      color: ' rgb(0, 128, 255)',
                      fontWeight: 600,
                      textDecoration: 'none'
                    }}
                  >
                    LOGIN HERE
                  </Link>
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default RegistrationPage;

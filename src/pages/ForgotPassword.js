/* eslint-disable*/

import React, { useState, useRef } from 'react';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { TextField } from '@mui/material';
import LoginComponent from '../components/Authentication/LoginComponent/LoginComponent';
import forgot_pass_1 from '../assets/images/fg_page 3.png';
import { requestNoHeader } from '../axios/AxiosHelper';
import '../components/Authentication/ForgetPassword/css/ForgotPassword.css';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
//
const ForgotPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [isCodeInputDisabled, setIsCodeInputDisabled] = useState(true);
  const [codes, setCodes] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const [otpSent, setOtpSent] = useState(false);
  const [mobileNumberError, setMobileNumberError] = useState('');
  const navigate = useNavigate();
  const handleSendCode = () => {
    if (phoneNumber.trim().length === 10) {
      setIsCodeInputDisabled(false);
      setMobileNumberError('');
      requestNoHeader(
        'POST',
        '/auth/password/forgot-password/' + phoneNumber,
        ''
      )
        .then((response) => {
          setOtpSent(true);
          if (response.status == 'OK') {
            Swal.fire({
              icon: 'success',
              title: 'otp sent successfully',
              showConfirmButton: false,
              timer: 1000
            });
          }
        })

        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'unsuccessful! Try again',
            showConfirmButton: false,
            timer: 1500
          });
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid credentials entered! Try again',
        showConfirmButton: false,
        timer: 1500
      });
      setMobileNumberError('Mobile number must be 10 digits');
    }
  };

  const handleVerifyCode = () => {
    const combinedCode = codes.join('');
    setCode(combinedCode);

    requestNoHeader('POST', '/auth/password/verify-otp', {
      mobileNumber: String(phoneNumber),
      otp: String(combinedCode)
    })
      .then((response) => {
        if (response.status == 'OK') {
          Swal.fire({
            icon: 'success',
            title: 'otp verified successfully',
            showConfirmButton: false,
            timer: 1000
          });
          navigate('/reset-password', {
            state: { phoneNumber: phoneNumber, hashKey: response.message }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'unsuccessful! Try again',
            showConfirmButton: false,
            timer: 1500
          });
          setCodes(['', '', '', '', '', '']);
        }
      })

      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'unsuccessful! Try again',
          showConfirmButton: false,
          timer: 1500
        });
      });
  };

  const handleResendCode = () => {
    handleSendCode();
    // Add your logic for resending the code
  };

  const isPhoneNumberValid = () => {
    // Check if phone number is exactly 10 digits
    return phoneNumber.length === 10;
  };

  const handleCodeChange = (index, event) => {
    const value = event.target.value;
    const newValue = value.length > 1 ? value.charAt(0) : value; // Limit input to one character
    const newCodes = [...codes];
    newCodes[index] = newValue;
    setCodes(newCodes);

    // Focus on the next input box if available
    if (index < 5 && value !== '') {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index, event) => {
    if (event.key === 'Backspace' && index > 0 && codes[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div>
      <div style={{ backgroundColor: 'black', color: 'white' }}>
        <div className="forgot-password-container">
          <div className="content">
            <div className="forgot-password-title">Forgot Password</div>

            <div className="mobile-number-send-code">
              <div className="mobile-number-title">Mobile Number:</div>
              <div className="mobile-number-input-box-wrapper">
                <div className="mobile-number-input-box">
                  <TextField
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      const onlyDigits = e.target.value.replace(/\D/g, '');
                      if (onlyDigits.length <= 10) {
                        setPhoneNumber(onlyDigits);
                      }
                    }}
                    placeholder="Enter your Mobile Number"
                    className="mobile-number-input"
                    inputProps={{
                      pattern: '[0-9]*' // Allow only digits
                    }}
                  />
                </div>
                {/* {mobileNumberError && (
                  <p className="error-message">{mobileNumberError}</p>
                )} */}
                <button
                  onClick={handleSendCode}
                  disabled={!isPhoneNumberValid()}
                  className="send-code-button"
                >
                  Send Code
                </button>
              </div>
            </div>

            <div className="verify-code-wrapper">
              <label>
                {/* <TextField
                  type="tel"
                  value={code}
                  onChange={(e) =>
                    setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  disabled={isCodeInputDisabled}
                  placeholder="Enter Code"
                  className="code-input"
                  inputProps={{
                    maxLength: 6, // Limit input to 6 characters
                    style: { textAlign: "center" }, // Center-align text
                  }}
                /> */}

                <div className="code-input-container">
                  {codes.map((code, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      value={code}
                      onChange={(e) => handleCodeChange(index, e)}
                      onKeyDown={(e) => handleBackspace(index, e)}
                      disabled={isCodeInputDisabled}
                      className="code-input-box"
                      maxLength={1}
                      placeholder="-"
                    />
                  ))}
                </div>
              </label>
              <button
                onClick={handleVerifyCode}
                disabled={isCodeInputDisabled}
                className="verify-code-button"
              >
                Verify Code
              </button>
            </div>
            <div className="password-reset">
              <p>
                <LockOpenIcon /> Password Reset
                <br />
                Didn&apos;t receive code yet?
              </p>
              <button
                onClick={handleResendCode}
                className="resend-code-button small"
              >
                Resend Code
              </button>
            </div>
            <div className="contact-support">
              <p>Still didn&apos;t receive the code?</p>
              <button className="contact-support-button">
                <Link
                  to="/support"
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  Contact Support
                </Link>
              </button>
            </div>
          </div>
          <div className="image">
            <img src={forgot_pass_1} alt="Your description" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

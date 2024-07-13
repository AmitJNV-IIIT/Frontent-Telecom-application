import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  InputLabel,
  Card,
  CardContent,
  Button
} from '@mui/material';
import Swal from 'sweetalert2';
//
// import { BASE_URL } from "../../constants/Constants";

import './css/NewConnection.css';
import { request } from '../../axios/AxiosHelper';
const NewConnection = ({ openConfirmation }) => {
  const name = JSON.parse(window.sessionStorage.getItem('PersonData'));

  const [formData, setFormData] = useState({
    name: name?.name || '',
    mobileNumber: name?.mobileNumber,
    address: '',
    city: name?.address,
    state: name?.state,
    pincode: name?.pinCode,
    country: name?.country
  });

  const [errors, setErrors] = useState({
    name: '',
    mobileNumber: '',
    pincode: '',
    country: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Validate input as user types using regex
    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    let errorMessage = '';

    // Regex patterns for validation
    const namePattern = /^[a-zA-Z\s]+$/; // Alphabetic characters and spaces only
    const mobilePattern = /^[6-9]\d{9}$/; // Mobile number must start with 6-9 and be 10 digits
    const mobilePattern1 = /^[0-9]*$/; // Mobile number must contain only digits
    const pincodePattern = /^\d{6}$/; // 6 digits only
    const countryPattern = /^[a-zA-Z\s]+$/; // Alphabetic characters and spaces only

    switch (name) {
      case 'name':
        errorMessage = namePattern.test(value.trim())
          ? ''
          : 'Please enter a valid name';
        break;
      case 'mobileNumber':
        if (!mobilePattern.test(value.trim())) {
          errorMessage = 'Mobile number must start with 6-9 and be 10 digits';
        }
        if (!mobilePattern1.test(value.trim())) {
          errorMessage += errorMessage ? ' and ' : '';
          errorMessage += 'Mobile number must contain only digits';
        }
        break;
      case 'pincode':
        errorMessage = pincodePattern.test(value.trim())
          ? ''
          : 'Pincode must be 6 digits';
        break;
      case 'country':
        errorMessage = countryPattern.test(value.trim())
          ? ''
          : 'Please enter a valid country name';
        break;
      default:
        break;
    }

    setErrors({
      ...errors,
      [name]: errorMessage
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if any field has validation error
    for (const key in errors) {
      if (errors[key]) {
        alert('Please correct the errors in the form before submitting.');
        return;
      }
    }

    // Perform form submission logic here (e.g., send data to backend)
    try {
      request('POST', '/broadband/connection/new', formData).then(
        (response) => {
          if (response.status === 'CREATED') {
            // Swal.fire({
            //   icon: 'success',
            //   title: 'Created new broadband connection successfully',
            //   showConfirmButton: false,
            //   timer: 1500
            // });
            // navigate('/broadband');
            openConfirmation(true);
          }
        }
      );
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: error.message,
        showConfirmButton: false,
        timer: 1500
      });
    }
    setFormData({
      name: '',
      mobileNumber: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      country: ''
    });
  };

  return (
    <Container maxWidth="sm" className="container">
      <Typography variant="h4" className="customTypography">
        <b>Connection Form</b>
      </Typography>
      <Card sx={{ borderRadius: '15px' }}>
        <CardContent>
          <h1 className="head" style={{ textAlign: 'center' }}>
            <b>New Connection</b>
          </h1>
          <p style={{ paddingLeft: '2%', fontWeight: '700' }}>
            Enter your installation details
          </p>
          <form onSubmit={handleSubmit} style={{ maxWidth: '100%' }}>
            <div
              className="formdiv"
              style={{ marginBottom: '16px' }}
              data-testid="error-container"
            >
              <InputLabel htmlFor="name">Name</InputLabel>
              <TextField
                fullWidth
                className="inputWithShadow"
                id="name"
                name="name"
                value={formData?.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
                error={!!errors?.name}
                disabled
                helperText={errors?.name}
                margin="normal"
                variant="outlined"
                inputProps={{ style: { color: 'blue' } }}
              />
            </div>
            <div className="formdiv" style={{ marginBottom: '10px' }}>
              <InputLabel htmlFor="mobileNumber">Mobile Number</InputLabel>
              <TextField
                fullWidth
                className="inputWithShadow"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                placeholder="Enter your mobile number"
                required
                disabled
                error={!!errors.mobileNumber}
                helperText={
                  errors.mobileNumber && formData.mobileNumber
                    ? errors.mobileNumber
                    : ''
                }
                margin="normal"
                variant="outlined"
                inputProps={{ maxLength: 10, style: { color: 'blue' } }}
              />
            </div>
            <div className="formdiv" style={{ marginBottom: '16px' }}>
              <InputLabel htmlFor="address">Address</InputLabel>
              <TextField
                fullWidth
                className="inputWithShadow"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
                required
                margin="normal"
                variant="outlined"
                inputProps={{ style: { color: 'blue' } }}
              />
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '10px'
              }}
              className="formdiv"
            >
              <div
                style={{ flex: '1', marginBottom: '8px', marginRight: '8px' }}
              >
                <InputLabel htmlFor="city">City</InputLabel>
                <TextField
                  fullWidth
                  className="inputWithShadow"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  required
                  margin="normal"
                  variant="outlined"
                  disabled
                  inputProps={{ style: { color: 'blue' } }}
                />
              </div>
              <div
                style={{ flex: '1', marginBottom: '8px', marginRight: '8px' }}
              >
                <InputLabel htmlFor="state">State</InputLabel>
                <TextField
                  fullWidth
                  className="inputWithShadow"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="State"
                  required
                  margin="normal"
                  variant="outlined"
                  disabled
                  inputProps={{ style: { color: 'blue' } }}
                />
              </div>
              <div
                style={{ flex: '1', marginBottom: '8px', marginRight: '8px' }}
              >
                <InputLabel htmlFor="pincode">Pincode</InputLabel>
                <TextField
                  fullWidth
                  className="inputWithShadow"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="Pincode"
                  required
                  error={!!errors.pincode}
                  helperText={errors.pincode}
                  margin="normal"
                  variant="outlined"
                  disabled
                  inputProps={{ maxLength: 6, style: { color: 'blue' } }}
                />
              </div>
              <div style={{ flex: '1', marginBottom: '8px' }}>
                <InputLabel htmlFor="country">Country</InputLabel>
                <TextField
                  fullWidth
                  className="inputWithShadow"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Country"
                  required
                  error={!!errors.country}
                  helperText={errors.country}
                  margin="normal"
                  variant="outlined"
                  disabled
                  inputProps={{ style: { color: 'blue' } }}
                />
              </div>
            </div>
            <div className="customButton">
              <Button
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                  width: '100px',
                  height: '50px'
                }}
              >
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default NewConnection;

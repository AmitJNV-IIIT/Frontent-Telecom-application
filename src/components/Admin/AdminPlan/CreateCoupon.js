/*eslint-disable*/
import React, { useState } from 'react';
import {
  Dialog,
  TextField,
  Button,
  Typography,
  Box,
  Grid
} from '@mui/material';
import { request } from '../../../axios/AxiosHelper';
import Swal from 'sweetalert2';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
//
function CreateCoupon({ open, handleClose }) {
  const [formData, setFormData] = useState({
    data: '',
    expire: '',
    image: '',
    description: '',
    limit: '',
    type: 'Internal',
    couponCode: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };
  const handleDateChange = (date) => {
    if (date) {
      var dates = new Date(date);
      var unixTimestamp = dates.getTime();

      setFormData({ ...formData, expire: unixTimestamp });
    } else {
      setFormData({ ...formData, expire: null }); // Clear expire if no date is selected
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createCoupon(formData);
    setFormData({ data: '', expire: '' });
    handleClose(); // Close the dialog after submission
  };

  function createCoupon(formData) {
    try {
      request('POST', '/mobile/coupons', formData).then((response) => {
        if (response.status == 'CREATED') {
          Swal.fire({
            icon: 'success',
            title: 'Coupon created successfully',
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Broadband Plan updated successfuly',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  return (
    <Dialog
      sx={{ backdropFilter: 'blur(4px)' }}
      open={open}
      onClose={handleClose}
    >
      <Box sx={{ p: 2, width: 300 }}>
        <Typography
          align="center"
          variant="h5"
          gutterBottom
          data-testid="create-coupon-typography"
        >
          <Typography
            align="center"
            variant="h5"
            gutterBottom
            data-testid="create-coupon-typography"
          >
            Create Coupon
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle1" align="left">
                  Data
                </Typography>
                <TextField
                  data-testid="data-field"
                  variant="outlined"
                  name="data"
                  value={formData.data}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" align="left">
                  Expiry Date
                </Typography>
                {/* <TextField
                  data-testid="expiry-field"
                  variant="outlined"
                  name="expire"
                  value={formData.expire}
                  onChange={handleInputChange}
                  fullWidth
                /> */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={formData.expire ? new Date(formData.expire) : null} // Convert Unix timestamp to JS Date for selection
                    onChange={handleDateChange}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle1" align="left">
                  Limit
                </Typography>
                <TextField
                  data-testid="limit-field"
                  variant="outlined"
                  name="limit"
                  value={formData.limit}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" align="left">
                  Coupon Code
                </Typography>
                <TextField
                  data-testid="coupon-field"
                  variant="outlined"
                  name="couponCode"
                  value={formData.couponCode}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" align="left">
                  Description
                </Typography>
                <TextField
                  data-testid="coupon-field"
                  variant="outlined"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ backgroundColor: 'black' }}
              data-testid="create-coupon-btn"
            >
              Create Coupon
            </Button>
          </Box>
        </Typography>
      </Box>
    </Dialog>
  );
}

export default CreateCoupon;

/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  InputAdornment
} from '@mui/material';
import './css/AddPlan.css';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import AddCoupon from './AddCoupon';
import { request } from '../../../axios/AxiosHelper';
import Swal from 'sweetalert2';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
//
const AdminAddEditPlan = ({
  planDetails,
  handleAddPlan,
  handleEditPlan,
  addEditFlag,
  setAddEditFlag,
  adminPlanType,
  planCoupon
}) => {
  const [open, setOpen] = useState(false);
  const [hotstarChecked, setHotstarChecked] = useState(false);
  const [spotifyChecked, setSpotifyChecked] = useState(false);
  const [netflixChecked, setNetflixChecked] = useState(false);
  const [amazonChecked, setAmazonChecked] = useState(false);
  const [selectedCoupon, setselectedCoupon] = useState(null);
  const [formReset, setFormReset] = useState(false);

  function fetchDate(timestamp) {
    const date = new Date(parseInt(timestamp));
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

    return formattedDate;
  }

  const setOtt = () => {
    if (addEditFlag) {
      setFormReset(false);
      if (planDetails && planDetails.ott) {
        setSpotifyChecked(planDetails.ott.includes('spotify'));
        setHotstarChecked(planDetails.ott.includes('disney'));
        setNetflixChecked(planDetails.ott.includes('netflix'));
        setAmazonChecked(planDetails.ott.includes('prime'));
      }
    }
  };
  const handleCouponSubmit = (upcomingCoupon) => {
    setselectedCoupon(upcomingCoupon);
  };
  const [formData, setFormData] = useState({
    planId: '',
    planType: '',
    price: '',
    category: '',
    validity: '',
    ott: [],
    voiceLimit: '',
    sms: '',
    data: '',
    couponIds: [],
    limit: '',
    speed: '',
    active: 'True'
  });

  const [category, setCategory] = useState(formData.category || '');
  const options = ['28', '56', '84', '180', '365'];
  const dataOptions = ['2', '4', '6', '8', 'Unlimited'];
  const sms = ['100', '1000'];
  const voiceLimitOptions = [
    { value: '', label: 'None' }, // Option for "None"
    { value: 'Unlimited', label: 'Unlimited' } // Option for "Unlimited"
  ];

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setFormData({ ...formData, category: event.target.value });
  };

  const handleDataChange = (event) => {
    setFormData({ ...formData, data: event.target.value });
  };

  const handleVoiceLimitChange = (event) => {
    setFormData({ ...formData, voiceLimit: event.target.value });
  };

  const handleValidityChange = (event) => {
    setFormData({ ...formData, validity: String(event.target.value) });
  };
  const handleSMSChange = (event) => {
    setFormData({ ...formData, sms: String(event.target.value) });
  };

  const categoryOptions = ['Unlimited', 'Topup', 'Data', 'Special', 'Other'];

  const getOTTImage = (ottName) => {
    const modifiedName =
      ottName === 'None'
        ? 'spotify'
        : ottName.replace(/\s+/g, '-').toLowerCase();
    let image;
    try {
      image = `https://excitel-bucket.s3.amazonaws.com/${modifiedName}.png`;
    } catch (error) {
      // image = require(`../../assets/images/placeholder.png`).default;
    }
    return image;
  };

  const handleCheckboxChange = (event) => {
    if (event.target.name === 'spotify') {
      setSpotifyChecked(event.target.checked);
    } else if (event.target.name === 'disney') {
      setHotstarChecked(event.target.checked);
    } else if (event.target.name === 'netflix') {
      setNetflixChecked(event.target.checked);
    } else if (event.target.name === 'prime') {
      setAmazonChecked(event.target.checked);
    }
  };

  function editBroadbandPlan(plan) {
    try {
      request('PUT', `/broadband/${plan.planId}`, plan).then((response) => {
        if (response.status === 'CREATED') {
          Swal.fire({
            icon: 'success',
            title: 'Broadband Plan updated successfuly',
            showConfirmButton: false,
            timer: 1500
          });
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
  }

  function addBroadbandPlan(plan) {
    try {
      request('POST', `/broadband`, plan).then((response) => {
        if (response.status === 'CREATED') {
          Swal.fire({
            icon: 'success',
            title: 'New Broadband Plan Added successfuly',
            showConfirmButton: false,
            timer: 1500
          });
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
  }

  function addPrepaidPlan(plan) {
    try {
      request('POST', `/mobile`, plan).then((response) => {
        if (response.status === 'CREATED') {
          Swal.fire({
            icon: 'success',
            title: 'New Prepaid Plan Added successfuly',
            showConfirmButton: false,
            timer: 1500
          });
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
  }

  function editPrepaidPlan(plan) {
    try {
      request('PUT', `/mobile/${plan.planId}`, plan).then((response) => {
        if (response.status === 'CREATED') {
          Swal.fire({
            icon: 'success',
            title: 'Prepaid Plan updated successfuly',
            showConfirmButton: false,
            timer: 1500
          });
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
  }

  function addPostpaidPlan(plan) {
    try {
      request('POST', `/mobile`, plan).then((response) => {
        if (response.status === 'CREATED') {
          Swal.fire({
            icon: 'success',
            title: 'New Postpaid Plan Added successfuly',
            showConfirmButton: false,
            timer: 1500
          });
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
  }

  function editPostpaidPlan(plan) {
    try {
      request('PUT', `/mobile/${plan.planId}`, plan).then((response) => {
        if (response.status === 'CREATED') {
          Swal.fire({
            icon: 'success',
            title: 'Postpaid Plan updated successfuly',
            showConfirmButton: false,
            timer: 1500
          });
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
  }

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (addEditFlag == true) {
      setselectedCoupon(planCoupon);
      setFormData(planDetails);
      setOtt();
    }
  }, [planDetails, addEditFlag]);

  const handleChange = (event) => {
    // const { name, value, checked } = event.target;
    // setFormData((prevState) => (
    //   {
    //   ...prevState,
    //   [name]: value,
    // }));

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = () => {
    let newArr = [];
    if (spotifyChecked) {
      newArr.push('spotify');
    }
    if (hotstarChecked) {
      newArr.push('disney');
    }
    if (netflixChecked) {
      newArr.push('netflix');
    }
    if (amazonChecked) {
      newArr.push('prime');
    }

    formData.ott = newArr;

    formData.planType =
      adminPlanType.charAt(0).toUpperCase() + adminPlanType.slice(1);

    let newCouponIds = [];
    newCouponIds[0] = selectedCoupon.couponId;
    formData.couponIds = newCouponIds;

    let planActive = 'True';
    formData.active = planActive;

    if (addEditFlag) {
      setFormReset(false);
      if (adminPlanType === 'Broadband') {
        editBroadbandPlan(formData);
        handleEditPlan(formData);
      } else if (adminPlanType === 'Prepaid') {
        editPrepaidPlan(formData);
        handleEditPlan(formData);
      } else if (adminPlanType === 'Postpaid') {
        editPostpaidPlan(formData);
        handleEditPlan(formData);
      }
      setAddEditFlag(false);
    } else if (!addEditFlag) {
      if (adminPlanType === 'Broadband') {
        addBroadbandPlan(formData);
        handleAddPlan(formData);
      } else if (adminPlanType === 'Prepaid') {
        addPrepaidPlan(formData);
        handleAddPlan(formData);
      } else if (adminPlanType === 'Postpaid') {
        addPostpaidPlan(formData);
        handleAddPlan(formData);
      }
    }

    setAmazonChecked(false);
    setSpotifyChecked(false);
    setHotstarChecked(false);
    setNetflixChecked(false);
    setselectedCoupon(null);

    setFormData({
      planId: '',
      planType: '',
      price: '',
      category: '',
      validity: '',
      ott: [],
      voiceLimit: '',
      sms: '',
      data: '',
      couponIds: [],
      limit: '',
      speed: '',
      active: 'false'
    });
  };

  const handleAddCoupon = () => {
    setOpen(true);
  };
  const refresh = () => {
    setFormReset(true);
    setAddEditFlag(false);
    setFormData({
      planId: '',
      planType: '',
      price: '',
      category: '',
      validity: '',
      ott: [],
      voiceLimit: '',
      sms: '',
      data: '',
      couponIds: [],
      limit: '',
      speed: '',
      active: 'false'
    });
    if (addEditFlag) {
      setAddEditFlag(false);
    }
    setAmazonChecked(false);
    setHotstarChecked(false);
    setNetflixChecked(false);
    setSpotifyChecked(false);
    setselectedCoupon(null);
  };

  return (
    <div>
      <Card
        className="plan-form-card"
        sx={{
          // width: '340px',
          // marginTop: '1rem',
          paddingTop: '1rem',
          borderRadius: '15px'
        }}
      >
        <CardContent>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              justifyContent: 'space-between',
              alignItems: 'baseline'
            }}
          >
            {addEditFlag == false ? (
              <h2 className="planHeading">Add Plan</h2>
            ) : (
              <h2 className="planHeading">Edit Plan</h2>
            )}
            <RestartAltIcon onClick={refresh} style={{ cursor: 'pointer' }} />
          </div>

          <div className="form-inputs">
            <div className="input-row">
              <TextField
                label="Price"
                name="price"
                data-testid="price"
                value={formData.price}
                onChange={handleChange}
                size="small"
                sx={{ width: '15rem' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography variant="body2" style={{ color: 'gray' }}>
                        ₹
                      </Typography>
                    </InputAdornment>
                  )
                }}
              />

              {/* <TextField
                label="Validity"
                name="validity"
                value={formData?.validity}
                onChange={handleChange}
                size="small"
                sx={{ width: '15rem' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography variant="body2" style={{ color: 'gray' }}>
                        Days
                      </Typography>
                    </InputAdornment>
                  )
                }}
              /> */}
              <FormControl
                variant="outlined"
                size="small"
                sx={{ width: '15rem' }}
              >
                <InputLabel htmlFor="validity">Validity</InputLabel>
                <Select
                  value={formData.validity}
                  onChange={handleValidityChange}
                  label="Validity"
                  id="validity"
                  data-testid="validity"
                >
                  {options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option} Days
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="input-row">
              <FormControl size="small" sx={{ width: '15rem' }}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  data-testid="category"
                  name="category"
                  value={formData.category}
                  onChange={handleCategoryChange}
                  label="Category"
                >
                  {categoryOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* <TextField
                label="Data"
                name="data"
                value={formData.data}
                onChange={handleChange}
                size="small"
                sx={{ width: '15rem' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography variant="body2" style={{ color: 'gray' }}>
                        GB
                      </Typography>
                    </InputAdornment>
                  )
                }}
              /> */}
              <FormControl
                variant="outlined"
                size="small"
                sx={{ width: '15rem' }}
              >
                <InputLabel htmlFor="data">Data</InputLabel>
                <Select
                  value={formData.data}
                  onChange={handleDataChange}
                  label="Data"
                  id="data"
                  data-testid="data"
                >
                  {dataOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option} GB
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="input-row">
              {/* {adminPlanType != 'Broadband' && (
                <TextField
                  label="SMS"
                  name="sms"
                  value={formData.sms}
                  onChange={handleChange}
                  size="small"
                  sx={{ width: '15rem' }}
                />
              )} */}
              <FormControl
                variant="outlined"
                size="small"
                sx={{ width: '15rem' }}
              >
                <InputLabel htmlFor="SMS">SMS</InputLabel>
                <Select
                  value={formData.sms}
                  onChange={handleSMSChange}
                  label="SMS"
                  id="SMS"
                  data-testid="SMS"
                >
                  {sms.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* <TextField
                label="Voice Limit"
                name="voiceLimit"
                value={formData.voiceLimit}
                onChange={handleChange}
                size="small"
                sx={{ width: '15rem' }}
              /> */}

              <FormControl
                variant="outlined"
                size="small"
                sx={{ width: '15rem' }}
              >
                <InputLabel htmlFor="voiceLimit">Voice Limit</InputLabel>
                <Select
                  value={formData.voiceLimit}
                  onChange={handleVoiceLimitChange}
                  label="Voice Limit"
                  id="voiceLimit"
                  data-testid="voice-limit"
                >
                  {voiceLimitOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {adminPlanType === 'Broadband' && (
                <TextField
                  label="speed"
                  name="speed"
                  value={formData.speed}
                  onChange={handleChange}
                  size="small"
                  sx={{ width: '15rem' }}
                />
              )}
            </div>

            <div className="input-row">
              <FormControl sx={{ width: '16rem' }} size="small">
                <InputLabel id="demo-select-small-label">Limit</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  data-testid="limit"
                  name="limit"
                  value={formData.limit}
                  label="Limit"
                  onChange={handleChange}
                >
                  <MenuItem value="Daily">Daily</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleAddCoupon}
                size="small"
                sx={{ width: '15rem' }}
                data-testid="add-coupon-button"
              >
                Add Coupon
              </Button>
              {/* ) : ( */}

              {/* )} */}
              <AddCoupon
                open={open}
                handleCouponSubmit={handleCouponSubmit}
                handleClose={handleClose}
                selectedCoupon={selectedCoupon}
                formReset={formReset}
              />
            </div>

            {selectedCoupon?.data && (
              <div className="selected-coupon-container">
                <h4>Selected Coupon</h4>

                <div className="admin-coupon-selected">
                  <p> {selectedCoupon?.data} GB</p>
                  <p>Expires On: {fetchDate(selectedCoupon?.expire)}</p>
                </div>
              </div>
            )}
          </div>
          <div style={{ display: 'flex' }}>
            <div className="logo-section">
              <div className="boxAlign">
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        data-testid="prime"
                        name="prime"
                        checked={amazonChecked}
                        onChange={handleCheckboxChange}
                        sx={{
                          padding: '0px',
                          marginBottom: '2rem',
                          marginLeft: '2rem'
                        }}
                      />
                    }
                  />
                </div>
                <img
                  src={getOTTImage('prime')}
                  alt="prime"
                  className="stacked-image-logo"
                />
              </div>
              <div className="boxAlign">
                <FormControlLabel
                  control={
                    <Checkbox
                      data-testid="netflix"
                      name="netflix"
                      checked={netflixChecked}
                      onChange={handleCheckboxChange}
                      sx={{
                        padding: '0px',
                        marginBottom: '2rem',
                        marginLeft: '2rem'
                      }}
                    />
                  }
                />
                <img
                  src={getOTTImage('netflix')}
                  alt="netflix"
                  className="stacked-image-logo"
                />
              </div>
              <div className="boxAlign">
                <FormControlLabel
                  control={
                    <Checkbox
                      data-testid="spotify"
                      name="spotify"
                      checked={spotifyChecked}
                      onChange={handleCheckboxChange}
                      sx={{
                        padding: '0px',
                        marginBottom: '2rem',
                        marginLeft: '2rem'
                      }}
                    />
                  }
                />
                <img
                  src={getOTTImage('spotify')}
                  alt="Spotify"
                  className="stacked-image-logo"
                />
              </div>
              <div className="boxAlign">
                <FormControlLabel
                  control={
                    <Checkbox
                      data-testid="disney"
                      name="disney"
                      checked={hotstarChecked}
                      onChange={handleCheckboxChange}
                      sx={{
                        padding: '0px',
                        marginBottom: '2rem',
                        marginLeft: '2rem'
                      }}
                    />
                  }
                />
                <img
                  src={getOTTImage('disney')}
                  alt="Disney"
                  className="stacked-image-logo"
                />
              </div>
            </div>
          </div>
          <div className="add-edit-btn-container">
            <button
              onClick={handleSubmit}
              className="add-edit-submit-button"
              data-testid="submit-button"
            >
              {addEditFlag == false ? 'ADD' : 'UPDATE'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default AdminAddEditPlan;

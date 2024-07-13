import React, { useEffect, useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import './css/AddCoupon.css'; // Import the CSS file
import { Dialog, TextField } from '@mui/material';
import { request } from '../../../axios/AxiosHelper';
import Swal from 'sweetalert2';
//
const AddCoupon = ({
  open,
  handleClose,
  handleCouponSubmit,
  selectedCoupon,
  formReset
}) => {
  const [Coupon, setCoupon] = useState({});
  const [Coupons, setCoupons] = useState([]);
  const [selectedCouponId, setSelectedCouponId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  function fetchDate(timestamp) {
    const date = new Date(parseInt(timestamp));
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    return formattedDate;
  }

  useEffect(() => {
    const fetchAllCoupons = async () => {
      try {
        const response = await request('GET', '/mobile/coupons');

        setCoupons(response.coupons);
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: err.message,
          timer: 1000
        });
      }
    };
    fetchAllCoupons();
  }, [open]);

  useEffect(() => {
    if (formReset) {
      setCoupon({});
      setSelectedCouponId('');
    }
    if (selectedCoupon) {
      setCoupon(selectedCoupon);
      setSelectedCouponId(selectedCoupon.couponId);
    }
  }, [selectedCoupon]);

  const handleCouponSelect = (coupon) => {
    setSelectedCouponId(coupon.couponId);
    setCoupon(coupon);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCoupons = Coupons.filter((coupon) =>
    coupon.data.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCoupon = () => {
    // Add coupon logic here

    handleCouponSubmit(Coupon);

    handleClose();
  };

  // const handleSearch = () => {
  //   // Handle search action
  // };
  // function convertTimestampToDays(timestamp) {
  //   // Convert to milliseconds and
  //   // then create a new Date object

  //   const date = new Date(timestamp);
  //   const year = date.getFullYear();
  //   const month = date.getMonth() + 1;
  //   const day = date.getDate();
  //   // const hours = date.getHours();
  //   // const minutes = date.getMinutes();
  //   // const seconds = date.getSeconds();

  //   const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${
  //     day < 10 ? '0' : ''
  //   }${day}`;

  //   return formattedDate;
  // }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      sx={{ margin: '-18rem' }}
    >
      <div
        className="add-coupon-container addCouponDialog"
        style={{ overflowY: 'hidden' }}
      >
        <div className="coupon-card">
          <h2 className="add-coupon-heading">ADD COUPON</h2>
          <h3 className="subheading">Search by data</h3>
          <TextField
            placeholder="Search coupons"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
            InputProps={{
              endAdornment: (
                <SearchIcon
                  style={{ color: 'black', cursor: 'pointer' }}
                  onClick={handleSearchChange}
                />
              )
            }}
          />
          <div style={{ overflowY: 'scroll', height: '20rem', width: '50%' }}>
            {filteredCoupons.map((coupon) => (
              <div
                key={coupon.couponId}
                className={`admin-coupon ${
                  selectedCouponId === coupon.couponId
                    ? 'admin-coupon-selected'
                    : ''
                }`}
                onClick={() => handleCouponSelect(coupon)}
              >
                <p>
                  {coupon.data + ' '}
                  GB
                </p>
                <p>Expire on :{' ' + fetchDate(coupon.expire)}</p>
              </div>
            ))}
          </div>
          <div>
            <button
              onClick={handleAddCoupon}
              data-testid="add-btn"
              className="add-btn"
            >
              Add Coupon
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AddCoupon;

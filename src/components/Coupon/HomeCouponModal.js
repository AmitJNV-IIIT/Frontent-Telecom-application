import React, { useEffect, useState } from 'react';
import './css/HomeCouponModal.css'; // Import your CSS file for styling

import { Dialog, Button, Box } from '@mui/material';
import { request } from '../../axios/AxiosHelper';
import Spinner from '../Common/Spinner/Spinner';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const HomeCouponModal = ({ setCouponsDetailsVisibility, type }) => {
  const handleClose = () => {
    setCouponsDetailsVisibility(false);
  };
  const navigate = useNavigate();
  const [couponArray, setCouponArray] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const PersonData = JSON.parse(window.sessionStorage.getItem('PersonData'));
  useEffect(() => {
    setSpinning(true);
    request('GET', '/subscriptions/coupons')
      .then((response) => {
        if (response.coupons) {
          const filteredCoupons = response.coupons.filter(
            (coupon) => coupon.couponStatus !== 'Availed'
          );

          setCouponArray(filteredCoupons);
        } else {
          setCouponArray([]);
        }
      })
      .catch((error) => {
        console.error('ERROR', error);
      });
    setSpinning(false);
  }, []);

  const handleCouponSelect = (coupon) => {
    setSelectedCoupon((prevCoupon) => (prevCoupon === coupon ? null : coupon));
  };

  const applyCoupon = () => {
    const couponBody = {
      planType:
        PersonData.simType.split()[0][0].toUpperCase() +
        PersonData.simType.slice(1),
      couponId: selectedCoupon.coupon.couponId,
      couponData: selectedCoupon.coupon.data
    };

    request('POST', '/subscriptions/coupons', couponBody)
      .then((response) => {
        if (response) {
          Swal.fire({
            icon: 'success',
            title: 'Coupon added successfuly',
            showConfirmButton: false,
            timer: 1500
          });

          navigate('/');
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: error.message,
          timer: 1000
        });
      });
    handleClose();
  };

  return (
    <Dialog
      style={{ backdropFilter: 'blur(4px)' }}
      open={true}
      onClose={handleClose}
      data-testid="close-button"
    >
      <h3 style={{ textAlign: 'center', minWidth: '30vw', padding: '10px' }}>
        Available Coupons
      </h3>
      {spinning == true ? (
        <Spinner />
      ) : couponArray.length === 0 ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: '3vh'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingBottom: '3vh'
            }}
          >
            No Coupons Found!!
          </div>
        </div>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            padding: '1vw'
          }}
        >
          {couponArray.map((coupon, index) => {
            return (
              <div
                key={index}
                className={`apply-coupon-modal ${selectedCoupon === coupon ? 'selected' : ''}`}
                onClick={() => handleCouponSelect(coupon)}
              >
                {selectedCoupon === coupon && (
                  <div style={{ textAlign: 'end' }} className="tick-icon">
                    &#10003;
                  </div>
                )}

                <p className="coupon-data">{coupon?.coupon?.data} GB Data</p>
              </div>
            );
          })}
        </Box>
      )}

      {type == 'viewCoupon' || couponArray.length === 0 ? (
        ''
      ) : (
        <Box sx={{ mt: 2, mb: 3, textAlign: 'center' }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: 'black' }}
            onClick={applyCoupon} // Close the modal when Apply Coupon button is clicked
            data-testid="close-button" // Add data-testid attribute here
          >
            Apply Coupon
          </Button>
        </Box>
      )}
    </Dialog>
  );
};

export default HomeCouponModal;

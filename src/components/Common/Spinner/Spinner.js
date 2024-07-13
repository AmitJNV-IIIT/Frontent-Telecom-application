import React from 'react';
import './css/Spinner.css';

const Spinner = ({ type }) => {
  return (
    <div
      className={
        type == 'CouponSpinner' ? 'spinner-main-coupon' : 'spinner-main'
      }
    >
      <div className="spinner" data-testid="default-spinner"></div>
      <p
        className={
          type == 'CouponSpinner'
            ? 'spinner-text-coupon'
            : 'spinner-text text-bgDark text-lg font-semibold'
        }
        data-testid="coupon-spinner"
      >
        Loading....
      </p>
    </div>
  );
};

export default Spinner;

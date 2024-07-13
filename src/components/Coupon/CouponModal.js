import React, { useState, useEffect } from 'react'; // Import useState from React
import PropTypes from 'prop-types';
import { SlClose } from 'react-icons/sl';
import './css/CouponModal.css';
import { request } from '../../axios/AxiosHelper';
import Spinner from '../Common/Spinner/Spinner';
import Swal from 'sweetalert2';
//
const CouponModal = ({ setCouponsDetailsVisibility, clickedPlan }) => {
  const [coupons, setCouponDetails] = useState({
    data: '',
    expire: '',
    type: '',
    limit: '',
    couponCode: '',
    url: ''
  });

  const onClose = () => {
    setCouponsDetailsVisibility(false);
  };
  // const couponId = "5c5b7a24-cfe1-41c5-a052-84d55cd88dc8";
  const getCouponDetailByCouponID = () => {
    if (
      clickedPlan &&
      clickedPlan.couponIds &&
      clickedPlan.couponIds.length > 0
    ) {
      request('GET', `/mobile/coupon/${clickedPlan.couponIds[0]}`)
        .then((response) => {
          if (response) {
            setCouponDetails(response.coupons);
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
    }
  };
  useEffect(() => {
    getCouponDetailByCouponID();
  }, []);
  return (
    <div className="coupon-modal-main">
      <div className="coupon-modal background">
        <div className="coupon-details-modal">
          <div className="coupon-modal-close" onClick={onClose}>
            <SlClose />
          </div>
          <p className="coupon-modal-title">Coupon Details</p>
          <div className="coupon-details-container">
            <table className="coupon-details-table">
              {coupons?.data == '' ? (
                <Spinner
                  type={'CouponSpinner'}
                  style={{ color: 'black', height: 'auto !important' }}
                />
              ) : (
                <tbody>
                  <tr>
                    <td className="coupon-table-desc">Data</td>
                    <td className="coupon-table-data">{coupons.data} GB</td>
                  </tr>
                  <tr>
                    <td className="coupon-table-desc">Expire</td>
                    <td className="coupon-table-data">{coupons.expire}</td>
                  </tr>
                  <tr>
                    <td className="coupon-table-desc">Type</td>
                    <td className="coupon-table-data">{coupons.type}</td>
                  </tr>
                  <tr>
                    <td className="coupon-table-desc">Limit</td>
                    <td className="coupon-table-data">{coupons.limit}</td>
                  </tr>
                  <tr>
                    <td className="coupon-table-desc">Coupon Code</td>
                    <td className="coupon-table-data">{coupons.couponCode}</td>
                  </tr>
                  <tr>
                    <td className="coupon-table-desc">Url</td>
                    <td className="coupon-table-data">{coupons.url}</td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

CouponModal.propTypes = {
  setCouponsDetailsVisibility: PropTypes.func.isRequired,
  clickedPlan: PropTypes.shape({
    couponIds: PropTypes.arrayOf(PropTypes.string.isRequired)
  })
};

export default CouponModal;

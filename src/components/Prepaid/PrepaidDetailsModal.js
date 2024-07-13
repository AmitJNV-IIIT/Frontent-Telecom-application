/* eslint-disable */
import '../Common/RechargeCard/css/Recharge.css';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { SlClose } from 'react-icons/sl';
import './css/PrepaidRechargeModal.css';
import Confirmation from '../Confirmation/ConfirmationModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { request } from '../../axios/AxiosHelper';

const PrepaidDetailsModal = ({
  type,
  setDetailsCardVisibility,
  plan,
  getOTTImage,
  isLogin
}) => {
  const role = window.sessionStorage.getItem('ROLE');
  const personDataString = window.sessionStorage.getItem('PersonData');
  const PersonData = personDataString ? JSON.parse(personDataString) : null;
  const history = useNavigate();

  const [cData, setcData] = useState(0);

  const navigate = useNavigate();
  const crossClickHandler = () => {
    setDetailsCardVisibility(false);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const saveRecharge = () => {
    const subscription = { plan, purchasedOn: null, status: null };

    const planId = subscription.plan.planId;
    const price = subscription.plan.price;
    const dataRemaining = subscription.plan?.data;
    const planType = subscription.plan.planType;

    let couponId;

    if (
      PersonData.simType.toLowerCase() == 'prepaid' &&
      plan.planType.toLowerCase() == 'postpaid'
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops You are Prepaid type',
        showConfirmButton: false,
        timer: 1500
      });
    } else if (
      PersonData.simType.toLowerCase() == 'postpaid' &&
      plan.planType.toLowerCase() == 'prepaid'
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops You are Prepaid type',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      if (plan.planType === 'Prepaid' || plan.planType === 'Postpaid')
        couponId =
          // subscription.plan.couponIds.length > 0 &&
          // subscription.plan.couponIds[0] !== ""
          subscription.plan.couponIds && subscription.plan.couponIds.length > 0
            ? subscription.plan.couponIds[0]
            : null;

      try {
        request('POST', '/subscriptions', {
          planId: String(planId),
          mobileNumber: String(PersonData?.mobileNumber),
          price: String(price),
          couponId: String(couponId),
          dataRemaining: String(dataRemaining),
          planType: String(planType)
        }).then((response) => {
          if (response.status === 'OK') {
            Swal.fire({
              icon: 'success',
              title: 'Recharge Successful!',
              showConfirmButton: false,
              timer: 2000
            });
            window.scrollTo(0, 0);
            navigate('/subscription');
          }
        });
      } catch (e) {
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong',
          showConfirmButton: false,
          timer: 2000
        });
      }
    }
  };
  const openModal = () => {
    if (role !== null && role !== undefined && role !== '') {
      if (PersonData.simType.toLowerCase() === 'postpaid') {
        Swal.fire({
          icon: 'error',
          title: 'Oops You are Postpaid type',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        setIsModalOpen(true);
      }
      // setDetailsCardVisibility(false);
      // Close the details modal
    } else {
      // window.sessionStorage.setItem('Route')
      navigate('/login', {
        state: { from: '/prepaid', isModalOpen: true, data: plan }
      });
      // navigate('/login');
    }
  };

  const couponId =
    plan.couponIds.length === 0 ? 'No Coupon' : plan.couponIds[0];
  const fetchCouponData = () => {
    try {
      request('GET', `/mobile/coupon/data/${couponId}`).then((response) => {
        if (response.status === 'OK') {
          setcData(response.couponData);
        }
      });
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: e.message,
        timer: 1000
      });
    }
  };

  useEffect(() => {
    fetchCouponData();
  }, []);

  return (
    <div className="prepaid-recharge-modal-main">
      <div className="prepaid-modal background">
        <div className="prepaid-details-card">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row-reverse',
              width: '100%'
            }}
          >
            <div className="prepaid-modal-cross" onClick={crossClickHandler}>
              {/* Adding data-testid attribute to the close button */}
              <SlClose data-testid="close-button" />
            </div>

            <div className="prepaid-modal-price">
              <p className="ott-subs-plans">OTT Subscriptions included</p>
              <p className="prepaid-plan-price">₹{plan.price}</p>
            </div>
          </div>

          <div className="prepaid-card-details-div">
            <p className="prepaid-plan-details">Details</p>
            <div>
              <table className="prepaid-plan-table">
                <tbody>
                  <tr>
                    <td className="prepaid-table-desc">Pack validity</td>
                    <td className="prepaid-table-desc">{plan.validity} Days</td>
                  </tr>
                  <tr>
                    <td className="prepaid-table-desc">Total data</td>
                    <td className="prepaid-table-desc">
                      {plan && plan?.data == 'Unlimited'
                        ? 'Unlimited'
                        : plan?.data * plan?.validity + ' GB'}
                    </td>
                  </tr>
                  <tr>
                    <td className="prepaid-table-desc">Data at high speed*</td>
                    <td className="prepaid-table-desc">
                      {plan?.data == 'Unlimited'
                        ? 'Unlimited'
                        : plan?.data + ' GB'}
                    </td>
                  </tr>
                  <tr>
                    <td className="prepaid-table-desc">Category</td>
                    <td className="prepaid-table-desc">{plan.category}</td>
                  </tr>
                  <tr>
                    <td className="prepaid-table-desc">Voice</td>
                    <td className="prepaid-table-desc">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="prepaid-table-desc">SMS</td>
                    <td className="prepaid-table-desc">100 SMS/Day</td>
                  </tr>
                  {plan.planType === 'Prepaid' ? (
                    <tr>
                      <td className="prepaid-table-desc">Coupon Data</td>
                      <td className="prepaid-table-desc">{cData} GB</td>
                    </tr>
                  ) : (
                    ''
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="prepaid-modal-subscriptions">Subscriptions :</div>
          <div className="prepaid-stacked-image-wrapper">
            <div className="prepaid-stacked-images">
              {/* Iterate over the ott array for each plan and display the images */}

              {plan.ott.map((ottPlatform, index) => (
                <img
                  key={index} // Use a unique key for each image
                  src={getOTTImage(ottPlatform)}
                  alt={ottPlatform}
                  className="ott-img"
                  width={30}
                  height={30}
                />
              ))}
            </div>
          </div>

          <div className="prepaid-modal-notes" style={{ margin: '5px' }}>
            <p style={{ margin: '0px' }}>*Post which unlimited @ 64 Kbps</p>
            <p style={{ margin: '0px' }}>
              *Unlimited 5G data for eligible subscribers
            </p>
          </div>

          <div>
            {type == 'PostpaidRecharge' ? (
              <button className="prepaid-recharge-btn" onClick={saveRecharge}>
                Subscribe plan
              </button>
            ) : (
              <button className="prepaid-recharge-btn" onClick={openModal}>
                Recharge
              </button>
            )}
          </div>

          {isModalOpen && (
            <div className="confirmation-modal-size">
              <Confirmation
                cData={cData}
                setDetailsCardVisibility={setDetailsCardVisibility}
                isOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                plan={plan}
                category={'Modal'}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// PrepaidDetailsModal.propTypes = {
//   setDetailsCardVisibility: PropTypes.func.isRequired,
//   dataa: PropTypes.object.isRequired,
// };

export default PrepaidDetailsModal;

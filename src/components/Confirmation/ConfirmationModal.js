/*eslint-disable*/
import React from 'react';
import './css/Confirmation.css';
import cartIcon from '../../assets/icons/Cart.svg';
import logoExcitel from '../../assets/icons/logoExcitel.png';
//
import ReusableSubscriptionCard from '../SubscriptionHistory/ReusableSubscriptionCard';
import { useNavigate } from 'react-router-dom';
import { SlClose } from 'react-icons/sl';

import Swal from 'sweetalert2';
import { request } from '../../axios/AxiosHelper';

function Confirmation({ isOpen, setIsModalOpen, plan, category, cData }) {
  if (!isOpen) return null;

  const navigate = useNavigate();
  // const PersonData = JSON.parse(window.sessionStorage.getItem('PersonData'))
  const subscription = { plan, purchasedOn: null, status: null };

  const planId = subscription.plan.planId;
  const price = subscription.plan.price;

  let dataRemaining;
  if (subscription.plan.dataRemaining != undefined) {
    dataRemaining = '-1';
  } else {
    dataRemaining =
      subscription.plan.data === 'Unlimited' ? -1 : subscription.plan.data;
  }

  const planType = subscription.plan.planType;
  let couponId;
  if (plan.planType === 'Prepaid' || plan.planType === 'Postpaid')
    couponId =
      // subscription.plan.couponIds.length > 0 &&
      // subscription.plan.couponIds[0] !== ""
      subscription.plan.couponIds && subscription.plan.couponIds.length > 0
        ? subscription.plan.couponIds[0]
        : null;

  function handleConfirm(e) {
    e.preventDefault();

    try {
      request('POST', '/subscriptions', {
        planId: String(planId),
        // mobileNumber: String(PersonData.mobileNumber),
        price: String(price),
        couponID: couponId === undefined ? null : couponId,
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
          setIsModalOpen(false);

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

  const setConfirmationModalClickHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="confirmation-modal-wrapper"
      data-testid="confirmation-modal"
    >
      <div className="confirmation-modal-cross">
        <SlClose
          fill="white"
          onClick={setConfirmationModalClickHandler}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <div className="confirm-purchase-container">
        <img
          src={cartIcon}
          style={{ height: '3vh', width: '3vw' }}
          alt="Cart Icon"
        />

        {plan?.planType.toLowerCase() == 'postpaid' ? (
          <h4>Your subscribed plan</h4>
        ) : (
          <h4>Confirm your purchase</h4>
        )}

        {/* Confirm Your Purchase */}
      </div>
      <div className="plan-selected">Plan Selected</div>
      <div className="plan-chosen-confirmation">
        <ReusableSubscriptionCard
          subscription={subscription}
          type={'Confirmation'}
          category={category}
        />
      </div>

      {plan?.planType.toLowerCase() == 'postpaid' ? (
        <>
          {' '}
          <div className="coupon-container">
            <p style={{ marginTop: '2vh' }}>
              Billing Cycle - 5th of every month{' '}
            </p>
          </div>
          <br />
          <div style={{ textAlign: 'center' }} className="coupon-container">
            <p style={{ marginTop: '2vh', textAlign: 'center' }}>
              Postplan data charge @10 paise/min{' '}
            </p>
          </div>
          <div className="terms-and-conditons-external">
            Validity exceeds , includes tax, T&C apply.
          </div>
        </>
      ) : (
        <div className="coupon-container">
          <img
            src={logoExcitel}
            style={{ height: '2vh', width: '1vw' }}
            alt="Cart Icon"
          />
          <p style={{ marginTop: '2vh' }}>{cData} GB Data</p>
          <p style={{ marginTop: '2vh' }}>15 Days</p>
        </div>
      )}

      {plan?.planType.toLowerCase() !== 'postpaid' && (
        <button onClick={handleConfirm}>Confirm</button>
      )}
    </div>
  );
}

// Confirmation.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   setIsModalOpen: PropTypes.func.isRequired,
//   plan: PropTypes.object.isRequired,
//   category: PropTypes.string.isRequired,
// };

export default Confirmation;

/*eslint-disable*/
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import '../../pages/css/Subscription.css';
//
const ReusableSubscriptionCard = ({
  subscription,
  onFeedbackClick,
  type,
  category,
  setPostPaidSubscribedCard,
  getData,
  clickedConfirm,
  paymentDone
}) => {
  const { plan, purchasedOn, status } = subscription;

  const PersonData = JSON.parse(window.sessionStorage.getItem('PersonData'));

  const formattedDate = (purchasedOn) => {
    const purchaseDate = new Date(purchasedOn);
    const formatteddate = purchaseDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    return formatteddate;
  };
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
  const getColor = (status) => {
    if (status === 'Active') {
      return 'green';
    } else if (status === 'Expired') {
      return 'red';
    } else if (status === 'Queued' || status === 'Not Availed') {
      return 'orange';
    } else {
      return 'inherit'; // Or whatever default color you want
    }
  };
  const revertBackDataToCard = (subscription) => {
    setPostPaidSubscribedCard(true);
    clickedConfirm(true);
    getData(subscription);
  };
  return (
    <div
      style={
        type == 'Modal'
          ? {
              height: 'auto',
              minWidth: '100%',
              marginTop: '-1rem',
              backgroundImage: 'linear-gradient(to right, #0e054b, #000000)',
              color: 'white'
            }
          : type == 'Confirmation'
            ? { minWidth: '100%', height: 'auto' }
            : {}
      }
      className="subscription-recharge-card"
    >
      <div
        data-testid="hover-div"
        style={
          type == 'Modal'
            ? { color: 'white' }
            : type == 'Confirmation'
              ? { background: '' }
              : { background: 'linear-gradient(to right, #0e054b, #000000);' }
        }
        onMouseOver={(e) =>
          type === 'Confirmation' &&
          (e.currentTarget.style.background =
            'linear-gradient(to right, #0e054b, #000000)')
        }
        onMouseOut={(e) =>
          type === 'Confirmation' && (e.currentTarget.style.background = '')
        }
        className="subscription-recharge-specification-div"
      >
        <p className="data-subscription">
          <span
            style={type == 'Modal' ? { color: 'white' } : {}}
            className="subscription-text-recharge"
          >
            {plan?.data === 'Unlimited'
              ? plan?.data
              : `${
                  type == 'Confirmation' &&
                  (category == 'Broadband' || category == 'broadband')
                    ? subscription?.plan?.plan?.speed + ' MB/sec'
                    : type == 'Confirmation' &&
                        (category == 'Prepaid' || category == 'prepaid')
                      ? subscription?.dataRemaining + ' GB/Day'
                      : type == 'Confirmation' &&
                          category == 'Modal' &&
                          PersonData?.simType.toLowerCase() === 'postpaid'
                        ? subscription?.plan?.dataRemaining + ' GB/Day'
                        : subscription?.plan?.data + ' GB/day'
                }`}
          </span>
        </p>
        <p className="data-subscription">
          <span
            style={type == 'Modal' ? { color: 'white' } : {}}
            className="subscription-text-recharge"
          >
            {plan?.validity} Days
          </span>{' '}
          Validity
        </p>
        <p className="data-subscription">
          <span
            style={type == 'Modal' ? { color: 'white' } : {}}
            className="subscription-text-recharge"
          >
            ₹{plan?.price}
          </span>
          {type == 'Confirmation' ? (
            ''
          ) : (
            <p className="date">
              <div>Subscription date </div>
              <div style={{ fontStyle: 'oblique' }}>
                {' ' + formattedDate(purchasedOn)}
              </div>
            </p>
          )}
        </p>
      </div>
      <p
        style={{
          marginTop: '-2%',
          fontWeight: '700',
          color: getColor(status)
        }}
      >
        {status == 'Not Availed' ? 'Queued' : status}
      </p>

      {type == 'Modal' ? (
        ''
      ) : (
        <>
          <div
            onMouseOver={(e) =>
              (e.currentTarget.style.background =
                'linear-gradient(to right, #0e054b, #000000)')
            }
            onMouseOut={(e) => (e.currentTarget.style.background = '')}
            className="subscription-card-divider"
          ></div>
          <div style={{ display: 'flex', width: '93%' }}>
            <div className="subscription-stacked-image-wrapper">
              <div className="subscription-stacked-images">
                {plan &&
                  plan.ott &&
                  plan.ott.map((ottPlatform, index) => (
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

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '90%'
              }}
            >
              {type == 'Confirmation' &&
              category?.toLowerCase() == 'postpaid' &&
              status == 'Active' ? (
                paymentDone == true ? (
                  ''
                ) : (
                  <Button
                    style={{ cursor: 'pointer' }}
                    className="prepaid-details"
                    onClick={() => revertBackDataToCard(subscription)}
                  >
                    Make Payment
                  </Button>
                )
              ) : (
                type !== 'Confirmation' && (
                  <Button
                    style={{ cursor: 'pointer' }}
                    className="prepaid-details"
                    onClick={() => onFeedbackClick(subscription)}
                  >
                    Feedback
                  </Button>
                )
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

ReusableSubscriptionCard.propTypes = {
  subscription: PropTypes.shape({
    plan: PropTypes.shape({
      data: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      validity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired
    }).isRequired,
    purchasedOn: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
    // Add OTT and other necessary PropTypes
  }).isRequired,
  onFeedbackClick: PropTypes.func.isRequired
};

export default ReusableSubscriptionCard;

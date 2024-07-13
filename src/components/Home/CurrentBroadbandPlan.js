/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import './css/CurrentBroadbandPlan.css';
import ReactSpeedometer from 'react-d3-speedometer';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
//
const CurrentBroadbandPlan = ({ userInfo, broadband, isRenew }) => {
  let purchaseDate = '-';
  let expirationDate = '-';

  const navigate = useNavigate();
  const [price, setPrice] = useState('-');
  const [plan, setPlan] = useState('-');
  const [purchasedOn, setPurchasedOn] = useState('-');
  const [expireDate, setExpireDate] = useState('-');
  const [status, setStatus] = useState('-');
  const [sColor, setSColor] = useState('grey');
  const [eColor, setEColor] = useState('black');
  const [flag, setFlag] = useState(1);
  const convertDate = (dateString) => {
    // Split the string into day, month, and year
    var parts = dateString.split('-');
    var day = parts[0];
    var month = parts[1];
    var year = parts[2];

    // Create a Date object with the given parts
    var date = new Date(year, month - 1, day);

    // Format the date as "Month day, year"
    var formattedDate = date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    return formattedDate;
  };

  const handleGetNewConnectionClick = () => {
    navigate('/broadband');
  };
  const handleRenewClick = () => {
    isRenew(true);
  };
  // const changeStartEndColor = ()=>{
  //   setSColor("green");
  //   setEColor("red");
  // }
  if (broadband != undefined && broadband.plan != undefined && flag == 1) {
    const date = new Date(broadband.purchasedOn); // Convert epoch timestamp to milliseconds
    purchaseDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;

    const date2 = new Date(
      broadband.purchasedOn + broadband.plan.validity * 24 * 60 * 60 * 1000
    );
    expirationDate = `${date2.getDate().toString().padStart(2, '0')}-${(date2.getMonth() + 1).toString().padStart(2, '0')}-${date2.getFullYear()}`;
    setPrice(broadband.plan.price);
    setPlan(broadband.plan.speed);
    setPurchasedOn(purchaseDate);
    setExpireDate(expirationDate);
    // changeStartEndColor();
    setStatus(broadband.status);
    if (broadband.plan != undefined) {
      if (status == 'Active') {
        setSColor('green');
        setEColor('red');
      } else {
        setSColor('grey');
        setEColor('black');
      }
      setFlag(2);
    }
  }
  const Load = () => {
    // setFlag(1);
  };
  useEffect(() => {
    // setFlag(2);
    const timer = setTimeout(() => {
      setFlag(2);
    }, 1000);

    return () => clearTimeout(timer); // Clean up the timer to prevent memory leaks
  }, []);

  return (
    <>
      <div className="broadband-container" onLoad={Load}>
        <div className="broadband-header">
          {status != 'Expired' ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h3 className="cmp-title">Current Broadband Plan</h3>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {/* <div className="red-circle"></div> */}
              <h3 className="cmp-title">Last Broadband Plan</h3>
            </div>
          )}
        </div>
        {broadband == undefined ? (
          <div className="cbp-no-plan">
            <p>Oops!! No Broadband Plan Found</p>
          </div>
        ) : (
          <></>
        )}
        <div className="user-home-broadband-image">
          {flag == 2 ? (
            <>
              <ReactSpeedometer
                data-testid="mock-speedometer"
                value={
                  broadband?.plan?.speed == undefined ||
                  broadband?.status == 'Expired'
                    ? 0
                    : broadband.plan.speed
                } // Set the value of the speedometer
                minValue={0} // Set the minimum value
                maxValue={1000} // Set the maximum value
                needleColor="black" // Set the color of the needle
                startColor={status == 'Active' ? 'green' : 'grey'} // Set the start color of the speedometer
                endColor={status == 'Active' ? 'red' : 'black'} // Set the end color of the speedometer
                height={131.5} // Set the height of the speedometer
                width={200} // Set the width of the speedometer
                ringWidth={30} // Set the width of the ring
                //   needleTransitionDuration={9000}
                //   needleTransition="easeElastic"
                currentValueText="${value} Mbps"
              />
            </>
          ) : (
            <></>
          )}
        </div>
        <div>
          <p style={{ textAlign: 'center' }}>{flag == 1 ? '-' : plan}Mbps</p>
        </div>
        <div className="broadband-details">
          <div className="broadband-details-fields">
            <p>Price</p>
            <p>Data Plan</p>
            <p>Purchsed on</p>
            <p>Expires on</p>
            {broadband == undefined ? (
              <></>
            ) : (
              <h4 style={{ textAlign: 'left' }}>Plan Status</h4>
            )}
          </div>
          <div className="broadband-details-values">
            <p>{flag == 1 || broadband == undefined ? '-' : '₹ ' + price}</p>
            <p>{flag == 1 || broadband == undefined ? '-' : plan + ' Mbps'}</p>
            <p>
              {flag == 1 || broadband == undefined
                ? '-'
                : convertDate(purchasedOn)}
            </p>
            <p>
              {flag == 1 || broadband == undefined
                ? '-'
                : convertDate(expireDate)}
            </p>
            {broadband == undefined ? (
              <></>
            ) : broadband?.status == 'Expired' ? (
              <h4 style={{ color: 'red' }}>{status}</h4>
            ) : (
              <h4 style={{ color: 'green' }}>{status}</h4>
            )}
          </div>
        </div>
        <div className="cbp-button-container">
          {broadband == undefined ? (
            <button
              className="cbp-recharge-btn"
              onClick={handleGetNewConnectionClick}
            >
              Buy Plan
            </button>
          ) : broadband?.status == 'Expired' ? (
            <button
              className="cbp-recharge-btn"
              onClick={handleGetNewConnectionClick}
            >
              Renew Plan
            </button>
          ) : (
            <>
              <button
                className="cbp-recharge-btn"
                onClick={handleGetNewConnectionClick}
              >
                Buy Plan
              </button>
              <button
                className="cbp-recharge-btn"
                onClick={handleGetNewConnectionClick}
              >
                Renew Plan
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
// CurrentBroadbandPlan.propTypes = {
//   broadband: PropTypes.shape({
//     // Define the structure of userInfo object
//     mobileNumber: PropTypes.string.isRequired,
//     status: PropTypes.string.isRequired,
//     price: PropTypes.string.isRequired,
//     plan: PropTypes.object.isRequired,
//     purchasedOn: PropTypes.number.isRequired
//     // Add more PropTypes for other properties if needed
//   }).isRequired
// };
export default CurrentBroadbandPlan;

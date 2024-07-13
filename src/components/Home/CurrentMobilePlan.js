/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import './css/CurrentMobilePlan.css';
import PropTypes from 'prop-types';
import HomeCouponModal from '../Coupon/HomeCouponModal';
import { request } from '../../axios/AxiosHelper';

const CurrentMobilePlan = ({ userInfo, mobile, setCouponAdded }) => {
  const [price, setPrice] = useState('-');
  const [plan, setPlan] = useState('-');
  const [purchasedOn, setPurchasedOn] = useState('-');
  const [expireDate, setExpireDate] = useState('-');
  const [status, setStatus] = useState('-');
  const [flag, setFlag] = useState(1);
  const [data, setData] = useState([]);
  const [CouponAdded, setCouponAddeds] = useState(false);
  const [AllCouponsData, setAllCouponsData] = useState(0);
  const navigate = useNavigate();
  var consumed;
  var left;
  let purchaseDate = '';
  let expirationDate = '';

  const [coupondetailsVisibility, setCouponsDetailsVisibility] =
    useState(false);

  const handleRechargeClick = () => {
    navigate('/' + userInfo.simType.toLowerCase());
  };
  const setCouponsDetailsVisibilityFrom = () => {
    setCouponsDetailsVisibility(false);
  };
  const handleApplyCouponClick = () => {
    // navigate("/apply-coupon");
    setCouponsDetailsVisibility(true);
  };

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
  useEffect(() => {
    request('GET', '/subscriptions/coupons').then((response) => {
      if (response.coupons) {
        let all_data = 0;
        response.coupons.map((coupons) => {
          if (coupons.couponStatus == 'Availed') {
            all_data += parseInt(coupons.coupon.data);
          }
        });

        setAllCouponsData(all_data);
      } else {
        setAllCouponsData(0);
      }
    });

    if (mobile !== undefined && mobile?.plan !== undefined && flag == 4) {
      const date = new Date(mobile.purchasedOn); // Convert epoch timestamp to milliseconds
      purchaseDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
      const date2 = new Date(
        mobile.purchasedOn + mobile.plan?.validity * 24 * 60 * 60 * 1000
      );
      expirationDate = `${date2.getDate().toString().padStart(2, '0')}-${(date2.getMonth() + 1).toString().padStart(2, '0')}-${date2.getFullYear()}`;
      consumed =
        parseInt(mobile.plan?.data) + AllCouponsData - mobile.dataRemaining;
      left = mobile.dataRemaining;
      setPrice(mobile.plan?.price);
      setPlan(parseInt(mobile.plan?.data) + parseInt(AllCouponsData));
      setPurchasedOn(purchaseDate);
      setExpireDate(expirationDate);
      // changeStartEndColor();
      setStatus(mobile.status);
      if (mobile.status == 'Active') {
        setData([
          {
            name: Math.round(consumed * 1024, 2) + ' MB Consumed',
            value: consumed,
            color: 'rgba(22, 2, 33, 1)'
          },
          {
            name: left + ' GB Left',
            value: left,
            color: 'rgba(47, 224, 194, 1)'
          }
        ]);
      } else {
        setData([
          {
            name: Math.round(consumed * 1024, 2) + ' MB Consumed',
            value: consumed,
            color: 'rgb(86, 86, 86)'
          },
          { name: 0 + ' GB Left', value: 0, color: 'grey' }
        ]);
      }
    } else {
      consumed = 0;
      left = 0;
      setData([
        {
          name: consumed + ' MB Consumed',
          value: 1,
          color: 'rgb(86, 86, 86)'
        },
        { name: left + ' MB Left', value: left, color: 'grey' }
      ]);
    }
  }, [flag, AllCouponsData]); // Only re-run effect if mobile prop changes

  useEffect(() => {
    const timer = setTimeout(() => {
      setFlag(4);
    }, 1000);
    return () => clearTimeout(timer); // Clean up the timer to prevent memory leaks
  }, [AllCouponsData, CouponAdded]);
  return (
    <>
      <div className="cmp-custom-box">
        {status != 'Expired' ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <h3 className="cmp-title">Current Mobile Plan</h3>
            </div>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <h3 className="cmp-title">Last Mobile Plan</h3>
            </div>
          </>
        )}
        {mobile == undefined ? (
          <div className="cmp-no-plan">
            <p>Oops!! No Mobile Plan Found</p>
          </div>
        ) : (
          <></>
        )}
        <div className="chart-container">
          <div className="cmp-piechart-container">
            {flag === 4 ? (
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    innerRadius={33} // Inner radius for doughnut effect
                  >
                    {data &&
                      data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                  </Pie>
                  <Legend
                    verticalAlign="bottom"
                    layout="vertical"
                    height={36}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="cmp-info-container">
          <div className="info-details">
            <p>Price:</p>
            <p>Data Plan</p>
            <p>Purchased on:</p>
            <p>Expire on:</p>
            {mobile == undefined ? (
              <></>
            ) : (
              <h4 style={{ textAlign: 'left' }}>Plan Status</h4>
            )}
          </div>
          <div className="info-values">
            <p>{flag == 1 || mobile == undefined ? '-' : '₹ ' + price}</p>
            <p>{flag == 1 || mobile == undefined ? '-' : plan + ' GB'}</p>
            <p>
              {flag == 1 || mobile == undefined
                ? '-'
                : convertDate(purchasedOn)}
            </p>
            <p>
              {flag == 1 || mobile == undefined ? '-' : convertDate(expireDate)}
            </p>
            {mobile == undefined ? (
              <></>
            ) : mobile?.status == 'Expired' ? (
              <h4 style={{ color: 'red' }}>{status}</h4>
            ) : (
              <h4 style={{ color: 'green' }}>{status}</h4>
            )}
          </div>
        </div>
        <div className="cmp-button-container">
          {mobile == undefined ? (
            <button className="cmp-recharge-btn" onClick={handleRechargeClick}>
              Recharge
            </button>
          ) : mobile?.status == 'Expired' ? (
            <button className="cmp-recharge-btn" onClick={handleRechargeClick}>
              Recharge
            </button>
          ) : (
            <>
              <button
                className="cmp-recharge-btn"
                onClick={handleRechargeClick}
              >
                Recharge
              </button>
              <button
                className="cmp-recharge-btn"
                onClick={handleApplyCouponClick}
              >
                Apply Coupon
              </button>
            </>
          )}
        </div>

        {/* Render CouponModal if couponsDetailsVisibility is true */}
        {coupondetailsVisibility && (
          <div style={{ Width: '40vw' }}>
            <HomeCouponModal
              setCouponsDetailsVisibility={setCouponsDetailsVisibilityFrom}
            />
          </div>
        )}
      </div>
    </>
  );
};

// CurrentMobilePlan.propTypes = {
//   mobile: PropTypes.shape({
//     // Define the structure of userInfo object
//     mobileNumber: PropTypes.string.isRequired,
//     price: PropTypes.string.isRequired,
//     status: PropTypes.string.isRequired,
//     dataRemaining: PropTypes.number.isRequired,
//     plan: PropTypes.object.isRequired,
//     purchasedOn: PropTypes.number.isRequired
//     // Add more PropTypes for other properties if needed
//   }).isRequired
// };

export default CurrentMobilePlan;

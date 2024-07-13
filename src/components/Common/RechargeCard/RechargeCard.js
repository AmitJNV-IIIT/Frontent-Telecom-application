/* eslint-disable */

// React and related hooks
import { useEffect, useState, lazy, Suspense } from 'react';
//
// Third-party libraries and icons
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';

const PlanUsage = lazy(
  () => import('../../../components/Admin/AdminPlan/PlanUsage')
);
const PrepaidDetailsModal = lazy(
  () => import('../../Prepaid/PrepaidDetailsModal')
);
const CouponModal = lazy(() => import('../../Coupon/CouponModal'));

import Spinner from '../Spinner/Spinner';

import { useAuth } from '../../../hooks/contextApi/AuthContext';
import { request } from '../../../axios/AxiosHelper';

import AlertDialog from '../../Admin/AdminPlan/AlertDialog';

// CSS imports
import './css/Recharge.css';

const RechargeCard = ({
  dataArray,
  role,
  setPlanDetailsFromRechargeCard,
  setFeedbackIdforFeedbacks,
  adminPlanType,
  handleDeletePlanImmediately,
  length,
  itemOffset
}) => {
  const { isLogin } = useAuth() || {};
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [planUsageView, setPlanUsageView] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState('');
  const [detailsCardVisibility, setDetailsCardVisibility] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [deletePlan, setDeletePlan] = useState('');
  let dataCouponArray = [];

  const [clickedPlan, setPlan] = useState(null);
  const PersonData = JSON.parse(window.sessionStorage.getItem('PersonData'));
  const [coupondetailsVisibility, setCouponsDetailsVisibility] =
    useState(false);
  const handleEdit = (data) => {
    const newCouponPromise = fetchCouponById(data.couponIds[0]);

    newCouponPromise.then((planCoupon) => {
      setPlanDetailsFromRechargeCard(data, planCoupon);
    });
  };

  const handlePlanClick = (plan) => {
    setFeedbackIdforFeedbacks(plan.planId);
  };

  const fetchCoupon = (coupons) => {
    const id = coupons.length == 0 ? 'null' : coupons[0];
    return id;
  };

  function confirmDeleteItem(confirmation) {
    setConfirmDelete(confirmation);
  }
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    // setSelectedCardIndex(index); // Set the index of the hovered card
  };

  const handleCardClick = (plan, index) => {
    if (role === 'ADMIN') {
      setFeedbackIdforFeedbacks(plan.planId);
      handlePlanClick(plan);
      setSelectedCardIndex(index); // Update selected card on click (USER)
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null); // Reset the hovered index when mouse leaves
  };

  const detailsClickHandler = (plan) => {
    if (role === 'USER') {
      setPlan(plan);
      setDetailsCardVisibility(true);
    } else if (role === 'ADMIN') {
      setPlanUsageView(true);
    }
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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: error.message,
        timer: 1000
      });
    }
    return image;
  };

  const handleDelete = (plan) => {
    setOnDelete(!onDelete);
    setDeletePlan(plan.planId);
  };

  const deleteBroadbandPlan = (planId) => {
    try {
      request('DELETE', `/broadband/${planId}`).then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Broadband Plan deleted successfully',
          showConfirmButton: false,
          timer: 1500
        });
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops something went wrong',
        text: error.message,
        timer: 1000
      });
    }
  };

  const fetchCouponById = (couponId) => {
    try {
      return request('GET', `/mobile/coupons/${couponId}`).then((response) => {
        const coupon = response.coupon;

        return coupon;
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops something went wrong',
        text: error.message,
        timer: 1000
      });
    }
  };

  function deleteMobilePlan(planId) {
    try {
      request('DELETE', `/mobile/Prepaid/${planId}`).then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Mobile Plan deleted successfully',
          showConfirmButton: false,
          timer: 1500
        });
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops something went wrong',
        text: error.message,
        timer: 1000
      });
    }
    handleDeletePlanImmediately(planId);
  }

  // const couponsClickHandler = (plan) => {
  //   setPlan(plan);
  //   setCouponsDetailsVisibility(true);
  // };

  useEffect(() => {
    if (confirmDelete === 'yes') {
      if (adminPlanType === 'Broadband') {
        deleteBroadbandPlan(deletePlan);
        handleDeletePlanImmediately(deletePlan);
      } else {
        deleteMobilePlan(deletePlan);
        handleDeletePlanImmediately(deletePlan);
      }
      if (adminPlanType === 'Broadband') {
        deleteBroadbandPlan(deletePlan);
        handleDeletePlanImmediately(deletePlan);
      } else {
        deleteMobilePlan(deletePlan);
        handleDeletePlanImmediately(deletePlan);
      }
      setConfirmDelete('');
    }
  }, [confirmDelete]);
  useEffect(() => {
    dataArray.forEach((plan) => {
      const id = fetchCoupon(plan.couponIds);
      if (id !== 'null') {
        plan['coupon'] = { Hi: '1' }; // Example modification
      } else {
        plan['coupon'] = {};
      }
    });
  }, []);

  const classNameOnRole =
    role === 'USER'
      ? 'prepaid-recharge-main-div'
      : 'prepaid-recharge-main-div-admin';

  return (
    <div className={classNameOnRole} data-testid="prepaid-recharge-card-main">
      <div className="recharge-wrapper-rechargecard">
        <div style={{ minWidth: '40rem' }}>
          <p
            style={{
              color: 'white',
              textAlign: 'right',
              margin: '0px',
              marginTop: '-3vh'
            }}
          >
            {role === 'ADMIN' ? '' : <div>{length} Plans Found</div>}
          </p>
        </div>
        {onDelete && (
          <AlertDialog
            confirmDeleteItem={confirmDeleteItem}
            setOnDelete={setOnDelete}
          />
        )}
        {planUsageView === true ? (
          <Suspense fallback={<Spinner />}>
            <PlanUsage setPlanUsageView={setPlanUsageView} />
          </Suspense>
        ) : (
          ''
        )}
        {coupondetailsVisibility && (
          <Suspense fallback={<Spinner />}>
            <CouponModal
              clickedPlan={clickedPlan}
              setCouponsDetailsVisibility={setCouponsDetailsVisibility}
            />
          </Suspense>
        )}
        {/* {coupondetailsVisibility && (
          <Suspense fallback={<Spinner />}>
            <CouponModal
              clickedPlan={clickedPlan}
              setCouponsDetailsVisibility={setCouponsDetailsVisibility}
            />
          </Suspense>
        )} */}
        {dataArray &&
          dataArray.map((plan, index) => {
            return (
              <div
                key={plan.planId}
                className={index === selectedCardIndex ? 'selected' : ''}
                onClick={() => handleCardClick(plan, index)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseEnter(null)}
              >
                {detailsCardVisibility === true && clickedPlan === plan && (
                  <Suspense fallback={<Spinner />}>
                    <PrepaidDetailsModal
                      setDetailsCardVisibility={setDetailsCardVisibility}
                      plan={plan}
                      index={index}
                      getOTTImage={getOTTImage}
                      isLogin={PersonData != '' && PersonData != undefined}
                    />
                  </Suspense>
                )}

                <div
                  className="prepaid-recharge-card"
                  data-testid="prepaid-recharge-card"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {plan.couponIds.length !== 0 && role !== 'ADMIN' ? (
                    <div class="sticker-recharge-card">
                      <div class="ribbon-2">With Coupon</div>
                    </div>
                  ) : (
                    ''
                  )}
                  <div className="prepaid-recharge-specification-div">
                    <p className="data-prepaid">
                      <div className="recharge-card-prepaid-coupon"></div>
                      <span className="prepaid-text-recharge">
                        {plan.data}{' '}
                        <span
                          className={`${
                            plan.data === 'Unlimited'
                              ? 'prepaid-text-recharge-hidden'
                              : 'prepaid-text-recharge'
                          }`}
                        >
                          GB
                        </span>
                      </span>
                      <span
                        className={`${
                          plan.category === 'Unlimited' ||
                          plan.data === 'Unlimited' ||
                          plan.category === 'Topup'
                            ? 'prepaid-text-recharge-hidden'
                            : 'prepaid-text-recharge'
                        }`}
                      >
                        / Day
                      </span>
                    </p>

                    <p>
                      <span className="prepaid-text-recharge">
                        {plan?.validity} Days
                      </span>{' '}
                      Validity
                    </p>
                    <p>
                      <span className="prepaid-text-recharge">
                        ₹{plan.price}
                      </span>
                    </p>
                  </div>

                  <div className="prepaid-card-divider"></div>

                  <div className="recharge-card-third-section">
                    <div
                      style={{ cursor: 'pointer' }}
                      className="prepaid-details"
                    >
                      {role === 'USER' ? (
                        <p onClick={() => detailsClickHandler(plan)}>DETAILS</p>
                      ) : (
                        <p onClick={() => detailsClickHandler(plan)}>
                          Plan Usage
                        </p>
                      )}
                    </div>
                    <div className="prepaid-stacked-image-wrapper">
                      <div className="prepaid-stacked-images">
                        {plan.ott.map((ottPlatform, index) => (
                          <img
                            key={index}
                            src={getOTTImage(ottPlatform)}
                            alt={ottPlatform}
                            className="ott-img"
                            width={30}
                            height={30}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  {role === 'ADMIN' && hoveredIndex === index && (
                    <div className="edit-delete-button">
                      <IconButton
                        data-testid="edit-recharge-card"
                        aria-label="edit"
                        size="medium"
                        variant="contained"
                        onClick={() => handleEdit(plan)}
                        sx={{
                          color: 'white',
                          ':hover': {
                            color: 'violet'
                          }
                        }}
                      >
                        <EditNoteIcon fontSize="inherit" />
                      </IconButton>

                      <IconButton
                        aria-label="delete"
                        size="medium"
                        variant="contained"
                        onClick={() => handleDelete(plan)}
                        sx={{
                          color: 'white',
                          ':hover': {
                            color: 'violet'
                          }
                        }}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </div>
                  )}

                  {/* {role === "USER" && (
                  <div className="couponsection">
                    <div onClick={() => couponsClickHandler(plan)}>
                      View Coupon
                    </div>
                  </div>
                )} */}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

// RechargeCard.propTypes = {
//    detailsClickHandler: PropTypes.func.isRequired,
//   prepaidPlans: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       data: PropTypes.number.isRequired,
//       validity: PropTypes.number.isRequired,
//       price: PropTypes.number.isRequired,
//       ott: PropTypes.arrayOf(
//         PropTypes.shape({
//           id: PropTypes.number.isRequired,
//           name: PropTypes.string.isRequired
//         })
//       ).isRequired
//     })
//   ).isRequired,
//   prepaidCategory: PropTypes.string // Add prop type validation for prepaidCategory
// };

export default RechargeCard;

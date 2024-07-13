import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../../pages/css/Subscription.css';
import { request } from '../../axios/AxiosHelper';
//
import PlanFeedback from './FeedbackModel';
// import { Button } from "@mui/material";
import ReusableSubscriptionCard from './ReusableSubscriptionCard';
import Spinner from '../Common/Spinner/Spinner';
import Confirmation from '../Confirmation/ConfirmationModal';

const SubscriptionRechargeCard = ({ filters }) => {
  const [loading, setLoading] = useState('true');
  const [datas, setData] = useState([]);
  const [feedbackClick, handleFeedbackChange] = useState(false);
  const [PostPaidSubscribedCard, setPostPaidSubscribedCard] = useState(false);
  const [subscription, setSubscription] = useState(null);
  // const [PaymentDone, setPaymentDone] = useState(false);
  const [confirmbtn, clickedConfirm] = useState(false);
  const fetchData = async () => {
    const response = await request('GET', '/subscriptions');

    return response; // Return the response data

    // throw error;
  };
  const fetchDataAndFilter = async () => {
    try {
      const responseData = await fetchData();

      if (responseData != undefined) {
        let filteredData = responseData?.data;

        if (filters != null) {
          if (filters.category === '' && filters.status !== '') {
            filteredData = filteredData.filter(
              (subscription) => subscription.status === filters.status
            );
          } else if (filters.category === 'Broadband') {
            filteredData = filteredData.filter(
              (subscription) => subscription.planType === 'Broadband'
            );
            if (filters.status !== '') {
              filteredData = filteredData.filter(
                (subscription) => subscription.status === filters.status
              );
            }
          } else if (filters.category === 'Mobile Plans') {
            filteredData = filteredData.filter(
              (subscription) =>
                subscription.planType === 'Prepaid' ||
                subscription.planType == 'Postpaid'
            );
            if (filters.status !== '') {
              filteredData = filteredData.filter(
                (subscription) => subscription.status === filters.status
              );
            }
          }
        }

        setData(filteredData);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching and filtering data:', error);
    }
  };
  const getData = (e) => {
    setSubscription(e);
  };
  useEffect(() => {
    if (!filters) {
      filters = { category: '', status: '' };
    }
    setLoading(true);
    fetchDataAndFilter();
  }, [filters]);

  const clicks = (subscription) => {
    handleFeedbackChange(true);
    localStorage.setItem('Comp', JSON.stringify(subscription));
  };
  const setIsModalOpen = (e) => {
    setPostPaidSubscribedCard(e);
    // setPaymentDone(true);
  };

  const mainContent = (subscription, index) => {
    return (
      <>
        <ReusableSubscriptionCard
          key={index}
          subscription={subscription}
          onFeedbackClick={clicks}
          type={'Confirmation'}
          category={subscription.planType}
          setPostPaidSubscribedCard={setPostPaidSubscribedCard}
          getData={getData}
          clickedConfirm={clickedConfirm}
          // paymentDone={PaymentDone}
        />
      </>
    );
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div
          className="subscription-recharge-main-div"
          data-testid="subscription-recharge-card"
        >
          <div className="recharge-wrapper-subscription">
            {feedbackClick ? (
              <PlanFeedback />
            ) : datas == undefined || datas.length == 0 ? (
              <h3 className="NotFound" style={{ color: 'white' }}>
                No History found
              </h3>
            ) : (
              datas &&
              datas.map((subscription, index) =>
                mainContent(subscription, index)
              )
            )}
          </div>

          {confirmbtn && (
            <Confirmation
              isOpen={PostPaidSubscribedCard}
              setIsModalOpen={setIsModalOpen}
              plan={subscription}
              type={'Confirmation'}
              category={'Modal'}
            />
          )}
        </div>
      )}
    </>
  );
};

SubscriptionRechargeCard.propTypes = {
  filters: PropTypes.shape({
    category: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
  }).isRequired
};

export default SubscriptionRechargeCard;

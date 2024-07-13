/*eslint-disable*/
import React, { useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import FilterListIcon from '@mui/icons-material/FilterList';
//
const FeedbackModal = lazy(
  () => import('../components/SubscriptionHistory/FeedbackModel')
);
import Reports from '../components/SubscriptionHistory/Reports';
import SubscriptionFilters from '../components/SubscriptionHistory/SubscriptionFilters';
import SubscriptionRechargeCard from '../components/SubscriptionHistory/SubscriptionRechargeCard';

import datas from '../data/prepaid-data.json';

import './css/Subscription.css';
import Spinner from '../components/Common/Spinner/Spinner';

const Subscription = () => {
  const [detailsCardVisibility, setDetailsCardVisibility] = useState(false);
  const detailsClickHandler = () => {
    setDetailsCardVisibility(true);
  };
  const navigate = useNavigate();
  const [filters, setFilters] = useState({});
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const changeFilter = (e) => {
    setFilters({ category: e[0], status: e[1] });
  };
  const toggleFiltersVisibility = () => {
    setFiltersVisible(!filtersVisible);
    setMobile(true);
  };

  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="subscription-main" data-testid="subscription-main">
      {detailsCardVisibility === true ? (
        <Suspense fallback={<Spinner />}>
          <FeedbackModal
            setDetailsCardVisibility={setDetailsCardVisibility}
            dataa={datas}
            data-testid="feedback-modal"
          />
        </Suspense>
      ) : (
        ''
      )}

      <div>
        <div className="subscription-heading">
          <div className="filterList" data-testid="filter-list">
            <FilterListIcon
              onClick={toggleFiltersVisibility}
              data-testid="filter-icon"
            />
            <div className="filters-popup">
              <SubscriptionFilters
                changeFilter={changeFilter}
                isMobile={isMobile}
                data-testid="subscription-filters"
              />
            </div>
          </div>
        </div>
        <div className="container_subscription">
          <div
            style={{ justifyContent: 'space-evenly' }}
            className="row-subscription"
          >
            <div className="col-3-subscription">
              <div>
                <div
                  style={{ width: '100%' }}
                  className="filters-subscription
                "
                >
                  <SubscriptionFilters
                    changeFilter={changeFilter}
                    isMobile={true}
                    data-testid="subscription-filters"
                  />
                </div>
                <br />
                <div className="reports" data-testid="reports-component">
                  <Reports />
                </div>
              </div>
            </div>

            <div className="col-9-subscription">
              <div style={{ color: 'white' }} className="mobile-plans">
                {filters.category === '' ? (
                  ''
                ) : filters.category === 'Broadband' ? (
                  <h2 style={{ marginTop: '0rem' }} className="header">
                    Broadband Plans
                  </h2>
                ) : (
                  <h2 style={{ marginTop: '0rem' }} className="header">
                    Mobile Plans
                  </h2>
                )}
              </div>

              <div
                style={{ marginTop: '2%' }}
                className="subscription-recharge-cards"
              >
                <SubscriptionRechargeCard
                  filters={filters}
                  detailsClickHandler={detailsClickHandler}
                  data-testid="prepaid-recharge-card"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Pagination /> */}

      <div className="pre-footer-text">
        <p>Stay Updated with Your Account Activity</p>
      </div>
    </div>
  );
};

export default Subscription;

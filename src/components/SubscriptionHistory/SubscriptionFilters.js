/*eslint-disable*/
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './css/SubscriptionFilters.css';
import { RxCross2 } from 'react-icons/rx';

const Filters = ({ changeFilter, isMobile }) => {
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState('');
  const [status, setStatus] = React.useState('');

  useEffect(() => {
    changeFilter([category, status]);
  }, [category, status]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    handleOpen();
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    handleOpen();
  };

  const resetFilters = () => {
    setCategory('');
    setStatus('');
    handleOpen();
  };

  return (
    <div className="filter-main-div-subscription" data-testid="filter-main-div">
      <div
        style={{ marginLeft: '-15vw', marginTop: '4vh' }}
        className="filter-mobile-subscription"
      >
        {isMobile == true ? (
          ''
        ) : (
          <button
            onClick={handleOpen}
            className="filter-mobile-btn"
            data-testid="filters-btn"
          >
            Filters
          </button>
        )}
        {open ? (
          <div>
            <div className="filterbydays-div-mobile-subscription">
              {(category != '' || status != '') && (
                <div className="clear-filters-prepaid" onClick={resetFilters}>
                  <RxCross2 />
                  <p
                    style={{
                      fontSize: '12px',
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  >
                    Clear
                  </p>
                </div>
              )}
              <div className="filters-text-subscription">
                <p style={{ color: 'white' }} className="size">
                  Category
                </p>
                <div className="subscription-filters-menu">
                  <label>
                    <input
                      type="radio"
                      value="Broadband"
                      checked={category === 'Broadband'}
                      onChange={handleCategoryChange}
                    />
                    Broadband
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Mobile Plans"
                      checked={category === 'Mobile Plans'}
                      onChange={handleCategoryChange}
                    />
                    Mobile
                  </label>
                </div>
              </div>
              <div
                style={{ color: 'white' }}
                className="filters-text-subscription"
              >
                <p className="size">Status</p>
                <div className="subscription-status-menu">
                  <label>
                    <input
                      type="radio"
                      value="Active"
                      checked={status === 'Active'}
                      onChange={handleStatusChange}
                    />
                    Active
                  </label>

                  <label>
                    <input
                      type="radio"
                      value="Not Availed"
                      checked={status === 'Not Availed'}
                      onChange={handleStatusChange}
                    />
                    Queued
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Expired"
                      checked={status === 'Expired'}
                      onChange={handleStatusChange}
                    />
                    Expired
                  </label>
                </div>
              </div>
            </div>
            <div className="filters-dividing-div-subscription"></div>
          </div>
        ) : null}
      </div>
      <div
        style={{ marginLeft: '1.5rem' }}
        className="filter-desktop-subscriptions"
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <p className="filter-heading">Filters</p>
          {(category != '' || status != '') && (
            <div
              style={{ fontSize: '15px', color: 'white', fontWeight: 'bold' }}
              className="clear-filters-prepaid"
              onClick={resetFilters}
            >
              <RxCross2 />
              <p>Clear </p>
            </div>
          )}
        </div>
        <div className="filterbydays-div-subscription">
          <div className="filters-text-subscription">
            <p style={{ color: 'white' }} className="size">
              Category
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                marginLeft: '2vw'
              }}
            >
              <label>
                <input
                  className="radio-btn"
                  type="radio"
                  value="Broadband"
                  checked={category === 'Broadband'}
                  onChange={handleCategoryChange}
                />
                Broadband
              </label>
              <label>
                <input
                  className="radio-btn"
                  type="radio"
                  value="Mobile Plans"
                  checked={category === 'Mobile Plans'}
                  onChange={handleCategoryChange}
                />
                Mobile
              </label>
            </div>
          </div>
          <div className="filters-text-subscription">
            <p style={{ color: 'white' }} className="size">
              Status
            </p>
            <div
              className=""
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                marginLeft: '2vw'
              }}
            >
              <label>
                <input
                  className="radio-btn"
                  type="radio"
                  value="Active"
                  checked={status === 'Active'}
                  onChange={handleStatusChange}
                />
                Active
              </label>
              <label>
                <input
                  className="radio-btn"
                  type="radio"
                  value="Not Availed"
                  checked={status === 'Not Availed'}
                  onChange={handleStatusChange}
                />
                Queued
              </label>
              <label>
                <input
                  className="radio-btn"
                  type="radio"
                  value="Expired"
                  checked={status === 'Expired'}
                  onChange={handleStatusChange}
                />
                Expired
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Filters.propTypes = {
  changeFilter: PropTypes.func.isRequired
};

export default Filters;

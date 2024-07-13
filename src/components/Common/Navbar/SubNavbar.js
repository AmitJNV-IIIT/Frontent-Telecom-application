/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import './css/SubNavbar.css';

const SubNavbar = ({
  categories,
  prepaidCategory,
  setPrepaidCategory,
  postpaidCategory,
  setPostpaidCategory,
  currentPage,
  changePrepaidCategory,
  changePostpaidCategory,
  broadbandCategory,
  setBroadbandCategory,
  changeBroadbandCategory
}) => {
  function categoryHandler(subnavbarElement, categoryType) {
    if (categoryType === 'prepaid') {
      setPrepaidCategory(subnavbarElement);
      changePrepaidCategory(subnavbarElement);
    } else if (categoryType === 'postpaid') {
      setPostpaidCategory(subnavbarElement);
      changePostpaidCategory(subnavbarElement);
    } else if (categoryType === 'broadband') {
      setBroadbandCategory(subnavbarElement);
      changeBroadbandCategory(subnavbarElement);
    }
  }
  //
  return (
    <div
      className={currentPage == 'broadband' ? 'sub-nav-bnroadband' : 'sub-nav'}
    >
      <div className="btn-group">
        {currentPage === 'prepaid' &&
          categories.map((element) => (
            <div key={element.id}>
              <button
                onClick={() => categoryHandler(element, 'prepaid')} // Pass 'prepaid' as categoryType
                className={`btn-subnav ${
                  prepaidCategory === element
                    ? 'subnav-btn-click'
                    : 'subnav-btn-not-click'
                }`}
              >
                {element}
              </button>
            </div>
          ))}
        {currentPage === 'postpaid' &&
          categories.map((element) => (
            <div key={element.id}>
              <button
                onClick={() => categoryHandler(element, 'postpaid')} // Pass 'postpaid' as categoryType
                className={`btn-subnav ${
                  postpaidCategory === element
                    ? 'subnav-btn-click'
                    : 'subnav-btn-not-click'
                }`}
              >
                {element}
              </button>
            </div>
          ))}
        {currentPage === 'broadband' &&
          categories.map((element) => (
            <div key={element.id}>
              <button
                onClick={() => categoryHandler(element, 'broadband')} // Pass 'postpaid' as categoryType
                className={`btn-subnav ${
                  broadbandCategory === element
                    ? 'subnav-btn-click'
                    : 'subnav-btn-not-click'
                }`}
              >
                {element}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

// Prop types validation
// SubNavbar.propTypes = {
//   categories: PropTypes.array.isRequired,
//   prepaidCategory: PropTypes.string.isRequired,
//   setPrepaidCategory: PropTypes.func.isRequired,
//   postpaidCategory: PropTypes.string.isRequired,
//   setPostpaidCategory: PropTypes.func.isRequired,
//   currentPage: PropTypes.oneOf(['prepaid', 'postpaid']).isRequired,
//   changePrepaidCategory: PropTypes.func.isRequired,
//   changePostpaidCategory: PropTypes.func.isRequired
// };
// SubNavbar.propTypes = {
//   categories: PropTypes.array.isRequired,
//   prepaidCategory: PropTypes.string.isRequired,
//   setPrepaidCategory: PropTypes.func.isRequired,
//   postpaidCategory: PropTypes.string.isRequired,
//   setPostpaidCategory: PropTypes.func.isRequired,
//   currentPage: PropTypes.oneOf(["prepaid", "postpaid"]).isRequired,
//   changePrepaidCategory: PropTypes.func.isRequired,
//   changePostpaidCategory: PropTypes.func.isRequired,
// };

export default SubNavbar;

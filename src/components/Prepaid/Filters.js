/* eslint-disable */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { RxCross2 } from 'react-icons/rx';
import './css/Filters.css';
// import { WidthFull } from "@mui/icons-material";

const Filters = ({ updateFilter }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({
    type: null,
    value: null
  });
  const [selected, setSelected] = useState('');

  // Handler to change the selected value
  const handleDropdownChange = (event) => {
    setSelected(event.target.value);
  };
  const handleOpen = () => {
    setOpen(!open);
  };

  const clickHandler = (filterName, value) => {
    setLoading(true);
    if (updateFilter) {
      updateFilter(filterName, value);
    }
    setSelectedFilter({ type: filterName, value: value });
    setOpen(!open);
  };

  const isActive = (filterName, value) => {
    return selectedFilter.type === filterName && selectedFilter.value === value;
  };

  const resetFilters = () => {
    setSelectedFilter({ type: null, value: null });
    if (updateFilter) {
      updateFilter(null, null);
    }
  };

  const isFilterActive = () => {
    return selectedFilter.type !== null && selectedFilter.value !== null;
  };
  useEffect(() => {
    setLoading(false);
  }, [length]);
  return (
    <div className="filter-main-div">
      <div className="filter-mobile-prepaid">
        <div>
          <button
            data-testid="filters-button"
            onClick={handleOpen}
            className="filter-mobile-btn-prepaid"
          >
            Filters
          </button>
        </div>
        {open ? (
          <div className="filter-mobile-prepaid-sub-div">
            <div className="filterbydays-div-mobile">
              <div
                className={`filters-text-mobile ${
                  isActive('days', 28) ? 'active-filter' : ''
                }`}
                onClick={() => clickHandler('days', 28)}
              >
                <p className="size-mobile">28 Days</p>
              </div>

              <div
                className={`filters-text-mobile ${
                  isActive('days', 56) ? 'active-filter' : ''
                }`}
                onClick={() => clickHandler('days', 56)}
              >
                <p className="size-mobile">56 Days</p>
              </div>

              <div
                className={`filters-text-mobile ${
                  isActive('days', 84) ? 'active-filter' : ''
                }`}
                onClick={() => clickHandler('days', 84)}
              >
                <p className="size-mobile">84 Days</p>
              </div>

              <div
                className={`filters-text-mobile ${
                  isActive('days', 180) ? 'active-filter' : ''
                }`}
                onClick={() => clickHandler('days', 180)}
              >
                <p className="size-mobile">180 Days</p>
              </div>
            </div>

            <div className="filters-dividing-div"></div>

            <div className="filterbydata-div-mobile">
              <div
                className={`filters-text-mobile ${
                  isActive('data', 1) ? 'active-filter' : ''
                }`}
                onClick={() => clickHandler('data', 1)}
              >
                <p className="size-mobile">1 GB</p>
              </div>

              <div
                className={`filters-text-mobile ${
                  isActive('data', 2) ? 'active-filter' : ''
                }`}
                onClick={() => clickHandler('data', 2)}
              >
                <p className="size-mobile">2 GB</p>
              </div>

              <div
                className={`filters-text-mobile ${
                  isActive('data', 3) ? 'active-filter' : ''
                }`}
                onClick={() => clickHandler('data', 3)}
              >
                <p className="size-mobile">3 GB</p>
              </div>

              <div
                className={`filters-text-mobile ${
                  isActive('data', 4) ? 'active-filter' : ''
                }`}
                onClick={() => clickHandler('data', 4)}
              >
                <p className="size-mobile">4 GB</p>
              </div>

              <div
                className={`filters-text-mobile ${
                  isActive('data', 5) ? 'active-filter' : ''
                }`}
                onClick={() => clickHandler('data', 5)}
              >
                <p className="size-mobile">5 GB</p>
              </div>

              <div
                className={`filters-text-mobile ${
                  isActive('data', 6) ? 'active-filter' : ''
                }`}
                onClick={() => clickHandler('data', 6)}
              >
                <p className="size-mobile">6 GB</p>
              </div>
            </div>
            {isFilterActive() && (
              <div className="clear-filters-prepaid" onClick={resetFilters}>
                <RxCross2 />
                <p>Clear Filters</p>
              </div>
            )}
          </div>
        ) : null}
      </div>

      <div className="filter-desktop-prepaid">
        <div className="filter-prepaid-top">
          <p className="filter-heading">Filters</p>
          {isFilterActive() && (
            <div
              style={{ color: 'white' }}
              className="clear-filters-prepaid"
              onClick={resetFilters}
            >
              <RxCross2 />
              <p style={{ fontWeight: '800', color: 'white' }}>Clear</p>
            </div>
          )}
        </div>
        <div
          className="filter-by-days-data"
          style={{ display: 'flex', gap: '10px' }}
        >
          <div className="filterbydays-div">
            <h3 style={{ margin: '0 0 10px 0', color: 'white' }}>Days</h3>
            <div
              className={`filters-text-prepaid ${
                isActive('days', 28) ? 'active-filter' : ''
              }`}
              onClick={() => clickHandler('days', 28)}
            >
              <p className="size" style={{ marginLeft: '10px' }}>
                28
              </p>
              {/* <p className="numbers">{isActive('days', 28)&&loading==false?length+" Plans":"-"}</p> */}
            </div>

            <div
              className={`filters-text-prepaid ${
                isActive('days', 56) ? 'active-filter' : ''
              }`}
              onClick={() => clickHandler('days', 56)}
            >
              <p className="size" style={{ marginLeft: '10px' }}>
                56
              </p>
              {/* <p className="numbers">{isActive('days', 56)&&loading==false?length+" Plans":"-"}</p> */}
            </div>

            <div
              className={`filters-text-prepaid ${
                isActive('days', 84) ? 'active-filter' : ''
              }`}
              onClick={() => clickHandler('days', 84)}
            >
              <p className="size" style={{ marginLeft: '10px' }}>
                84
              </p>
              {/* <p className="numbers">{isActive('days', 84)&&loading==false?length+" Plans":"-"}</p> */}
            </div>

            <div
              className={`filters-text-prepaid ${
                isActive('days', 180) ? 'active-filter' : ''
              }`}
              onClick={() => clickHandler('days', 180)}
            >
              <p className="size" style={{ marginLeft: '10px' }}>
                180
              </p>
              {/* <p className="numbers">{isActive('days', 180)&&loading==false?length+" Plans":"-"}</p> */}
            </div>
          </div>
          <div className="prepaid-filterbydata-div">
            <h3 style={{ margin: '0 0 10px 0', color: 'white' }}>Data</h3>
            <div
              className={`filters-text-prepaid ${
                isActive('data', 1) ? 'active-filter' : ''
              }`}
              onClick={() => clickHandler('data', 1)}
            >
              <p className="size" style={{ marginLeft: '10px' }}>
                1 GB
              </p>
              {/* <p className="numbers">{isActive('data', 1)&&loading==false?length+" Plans":"-"}</p> */}
            </div>

            <div
              className={`filters-text-prepaid ${
                isActive('data', 2) ? 'active-filter' : ''
              }`}
              onClick={() => clickHandler('data', 2)}
            >
              <p className="size" style={{ marginLeft: '10px' }}>
                2 GB
              </p>
              {/* <p className="numbers">{isActive('data', 2)&&loading==false?length+" Plans":"-"}</p> */}
            </div>

            <div
              className={`filters-text-prepaid ${
                isActive('data', 'unlimited') ? 'active-filter' : ''
              }`}
              onClick={() => clickHandler('data', 3)}
            >
              <p className="size" style={{ marginLeft: '10px' }}>
                3 GB
              </p>
              {/* <p className="numbers">{isActive('data', 3)&&loading==false?length+" Plans":"-"}</p> */}
            </div>
            <div
              className={`filters-text-prepaid ${
                isActive('data', 4) ? 'active-filter' : ''
              }`}
              onClick={() => clickHandler('data', 4)}
            >
              <p className="size" style={{ marginLeft: '10px' }}>
                4 GB
              </p>
              {/* <p className="numbers">{isActive('data', 4)&&loading==false?length+" Plans":"-"}</p> */}
            </div>
            <div
              className={`filters-text-prepaid ${
                isActive('data', 5) ? 'active-filter' : ''
              }`}
              onClick={() => clickHandler('data', 5)}
            >
              <p className="size" style={{ marginLeft: '10px' }}>
                5 GB
              </p>
              {/* <p className="numbers">{isActive('data', 5)&&loading==false?length+" Plans":"-"}</p> */}
            </div>
            <div
              className={`filters-text-prepaid ${
                isActive('data', 6) ? 'active-filter' : ''
              }`}
              onClick={() => clickHandler('data', 6)}
            >
              <p className="size" style={{ marginLeft: '10px' }}>
                6 GB
              </p>
              {/* <p className="numbers">{isActive('data', 6)&&loading==false?length+" Plans":"-"}</p> */}
            </div>
          </div>
        </div>

        {/* <div className="filters-dividing-div"></div> */}
      </div>
    </div>
  );
};

Filters.propTypes = {
  daysFilterHandler: PropTypes.func,
  dataFilterHandler: PropTypes.func
};

export default Filters;

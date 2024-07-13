import { Button } from '@mui/material';
import React, { useState } from 'react';
import { RxDownload } from 'react-icons/rx';
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';
import '../SubscriptionHistory/css/SubscriptionFilters.css';
import { request } from '../../axios/AxiosHelper';
import Swal from 'sweetalert2';

const Reports = () => {
  const [duration, setDuration] = React.useState('All');
  // const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const generateREport = () => {
    if (duration !== 'All') {
      request('GET', '/subscriptions/report?duration=' + duration)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Report sent to the mail',
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Something went wrong',
            showConfirmButton: false,
            timer: 1500
          });
          // navigate('/service-unavailable');
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Report can't be generated without selecting any duration!`,
        // footer: error.message,
        timer: 1000
      });
    }
  };
  return (
    <div className="filter-main-div" data-testid="filter-main-div">
      <div className="filter-desktop-subscriptions">
        <p className="filter-heading">Reports</p>
        <div className="filterbydays-div-subscription">
          <div className="filters-text-subscription">
            <p style={{ color: 'white' }} className="size">
              Duration
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '2vw'
              }}
            >
              <label>
                <input
                  type="radio"
                  className="radio-btn"
                  value="1"
                  checked={duration === '1'}
                  onChange={handleDurationChange}
                />
                1 Month
              </label>

              <label>
                <input
                  type="radio"
                  className="radio-btn"
                  value="3"
                  checked={duration === '3'}
                  onChange={handleDurationChange}
                />
                3 Months
              </label>
              <label>
                <input
                  type="radio"
                  className="radio-btn"
                  value="6"
                  checked={duration === '6'}
                  onChange={handleDurationChange}
                />
                6 Months
              </label>
              <label>
                <input
                  type="radio"
                  value="12"
                  className="radio-btn"
                  checked={duration === '12'}
                  onChange={handleDurationChange}
                />
                12 Months
              </label>
            </div>
          </div>
        </div>
        <Button
          endDecorator={<RxDownload className="packbuybtn" />}
          style={{
            width: '60%',
            height: '30px',
            margin: '4%',
            background: hovered
              ? 'linear-gradient(to bottom right, #0080ff, #8000ff)'
              : 'white',
            color: hovered ? 'white' : 'black'
          }}
          className="prepaid-button"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <b
            className="packbuybtn"
            style={{ fontSize: '15px' }}
            onClick={generateREport}
          >
            Generate Report
          </b>
        </Button>

        {/* <button style={{background:"linear-gradient(90deg, #347AE4 0%, #361D7E 70.5%)"}} onClick={handleGenerateClick}>Generate Report</button> */}
      </div>
    </div>
  );
};

export default Reports;

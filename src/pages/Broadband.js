/*eslint-disable*/

import React, { useState, useEffect } from 'react';

import BroadbandCard from '../components/Broadband/BroadbandCard.js';
import ConnectionDetail from '../components/Broadband/ConnectionDetail.js';
import Spinner from '../components/Common/Spinner/Spinner.js';
import SubNavbar from '../components/Common/Navbar/SubNavbar.js';
//
// import axios from "axios";
import { request } from '../axios/AxiosHelper';
import { BASE_URL } from '../constants/Constants.js';
import Swal from 'sweetalert2';
import { useAuth } from '../hooks/contextApi/AuthContext';
import './css/BroadbandPage.css';

const initialState = {
  connectionId: '',
  customerId: null,
  name: '',
  address: '',
  pinCode: 0,
  city: '',
  country: '',
  mobileNumber: '',
  state: '',
  status: ''
};
const Broadband = () => {
  const { isLogin } = useAuth() || {};
  const broadbandCategories = ['All', 'Basic', 'Standard', 'High'];
  const currentPage = 'broadband';

  const [connectionDetail, setConnectionDetail] = useState(initialState);
  const [broadbandCategory, setBroadbandCategory] = useState(
    broadbandCategories[0]
  );
  const [showModal, setShowModal] = useState(false);
  const [broadbandPlans, setBroadbandPlans] = useState([]);
  const [activeBroadbandPlan, setActiveBroadbandPlan] = useState({});
  const [fetchedCalled, setFetchedCalled] = useState(1);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  function changeBroadbandCategory(category) {
    setBroadbandCategory(category);
  }

  const [loading, setLoading] = useState(true);
  const [newArray, setNewArray] = useState([]);
  const filteringDataArrayWithActivePlan = (dataArray, activeBroadbandPlan) => {
    if (
      activeBroadbandPlan.planId != undefined ||
      activeBroadbandPlan == {} ||
      activeBroadbandPlan == null
    ) {
      dataArray = dataArray.filter(
        (plan) => plan.planId !== activeBroadbandPlan.planId
      );
    }
    const newItems = [...dataArray]; // Step 1: Retrieve the current state array
    newItems.unshift(activeBroadbandPlan.plan); // Step 2: Add the new element at the beginning
    setBroadbandPlans(newItems);
    return newArray;
  };

  const fetchBroadbandPlans = () => {
    setFetchedCalled(2);
    setLoading(true);

    let dataArray = broadbandPlans;

    dataArray = filteringDataArrayWithActivePlan(
      dataArray,
      activeBroadbandPlan
    );
    setLoading(false);
  };

  function getConnectionDetails() {
    try {
      setLoading(true);
      request('GET', '/broadband/connection/me').then((response) => {
        setConnectionDetail(response || {});

        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      // throw error;
    }
  }

  function getActiveBroadbandPlan() {
    const speedMap = {
      All: undefined,
      Basic: 100.0,
      Standard: 200.0,
      High: 1000.0
    };

    let broadbandUrl = `${BASE_URL}/broadband?offset=0&limit=100&active=True`;

    // Add speed parameter if category is not "All"
    if (broadbandCategory !== 'All') {
      const speed = speedMap[broadbandCategory];
      if (speed !== undefined) {
        broadbandUrl += `&speed=${speed}`;
      }
    }

    setLoading(true);
    try {
      request('GET', broadbandUrl).then((response) => {
        setBroadbandPlans(response?.data);
        setLoading(false);
      });
    } catch (e) {
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: e.message,
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  useEffect(() => {
    getActiveBroadbandPlan();
  }, [broadbandCategory]);

  useEffect(() => {
    getConnectionDetails();
  }, [showModal]);

  return (
    <div>
      <div className="sub-navbar-wrapper">
        {activeBroadbandPlan != undefined &&
        broadbandPlans != undefined &&
        broadbandPlans.length > 0 &&
        fetchedCalled == 1
          ? fetchBroadbandPlans()
          : ''}
        <div className="sub-navbar-broadband">
          <SubNavbar
            categories={broadbandCategories}
            broadbandCategory={broadbandCategory}
            setBroadbandCategory={setBroadbandCategory}
            currentPage={currentPage}
            changeBroadbandCategory={changeBroadbandCategory}
          />
        </div>
      </div>
      <div className="broadband-page">
        <div
          className="broadband-heading"
          data-testid="connection-detail-modal"
        >
          {/* <h3>Broadband Plans </h3> */}
          {isLogin && (
            <p className="connection-detail" onClick={toggleModal}>
              {connectionDetail.address != undefined && (
                <img
                  src={require(`../assets/images/connectionDetail.png`)}
                  alt="Connection Detail Img"
                />
              )}
              {/* <p className="show-on-mobile">Connection Details</p> */}
            </p>
          )}
        </div>
        <div>
          <div className="background-div-broadband" data-testid="spinner">
            {loading ? (
              <Spinner />
            ) : (
              <BroadbandCard
                broadbandPlans={broadbandPlans}
                activeBroadbandPlan={activeBroadbandPlan}
                isLogin={isLogin}
              />
            )}
          </div>
        </div>

        {connectionDetail.address != undefined && (
          <ConnectionDetail
            isOpen={showModal}
            onClose={toggleModal}
            connectionDetail={connectionDetail}
          />
        )}
      </div>
    </div>
  );
};

export default Broadband;

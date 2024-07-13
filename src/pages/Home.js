/*eslint-disable*/
import React, { useEffect, useState } from 'react';

import UserHomePageHeader from '../components/Home/UserHomePageHeader';
import HomeBannercarousel from '../components/LandingComponent/HomeBannercarousel';
import UserInformation from '../components/Home/UserInformation';
import CurrentBroadbandPlan from '../components/Home/CurrentBroadbandPlan';
import CurrentMobilePlan from '../components/Home/CurrentMobilePlan';
import HomePageSpinner from '../components/Common/Spinner/Spinner';
import Confirmation from '../components/Confirmation/ConfirmationModal';
import { request } from '../axios/AxiosHelper';

import './css/UserHomePage.css';
//
const UserHomePage = () => {
  const CouponAddedBoolean = window.sessionStorage.getItem('CouponAdded');
  const [renew, isRenew] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [mobile, setMobile] = useState(null);
  const [newCouponAdded, setCouponss] = useState('');
  const setCouponAdded = () => {
    setCouponss(false);
  };

  const [broadband, setBroadband] = useState(null);

  const getUserInfoFromServer = async () => {
    try {
      const response = await request('GET', '/auth/user');

      setUserInfo(response?.data);
      getSubscriptionInfoFromServer(response?.data);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const getSubscriptionInfoFromServer = async (userI) => {
    let simType = userI.simType;
    simType = simType.split()[0][0].toUpperCase() + simType.slice(1);
    try {
      const response = await request('GET', '/subscriptions');

      // setMobile(response.data[simType]);
      // setBroadband(response.data["Broadband"]);

      let flag1 = 1,
        flag2 = 1;
      for (let i = 0; i < response.data.length; i++) {
        if (flag1 == 2 && flag2 == 2) {
          break;
        }
        if (response.data[i].planType === simType && flag1 == 1) {
          if (flag1 == 2 && flag2 == 2) {
            break;
          }
          if (response.data[i].planType === simType && flag1 == 1) {
            setMobile(response.data[i]);
            if (response.data[i].status == 'Active') {
              flag1 = 2;
            }
          } else if (response.data[i].planType === 'Broadband' && flag2 == 1) {
            setBroadband(response.data[i]);
            if (response.data[i].status == 'Active') {
              flag2 = 2;
            }
          }
          if (response.data[i].status == 'Active') {
            flag1 = 2;
          }
        } else if (response.data[i].planType === 'Broadband' && flag2 == 1) {
          setBroadband(response.data[i]);
          if (response.data[i].status == 'Active') {
            flag2 = 2;
          }
        }
      }
    } catch (error) {
      console.error('Error fetching subscription info:', error);
    }
  };

  const findCurrentSubscription = (subscriptionData, type) => {
    const activeSubscriptions = subscriptionData.filter(
      (sub) => sub.status === 'Active' && sub.plan.planType === type
    );

    if (activeSubscriptions.length > 0) {
      return sortSubscriptionsByPurchasedOn(activeSubscriptions)[
        activeSubscriptions.length - 1
      ];
    } else {
      const expiredSubscriptions = subscriptionData.filter(
        (sub) => sub.status === 'Expired' && sub.plan.planType === type
      );
      if (expiredSubscriptions.length > 0) {
        return sortSubscriptionsByPurchasedOn(expiredSubscriptions)[
          expiredSubscriptions.length - 1
        ];
      }
    }
    return null;
  };

  const sortSubscriptionsByPurchasedOn = (subscriptions) => {
    return [...subscriptions].sort((a, b) => {
      const dateA = new Date(a.purchasedOn);
      const dateB = new Date(b.purchasedOn);
      return dateA - dateB;
    });
  };

  useEffect(() => {
    getUserInfoFromServer();
    // getSubscriptionInfoFromServer();
    const previousTitle = document.title;
    document.title = 'Home Page: Excitel';
    return () => {
      document.title = previousTitle;
    };
  }, [newCouponAdded]);
  const setIsModalOpen = (e) => {
    isRenew(false);
  };
  return (
    <div
      className="home-master"
      style={{ background: 'white', height: '75%', paddingBottom: '15px' }}
    >
      {renew && (
        <Confirmation
          isOpen={renew}
          plan={broadband}
          setIsModalOpen={setIsModalOpen}
          category={'Broadband'}
        />
      )}
      {userInfo != undefined && userInfo.name != undefined ? (
        <>
          <UserHomePageHeader userInfo={userInfo} />

          <div className="home-container">
            {userInfo && (
              <div className="home-top">
                <div className="right">
                  {/* <div className="r-top">
                <UserInformation userInfo={userInfo} />
              </div> */}
                  <div className="r-bottom">
                    {/* <CurrentBroadbandPlan/> */}
                    {/* {broadband==undefined?<>Hi</>:(broadband==null?<CurrentBroadbandPlan broadband={broadband} />:<></>)} */}
                    {broadband == undefined && broadband != null ? (
                      <></>
                    ) : (
                      <CurrentBroadbandPlan
                        broadband={broadband}
                        userInfo={userInfo}
                        isRenew={isRenew}
                      />
                    )}
                  </div>
                </div>
                <div className="home-left">
                  {mobile === undefined && mobile != null ? (
                    <></>
                  ) : (
                    <CurrentMobilePlan
                      mobile={mobile}
                      userInfo={userInfo}
                      setCouponAdded={setCouponAdded}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="home-slider">
            <HomeBannercarousel data-testid="bannercarousel" />
          </div>
        </>
      ) : (
        <HomePageSpinner />
      )}
    </div>
  );
};

export default UserHomePage;

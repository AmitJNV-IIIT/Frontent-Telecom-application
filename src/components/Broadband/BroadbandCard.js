/* eslint-disable*/
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import BroadbandPlanCard from './BroadbandPlanCard';
import './css/BroadbandCard.css';
import '../Broadband/css/BroadbandCard.css';
import '../Broadband/css/BroadbandCardComponent.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import { request } from '../../axios/AxiosHelper';
import Confirmation from '../Confirmation/ConfirmationModal';
//
const BroadbandCard = ({ broadbandPlans, activeBroadbandPlan, isLogin }) => {
  // const [nav1, setNav1] = useState(null);
  // const [currentSlide, setCurrentSlide] = useState(0);
  // const [slider1, setSlider1] = useState(null);

  // currentSlide !== 0 && slider1.innerSlider.slickGoTo(currentSlide); //Hello

  // useEffect(() => {
  //   setNav1(slider1);
  // }, [slider1]);
  const role = window.sessionStorage.getItem('ROLE');
  const [userInfo, setUserInfo] = useState({});
  const [clickedPlan, setPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobile, setMobile] = useState(null);
  const [broadband, setBroadband] = useState([]);
  const navigate = useNavigate();

  const getUserInfoFromServer = async () => {
    try {
      const response = await request('GET', '/auth/user');
      setUserInfo(response?.data);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const getSubscriptionInfoFromServer = async () => {
    try {
      const response = await request('GET', '/broadband/connection/me');

      if (response.status === 'OK') {
        setBroadband(response.broadbandConnection);
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

  useEffect(() => {
    getUserInfoFromServer();
    getSubscriptionInfoFromServer();
  }, []);

  const openModal = (plan) => {
    if (
      role !== '' &&
      broadband.length !== 0 &&
      role !== undefined &&
      role !== '' &&
      role != null
    ) {
      setPlan(plan);

      setIsModalOpen(true);
    } else if (
      role !== '' &&
      broadband.length === 0 &&
      role !== undefined &&
      role != null
    ) {
      setPlan(plan);

      window.sessionStorage.setItem('BroadbandPlan', JSON.stringify(plan));
      setPlan(plan);
      navigate('/broadbandConnection');
    } else {
      navigate('/login');
    }
  };

  const modalHandler = (plan) => {
    openModal(plan);
  };

  const settings = {
    infinite: true,
    speed: 1000,
    lazyLoad: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true
        }
      },
      {
        breakpoint: 908,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true
        }
      }
    ]
  };
  return (
    <div className="carousel-broadband" data-testid="broadband-plan-card">
      <Slider
        {...settings}
        // asNavFor={nav1}
        // ref={(slider) => setSlider1(slider)}
      >
        {broadbandPlans &&
          broadbandPlans.map((broadbandPlan) => {
            return (
              broadbandPlan !== undefined && (
                <div
                  key={broadbandPlan.planId}
                  className="card-broadband"
                  data-testid={`plan-card-${broadbandPlan.planId}`}
                >
                  <BroadbandPlanCard
                    activeBroadbandPlan={activeBroadbandPlan}
                    broadbandPlan={broadbandPlan}
                    modalHandler={modalHandler}
                  />
                </div>
              )
            );
          })}
      </Slider>
      {openModal && (
        <Confirmation
          isOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          plan={clickedPlan}
          category={'Broadband'}
          data-testid="confirmation-modal"
        />
      )}
    </div>
  );
};

export default BroadbandCard;

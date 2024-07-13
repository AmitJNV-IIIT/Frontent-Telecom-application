/* eslint-disable*/

// import React, { useEffect, useState } from "react";
import PostpaidPlanCard from './PostpaidPlanCard';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Confirmation from '../Confirmation/ConfirmationModal';
import '../Confirmation/css/Confirmation.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './css/PostpaidCarousel.css';
import Swal from 'sweetalert2';
import PrepaidDetailsModal from '../Prepaid/PrepaidDetailsModal';

const PostpaidCardCarousel = ({ postpaidPlans, isLogin }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedPlan, setPlan] = useState(null);
  const role = window.sessionStorage.getItem('ROLE');
  const PersonData = JSON.parse(window.sessionStorage.getItem('PersonData'));

  const navigate = useNavigate();
  const openModal = (plan) => {
    if (role !== null && role !== undefined && role !== '') {
      if (PersonData.simType.toLowerCase() === 'prepaid') {
        Swal.fire({
          icon: 'error',
          title: 'Oops You are Prepaid type',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        setPlan(plan);
        setIsModalOpen(true);
      }
    } else {
      navigate('/login', {
        state: { from: '/postpaid', isModalOpen: true, data: plan }
      });
    }
  };

  const modalHandler = (plan) => {
    openModal(plan);
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

  const setDetailsCardVisibility = () => {
    setIsModalOpen(false);
  };
  const settings = {
    infinite: true,
    speed: 1000,
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
    <div
      className="postpaid-carousel-main"
      data-testid="postpaid-carousel-main"
    >
      <Slider
        {...settings}
        // asNavFor={nav1}
        // ref={(slider) => setSlider1(slider)}
      >
        {postpaidPlans.map((postpaidPlan, index) => (
          <div key={index} data-testid="postpaid-carousel-card">
            <PostpaidPlanCard
              postpaidPlan={postpaidPlan}
              modalHandler={modalHandler}
            />
          </div>
        ))}
      </Slider>
      {isModalOpen && (
        <PrepaidDetailsModal
          type={'PostpaidRecharge'}
          plan={clickedPlan}
          getOTTImage={getOTTImage}
          setDetailsCardVisibility={setDetailsCardVisibility}
        />
      )}
    </div>
  );
};

PostpaidCardCarousel.propTypes = {
  postpaidPlans: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default PostpaidCardCarousel;

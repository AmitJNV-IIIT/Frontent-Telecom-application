/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
// import testimonials from "../../data/testimonial-data.json";
import TestimonialCard from './TestimonialCard';
import { request } from '../../axios/AxiosHelper';
import './css/Testimonial.css';
//
const TestimonialCarousel = () => {
  const [review, setReview] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request(
          'GET',
          '/subscriptions/review/dashboard'
        );

        setReview(response);
      } catch (error) {
        setReview([]);
      }
    };

    fetchData();
  }, []);

  const settings = {
    infinite: true,
    speed: 9000,
    slidesToShow: 3,
    lazyLoad: true,
    slidesToScroll: 0.5,
    autoplay: true,
    autoplaySpeed: 0.2,
    cssEase: 'linear',
    arrows: false,
    // waitForAnimate: false,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          autoplay: true,
          autoplaySpeed: 0.5,
          infinite: true,
          cssEase: 'linear',
          pauseOnHover: true
        }
      },
      {
        breakpoint: 908,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplay: true,
          autoplaySpeed: 0.5,
          infinite: true,
          cssEase: 'linear',
          pauseOnHover: true
        }
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          cssEase: 'linear',
          pauseOnHover: true
        }
      }
    ]
  };

  return (
    <div className="testimonial-carousel" data-testid="postpaid-carousel-main">
      <Slider {...settings}>
        {review &&
          review.length != 0 &&
          review.map((testimonial) => (
            <div key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default TestimonialCarousel;

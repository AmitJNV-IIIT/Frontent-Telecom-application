import React, { useEffect, Suspense, useState } from 'react';
import Spinner from '../components/Common/Spinner/Spinner';
import Bannercarousel from '../components/LandingComponent/Bannercarousel';
import Plans from '../components/LandingComponent/Plans';
import Testimonial2 from '../components/LandingComponent/Testimonial2';
import Testimonial from '../components/LandingComponent/Testimonial';
import './css/LandingPage.css';
import TestimonialCarousel from '../components/LandingComponent/TestimonialCarousel';
import Tagline from './../components/LandingComponent/Tagline';

import PrepaidDetailsModal from '../components/Prepaid/PrepaidDetailsModal';
import { useLocation } from 'react-router-dom';
//
function LandingPage() {
  useEffect(() => {
    if (location.state && location.state.data) {
      window.scrollTo(0, (window.innerHeight - 300) / 2);
      setIsRouteFromLoginDirectly(true);
    }
  }, []);
  const getOTTImage = (ottName) => {
    const modifiedName =
      ottName === 'None'
        ? 'spotify'
        : ottName.replace(/\s+/g, '-').toLowerCase();

    let image;
    try {
      image = `https://excitel-bucket.s3.amazonaws.com/${modifiedName}.png`;
    } catch (error) {
      // image = require(`../../assets/images/placeholder.png`).default;
    }
    return image;
  };

  const [isRouteFromLoginDirectly, setIsRouteFromLoginDirectly] =
    useState(false);
  const location = useLocation();

  const setIsRouteFromLoginDirect = () => {
    setIsRouteFromLoginDirectly(false);
  };
  return (
    <div className="landing-body">
      <div className="slider-wrapper" data-testid="landingpage">
        <div className="slider">
          <Bannercarousel data-testid="bannercarousel" />
        </div>
      </div>
      <div className="plans-testimonials-bg">
        <div className="plans-testimonials">
          <h2 className="plans-header">Most Trending Plans</h2>
          <Plans />

          <Testimonial2 />
          <Tagline />
          <h2 style={{ marginTop: '6vh' }} className="plans-header">
            What our clients have to say?
          </h2>
          <TestimonialCarousel />
          <Testimonial />
        </div>
      </div>
      {isRouteFromLoginDirectly && (
        <Suspense fallback={<Spinner />}>
          <PrepaidDetailsModal
            setDetailsCardVisibility={setIsRouteFromLoginDirect}
            plan={location?.state?.data.data[0]}
            getOTTImage={getOTTImage}
            // isLogin={PersonData != '' && PersonData != undefined}
          />
        </Suspense>
      )}
    </div>
  );
}

export default LandingPage;

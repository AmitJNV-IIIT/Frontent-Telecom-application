import React from 'react';
import OfficeCard from './OfficeCard';
import Slider from 'react-slick';
import './css/OfficeCard.css';

const Offices = ({ locations }) => {
  if (!locations || locations.length === 0) {
    return <div className="error-message">Cannot load office details :</div>;
  }

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
          infinite: true,
          dots: true
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
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="carousel-office">
      <Slider {...settings}>
        {locations.map((location) => (
          <div
            key={location.OfficeID}
            className="office-card-1"
            data-testid="office-card"
          >
            <OfficeCard location={location} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Offices;

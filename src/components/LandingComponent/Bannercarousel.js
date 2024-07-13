import React from 'react';
import Carousel from 'react-material-ui-carousel';
import Item from './Item';
import slider from '../../data/slider.json'; // Assuming local data for now
import './css/BannerCarousel.css';

function Carousels() {
  return (
    <div className="banner-carousel-container">
      <Carousel className="banner-carousel-component">
        {slider.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </Carousel>
    </div>
  );
}
export default Carousels;

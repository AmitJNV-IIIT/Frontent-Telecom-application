/*eslint-disable*/

import './css/Item.css';
import PropTypes from 'prop-types';
import SkeletonLoader from '../Common/Loader/SkeletonLoader';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import banner1 from '../../assets/images/banner/1.webp';
import homebanner1 from '../../assets/images/banner/1_home.png';
import banner2 from '../../assets/images/banner/2.webp';
import homebanner2 from '../../assets/images/banner/2_home.png';
import banner3 from '../../assets/images/banner/3.webp';
import banner4 from '../../assets/images/banner/4.webp';
import banner1mobile from '../../assets/images/banner/1_mob.webp';
import homebanner1mobile from '../../assets/images/banner/1_home_mob.jpg';
import banner2mobile from '../../assets/images/banner/2_mob.webp';
import homebanner2mobile from '../../assets/images/banner/2_home_mob.jpg';
import banner3mobile from '../../assets/images/banner/3_mob.webp';
import banner4mobile from '../../assets/images/banner/4_mob.webp';

function Item(props) {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const preloadLink = document.createElement('link');
    preloadLink.href = props.item.image;
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';

    document.head.appendChild(preloadLink);
    return () => {
      document.head.removeChild(preloadLink);
    };
  }, [props.item.image]);

  return (
    <div>
      {isLoading && <SkeletonLoader />}
      <img
        src={
          props.item.name === 'banner1'
            ? banner1
            : props.item.name === 'banner2'
              ? banner2
              : props.item.name === 'banner3'
                ? banner3
                : props.item.name === 'banner4'
                  ? banner4
                  : props.item.name === 'home_banner1'
                    ? homebanner1
                    : props.item.name === 'home_banner2'
                      ? homebanner2
                      : props.item.image
        }
        alt="banner-image"
        onLoad={handleImageLoaded}
        onError={handleImageError}
        className={isLoading ? 'loading' : 'banner-image'}
      />
      <img
        src={
          props.item.name === 'banner1'
            ? banner1mobile
            : props.item.name === 'banner2'
              ? banner2mobile
              : props.item.name === 'banner3'
                ? banner3mobile
                : props.item.name === 'banner4'
                  ? banner4mobile
                  : props.item.name === 'home_banner1'
                    ? homebanner1mobile
                    : props.item.name === 'home_banner2'
                      ? homebanner2mobile
                      : props.item.image
        }
        alt="banner-image"
        onLoad={handleImageLoaded}
        onError={handleImageError}
        className={isLoading ? 'loading' : 'banner-image-mobile'}
      />
      <div className={props.item.className}>
        <h1>{props.item.header}</h1>
        <p dangerouslySetInnerHTML={{ __html: props.item.paragraph }} />
        <Link to={'/' + props.item.navigate}>
          <button>{props.item.button}</button>
        </Link>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string.isRequired
  }).isRequired
};

export default Item;

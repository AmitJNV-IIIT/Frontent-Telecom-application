import React from 'react';
// import search from "../../assets/svg/search.svg";
import rightArrow from '../assets/svg/rightArrow.svg';
// import pageNotFoundBanner from "../../src/assets/images/pageNotFound.jpg";
import './css/Error.css';
//
const Error = () => {
  return (
    <div className="error-container">
      <div className="top-div">
        <span className="error-span">404 ERROR!</span>
        <h1 className="error-heading">We lost this page</h1>
      </div>
      <div className="content-div">
        <div className="content-left">
          <p className="error-message">
            <p>Sorry,</p>
            <p>The page you are looking for</p>
            <p>Doesn't exist.</p>
          </p>
        </div>
        <div className="content-right">
          <div className="content-item">
            <p>
              Upgrade Your Experience <img src={rightArrow} alt="arrow-icon" />
            </p>
            <p className="item-description">
              Discover new features and enhancements.
            </p>
          </div>
          <div className="content-item">
            <p>
              Stay Connected <img src={rightArrow} alt="arrow-icon" />
            </p>
            <p className="item-description">
              Connect with us to stay updated on our latest news.
            </p>
          </div>
          <div className="content-item">
            <p>
              Exclusive Offers <img src={rightArrow} alt="arrow-icon" />
            </p>
            <p className="item-description">
              Unlock special deals available only for you.
            </p>
          </div>
        </div>
      </div>
      <div className="bottom-div">
        <div>
          <a href="/">
            {/* <span className="goto-home">Goto Home page</span> */}
            <img
              className="goto-home"
              alt="GO TO HOME"
              src={require(`../assets/images/house.png`)}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Error;

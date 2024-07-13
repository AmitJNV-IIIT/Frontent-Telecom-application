/* eslint-disable */

import React from 'react';
import cardImage from '../../assets/images/broadbandCardImage.png';
import cardImage2 from '../../assets/images/broadband_excitel.png';
import cardImage3 from '../../assets/images/broadband_expressway.png';
import cardImage4 from '../../assets/images/broadband_playtime.png';
import cardImage5 from '../../assets/images/broadband_velocity.png';

import checklogo from '../../assets/images/check.png';
import '../Broadband/css/BroadbandCardComponent.css';
// import "../Broadband/css/BroadbandCard.css"

const BroadbandPlanCard = ({
  broadbandPlan,
  activeBroadbandPlan,
  modalHandler
}) => {
  const getCategoryFromValidity = (validity) => {
    if (validity === '28') {
      return 'Monthly';
    } else if (validity === '56') {
      return 'Bi-Monthly';
    } else if (validity === '84') {
      return 'Quarterly';
    } else if (validity === '180') {
      return 'Semi Annual';
    } else if (validity === '365') {
      return 'Annual';
    } else {
      return 'Custom';
    }
  };

  const clickHandler = (plan) => {
    modalHandler(plan);
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
      // image = require(`../../assets/images/placeholder.png`).default;
    }
    return image;
  };
  const getCardImage = (validity) => {
    if (validity === '28') {
      return cardImage2;
    } else if (validity === '56') {
      return cardImage3;
    } else if (validity === '84') {
      return cardImage3;
    } else if (validity === '180') {
      return cardImage4;
    } else if (validity === '365') {
      return cardImage5;
    } else {
      return cardImage; // Default image
    }
  };

  return (
    <div>
      {/* {activeBroadbandPlan &&
      activeBroadbandPlan.planId === broadbandPlan.planID ? (
        <img
          src={checklogo}
          style={{
            position: "absolute",
            zIndex: "1",
            width: "42px",
            height: "42px",
          }}
        />
      ) : (
        ""
      )} */}
      <img
        src={getCardImage(broadbandPlan.validity)}
        alt="card"
        className="card-img"
        // style={{ position: "relative" }}
      />

      <h2 className="broadband-card-title ">
        <span>{getCategoryFromValidity(broadbandPlan.validity)}</span>
      </h2>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          textAlign: 'left'
        }}
      >
        <div className="card-descritption">
          <p>
            <span className="tick">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="20px"
                height="20px"
                fill="#B5B5BA"
              >
                <path d="M 25 2 C 12.317 2 2 12.317 2 25 C 2 37.683 12.317 48 25 48 C 37.683 48 48 37.683 48 25 C 48 20.44 46.660281 16.189328 44.363281 12.611328 L 42.994141 14.228516 C 44.889141 17.382516 46 21.06 46 25 C 46 36.579 36.579 46 25 46 C 13.421 46 4 36.579 4 25 C 4 13.421 13.421 4 25 4 C 30.443 4 35.393906 6.0997656 39.128906 9.5097656 L 40.4375 7.9648438 C 36.3525 4.2598437 30.935 2 25 2 z M 43.236328 7.7539062 L 23.914062 30.554688 L 15.78125 22.96875 L 14.417969 24.431641 L 24.083984 33.447266 L 44.763672 9.046875 L 43.236328 7.7539062 z" />
              </svg>
            </span>{' '}
            Unlimited Internet
          </p>
          <p>
            <span className="tick">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="20px"
                height="20px"
                fill="#B5B5BA"
              >
                <path d="M 25 2 C 12.317 2 2 12.317 2 25 C 2 37.683 12.317 48 25 48 C 37.683 48 48 37.683 48 25 C 48 20.44 46.660281 16.189328 44.363281 12.611328 L 42.994141 14.228516 C 44.889141 17.382516 46 21.06 46 25 C 46 36.579 36.579 46 25 46 C 13.421 46 4 36.579 4 25 C 4 13.421 13.421 4 25 4 C 30.443 4 35.393906 6.0997656 39.128906 9.5097656 L 40.4375 7.9648438 C 36.3525 4.2598437 30.935 2 25 2 z M 43.236328 7.7539062 L 23.914062 30.554688 L 15.78125 22.96875 L 14.417969 24.431641 L 24.083984 33.447266 L 44.763672 9.046875 L 43.236328 7.7539062 z" />
              </svg>
            </span>{' '}
            Upto {broadbandPlan.speed} Mbps speed
          </p>
          <p>
            <span className="tick">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="20px"
                height="20px"
                fill="#B5B5BA"
              >
                <path d="M 25 2 C 12.317 2 2 12.317 2 25 C 2 37.683 12.317 48 25 48 C 37.683 48 48 37.683 48 25 C 48 20.44 46.660281 16.189328 44.363281 12.611328 L 42.994141 14.228516 C 44.889141 17.382516 46 21.06 46 25 C 46 36.579 36.579 46 25 46 C 13.421 46 4 36.579 4 25 C 4 13.421 13.421 4 25 4 C 30.443 4 35.393906 6.0997656 39.128906 9.5097656 L 40.4375 7.9648438 C 36.3525 4.2598437 30.935 2 25 2 z M 43.236328 7.7539062 L 23.914062 30.554688 L 15.78125 22.96875 L 14.417969 24.431641 L 24.083984 33.447266 L 44.763672 9.046875 L 43.236328 7.7539062 z" />
              </svg>
            </span>{' '}
            Unlimited calls Local/STD
          </p>
          <p>
            <span className="tick">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="20px"
                height="20px"
                fill="#B5B5BA"
              >
                <path d="M 25 2 C 12.317 2 2 12.317 2 25 C 2 37.683 12.317 48 25 48 C 37.683 48 48 37.683 48 25 C 48 20.44 46.660281 16.189328 44.363281 12.611328 L 42.994141 14.228516 C 44.889141 17.382516 46 21.06 46 25 C 46 36.579 36.579 46 25 46 C 13.421 46 4 36.579 4 25 C 4 13.421 13.421 4 25 4 C 30.443 4 35.393906 6.0997656 39.128906 9.5097656 L 40.4375 7.9648438 C 36.3525 4.2598437 30.935 2 25 2 z M 43.236328 7.7539062 L 23.914062 30.554688 L 15.78125 22.96875 L 14.417969 24.431641 L 24.083984 33.447266 L 44.763672 9.046875 L 43.236328 7.7539062 z" />
              </svg>
            </span>{' '}
            {broadbandPlan?.validity} days validity
          </p>
        </div>
      </div>
      <div className="price-btn">
        <button
          className="broadband-card-price-btn"
          onClick={() => clickHandler(broadbandPlan)}
        >
          ₹{broadbandPlan.price}
        </button>
        <div>
          <div className="ott-section">
            <div className="ott-container">
              <div className="ott-logos">
                {broadbandPlan.ott.map((ott, index) => (
                  <img
                    key={index}
                    // src={require(`../../assets/images/${ott.toLowerCase()}.png`)}
                    src={getOTTImage(ott)}
                    alt={ott}
                    className="ott-img"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BroadbandPlanCard;

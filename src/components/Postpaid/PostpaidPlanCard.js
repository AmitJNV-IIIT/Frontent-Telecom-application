import React from 'react';
// import PropTypes from "prop-types";
import './css/PostpaidPlanCard.css';
//
const PostpaidPlanCard = ({ postpaidPlan, modalHandler }) => {
  const clickHandler = (plan) => {
    modalHandler(plan);
  };
  return (
    <div>
      <div className="postpaid-carousel-card">
        <div>
          <div className="postpaid-text-main">
            <p className="postpaid-card-main-heading">Postpaid</p>
            <p className="postpaid-card-main-heading">Special Package</p>
            <p className="postpaid-card-desc-heading">
              Ideal for work seeking a complete branding <br></br>
              branding and converting officials.
            </p>
          </div>

          <div>
            <button
              className="postpaid-card-price-btn"
              onClick={() => clickHandler(postpaidPlan)}
            >
              ₹{postpaidPlan.price}
            </button>
          </div>

          <div className="postpaid-card-divider"></div>

          <div className="postpaid-plan-details-div">
            <p className="postpaid-card-mid-section-heading">What you get:</p>

            <p className="postpaid-card-mid-section-details">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="20px"
                height="20px"
                fill="#B5B5BA"
              >
                <path d="M 25 2 C 12.317 2 2 12.317 2 25 C 2 37.683 12.317 48 25 48 C 37.683 48 48 37.683 48 25 C 48 20.44 46.660281 16.189328 44.363281 12.611328 L 42.994141 14.228516 C 44.889141 17.382516 46 21.06 46 25 C 46 36.579 36.579 46 25 46 C 13.421 46 4 36.579 4 25 C 4 13.421 13.421 4 25 4 C 30.443 4 35.393906 6.0997656 39.128906 9.5097656 L 40.4375 7.9648438 C 36.3525 4.2598437 30.935 2 25 2 z M 43.236328 7.7539062 L 23.914062 30.554688 L 15.78125 22.96875 L 14.417969 24.431641 L 24.083984 33.447266 L 44.763672 9.046875 L 43.236328 7.7539062 z" />
              </svg>
              {postpaidPlan.data} GB/ Day
            </p>

            <p className="postpaid-card-mid-section-details">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="20px"
                height="20px"
                fill="#B5B5BA"
              >
                <path d="M 25 2 C 12.317 2 2 12.317 2 25 C 2 37.683 12.317 48 25 48 C 37.683 48 48 37.683 48 25 C 48 20.44 46.660281 16.189328 44.363281 12.611328 L 42.994141 14.228516 C 44.889141 17.382516 46 21.06 46 25 C 46 36.579 36.579 46 25 46 C 13.421 46 4 36.579 4 25 C 4 13.421 13.421 4 25 4 C 30.443 4 35.393906 6.0997656 39.128906 9.5097656 L 40.4375 7.9648438 C 36.3525 4.2598437 30.935 2 25 2 z M 43.236328 7.7539062 L 23.914062 30.554688 L 15.78125 22.96875 L 14.417969 24.431641 L 24.083984 33.447266 L 44.763672 9.046875 L 43.236328 7.7539062 z" />
              </svg>
              Internet available broadwise
            </p>

            <p className="postpaid-card-mid-section-details">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="20px"
                height="20px"
                fill="#B5B5BA"
              >
                <path d="M 25 2 C 12.317 2 2 12.317 2 25 C 2 37.683 12.317 48 25 48 C 37.683 48 48 37.683 48 25 C 48 20.44 46.660281 16.189328 44.363281 12.611328 L 42.994141 14.228516 C 44.889141 17.382516 46 21.06 46 25 C 46 36.579 36.579 46 25 46 C 13.421 46 4 36.579 4 25 C 4 13.421 13.421 4 25 4 C 30.443 4 35.393906 6.0997656 39.128906 9.5097656 L 40.4375 7.9648438 C 36.3525 4.2598437 30.935 2 25 2 z M 43.236328 7.7539062 L 23.914062 30.554688 L 15.78125 22.96875 L 14.417969 24.431641 L 24.083984 33.447266 L 44.763672 9.046875 L 43.236328 7.7539062 z" />
              </svg>
              Unlimited Calls
            </p>

            <p className="postpaid-card-mid-section-details">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="20px"
                height="20px"
                fill="#B5B5BA"
              >
                <path d="M 25 2 C 12.317 2 2 12.317 2 25 C 2 37.683 12.317 48 25 48 C 37.683 48 48 37.683 48 25 C 48 20.44 46.660281 16.189328 44.363281 12.611328 L 42.994141 14.228516 C 44.889141 17.382516 46 21.06 46 25 C 46 36.579 36.579 46 25 46 C 13.421 46 4 36.579 4 25 C 4 13.421 13.421 4 25 4 C 30.443 4 35.393906 6.0997656 39.128906 9.5097656 L 40.4375 7.9648438 C 36.3525 4.2598437 30.935 2 25 2 z M 43.236328 7.7539062 L 23.914062 30.554688 L 15.78125 22.96875 L 14.417969 24.431641 L 24.083984 33.447266 L 44.763672 9.046875 L 43.236328 7.7539062 z" />
              </svg>
              Custome Web Design
            </p>

            <div>
              <p className="postpaid-card-mid-section-details">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="20px"
                  height="20px"
                  fill="#B5B5BA"
                >
                  <path d="M 25 2 C 12.317 2 2 12.317 2 25 C 2 37.683 12.317 48 25 48 C 37.683 48 48 37.683 48 25 C 48 20.44 46.660281 16.189328 44.363281 12.611328 L 42.994141 14.228516 C 44.889141 17.382516 46 21.06 46 25 C 46 36.579 36.579 46 25 46 C 13.421 46 4 36.579 4 25 C 4 13.421 13.421 4 25 4 C 30.443 4 35.393906 6.0997656 39.128906 9.5097656 L 40.4375 7.9648438 C 36.3525 4.2598437 30.935 2 25 2 z M 43.236328 7.7539062 L 23.914062 30.554688 L 15.78125 22.96875 L 14.417969 24.431641 L 24.083984 33.447266 L 44.763672 9.046875 L 43.236328 7.7539062 z" />
                </svg>
                {postpaidPlan?.validity} Days validity
              </p>
            </div>

            <div>
              <p className="postpaid-card-feature">
                {' '}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_325_1016)">
                    <mask
                      id="mask0_325_1016"
                      style={{ maskType: 'luminance' }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="12"
                      height="12"
                    >
                      <path
                        d="M11.6931 0.867676H0.616211V11.9446H11.6931V0.867676Z"
                        fill="white"
                      />
                    </mask>
                    <g mask="url(#mask0_325_1016)">
                      <path
                        d="M3.12064 11.3729V9.06703M2.70275 3.74534V1.43945M1.5498 2.59239H3.85569M1.9677 10.22H4.27358"
                        stroke="#D782FF"
                        strokeWidth="0.999219"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.10817 2.67334L7.81095 4.50054C7.92523 4.79768 7.98237 4.94626 8.07124 5.07123C8.14999 5.18199 8.24676 5.27875 8.35752 5.35751C8.48249 5.44637 8.63106 5.50351 8.9282 5.6178L10.7554 6.32057L8.9282 7.02335C8.63106 7.13763 8.48249 7.19477 8.35752 7.28363C8.24676 7.36239 8.14999 7.45916 8.07124 7.56992C7.98237 7.69489 7.92523 7.84346 7.81095 8.14059L7.10817 9.96784L6.4054 8.14059C6.29112 7.84346 6.23397 7.69489 6.14512 7.56992C6.06636 7.45916 5.96958 7.36239 5.85882 7.28363C5.73386 7.19477 5.58529 7.13763 5.28815 7.02335L3.46094 6.32057L5.28815 5.6178C5.58529 5.50351 5.73386 5.44637 5.85882 5.35751C5.96958 5.27875 6.06636 5.18199 6.14511 5.07123C6.23397 4.94625 6.29111 4.79768 6.4054 4.50054L7.10817 2.67334Z"
                        fill="#D782FF"
                        stroke="#D782FF"
                        strokeWidth="0.999219"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_325_1016">
                      <rect
                        width="12"
                        height="12"
                        fill="white"
                        transform="translate(0 0.506348)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                High-Converting data plan
              </p>
            </div>

            <div className="postpaid-card-divider"></div>
            <div>
              <p className="postpaid-card-footer">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.2315 0.875864L12.3946 1.74651C12.7127 1.98463 13.0476 2.10649 13.4444 2.12858L14.8949 2.20927C15.7636 2.25757 16.4691 2.84951 16.6674 3.69658L16.9989 5.11117C17.0894 5.49804 17.2676 5.80663 17.5574 6.07854L18.6167 7.07284C19.2511 7.66819 19.411 8.57512 19.0185 9.35155L18.3631 10.6481C18.1839 11.0028 18.122 11.3537 18.1691 11.7482L18.3416 13.1908C18.4449 14.0547 17.9844 14.8522 17.1847 15.1947L15.8491 15.7666C15.4839 15.923 15.2109 16.1521 14.9934 16.4846L14.1982 17.7005C13.7221 18.4286 12.8566 18.7436 12.0239 18.492L10.6332 18.0717C10.2529 17.9567 9.8965 17.9567 9.51614 18.0717L8.12543 18.492C7.29264 18.7436 6.42729 18.4286 5.95114 17.7005L5.15593 16.4846C4.93841 16.1521 4.66547 15.923 4.30024 15.7666L2.96458 15.1946C2.16489 14.8521 1.70443 14.0545 1.80767 13.1908L1.98012 11.7481C2.02728 11.3536 1.96539 11.0027 1.78615 10.648L1.13072 9.35148C0.738286 8.57505 0.898179 7.66812 1.53251 7.07276L2.5919 6.07846C2.88164 5.80655 3.05977 5.49797 3.15039 5.1111L3.48178 3.69651C3.68017 2.84947 4.38566 2.25754 5.25429 2.20919L6.70489 2.1285C7.10164 2.10645 7.4365 1.98455 7.75457 1.74644L8.91771 0.875786C9.61414 0.354543 10.5351 0.354543 11.2315 0.875864Z"
                    fill="url(#paint0_linear_325_934)"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.2323 0.87583L12.3954 1.74647C12.7135 1.98459 13.0483 2.10644 13.445 2.12854L14.8957 2.20923C15.7643 2.25753 16.4698 2.84947 16.6682 3.69654L16.9995 5.11114C17.0902 5.49801 17.2683 5.80659 17.5581 6.0785L18.6175 7.07279C19.2518 7.66814 19.4117 8.57507 19.0193 9.3515L18.3638 10.6481C18.1846 11.0027 18.1227 11.3536 18.1699 11.7481L18.3423 13.1908C18.4455 14.0546 17.9851 14.8521 17.1854 15.1946L15.8498 15.7666C15.4845 15.9231 15.2116 16.1521 14.9941 16.4846L14.1989 17.7006C13.7588 18.3736 12.986 18.6936 12.2139 18.5393C12.703 18.4397 13.143 18.1483 13.4359 17.7006L14.2311 16.4846C14.4485 16.1521 14.7215 15.923 15.0868 15.7666L16.4223 15.1946C17.2221 14.8521 17.6825 14.0546 17.5793 13.1908L17.4068 11.7481C17.3597 11.3536 17.4215 11.0027 17.6008 10.6481L18.2562 9.3515C18.6487 8.57514 18.4888 7.66814 17.8544 7.07279L16.795 6.0785C16.5053 5.80659 16.3272 5.49801 16.2365 5.11114L15.9051 3.69654C15.7068 2.84952 15.0013 2.25757 14.1326 2.20923L12.682 2.12854C12.2853 2.10649 11.9504 1.98459 11.6323 1.74647L10.4692 0.87583C10.231 0.697538 9.96654 0.580259 9.69383 0.523909C10.2185 0.415516 10.774 0.532795 11.2323 0.87583ZM9.69383 18.026C9.63419 18.0386 9.57519 18.0539 9.51683 18.0716L8.12611 18.4919C7.80547 18.5887 7.48004 18.6015 7.17383 18.5392C7.23761 18.5264 7.30076 18.5106 7.36297 18.4919L8.75376 18.0716C9.07461 17.9746 9.37833 17.9594 9.69383 18.026Z"
                    fill="#090A18"
                    fillOpacity="0.2"
                  />
                  <path
                    opacity="0.12"
                    d="M14.2716 13.7275C16.5891 11.4099 16.5891 7.65229 14.2714 5.33479C11.9538 3.01725 8.19627 3.01732 5.87873 5.33493C3.5612 7.65258 3.56127 11.4101 5.87888 13.7276C8.19649 16.0451 11.9541 16.0451 14.2716 13.7275Z"
                    fill="#090A18"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.0751 3.59668C10.2034 3.59668 10.3305 3.60122 10.4566 3.60923C7.35693 3.80599 4.90368 6.38187 4.90368 9.53122C4.90368 12.6805 7.357 15.2564 10.4566 15.4532C10.3305 15.4612 10.2034 15.4657 10.0751 15.4657C6.79759 15.4657 4.14063 12.8088 4.14063 9.53122C4.14058 6.25368 6.79755 3.59668 10.0751 3.59668Z"
                    fill="#090A18"
                    fillOpacity="0.2"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.33321 10.0297L12.0801 7.2554C12.4052 6.92705 12.9357 6.92604 13.2631 7.25176C13.5905 7.57733 13.5916 8.10626 13.2668 8.43404C12.1529 9.55826 11.0465 10.6899 9.9275 11.8089C9.60036 12.136 9.06971 12.136 8.74257 11.8089L6.88599 9.9524C6.55884 9.62526 6.55884 9.09462 6.88599 8.76747C7.21314 8.44026 7.74386 8.44026 8.07093 8.76747L9.33321 10.0297Z"
                    fill="white"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_325_934"
                      x1="3.79921"
                      y1="15.6629"
                      x2="15.9346"
                      y2="2.7605"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#38B7FF" />
                      <stop offset="1" stopColor="#D782FF" />
                    </linearGradient>
                  </defs>
                </svg>
                Get Excitel movies for free for 30 days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// PostpaidPlanCard.propTypes = {
//   postpaidPlan: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     price: PropTypes.number.isRequired,
//     data: PropTypes.string.isRequired,
//     validity: PropTypes.number.isRequired,
//   }).isRequired,
// };

export default PostpaidPlanCard;

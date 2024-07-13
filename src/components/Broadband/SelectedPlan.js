import React from 'react';
import cardImage from '../../assets/images/broadbandCardImage.png';
import { Card, Typography, Container, CardContent } from '@mui/material';
import Swal from 'sweetalert2';
//
const SelectedPlan = () => {
  const selectedPlan = JSON.parse(
    window.sessionStorage.getItem('BroadbandPlan')
  );

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

  return (
    <Container maxWidth="sm" className="container">
      <Typography variant="h4" className="customTypography">
        <b>Selected Plan</b>
      </Typography>
      <Card style={{ backgroundColor: 'black' }} sx={{ borderRadius: '15px' }}>
        <CardContent>
          <img
            src={cardImage}
            alt="card"
            className="card-img"
            style={{ marginTop: '20px' }}
          />
          <h2 className="card-title">
            <span>Plan</span>
          </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
              textAlign: 'left'
            }}
          >
            <div
              style={{
                height: '30vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly'
              }}
              className="card-descritption"
            >
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
                <p>Upto {selectedPlan?.speed} Mbps speed</p>
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
                <p>{selectedPlan?.validity} days validity</p>
              </p>
            </div>
          </div>
          <div className="price-btn">
            {selectedPlan && (
              <button className="broadband-card-price-btn">
                ₹{selectedPlan.price}
              </button>
            )}
            <div>
              <div className="ott-section">
                <div className="ott-container">
                  <div className="ott-logos">
                    {selectedPlan &&
                      selectedPlan.ott.map((ott, index) => (
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
        </CardContent>
      </Card>
    </Container>
  );
};

export default SelectedPlan;

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import './css/Item.css';
//
const Tagline = () => {
  const navigate = useNavigate();
  const seePlansClickHandler = () => {
    window.scrollTo(0, 0);
    navigate('/prepaid');
  };

  return (
    <Card style={{ marginTop: '5vh' }} className="custom-card">
      <CardContent
        style={{ background: 'aliceblue' }}
        className="card-content card-content-qr "
      >
        <Typography
          variant="h5"
          component="div"
          style={{ color: 'black' }}
          className="centered-text white-text1"
        >
          Your internet is not just a goal,
        </Typography>

        <Typography
          variant="h5"
          component="div"
          className="centered-text purple-gradient white-text1"
        >
          it&apos;s our top priority
        </Typography>

        <br />
        <Typography
          className="text-section-tagline"
          style={{ color: 'black', textAlign: 'center' }}
        >
          Explore our premier plans tailored for dedicated network access and
          optimal bandwidth.
        </Typography>
        <Typography
          className="text-section-tagline"
          style={{ color: 'black', textAlign: 'center' }}
        >
          Experience unparalleled connectivity with us today!
        </Typography>
        <br />

        <Typography
          className="text-section-tagline"
          style={{ paddingBottom: '3vh' }}
        >
          <Button
            className="button-container"
            style={{
              alignSelf: 'center',
              background: 'linear-gradient(to bottom right, #0080ff, #8000ff)', // Gradient background color
              color: '#ffffff', // White text color
              borderRadius: '14px',
              fontSize: '14px',
              height: '40px',
              width: '150px'
            }}
            onClick={seePlansClickHandler}
          >
            See all plans
          </Button>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Tagline;

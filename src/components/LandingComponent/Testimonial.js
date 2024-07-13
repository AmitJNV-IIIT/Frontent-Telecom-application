import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './css/Testimonial.css'; // Assuming you have your CSS styles defined here
import baseimg from '../../assets/images/Base.png'; // Assuming this is your image path
// import Tagline from "./Tagline";
import { useNavigate } from 'react-router-dom';
import QR from '../../assets/images/qr-code.png';
//
export default function Testimonial() {
  const navigate = useNavigate();
  const faqNavClickHandler = () => {
    window.scrollTo(0, 0);
    navigate('/support');
  };
  return (
    <div className="testimonial-wrapper" data-testid="testimonial">
      <React.Fragment>
        {/* First Card */}

        {/* Add space between cards */}
        {/* Second Card */}
        <Card className="custom-card-1">
          <CardContent
            style={{ display: 'flex', marginBottom: '1vh' }}
            className="card-content-qr"
          >
            {/* Left part containing the button */}
            <div
              style={{ flex: 1, marginTop: 12, padding: '4%' }}
              className="assistance-wrapper"
            >
              <Typography
                variant="h3"
                component="div"
                style={{ fontSize: '30px', fontWeight: 'bold' }}
                className="assistance-text-head"
              >
                Let Excitel help you
              </Typography>
              <br />
              <Typography
                variant="h4"
                component="div"
                style={{ fontSize: '23px' }}
                className="assistance-text"
              >
                Connect with us to receive supportive guidance from Excitel.
              </Typography>
              <br />
              {/* Button with light blue background and centered */}
              <Button
                className="button-container1"
                style={{
                  alignSelf: 'center',
                  background: 'linear-gradient(to left,#6619ED, #1A7EE8)',
                  color: '#fff',
                  borderRadius: '18px',
                  padding: '10px 20px',
                  fontSize: '15px'
                }}
                onClick={faqNavClickHandler}
              >
                Connect for assistance
              </Button>
            </div>
            {/* Right part containing the image */}
            <div className="assistance-image">
              <img
                className="assistance-image-under"
                src={baseimg}
                alt="Excitel Assistance"
                loading="lazy"
                style={{ height: 'auto' }}
              />
            </div>
          </CardContent>
        </Card>
        <Card style={{ marginTop: '5vh' }} className="custom-card-scan">
          <CardContent
            style={{
              display: 'flex',
              backgroundColor: '#110e0e',
              color: 'white'
            }}
            className="card-content-qr"
          >
            {/* Left part containing the image */}
            <div
              style={{ margin: 'auto', padding: '4%' }}
              className="image-container"
            >
              <div>
                <img
                  className="assistance-image-under"
                  src={QR}
                  alt="Excitel Assistance"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '30vh',
                    padding: '3%'
                  }}
                />
              </div>
            </div>

            {/* Right part containing the text */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '0 4%',
                textAlign: 'right'
              }}
              className="text-container"
            >
              <Typography
                variant="h3"
                component="div"
                style={{ fontSize: '30px', fontWeight: 'bold' }}
                className="assistance-text"
              >
                Scan the QR and get the Excitel experience
              </Typography>
              <br />
              <Typography
                variant="h4"
                component="div"
                style={{ fontSize: '23px' }}
                className="assistance-text"
              >
                Get the link and connect with us directly through your mobile
                and tablets.
              </Typography>
              <br />
            </div>
          </CardContent>
        </Card>
      </React.Fragment>
    </div>
  );
}

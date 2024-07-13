import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './css/Testimonial.css';
import logo from '../../assets/images/couponlogo.png';
//
export default function Testimonial2() {
  return (
    <React.Fragment>
      <Card
        className="custom-card-normal"
        style={{ marginTop: '5vh' }}
        data-testid="testimonial2"
      >
        <CardContent className="card-content">
          <CardMedia
            className="testimonial-card-section"
            component="img"
            image={logo}
            alt="Your Image"
          />
          <Typography variant="h6" color="white" align="center" component="div">
            <h2 style={{ backgroundColor: 'transparent' }}>
              Get Spell Guarantee -{' '}
              <span
                style={{
                  backgroundImage:
                    'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                No Risk On You
              </span>
            </h2>
          </Typography>
          <Typography
            variant="body2"
            color="white"
            align="center"
            component="div"
          >
            <h3 className="text-section-testimonial">
              If our network and speed wizardry doesn&apost cast its spell on
              you in 2 weeks, We will conjure up a full refund
            </h3>
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

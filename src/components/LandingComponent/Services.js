import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './css/Services.css'; // Importing the CSS file
import firstServiceImage from '../../assets/images/service_img1.png';
import SecondServiceImage from '../../assets/images/service_img2.jpg';
import ThirdServiceImage from '../../assets/images/service_img3.jpg';
import FourthServiceImage from '../../assets/images/service_img4.webp';
//
export default function Services() {
  return (
    <Card className="services-card" data-testid="services-card">
      <CardContent>
        <div className="services-grid">
          <div className="services-column" data-testid="service1">
            <div
              className="service-wrapper"
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <img
                src={firstServiceImage}
                alt="First Service"
                className="service-image"
                style={{ maxWidth: '100px', maxHeight: '200px' }}
              />
            </div>
            <Typography
              variant="h6"
              component="div"
              style={{ textAlign: 'center' }}
            >
              <h3>
                Here are frequently asked question.Might help you as well.
              </h3>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {/* Description of service 3 */}
            </Typography>
          </div>
          <div className="services-column" data-testid="service2">
            <Typography
              variant="h6"
              component="div"
              style={{ textAlign: 'center' }}
            >
              <h3>Customer Support</h3>
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ textAlign: 'center' }}
            >
              {/* Description of service 2 */}
              <h3>24/7 Availability</h3>
              <h3>Focus on User Satisfaction</h3>
              <h3>Dedicated Assistance</h3>
              <h3>Excellence in Service</h3>
            </Typography>
            <div
              className="service-wrapper"
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <img
                src={SecondServiceImage}
                alt="First Service"
                className="service-image"
                style={{ maxWidth: '100px', maxHeight: '200px' }}
              />
            </div>
          </div>
          <div className="services-column" data-testid="service3">
            <div
              className="service-wrapper"
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <img
                src={ThirdServiceImage}
                alt="First Service"
                className="service-image"
                style={{ maxWidth: '100px', maxHeight: '200px' }}
              />
            </div>
            <Typography
              variant="h6"
              component="div"
              style={{ textAlign: 'center' }}
            >
              <h3>Website</h3>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {/* Description of service 3 */}
            </Typography>
          </div>
          <div className="services-column" data-testid="service4">
            <Typography
              variant="h6"
              component="div"
              style={{ textAlign: 'center' }}
            >
              <h3> Unlock Rewards & Discover Surprises!</h3>
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ textAlign: 'center' }}
            >
              {/* Description of service 2 */}
              <h3>
                Engage with our interactive features to unlock exciting rewards
                and offers!
              </h3>
              <h3>
                {' '}
                discover hidden surprises while managing your recharge needs
              </h3>
            </Typography>
            <div
              className="service-wrapper"
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <img
                src={FourthServiceImage}
                alt="First Service"
                className="service-image"
                style={{ maxWidth: '100px', maxHeight: '200px' }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

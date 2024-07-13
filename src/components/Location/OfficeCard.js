import React from 'react';
import './css/OfficeCard.css';
import { LocationOn } from '@mui/icons-material';

import PublicIcon from '@mui/icons-material/Public';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CallIcon from '@mui/icons-material/Call';

const OfficeCard = ({ location }) => {
  const formatPhoneNumber = (phoneNumber) => {
    return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(
      3,
      7
    )} ${phoneNumber.slice(7)}`;
  };

  const openGoogleMaps = () => {
    window.open(location.GoogleMapURI, '_blank');
  };
  return (
    <div className="location-container">
      <div>
        <h2 className="card-title">{location.OfficeName}</h2>
      </div>
      <div className="office-card-description">
        <p>
          <span className="office-card-icon">
            <PublicIcon className="office-card-each-icon" />
          </span>{' '}
          {location.Address}
        </p>
        <p>
          <span className="office-card-icon">
            <AccessTimeFilledIcon className="office-card-each-icon" />
          </span>{' '}
          Open: {location.OpenTime} - Close: {location.CloseTime}
        </p>
        <p>
          <span className="office-card-icon">
            <CallIcon className="office-card-each-icon" />
          </span>{' '}
          {formatPhoneNumber(location.Phone)}
        </p>
      </div>

      <div className="locate-btn">
        <button className="locate-btn-btn" onClick={openGoogleMaps}>
          <LocationOn className="icon" />
          Locate Store
        </button>
      </div>
    </div>
  );
};

export default OfficeCard;

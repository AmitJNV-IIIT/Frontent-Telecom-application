import React from 'react';
import Offices from '../components/Location/Offices';
import officeData from '../data/offices-data.json';
import './css/LocateUs.css';

const LocateUs = () => {
  return (
    <div className="locate-page">
      <h3 className="heading">Locate Excitel Stores</h3>
      <div className="background-div">
        <Offices locations={officeData} />
      </div>
    </div>
  );
};

export default LocateUs;

import React from 'react';
import './css/LandingRecharge.css';
import { useNavigate } from 'react-router-dom';
//
function Recharge() {
  const navigate = useNavigate();
  const clickButton = () => {
    navigate('/prepaid');
  };
  return (
    <div className="form" data-testid="recharge">
      <div className="title">Recharge and Bill Pay</div>
      <div className="input-container ic2">
        <input id="phone" className="input" type="text" placeholder=" " />
        <div className="cut cut-short"></div>
        <label htmlFor="phone" className="placeholder">
          Enter Your Mobile Number
        </label>
      </div>
      <button type="text" className="submit" onClick={clickButton}>
        Recharge
      </button>
    </div>
  );
}
export default Recharge;

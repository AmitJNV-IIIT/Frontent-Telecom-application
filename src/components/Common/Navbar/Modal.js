import React from 'react';
import './css/Navbar.css';
//
const Modal = ({ type, show, children }) => {
  const showHideClassName = show
    ? 'modal-user-details display-block'
    : 'modal-user-details display-none';

  return (
    <div className={showHideClassName}>
      <div className={type == 'viewCoupon' ? '' : 'modal-content-user-details'}>
        {children}
      </div>
    </div>
  );
};

export default Modal;

import React, { useEffect } from 'react';
import './css/ConnectionDetail.css';
//
// eslint-disable-next-line react/prop-types
const ConnectionDetail = ({ isOpen, onClose, connectionDetail }) => {
  useEffect(() => {
    const handleEscapeKeyPress = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event) => {
      const modal = document.querySelector('.modal');
      if (modal && !modal.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKeyPress);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKeyPress);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="details">
          <h2>Connection Details</h2>
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>Connection Id: </strong>
                </td>
                <td>{connectionDetail.connectionId}</td>
              </tr>
              <tr>
                <td>
                  <strong>Name: </strong>
                </td>
                <td>{connectionDetail.name}</td>
              </tr>
              <tr>
                <td>
                  <strong>Address: </strong>
                </td>
                <td>{connectionDetail.address}</td>
              </tr>
              <tr>
                <td>
                  <strong>PinCode: </strong>
                </td>
                <td>{connectionDetail.pinCode}</td>
              </tr>
              <tr>
                <td>
                  <strong>City: </strong>
                </td>
                <td>{connectionDetail.city}</td>
              </tr>
              <tr>
                <td>
                  <strong>State: </strong>
                </td>
                <td>{connectionDetail.state}</td>
              </tr>
              <tr>
                <td>
                  <strong>Status: </strong>
                </td>
                <td>{connectionDetail.status}</td>
              </tr>
              <tr>
                <td>
                  <strong>Mobile: </strong>
                </td>
                <td>{connectionDetail.mobileNumber}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ConnectionDetail;

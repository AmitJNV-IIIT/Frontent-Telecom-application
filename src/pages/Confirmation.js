// ConfirmationPage.js
import React, { useState } from 'react';
import Confirmation from '../components/Confirmation/ConfirmationModal';
import './css/ConfirmationPage.css';
//
function ConfirmationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="confirmation-page-wrapper">
      <h1>This is confirmation page</h1>
      <button onClick={openModal} data-testid="open-modal-button">
        Open Modal
      </button>
      <Confirmation
        isOpen={isModalOpen}
        onClose={closeModal}
        data-testid="confirmation-modal"
      />
    </div>
  );
}

export default ConfirmationPage;

/*eslint-disable*/
import React, { useState } from 'react';

import NewConnection from '../components/Broadband/NewConnection';
import SelectedPlan from '../components/Broadband/SelectedPlan';
import Confirmation from '../components/Confirmation/ConfirmationModal';
import './css/BroadbandConnection.css';
//

function BroadbandConnectionPage() {
  const selectedPlan = JSON.parse(
    window.sessionStorage.getItem('BroadbandPlan')
  );
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const openConfirmation = () => {
    setOpenConfirmationModal(true);
  };
  const toggleModal = () => {
    setOpenConfirmationModal(!openConfirmationModal);
  };

  return (
    <div className="BroadbandConnection-main">
      <div className="container-wrapper">
        <div className="container">
          <div className="row">
            <div
              className="filters col-7 col-sm-12"
              data-testid="new-connection"
            >
              <NewConnection openConfirmation={openConfirmation} />
            </div>
            <div
              className="recharge-cards-broad-con col-4 col-sm-12"
              data-testid="selected-plan"
            >
              <SelectedPlan />
            </div>
          </div>
        </div>
      </div>
      {openConfirmationModal && (
        <Confirmation
          isOpen={openConfirmationModal}
          setIsModalOpen={toggleModal}
          plan={selectedPlan}
          category={'Broadband'}
        />
      )}
    </div>
  );
}

export default BroadbandConnectionPage;

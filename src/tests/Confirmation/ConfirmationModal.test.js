import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Confirmation from '../../components/Confirmation/ConfirmationModal';
import { BrowserRouter as Router } from 'react-router-dom';
import { request } from '../../axios/AxiosHelper';

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn()
}));

describe('Confirmation component', () => {
  it('T1: renders without crashing', () => {
    const { getByText } = render(
      <Router>
        <Confirmation
          isOpen={true}
          setIsModalOpen={() => {}}
          plan={{ planType: 'Prepaid' }}
        />
      </Router>
    );
    expect(getByText('Confirm your purchase')).toBeInTheDocument();
  });

  it('T2: handles confirmation', async () => {
    const mockResponse = { status: 'OK' };
    request.mockResolvedValueOnce(mockResponse);
    const { getByText } = render(
      <Router>
        <Confirmation
          isOpen={true}
          setIsModalOpen={() => {}}
          plan={{ planId: '1', planType: 'Prepaid' }}
        />
      </Router>
    );

    const confirmButton = getByText('Confirm');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(request).toHaveBeenCalledWith(
        'POST',
        '/subscriptions',
        expect.objectContaining({
          planId: '1'
        })
      );
    });
  });

  it('T3: handles confirmation error', async () => {
    // Rendering the Confirmation component
    const { getByText } = render(
      <Router>
        <Confirmation
          isOpen={true}
          setIsModalOpen={() => {}}
          plan={{ planId: '1', planType: 'Prepaid' }}
        />
      </Router>
    );

    // Triggering the confirmation action
    const confirmButton = getByText('Confirm');
    fireEvent.click(confirmButton);

    // Waiting for the asynchronous operation to complete
    await waitFor(() => {
      // Verifying that the request was made with the expected parameters
      expect(request).toHaveBeenCalledWith(
        'POST',
        '/subscriptions',
        expect.objectContaining({
          planId: '1'
        })
      );
    });
  });

  it('T4: handles couponIds length greater than 0', () => {
    const plan = { planId: '1', couponIds: ['coupon123'], planType: 'Prepaid' };
    const { getByText } = render(
      <Router>
        <Confirmation isOpen={true} setIsModalOpen={() => {}} plan={plan} />
      </Router>
    );

    expect(getByText('Confirm your purchase')).toBeInTheDocument();
  });

  it('T5: handles confirmation with coupon ID', async () => {
    const mockResponse = { status: 'OK' };
    request.mockResolvedValueOnce(mockResponse);
    const planWithCouponId = {
      planId: '1',
      price: '499',
      data: '10GB',
      planType: 'Basic',
      couponIds: ['coupon123']
    };
    const { getByText } = render(
      <Router>
        <Confirmation
          isOpen={true}
          setIsModalOpen={() => {}}
          plan={planWithCouponId}
        />
      </Router>
    );

    const confirmButton = getByText('Confirm');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(request).toHaveBeenCalledWith(
        'POST',
        '/subscriptions',
        expect.objectContaining({
          planId: '1',
          price: '499',
          dataRemaining: '10GB',
          planType: 'Basic'
        })
      );
    });
  });
});

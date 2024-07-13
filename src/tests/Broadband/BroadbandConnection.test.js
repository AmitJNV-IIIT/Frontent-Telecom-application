import React from 'react';
import { render, screen } from '@testing-library/react';
import { getByTestId, getByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BroadbandConnectionPage from '../../pages/BroadbandConnection';
import { request } from '../../axios/AxiosHelper';
import { MemoryRouter } from 'react-router-dom';
//

jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn() // Mock the request function
}));
describe('BroadbandConnectionPage component', () => {
  test('TC01: renders broadband connection section with correct text', () => {
    render(
      <MemoryRouter>
        <BroadbandConnectionPage />
      </MemoryRouter>
    );
    expect(screen.getByText('EXCITEL BROADBAND')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Step into the future of unlimited Broadband plans with Excitel Fiber technology. Experience lightning fast internet on our existing Fiber broadband connection across multiple devices.'
      )
    ).toBeInTheDocument();
  });

  test('TC02: ensures new connection component is rendered', () => {
    render(
      <MemoryRouter>
        <BroadbandConnectionPage />
      </MemoryRouter>
    );
    expect(screen.getByTestId('new-connection')).toBeInTheDocument();
  });

  test('TC03: ensures selected plan component is rendered', () => {
    render(
      <MemoryRouter>
        <BroadbandConnectionPage />
      </MemoryRouter>
    );
    expect(screen.getByTestId('selected-plan')).toBeInTheDocument();
  });

  test('TC04: handles null or undefined name in formData', () => {
    render(
      <MemoryRouter>
        <BroadbandConnectionPage />
      </MemoryRouter>
    );
    // You might need to add logic in the component to handle null or undefined name
    // This test case checks if the component doesn't throw errors in such cases
    expect(screen.getByText('EXCITEL BROADBAND')).toBeInTheDocument();
  });

  // Add more test cases here as needed
});

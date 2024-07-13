import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';
import ExcitelRoutes from './routes/ExcitelRoutes';
import ServiceUnavailable from './components/Common/ServiceUnavailable/ServiceUnavailable';

jest.mock('./routes/ExcitelRoutes', () => jest.fn());
jest.mock('./components/Common/ServiceUnavailable/ServiceUnavailable', () =>
  jest.fn()
);

describe('App', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('TC-01: should render ExcitelRoutes and ToastContainer without error', () => {
    ExcitelRoutes.mockImplementation(() => <div>ExcitelRoutes</div>);

    const { getByText } = render(<App />);

    expect(getByText('ExcitelRoutes')).toBeInTheDocument();
  });

  it('TC-01: should handle errors and show ServiceUnavailable component', () => {
    const error = new Error('Test error');
    ExcitelRoutes.mockImplementation(() => {
      throw error;
    });

    ServiceUnavailable.mockImplementation(() => <div>Service Unavailable</div>);

    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const { getByText } = render(<App />);

    expect(getByText('Service Unavailable')).toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Logging to my error reporting service: ',
      error,
      expect.anything()
    );
  });
});

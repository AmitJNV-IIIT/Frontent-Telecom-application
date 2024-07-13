import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ServiceUnavailable from '../../components/Common/ServiceUnavailable/ServiceUnavailable';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

describe('ServiceUnavailable Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders service unavailable message', () => {
    render(<ServiceUnavailable />);
    const headingElement = screen.getByText('Service Currently Unavailable!!');
    const paragraphElement = screen.getByText('Please retry after some time!!');
    expect(headingElement).toBeInTheDocument();
    expect(paragraphElement).toBeInTheDocument();
  });

  test('redirects to home page on button click', () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    render(<ServiceUnavailable />);
    const buttonElement = screen.getByRole('button', {
      name: 'Go to Home Page'
    });
    fireEvent.click(buttonElement);
    expect(navigate).toHaveBeenCalledWith('/');
  });
});

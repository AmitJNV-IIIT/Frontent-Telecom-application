import React from 'react';
import { render, screen } from '@testing-library/react';
import Spinner from '../../components/Common/Spinner/Spinner';

describe('Spinner Component', () => {
  test('renders default spinner with loading text', () => {
    render(<Spinner />);

    // Check if default spinner class is present
    const spinnerElement = screen.getByTestId('default-spinner');
    expect(spinnerElement).toBeInTheDocument();

    // Check if loading text is present
    const loadingTextElement = screen.getByText('Loading....');
    expect(loadingTextElement).toBeInTheDocument();
  });

  test('renders coupon spinner with loading text', () => {
    render(<Spinner type="CouponSpinner" />);

    // Check if coupon spinner class is present
    const couponSpinnerElement = screen.getByTestId('coupon-spinner');
    expect(couponSpinnerElement).toBeInTheDocument();

    // Check if loading text for coupon spinner is present
    const loadingTextElement = screen.getByText('Loading....');
    expect(loadingTextElement).toBeInTheDocument();
  });
});

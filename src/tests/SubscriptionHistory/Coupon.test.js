import React from 'react';
import { render, screen } from '@testing-library/react';
import Coupon from '../../components/SubscriptionHistory/Coupon';

describe('Coupon component', () => {
  beforeEach(() => {
    render(<Coupon />);
  });

  test('TC-01: renders Coupon component', () => {
    expect(screen.getByText('Coupon')).toBeInTheDocument();
  });

  test('TC-02: renders an image', () => {
    const image = screen.getByAltText('Feedback');
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('feedback.jpg');
  });
});

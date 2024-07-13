import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import PostpaidPlanCard from '../../components/Postpaid/PostpaidPlanCard';

describe('PostpaidPlanCard', () => {
  const mockPostpaidPlan = {
    id: 1,
    price: 199.0,
    data: '1',
    validity: 29
  };

  const mockModalHandler = jest.fn();

  test('TC0: renders PostpaidPlanCard component with correct data', () => {
    render(<PostpaidPlanCard postpaidPlan={mockPostpaidPlan} />);

    // expect(screen.getByText('Post Paid')).toBeInTheDocument();
    expect(screen.getByText('Special Package')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Ideal for work seeking a complete branding branding and converting officials.'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('₹199')).toBeInTheDocument();
    expect(screen.getByText('1 GB/ Day')).toBeInTheDocument();
    expect(screen.getByText('29 Days validity')).toBeInTheDocument();
    expect(screen.getByText('High-Converting data plan')).toBeInTheDocument();
    expect(
      screen.getByText('Get Excitel movies for free for 30 days.')
    ).toBeInTheDocument();
  });

  test('TC1: clicking price button calls modalHandler with correct plan', () => {
    render(
      <PostpaidPlanCard
        postpaidPlan={mockPostpaidPlan}
        modalHandler={mockModalHandler}
      />
    );

    const priceButton = screen.getByText('₹199');

    fireEvent.click(priceButton);

    expect(mockModalHandler).toHaveBeenCalledWith(mockPostpaidPlan);
  });
});

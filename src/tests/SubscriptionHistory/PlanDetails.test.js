import React from 'react';
import { render, screen } from '@testing-library/react';
import PlanDetails from '../../components/SubscriptionHistory/PlanDetails';

describe('PlanDetails component', () => {
  beforeEach(() => {
    render(<PlanDetails />);
  });

  test('TC-01: Renders PlanDetails component', () => {
    const planDetailsHeader = screen.getByText('Plan Details');
    expect(planDetailsHeader).toBeInTheDocument();
  });

  test("TC-02: Renders an image with alt text 'Feedback'", () => {
    const feedbackImage = screen.getByAltText('Feedback');
    expect(feedbackImage).toBeInTheDocument();
  });
});

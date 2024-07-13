import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PlanUsage from '../../components/Admin/AdminPlan/PlanUsage';

describe('PlanUsage component', () => {
  test('TC-01: Renders correctly', () => {
    // Render the PlanUsage component
    render(<PlanUsage setPlanUsageView={() => {}} />);

    // Check if the close button renders
    const closeButton = screen.getByTestId('close-btn');
    expect(closeButton).toBeInTheDocument();
  });
  test('TC-02: Closes the PlanUsage component when close button is clicked', () => {
    // Mock the setPlanUsageView function
    const mockSetPlanUsageView = jest.fn();

    // Render the PlanUsage component with the mocked function
    render(<PlanUsage setPlanUsageView={mockSetPlanUsageView} />);

    // Click the close button
    const closeButton = screen.getByTestId('close-btn');
    fireEvent.click(closeButton);

    // Check if the setPlanUsageView function is called
    expect(mockSetPlanUsageView).toHaveBeenCalled();
  });
});

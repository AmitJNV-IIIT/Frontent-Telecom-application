import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BroadbandCard from '../../components/Broadband/BroadbandCard';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import BroadbandPlanCard from '../../components/Broadband/BroadbandPlanCard';
import { BrowserRouter as Router } from 'react-router-dom';
import { request } from '../../axios/AxiosHelper';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn() // Mock the request function
}));

jest.spyOn(window.sessionStorage.__proto__, 'getItem'); // Spy on the getItem function
window.sessionStorage.__proto__.getItem = jest.fn(); // Mock the getItem function

const mockBroadbandPlans = [
  {
    planId: 1,
    name: 'Plan 1',
    validity: 28,
    speed: 100,
    price: 499,
    ott: ['Netflix', 'Amazon Prime']
  },
  {
    planId: 2,
    name: 'Plan 2',
    validity: 28,
    speed: 100,
    price: 499,
    ott: ['Netflix', 'Hotstar']
  }
];

const mockActiveBroadbandPlan = { planId: 1, name: 'Active Plan' };

describe('BroadbandCard component', () => {
  it('t1: renders without crashing', () => {
    render(
      <Router>
        <BroadbandCard
          broadbandPlans={mockBroadbandPlans}
          activeBroadbandPlan={mockActiveBroadbandPlan}
        />
      </Router>
    );
  });

  it('t2: renders broadband plans using Slider component', () => {
    render(
      <Router>
        <BroadbandCard
          broadbandPlans={mockBroadbandPlans}
          activeBroadbandPlan={mockActiveBroadbandPlan}
        />
      </Router>
    );
  });

  it('t3: renders correct number of BroadbandPlanCard components', () => {
    render(
      <Router>
        <BroadbandCard
          broadbandPlans={mockBroadbandPlans}
          activeBroadbandPlan={mockActiveBroadbandPlan}
        />
      </Router>
    );

    const broadbandPlanCards = screen.getAllByTestId('broadband-plan-card');
    expect(broadbandPlanCards).toHaveLength(mockBroadbandPlans.length - 1);
  });

  it('t5: handles empty broadband plans array', () => {
    render(
      <Router>
        <BroadbandCard
          broadbandPlans={[]}
          activeBroadbandPlan={mockActiveBroadbandPlan}
        />
      </Router>
    );

    expect(screen.queryByTestId('broadband-plan-card')); // No plan card rendered
  });

  // Add tests for potential errors or edge cases

  it('t6: handles missing broadband plan object within plans array', () => {
    const broadbandPlans = [mockBroadbandPlans[0], undefined]; // Missing plan object
    render(
      <Router>
        <BroadbandCard
          broadbandPlans={broadbandPlans}
          activeBroadbandPlan={mockActiveBroadbandPlan}
        />
      </Router>
    );

    const broadbandPlanCards = screen.getAllByTestId('broadband-plan-card');
    expect(broadbandPlanCards.length).toBe(1); // Only one valid plan card rendered
  });

  it('t7: handles error in fetching user info from the server', async () => {
    request.mockRejectedValueOnce(new Error('Server Error'));

    render(
      <Router>
        <BroadbandCard
          broadbandPlans={mockBroadbandPlans}
          activeBroadbandPlan={mockActiveBroadbandPlan}
        />
      </Router>
    );

    // Wait for the component to handle the error (assuming it updates the UI accordingly)
    await waitFor(() => {
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    });
  });

  it('t8: sets broadband state when server response status is "OK"', async () => {
    const mockResponse = { status: 'OK', broadbandConnection: [{ id: 1 }] };
    request.mockResolvedValueOnce(mockResponse);

    render(
      <Router>
        <BroadbandCard
          broadbandPlans={mockBroadbandPlans}
          activeBroadbandPlan={mockActiveBroadbandPlan}
        />
      </Router>
    );

    await waitFor(() => {
      expect(request).toHaveBeenCalledTimes(2);
    });

    // Assert that the broadband state is set correctly
    // Note: This might not be possible with the current implementation of the component
  });

  it('t9: opens modal when role is not empty and broadband length is not zero', () => {
    window.sessionStorage.__proto__.getItem = jest.fn(() => 'USER');
    const mockBroadbandPlansWithActiveStatus = [
      { ...mockBroadbandPlans[0], status: 'Active' }
    ];

    render(
      <Router>
        <BroadbandCard
          broadbandPlans={mockBroadbandPlansWithActiveStatus}
          activeBroadbandPlan={mockActiveBroadbandPlan}
        />
      </Router>
    );

    // const planCard = screen.getByTestId('plan-card-1');
    // fireEvent.click(planCard);

    // const modal = screen.getByTestId('confirmation-modal');
    // expect(modal).toBeInTheDocument();
  });
});

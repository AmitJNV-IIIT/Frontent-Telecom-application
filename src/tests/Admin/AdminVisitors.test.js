import React from 'react';
import { render, screen } from '@testing-library/react';
import AdminVisitors from '../../components/Admin/AdminPlan/AdminVisitors'; // Assuming AdminVisitors is in the same directory

describe('AdminVisitors Component', () => {
  it('TC01: renders AdminVisitors component', () => {
    render(<AdminVisitors />);

    // Check if the heading "Plan Viewers" is rendered
    // expect(screen.getByText('Plan Viewers')).toBeInTheDocument();
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminHeader from '../../components/Admin/AdminPlan/AdminHeader';

describe('AdminHeader Component', () => {
  test('TC-01: It renders without crashing', () => {
    const mockSettingPlanType = jest.fn();

    const { getByTestId } = render(
      <Router>
        <AdminHeader settingPlanType={mockSettingPlanType} />
      </Router>
    );

    const headerComponent = getByTestId('admin-header');
    expect(headerComponent).toBeInTheDocument();
  });
});

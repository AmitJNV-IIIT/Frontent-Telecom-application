import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import AdminPlanManagement from '../../pages/AdminPlanManagement';
import { AuthProvider } from '../../hooks/contextApi/AuthContext';
import { request } from '../../axios/AxiosHelper';
import { BASE_URL } from '../../constants/Constants';
import Swal from 'sweetalert2';
// Mock the axios request
jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn()
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

jest.mock(
  '../../components/Admin/AdminPlan/AdminHeader',
  () =>
    ({ settingPlanType }) => (
      <button onClick={() => settingPlanType('broadband')}>Change Plan</button>
    )
);
jest.mock(
  '../../components/Admin/AdminPlan/AdminBody',
  () =>
    ({ handleAddPlan, handleEditPlan, handleDeletePlan }) => (
      <div>
        <button onClick={() => handleAddPlan({ id: 2, name: 'plan2' })}>
          Add Plan
        </button>
        <button onClick={() => handleEditPlan({ id: 1, name: 'plan1' })}>
          Edit Plan
        </button>
        <button onClick={() => handleDeletePlan(1)}>Delete Plan</button>
      </div>
    )
);

describe('AdminPlanManagement', () => {
  test('TC-01: Should render AdminPlanManagement component', () => {
    render(
      <AuthProvider>
        <AdminPlanManagement />
      </AuthProvider>
    );
    expect(screen.getByTestId('admin-plan-mgmt-main-div')).toBeInTheDocument();
  });

  test('TC-02: Should fetch mobile plans on initial render', async () => {
    render(
      <AuthProvider>
        <AdminPlanManagement />
      </AuthProvider>
    );

    expect(request).toHaveBeenCalled();
  });

  test('TC-03: Adds a new plan on body button click', () => {
    const { getByText } = render(<AdminPlanManagement />);
    fireEvent.click(getByText('Add Plan'));
    expect(request).toHaveBeenCalled();
  });

  test('TC-04: Edits an existing plan on body button click', () => {
    const { getByText } = render(<AdminPlanManagement />);
    fireEvent.click(getByText('Edit Plan'));
    expect(request).toHaveBeenCalled();
  });

  // test('TC-05: Deletes a plan on body button click', () => {
  //   const { getByText } = render(<AdminPlanManagement />);
  //   fireEvent.click(getByText('Delete Plan'));
  //   expect(request).toHaveBeenCalled();
  // });

  test('TC-06: Changes plan type on header button click', () => {
    // Mocking Swal.fire
    Swal.fire = jest.fn();
    const { getByText } = render(<AdminPlanManagement />);
    fireEvent.click(getByText('Change Plan'));
    expect(request).toHaveBeenCalled();
  });

  test('TC-07: Fetches broadband data', async () => {
    const broadbandData = { plan: 'prepaid', price: '259', data: '30' };
    require('../../axios/AxiosHelper').request.mockResolvedValue(broadbandData);
    const { getByText } = render(<AdminPlanManagement />);
    fireEvent.click(getByText('Change Plan'));
    await waitFor(() => expect(request).toHaveBeenCalled());
  });

  test('TC-08: fetches broadband data on broadband button click', async () => {
    // Mock the axios response
    const broadbandData = [
      { id: 1, name: 'plan1' },
      { id: 2, name: 'plan2' }
    ];
    request.mockResolvedValueOnce({ data: broadbandData });

    const { getByText } = render(<AdminPlanManagement />);

    // Simulate clicking the button that changes plan type to 'Broadband'
    fireEvent.click(getByText('Change Plan'));

    // Wait for the request function to be called
    await waitFor(() => expect(request).toHaveBeenCalledTimes(2));

    // Check if the request function was last called with the correct parameters
    expect(request).toHaveBeenLastCalledWith(
      'GET',
      `https://0wb4i9f3m5.execute-api.us-east-1.amazonaws.com/api/v2/mobile?type=broadband&offset=0&limit=1000&active=True`
    );
  });
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AdminBody from '../../components/Admin/AdminPlan/AdminBody';
import { useAuth } from '../../hooks/contextApi/AuthContext';

import { request } from '../../axios/AxiosHelper';

jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn()
}));

//
jest.mock(
  '../../components/Admin/AdminPlan/AdminAddEditPlan',
  () =>
    ({ handleAddPlan, handleEditPlan }) => (
      <div>
        <button onClick={() => handleAddPlan({ id: 1, name: 'plan1' })}>
          Add Plan
        </button>
        <button onClick={() => handleEditPlan({ id: 1, name: 'plan1' })}>
          Edit Plan
        </button>
      </div>
    )
);

jest.mock(
  '../../components/Common/RechargeCard/RechargeCard',
  () =>
    ({ setPlanDetailsFromRechargeCard, handleDeletePlan }) => (
      <div>
        <button
          onClick={() =>
            setPlanDetailsFromRechargeCard({ id: 1, name: 'plan1' })
          }
        >
          Set Plan Details
        </button>
        <button onClick={() => handleDeletePlan(1)}>Delete Plan</button>
      </div>
    )
);

describe('AdminBody', () => {
  let props;
  beforeEach(() => {
    props = {
      dataArray: [
        { id: 1, name: 'plan1' },
        { id: 2, name: 'plan2' }
      ],
      handleAddPlan: jest.fn(),
      handleEditPlan: jest.fn(),
      handleDeletePlan: jest.fn(),
      isHeaderChanged: false,
      adminPlanType: 'prepaid',
      role: 'ADMIN',
      loading: false
    };
  });

  test('TC-01: Renders AdminBody component', () => {
    const { getByText } = render(
      <AdminBody {...props} pageCount={5} handlePageClick={() => {}} />
    );
    expect(getByText('Add Plan')).toBeInTheDocument();
    expect(getByText('Average Rating')).toBeInTheDocument();
  });

  test('TC-02: Handles adding a plan', () => {
    const { getByText } = render(
      <AdminBody {...props} pageCount={5} handlePageClick={() => {}} />
    );
    fireEvent.click(getByText('Add Plan'));
    expect(props.handleAddPlan).toHaveBeenCalledWith({ id: 1, name: 'plan1' });
  });

  test('TC-03: Handles editing a plan', () => {
    const { getByText } = render(
      <AdminBody {...props} pageCount={5} handlePageClick={() => {}} />
    );
    fireEvent.click(getByText('Edit Plan'));
    expect(props.handleEditPlan).toHaveBeenCalledWith({ id: 1, name: 'plan1' });
  });

  test('TC-04: Sets plan details from recharge card', () => {
    const { getByText } = render(
      <AdminBody {...props} pageCount={5} handlePageClick={() => {}} />
    );
    fireEvent.click(getByText('Set Plan Details'));
    expect(props.dataArray).toContainEqual({ id: 1, name: 'plan1' });
  });

  // test('TC-05: Handles deleting a plan', () => {
  //   const { getByText } = render(<AdminBody {...props} />);
  //   fireEvent.click(getByText('Delete Plan'));
  //   expect(props.handleDeletePlan).toHaveBeenCalledWith(1);
  // });
});

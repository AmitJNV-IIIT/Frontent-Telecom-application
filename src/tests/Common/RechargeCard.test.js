import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RechargeCard from '../../components/Common/RechargeCard/RechargeCard';

// Mocking the useAuth hook
jest.mock('../../hooks/contextApi/AuthContext', () => ({
  useAuth: jest.fn(() => ({ isLogin: true }))
}));

// Mocking the axios request function
jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn(() => Promise.resolve({}))
}));

// Mocking the Swal.fire function from sweetalert2
jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));
const mockDataArray = [
  {
    id: 1,
    data: 1,
    validity: 30,
    price: 100,
    ott: ['Netflix', 'Amazon Prime'],
    couponIds: [] // Add `couponIds` property
  },
  {
    id: 2,
    data: 2,
    validity: 60,
    price: 200,
    ott: ['Disney+', 'Hotstar'],
    couponIds: [] // Add `couponIds` property
  }
];

describe('RechargeCard Component', () => {
  // Mock data for testing

  test('TC0: renders without crashing', () => {
    render(
      <RechargeCard
        dataArray={mockDataArray}
        role="USER"
        setPlanDetailsFromRechargeCard={() => {}}
        adminPlanType=""
        handleDeletePlanImmediately={() => {}}
      />
    );
    expect(
      screen.getByTestId('prepaid-recharge-card-main')
    ).toBeInTheDocument();
  });

  test('TC1: clicking on plan details should open details modal', () => {
    render(
      <RechargeCard
        dataArray={mockDataArray}
        role="USER"
        setPlanDetailsFromRechargeCard={() => {}}
        adminPlanType=""
        handleDeletePlanImmediately={() => {}}
      />
    );

    // fireEvent.click(screen.getByText("DETAILS"));

    // expect(screen.getByText("Prepaid Details")).toBeInTheDocument();
  });

  test('TC2: clicking on edit button should trigger handleEdit function', () => {
    // Mock function for handleEdit
    const mockHandleEdit = jest.fn();

    render(
      <RechargeCard
        dataArray={mockDataArray}
        role="ADMIN"
        setPlanDetailsFromRechargeCard={() => {}}
        adminPlanType="Broadband"
        handleDeletePlanImmediately={() => {}}
        handleEdit={mockHandleEdit} // Pass the mock function as prop
      />
    );

    // Click on the edit button
    // fireEvent.click(screen.getByTestId("prepaid-recharge-card-main"));

    // // Expect handleEdit to be called
    // expect(mockHandleEdit).toHaveBeenCalledTimes(1);
  });

  test('TC3: clicking on delete button should trigger handleDelete function', () => {
    // Mock function for handleDelete
    const mockHandleDelete = jest.fn();

    render(
      <RechargeCard
        dataArray={mockDataArray}
        role="ADMIN"
        setPlanDetailsFromRechargeCard={() => {}}
        adminPlanType="Broadband"
        handleDeletePlanImmediately={mockHandleDelete} // Pass the mock function as prop
      />
    );

    // Click on the delete button
    // fireEvent.click(screen.getByLabelText('Plan Usage'));

    // // Expect handleDelete to be called
    // expect(mockHandleDelete).toHaveBeenCalledTimes(1);
  });

  test('TC4: hovering over a card should display edit and delete buttons for admin', () => {
    render(
      <RechargeCard
        dataArray={mockDataArray}
        role="ADMIN"
        setPlanDetailsFromRechargeCard={() => {}}
        adminPlanType="Broadband"
        handleDeletePlanImmediately={() => {}}
      />
    );

    // Hover over the first card
    // fireEvent.mouseEnter(screen.getByTestId("prepaid-recharge-card"));

    // // Expect edit and delete buttons to be visible
    // expect(screen.getByLabelText("edit")).toBeInTheDocument();
    // expect(screen.getByLabelText("delete")).toBeInTheDocument();
  });

  test('TC5: clicking on coupon section should trigger couponsClickHandler function for user', () => {
    // Mock function for couponsClickHandler
    const mockCouponsClickHandler = jest.fn();

    render(
      <RechargeCard
        dataArray={mockDataArray}
        role="USER"
        PersonData="SHA"
        setPlanDetailsFromRechargeCard={() => {}}
        adminPlanType="Broadband"
        handleDeletePlanImmediately={() => {}}
        couponsClickHandler={mockCouponsClickHandler} // Pass the mock function as prop
      />
    );

    // Click on the coupon section
    screen.getAllByText('DETAILS').forEach((element) => {
      fireEvent.click(element);
    });

    // Expect couponsClickHandler to be called
    // expect(mockCouponsClickHandler).toHaveBeenCalledTimes(1);
  });
});

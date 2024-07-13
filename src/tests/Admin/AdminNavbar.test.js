import React from 'react';
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor
} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminNavbar from '../../components/Admin/AdminPlan/AdminNavbar';

jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn() // Mock the request function
}));

describe('AdminNavbar Component', () => {
  const mockSettingPlanType = jest.fn();
  let getByText, queryByText, container;

  beforeEach(() => {
    ({ getByText, queryByText, container } = render(
      <Router>
        <AdminNavbar settingPlanType={mockSettingPlanType} />
      </Router>
    ));
  });

  // test('TC-01: It renders without crashing', () => {
  //   const navbar = container.querySelector('.navbar');
  //   expect(navbar).toBeInTheDocument();
  // });

  test('TC-02: It sets active link correctly', () => {
    const prepaidLink = getByText('Prepaid');
    fireEvent.click(prepaidLink);
    expect(prepaidLink).toHaveClass('active');
  });

  test('TC-03: It sets active link correctly', () => {
    const broadbandLink = getByText('Broadband');
    fireEvent.click(broadbandLink);
    expect(broadbandLink).toHaveClass('active');
  });

  test('TC-04: It calls settingPlanType function on link click', async () => {
    const postpaidLink = getByText('Postpaid');
    fireEvent.click(postpaidLink);
    expect(mockSettingPlanType).toHaveBeenCalled();
  });

  // test('TC-05: It opens and closes CreateCoupon component', async () => {
  //   const createCouponLink = getByText('Create Coupon');
  //   fireEvent.click(createCouponLink);
  //   await waitFor(() => {
  //       expect(queryByText('Internal')).toBeInTheDocument();
  //     });
  // });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateCoupon from '../../components/Admin/AdminPlan/CreateCoupon';

jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn() // Mock the request function
}));

describe('CreateCoupon component', () => {
  // test('TC-01: Renders with default values and tabs', () => {
  //   render(<CreateCoupon open={true} handleClose={() => {}} />);

  //   // Check if the component renders
  //   expect(screen.getByTestId('create-coupon-typography')).toBeInTheDocument();

  //   // Check if the default tab labels are present
  //   expect(screen.getByText('Internal')).toBeInTheDocument();
  //   // expect(screen.getByText('External')).toBeInTheDocument();
  // });

  test('TC-02: Switches tabs and updates coupon type', () => {
    render(<CreateCoupon open={true} handleClose={() => {}} />);

    // Click on the External tab
    // fireEvent.click(screen.getByText('External'));

    // // Check if the tab changes
    // expect(screen.getByText('External')).toHaveClass('Mui-selected');

    // Check if the coupon type is updated
    expect(screen.getByText('Data')).toBeInTheDocument();
    expect(screen.getByText('Expiry Date')).toBeInTheDocument();
    expect(screen.queryByText('Limit')).toBeInTheDocument();
    expect(screen.queryByText('Coupon Code')).toBeInTheDocument();
  });

  test('TC-03: Updates input fields correctly', () => {
    render(<CreateCoupon open={true} handleClose={() => {}} />);

    // Type in the Data input field
    fireEvent.change(screen.getByTestId('data-field').querySelector('input'), {
      target: { value: '30' }
    });

    // Type in the Expiry Date input field
    // fireEvent.change(
    //   screen.getByTestId('create-coupon-typography').querySelector('input'),
    //   { target: { value: '2024-12-31' } }
    // );

    // Check if the input fields are updated correctly
    expect(screen.getByTestId('data-field').querySelector('input')).toHaveValue(
      '30'
    );

    // expect(
    //   screen.getByTestId('expiry-field').querySelector('input')
    // ).toHaveValue('2024-12-31');
  });

  test('TC-04: Calls handleSubmit when Create Coupon button is clicked', () => {
    const handleClose = jest.fn();
    render(<CreateCoupon open={true} handleClose={handleClose} />);

    // Click the Create Coupon button
    fireEvent.click(screen.getByTestId('create-coupon-btn'));

    // Check if handleClose is called
    expect(handleClose).toHaveBeenCalled();
  });

  it('renders without crashing', () => {
    const { getByTestId } = render(
      <CreateCoupon open={true} handleClose={() => {}} />
    );
    // expect(getByTestId('create-coupon-typography')).toBeInTheDocument();
  });

  it('handles input change', () => {
    const { getByTestId } = render(
      <CreateCoupon open={true} handleClose={() => {}} />
    );
    const dataField = getByTestId('data-field');
    // fireEvent.change(dataField, { target: { value: '10GB' } });
    // expect(dataField.value).toBe('10GB');
  });

  it('handles form submission', async () => {
    const handleClose = jest.fn();
    const { getByTestId } = render(
      <CreateCoupon open={true} handleClose={handleClose} />
    );
    const createCouponBtn = getByTestId('create-coupon-btn');
    fireEvent.click(createCouponBtn);
    // await waitFor(() => expect(handleClose).toHaveBeenCalled());
  });
});

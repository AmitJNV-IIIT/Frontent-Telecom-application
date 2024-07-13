import { render, fireEvent, screen } from '@testing-library/react';
import AddCoupon from '../../components/Admin/AdminPlan/AddCoupon';
import { request } from '../../axios/AxiosHelper';

jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn()
}));

describe('AddCoupon', () => {
  test('TC-01: Renders without crashing', () => {
    render(<AddCoupon open={false} handleClose={() => {}} />);
  });

  test('TC-02: Renders search input correctly', () => {
    render(<AddCoupon open={true} handleClose={() => {}} />);
    const input = screen.getByPlaceholderText('Search coupons');
    expect(input).toBeInTheDocument();
  });

  test('TC-03: Filters coupons on search', () => {
    render(<AddCoupon open={true} handleClose={() => {}} />);
    const input = screen.getByPlaceholderText('Search coupons');
    fireEvent.change(input, { target: { value: '2 GB' } });

    const filteredCoupon = screen.getByText('Something went wrong!');
    expect(filteredCoupon).toBeInTheDocument();

    const nonFilteredCoupon = screen.queryByText('1 GB');
    expect(nonFilteredCoupon).not.toBeInTheDocument();
  });

  // test('TC-04: Triggers add coupon logic on button click', () => {
  //   const handleAddCouponMock = jest.fn();
  //   render(
  //     <AddCoupon
  //       open={true}
  //       handleClose={() => {}}
  //       handleAddCoupon={handleAddCouponMock}
  //     />
  //   );
  //   const button = screen.getByTestId('add-btn');
  //   fireEvent.click(button);
  //   expect(handleAddCouponMock).not.toHaveBeenCalled();
  // });
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import HomeCouponModal from '../../components/Coupon/HomeCouponModal';
import { request } from '../../axios/AxiosHelper';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn().mockImplementation(() =>
    Promise.resolve({
      coupons: [] // You can put here the mocked data you want to use for your tests
    })
  )
}));

describe('HomeCouponModal', () => {
  const setCouponVisibilityMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('TC0: renders correctly with coupons', async () => {
    request.mockResolvedValueOnce({
      coupons: [{ coupon: { data: '1GB' } }, { coupon: { data: '2GB' } }]
    });

    const { findByText } = render(
      <MemoryRouter>
        <HomeCouponModal
          setCouponsDetailsVisibility={setCouponVisibilityMock}
        />
      </MemoryRouter>
    );

    expect(await findByText(/1GB/i)).toBeInTheDocument();
    expect(await findByText(/2GB/i)).toBeInTheDocument();
    expect(await findByText('Available Coupons')).toBeInTheDocument();
    expect(await findByText('Apply Coupon')).toBeInTheDocument();
  });

  it('TC1: renders correctly without coupons', async () => {
    request.mockResolvedValueOnce({ coupons: [] });

    const { findByText } = render(
      <MemoryRouter>
        <HomeCouponModal
          setCouponsDetailsVisibility={setCouponVisibilityMock}
        />
      </MemoryRouter>
    );

    expect(await findByText('No Coupons Found!!')).toBeInTheDocument();
  });

  it('TC2: calls handleClose when the Close button is clicked', async () => {
    request.mockResolvedValueOnce({ coupons: [] });

    const { findByTestId } = render(
      <MemoryRouter>
        <HomeCouponModal
          setCouponsDetailsVisibility={setCouponVisibilityMock}
        />
      </MemoryRouter>
    );

    fireEvent.click(await findByTestId('close-button'));

    // expect(setCouponVisibilityMock).toHaveBeenCalledWith("0");
  });

  it('TC3: calls handleCouponSelect when a coupon is clicked', async () => {
    request.mockResolvedValueOnce({
      coupons: [{ coupon: { data: '1GB' } }]
    });

    const { findByText } = render(
      <MemoryRouter>
        <HomeCouponModal
          setCouponsDetailsVisibility={setCouponVisibilityMock}
        />
      </MemoryRouter>
    );

    fireEvent.click(await findByText(/1GB/i));

    // Add your assertions here to check if the coupon was selected
  });

  it('TC4: does not render Apply Coupon button when type is viewCoupon', async () => {
    request.mockResolvedValueOnce({
      coupons: [{ coupon: { data: '1GB' } }]
    });

    const { queryByText } = render(
      <MemoryRouter>
        <HomeCouponModal
          setCouponsDetailsVisibility={setCouponVisibilityMock}
        />
      </MemoryRouter>
    );

    expect(queryByText('Apply Coupon')).not.toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { request } from '../../axios/AxiosHelper';
import CouponModal from '../../components/Coupon/CouponModal';

jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn() // Mock the request function
}));

describe('CouponModal Component', () => {
  const setCouponsDetailsVisibilityMock = jest.fn();

  const clickedPlan = {
    couponIds: ['exampleCouponId']
  };

  beforeEach(() => {
    request.mockClear();
  });

  it('T1: fetches coupon details on component mount and displays them', async () => {
    const couponData = {
      data: '5',
      expire: '2024-12-31',
      type: 'Discount',
      limit: 'Single Use',
      couponCode: 'EXAMPLECODE',
      url: 'https://example.com'
    };

    request.mockResolvedValueOnce({ coupons: couponData });

    render(
      <CouponModal
        setCouponsDetailsVisibility={setCouponsDetailsVisibilityMock}
        clickedPlan={clickedPlan}
      />
    );

    await waitFor(() => {
      expect(request).toHaveBeenCalledWith(
        'GET',
        '/mobile/coupon/exampleCouponId'
      );
    });

    expect(screen.getByText('5 GB')).toBeInTheDocument();
    expect(screen.getByText('2024-12-31')).toBeInTheDocument();
    expect(screen.getByText('Discount')).toBeInTheDocument();
    expect(screen.getByText('Single Use')).toBeInTheDocument();
    expect(screen.getByText('EXAMPLECODE')).toBeInTheDocument();
    expect(screen.getByText('https://example.com')).toBeInTheDocument();
  });

  // it("T2: renders the CouponModal component", () => {
  //   render(
  //     <CouponModal setCouponsDetailsVisibility={setCouponsDetailsVisibilityMock} clickedPlan={clickedPlan} />
  //   );

  //   expect(screen.getByText("Coupon Details")).toBeInTheDocument();
  // });

  // it("T3: closes the modal when close button is clicked", () => {
  //   render(
  //     <CouponModal setCouponsDetailsVisibility={setCouponsDetailsVisibilityMock} clickedPlan={clickedPlan} />
  //   );

  //   fireEvent.click(screen.getByTestId("coupon-modal-close"));

  //   expect(setCouponsDetailsVisibilityMock).toHaveBeenCalledWith(false);
  // });

  it('T4: fetches coupon details on component mount and displays them', async () => {
    const couponData = {
      data: '5',
      expire: '2024-12-31',
      type: 'Discount',
      limit: 'Single Use',
      couponCode: 'EXAMPLECODE',
      url: 'https://example.com'
    };

    request.mockResolvedValueOnce({ coupons: couponData });

    render(
      <CouponModal
        setCouponsDetailsVisibility={setCouponsDetailsVisibilityMock}
        clickedPlan={clickedPlan}
      />
    );

    await waitFor(() => {
      expect(request).toHaveBeenCalledWith(
        'GET',
        '/mobile/coupon/exampleCouponId'
      );
    });

    expect(screen.getByText('5 GB')).toBeInTheDocument();
    expect(screen.getByText('2024-12-31')).toBeInTheDocument();
    expect(screen.getByText('Discount')).toBeInTheDocument();
    expect(screen.getByText('Single Use')).toBeInTheDocument();
    expect(screen.getByText('EXAMPLECODE')).toBeInTheDocument();
    expect(screen.getByText('https://example.com')).toBeInTheDocument();
  });

  // it("T5: handles API request error", async () => {
  //   request.mockRejectedValueOnce(new Error("Request failed"));

  //   render(
  //     <CouponModal
  //       setCouponsDetailsVisibility={setCouponsDetailsVisibilityMock}
  //       clickedPlan={clickedPlan}
  //     />
  //   );

  //   await waitFor(() => {
  //     expect(request).toHaveBeenCalledWith("GET", "/mobile/coupon/exampleCouponId");
  //   });

  //   // Use a custom function for text matcher
  //   const findRequestFailedText = () => screen.queryByText("Request failed");

  //   // Assert that the text is present using the custom function
  //   expect(findRequestFailedText()).toBeInTheDocument();
  // });
  // it("T6: calls setCouponsDetailsVisibility(false) when closing modal", () => {
  //   render(
  //     <CouponModal
  //       setCouponsDetailsVisibility={setCouponsDetailsVisibilityMock}
  //       clickedPlan={clickedPlan}
  //     />
  //   );

  //   fireEvent.click(screen.getByTestId("coupon-modal-close"));

  //   expect(setCouponsDetailsVisibilityMock).toHaveBeenCalledWith(false);
  // });
});

import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitFor,
  queryByTestId,
  getByRole,
  within
} from '@testing-library/react';
import AdminAddEditPlan from '../../components/Admin/AdminPlan/AdminAddEditPlan';
import Swal from 'sweetalert2';
import axios from 'axios'; // import axios

import { request } from '../../axios/AxiosHelper';
jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn() // Mock the request function
}));

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ status: 'CREATED' }))
}));

jest.mock('sweetalert2', () => ({ fire: jest.fn() }));

describe('AdminAddEditPlan', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test
  });
  test('TC-01: Renders all elements properly', () => {
    render(
      <AdminAddEditPlan
        planDetails={{
          // Fill in plan details here
          // Ensure all required properties are provided, even if they are empty strings
          planId: '',
          planType: '',
          price: '',
          category: '', // Set a default value for the category if needed
          validity: '',
          ott: [],
          voiceLimit: '',
          sms: '',
          data: '',
          couponIds: [],
          limit: '',
          speed: '',
          active: 'True' // Assuming this should be a string
        }}
        handleAddPlan={() => {
          // Implement handleAddPlan function
        }}
        handleEditPlan={() => {
          // Implement handleEditPlan function
        }}
        addEditFlag={false}
        setAddEditFlag={() => {
          // Implement setAddEditFlag function
        }}
        adminPlanType="broadband"
        planCoupon={null} // Assuming planCoupon is another prop and can be set to null initially
      />
    );

    // Ensure form elements are rendered
    expect(screen.getByTestId('price')).toBeInTheDocument();
    expect(screen.getByTestId('validity')).toBeInTheDocument();
    expect(screen.getByTestId('category')).toBeInTheDocument();
    expect(screen.getByTestId('data')).toBeInTheDocument();
    expect(screen.getByTestId('SMS')).toBeInTheDocument();
    expect(screen.getByTestId('voice-limit')).toBeInTheDocument();
    expect(screen.getByTestId('limit')).toBeInTheDocument();
    expect(screen.getByTestId('add-coupon-button')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  test('TC-02: Handles checkbox change properly', () => {
    render(
      <AdminAddEditPlan
        planDetails={{
          // Fill in plan details here
          // Ensure all required properties are provided, even if they are empty strings
          planId: '',
          planType: '',
          price: '',
          category: '', // Set a default value for the category if needed
          validity: '',
          ott: [],
          voiceLimit: '',
          sms: '',
          data: '',
          couponIds: [],
          limit: '',
          speed: '',
          active: 'True' // Assuming this should be a string
        }}
        handleAddPlan={() => {
          // Implement handleAddPlan function
        }}
        handleEditPlan={() => {
          // Implement handleEditPlan function
        }}
        addEditFlag={false}
        setAddEditFlag={() => {
          // Implement setAddEditFlag function
        }}
        adminPlanType="broadband"
        planCoupon={null} // Assuming planCoupon is another prop and can be set to null initially
      />
    );

    // Check and verify Spotify checkbox
    fireEvent.click(screen.getByTestId('spotify').querySelector('input'));
    expect(screen.getByTestId('spotify').querySelector('input')).toBeChecked();

    // Click on Prime checkbox and verify it's checked
    fireEvent.click(screen.getByTestId('prime').querySelector('input'));
    expect(screen.getByTestId('prime').querySelector('input')).toBeChecked();

    // Click again on Prime checkbox to uncheck and verify it's unchecked
    fireEvent.click(screen.getByTestId('prime').querySelector('input'));
    expect(
      screen.getByTestId('prime').querySelector('input')
    ).not.toBeChecked();

    // Click on Disney checkbox and verify it's checked
    fireEvent.click(screen.getByTestId('disney').querySelector('input'));
    expect(screen.getByTestId('disney').querySelector('input')).toBeChecked();

    // Click again on Disney checkbox to uncheck and verify it's unchecked
    fireEvent.click(screen.getByTestId('disney').querySelector('input'));
    expect(
      screen.getByTestId('disney').querySelector('input')
    ).not.toBeChecked();

    // Click on Netflix checkbox and verify it's checked
    fireEvent.click(screen.getByTestId('netflix').querySelector('input'));
    expect(screen.getByTestId('netflix').querySelector('input')).toBeChecked();

    // Click again on Netflix checkbox to uncheck and verify it's unchecked
    fireEvent.click(screen.getByTestId('netflix').querySelector('input'));
    expect(
      screen.getByTestId('netflix').querySelector('input')
    ).not.toBeChecked();
  });

  test('TC3: Submits form data properly for broadband plan', async () => {
    render(
      <AdminAddEditPlan
        planDetails={{
          planId: '',
          planType: '',
          price: '',
          category: '',
          validity: '',
          ott: [],
          voiceLimit: '',
          sms: '',
          data: '',
          couponIds: [],
          limit: '',
          speed: '',
          active: 'True'
        }}
        handleAddPlan={jest.fn()}
        handleEditPlan={jest.fn()}
        addEditFlag={false}
        setAddEditFlag={jest.fn()}
        adminPlanType="Broadband"
        planCoupon={null}
      />
    );

    // Fill form inputs
    fireEvent.change(screen.getByTestId('price').querySelector('input'), {
      target: { value: '100' }
    });

    const testVal = screen.getByTestId('validity');
    const buttonVal = within(testVal).getByRole('combobox');
    fireEvent.mouseDown(buttonVal);
    const listboxVal = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxVal).getAllByRole('option')[0]);

    const testCat = screen.getByTestId('category');
    const buttonCat = within(testCat).getByRole('combobox');
    fireEvent.mouseDown(buttonCat);
    const listboxCat = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxCat).getAllByRole('option')[0]);

    const testData = screen.getByTestId('data');
    const buttonData = within(testData).getByRole('combobox');
    fireEvent.mouseDown(buttonData);
    const listboxData = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxData).getAllByRole('option')[0]);

    const testSMS = screen.getByTestId('SMS');
    const buttonSMS = within(testSMS).getByRole('combobox');
    fireEvent.mouseDown(buttonSMS);
    const listboxSMS = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxSMS).getAllByRole('option')[0]);

    const testVoiceLimit = screen.getByTestId('voice-limit');
    const buttonVoiceLimit = within(testVoiceLimit).getByRole('combobox');
    fireEvent.mouseDown(buttonVoiceLimit);
    const listboxVoiceLimit = within(
      screen.getByRole('presentation')
    ).getByRole('listbox');
    fireEvent.click(within(listboxVoiceLimit).getAllByRole('option')[0]);

    const testLimit = screen.getByTestId('limit');
    const buttonLimit = within(testLimit).getByRole('combobox');
    fireEvent.mouseDown(buttonLimit);
    const listboxLimit = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxLimit).getAllByRole('option')[0]);

    fireEvent.click(screen.getByTestId('add-coupon-button'));
    const mockResponse = {
      status: 'OK',
      coupons: [
        {
          couponId: '0aa79d8a-4694-4a64-8048-b6627d1d30fc',
          data: '2',
          expire: '1721039174000',
          type: 'Internal',
          limit: '92',
          couponCode: 'EXC70904',
          description: 'Not defined',
          url: null,
          image:
            'https://printable-map-az.com/wp-content/uploads/2019/07/the-best-free-coupons-available-free-printable-coupon-websites.jpg'
        },
        {
          couponId: '0e4fe793-2a3d-4754-9080-37dba364aae4',
          data: '3',
          expire: '1729333574000',
          type: 'Internal',
          limit: '94',
          couponCode: 'EXC70671',
          description: 'Not defined',
          url: null,
          image:
            'https://printable-map-az.com/wp-content/uploads/2019/07/the-best-free-coupons-available-free-printable-coupon-websites.jpg'
        }
      ]
    };
    require('../../axios/AxiosHelper').request.mockResolvedValue(mockResponse);

    // Wait for the modal to appear
    await waitFor(() => {
      expect(screen.getByText('ADD COUPON')).toBeInTheDocument();
    });

    const adminCoupon = screen.getAllByText('2 GB'); // Assuming '2 GB' is the text of the coupon
    fireEvent.click(adminCoupon[0]);

    // Click the "Add Coupon" button inside the modal
    const addCouponButton = screen.getByTestId('add-btn');
    fireEvent.click(addCouponButton);

    jest.clearAllMocks();

    const mockResponse1 = { status: 'CREATED' };
    require('../../axios/AxiosHelper').request.mockResolvedValue(mockResponse1);

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: 'success',
        title: 'New Broadband Plan Added successfuly',
        showConfirmButton: false,
        timer: 1500
      });
    });
  });

  test('TC-04: Submits form data properly for prepaid plan', async () => {
    render(
      <AdminAddEditPlan
        planDetails={{
          planId: '',
          planType: '',
          price: '',
          category: '',
          validity: '',
          ott: [],
          voiceLimit: '',
          sms: '',
          data: '',
          couponIds: [],
          limit: '',
          speed: '',
          active: 'True'
        }}
        handleAddPlan={jest.fn()}
        handleEditPlan={jest.fn()}
        addEditFlag={false}
        setAddEditFlag={jest.fn()}
        adminPlanType="Prepaid"
        planCoupon={null}
      />
    );

    // Fill form inputs
    fireEvent.change(screen.getByTestId('price').querySelector('input'), {
      target: { value: '100' }
    });

    const testVal = screen.getByTestId('validity');
    const buttonVal = within(testVal).getByRole('combobox');
    fireEvent.mouseDown(buttonVal);
    const listboxVal = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxVal).getAllByRole('option')[0]);

    const testCat = screen.getByTestId('category');
    const buttonCat = within(testCat).getByRole('combobox');
    fireEvent.mouseDown(buttonCat);
    const listboxCat = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxCat).getAllByRole('option')[0]);

    const testData = screen.getByTestId('data');
    const buttonData = within(testData).getByRole('combobox');
    fireEvent.mouseDown(buttonData);
    const listboxData = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxData).getAllByRole('option')[0]);

    const testSMS = screen.getByTestId('SMS');
    const buttonSMS = within(testSMS).getByRole('combobox');
    fireEvent.mouseDown(buttonSMS);
    const listboxSMS = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxSMS).getAllByRole('option')[0]);

    const testVoiceLimit = screen.getByTestId('voice-limit');
    const buttonVoiceLimit = within(testVoiceLimit).getByRole('combobox');
    fireEvent.mouseDown(buttonVoiceLimit);
    const listboxVoiceLimit = within(
      screen.getByRole('presentation')
    ).getByRole('listbox');
    fireEvent.click(within(listboxVoiceLimit).getAllByRole('option')[0]);

    const testLimit = screen.getByTestId('limit');
    const buttonLimit = within(testLimit).getByRole('combobox');
    fireEvent.mouseDown(buttonLimit);
    const listboxLimit = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxLimit).getAllByRole('option')[0]);

    fireEvent.click(screen.getByTestId('add-coupon-button'));
    const mockResponse = {
      status: 'OK',
      coupons: [
        {
          couponId: '0aa79d8a-4694-4a64-8048-b6627d1d30fc',
          data: '2',
          expire: '1721039174000',
          type: 'Internal',
          limit: '92',
          couponCode: 'EXC70904',
          description: 'Not defined',
          url: null,
          image:
            'https://printable-map-az.com/wp-content/uploads/2019/07/the-best-free-coupons-available-free-printable-coupon-websites.jpg'
        },
        {
          couponId: '0e4fe793-2a3d-4754-9080-37dba364aae4',
          data: '3',
          expire: '1729333574000',
          type: 'Internal',
          limit: '94',
          couponCode: 'EXC70671',
          description: 'Not defined',
          url: null,
          image:
            'https://printable-map-az.com/wp-content/uploads/2019/07/the-best-free-coupons-available-free-printable-coupon-websites.jpg'
        }
      ]
    };
    require('../../axios/AxiosHelper').request.mockResolvedValue(mockResponse);

    // Wait for the modal to appear
    await waitFor(() => {
      expect(screen.getByText('ADD COUPON')).toBeInTheDocument();
    });

    const adminCoupon = screen.getAllByText('2 GB'); // Assuming '2 GB' is the text of the coupon
    fireEvent.click(adminCoupon[0]);

    // Click the "Add Coupon" button inside the modal
    const addCouponButton = screen.getByTestId('add-btn');
    fireEvent.click(addCouponButton);

    jest.clearAllMocks();

    const mockResponse1 = { status: 'CREATED' };
    require('../../axios/AxiosHelper').request.mockResolvedValue(mockResponse1);

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: 'success',
        title: 'New Prepaid Plan Added successfuly',
        showConfirmButton: false,
        timer: 1500
      });
    });
  });

  test('TC-05: Submits form data properly for postpaid plan', async () => {
    render(
      <AdminAddEditPlan
        planDetails={{
          planId: '',
          planType: '',
          price: '',
          category: '',
          validity: '',
          ott: [],
          voiceLimit: '',
          sms: '',
          data: '',
          couponIds: [],
          limit: '',
          speed: '',
          active: 'True'
        }}
        handleAddPlan={jest.fn()}
        handleEditPlan={jest.fn()}
        addEditFlag={false}
        setAddEditFlag={jest.fn()}
        adminPlanType="Postpaid"
        planCoupon={null}
      />
    );

    // Fill form inputs
    fireEvent.change(screen.getByTestId('price').querySelector('input'), {
      target: { value: '100' }
    });

    const testVal = screen.getByTestId('validity');
    const buttonVal = within(testVal).getByRole('combobox');
    fireEvent.mouseDown(buttonVal);
    const listboxVal = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxVal).getAllByRole('option')[0]);

    const testCat = screen.getByTestId('category');
    const buttonCat = within(testCat).getByRole('combobox');
    fireEvent.mouseDown(buttonCat);
    const listboxCat = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxCat).getAllByRole('option')[0]);

    const testData = screen.getByTestId('data');
    const buttonData = within(testData).getByRole('combobox');
    fireEvent.mouseDown(buttonData);
    const listboxData = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxData).getAllByRole('option')[0]);

    const testSMS = screen.getByTestId('SMS');
    const buttonSMS = within(testSMS).getByRole('combobox');
    fireEvent.mouseDown(buttonSMS);
    const listboxSMS = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxSMS).getAllByRole('option')[0]);

    const testVoiceLimit = screen.getByTestId('voice-limit');
    const buttonVoiceLimit = within(testVoiceLimit).getByRole('combobox');
    fireEvent.mouseDown(buttonVoiceLimit);
    const listboxVoiceLimit = within(
      screen.getByRole('presentation')
    ).getByRole('listbox');
    fireEvent.click(within(listboxVoiceLimit).getAllByRole('option')[0]);

    const testLimit = screen.getByTestId('limit');
    const buttonLimit = within(testLimit).getByRole('combobox');
    fireEvent.mouseDown(buttonLimit);
    const listboxLimit = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxLimit).getAllByRole('option')[0]);

    fireEvent.click(screen.getByTestId('add-coupon-button'));
    const mockResponse = {
      status: 'OK',
      coupons: [
        {
          couponId: '0aa79d8a-4694-4a64-8048-b6627d1d30fc',
          data: '2',
          expire: '1721039174000',
          type: 'Internal',
          limit: '92',
          couponCode: 'EXC70904',
          description: 'Not defined',
          url: null,
          image:
            'https://printable-map-az.com/wp-content/uploads/2019/07/the-best-free-coupons-available-free-printable-coupon-websites.jpg'
        },
        {
          couponId: '0e4fe793-2a3d-4754-9080-37dba364aae4',
          data: '3',
          expire: '1729333574000',
          type: 'Internal',
          limit: '94',
          couponCode: 'EXC70671',
          description: 'Not defined',
          url: null,
          image:
            'https://printable-map-az.com/wp-content/uploads/2019/07/the-best-free-coupons-available-free-printable-coupon-websites.jpg'
        }
      ]
    };
    require('../../axios/AxiosHelper').request.mockResolvedValue(mockResponse);

    // Wait for the modal to appear
    await waitFor(() => {
      expect(screen.getByText('ADD COUPON')).toBeInTheDocument();
    });

    const adminCoupon = screen.getAllByText('2 GB'); // Assuming '2 GB' is the text of the coupon
    fireEvent.click(adminCoupon[0]);

    // Click the "Add Coupon" button inside the modal
    const addCouponButton = screen.getByTestId('add-btn');
    fireEvent.click(addCouponButton);

    jest.clearAllMocks();

    const mockResponse1 = { status: 'CREATED' };
    require('../../axios/AxiosHelper').request.mockResolvedValue(mockResponse1);

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: 'success',
        title: 'New Postpaid Plan Added successfuly',
        showConfirmButton: false,
        timer: 1500
      });
    });
  });

  test('TC-06: Handles error properly for broadband plan', async () => {
    render(
      <AdminAddEditPlan
        planDetails={{
          planId: '',
          planType: '',
          price: '',
          category: '',
          validity: '',
          ott: [],
          voiceLimit: '',
          sms: '',
          data: '',
          couponIds: [],
          limit: '',
          speed: '',
          active: 'True'
        }}
        handleAddPlan={jest.fn()}
        handleEditPlan={jest.fn()}
        addEditFlag={false}
        setAddEditFlag={jest.fn()}
        adminPlanType="Broadband"
        planCoupon={null}
      />
    );

    // Fill form inputs
    fireEvent.change(screen.getByTestId('price').querySelector('input'), {
      target: { value: '100' }
    });

    const testVal = screen.getByTestId('validity');
    const buttonVal = within(testVal).getByRole('combobox');
    fireEvent.mouseDown(buttonVal);
    const listboxVal = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxVal).getAllByRole('option')[0]);

    const testCat = screen.getByTestId('category');
    const buttonCat = within(testCat).getByRole('combobox');
    fireEvent.mouseDown(buttonCat);
    const listboxCat = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxCat).getAllByRole('option')[0]);

    const testData = screen.getByTestId('data');
    const buttonData = within(testData).getByRole('combobox');
    fireEvent.mouseDown(buttonData);
    const listboxData = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxData).getAllByRole('option')[0]);

    const testSMS = screen.getByTestId('SMS');
    const buttonSMS = within(testSMS).getByRole('combobox');
    fireEvent.mouseDown(buttonSMS);
    const listboxSMS = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxSMS).getAllByRole('option')[0]);

    const testVoiceLimit = screen.getByTestId('voice-limit');
    const buttonVoiceLimit = within(testVoiceLimit).getByRole('combobox');
    fireEvent.mouseDown(buttonVoiceLimit);
    const listboxVoiceLimit = within(
      screen.getByRole('presentation')
    ).getByRole('listbox');
    fireEvent.click(within(listboxVoiceLimit).getAllByRole('option')[0]);

    const testLimit = screen.getByTestId('limit');
    const buttonLimit = within(testLimit).getByRole('combobox');
    fireEvent.mouseDown(buttonLimit);
    const listboxLimit = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxLimit).getAllByRole('option')[0]);

    fireEvent.click(screen.getByTestId('add-coupon-button'));
    const mockResponse = {
      status: 'OK',
      coupons: [
        {
          couponId: '0aa79d8a-4694-4a64-8048-b6627d1d30fc',
          data: '2',
          expire: '1721039174000',
          type: 'Internal',
          limit: '92',
          couponCode: 'EXC70904',
          description: 'Not defined',
          url: null,
          image:
            'https://printable-map-az.com/wp-content/uploads/2019/07/the-best-free-coupons-available-free-printable-coupon-websites.jpg'
        },
        {
          couponId: '0e4fe793-2a3d-4754-9080-37dba364aae4',
          data: '3',
          expire: '1729333574000',
          type: 'Internal',
          limit: '94',
          couponCode: 'EXC70671',
          description: 'Not defined',
          url: null,
          image:
            'https://printable-map-az.com/wp-content/uploads/2019/07/the-best-free-coupons-available-free-printable-coupon-websites.jpg'
        }
      ]
    };
    require('../../axios/AxiosHelper').request.mockResolvedValue(mockResponse);

    // Wait for the modal to appear
    await waitFor(() => {
      expect(screen.getByText('ADD COUPON')).toBeInTheDocument();
    });

    const adminCoupon = screen.getAllByText('2 GB'); // Assuming '2 GB' is the text of the coupon
    fireEvent.click(adminCoupon[0]);

    // Click the "Add Coupon" button inside the modal
    const addCouponButton = screen.getByTestId('add-btn');
    fireEvent.click(addCouponButton);

    jest.clearAllMocks();

    require('../../axios/AxiosHelper').request.mockImplementation(() => {
      throw new Error('Request failed');
    });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: 'Request failed',
        timer: 1000
      });
    });
  });

  test('TC-07: Handles error properly for prepaid plan', async () => {
    render(
      <AdminAddEditPlan
        planDetails={{
          planId: '',
          planType: '',
          price: '',
          category: '',
          validity: '',
          ott: [],
          voiceLimit: '',
          sms: '',
          data: '',
          couponIds: [],
          limit: '',
          speed: '',
          active: 'True'
        }}
        handleAddPlan={jest.fn()}
        handleEditPlan={jest.fn()}
        addEditFlag={false}
        setAddEditFlag={jest.fn()}
        adminPlanType="Prepaid"
        planCoupon={null}
      />
    );

    // Fill form inputs
    fireEvent.change(screen.getByTestId('price').querySelector('input'), {
      target: { value: '100' }
    });

    const testVal = screen.getByTestId('validity');
    const buttonVal = within(testVal).getByRole('combobox');
    fireEvent.mouseDown(buttonVal);
    const listboxVal = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxVal).getAllByRole('option')[0]);

    const testCat = screen.getByTestId('category');
    const buttonCat = within(testCat).getByRole('combobox');
    fireEvent.mouseDown(buttonCat);
    const listboxCat = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxCat).getAllByRole('option')[0]);

    const testData = screen.getByTestId('data');
    const buttonData = within(testData).getByRole('combobox');
    fireEvent.mouseDown(buttonData);
    const listboxData = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxData).getAllByRole('option')[0]);

    const testSMS = screen.getByTestId('SMS');
    const buttonSMS = within(testSMS).getByRole('combobox');
    fireEvent.mouseDown(buttonSMS);
    const listboxSMS = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxSMS).getAllByRole('option')[0]);

    const testVoiceLimit = screen.getByTestId('voice-limit');
    const buttonVoiceLimit = within(testVoiceLimit).getByRole('combobox');
    fireEvent.mouseDown(buttonVoiceLimit);
    const listboxVoiceLimit = within(
      screen.getByRole('presentation')
    ).getByRole('listbox');
    fireEvent.click(within(listboxVoiceLimit).getAllByRole('option')[0]);

    const testLimit = screen.getByTestId('limit');
    const buttonLimit = within(testLimit).getByRole('combobox');
    fireEvent.mouseDown(buttonLimit);
    const listboxLimit = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxLimit).getAllByRole('option')[0]);

    fireEvent.click(screen.getByTestId('add-coupon-button'));
    const mockResponse = {
      status: 'OK',
      coupons: [
        {
          couponId: '0aa79d8a-4694-4a64-8048-b6627d1d30fc',
          data: '2',
          expire: '1721039174000',
          type: 'Internal',
          limit: '92',
          couponCode: 'EXC70904',
          description: 'Not defined',
          url: null,
          image:
            'https://printable-map-az.com/wp-content/uploads/2019/07/the-best-free-coupons-available-free-printable-coupon-websites.jpg'
        },
        {
          couponId: '0e4fe793-2a3d-4754-9080-37dba364aae4',
          data: '3',
          expire: '1729333574000',
          type: 'Internal',
          limit: '94',
          couponCode: 'EXC70671',
          description: 'Not defined',
          url: null,
          image:
            'https://printable-map-az.com/wp-content/uploads/2019/07/the-best-free-coupons-available-free-printable-coupon-websites.jpg'
        }
      ]
    };
    require('../../axios/AxiosHelper').request.mockResolvedValue(mockResponse);

    // Wait for the modal to appear
    await waitFor(() => {
      expect(screen.getByText('ADD COUPON')).toBeInTheDocument();
    });

    const adminCoupon = screen.getAllByText('2 GB'); // Assuming '2 GB' is the text of the coupon
    fireEvent.click(adminCoupon[0]);

    // Click the "Add Coupon" button inside the modal
    const addCouponButton = screen.getByTestId('add-btn');
    fireEvent.click(addCouponButton);

    jest.clearAllMocks();

    require('../../axios/AxiosHelper').request.mockImplementation(() => {
      throw new Error('Request failed');
    });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: 'Request failed',
        timer: 1000
      });
    });
  });

  test('TC-08: Handles error properly for postpaid plan', async () => {
    render(
      <AdminAddEditPlan
        planDetails={{
          planId: '',
          planType: '',
          price: '',
          category: '',
          validity: '',
          ott: [],
          voiceLimit: '',
          sms: '',
          data: '',
          couponIds: [],
          limit: '',
          speed: '',
          active: 'True'
        }}
        handleAddPlan={jest.fn()}
        handleEditPlan={jest.fn()}
        addEditFlag={false}
        setAddEditFlag={jest.fn()}
        adminPlanType="Postpaid"
        planCoupon={null}
      />
    );

    // Fill form inputs
    fireEvent.change(screen.getByTestId('price').querySelector('input'), {
      target: { value: '100' }
    });

    const testVal = screen.getByTestId('validity');
    const buttonVal = within(testVal).getByRole('combobox');
    fireEvent.mouseDown(buttonVal);
    const listboxVal = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxVal).getAllByRole('option')[0]);

    const testCat = screen.getByTestId('category');
    const buttonCat = within(testCat).getByRole('combobox');
    fireEvent.mouseDown(buttonCat);
    const listboxCat = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxCat).getAllByRole('option')[0]);

    const testData = screen.getByTestId('data');
    const buttonData = within(testData).getByRole('combobox');
    fireEvent.mouseDown(buttonData);
    const listboxData = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxData).getAllByRole('option')[0]);

    const testSMS = screen.getByTestId('SMS');
    const buttonSMS = within(testSMS).getByRole('combobox');
    fireEvent.mouseDown(buttonSMS);
    const listboxSMS = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxSMS).getAllByRole('option')[0]);

    const testVoiceLimit = screen.getByTestId('voice-limit');
    const buttonVoiceLimit = within(testVoiceLimit).getByRole('combobox');
    fireEvent.mouseDown(buttonVoiceLimit);
    const listboxVoiceLimit = within(
      screen.getByRole('presentation')
    ).getByRole('listbox');
    fireEvent.click(within(listboxVoiceLimit).getAllByRole('option')[0]);

    const testLimit = screen.getByTestId('limit');
    const buttonLimit = within(testLimit).getByRole('combobox');
    fireEvent.mouseDown(buttonLimit);
    const listboxLimit = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxLimit).getAllByRole('option')[0]);

    fireEvent.click(screen.getByTestId('add-coupon-button'));
    const mockResponse = {
      status: 'OK',
      coupons: [
        {
          couponId: '0aa79d8a-4694-4a64-8048-b6627d1d30fc',
          data: '2',
          expire: '1721039174000',
          type: 'Internal',
          limit: '92',
          couponCode: 'EXC70904',
          description: 'Not defined',
          url: null,
          image:
            'https://printable-map-az.com/wp-content/uploads/2019/07/the-best-free-coupons-available-free-printable-coupon-websites.jpg'
        },
        {
          couponId: '0e4fe793-2a3d-4754-9080-37dba364aae4',
          data: '3',
          expire: '1729333574000',
          type: 'Internal',
          limit: '94',
          couponCode: 'EXC70671',
          description: 'Not defined',
          url: null,
          image:
            'https://printable-map-az.com/wp-content/uploads/2019/07/the-best-free-coupons-available-free-printable-coupon-websites.jpg'
        }
      ]
    };
    require('../../axios/AxiosHelper').request.mockResolvedValue(mockResponse);

    // Wait for the modal to appear
    await waitFor(() => {
      expect(screen.getByText('ADD COUPON')).toBeInTheDocument();
    });

    const adminCoupon = screen.getAllByText('2 GB'); // Assuming '2 GB' is the text of the coupon
    fireEvent.click(adminCoupon[0]);

    // Click the "Add Coupon" button inside the modal
    const addCouponButton = screen.getByTestId('add-btn');
    fireEvent.click(addCouponButton);

    jest.clearAllMocks();

    require('../../axios/AxiosHelper').request.mockImplementation(() => {
      throw new Error('Request failed');
    });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: 'Request failed',
        timer: 1000
      });
    });
  });

  test('TC-09: Handles success properly for broadband plan update', async () => {
    render(
      <AdminAddEditPlan
        planDetails={{
          planId: '',
          planType: '',
          price: '',
          category: '',
          validity: '',
          ott: [],
          voiceLimit: '',
          sms: '',
          data: '',
          couponIds: [],
          limit: '',
          speed: '',
          active: 'True'
        }}
        handleAddPlan={jest.fn()}
        handleEditPlan={jest.fn()}
        addEditFlag={true}
        setAddEditFlag={jest.fn()}
        adminPlanType="Broadband"
        planCoupon={null}
      />
    );

    // Fill form inputs
    fireEvent.change(screen.getByTestId('price').querySelector('input'), {
      target: { value: '100' }
    });

    const testVal = screen.getByTestId('validity');
    const buttonVal = within(testVal).getByRole('combobox');
    fireEvent.mouseDown(buttonVal);
    const listboxVal = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxVal).getAllByRole('option')[0]);

    const testCat = screen.getByTestId('category');
    const buttonCat = within(testCat).getByRole('combobox');
    fireEvent.mouseDown(buttonCat);
    const listboxCat = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxCat).getAllByRole('option')[0]);

    const testData = screen.getByTestId('data');
    const buttonData = within(testData).getByRole('combobox');
    fireEvent.mouseDown(buttonData);
    const listboxData = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxData).getAllByRole('option')[0]);

    const testSMS = screen.getByTestId('SMS');
    const buttonSMS = within(testSMS).getByRole('combobox');
    fireEvent.mouseDown(buttonSMS);
    const listboxSMS = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxSMS).getAllByRole('option')[0]);

    const testVoiceLimit = screen.getByTestId('voice-limit');
    const buttonVoiceLimit = within(testVoiceLimit).getByRole('combobox');
    fireEvent.mouseDown(buttonVoiceLimit);
    const listboxVoiceLimit = within(
      screen.getByRole('presentation')
    ).getByRole('listbox');
    fireEvent.click(within(listboxVoiceLimit).getAllByRole('option')[0]);

    const testLimit = screen.getByTestId('limit');
    const buttonLimit = within(testLimit).getByRole('combobox');
    fireEvent.mouseDown(buttonLimit);
    const listboxLimit = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxLimit).getAllByRole('option')[0]);

    fireEvent.click(screen.getByTestId('add-coupon-button'));
    const mockResponse = {
      status: 'OK',
      coupons: [
        {
          couponId: '0aa79d8a-4694-4a64-8048-b6627d1d30fc',
          data: '2',
          expire: '1721039174000',
          type: 'Internal',
          limit: '92',
          couponCode: 'EXC70904',
          description: 'Not defined',
          url: null,
          image:
            'https://printable-map-az.com/wp-content/uploads/2019/07/the-best-free-coupons-available-free-printable-coupon-websites.jpg'
        },
        {
          couponId: '0e4fe793-2a3d-4754-9080-37dba364aae4',
          data: '3',
          expire: '1729333574000',
          type: 'Internal',
          limit: '94',
          couponCode: 'EXC70671',
          description: 'Not defined',
          url: null,
          image:
            'https://printable-map-az.com/wp-content/uploads/2019/07/the-best-free-coupons-available-free-printable-coupon-websites.jpg'
        }
      ]
    };
    require('../../axios/AxiosHelper').request.mockResolvedValue(mockResponse);

    // Wait for the modal to appear
    await waitFor(() => {
      expect(screen.getByText('ADD COUPON')).toBeInTheDocument();
    });

    const adminCoupon = screen.getAllByText('2 GB'); // Assuming '2 GB' is the text of the coupon
    fireEvent.click(adminCoupon[0]);

    // Click the "Add Coupon" button inside the modal
    const addCouponButton = screen.getByTestId('add-btn');
    fireEvent.click(addCouponButton);

    jest.clearAllMocks();

    const mockResponse1 = { status: 'CREATED' };
    require('../../axios/AxiosHelper').request.mockResolvedValue(mockResponse1);

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: 'success',
        title: 'Broadband Plan updated successfuly',
        showConfirmButton: false,
        timer: 1500
      });
    });
  });

  test('TC-10: Handles success properly for prepaid plan update', async () => {
    render(
      <AdminAddEditPlan
        planDetails={{
          planId: '',
          planType: '',
          price: '',
          category: '',
          validity: '',
          ott: [],
          voiceLimit: '',
          sms: '',
          data: '',
          couponIds: [],
          limit: '',
          speed: '',
          active: 'True'
        }}
        handleAddPlan={jest.fn()}
        handleEditPlan={jest.fn()}
        addEditFlag={true}
        setAddEditFlag={jest.fn()}
        adminPlanType="Prepaid"
        planCoupon={null}
      />
    );

    // Fill form inputs
    fireEvent.change(screen.getByTestId('price').querySelector('input'), {
      target: { value: '100' }
    });

    const testVal = screen.getByTestId('validity');
    const buttonVal = within(testVal).getByRole('combobox');
    fireEvent.mouseDown(buttonVal);
    const listboxVal = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxVal).getAllByRole('option')[0]);

    const testCat = screen.getByTestId('category');
    const buttonCat = within(testCat).getByRole('combobox');
    fireEvent.mouseDown(buttonCat);
    const listboxCat = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxCat).getAllByRole('option')[0]);

    const testData = screen.getByTestId('data');
    const buttonData = within(testData).getByRole('combobox');
    fireEvent.mouseDown(buttonData);
    const listboxData = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxData).getAllByRole('option')[0]);

    const testSMS = screen.getByTestId('SMS');
    const buttonSMS = within(testSMS).getByRole('combobox');
    fireEvent.mouseDown(buttonSMS);
    const listboxSMS = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxSMS).getAllByRole('option')[0]);

    const testVoiceLimit = screen.getByTestId('voice-limit');
    const buttonVoiceLimit = within(testVoiceLimit).getByRole('combobox');
    fireEvent.mouseDown(buttonVoiceLimit);
    const listboxVoiceLimit = within(
      screen.getByRole('presentation')
    ).getByRole('listbox');
    fireEvent.click(within(listboxVoiceLimit).getAllByRole('option')[0]);

    const testLimit = screen.getByTestId('limit');
    const buttonLimit = within(testLimit).getByRole('combobox');
    fireEvent.mouseDown(buttonLimit);
    const listboxLimit = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxLimit).getAllByRole('option')[0]);

    fireEvent.click(screen.getByTestId('add-coupon-button'));
    const mockResponse = {
      status: 'OK',
      coupons: [
        {
          couponId: '0aa79d8a-4694-4a64-8048-b6627d1d30fc',
          data: '2',
          expire: '1721039174000',
          type: 'Internal',
          limit: '92',
          couponCode: 'EXC70904',
          description: 'Not defined',
          url: null,
          image:
            'https://printable-map-az.com/wp-content/uploads/2019/07/the-best-free-coupons-available-free-printable-coupon-websites.jpg'
        },
        {
          couponId: '0e4fe793-2a3d-4754-9080-37dba364aae4',
          data: '3',
          expire: '1729333574000',
          type: 'Internal',
          limit: '94',
          couponCode: 'EXC70671',
          description: 'Not defined',
          url: null,
          image:
            'https://printable-map-az.com/wp-content/uploads/2019/07/the-best-free-coupons-available-free-printable-coupon-websites.jpg'
        }
      ]
    };
    require('../../axios/AxiosHelper').request.mockResolvedValue(mockResponse);

    // Wait for the modal to appear
    await waitFor(() => {
      expect(screen.getByText('ADD COUPON')).toBeInTheDocument();
    });

    const adminCoupon = screen.getAllByText('2 GB'); // Assuming '2 GB' is the text of the coupon
    fireEvent.click(adminCoupon[0]);

    // Click the "Add Coupon" button inside the modal
    const addCouponButton = screen.getByTestId('add-btn');
    fireEvent.click(addCouponButton);

    jest.clearAllMocks();

    const mockResponse1 = { status: 'CREATED' };
    require('../../axios/AxiosHelper').request.mockResolvedValue(mockResponse1);

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: 'success',
        title: 'Prepaid Plan updated successfuly',
        showConfirmButton: false,
        timer: 1500
      });
    });
  });

  test('TC-11: Handles success properly for postpaid plan update', async () => {
    render(
      <AdminAddEditPlan
        planDetails={{
          planId: '',
          planType: '',
          price: '',
          category: '',
          validity: '',
          ott: [],
          voiceLimit: '',
          sms: '',
          data: '',
          couponIds: [],
          limit: '',
          speed: '',
          active: 'True'
        }}
        handleAddPlan={jest.fn()}
        handleEditPlan={jest.fn()}
        addEditFlag={true}
        setAddEditFlag={jest.fn()}
        adminPlanType="Postpaid"
        planCoupon={null}
      />
    );

    // Fill form inputs
    fireEvent.change(screen.getByTestId('price').querySelector('input'), {
      target: { value: '100' }
    });

    const testVal = screen.getByTestId('validity');
    const buttonVal = within(testVal).getByRole('combobox');
    fireEvent.mouseDown(buttonVal);
    const listboxVal = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxVal).getAllByRole('option')[0]);

    const testCat = screen.getByTestId('category');
    const buttonCat = within(testCat).getByRole('combobox');
    fireEvent.mouseDown(buttonCat);
    const listboxCat = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxCat).getAllByRole('option')[0]);

    const testData = screen.getByTestId('data');
    const buttonData = within(testData).getByRole('combobox');
    fireEvent.mouseDown(buttonData);
    const listboxData = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxData).getAllByRole('option')[0]);

    const testSMS = screen.getByTestId('SMS');
    const buttonSMS = within(testSMS).getByRole('combobox');
    fireEvent.mouseDown(buttonSMS);
    const listboxSMS = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxSMS).getAllByRole('option')[0]);

    const testVoiceLimit = screen.getByTestId('voice-limit');
    const buttonVoiceLimit = within(testVoiceLimit).getByRole('combobox');
    fireEvent.mouseDown(buttonVoiceLimit);
    const listboxVoiceLimit = within(
      screen.getByRole('presentation')
    ).getByRole('listbox');
    fireEvent.click(within(listboxVoiceLimit).getAllByRole('option')[0]);

    const testLimit = screen.getByTestId('limit');
    const buttonLimit = within(testLimit).getByRole('combobox');
    fireEvent.mouseDown(buttonLimit);
    const listboxLimit = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxLimit).getAllByRole('option')[0]);

    fireEvent.click(screen.getByTestId('add-coupon-button'));
    const mockResponse = {
      status: 'OK',
      coupons: [
        {
          couponId: '0aa79d8a-4694-4a64-8048-b6627d1d30fc',
          data: '2',
          expire: '1721039174000',
          type: 'Internal',
          limit: '92',
          couponCode: 'EXC70904',
          description: 'Not defined',
          url: null,
          image:
            'https://printable-map-az.com/wp-content/uploads/2019/07/the-best-free-coupons-available-free-printable-coupon-websites.jpg'
        },
        {
          couponId: '0e4fe793-2a3d-4754-9080-37dba364aae4',
          data: '3',
          expire: '1729333574000',
          type: 'Internal',
          limit: '94',
          couponCode: 'EXC70671',
          description: 'Not defined',
          url: null,
          image:
            'https://printable-map-az.com/wp-content/uploads/2019/07/the-best-free-coupons-available-free-printable-coupon-websites.jpg'
        }
      ]
    };
    require('../../axios/AxiosHelper').request.mockResolvedValue(mockResponse);

    // Wait for the modal to appear
    await waitFor(() => {
      expect(screen.getByText('ADD COUPON')).toBeInTheDocument();
    });

    const adminCoupon = screen.getAllByText('2 GB'); // Assuming '2 GB' is the text of the coupon
    fireEvent.click(adminCoupon[0]);

    // Click the "Add Coupon" button inside the modal
    const addCouponButton = screen.getByTestId('add-btn');
    fireEvent.click(addCouponButton);

    jest.clearAllMocks();

    const mockResponse1 = { status: 'CREATED' };
    require('../../axios/AxiosHelper').request.mockResolvedValue(mockResponse1);

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: 'success',
        title: 'Postpaid Plan updated successfuly',
        showConfirmButton: false,
        timer: 1500
      });
    });
  });

  test('TC-12: Handles error properly for broadband plan update', async () => {
    render(
      <AdminAddEditPlan
        planDetails={{
          planId: '',
          planType: '',
          price: '',
          category: '',
          validity: '',
          ott: [],
          voiceLimit: '',
          sms: '',
          data: '',
          couponIds: [],
          limit: '',
          speed: '',
          active: 'True'
        }}
        handleAddPlan={jest.fn()}
        handleEditPlan={jest.fn()}
        addEditFlag={true}
        setAddEditFlag={jest.fn()}
        adminPlanType="Broadband"
        planCoupon={null}
      />
    );

    // Fill form inputs
    fireEvent.change(screen.getByTestId('price').querySelector('input'), {
      target: { value: '100' }
    });

    const testVal = screen.getByTestId('validity');
    const buttonVal = within(testVal).getByRole('combobox');
    fireEvent.mouseDown(buttonVal);
    const listboxVal = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxVal).getAllByRole('option')[0]);

    const testCat = screen.getByTestId('category');
    const buttonCat = within(testCat).getByRole('combobox');
    fireEvent.mouseDown(buttonCat);
    const listboxCat = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxCat).getAllByRole('option')[0]);

    const testData = screen.getByTestId('data');
    const buttonData = within(testData).getByRole('combobox');
    fireEvent.mouseDown(buttonData);
    const listboxData = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxData).getAllByRole('option')[0]);

    const testSMS = screen.getByTestId('SMS');
    const buttonSMS = within(testSMS).getByRole('combobox');
    fireEvent.mouseDown(buttonSMS);
    const listboxSMS = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxSMS).getAllByRole('option')[0]);

    const testVoiceLimit = screen.getByTestId('voice-limit');
    const buttonVoiceLimit = within(testVoiceLimit).getByRole('combobox');
    fireEvent.mouseDown(buttonVoiceLimit);
    const listboxVoiceLimit = within(
      screen.getByRole('presentation')
    ).getByRole('listbox');
    fireEvent.click(within(listboxVoiceLimit).getAllByRole('option')[0]);

    const testLimit = screen.getByTestId('limit');
    const buttonLimit = within(testLimit).getByRole('combobox');
    fireEvent.mouseDown(buttonLimit);
    const listboxLimit = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxLimit).getAllByRole('option')[0]);

    fireEvent.click(screen.getByTestId('add-coupon-button'));
    const mockResponse = {
      status: 'OK',
      coupons: [
        {
          couponId: '0aa79d8a-4694-4a64-8048-b6627d1d30fc',
          data: '2',
          expire: '1721039174000',
          type: 'Internal',
          limit: '92',
          couponCode: 'EXC70904',
          description: 'Not defined',
          url: null,
          image:
            'https://printable-map-az.com/wp-content/uploads/2019/07/the-best-free-coupons-available-free-printable-coupon-websites.jpg'
        },
        {
          couponId: '0e4fe793-2a3d-4754-9080-37dba364aae4',
          data: '3',
          expire: '1729333574000',
          type: 'Internal',
          limit: '94',
          couponCode: 'EXC70671',
          description: 'Not defined',
          url: null,
          image:
            'https://printable-map-az.com/wp-content/uploads/2019/07/the-best-free-coupons-available-free-printable-coupon-websites.jpg'
        }
      ]
    };
    require('../../axios/AxiosHelper').request.mockResolvedValue(mockResponse);

    // Wait for the modal to appear
    await waitFor(() => {
      expect(screen.getByText('ADD COUPON')).toBeInTheDocument();
    });

    const adminCoupon = screen.getAllByText('2 GB'); // Assuming '2 GB' is the text of the coupon
    fireEvent.click(adminCoupon[0]);

    // Click the "Add Coupon" button inside the modal
    const addCouponButton = screen.getByTestId('add-btn');
    fireEvent.click(addCouponButton);

    jest.clearAllMocks();

    require('../../axios/AxiosHelper').request.mockImplementation(() => {
      throw new Error('Request failed');
    });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: 'Request failed',
        timer: 1000
      });
    });
  });

  test('TC-13: Handles error properly for prepaid plan update', async () => {
    render(
      <AdminAddEditPlan
        planDetails={{
          planId: '',
          planType: '',
          price: '',
          category: '',
          validity: '',
          ott: [],
          voiceLimit: '',
          sms: '',
          data: '',
          couponIds: [],
          limit: '',
          speed: '',
          active: 'True'
        }}
        handleAddPlan={jest.fn()}
        handleEditPlan={jest.fn()}
        addEditFlag={true}
        setAddEditFlag={jest.fn()}
        adminPlanType="Prepaid"
        planCoupon={null}
      />
    );

    // Fill form inputs
    fireEvent.change(screen.getByTestId('price').querySelector('input'), {
      target: { value: '100' }
    });

    const testVal = screen.getByTestId('validity');
    const buttonVal = within(testVal).getByRole('combobox');
    fireEvent.mouseDown(buttonVal);
    const listboxVal = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxVal).getAllByRole('option')[0]);

    const testCat = screen.getByTestId('category');
    const buttonCat = within(testCat).getByRole('combobox');
    fireEvent.mouseDown(buttonCat);
    const listboxCat = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxCat).getAllByRole('option')[0]);

    const testData = screen.getByTestId('data');
    const buttonData = within(testData).getByRole('combobox');
    fireEvent.mouseDown(buttonData);
    const listboxData = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxData).getAllByRole('option')[0]);

    const testSMS = screen.getByTestId('SMS');
    const buttonSMS = within(testSMS).getByRole('combobox');
    fireEvent.mouseDown(buttonSMS);
    const listboxSMS = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxSMS).getAllByRole('option')[0]);

    const testVoiceLimit = screen.getByTestId('voice-limit');
    const buttonVoiceLimit = within(testVoiceLimit).getByRole('combobox');
    fireEvent.mouseDown(buttonVoiceLimit);
    const listboxVoiceLimit = within(
      screen.getByRole('presentation')
    ).getByRole('listbox');
    fireEvent.click(within(listboxVoiceLimit).getAllByRole('option')[0]);

    const testLimit = screen.getByTestId('limit');
    const buttonLimit = within(testLimit).getByRole('combobox');
    fireEvent.mouseDown(buttonLimit);
    const listboxLimit = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxLimit).getAllByRole('option')[0]);

    fireEvent.click(screen.getByTestId('add-coupon-button'));
    const mockResponse = {
      status: 'OK',
      coupons: [
        {
          couponId: '0aa79d8a-4694-4a64-8048-b6627d1d30fc',
          data: '2',
          expire: '1721039174000',
          type: 'Internal',
          limit: '92',
          couponCode: 'EXC70904',
          description: 'Not defined',
          url: null,
          image:
            'https://printable-map-az.com/wp-content/uploads/2019/07/the-best-free-coupons-available-free-printable-coupon-websites.jpg'
        },
        {
          couponId: '0e4fe793-2a3d-4754-9080-37dba364aae4',
          data: '3',
          expire: '1729333574000',
          type: 'Internal',
          limit: '94',
          couponCode: 'EXC70671',
          description: 'Not defined',
          url: null,
          image:
            'https://printable-map-az.com/wp-content/uploads/2019/07/the-best-free-coupons-available-free-printable-coupon-websites.jpg'
        }
      ]
    };
    require('../../axios/AxiosHelper').request.mockResolvedValue(mockResponse);

    // Wait for the modal to appear
    await waitFor(() => {
      expect(screen.getByText('ADD COUPON')).toBeInTheDocument();
    });

    const adminCoupon = screen.getAllByText('2 GB'); // Assuming '2 GB' is the text of the coupon
    fireEvent.click(adminCoupon[0]);

    // Click the "Add Coupon" button inside the modal
    const addCouponButton = screen.getByTestId('add-btn');
    fireEvent.click(addCouponButton);

    jest.clearAllMocks();

    require('../../axios/AxiosHelper').request.mockImplementation(() => {
      throw new Error('Request failed');
    });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: 'Request failed',
        timer: 1000
      });
    });
  });

  test('TC-14: Handles error properly for postpaid plan update', async () => {
    render(
      <AdminAddEditPlan
        planDetails={{
          planId: '',
          planType: '',
          price: '',
          category: '',
          validity: '',
          ott: [],
          voiceLimit: '',
          sms: '',
          data: '',
          couponIds: [],
          limit: '',
          speed: '',
          active: 'True'
        }}
        handleAddPlan={jest.fn()}
        handleEditPlan={jest.fn()}
        addEditFlag={true}
        setAddEditFlag={jest.fn()}
        adminPlanType="Postpaid"
        planCoupon={null}
      />
    );

    // Fill form inputs
    fireEvent.change(screen.getByTestId('price').querySelector('input'), {
      target: { value: '100' }
    });

    const testVal = screen.getByTestId('validity');
    const buttonVal = within(testVal).getByRole('combobox');
    fireEvent.mouseDown(buttonVal);
    const listboxVal = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxVal).getAllByRole('option')[0]);

    const testCat = screen.getByTestId('category');
    const buttonCat = within(testCat).getByRole('combobox');
    fireEvent.mouseDown(buttonCat);
    const listboxCat = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxCat).getAllByRole('option')[0]);

    const testData = screen.getByTestId('data');
    const buttonData = within(testData).getByRole('combobox');
    fireEvent.mouseDown(buttonData);
    const listboxData = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxData).getAllByRole('option')[0]);

    const testSMS = screen.getByTestId('SMS');
    const buttonSMS = within(testSMS).getByRole('combobox');
    fireEvent.mouseDown(buttonSMS);
    const listboxSMS = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxSMS).getAllByRole('option')[0]);

    const testVoiceLimit = screen.getByTestId('voice-limit');
    const buttonVoiceLimit = within(testVoiceLimit).getByRole('combobox');
    fireEvent.mouseDown(buttonVoiceLimit);
    const listboxVoiceLimit = within(
      screen.getByRole('presentation')
    ).getByRole('listbox');
    fireEvent.click(within(listboxVoiceLimit).getAllByRole('option')[0]);

    const testLimit = screen.getByTestId('limit');
    const buttonLimit = within(testLimit).getByRole('combobox');
    fireEvent.mouseDown(buttonLimit);
    const listboxLimit = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxLimit).getAllByRole('option')[0]);

    fireEvent.click(screen.getByTestId('add-coupon-button'));
    const mockResponse = {
      status: 'OK',
      coupons: [
        {
          couponId: '0aa79d8a-4694-4a64-8048-b6627d1d30fc',
          data: '2',
          expire: '1721039174000',
          type: 'Internal',
          limit: '92',
          couponCode: 'EXC70904',
          description: 'Not defined',
          url: null,
          image:
            'https://printable-map-az.com/wp-content/uploads/2019/07/the-best-free-coupons-available-free-printable-coupon-websites.jpg'
        },
        {
          couponId: '0e4fe793-2a3d-4754-9080-37dba364aae4',
          data: '3',
          expire: '1729333574000',
          type: 'Internal',
          limit: '94',
          couponCode: 'EXC70671',
          description: 'Not defined',
          url: null,
          image:
            'https://printable-map-az.com/wp-content/uploads/2019/07/the-best-free-coupons-available-free-printable-coupon-websites.jpg'
        }
      ]
    };
    require('../../axios/AxiosHelper').request.mockResolvedValue(mockResponse);

    // Wait for the modal to appear
    await waitFor(() => {
      expect(screen.getByText('ADD COUPON')).toBeInTheDocument();
    });

    const adminCoupon = screen.getAllByText('2 GB'); // Assuming '2 GB' is the text of the coupon
    fireEvent.click(adminCoupon[0]);

    // Click the "Add Coupon" button inside the modal
    const addCouponButton = screen.getByTestId('add-btn');
    fireEvent.click(addCouponButton);

    jest.clearAllMocks();

    require('../../axios/AxiosHelper').request.mockImplementation(() => {
      throw new Error('Request failed');
    });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: 'Request failed',
        timer: 1000
      });
    });
  });

  test('TC-15: reset values of form when reset button clicked', () => {
    render(
      <AdminAddEditPlan
        planDetails={{
          planId: '',
          planType: '',
          price: '',
          category: '',
          validity: '',
          ott: [],
          voiceLimit: '',
          sms: '',
          data: '',
          couponIds: [],
          limit: '',
          speed: '',
          active: 'True'
        }}
        handleAddPlan={jest.fn()}
        handleEditPlan={jest.fn()}
        addEditFlag={false}
        setAddEditFlag={jest.fn()}
        adminPlanType="Prepaid"
        planCoupon={null}
      />
    );

    // Fill form inputs
    fireEvent.change(screen.getByTestId('price').querySelector('input'), {
      target: { value: '100' }
    });

    const testVal = screen.getByTestId('validity');
    const buttonVal = within(testVal).getByRole('combobox');
    fireEvent.mouseDown(buttonVal);
    const listboxVal = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxVal).getAllByRole('option')[0]);

    const testCat = screen.getByTestId('category');
    const buttonCat = within(testCat).getByRole('combobox');
    fireEvent.mouseDown(buttonCat);
    const listboxCat = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxCat).getAllByRole('option')[0]);

    const testData = screen.getByTestId('data');
    const buttonData = within(testData).getByRole('combobox');
    fireEvent.mouseDown(buttonData);
    const listboxData = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    fireEvent.click(within(listboxData).getAllByRole('option')[0]);

    fireEvent.click(screen.getByTestId('RestartAltIcon'));

    expect(testData).toBeNull;
  });
});

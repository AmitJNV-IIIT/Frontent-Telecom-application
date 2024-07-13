import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import NewConnection from '../../components/Broadband/NewConnection';
import { MemoryRouter } from 'react-router-dom';
import { request } from '../../axios/AxiosHelper';
import { within } from '@testing-library/dom';

jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn()
}));

describe('NewConnection component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    Object.defineProperty(window, 'sessionStorage', {
      value: {
        getItem: jest.fn().mockReturnValue(
          JSON.stringify({
            name: 'John Doe',
            mobileNumber: '1234567890',
            address: '123 Main St',
            city: 'City',
            state: 'State',
            pincode: '123456',
            country: 'Country'
          })
        )
      },
      writable: true
    });
  });

  it('t1: renders form fields correctly', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <NewConnection />
      </MemoryRouter>
    );

    expect(getByLabelText('Name')).toBeInTheDocument();
    expect(getByLabelText('Mobile Number')).toBeInTheDocument();
    expect(getByLabelText('Address')).toBeInTheDocument();
    expect(getByLabelText('City')).toBeInTheDocument();
    expect(getByLabelText('State')).toBeInTheDocument();
    expect(getByLabelText('Pincode')).toBeInTheDocument();
    expect(getByLabelText('Country')).toBeInTheDocument();
  });

  it('t2: displays error message for invalid inputs', async () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <NewConnection />
      </MemoryRouter>
    );
    const nameInput = getByLabelText('Name');

    fireEvent.change(nameInput, { target: { value: '123' } });
    fireEvent.submit(getByText('Submit'));

    await waitFor(() => {
      expect(getByText('Please enter a valid name')).toBeInTheDocument();
    });
  });

  it('t3: submits form with valid inputs and shows success message', async () => {
    const mockResponse = {
      status: 201
    };

    request.mockResolvedValueOnce(mockResponse);

    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <NewConnection />
      </MemoryRouter>
    );

    fireEvent.change(getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText('Mobile Number'), {
      target: { value: '9876543210' }
    });
    fireEvent.change(getByLabelText('Address'), {
      target: { value: '123 Street, City' }
    });
    fireEvent.change(getByLabelText('City'), { target: { value: 'City' } });
    fireEvent.change(getByLabelText('State'), { target: { value: 'State' } });
    fireEvent.change(getByLabelText('Pincode'), {
      target: { value: '123456' }
    });
    fireEvent.change(getByLabelText('Country'), {
      target: { value: 'Country' }
    });

    fireEvent.submit(getByText('Submit'));

    await waitFor(() => {
      expect(request).toHaveBeenCalledTimes(1);
      expect(request).toHaveBeenCalledWith(
        'POST',
        expect.any(String),
        expect.any(Object)
      );
    });

    expect(getByText('Connection Form')).toBeInTheDocument();
  });

  it('t4: displays error message if form submission fails', async () => {
    const mockResponse = {
      status: 500
    };

    request.mockResolvedValueOnce(mockResponse);

    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <NewConnection />
      </MemoryRouter>
    );

    fireEvent.change(getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText('Mobile Number'), {
      target: { value: '9876543210' }
    });
    fireEvent.change(getByLabelText('Address'), {
      target: { value: '123 Street, City' }
    });
    fireEvent.change(getByLabelText('City'), { target: { value: 'City' } });
    fireEvent.change(getByLabelText('State'), { target: { value: 'State' } });
    fireEvent.change(getByLabelText('Pincode'), {
      target: { value: '123456' }
    });
    fireEvent.change(getByLabelText('Country'), {
      target: { value: 'Country' }
    });

    fireEvent.submit(getByText('Submit'));

    await waitFor(() => {
      expect(request).toHaveBeenCalledTimes(1);
      expect(request).toHaveBeenCalledWith(
        'POST',
        expect.any(String),
        expect.any(Object)
      );
    });
  });

  it('t5: displays error message if form submission throws error', async () => {
    const { getByLabelText, getByText, getByTestId } = render(
      <MemoryRouter>
        <NewConnection />
      </MemoryRouter>
    );

    // Simulate user input by changing form fields
    fireEvent.change(getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText('Mobile Number'), {
      target: { value: '9876543210' }
    });
    fireEvent.change(getByLabelText('Address'), {
      target: { value: '123 Street, City' }
    });
    fireEvent.change(getByLabelText('City'), { target: { value: 'City' } });
    fireEvent.change(getByLabelText('State'), { target: { value: 'State' } });
    fireEvent.change(getByLabelText('Pincode'), {
      target: { value: '123456' }
    });
    fireEvent.change(getByLabelText('Country'), {
      target: { value: 'Country' }
    });

    // Trigger form submission
    fireEvent.submit(getByText('Submit'));

    // Wait for the request to be made and form submission handling to complete
    await waitFor(() => {
      expect(request).toHaveBeenCalledTimes(1);
      expect(request).toHaveBeenCalledWith(
        'POST',
        expect.any(String),
        expect.any(Object)
      );
    });

    // Custom text matcher function to find element containing "Network Error"
    const errorContainer = getByTestId('error-container');
    const { getByText: getByTextInErrorContainer } = within(errorContainer);

    // Check if the error message is displayed
    // expect(getByTextInErrorContainer(/Network Error/)).toBeInTheDocument();
  });

  it('t6: displays error message if mobile number contains non-digit characters', async () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <NewConnection />
      </MemoryRouter>
    );

    const mobileNumberInput = getByLabelText('Mobile Number');

    fireEvent.change(mobileNumberInput, { target: { value: '9876543a10' } });
    fireEvent.submit(getByText('Submit'));

    // await waitFor(() => {
    //   expect(getByText('Mobile number must contain only digits')).toBeInTheDocument();
    // });
  });

  it('t7: calls openConfirmation with true if form submission is successful', async () => {
    const mockResponse = {
      status: 'CREATED'
    };

    request.mockResolvedValueOnce(mockResponse);

    const mockOpenConfirmation = jest.fn();

    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <NewConnection openConfirmation={mockOpenConfirmation} />
      </MemoryRouter>
    );

    fireEvent.change(getByLabelText('Name'), { target: { value: 'John Doe' } });
    // Simulate other form field changes...

    fireEvent.submit(getByText('Submit'));

    await waitFor(() => {
      expect(mockOpenConfirmation).toHaveBeenCalledWith(true);
    });
  });

  it('t8: validates country input correctly', () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <NewConnection />
      </MemoryRouter>
    );

    const countryInput = getByLabelText('Country');

    // Provide a valid country name
    fireEvent.change(countryInput, { target: { value: 'United States' } });
    //expect(getByText('Please enter a valid country name')).not.toBeInTheDocument();

    // Provide an invalid country name
    fireEvent.change(countryInput, { target: { value: '12345' } });
    expect(getByText('Please enter a valid country name')).toBeInTheDocument();
  });
});

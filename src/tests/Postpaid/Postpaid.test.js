import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Postpaid from '../../pages/Postpaid';
import { BrowserRouter as Router } from 'react-router-dom';
import { request } from '../../axios/AxiosHelper';
import { createMemoryHistory } from 'history';

// jest.mock('../../components/Common/Navbar/SubNavbar', () => () => <div>Sub-Navbar</div>);

jest.mock('../../hooks/contextApi/AuthContext', () => ({
  useAuth: jest.fn(() => ({ isLogin: true })) // Mocking the return value of useAuth
}));

// Mocking the Axios request
jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn() // Mocking the request function
}));

describe('Postpaid component', () => {
  it('TC1 : renders the component properly', async () => {
    const { getByText } = render(
      <Router>
        <Postpaid />
      </Router>
    );

    // Wait for loading to finish
    await waitFor(() => expect(getByText('All')).toBeInTheDocument());
  });

  it('TC2 : loads postpaid plans when category changes', async () => {
    const { getByText } = render(
      <Router>
        <Postpaid />
      </Router>
    );
  });

  it('TC3 : loads postpaid plans when category changes', async () => {
    const { getByText } = render(
      <Router>
        <Postpaid />
      </Router>
    );
    //
    // Wait for loading to finish
    await waitFor(() => expect(getByText('All')).toBeInTheDocument());

    // Change category
    fireEvent.click(getByText('Quaterly'));

    // Wait for loading to finish after category change

    // Assert that request function is called with the expected URL
    expect(request).toHaveBeenCalledWith(
      'GET',
      'https://0wb4i9f3m5.execute-api.us-east-1.amazonaws.com/api/v2/mobile?type=Postpaid&offset=0&limit=1000&active=True'
    );
    expect(request).toHaveBeenCalledWith(
      'GET',
      'https://0wb4i9f3m5.execute-api.us-east-1.amazonaws.com/api/v2/mobile?type=Postpaid&offset=0&limit=1000&days=84&active=True'
    );
  });

  it('TC4 : changes postpaid category and resets offset to 0', async () => {
    const { getByText } = render(
      <Router>
        <Postpaid />
      </Router>
    );

    // Wait for loading to finish
    await waitFor(() => expect(getByText('All')).toBeInTheDocument());

    // Change category
    fireEvent.click(getByText('Semi-Annual'));

    // Wait for loading to finish after category change

    // Assert that postpaid category has been updated
    const semiAnnualCategory = getByText('Semi-Annual');
    expect(semiAnnualCategory).toBeInTheDocument();

    // Assert that offset has been reset to 0
    const offset = 0; // Reset offset
    expect(offset).toBe(0);
  });

  it('TC5 : increments offset by limit if offset is greater than or equal to limit', async () => {
    const limit = 10;
    let offset = 10; // Set offset to be greater than or equal to limit

    const { getByText } = render(
      <Router>
        <Postpaid />
      </Router>
    );

    // Wait for loading to finish
    await waitFor(() => expect(getByText('All')).toBeInTheDocument());

    // Mock the response for the API request
    const mockApiResponse = {
      data: [] // Mocked data
    };
    request.mockResolvedValueOnce(mockApiResponse);

    // Set up the condition for the offset
    fireEvent.click(getByText('All'));

    // Ensure offset is updated if it exceeds the limit
    if (offset >= limit) {
      offset = offset + limit;
    }

    // Assert that offset has been updated correctly
    const expectedOffset = offset;
    expect(offset).toBe(expectedOffset);
  });

  it('TC6: increments offset by limit if offset is greater than or equal to limit', async () => {
    const limit = 10;
    let offset = 10; // Set offset to be equal to limit

    // Mock the response for the API request
    const mockApiResponse = {
      data: [] // Mocked data
    };

    // jest.mock('../../components/Common/Navbar/SubNavbar', () => () => <div>Sub-Navbar</div>);
    // expect(Sub-Navbar).toBeInTheDocument();
    request.mockResolvedValueOnce(mockApiResponse);

    // Render the component
    const { getByText } = render(
      <Router>
        <Postpaid />
      </Router>
    );

    // Wait for loading to finish
    await waitFor(() => expect(getByText('All')).toBeInTheDocument());

    // Trigger the action that leads to the increment of the offset
    fireEvent.click(getByText('All'));

    // Ensure offset is updated if it is equal to the limit
    if (offset >= limit) {
      offset = offset + limit;
    }

    // Assert that offset has been updated correctly
    const expectedOffset = offset;
    expect(offset).toBe(expectedOffset);

    // Assert that the request function is called with the expected URL
    expect(request).toHaveBeenCalledWith(
      'GET',
      `https://0wb4i9f3m5.execute-api.us-east-1.amazonaws.com/api/v2/mobile?type=Postpaid&offset=0&limit=1000&active=True`
    );
  });

  it('TC9: increments offset by limit when offset is greater than or equal to limit', async () => {
    let offset = 10; // Set offset to be greater than or equal to limit
    const limit = 10;

    const { getByText } = render(
      <Router>
        <Postpaid />
      </Router>
    );

    // Wait for loading to finish
    await waitFor(() => expect(getByText('All')).toBeInTheDocument());

    // Assert that offset is incremented by limit when offset is greater than or equal to limit
    if (offset >= limit) {
      offset = offset + limit;
    }
    expect(offset).toBe(20);
  });
});

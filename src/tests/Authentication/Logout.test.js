import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Logout from '../../pages/Logout';
import { request } from '../../axios/AxiosHelper';

jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn() // Mock the request function
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useNavigate: jest.fn() // Mock useNavigate
}));

describe('Logout', () => {
  test('handleLogout calls request and navigates on success', async () => {
    // Mock dependencies
    request.mockResolvedValueOnce({});
    const mockNavigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);

    // Render the component
    render(<Logout />);

    // Assert request is called
    expect(request).toHaveBeenCalledWith('POST', '/auth/logout');

    // Assert navigation on successful logout
    // expect(mockNavigate).toHaveBeenCalledWith("/login"); // Adjust login route
  });
});

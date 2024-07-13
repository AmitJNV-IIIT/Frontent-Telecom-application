import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Registration from '../../pages/Registration.js';
// import RegistrationPage from '../../components/Authentication/Registration/RegistrationPage.js';
// eslint-disable-next-line no-unused-vars
import { request } from '../../axios/AxiosHelper.js';
// import { MemoryRouter } from 'react-router-dom';

jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));
describe('Registration Component', () => {
  it('TC0: renders correctly', () => {
    const { getByText } = render(<Registration />);
    // expect(getByText('SIGN UP')).toBeInTheDocument();
  });
});

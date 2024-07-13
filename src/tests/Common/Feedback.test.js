import React from 'react';
import { render } from '@testing-library/react';
import Feedback from '../../pages/Feedback';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn()
}));

describe('Feedback Component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    );
  });
});

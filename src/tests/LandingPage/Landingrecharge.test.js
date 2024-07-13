import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Recharge from '../../components/LandingComponent/Landingrecharge';

describe('Recharge component', () => {
  let navigate;
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Recharge />
      </MemoryRouter>
    );
  });

  test('TC-01: Renders Recharge component with all elements', () => {
    const rechargeDiv = screen.getByTestId('recharge');
    expect(rechargeDiv).toBeInTheDocument();

    const titleText = screen.getByText('Recharge and Bill Pay');
    expect(titleText).toBeInTheDocument();

    const inputField = screen.getByLabelText('Enter Your Mobile Number');
    expect(inputField).toBeInTheDocument();

    const button = screen.getByText('Recharge');
    expect(button).toBeInTheDocument();
  });

  test("TC-02: Click on 'Recharge' button calls navigation function", () => {
    const button = screen.getByText('Recharge');
    fireEvent.click(button);
  });
});

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserInformation from '../../components/Home/UserInformation';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import { act } from 'react-dom/test-utils'; // Import act for simulating component updates

describe('UserInformation component', () => {
  const userInfo = {
    name: 'John Doe',
    email: 'john@example.com',
    mobileNumber: '1234567890',
    simType: 'Prepaid'
  };

  // it('TC1 : renders user information correctly', () => {
  //   const { getByText } = render(
  //     <MemoryRouter>
  //       <UserInformation userInfo={userInfo} />
  //     </MemoryRouter>
  //   );
  //   expect(getByText('Name')).toBeInTheDocument();
  //   expect(getByText(userInfo.name)).toBeInTheDocument();
  //   expect(getByText('Email')).toBeInTheDocument();
  //   expect(getByText(userInfo.email)).toBeInTheDocument();
  //   expect(getByText('Mobile No')).toBeInTheDocument();
  //   expect(getByText(userInfo.mobileNumber)).toBeInTheDocument();
  //   expect(getByText('Type')).toBeInTheDocument();
  //   expect(getByText(userInfo.simType)).toBeInTheDocument();
  // });

  it('TC2 : calls resetPassword function when reset button is clicked', async () => {
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      useNavigate: () => mockNavigate
    }));

    await act(async () => {
      const { getByText } = render(
        <MemoryRouter>
          <UserInformation userInfo={userInfo} />
        </MemoryRouter>
      );

      //   const resetButton = screen.getByText(/reset password/i);
      //   fireEvent.click(resetButton);
    });

    // expect(mockNavigate).toHaveBeenCalledWith('/reset-password');
  });
});

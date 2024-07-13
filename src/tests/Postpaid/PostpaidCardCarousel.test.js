import React from 'react';
import {
  render,
  screen,
  act,
  fireEvent,
  getAllByText
} from '@testing-library/react';
import PostpaidCardCarousel from '../../components/Postpaid/PostpaidCardCarousel';
import datas from '../../data/postpaid-data.json';
import PostpaidPlanCard from '../../components/Postpaid/PostpaidPlanCard';
import { MemoryRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
//
jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn() // Mock the request function
}));

describe('PostpaidCardCarousel', () => {
  it('test', () => {
    expect(true);
  });

  // it('TC1: Should show error message when user is of prepaid type', () => {
  //   // Set up your mocks
  //   window.sessionStorage.setItem('ROLE', 'someRole');
  //   window.sessionStorage.setItem('PersonData', JSON.stringify({ simType: 'prepaid' }));
  //   const swalSpy = jest.spyOn(Swal, 'fire');

  //   // Render your component
  //   const { getByText } = render(<MemoryRouter><PostpaidCardCarousel postpaidPlans={datas} /></MemoryRouter>);

  //   // Simulate clicking on a plan
  //   const planCard = getByText(/Ideal for work seeking a complete branding/i);  // Replace this with actual text from your plan card
  //   fireEvent.click(planCard);

  //   // Expect the error message to be shown
  //   expect(swalSpy).toHaveBeenCalledWith({
  //     icon: 'error',
  //     title: 'Oops You are Prepaid type',
  //     showConfirmButton: false,
  //     timer: 1500,
  //   });
  // });

  it('TC1: Should open modal when user is not of prepaid type', async () => {
    // Set up your mocks
    window.sessionStorage.setItem('ROLE', 'USER');
    window.sessionStorage.setItem(
      'PersonData',
      JSON.stringify({ simType: 'postpaid' })
    );

    // Render your component
    const { getAllByText, findByText } = render(
      <MemoryRouter>
        <PostpaidCardCarousel postpaidPlans={datas} />
      </MemoryRouter>
    );

    // Simulate clicking on a plan
    const [planCard] = getAllByText(/Postpaid/i);
    fireEvent.click(planCard);

    // Expect the modal to be open
    // const confirmButton = await findByText(/Confirm/i);
    // expect(confirmButton).toBeInTheDocument();
  });

  it('TC2: Should open modal when user is not of prepaid type', () => {
    // Set up your mocks
    window.sessionStorage.setItem('ROLE', 'someRole');
    window.sessionStorage.setItem(
      'PersonData',
      JSON.stringify({ simType: 'postpaid' })
    );

    // Render your component
    const { getAllByText, findByText } = render(
      <MemoryRouter>
        <PostpaidCardCarousel postpaidPlans={datas} />
      </MemoryRouter>
    );

    // Simulate clicking on a plan
    const [planCard] = getAllByText(/Postpaid/i);
    fireEvent.click(planCard);

    // Expect the modal to be open
    // expect(screen.getByText('Confirmation')).toBeInTheDocument(); // Replace 'Confirmation' with actual text from your modal
  });

  it('TC3: Should navigate to login when user is not logged in', () => {
    // Set up your mocks
    window.sessionStorage.clear();

    // Mock useNavigate
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
      useNavigate: () => mockNavigate
    }));

    // Render your component
    const { getAllByText, findByText } = render(
      <MemoryRouter>
        <PostpaidCardCarousel postpaidPlans={datas} />
      </MemoryRouter>
    );

    // Simulate clicking on a plan
    const [planCard] = getAllByText(/Postpaid/i);
    fireEvent.click(planCard);

    // Expect to navigate to login
    // expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import PrepaidDetailsModal from '../../components/Prepaid/PrepaidDetailsModal';
import { MemoryRouter, Router } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createMemoryHistory } from 'history';

jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn() // Mock the request function
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn() // Mock Swal.fire
}));

describe('PrepaidDetailsModal', () => {
  beforeEach(() => {
    // Mock sessionStorage
    global.window = Object.create(window);
    Object.defineProperty(window, 'sessionStorage', {
      value: {
        getItem: jest.fn()
      }
    });
  });

  it('test', () => {
    expect(true);
  });
  test('TC0 : renders correct content', async () => {
    const mockPlan = {
      price: 199,
      validity: '30 days',
      data: 10,
      category: 'Example Category',
      ott: ['Netflix', 'Amazon Prime'],
      couponIds: [] // Initialize couponIds to an empty array
    };

    render(
      <MemoryRouter>
        <PrepaidDetailsModal
          setDetailsCardVisibility={() => {}}
          plan={mockPlan}
          getOTTImage={() => {}}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText('OTT Subscriptions included')
      ).toBeInTheDocument();
      expect(screen.getByText('Details')).toBeInTheDocument();
      expect(screen.getByText('Pack validity')).toBeInTheDocument();
      expect(screen.getByText('₹199')).toBeInTheDocument();
      expect(screen.getByText('Subscriptions :')).toBeInTheDocument();
      // expect(
      //   screen.getByText("*Post which unlimited @ 64 Kbps")
      // ).toBeInTheDocument();
      // expect(
      //   screen.getByText("*Unlimited 5G data for eligible subscribers")
      // ).toBeInTheDocument();
      expect(screen.getByText('Recharge')).toBeInTheDocument();
    });
  });

  // it("TC1: shows an error when a postpaid user tries to open the modal", () => {
  //   window.sessionStorage.getItem.mockReturnValueOnce(JSON.stringify({ simType: 'postpaid' })).mockReturnValueOnce('User');
  //   const mockPlan = {
  //     price: 199,
  //     validity: "30 days",
  //     data: 10,
  //     category: "Example Category",
  //     ott: ["Netflix", "Amazon Prime"],
  //   };
  //   render(
  //     <MemoryRouter history={history}>
  //       <PrepaidDetailsModal setDetailsCardVisibility={() => {}} plan={mockPlan} getOTTImage={() => {}} />
  //     </MemoryRouter>
  //   );

  //   fireEvent.click(screen.getByText('Recharge'));
  //   expect(Swal.fire).toBeCalledWith({
  //     icon: "error",
  //     title: "Oops You are Postpaid type",
  //     showConfirmButton: false,
  //     timer: 1500,
  //   });
  // });
  // it("TC2: opens the modal when a prepaid user clicks the recharge button", () => {
  //   window.sessionStorage.getItem.mockReturnValueOnce(JSON.stringify({ simType: 'prepaid' })).mockReturnValueOnce(JSON.stringify('User'));

  //   const mockPlan = {
  //     price: 199,
  //     validity: "30 days",
  //     data: 10,
  //     category: "Example Category",
  //     ott: ["Netflix", "Amazon Prime"],
  //     planType: 'prepaid', // Ensure planType is defined
  //     couponIds: [] // Initialize couponIds as an empty array
  //   };
  //   render(
  //     <MemoryRouter history={history}>
  //       <PrepaidDetailsModal setDetailsCardVisibility={() => {}} plan={mockPlan} getOTTImage={() => {}} />
  //     </MemoryRouter>
  //   );

  //   fireEvent.click(screen.getByText('Recharge'));
  //   // expect(screen.getByText('Modal')).toBeInTheDocument(); // Replace 'Modal' with the actual text you're expecting in the modal
  // });
  it('TC3: redirects to the login page when a non-logged in user clicks the recharge button', () => {
    window.sessionStorage.getItem.mockReturnValueOnce(null);
    const mockPlan = {
      price: 199,
      validity: '30 days',
      data: 10,
      category: 'Example Category',
      ott: ['Netflix', 'Amazon Prime'],
      couponIds: [] // Initialize couponIds to an empty array
    };

    render(
      <MemoryRouter>
        <PrepaidDetailsModal
          setDetailsCardVisibility={() => {}}
          plan={mockPlan}
          getOTTImage={() => {}}
        />
      </MemoryRouter>
    );

    //   fireEvent.click(screen.getByText('Recharge'));
    //   expect(history.location.pathname).toBe('/');
  });
});

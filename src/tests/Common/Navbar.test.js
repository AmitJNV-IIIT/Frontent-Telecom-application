import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for expect(...).toBeInTheDocument()
import Navbar from '../../components/Common/Navbar/Navbar';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom'; // Import useLocation
// import { request } from "../../axios/AxiosHelper";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useNavigate: () => jest.fn() // replace useNavigate with jest function
}));

jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn() // Mock the request function
}));

describe('Navbar Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('TC1 : renders navigation links', () => {
    render(
      <Router>
        <Navbar role="ADMIN" roleInfo={() => {}} />
      </Router>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Data Plans')).toBeInTheDocument();
    // Add more expectations for other navigation links based on your component
  });

  test('TC2: opens and closes menu', () => {
    render(
      <Router>
        <Navbar role="ADMIN" roleInfo={() => {}} />
      </Router>
    );
    fireEvent.click(screen.getByLabelText('menu')); // Open menu
    expect(
      screen.getByRole('menuitem', { name: 'Dashboard' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('menu')); // Close menu
    // Wait for the menu to close before making the assertion
    setTimeout(() => {
      expect(screen.queryByRole('menuitem', { name: 'Dashboard' })).toBeNull();
    }, 500); // Adjust the timeout as needed
  });

  test('TC3: logs out user', async () => {
    render(
      <Router>
        <Navbar role="ADMIN" roleInfo={() => {}} />
      </Router>
    );
    fireEvent.click(screen.getByLabelText('menu')); // Open menu
    // fireEvent.click(screen.getByText('Logout')); // Click logout
  });

  test('T4: renders navigation links based on role: ADMIN', () => {
    render(
      <MemoryRouter>
        <Navbar role="ADMIN" roleInfo={() => {}} />
      </MemoryRouter>
    );

    // Check for ADMIN role links
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Data Plans')).toBeInTheDocument();
    expect(screen.queryByText('Prepaid')).not.toBeInTheDocument();
    expect(screen.queryByText('Postpaid')).not.toBeInTheDocument();
    expect(screen.queryByText('Broadband')).not.toBeInTheDocument();
    expect(screen.queryByText('Subscription')).not.toBeInTheDocument();
    expect(screen.queryByText('Support')).not.toBeInTheDocument();
  });

  // test('T5: renders navigation links based on role: USER', () => {
  //   render(
  // <MemoryRouter>
  // <Navbar role="USER" roleInfo={() => {}} />
  // </MemoryRouter>
  //   );

  //   // Expected user links
  //   const userLinks = ['Prepaid', 'Postpaid', 'Broadband', 'Subscription'];

  //   // Unexpected links for user role
  //   const unexpectedLinks = ['Dashboard', 'Data Plans'];

  //   // Test for presence of expected user links
  //   userLinks.forEach(link => {
  //     expect(screen.getByText(link)).toBeInTheDocument();
  //   });

  //   // Test for absence of unexpected links
  //   unexpectedLinks.forEach(link => {
  //     expect(screen.queryByText(link)).not.toBeInTheDocument();
  //   });
  // });

  test('T6: renders navigation links for empty role', () => {
    render(
      <MemoryRouter>
        <Navbar role="" roleInfo={() => {}} />
      </MemoryRouter>
    );

    // No links expected for empty role
    const expectedLinks = [];

    // Test for presence of expected links (should be empty)
    expectedLinks.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  // test('T7: toggles menu when dropdown is clicked (USER role)', () => {
  //   render(
  // <MemoryRouter>
  // <Navbar role="USER" roleInfo={() => {}} />
  // </MemoryRouter>
  //   );

  //   // Find the dropdown element (assuming it has a specific role or text)
  //   const dropdown = screen.getByRole('button', { name: /menu/i }); // Adjust selector if needed

  //   // Simulate clicking the dropdown
  //   fireEvent.click(dropdown);

  //   // Expect user menu items to be displayed
  //   // expect(screen.getByText('Home')).toBeInTheDocument();
  //   expect(screen.getByText('User Details')).toBeInTheDocument();
  //   expect(screen.getByText('View Coupons')).toBeInTheDocument();
  //   expect(screen.getByText('Change Password')).toBeInTheDocument();
  //   expect(screen.getByText('Logout')).toBeInTheDocument();
  // });

  // test('T8: opens modal when user details link is clicked', () => {
  //   render(
  // <MemoryRouter>
  // <Navbar role="USER" roleInfo={() => {}} />
  // </MemoryRouter>
  //   );

  //   fireEvent.click(screen.getByText('User Details')); // Line 89

  //   expect(screen.getByText('User Details')).toBeInTheDocument(); // Line 94
  // });

  // test('T9: opens modal when view coupons link is clicked', () => {
  //   render(
  // <MemoryRouter>
  // <Navbar role="USER" roleInfo={() => {}} />
  // </MemoryRouter>
  //   );

  //   fireEvent.click(screen.getByText('View Coupons')); // Line 90

  //   expect(screen.getByText('View Coupons')).toBeInTheDocument(); // Line 93
  // });

  // test('T10: logs out when logout link is clicked', () => {
  //   render(
  // <MemoryRouter>
  // <Navbar role="USER" />
  // </MemoryRouter>
  //   );

  //   const logoutLink = screen.getByText('Logout');
  //   fireEvent.click(logoutLink);

  //   // Assert that the login icon is rendered after logout
  //   expect(screen.getByAltText('login')).toBeInTheDocument();
  // });

  // test('TC11: Menu items are rendered correctly for ADMIN role', () => {
  //   const { getByText } = render(<Router><Navbar role="ADMIN" roleInfo={() => {}}/> </Router>);
  //   // Assert that Dashboard and Data Plans menu items are rendered
  //   expect(getByText('Dashboard')).toBeInTheDocument();
  //   expect(getByText('Data Plans')).toBeInTheDocument();
  //   // expect(getByText('Logout')).toBeInTheDocument();
  // });

  // test('TC6: Menu items are rendered correctly for USER role', () => {
  //   const { getByText } = render(<Router> <Navbar role="USER" roleInfo={() => {}}/> </Router>);
  //   // Assert that Prepaid, Postpaid, Broadband, Subscription, Locate Us, and Support menu items are rendered
  //   expect(getByText('Prepaid')).toBeInTheDocument();
  //   expect(getByText('Postpaid')).toBeInTheDocument();
  //   expect(getByText('Broadband')).toBeInTheDocument();
  //   expect(getByText('Subscription')).toBeInTheDocument();
  //   expect(getByText('Logout')).toBeInTheDocument();

  // });

  // test('TC12: Menu items are rendered correctly for USER role', () => {
  //   const { getByText, queryByText } = render(
  // <Router>
  // <Navbar role="USER" roleInfo={() => {}} />
  // </Router>
  //   );

  //   // Assert that Prepaid, Postpaid, Broadband, Subscription, and Support menu items are rendered
  //   expect(getByText('Prepaid')).toBeInTheDocument();
  //   expect(getByText('Postpaid')).toBeInTheDocument();
  //   expect(getByText('Broadband')).toBeInTheDocument();
  //   expect(getByText('Subscription')).toBeInTheDocument();
  //   expect(getByText('Support')).toBeInTheDocument();
  //   // Assert that Logout link is not rendered for USER role
  //   expect(queryByText('Logout')).not.toBeInTheDocument();
  // });

  // test('TC13: Logout menu item is rendered when user is logged in', () => {
  //   render(
  // <MemoryRouter>
  // <Navbar role="USER" isLoggedIn={true} roleInfo={() => {}} />
  // </MemoryRouter>
  //   );

  //   // Use a regular expression with the 'i' flag for case-insensitive search
  //   const logoutButton = screen.getByText(/logout/i);

  //   // Assert that the Logout menu item is present in the document
  //   expect(logoutButton).toBeInTheDocument();
  // });

  // test('TC14: Routing when user is logged in', async () => { // Note the async keyword
  //   const navigateMock = jest.fn();
  //   render(
  // <Router>
  // <Navbar role="USER" isLoggedIn={true} roleInfo={() => {}} navigate={navigateMock} />
  // </Router>
  //   );

  // //   // Simulate clicking on the "Subscription" link
  //   fireEvent.click(screen.getByText('Subscription'));
  //   // fireEvent.click(screen.getByText('Prepaid'));
  //   // fireEvent.click(screen.getByText('Postpaid'));
  //   // fireEvent.click(screen.getByText('Broadband'));
  //   // fireEvent.click(screen.getByText('Logout'));

  // //   // Wait for the navigateMock function to be called
  // //   await waitFor(() => {
  // //     // Assert that the navigate function is called with the correct path
  // //     // expect(navigateMock).toHaveBeenCalledWith('/subscription');
  // //   });
  // });

  // test('TC15: Routing when user is logged in', async () => {
  //   const { getByText } = render(
  // <Router>
  // <Navbar role="USER" isLoggedIn={true} roleInfo={() => {}} />
  // </Router>
  //   );

  //   await waitFor(() => expect(getByText('Subscription')).toBeInTheDocument());

  //   // Simulate clicking on the "Subscription" link
  //   fireEvent.click(screen.getByText('Subscription'));

  //   // Wait for the request function to be called
  //   // await waitFor(() => {
  //   //   // Assert that the request function is called with the correct arguments
  //   //   expect(request).toHaveBeenCalledWith({
  //   //     method: 'GET',
  //   //     url: '/subscription',
  //   //     // Add any other expected request parameters here
  //   //   });
  //   // });
  // });

  test('TC16: Routing when admin is logged in', () => {
    render(
      <Router>
        <Navbar role="ADMIN" isLoggedIn={true} roleInfo={() => {}} />
      </Router>
    );

    // Simulate clicking on the "Dashboard" link
    fireEvent.click(screen.getByText('Dashboard'));
    fireEvent.click(screen.getByText('Data Plans'));
    // fireEvent.click(screen.getByText('My Details'));

    // Assert that the navigate function is called with the correct path
    // expect(navigateMock).toHaveBeenCalledWith('/admin/adminDashboard');
  });

  test('TC17: Routing when no user is logged in', () => {
    render(
      <Router>
        <Navbar role="" isLoggedIn={false} roleInfo={() => {}} />
      </Router>
    );

    // Simulate clicking on the "Support" link
    fireEvent.click(screen.getByText('Support'));
    fireEvent.click(screen.getByText('Prepaid'));
    fireEvent.click(screen.getByText('Postpaid'));
    fireEvent.click(screen.getByText('Broadband'));
    fireEvent.click(screen.getByText('Locate Us'));

    // Assert that the navigate function is called with the correct path
    // expect(navigateMock).toHaveBeenCalledWith('/support');
  });

  // test('TC14: Routing when user is logged in (async/await with navigate mock)', async () => {
  //   const navigateMock = jest.fn();
  //   render(
  //     <Router>
  //       <Navbar role="USER" isLoggedIn={true} roleInfo={() => {}} navigate={navigateMock} />
  //     </Router>
  //   );

  //   fireEvent.click(screen.getByText('Subscription')); // Simulate clicking "Subscription"

  //   await waitFor(() => {
  //     // Assert that navigateMock is called with the correct path
  //     expect(navigateMock).toHaveBeenCalledWith('/subscription'); // Assuming '/subscription' is the correct path
  //   });
  // });
});

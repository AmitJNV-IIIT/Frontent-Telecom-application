import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from '../../components/Common/Footer/Footer';

const handleIconClick = jest.fn();
//
const originalOpen = window.open;
beforeEach(() => {
  window.open = jest.fn();
});

afterEach(() => {
  // Restore original window.open after the test
  window.open = originalOpen;
});

describe('Footer component', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  it('TC1 : renders the footer content correctly', () => {
    const { getByText } = render(
      <Router>
        <Footer />
      </Router>
    );

    expect(getByText('Our Offerings')).toBeInTheDocument();
    expect(getByText('Support')).toBeInTheDocument();
    expect(getByText('Connect with us')).toBeInTheDocument();
    expect(getByText('Download Excitel Now')).toBeInTheDocument();
    //expect(getByText('@2024 Excitel All rights reserved.')).toBeInTheDocument();
  });
  //

  it('TC2 : navigates to the correct path when a link is clicked', () => {
    const { getByText } = render(
      <Router>
        <Footer />
      </Router>
    );

    fireEvent.click(getByText('Prepaid'));
    expect(window.location.pathname).toBe('/prepaid');

    fireEvent.click(getByText('Postpaid'));
    expect(window.location.pathname).toBe('/postpaid');

    fireEvent.click(getByText('Broadband'));
    expect(window.location.pathname).toBe('/broadband');

    // Add more tests for other links as needed
  });

  it('TC3 : navigates to the correct path when logo and "Support" link are clicked', () => {
    const { getByAltText, getByText } = render(
      <Router>
        <Footer />
      </Router>
    );

    // Simulate clicking on the logo
    fireEvent.click(getByAltText('logo'));
    expect(window.location.pathname).toBe('/');

    // Simulate clicking on the "Support" link
    fireEvent.click(getByText('Executive customer support'));
    expect(window.location.pathname).toBe('/support');
  });

  it('TC4 : navigates to the correct path when links in footer column C are clicked', () => {
    const { getByText } = render(
      <Router>
        <Footer />
      </Router>
    );

    fireEvent.click(getByText('Home'));
    expect(window.location.pathname).toBe('/');

    fireEvent.click(getByText('Trending Plans'));
    expect(window.location.pathname).toBe('/');

    fireEvent.click(getByText('Feedback'));
    expect(window.location.pathname).toBe('/login');

    fireEvent.click(getByText('FAQ'));
    expect(window.location.pathname).toBe('/support');

    fireEvent.click(getByText('Locate Us'));
    expect(window.location.pathname).toBe('/locate');

    fireEvent.click(getByText('Contact Us'));
    expect(window.location.pathname).toBe('/support');
  });

  it('TC5 : opens the correct URL when icons in footer column D are clicked', () => {
    const { getByTestId } = render(
      <Router>
        <Footer />
      </Router>
    );

    fireEvent.click(getByTestId('twitter-icon'));
    // Assert that window.open is called with the expected URL
    expect(window.open).toHaveBeenCalledWith('https://www.twitter.com');

    fireEvent.click(getByTestId('linkedin-icon'));
    expect(window.open).toHaveBeenCalledWith('https://www.linkedin.com');

    fireEvent.click(getByTestId('instagram-icon'));
    expect(window.open).toHaveBeenCalledWith('https://www.instagram.com');

    fireEvent.click(getByTestId('facebook-icon'));
    expect(window.open).toHaveBeenCalledWith('https://www.facebook.com');

    fireEvent.click(getByTestId('youtube-icon'));
    expect(window.open).toHaveBeenCalledWith('https://www.youtube.com');
  });

  it('TC6 : opens the correct URL when app store icons are clicked', () => {
    const { getByAltText } = render(
      <Router>
        <Footer />
      </Router>
    );

    fireEvent.click(getByAltText('Get it on Google Play'));
    expect(window.location.href).toBe('http://localhost/support');

    fireEvent.click(getByAltText('Download on the App Store'));
    expect(window.location.href).toBe('http://localhost/support');
  });

  it('TC7: should call window.open with the correct URL when an icon is clicked', () => {
    // Render the Footer component
    const { getByTestId } = render(
      <Router>
        <Footer />
      </Router>
    );

    // Simulate a click event on the Instagram icon
    fireEvent.click(getByTestId('instagram-icon'));

    // Assert that window.open is called with the expected URL
    expect(window.open).toHaveBeenCalledWith('https://www.instagram.com');
  });

  // Add more test cases to cover other functionalities of the Footer component
});

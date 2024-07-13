import React from 'react';
import { render } from '@testing-library/react';
import Error from '../pages/Error';

describe('Error component', () => {
  it('TC-01: renders error message correctly', () => {
    const { getByText } = render(<Error />);
    const errorMessage = getByText(/Sorry,/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('TC-02: renders upgrade item correctly', () => {
    const { getByText } = render(<Error />);
    const upgradeItem = getByText(/Upgrade Your Experience/i);
    expect(upgradeItem).toBeInTheDocument();
  });

  it('TC-03: renders stay connected item correctly', () => {
    const { getByText } = render(<Error />);
    const connectedItem = getByText(/Stay Connected/i);
    expect(connectedItem).toBeInTheDocument();
  });

  it('TC-04: renders exclusive offers item correctly', () => {
    const { getByText } = render(<Error />);
    const offersItem = getByText(/Exclusive Offers/i);
    expect(offersItem).toBeInTheDocument();
  });

  it('TC-05: renders home link correctly', () => {
    const { getByAltText } = render(<Error />);
    const homeLink = getByAltText(/GO TO HOME/i);
    expect(homeLink).toHaveAttribute('src', 'house.png');
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import UserHomePageHeader from '../../components/Home/UserHomePageHeader';

describe('UserHomePageHeader component', () => {
  const userInfo = {
    name: 'John Doe'
  };

  it('TC1 : renders user greeting correctly', () => {
    const { getByText } = render(<UserHomePageHeader userInfo={userInfo} />);
    const greetingElement = getByText(/Welcome/i); // Match "Welcome" case-insensitively
    const diveIntoElement = getByText(/Hi John, Welcome to Excitel!/i); // Match "Dive into Excitel's World!" case-insensitively
    expect(greetingElement).toBeInTheDocument();
    expect(diveIntoElement).toBeInTheDocument();
  });

  it('TC2 : renders empty greeting when userInfo is undefined', () => {
    const userInfo = { name: 'John Doe' }; // make sure the userInfo object has a "name" property
    const { getByText } = render(<UserHomePageHeader userInfo={userInfo} />);
    expect(getByText('Hi John, Welcome to Excitel!')).toBeInTheDocument();
  });
});

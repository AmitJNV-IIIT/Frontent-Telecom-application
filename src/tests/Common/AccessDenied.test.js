import React from 'react';
import { render } from '@testing-library/react';
import AccessDenied from '../../components/Common/AccessDenied/AccessDenied';

describe('AccessDenied component', () => {
  it('renders the Access Denied message', () => {
    const { getByText } = render(<AccessDenied />);
    const headingElement = getByText(/Access Denied/i);
    const paragraphElement = getByText(
      /Oops! It seems you dont have permission to access this page/i
    );
    expect(headingElement).toBeInTheDocument();
    expect(paragraphElement).toBeInTheDocument();
  });

  // You can write additional tests as needed
});

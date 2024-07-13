import React from 'react';
import { render } from '@testing-library/react';
import LoginComponent from '../../components/Authentication/LoginComponent/LoginComponent';

describe('LoginComponent', () => {
  test('renders login element with correct text and styles', () => {
    const { getByText, getByRole } = render(<LoginComponent />);

    // Check if the login element is rendered
    const loginElement = getByRole('heading', { level: 2 });
    expect(loginElement).toBeInTheDocument();

    // Check if the text content is rendered correctly
    expect(loginElement).toHaveTextContent('Your internet is not just a goal,');

    // Check if the styled text is rendered correctly
    const styledText = getByText("it's our top priority");
    expect(styledText).toBeInTheDocument();
    expect(styledText).toHaveStyle(
      'background: linear-gradient(to right, red, blue)'
    );

    // Check if the input button is rendered with correct styles
    const submitButton = getByRole('button', { name: 'See all Plans' });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveStyle(`
    backgroundColor: '#4CAF50' /* Green */,
    border: 'none',
    color: 'white',
    padding: '15px 32px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer'
    `);
  });
});

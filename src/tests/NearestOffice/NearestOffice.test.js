import React from 'react';
import { render } from '@testing-library/react';
import NearestOffice from '../../pages/NearestOffice';

describe('NearestOffice Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<NearestOffice />);
    expect(getByText('NearestOffice')).toBeInTheDocument();
  });
});

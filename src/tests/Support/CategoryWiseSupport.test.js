import React from 'react';
import { render, screen } from '@testing-library/react';
import CategoryWiseSupport from '../../components/Support/CategoryWiseSupport';
import { AccountCircle } from '@mui/icons-material';
import { Card, CardContent, CardActionArea } from '@mui/material';

describe('CategoryWiseSupport Component', () => {
  let originalFetch;

  beforeAll(() => {
    originalFetch = global.fetch;
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it('T1: renders CategoryWiseSupport component with Icon', () => {
    render(<CategoryWiseSupport Icon={AccountCircle} />);
    const cardElement = screen.getByTestId('support-category-card');
    const iconElement = screen.getByTestId('support-category-icon');

    expect(cardElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
  });

  it('T2: displays the card with the proper styling', () => {
    render(<CategoryWiseSupport Icon={AccountCircle} />);
    const cardElement = screen.getByTestId('support-category-card');

    expect(cardElement).toHaveClass('support-category-card');
  });

  it('T3: places the icon in the center of the card', () => {
    render(<CategoryWiseSupport Icon={AccountCircle} />);
    const cardContentElement = screen.getByTestId('support-card-content');

    expect(cardContentElement).toHaveStyle({ textAlign: 'center' });
  });
});

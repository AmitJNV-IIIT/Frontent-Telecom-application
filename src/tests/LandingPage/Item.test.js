import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Item from '../../components/LandingComponent/Item';
import { MemoryRouter as Router } from 'react-router-dom';

describe('Item component', () => {
  const mockItem = {
    image: 'test-image.jpg',
    title: 'Test Item'
  };

  beforeEach(() => {
    render(
      <Router>
        <Item item={mockItem} />
      </Router>
    );
  });

  test('TC-02: Displays SkeletonLoader while image is loading', () => {
    const skeletonLoader = screen.getByTestId('skeleton-loader');
    expect(skeletonLoader).toBeInTheDocument();
  });
});

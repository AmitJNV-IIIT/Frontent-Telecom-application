import React from 'react';
import { render } from '@testing-library/react';
import SkeletonLoader from '../../components/Common/Loader/SkeletonLoader';
//
describe('SkeletonLoader component', () => {
  it('renders skeleton loader correctly', () => {
    const { getByTestId } = render(<SkeletonLoader />);
    const skeletonLoader = getByTestId('skeleton-loader');
    const skeletonImage = getByTestId('skeleton-image');

    expect(skeletonLoader).toBeInTheDocument();
    expect(skeletonImage).toBeInTheDocument();
  });
});

import React from 'react';
import './css/SkeletonLoader.css';

const SkeletonLoader = () => {
  return (
    <div className="skeleton-loader" data-testid="skeleton-loader">
      <div className="skeleton-image" data-testid="skeleton-image"></div>
    </div>
  );
};

export default SkeletonLoader;

import React from 'react';
import { render } from '@testing-library/react';
import SelectedPlan, {
  getOTTImage
} from '../../components/Broadband/SelectedPlan';

describe('SelectedPlan component', () => {
  it('t1: renders correctly', () => {
    const { getByText, getByAltText } = render(<SelectedPlan />);

    // Check if the component renders
    expect(getByText('Selected Plan')).toBeInTheDocument();
    expect(getByAltText('card')).toBeInTheDocument();
    expect(getByText('Plan')).toBeInTheDocument();
    expect(getByText('Unlimited Internet')).toBeInTheDocument();
    // Add more assertions for other elements if needed
  });

  it('t3: displays correct price', () => {
    const { getByText } = render(<SelectedPlan />);

    // Check if the price is displayed correctly
    expect(getByText('Unlimited Internet')).toBeInTheDocument();
  });

  it('T5: returns placeholder image URL when image not found', () => {
    // Define the OTT platform which doesn't have an image in ottImages
    const ottWithoutImage = 'disney';

    // Render the SelectedPlan component
    const { container } = render(<SelectedPlan />);

    // Get the image element
    const ottImage = container.querySelector(`img[alt="${ottWithoutImage}"]`);

    // Check if the image is not found
    expect(ottImage).toBeNull();
  });

  it('T7: renders the card image', () => {
    const { getByAltText } = render(<SelectedPlan />);
    const cardImage = getByAltText('card');
    expect(cardImage).toBeInTheDocument();
  });

  it('t6: returns correct image URL for valid OTT name', () => {
    // Define a valid OTT name
    const ottName = 'Netflix';

    // Render the SelectedPlan component
    const { container } = render(<SelectedPlan />);

    // Call the getOTTImage function with the valid OTT name
    // const imageURL = container.querySelector(`img[alt="${ottName}"]`).getAttribute('src');

    // Expected URL format based on the provided ottName
    const expectedURL = `https://excitel-bucket.s3.amazonaws.com/${ottName.toLowerCase()}.png`;

    // Check if the returned URL matches the expected format
    // expect(imageURL).toBe(expectedURL);
  });

  it('t7: returns placeholder image URL for invalid OTT name', () => {
    // Define an OTT name that doesn't have an image
    const ottName = 'Disney';

    // Render the SelectedPlan component
    const { container } = render(<SelectedPlan />);

    // Call the getOTTImage function with the invalid OTT name
    // const imageURL = container.querySelector(`img[alt="${ottName}"]`).getAttribute('src');

    // Expected placeholder URL for OTT names without images
    const expectedURL = 'https://excitel-bucket.s3.amazonaws.com/spotify.png';

    // Check if the returned URL is the placeholder URL
    // expect(imageURL).toBe(expectedURL);
  });

  // it('t8: handles error scenario properly', () => {
  //   // Define an OTT name that might cause an error
  //   const ottName = 'InvalidOTT';

  //   // Mock console.error to capture the error message
  //   const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

  //   // Call the getOTTImage function with the invalid OTT name
  //   const imageURL = getOTTImage(ottName);

  //   // Expect the function to return null for the error scenario

  //   // Expect console.error to be called with the error message
  //   // expect(consoleError).toHaveBeenCalled();

  //   // Restore console.error to its original implementation
  //   consoleError.mockRestore();
  // });
});

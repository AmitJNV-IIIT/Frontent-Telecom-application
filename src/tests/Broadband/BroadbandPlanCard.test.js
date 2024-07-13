import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for better assertion messages
import BroadbandPlanCard from '../../components/Broadband/BroadbandPlanCard';

describe('BroadbandPlanCard component', () => {
  const broadbandPlan = {
    id: 1,
    name: 'Example Plan',
    price: 499,
    speed: 100,
    validity: 30,
    features: [
      'Unlimited Internet',
      'Upto 100 Mbps speed',
      'Unlimited calls Local/STD'
    ],
    ott: ['Netflix', 'Amazon Prime']
  };

  it('T1: renders without crashing', () => {
    render(<BroadbandPlanCard broadbandPlan={broadbandPlan} />);
  });

  it('T3: displays plan category based on validity', () => {
    broadbandPlan.validity = '28'; // Monthly validity
    const { getByText } = render(
      <BroadbandPlanCard broadbandPlan={broadbandPlan} />
    );
    expect(getByText('Monthly')).toBeInTheDocument();
  });

  it('T4: displays default category when validity is not recognized', () => {
    broadbandPlan.validity = '90'; // Unknown validity
    const { getByText } = render(
      <BroadbandPlanCard broadbandPlan={broadbandPlan} />
    );
    expect(getByText('Custom')).toBeInTheDocument();
  });

  it('T5: displays OTT image with modified name', () => {
    const { getByAltText } = render(
      <BroadbandPlanCard broadbandPlan={broadbandPlan} />
    );
    expect(getByAltText('Netflix')).toHaveAttribute(
      'src',
      'https://excitel-bucket.s3.amazonaws.com/netflix.png'
    );
  });

  it('T6: displays default OTT image when modification fails', () => {
    broadbandPlan.ott = ['None']; // Invalid OTT name
    const { getByAltText } = render(
      <BroadbandPlanCard broadbandPlan={broadbandPlan} />
    );
    expect(getByAltText('None')).toHaveAttribute(
      'src',
      'https://excitel-bucket.s3.amazonaws.com/spotify.png'
    );
  });

  it('T7: displays plan validity in days', () => {
    // Render the BroadbandPlanCard component with the broadbandPlan data
    const { getByText } = render(
      <BroadbandPlanCard broadbandPlan={broadbandPlan} />
    );

    // Construct the expected validity text based on the broadbandPlan.validity
    const validityText = `${broadbandPlan.validity} days validity`;

    // Check if the validity text is rendered
    expect(getByText(validityText)).toBeInTheDocument();
  });

  it('T8: does not display non-existent OTT images', () => {
    // Render the BroadbandPlanCard component with the broadbandPlan data
    const { queryByAltText } = render(
      <BroadbandPlanCard broadbandPlan={broadbandPlan} />
    );

    // Check if an image with the alt text "NonExistentOTT" is not rendered
    expect(queryByAltText('NonExistentOTT')).not.toBeInTheDocument();
  });

  it('T9: displays default OTT image when OTT name is "None"', () => {
    broadbandPlan.ott = ['None'];
    const { getByAltText } = render(
      <BroadbandPlanCard broadbandPlan={broadbandPlan} />
    );
    expect(getByAltText('None')).toHaveAttribute(
      'src',
      'https://excitel-bucket.s3.amazonaws.com/spotify.png'
    );
  });
  it('T10: displays correct category based on validity of 56 days', () => {
    broadbandPlan.validity = '56'; // Bimonthly validity
    const { getByText } = render(
      <BroadbandPlanCard broadbandPlan={broadbandPlan} />
    );
    expect(getByText('Bi-Monthly')).toBeInTheDocument();
  });

  it('T11: displays correct category based on validity of 180 days', () => {
    broadbandPlan.validity = '180'; // Semi Annual validity
    const { getByText } = render(
      <BroadbandPlanCard broadbandPlan={broadbandPlan} />
    );
    expect(getByText('Semi Annual')).toBeInTheDocument();
  });

  it('T12: displays correct category based on validity of 365 days', () => {
    broadbandPlan.validity = '365'; // Annual validity
    const { getByText } = render(
      <BroadbandPlanCard broadbandPlan={broadbandPlan} />
    );
    expect(getByText('Annual')).toBeInTheDocument();
  });
});

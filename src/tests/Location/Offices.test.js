import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Offices from '../../components/Location/Offices';

const locations = [
  { OfficeID: 1, name: 'Office 1', Phone: '1234567890' },
  { OfficeID: 2, name: 'Office 2', Phone: '1234567890' },
  { OfficeID: 3, name: 'Office 3', Phone: '1234567890' }
];

jest.mock('react-slick', () => {
  const MockSlider = ({ children }) => <div>{children}</div>;
  MockSlider.displayName = 'MockSlider';
  return MockSlider;
});
describe('Offices component', () => {
  it('TC1: Should render OfficeCard components for each location', () => {
    const { getAllByTestId } = render(<Offices locations={locations} />);
    const officeCards = getAllByTestId('office-card');
    expect(officeCards).toHaveLength(locations.length);
  });

  it('TC2: Should render no OfficeCard components when locations is empty', () => {
    const { queryByTestId } = render(<Offices locations={[]} />);
    const officeCards = queryByTestId('office-card');
    expect(officeCards).toBeNull();
  });

  it("TC3: Should render 'Cannot load office details' message when locations is null", () => {
    render(<Offices locations={null} />);
    expect(
      screen.getByText('Cannot load office details :')
    ).toBeInTheDocument();
  });
});

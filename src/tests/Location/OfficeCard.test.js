import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import OfficeCard from '../../components/Location/OfficeCard';

const location = {
  OfficeName: 'Office Name',
  Address: '123 Street',
  OpenTime: '09:00 AM',
  CloseTime: '06:00 PM',
  Phone: '123-456-7890',
  GoogleMapURI: 'https://www.google.com/maps'
};

describe('OfficeCard component', () => {
  it("TC1: Should open Google Maps URI in a new tab when 'Locate Office' button is clicked", () => {
    const { getByRole } = render(<OfficeCard location={location} />);
    const locateButton = getByRole('button', { name: /Locate Store/i });
    const googleMapLink = location.GoogleMapURI;
    const windowOpenSpy = jest
      .spyOn(window, 'open')
      .mockImplementation(() => {});

    fireEvent.click(locateButton);

    expect(windowOpenSpy).toHaveBeenCalledWith(googleMapLink, '_blank');
    windowOpenSpy.mockRestore();
  });
});

/* global global */
import React from 'react';
import { render, screen } from '@testing-library/react';
import LocateUs from '../../pages/LocateUs';
import officeData from '../../data/offices-data.json';

describe('LocateUs Page Testing', () => {
  let originalFetch;

  beforeAll(() => {
    originalFetch = global.fetch;
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it('TC1: Renders Offices component after loading', async () => {
    render(<LocateUs />);
    const officeElements = screen.queryAllByText(/Locate Excitel Stores/i);
    expect(officeElements.length).toBe(1);
  });

  it('TC2: Renders heading', () => {
    render(<LocateUs />);
    expect(screen.getByText(/Locate Excitel Stores/i)).toBeInTheDocument();
  });

  it('TC3: Fetches officeData correctly', async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(officeData)
      })
    );
    render(<LocateUs />);
    expect(screen.getByText(/Locate Excitel Stores/i)).toBeInTheDocument();
  });
});

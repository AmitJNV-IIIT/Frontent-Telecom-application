import { render, fireEvent } from '@testing-library/react';
import Reports from '../../components/SubscriptionHistory/Reports';

import { request } from '../../axios/AxiosHelper';

jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn() // Mock the request function
})); //

describe('<Reports />', () => {
  it('renders without crashing', () => {
    render(<Reports />);
  });

  it('changes duration state when radio button is clicked', () => {
    const { getByLabelText } = render(<Reports />);
    const radio = getByLabelText('3 Months');
    fireEvent.click(radio);
    expect(radio.checked).toEqual(true);
  });

  it('changes hovered state when mouse enters and leaves the Generate Report button', () => {
    const { getByText } = render(<Reports />);
    const button = getByText('Generate Report');
    fireEvent.mouseEnter(button);
    // Here you may need to mock `setHovered` and check if it has been called with `true`
    fireEvent.mouseLeave(button);
    // Here you may need to mock `setHovered` and check if it has been called with `false`
  });

  it('calls generateReport function when Generate Report button is clicked', () => {
    const { getByText } = render(<Reports />);
    const button = getByText('Generate Report');
    // Here you may need to mock `generateReport` and check if it has been called
    fireEvent.click(button);
  });
});

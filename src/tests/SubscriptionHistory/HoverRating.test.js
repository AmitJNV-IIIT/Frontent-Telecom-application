import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import HoverRating from '../../components/SubscriptionHistory/HoverRating';

describe('HowerRating component', () => {
  let value, onChange;

  beforeEach(() => {
    value = 3; // initial rating value
    onChange = jest.fn(); // mock onChange function
    render(<HoverRating value={value} onChange={onChange} />);
  });

  test('TC-01: Renders HowerRating component with initial value', () => {
    const ratingLabel = screen.getByText('Ok+');
    expect(ratingLabel).toBeInTheDocument();
  });

  //   test("TC-02: Calls onChange function when rating changes", () => {
  //     const onChange = jest.fn(); // Mock the onChange function

  //     render(<HoverRating value={0} onChange={onChange} />);

  //     const ratingInput = screen.getAllByTestId('rating');
  //   fireEvent.change(ratingInput, { target: { value: 4 } });
  //   expect(onChange).toHaveBeenCalledWith(4);

  //     // Ensure that onChange function is called
  //     expect(onChange).toHaveBeenCalled();
  //   });
});

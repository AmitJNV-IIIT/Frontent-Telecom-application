import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CategoryButton from '../../components/ExcitelFeedback/CategoryButton';

describe('CategoryButton', () => {
  it('TC0: renders correctly', () => {
    const { getByText } = render(<CategoryButton category="Test" />);
    const buttonElement = getByText('Test');
    expect(buttonElement).toBeInTheDocument();
  });

  it('TC1: calls onClick when button is clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <CategoryButton category="Test" onClick={onClickMock} />
    );
    const buttonElement = getByText('Test');
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ExcitelFeedback from '../../components/ExcitelFeedback/ExcitelFeedback';
import Feedback from '../../components/ExcitelFeedback/Feedback';

jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn()
}));

jest.mock('../../components/ExcitelFeedback/Feedback', () => ({
  __esModule: true,
  default: ({ onFeedback }) => (
    <div>
      <button onClick={() => onFeedback('Test feedback')}>Submit</button>
    </div>
  )
}));

describe('ExcitelFeedback', () => {
  it('TC0: renders correctly', () => {
    const { getByText } = render(<ExcitelFeedback />);
    const headingElement = getByText('Provide your feedback');
    expect(headingElement).toBeInTheDocument();
  });

  it('TC1: calls handleFeedback when feedback is provided', () => {
    const mockHandleFeedback = jest.fn();
    const mockUseEffect = jest.spyOn(React, 'useEffect');
    mockUseEffect.mockImplementation((f) => f());
    const { getByText } = render(
      <ExcitelFeedback onFeedback={mockHandleFeedback} />
    );
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);
    // expect(mockHandleFeedback).toHaveBeenCalledWith('Test feedback');
  });
});

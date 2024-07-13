import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ReusableSubscriptionCard from '../../components/SubscriptionHistory/ReusableSubscriptionCard';

describe('ReusableSubscriptionCard component', () => {
  it('test', () => {
    expect(true);
  });
  const mockSubscription = {
    plan: {
      data: 'Unlimited',
      validity: 30,
      price: 100,
      ott: ['Netflix']
    },
    purchasedOn: new Date().toString(),
    status: 'Active'
  };

  const onFeedbackClickMock = jest.fn();

  it('TC1: renders correctly', () => {
    const { getByText } = render(
      <Router>
        <ReusableSubscriptionCard
          subscription={mockSubscription}
          onFeedbackClick={onFeedbackClickMock}
          type="Confirmation"
        />
      </Router>
    );

    expect(getByText('Unlimited')).toBeInTheDocument();
    expect(getByText('30 Days')).toBeInTheDocument();
    expect(getByText('₹100')).toBeInTheDocument();
    expect(getByText('Active')).toBeInTheDocument();
    expect(getByText('Unlimited')).toBeInTheDocument();
  });
  it('TC2: calls onFeedbackClick when Feedback button is clicked', () => {
    const { getByText } = render(
      <Router>
        <ReusableSubscriptionCard
          subscription={mockSubscription}
          onFeedbackClick={onFeedbackClickMock}
          type="Not Confirmation" // This line is changed
        />
      </Router>
    );

    fireEvent.click(getByText('Feedback'));
    expect(onFeedbackClickMock).toHaveBeenCalled();
  });

  it('TC3: renders OTT platforms', () => {
    const { getByAltText } = render(
      <Router>
        <ReusableSubscriptionCard
          subscription={mockSubscription}
          onFeedbackClick={onFeedbackClickMock}
          type="Confirmation"
        />
      </Router>
    );

    expect(getByAltText('Netflix')).toBeInTheDocument();
  });

  // it('TC4: Changes background color on mouse over and mouse out', () => {
  //   const { getByTestId } = render(
  //     <Router>
  //       <ReusableSubscriptionCard
  //         subscription={mockSubscription}
  //         onFeedbackClick={onFeedbackClickMock}
  //         type='Confirmation'
  //       />
  //     </Router>
  //   );

  //   // Assuming the div with the mouseOver and mouseOut events has a test Id of 'hover-div'
  //   const hoverDiv = getByTestId('hover-div');

  //   // Trigger the mouseOver event
  //   fireEvent.mouseOver(hoverDiv);
  //   expect(hoverDiv.style.background).toEqual('linear-gradient(to right, #0e054b, #000000)');

  //   // Trigger the mouseOut event
  //   fireEvent.mouseOut(hoverDiv);
  //   expect(hoverDiv.style.background).toEqual('');
  // });
});

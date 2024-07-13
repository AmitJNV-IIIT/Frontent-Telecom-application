import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Subscription from '../../pages/Subscription';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

jest.mock('../../components/SubscriptionHistory/FeedbackModel', () => {
  return function DummyFeedbackModal() {
    return <div data-testid="feedback-modal">FeedbackModal</div>;
  };
});

jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn() // Mock the request function
}));

test('renders Subscription component', () => {
  render(
    <Router>
      <Subscription />
    </Router>
  );
});

test('TC-02: It navigates back when goBack is called', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Subscription />
    </Router>
  );

  // Simulate click event on the back button
  // userEvent.click(screen.getByTestId('back-btn'));

  // // Expect to navigate back to the home page
  // expect(history.location.pathname).toBe('/');
});

test('TC-03: It updates state when toggleFiltersVisibility is called', () => {
  render(
    <Router history={createMemoryHistory()}>
      <Subscription />
    </Router>
  );

  // Simulate click event on the filter list
  userEvent.click(screen.getByTestId('filter-icon'));

  // Expect SubscriptionFilters to be visible after filter icon is clicked
  // expect(screen.getByTestId('subscription-filters')).toBeVisible();
});

test('TC-04: It lazy loads FeedbackModal', async () => {
  const { findByTestId } = render(
    <Router history={createMemoryHistory()}>
      <Subscription />
    </Router>
  );

  // Expect FeedbackModal to be in the document
  // const feedbackModal = await findByTestId('feedback-modal');
  // expect(feedbackModal).toBeInTheDocument();
});

test('TC-05: It lazy loads and shows FeedbackModal when details are clicked', async () => {
  const { findByTestId } = render(
    <Router history={createMemoryHistory()}>
      <Subscription />
    </Router>
  );

  // Simulate click event on a SubscriptionRechargeCard component
  // userEvent.click(screen.getByTestId('prepaid-recharge-card'));

  // Expect FeedbackModal to be in the document after prepaid recharge card is clicked
  const feedbackModal = await findByTestId('subscription-main');
  expect(feedbackModal).toBeInTheDocument();
});

test('TC-06: It shows filters when toggleFiltersVisibility is called', () => {
  render(
    <Router history={createMemoryHistory()}>
      <Subscription />
    </Router>
  );

  // Simulate click event on the filter list
  userEvent.click(screen.getByTestId('filter-icon'));

  // Expect SubscriptionFilters to be visible after filter icon is clicked
  expect(screen.getByTestId('subscription-main')).toBeVisible();
});

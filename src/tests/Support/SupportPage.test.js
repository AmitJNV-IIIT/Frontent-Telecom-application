import React from 'react';
import { render, screen } from '@testing-library/react';
import SupportPage from '../../pages/Support';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter

describe('SupportPage Component', () => {
  it('renders SupportPage component with Support and FAQ components', () => {
    render(
      <Router>
        <SupportPage />
      </Router>
    );

    // Check if Support component is rendered
    expect(screen.getByText(/Excitel Customer Support/i)).toBeInTheDocument();

    // Check if FAQ component is rendered
    expect(screen.getByText(/FAQs/i)).toBeInTheDocument();
  });

  it('renders FAQs correctly with provided data', () => {
    const faqs = [
      {
        question: 'What services does Excitel provide?',
        answer:
          'Excitel provides high-speed internet connectivity and a mobile recharging platform for various service providers like Airtel, Vodafone, etc.'
      },
      {
        question: 'How can I recharge my mobile using Excitel?',
        answer:
          'You can recharge your mobile by logging into your Excitel account, selecting your service provider, entering your mobile number, and choosing the desired recharge plan.'
      },
      {
        question: 'What should I do if my internet connection is slow?',
        answer:
          'If your internet connection is slow, try resetting your modem. If the problem persists, you can contact our customer service for further assistance.'
      },
      {
        question: 'How do I contact Excitel customer service?',
        answer:
          "You can contact Excitel customer service through the 'Contact Us' section in our app or website. We are available 24/7 to assist you."
      },
      {
        question: 'Can I use Excitel to recharge other services?',
        answer:
          'Yes, Excitel provides a platform to recharge various services, including mobile, DTH, and data cards'
      }
    ];

    render(
      <Router>
        <SupportPage />
      </Router>
    );

    // Check if each FAQ question and answer is rendered
    faqs.forEach((faq) => {
      expect(screen.getByText(faq.question)).toBeInTheDocument();
      expect(screen.getByText(faq.answer)).toBeInTheDocument();
    });
  });
});

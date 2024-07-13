import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FAQ from '../../components/Support/FAQ';

describe('FAQ Component', () => {
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

  // it('T1: Renders FAQ component with correct content', () => {
  //   render(<FAQ faqs={faqs} />);

  //   // Retrieve all FAQ items
  //   const faqItems = screen.getAllByTestId(/faq-accordion-\d+/i);

  //   // Assert that the number of rendered FAQ items matches the expected length
  //   expect(faqItems).toHaveLength(faqs.length);
  // });

  it('T2: Handles panel change correctly', () => {
    const { getByText } = render(<FAQ faqs={faqs} />);

    // Simulate panel change event by clicking to expand the FAQ
    fireEvent.click(getByText('What services does Excitel provide?'));

    // Check if the state expanded is updated correctly
    expect(screen.getByText(faqs[0].answer)).toBeInTheDocument();
  });

  it('T3: Renders correct question and answer in accordion', () => {
    render(<FAQ faqs={faqs} />);
    const question1 = screen.getByText(faqs[0].question);
    const answer1 = screen.getByText(faqs[0].answer);
    expect(question1).toBeInTheDocument();
    expect(answer1).toBeInTheDocument();
  });

  it('T4: Renders multiple FAQs with different content', () => {
    render(<FAQ faqs={faqs} />);
    faqs.forEach((faq, index) => {
      const question = screen.getByText(faq.question);
      const answer = screen.getByText(faq.answer);
      expect(question).toBeInTheDocument();
      expect(answer).toBeInTheDocument();
    });
  });

  // it('T5: Accordion details are hidden initially', () => {
  //   render(<FAQ faqs={faqs} />);

  //   // Check if accordion details are hidden initially
  //   faqs.forEach((_, index) => {
  //     const accordionDetails = screen.queryByTestId(`panel${index}-content`);
  //     expect(accordionDetails).not.toBeVisible();
  //   });
  // });
});

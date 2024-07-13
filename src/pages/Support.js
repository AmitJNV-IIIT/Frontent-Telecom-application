import React from 'react';

import Support from '../components/Support/Support';

import FAQ from '../components/Support/FAQ';
import CategoryWiseSupport from '../components/Support/CategoryWiseSupport';
import {
  DashboardCustomizeRounded,
  MobileOff,
  NetworkCell,
  Recycling,
  Wifi
} from '@mui/icons-material';
import '../components/Support/css/Support.css';
//
const SupportPage = () => {
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
  return (
    <>
      <Support />

      <div style={{ background: 'white' }}>
        <h2 style={{ padding: '1rem' }} className="FAQ-border">
          {' '}
          Category Wise Support
        </h2>
        <div className="support-category-container">
          <CategoryWiseSupport Icon={NetworkCell} />
          <CategoryWiseSupport Icon={DashboardCustomizeRounded} />
          <CategoryWiseSupport Icon={MobileOff} />
          <CategoryWiseSupport Icon={Recycling} />
          <CategoryWiseSupport Icon={Wifi} />
        </div>
        <FAQ faqs={faqs} />
      </div>
    </>
  );
};

export default SupportPage;

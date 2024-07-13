import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import './css/Support.css';

const FAQ = ({ faqs }) => {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        // marginBottom: '2%',
        paddingBottom: '2%',
        height: 'auto',
        marginTop: '2rem'
      }}
      data-testid="faq-component" // Ensure correct test ID here
    >
      <h2 className="FAQ-border"> FAQs</h2>
      <div style={{ display: 'flow-root' }}>
        {faqs.map((faq, index) => (
          <Accordion
            style={{ color: 'white', padding: '3px', minHeight: '6vh' }}
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            className="custom-card-faq"
          >
            <AccordionSummary
              expandIcon={
                expanded === `panel${index}` ? (
                  <Remove style={{ color: 'white' }} />
                ) : (
                  <Add style={{ color: 'white' }} />
                )
              }
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              className="accordion-summary"
            >
              <Typography variant="body1" color="inherit">
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="accordion-details">
              <Typography variant="body2" color="inherit">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default FAQ;

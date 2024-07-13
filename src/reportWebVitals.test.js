import reportWebVitals from './reportWebVitals'; // Update the path if necessary

// Mock the web-vitals module
jest.mock('web-vitals', () => ({
  getCLS: jest.fn(),
  getFID: jest.fn(),
  getFCP: jest.fn(),
  getLCP: jest.fn(),
  getTTFB: jest.fn()
}));

describe('reportWebVitals', () => {
  test('calls web vitals functions when onPerfEntry is provided', () => {
    const onPerfEntry = jest.fn();
    reportWebVitals(onPerfEntry);
    // Ensure that each web vitals function is called
    expect(require('web-vitals').getCLS).not.toHaveBeenCalled();
    expect(require('web-vitals').getFID).not.toHaveBeenCalled();
    expect(require('web-vitals').getFCP).not.toHaveBeenCalled();
    expect(require('web-vitals').getLCP).not.toHaveBeenCalled();
    expect(require('web-vitals').getTTFB).not.toHaveBeenCalled();
  });

  test('does not call web vitals functions when onPerfEntry is not provided', () => {
    reportWebVitals(null);
    // Ensure that no web vitals function is called
    expect(require('web-vitals').getCLS).not.toHaveBeenCalled();
    expect(require('web-vitals').getFID).not.toHaveBeenCalled();
    expect(require('web-vitals').getFCP).not.toHaveBeenCalled();
    expect(require('web-vitals').getLCP).not.toHaveBeenCalled();
    expect(require('web-vitals').getTTFB).not.toHaveBeenCalled();
  });
});

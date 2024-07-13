// ConnectionDetail.test.js

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConnectionDetail from '../../components/Broadband/ConnectionDetail';

// describe("ConnectionDetail component", () => {
//   it("should render without errors", () => {
//     render(<ConnectionDetail isOpen={true} onClose={() => {}} />);
//     const connectionIdElement = screen.getByText("Connection Id:");
//     expect(connectionIdElement).toBeInTheDocument();

//     const nameElement = screen.getByText("Name:");
//     expect(nameElement).toBeInTheDocument();

//     const addressElement = screen.getByText("Address:");
//     expect(addressElement).toBeInTheDocument();
//   });

//   it("should close the modal when close button is clicked", () => {
//     const onCloseMock = jest.fn();
//     render(<ConnectionDetail isOpen={true} onClose={onCloseMock} />);
//     const closeButton = screen.getByText("×");
//     userEvent.click(closeButton);
//     expect(onCloseMock).toHaveBeenCalled();
//   });

//   it("should not render when isOpen is false", () => {
//     render(<ConnectionDetail isOpen={false} onClose={() => {}} />);
//     const modalElement = screen.queryByTestId("connection-detail-modal");
//     expect(modalElement).not.toBeInTheDocument();
//   });
// });

describe('ConnectionDetail component', () => {
  const connectionDetail = {
    connectionId: '123456',
    name: 'John Doe',
    address: '123 Main St',
    pinCode: '12345',
    city: 'Anytown',
    state: 'AnyState',
    status: 'Active',
    mobileNumber: '123-456-7890'
  };

  it('t1: renders connection detail modal correctly', () => {
    const { getByText } = render(
      <ConnectionDetail
        isOpen={true}
        onClose={() => {}}
        connectionDetail={connectionDetail}
      />
    );

    expect(getByText('Connection Details')).toBeInTheDocument();
    expect(getByText('Connection Id:')).toBeInTheDocument();
    expect(getByText('Name:')).toBeInTheDocument();
    expect(getByText('Address:')).toBeInTheDocument();
    expect(getByText('PinCode:')).toBeInTheDocument();
    expect(getByText('City:')).toBeInTheDocument();
    expect(getByText('State:')).toBeInTheDocument();
    expect(getByText('Status:')).toBeInTheDocument();
    expect(getByText('Mobile:')).toBeInTheDocument();
  });

  it('t2: closes modal on close button click', () => {
    const handleClose = jest.fn();
    const { getByText } = render(
      <ConnectionDetail
        isOpen={true}
        onClose={handleClose}
        connectionDetail={connectionDetail}
      />
    );

    fireEvent.click(getByText('×')); // Close button
    expect(handleClose).toHaveBeenCalled();
  });

  it('t3: closes modal on escape key press', () => {
    const handleClose = jest.fn();
    render(
      <ConnectionDetail
        isOpen={true}
        onClose={handleClose}
        connectionDetail={connectionDetail}
      />
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalled();
  });

  it('t4: closes modal on outside click', () => {
    const handleClose = jest.fn();
    const { container } = render(
      <ConnectionDetail
        isOpen={true}
        onClose={handleClose}
        connectionDetail={connectionDetail}
      />
    );

    // Log the container's inner HTML to see if the modal element is present

    // Attach event listener to document directly
    fireEvent.mouseDown(document);

    // Check if handleClose is called
    expect(handleClose).toHaveBeenCalled();
  });
  it('t5: adds event listeners when modal is open', () => {
    // Mock addEventListener
    document.addEventListener = jest.fn();

    render(
      <ConnectionDetail
        isOpen={true}
        onClose={() => {}}
        connectionDetail={connectionDetail}
      />
    );

    // Check if event listeners were added
    expect(document.addEventListener).toHaveBeenCalledTimes(2);
    expect(document.addEventListener).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function)
    );
    expect(document.addEventListener).toHaveBeenCalledWith(
      'mousedown',
      expect.any(Function)
    );
  });

  it('t6: removes event listeners when modal is closed', () => {
    // Mock removeEventListener
    document.removeEventListener = jest.fn();

    const { rerender } = render(
      <ConnectionDetail
        isOpen={true}
        onClose={() => {}}
        connectionDetail={connectionDetail}
      />
    );
    rerender(
      <ConnectionDetail
        isOpen={false}
        onClose={() => {}}
        connectionDetail={connectionDetail}
      />
    );

    // Check if event listeners were removed
    expect(document.removeEventListener).toHaveBeenCalledTimes(2);
    expect(document.removeEventListener).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function)
    );
    expect(document.removeEventListener).toHaveBeenCalledWith(
      'mousedown',
      expect.any(Function)
    );
  });
  it('t7: does not add event listeners when modal is closed', () => {
    // Mock addEventListener
    document.addEventListener = jest.fn();

    render(
      <ConnectionDetail
        isOpen={false}
        onClose={() => {}}
        connectionDetail={connectionDetail}
      />
    );

    // Check if event listeners were not added
    expect(document.addEventListener).not.toHaveBeenCalled();
  });

  it('t8: removes event listeners when modal is open and then closed', () => {
    // Mock removeEventListener
    document.removeEventListener = jest.fn();

    const { rerender } = render(
      <ConnectionDetail
        isOpen={true}
        onClose={() => {}}
        connectionDetail={connectionDetail}
      />
    );
    rerender(
      <ConnectionDetail
        isOpen={false}
        onClose={() => {}}
        connectionDetail={connectionDetail}
      />
    );

    // Check if event listeners were removed
    expect(document.removeEventListener).toHaveBeenCalledTimes(2);
    expect(document.removeEventListener).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function)
    );
    expect(document.removeEventListener).toHaveBeenCalledWith(
      'mousedown',
      expect.any(Function)
    );
  });
  it('should add event listeners when modal is open', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    render(
      <ConnectionDetail
        isOpen={true}
        onClose={() => {}}
        connectionDetail={connectionDetail}
      />
    );

    expect(addEventListenerSpy).toHaveBeenCalledTimes(2);
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function)
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'mousedown',
      expect.any(Function)
    );

    // Cleanup
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('should remove event listeners when modal is closed', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    const { rerender } = render(
      <ConnectionDetail
        isOpen={true}
        onClose={() => {}}
        connectionDetail={connectionDetail}
      />
    );
    rerender(
      <ConnectionDetail
        isOpen={false}
        onClose={() => {}}
        connectionDetail={connectionDetail}
      />
    );

    expect(removeEventListenerSpy).toHaveBeenCalledTimes(2);
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function)
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'mousedown',
      expect.any(Function)
    );

    // Cleanup
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('should not handle escape key press when modal is closed', () => {
    const handleClose = jest.fn();
    render(
      <ConnectionDetail
        isOpen={false}
        onClose={handleClose}
        connectionDetail={connectionDetail}
      />
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('should not handle outside click when modal is closed', () => {
    const handleClose = jest.fn();
    render(
      <ConnectionDetail
        isOpen={false}
        onClose={handleClose}
        connectionDetail={connectionDetail}
      />
    );

    fireEvent.mouseDown(document);
    expect(handleClose).not.toHaveBeenCalled();
  });

  // it("should handle escape key press when modal is open", () => {
  //   const handleClose = jest.fn();
  //   render(<ConnectionDetail isOpen={true} onClose={handleClose} connectionDetail={connectionDetail} />);

  //   fireEvent.keyDown(document, { key: "Escape" });

  //   // Verify that the handleClose function is called when the Escape key is pressed
  //   expect(handleClose).toHaveBeenCalledTimes(1);
  // });

  // it("should handle outside click when modal is open", () => {
  //   const handleClose = jest.fn();
  //   render(<ConnectionDetail isOpen={true} onClose={handleClose} connectionDetail={connectionDetail} />);

  //   // Simulate a mouse click outside the modal content
  //   fireEvent.mouseDown(document.body);

  //   // Verify that the handleClose function is called when a mouse click occurs outside the modal content
  //   expect(handleClose).toHaveBeenCalledTimes(1);
  // });
});

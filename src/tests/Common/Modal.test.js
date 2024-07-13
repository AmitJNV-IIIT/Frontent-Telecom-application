import React from 'react';
import { render } from '@testing-library/react';
import Modal from '../../components/Common/Navbar/Modal';

describe('Modal', () => {
  it('should render modal with children', () => {
    const { getByText } = render(
      <Modal type="viewCoupon" show={true}>
        <p>Test Child</p>
      </Modal>
    );

    expect(getByText('Test Child')).toBeInTheDocument();
  });

  it('should apply correct classes based on show prop', () => {
    const { container } = render(
      <Modal type="viewCoupon" show={true}>
        <p>Test Child</p>
      </Modal>
    );

    expect(container.firstChild).toHaveClass(
      'modal-user-details display-block'
    );

    const { container: hiddenContainer } = render(
      <Modal type="viewCoupon" show={false}>
        <p>Test Child</p>
      </Modal>
    );

    expect(hiddenContainer.firstChild).toHaveClass(
      'modal-user-details display-none'
    );
  });

  it('should apply correct classes based on type prop', () => {
    const { container } = render(
      <Modal type="viewCoupon" show={true}>
        <p>Test Child</p>
      </Modal>
    );

    expect(container.firstChild.firstChild).not.toHaveClass(
      'modal-content-user-details'
    );

    const { container: otherTypeContainer } = render(
      <Modal type="otherType" show={true}>
        <p>Test Child</p>
      </Modal>
    );

    expect(otherTypeContainer.firstChild.firstChild).toHaveClass(
      'modal-content-user-details'
    );
  });
});
